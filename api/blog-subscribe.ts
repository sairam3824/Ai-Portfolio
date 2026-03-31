import type { ApiRequest, ApiResponse } from "./types";
import { profileDetails, siteMetadata } from "../shared-data/siteMetadata";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const SITE_URL = siteMetadata.siteUrl;
const DEFAULT_FROM_EMAIL = "Sai Ram Maruri <blog@updates.saiii.in>";
const DEFAULT_REPLY_TO = profileDetails.email;

type SubscriberRecord = {
    email: string;
    is_active: boolean;
    unsubscribe_token: string | null;
};

const normalizeEmail = (value: string) => value.trim().toLowerCase();

const escapeHtml = (value: string) =>
    value
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#39;");

async function supabaseRequest<T>(path: string, init: RequestInit = {}): Promise<T> {
    const supabaseUrl = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !serviceRoleKey) {
        throw new Error("Supabase server configuration is missing.");
    }

    const response = await fetch(`${supabaseUrl}/rest/v1/${path}`, {
        ...init,
        headers: {
            apikey: serviceRoleKey,
            Authorization: `Bearer ${serviceRoleKey}`,
            "Content-Type": "application/json",
            ...init.headers,
        },
    });

    if (!response.ok) {
        const body = await response.text();
        throw new Error(`Supabase request failed (${response.status}): ${body}`);
    }

    const body = await response.text();
    return (body ? JSON.parse(body) : undefined) as T;
}

async function getSubscriber(email: string) {
    const result = await supabaseRequest<SubscriberRecord[]>(
        `blog_subscribers?email=eq.${encodeURIComponent(email)}&select=email,is_active,unsubscribe_token&limit=1`,
    );

    return result[0] || null;
}

async function insertSubscriber(email: string, userAgent: string | null, unsubscribeToken: string) {
    await supabaseRequest("blog_subscribers", {
        method: "POST",
        headers: {
            Prefer: "return=minimal",
        },
        body: JSON.stringify([{
            email,
            is_active: true,
            unsubscribe_token: unsubscribeToken,
            unsubscribed_at: null,
            source: "writing_page",
            user_agent: userAgent,
        }]),
    });
}

const isDuplicateSubscriberError = (error: unknown) => {
    if (!(error instanceof Error)) return false;

    return (
        error.message.includes("23505") ||
        error.message.toLowerCase().includes("duplicate key") ||
        error.message.toLowerCase().includes("blog_subscribers_email_key")
    );
};

async function reactivateSubscriber(email: string, userAgent: string | null, unsubscribeToken: string) {
    await supabaseRequest(
        `blog_subscribers?email=eq.${encodeURIComponent(email)}`,
        {
            method: "PATCH",
            headers: {
                Prefer: "return=minimal",
            },
            body: JSON.stringify({
                is_active: true,
                unsubscribed_at: null,
                unsubscribe_token: unsubscribeToken,
                source: "writing_page",
                user_agent: userAgent,
                subscribed_at: new Date().toISOString(),
            }),
        },
    );
}

