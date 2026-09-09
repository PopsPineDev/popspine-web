// Waitlist membership memory for this device.
//
// TWO distinct states, deliberately kept apart:
//
//   PENDING  — the form was submitted and beehiiv accepted the address.
//              That is NOT proof the address exists: a typo'd domain is
//              accepted and then silently never delivers. Session-scoped
//              only, so it keeps the three forms in sync during one visit
//              and then forgets.
//
//   JOINED   — the person clicked the link in the confirmation email and
//              landed back here on ?subscribed=1. That is real proof: the
//              mailbox exists and a human controls it. Durable, no expiry.
//
// Writing JOINED on submit (as this file used to) told anyone who mistyped
// their address "You're already in ✓" forever, with the input removed and
// no way to correct it. Only confirmation sets JOINED.

const JOINED_KEY = "ps_joined_v1";
const PENDING_KEY = "ps_pending_v1";

export const JOINED_EVENT = "ps:joined";
export const PENDING_EVENT = "ps:pending";

/** Confirmed via the double-opt-in redirect. Durable. */
export function saveJoined() {
  try {
    localStorage.setItem(JOINED_KEY, String(Date.now()));
  } catch {
    /* storage unavailable — state just won't persist */
  }
  window.dispatchEvent(new Event(JOINED_EVENT));
}

export function isJoined(): boolean {
  try {
    return localStorage.getItem(JOINED_KEY) !== null;
  } catch {
    return false;
  }
}

/** Submitted, awaiting confirmation. This visit only. */
export function markPending() {
  try {
    sessionStorage.setItem(PENDING_KEY, String(Date.now()));
  } catch {
    /* storage unavailable — the in-page event still syncs the forms */
  }
  window.dispatchEvent(new Event(PENDING_EVENT));
}

export function isPending(): boolean {
  try {
    return sessionStorage.getItem(PENDING_KEY) !== null;
  } catch {
    return false;
  }
}
