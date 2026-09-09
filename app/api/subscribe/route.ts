import { NextResponse } from "next/server";
import { promises as dns } from "dns";
import { isValidEmail } from "@/lib/email";

/**
 * Waitlist relay: the site forms POST {email, source} here, and this route
 * creates the subscription in beehiiv server-side. The API key never
 * reaches the browser. With double opt-in enabled in beehiiv, the
 * subscriber gets a confirmation email, then the welcome email.
 *
 * Three gates, weakest to strongest:
 *   1. format     — shared regex, same rule the browser applied
 *   2. MX lookup  — does the domain accept mail at all? Catches invented
 *                   and unregistered domains that the regex can't see.
 *   3. double opt-in (beehiiv) — the only real proof: a human opened the
 *                   mail and clicked. Nothing here can substitute for it.
 *
 * Required env vars (server-side, NOT NEXT_PUBLIC):
 *   BEEHIIV_API_KEY        — beehiiv Settings → Workspace → API
 *   BEEHIIV_PUBLICATION_ID — starts with "pub_", same page
 */

// dns needs the Node runtime; App Router defaults to it, but say so
// explicitly so an edge migration can't silently break the MX gate.
export const runtime = "nodejs";

const DNS_TIMEOUT_MS = 3000;

/**
 * true  — the domain publishes MX records
 * false — it does not (no MX, or the domain doesn't resolve at all)
 * null  — we couldn't find out (timeout, SERVFAIL)
 *
 * Fails OPEN on null: a DNS blip must never cost a real signup. Only a
 * definitive "no mail exchanger" rejects.
 *
 * MX is REQUIRED, deliberately. RFC 5321 allows falling back to the A
 * record when no MX exists, and an earlier version honoured that — but
 * parked and squatted domains almost always have an A record and no MX,
 * so the fallback let asdfghjkl.com through. Requiring MX turns those into
 * a clear "that domain can't receive email" instead of a signup the person
 * believes worked. The cost, accepted knowingly: a domain that really does
 * receive mail on its A record alone is now refused. That setup is rare,
 * and the footer carries a contact address.
 *
 * Note what this cannot do: gmil.com publishes a live MX (a typosquatter
 * that collects mail), so no DNS check will ever flag it. The typo
 * suggester is what catches that class, which is why both layers exist.
 */
async function domainAcceptsMail(domain: string): Promise<boolean | null> {
  let timer: ReturnType<typeof setTimeout> | undefined;
  const timeout = new Promise<null>((resolve) => {
    timer = setTimeout(() => resolve(null), DNS_TIMEOUT_MS);
  });

  const lookup = (async (): Promise<boolean | null> => {
    try {
      const mx = await dns.resolveMx(domain);
      return mx.length > 0;
    } catch (e) {
      const code = (e as NodeJS.ErrnoException).code;
      // ENOTFOUND = no such domain, ENODATA = domain exists, no MX. Both
      // are definitive. Anything else is transient — fail open.
      if (code === "ENOTFOUND" || code === "ENODATA") return false;
      return null;
    }
  })();

  try {
    return await Promise.race([lookup, timeout]);
  } finally {
    if (timer) clearTimeout(timer);
  }
}

export async function POST(req: Request) {
  const apiKey = process.env.BEEHIIV_API_KEY;
  const pubId = process.env.BEEHIIV_PUBLICATION_ID;
  if (!apiKey || !pubId) {
    return NextResponse.json({ error: "not_configured" }, { status: 500 });
  }

  let email = "";
  try {
    const body = (await req.json()) as { email?: unknown };
    if (typeof body.email === "string") email = body.email.trim();
  } catch {
    /* fall through to validation */
  }

  if (!isValidEmail(email)) {
    return NextResponse.json({ error: "invalid_format" }, { status: 400 });
  }

  const domain = email.slice(email.lastIndexOf("@") + 1).toLowerCase();
  if ((await domainAcceptsMail(domain)) === false) {
    return NextResponse.json({ error: "no_mx" }, { status: 400 });
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
    return NextResponse.json({ error: "subscribe_failed" }, { status: 502 });
  }

  // beehiiv accepts, then reports its own state (validating / pending /
  // active). A subscriber sitting in validating or pending won't appear in
  // the default Active view, which reads as "nothing arrived" — log the
  // status so that question is answerable from the server logs instead of
  // guessed at from the dashboard.
  try {
    const { data } = (await r.json()) as { data?: { status?: string } };
    console.log("beehiiv subscribe ok", { domain, status: data?.status });
  } catch {
    /* body isn't required — the 2xx is what matters */
  }

  return NextResponse.json({ ok: true });
}