function buildWelcomeEmail(email: string, unsubscribeToken: string) {
    const unsubscribeUrl = `${SITE_URL}/api/unsubscribe?token=${encodeURIComponent(unsubscribeToken)}`;
    const safeEmail = escapeHtml(email);

    const html = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Welcome to Sai Ram Maruri's writing updates</title>
</head>
<body style="margin:0;background:#f5f1e8;font-family:Arial,sans-serif;color:#17140f;">
  <div style="padding:32px 16px;">
    <div style="max-width:640px;margin:0 auto;background:#fffdf8;border:1px solid #e0d7c5;border-radius:28px;overflow:hidden;box-shadow:0 24px 80px rgba(32,25,15,0.08);">
      <div style="height:6px;background:linear-gradient(90deg,#5d7414 0%,#c2d18f 100%);"></div>
      <div style="padding:32px;">
        <p style="margin:0 0 12px;font-size:12px;letter-spacing:0.18em;text-transform:uppercase;color:#7e8660;font-weight:700;">Welcome</p>
        <h1 style="margin:0 0 16px;font-size:32px;line-height:1.08;">Thanks for subscribing.</h1>
        <p style="margin:0 0 16px;font-size:16px;line-height:1.7;color:#6f695c;">
          ${safeEmail} is now on the list for new writing from Sai Ram Maruri.
        </p>
        <p style="margin:0 0 20px;font-size:16px;line-height:1.7;color:#6f695c;">
          You’ll get fresh posts on AI systems, agents, cloud delivery, developer tools, and practical lessons from building production software.
        </p>
        <a href="${SITE_URL}/writing" style="display:inline-block;background:#171d10;color:#ffffff;text-decoration:none;padding:14px 22px;border-radius:999px;font-weight:700;">
          Read the latest writing
        </a>
        <div style="margin-top:28px;padding-top:24px;border-top:1px solid #e8e1d1;">
          <p style="margin:0 0 12px;font-size:13px;line-height:1.7;color:#6f695c;">
            Replies go straight to ${escapeHtml(process.env.RESEND_REPLY_TO || DEFAULT_REPLY_TO)}.
          </p>
          <p style="margin:0;font-size:12px;line-height:1.7;color:#8b8376;">
            If this was not you or you want to stop updates later,
            <a href="${unsubscribeUrl}" style="color:#5d7414;">unsubscribe here</a>.
          </p>
        </div>
      </div>
    </div>
  </div>
</body>
</html>`;

    const text = [
        "Thanks for subscribing to Sai Ram Maruri's writing updates.",
        "",
        `${email} is now on the list for new posts.`,
        "",
        `Read the latest writing: ${SITE_URL}/writing`,
        `Unsubscribe: ${unsubscribeUrl}`,
    ].join("\n");

    return { html, text };
}

function buildReactivatedEmail(email: string, unsubscribeToken: string) {
    const unsubscribeUrl = `${SITE_URL}/api/unsubscribe?token=${encodeURIComponent(unsubscribeToken)}`;
    const safeEmail = escapeHtml(email);

    const html = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Welcome back to Sai Ram Maruri's writing updates</title>
</head>
<body style="margin:0;background:#f5f1e8;font-family:Arial,sans-serif;color:#17140f;">
  <div style="padding:32px 16px;">
    <div style="max-width:640px;margin:0 auto;background:#fffdf8;border:1px solid #e0d7c5;border-radius:28px;overflow:hidden;box-shadow:0 24px 80px rgba(32,25,15,0.08);">
      <div style="height:6px;background:linear-gradient(90deg,#5d7414 0%,#c2d18f 100%);"></div>
      <div style="padding:32px;">
        <p style="margin:0 0 12px;font-size:12px;letter-spacing:0.18em;text-transform:uppercase;color:#7e8660;font-weight:700;">Welcome Back</p>
        <h1 style="margin:0 0 16px;font-size:32px;line-height:1.08;">Your writing subscription is active again.</h1>
        <p style="margin:0 0 16px;font-size:16px;line-height:1.7;color:#6f695c;">
          ${safeEmail} is back on the list for new writing from Sai Ram Maruri.
        </p>
        <p style="margin:0 0 20px;font-size:16px;line-height:1.7;color:#6f695c;">
          You’ll start receiving future posts on AI systems, agents, cloud delivery, and developer workflows again.
        </p>
        <a href="${SITE_URL}/writing" style="display:inline-block;background:#171d10;color:#ffffff;text-decoration:none;padding:14px 22px;border-radius:999px;font-weight:700;">
          See what's new
        </a>
        <div style="margin-top:28px;padding-top:24px;border-top:1px solid #e8e1d1;">
          <p style="margin:0 0 12px;font-size:13px;line-height:1.7;color:#6f695c;">
            Replies go straight to ${escapeHtml(process.env.RESEND_REPLY_TO || DEFAULT_REPLY_TO)}.
          </p>
          <p style="margin:0;font-size:12px;line-height:1.7;color:#8b8376;">
            Want to leave again?
            <a href="${unsubscribeUrl}" style="color:#5d7414;">Unsubscribe here</a>.
          </p>
        </div>
      </div>
    </div>
  </div>
</body>
</html>`;

    const text = [
        "Your Sai Ram Maruri writing subscription is active again.",
        "",
        `${email} is back on the list for future posts.`,
        "",
        `Read the latest writing: ${SITE_URL}/writing`,
        `Unsubscribe: ${unsubscribeUrl}`,
    ].join("\n");

    return { html, text };
}

