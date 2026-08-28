// Durable "already on the waitlist" memory for this device. Unlike the
// 24h wallet-verified badge, membership doesn't expire — once joined (or
// arriving from the beehiiv confirmation redirect ?subscribed=1), every
// WaitForm on the page shows "You're already in ✓" instead of asking again.

const KEY = "ps_joined_v1";

export const JOINED_EVENT = "ps:joined";

export function saveJoined() {
  try {
    localStorage.setItem(KEY, String(Date.now()));
  } catch {
    /* storage unavailable — state just won't persist */
  }
  window.dispatchEvent(new Event(JOINED_EVENT));
}

export function isJoined(): boolean {
  try {
    return localStorage.getItem(KEY) !== null;
  } catch {
    return false;
  }
}
