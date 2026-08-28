import { NextResponse } from "next/server";

/**
 * Waitlist relay: the site forms POST {email, source} here, and this route
 * creates the subscription in beehiiv server-side. The API key never
 * reaches the browser. With double opt-in enabled in beehiiv, the
 * subscriber gets a confirmation email, then the welcome email.
 *
 * Required env vars (server-side, NOT NEXT_PUBLIC):
 *   BEEHIIV_API_KEY        — beehiiv Settings → Workspace → API
 *   BEEHIIV_PUBLICATION_ID — starts with "pub_", same page
 */

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: Request) {
  const apiKey = process.env.BEEHIIV_API_KEY;
  const pubId = process.env.BEEHIIV_PUBLICATION_ID;
  if (!apiKey || !pubId) {
    return NextResponse.json({ error: "not configured" }, { status: 500 });
  }

  let email = "";
  try {
    const body = (await req.json()) as { email?: unknown };
    if (typeof body.email === "string") email = body.email.trim();
  } catch {
    /* fall through to validation */
  }
  if (!EMAIL_RE.test(email) || email.length > 320) {
    return NextResponse.json({ error: "invalid email" }, { status: 400 });
  }

  const r = await fetch(
    `https://api.beehiiv.com/v2/publications/${pubId}/subscriptions`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        // Preset welcome email + double opt-in are configured in beehiiv;
        // reactivate lets someone who unsubscribed rejoin via the form.
        reactivate_existing: true,
        send_welcome_email: false,
        utm_source: "popspine.com",
        utm_medium: "site_form",
      }),
    },
  );

  if (!r.ok) {
    // Don't leak upstream details to the browser; log server-side only.
    console.error("beehiiv subscribe failed", r.status, await r.text());
    return NextResponse.json({ error: "subscribe failed" }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
