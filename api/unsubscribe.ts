import type { VercelRequest, VercelResponse } from "@vercel/node";

const SITE_URL = "https://saiii.in";

const renderPage = (title: string, message: string, statusCode = 200) => `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${title}</title>
  <style>
    :root {
      color-scheme: light;
      --bg: #f5f1e8;
      --panel: #fffdf8;
      --border: #e0d7c5;
      --text: #17140f;
      --muted: #6f695c;
      --accent: #5d7414;
    }
    * { box-sizing: border-box; }
    body {
      margin: 0;
      min-height: 100vh;
      display: grid;
      place-items: center;
      padding: 24px;
      font-family: Arial, sans-serif;
      background: radial-gradient(circle at top, #fbf8f1 0%, var(--bg) 55%, #efe7d7 100%);
      color: var(--text);
    }
    main {
      width: min(100%, 560px);
      border: 1px solid var(--border);
      border-radius: 28px;
      background: var(--panel);
      padding: 32px;
      box-shadow: 0 28px 80px rgba(32, 25, 15, 0.08);
    }
    h1 {
      margin: 0 0 12px;
      font-size: 2rem;
      line-height: 1.05;
    }
    p {
      margin: 0;
      color: var(--muted);
      font-size: 1rem;
      line-height: 1.6;
    }
    a {
      display: inline-block;
      margin-top: 24px;
      color: white;
      text-decoration: none;
      background: var(--accent);
      padding: 12px 18px;
      border-radius: 999px;
      font-weight: 700;
    }
  </style>
</head>
<body>
  <main>
    <h1>${title}</h1>
    <p>${message}</p>
    <a href="${SITE_URL}/blogs">Back to the blog</a>
  </main>
</body>
</html>`;

export default async function handler(req: VercelRequest, res: VercelResponse) {
    if (req.method !== "GET") {
        return res.status(405).send(renderPage("Method not allowed", "This endpoint only supports one-click unsubscribe links.", 405));
    }

    const supabaseUrl = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    const token = typeof req.query.token === "string" ? req.query.token.trim() : "";

    if (!supabaseUrl || !serviceRoleKey) {
        return res.status(503).send(renderPage("Unavailable", "Newsletter unsubscribe is not configured yet. Try again later.", 503));
    }

    if (!token) {
        return res.status(400).send(renderPage("Missing link", "This unsubscribe link is incomplete. Use the full link from your email.", 400));
    }

    try {
        const response = await fetch(
            `${supabaseUrl}/rest/v1/blog_subscribers?unsubscribe_token=eq.${encodeURIComponent(token)}&select=id,is_active`,
            {
                method: "PATCH",
                headers: {
                    apikey: serviceRoleKey,
                    Authorization: `Bearer ${serviceRoleKey}`,
                    "Content-Type": "application/json",
                    Prefer: "return=representation",
                },
                body: JSON.stringify({
                    is_active: false,
                    unsubscribed_at: new Date().toISOString(),
                }),
            },
        );

        if (!response.ok) {
            const errorText = await response.text();
            console.error("Unsubscribe failed:", errorText);
            return res.status(500).send(renderPage("Unsubscribe failed", "We could not update your preference right now. Please try again later.", 500));
        }

        const data = (await response.json()) as Array<{ id: number; is_active: boolean }>;
        if (!data.length) {
            return res.status(404).send(renderPage("Link expired", "This unsubscribe link is no longer valid, or that email was already removed.", 404));
        }

        return res.status(200).send(renderPage("You’re unsubscribed", "You will no longer receive future blog update emails from saiii.in."));
    } catch (error) {
        console.error("Unexpected unsubscribe error:", error);
        return res.status(500).send(renderPage("Unsubscribe failed", "We hit an unexpected error while removing you from the list.", 500));
    }
}
