// Typo catcher for the waitlist forms.
//
// A format-valid address at a domain that doesn't exist (gmial.com,
// yahoo.co) is accepted by every regex and by beehiiv, then silently never
// delivers — the person believes they joined and never hears from us. This
// suggests the intended domain instead. Deliberately NON-BLOCKING: a
// suggestion is offered once, and a second submit goes through untouched,
// because some real domains look like typos and we never trap anyone.
//
// Pure, dependency-free, no I/O — safe to unit test.

/** Domains common enough that a near-miss is almost always a typo. Anything
 *  listed here is treated as correct and never triggers a suggestion, so
 *  real look-alikes (ymail.com vs gmail.com) must stay in this list. */
const KNOWN = [
  "gmail.com",
  "googlemail.com",
  "yahoo.com",
  "ymail.com",
  "yahoo.ca",
  "yahoo.co.uk",
  "hotmail.com",
  "hotmail.ca",
  "hotmail.co.uk",
  "outlook.com",
  "live.com",
  "live.ca",
  "msn.com",
  "icloud.com",
  "me.com",
  "mac.com",
  "aol.com",
  "proton.me",
  "protonmail.com",
  "pm.me",
  "mail.com",
  "mail.ru",
  "gmx.com",
  "gmx.de",
  "web.de",
  "yandex.com",
  "zoho.com",
  "fastmail.com",
  "hey.com",
  "duck.com",
  "tutanota.com",
  "shaw.ca",
  "telus.net",
  "rogers.com",
  "sympatico.ca",
];

/** Standard Levenshtein distance, two-row rolling buffer. */
function distance(a: string, b: string): number {
  if (a === b) return 0;
  let prev = Array.from({ length: b.length + 1 }, (_, i) => i);
  for (let i = 1; i <= a.length; i += 1) {
    const row = [i];
    for (let j = 1; j <= b.length; j += 1) {
      row[j] = Math.min(
        prev[j] + 1,
        row[j - 1] + 1,
        prev[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1),
      );
    }
    prev = row;
  }
  return prev[b.length];
}

/**
 * Returns a corrected address, or null when the domain is already known,
 * unrecognisable, or too far from anything to guess safely.
 *
 *   suggestEmail("pops@gmial.com") === "pops@gmail.com"
 *   suggestEmail("pops@gmail.com") === null
 *   suggestEmail("pops@popspine.com") === null
 */
export function suggestEmail(email: string): string | null {
  const at = email.lastIndexOf("@");
  if (at < 1 || at === email.length - 1) return null;

  const local = email.slice(0, at);
  const domain = email.slice(at + 1).toLowerCase();
  if (!domain.includes(".") || KNOWN.includes(domain)) return null;

  // One edit for short domains, two for longer ones — a transposition
  // (gmial → gmail) costs two under plain Levenshtein.
  const budget = domain.length >= 8 ? 2 : 1;

  let best: string | null = null;
  let bestD = Infinity;
  for (const known of KNOWN) {
    if (Math.abs(known.length - domain.length) > budget) continue;
    const d = distance(domain, known);
    if (d < bestD) {
      bestD = d;
      best = known;
    }
  }

  return best && bestD > 0 && bestD <= budget ? `${local}@${best}` : null;
}
