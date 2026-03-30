import { createHash } from "node:crypto";
import { blogPosts, type BlogPost } from "../shared-data/blogData";
import { profileDetails, siteMetadata } from "../shared-data/siteMetadata";

type CampaignRecord = {
    post_id: string;
    status: string;
    sent_count: number;
    subscriber_count: number;
};

type SubscriberRecord = {
    email: string;
    unsubscribe_token: string | null;
};

type DeliveryRecord = {
    subscriber_email: string;
    unsubscribe_token_snapshot: string;
    status: string;
};

type ResendSendResponse = {
    data?: { id: string } | Array<{ id: string } | null>;
    error?: { message?: string };
};

const SUPABASE_URL = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const RESEND_API_KEY = process.env.RESEND_API_KEY;
const RESEND_FROM_EMAIL = process.env.RESEND_FROM_EMAIL || "Sai Ram Maruri <updates@saiii.in>";
const RESEND_REPLY_TO = process.env.RESEND_REPLY_TO || profileDetails.email;
const SITE_URL = siteMetadata.siteUrl.replace(/\/$/, "");
const IS_VERCEL_PRODUCTION_DEPLOY = process.env.VERCEL === "1" && process.env.VERCEL_ENV === "production";
const BATCH_SIZE = 50;

const nowIso = () => new Date().toISOString();

const escapeHtml = (value: string) =>
    value
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#39;");

const parsePostDate = (post: BlogPost) => {
    const timestamp = Date.parse(post.date);
    return Number.isNaN(timestamp) ? 0 : timestamp;
};

const getLatestBlogPost = () =>
    [...blogPosts]
        .filter((post) => !post.isLegalDoc)
        .sort((left, right) => parsePostDate(right) - parsePostDate(left))[0];

const formatDate = (date: string) => {
    const timestamp = Date.parse(date);
    if (Number.isNaN(timestamp)) return date;

    return new Intl.DateTimeFormat("en-US", {
        dateStyle: "long",
    }).format(new Date(timestamp));
};

const buildPostUrl = (post: BlogPost) => post.externalLink || `${SITE_URL}/blogs/${post.id}`;

const buildUnsubscribeUrl = (token: string) => `${SITE_URL}/api/unsubscribe?token=${encodeURIComponent(token)}`;

const chunk = <T>(items: T[], size: number) => {
    const chunks: T[][] = [];
    for (let index = 0; index < items.length; index += size) {
        chunks.push(items.slice(index, index + size));
    }
    return chunks;
};

