// 24h "signature verified" memory, shared between the proof card and the
// nav CTA. localStorage (not a cookie) — nothing is sent to any server, it
// only survives on this device/browser. Wallet *connection* persistence is
// handled by wagmi itself (it auto-reconnects on revisit); this only
// remembers that a given address already completed the approveAgent demo.

const KEY = "ps_verified_v1";
const TTL_MS = 24 * 60 * 60 * 1000;

export const VERIFIED_EVENT = "ps:verified";

export function saveVerified(addr: string) {
  try {
    localStorage.setItem(
      KEY,
      JSON.stringify({ addr: addr.toLowerCase(), at: Date.now() }),
    );
  } catch {
    /* storage unavailable — badge just won't persist */
  }
  window.dispatchEvent(new Event(VERIFIED_EVENT));
}

export function isVerified(addr?: string): boolean {
  if (!addr) return false;
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return false;
    const { addr: stored, at } = JSON.parse(raw) as {
      addr?: string;
      at?: number;
    };
    if (typeof at !== "number" || Date.now() - at > TTL_MS) {
      localStorage.removeItem(KEY);
      return false;
    }
    return stored === addr.toLowerCase();
  } catch {
    return false;
  }
}
