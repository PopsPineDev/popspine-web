// Analytics events — self-hosted Umami at analytics.popspine.com.
//
// Page views alone can't answer the question that matters: does the proof
// section convert, or lose people? That section IS the differentiator, so
// the gap between "connected a wallet" and "read the permission and signed"
// is the number worth having. Same for the waitlist: a submit tells you
// little; a submit next to a count of format and domain rejections tells
// you whether the validation work is helping or getting in the way.
//
// No cookies, no fingerprinting, no cross-site identifiers — which is why
// none of this needs a consent banner. Nothing here identifies a person;
// these are counters.

declare global {
  interface Window {
    umami?: { track: (event: string, data?: Record<string, unknown>) => void };
  }
}

/**
 * Fire and forget. Optional-chained and wrapped, because analytics must
 * never be able to throw inside a wallet flow or a form submit — a blocked
 * script, an ad blocker, or a slow load must cost a counter, not a feature.
 */
export function track(event: string) {
  try {
    window.umami?.track(event);
  } catch {
    /* analytics is never allowed to break the page */
  }
}