async function supabaseRequest<T>(path: string, init: RequestInit = {}): Promise<T> {
    if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
        throw new Error("Missing Supabase service role configuration.");
    }

    const response = await fetch(`${SUPABASE_URL}/rest/v1/${path}`, {
        ...init,
        headers: {
            apikey: SUPABASE_SERVICE_ROLE_KEY,
            Authorization: `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
            "Content-Type": "application/json",
            ...init.headers,
        },
    });

    if (!response.ok) {
        const body = await response.text();
        throw new Error(`Supabase request failed (${response.status}): ${body}`);
    }

    if (response.status === 204) {
        return undefined as T;
    }

    const body = await response.text();
    return (body ? JSON.parse(body) : undefined) as T;
}

async function getCampaign(postId: string) {
    const records = await supabaseRequest<CampaignRecord[]>(
        `blog_newsletter_campaigns?post_id=eq.${encodeURIComponent(postId)}&select=post_id,status,sent_count,subscriber_count`,
    );

    return records[0] || null;
}

async function upsertCampaign(post: BlogPost, status: string, subscriberCount: number, sentCount: number, lastError: string | null) {
    await supabaseRequest<CampaignRecord[]>("blog_newsletter_campaigns?on_conflict=post_id", {
        method: "POST",
        headers: {
            Prefer: "resolution=merge-duplicates,return=representation",
        },
        body: JSON.stringify([{
            post_id: post.id,
            post_title: post.title,
            post_url: buildPostUrl(post),
            post_date: Number.isNaN(Date.parse(post.date)) ? null : new Date(post.date).toISOString(),
            status,
            subscriber_count: subscriberCount,
            sent_count: sentCount,
            deployment_url: process.env.VERCEL_PROJECT_PRODUCTION_URL
                ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
                : SITE_URL,
            commit_sha: process.env.VERCEL_GIT_COMMIT_SHA || null,
            first_attempt_at: nowIso(),
            last_attempt_at: nowIso(),
            completed_at: status === "sent" || status === "skipped_no_subscribers" ? nowIso() : null,
            last_error: lastError,
            updated_at: nowIso(),
        }]),
    });
}

async function patchCampaign(postId: string, payload: Record<string, unknown>) {
    await supabaseRequest<CampaignRecord[]>(
        `blog_newsletter_campaigns?post_id=eq.${encodeURIComponent(postId)}`,
        {
            method: "PATCH",
            headers: {
                Prefer: "return=representation",
            },
            body: JSON.stringify({
                ...payload,
                updated_at: nowIso(),
            }),
        },
    );
}

async function getActiveSubscribers() {
    return supabaseRequest<SubscriberRecord[]>(
        "blog_subscribers?select=email,unsubscribe_token&is_active=eq.true&order=subscribed_at.desc",
    );
}

async function upsertDeliveries(postId: string, subscribers: SubscriberRecord[]) {
    if (!subscribers.length) return;

    await supabaseRequest<unknown>("blog_newsletter_deliveries?on_conflict=post_id,subscriber_email", {
        method: "POST",
        headers: {
            Prefer: "resolution=merge-duplicates,return=minimal",
        },
        body: JSON.stringify(
            subscribers.map((subscriber) => ({
                post_id: postId,
                subscriber_email: subscriber.email,
                unsubscribe_token_snapshot: subscriber.unsubscribe_token,
            })),
        ),
    });
}

async function getOutstandingDeliveries(postId: string) {
    return supabaseRequest<DeliveryRecord[]>(
        `blog_newsletter_deliveries?post_id=eq.${encodeURIComponent(postId)}&select=subscriber_email,unsubscribe_token_snapshot,status&status=neq.sent`,
    );
}

async function getDeliveryStatuses(postId: string) {
    return supabaseRequest<Array<{ status: string }>>(
        `blog_newsletter_deliveries?post_id=eq.${encodeURIComponent(postId)}&select=status`,
    );
}

async function updateDelivery(postId: string, email: string, payload: Record<string, unknown>) {
    await supabaseRequest<unknown>(
        `blog_newsletter_deliveries?post_id=eq.${encodeURIComponent(postId)}&subscriber_email=eq.${encodeURIComponent(email)}`,
        {
            method: "PATCH",
            headers: {
                Prefer: "return=minimal",
            },
            body: JSON.stringify({
                ...payload,
                updated_at: nowIso(),
            }),
        },
    );
}

function buildEmailContent(post: BlogPost, unsubscribeUrl: string) {
    const safeTitle = escapeHtml(post.title);
    const safeExcerpt = escapeHtml(post.excerpt);
    const safeReadTime = escapeHtml(post.readTime);
    const safeDate = escapeHtml(formatDate(post.date));
    const safeUrl = buildPostUrl(post);
    const safeTags = post.tags.slice(0, 5).map((tag) => escapeHtml(tag));

    const html = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${safeTitle}</title>
</head>
<body style="margin:0;background:#f5f1e8;font-family:Arial,sans-serif;color:#17140f;">
  <div style="padding:32px 16px;">
    <div style="max-width:640px;margin:0 auto;background:#fffdf8;border:1px solid #e0d7c5;border-radius:28px;overflow:hidden;box-shadow:0 24px 80px rgba(32,25,15,0.08);">
      <div style="height:6px;background:linear-gradient(90deg,#5d7414 0%,#c2d18f 100%);"></div>
      <div style="padding:32px;">
        <p style="margin:0 0 12px;font-size:12px;letter-spacing:0.18em;text-transform:uppercase;color:#7e8660;font-weight:700;">New Blog Post</p>
        <h1 style="margin:0 0 16px;font-size:32px;line-height:1.08;">${safeTitle}</h1>
        <p style="margin:0 0 20px;font-size:16px;line-height:1.7;color:#6f695c;">${safeExcerpt}</p>
        <p style="margin:0 0 24px;font-size:14px;line-height:1.6;color:#8b8376;">
          ${safeDate} · ${safeReadTime}
        </p>
        <a href="${safeUrl}" style="display:inline-block;background:#171d10;color:#ffffff;text-decoration:none;padding:14px 22px;border-radius:999px;font-weight:700;">
          Read the full post
        </a>
        <div style="margin-top:28px;padding-top:24px;border-top:1px solid #e8e1d1;">
          <p style="margin:0 0 12px;font-size:13px;line-height:1.7;color:#6f695c;">
            Thanks for subscribing to blog updates from Sai Ram Maruri. Replies come directly to ${escapeHtml(RESEND_REPLY_TO)}.
          </p>
          <p style="margin:0 0 16px;font-size:13px;line-height:1.7;color:#6f695c;">
            ${safeTags.length ? `Topics: ${safeTags.join(", ")}` : ""}
          </p>
          <p style="margin:0;font-size:12px;line-height:1.7;color:#8b8376;">
            Don’t want future updates?
            <a href="${unsubscribeUrl}" style="color:#5d7414;">Unsubscribe here</a>.
          </p>
        </div>
      </div>
    </div>
  </div>
</body>
</html>`;

    const text = [
        `New blog post from Sai Ram Maruri`,
        ``,
        post.title,
        `${formatDate(post.date)} · ${post.readTime}`,
        ``,
        post.excerpt,
        ``,
        `Read it here: ${safeUrl}`,
        ``,
        `Reply to: ${RESEND_REPLY_TO}`,
        `Unsubscribe: ${unsubscribeUrl}`,
    ].join("\n");

    return { html, text };
}

async function resendRequest(path: string, body: unknown, idempotencyKey: string) {
    if (!RESEND_API_KEY) {
        throw new Error("Missing Resend API key.");
    }

    const response = await fetch(`https://api.resend.com${path}`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${RESEND_API_KEY}`,
            "Content-Type": "application/json",
            "Idempotency-Key": idempotencyKey,
        },
        body: JSON.stringify(body),
    });

    const payload = (await response.json()) as ResendSendResponse;
    if (!response.ok || payload.error) {
        throw new Error(payload.error?.message || `Resend request failed with status ${response.status}.`);
    }

    return payload;
}

async function sendDeliveryBatch(post: BlogPost, deliveries: DeliveryRecord[]) {
    const batchKey = createHash("sha1")
        .update(`${post.id}:${deliveries.map((delivery) => delivery.subscriber_email).sort().join(",")}`)
        .digest("hex");

    const payload = deliveries.map((delivery) => {
            const unsubscribeUrl = buildUnsubscribeUrl(delivery.unsubscribe_token_snapshot);
            const content = buildEmailContent(post, unsubscribeUrl);

            return {
                from: RESEND_FROM_EMAIL,
                to: [delivery.subscriber_email],
                subject: `New blog post: ${post.title}`,
                html: content.html,
                text: content.text,
                reply_to: RESEND_REPLY_TO,
            };
        });

    return resendRequest("/emails/batch", payload, `newsletter-batch-${batchKey}`);
}

async function sendSingleDelivery(post: BlogPost, delivery: DeliveryRecord) {
    const unsubscribeUrl = buildUnsubscribeUrl(delivery.unsubscribe_token_snapshot);
    const content = buildEmailContent(post, unsubscribeUrl);

    return resendRequest(
        "/emails",
        {
            from: RESEND_FROM_EMAIL,
            to: [delivery.subscriber_email],
            subject: `New blog post: ${post.title}`,
            html: content.html,
            text: content.text,
            reply_to: RESEND_REPLY_TO,
        },
        `newsletter-single-${post.id}-${createHash("sha1").update(delivery.subscriber_email).digest("hex")}`,
    );
}

async function processDeliveries(post: BlogPost, deliveries: DeliveryRecord[]) {
    let failureCount = 0;

    for (const deliveryChunk of chunk(deliveries, BATCH_SIZE)) {
        try {
            const response = await sendDeliveryBatch(post, deliveryChunk);
            const ids = response.data || [];

            if (ids.length !== deliveryChunk.length) {
                throw new Error("Resend batch response did not match the delivery count.");
            }

            for (let index = 0; index < deliveryChunk.length; index += 1) {
                const delivery = deliveryChunk[index];
                await updateDelivery(post.id, delivery.subscriber_email, {
                    status: "sent",
                    resend_email_id: ids[index]?.id || null,
                    sent_at: nowIso(),
                    last_error: null,
                });
            }
        } catch (batchError) {
            console.error(`Newsletter batch send failed for post ${post.id}:`, batchError);

            for (const delivery of deliveryChunk) {
                try {
                    const response = await sendSingleDelivery(post, delivery);
                    const emailId = !Array.isArray(response.data) ? response.data?.id : response.data[0]?.id;

                    await updateDelivery(post.id, delivery.subscriber_email, {
                        status: "sent",
                        resend_email_id: emailId || null,
                        sent_at: nowIso(),
                        last_error: null,
                    });
                } catch (singleError) {
                    failureCount += 1;
                    const message = singleError instanceof Error ? singleError.message : "Unknown delivery error";
                    console.error(`Newsletter send failed for ${delivery.subscriber_email}:`, message);

                    await updateDelivery(post.id, delivery.subscriber_email, {
                        status: "failed",
                        last_error: message,
                    });
                }
            }
        }
    }

    return failureCount;
}

async function main() {
    if (!IS_VERCEL_PRODUCTION_DEPLOY) {
        console.log("Newsletter automation skipped: not a production Vercel deployment.");
        return;
    }

    if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY || !RESEND_API_KEY) {
        console.log("Newsletter automation skipped: missing required environment variables.");
        return;
    }

    if (/@gmail\.com/i.test(RESEND_FROM_EMAIL)) {
        console.log("Newsletter automation skipped: Resend requires a verified domain sender, not a Gmail From address.");
        return;
    }

    const latestPost = getLatestBlogPost();
    if (!latestPost) {
        console.log("Newsletter automation skipped: no blog posts found.");
        return;
    }

    const existingCampaign = await getCampaign(latestPost.id);
    if (existingCampaign?.status === "sent" || existingCampaign?.status === "skipped_no_subscribers") {
        console.log(`Newsletter automation skipped: campaign already finalized for ${latestPost.id}.`);
        return;
    }

    const subscribers = (await getActiveSubscribers()).filter(
        (subscriber): subscriber is SubscriberRecord & { unsubscribe_token: string } =>
            Boolean(subscriber.email) && Boolean(subscriber.unsubscribe_token),
    );

    if (!subscribers.length) {
        await upsertCampaign(latestPost, "skipped_no_subscribers", 0, 0, null);
        console.log(`Newsletter automation skipped: no active subscribers for ${latestPost.id}.`);
        return;
    }

    await upsertCampaign(
        latestPost,
        existingCampaign?.status === "partial_failure" ? "retrying" : "processing",
        subscribers.length,
        existingCampaign?.sent_count || 0,
        null,
    );

    await upsertDeliveries(latestPost.id, subscribers);

    const outstandingDeliveries = await getOutstandingDeliveries(latestPost.id);
    if (!outstandingDeliveries.length) {
        await patchCampaign(latestPost.id, {
            status: "sent",
            sent_count: subscribers.length,
            subscriber_count: subscribers.length,
            completed_at: nowIso(),
            last_error: null,
            last_attempt_at: nowIso(),
        });
        console.log(`Newsletter automation skipped: all deliveries already sent for ${latestPost.id}.`);
        return;
    }

    const failureCount = await processDeliveries(latestPost, outstandingDeliveries);
    const statuses = await getDeliveryStatuses(latestPost.id);
    const sentCount = statuses.filter((record) => record.status === "sent").length;
    const unresolvedCount = statuses.length - sentCount;
    const finalStatus = unresolvedCount === 0 ? "sent" : "partial_failure";

    await patchCampaign(latestPost.id, {
        status: finalStatus,
        sent_count: sentCount,
        subscriber_count: subscribers.length,
        completed_at: finalStatus === "sent" ? nowIso() : null,
        last_error: failureCount > 0 ? `${failureCount} delivery attempts failed.` : null,
        last_attempt_at: nowIso(),
    });

    console.log(
        `Newsletter automation finished for ${latestPost.id}: ${sentCount}/${subscribers.length} delivered, status=${finalStatus}.`,
    );
}

main().catch((error) => {
    console.error("Newsletter automation failed:", error);
    process.exitCode = 0;
});