async function sendEmail(email: string, unsubscribeToken: string, mode: "welcome" | "reactivated") {
    const resendApiKey = process.env.RESEND_API_KEY;
    const from = process.env.RESEND_FROM_EMAIL || DEFAULT_FROM_EMAIL;
    const replyTo = process.env.RESEND_REPLY_TO || DEFAULT_REPLY_TO;

    if (!resendApiKey) {
        console.warn("Welcome email skipped: missing RESEND_API_KEY.");
        return false;
    }

    if (/@gmail\.com/i.test(from)) {
        console.warn("Welcome email skipped: RESEND_FROM_EMAIL must use a verified domain sender.");
        return false;
    }

    const content = mode === "welcome"
        ? buildWelcomeEmail(email, unsubscribeToken)
        : buildReactivatedEmail(email, unsubscribeToken);

    const response = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
            Authorization: `Bearer ${resendApiKey}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            from,
            to: [email],
            subject: mode === "welcome"
                ? "Welcome to Sai Ram Maruri's writing updates"
                : "Welcome back to Sai Ram Maruri's writing updates",
            html: content.html,
            text: content.text,
            reply_to: replyTo,
        }),
    });

    if (!response.ok) {
        const body = await response.text();
        throw new Error(`Resend welcome email failed (${response.status}): ${body}`);
    }

    return true;
}

export default async function handler(req: ApiRequest, res: ApiResponse) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    const email = normalizeEmail(String(req.body?.email || ""));
    if (!email) {
        return res.status(400).json({ error: "Email is required" });
    }

    if (!EMAIL_PATTERN.test(email)) {
        return res.status(400).json({ error: "Please provide a valid email address" });
    }

    const userAgent = typeof req.headers["user-agent"] === "string" ? req.headers["user-agent"] : null;

    try {
        const existingSubscriber = await getSubscriber(email);

        if (existingSubscriber?.is_active) {
            return res.status(200).json({
                status: "already_subscribed",
                welcomeEmailSent: false,
            });
        }

        const unsubscribeToken = crypto.randomUUID();

        if (existingSubscriber) {
            await reactivateSubscriber(email, userAgent, unsubscribeToken);

            let reactivationEmailSent = false;
            try {
                reactivationEmailSent = await sendEmail(email, unsubscribeToken, "reactivated");
            } catch (emailError) {
                console.error("Reactivation email failed:", emailError);
            }

            return res.status(200).json({
                status: "reactivated",
                welcomeEmailSent: reactivationEmailSent,
            });
        }

        await insertSubscriber(email, userAgent, unsubscribeToken);

        let welcomeEmailSent = false;
        try {
            welcomeEmailSent = await sendEmail(email, unsubscribeToken, "welcome");
        } catch (emailError) {
            console.error("Welcome email failed:", emailError);
        }

        return res.status(200).json({
            status: "subscribed",
            welcomeEmailSent,
        });
    } catch (error) {
        if (isDuplicateSubscriberError(error)) {
            return res.status(200).json({
                status: "already_subscribed",
                welcomeEmailSent: false,
            });
        }

        console.error("Writing subscription failed:", error);
        return res.status(500).json({
            error: "Subscription failed. Please try again in a moment.",
        });
    }
}
