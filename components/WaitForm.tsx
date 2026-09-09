"use client";

import { useEffect, useState } from "react";
import {
  isJoined,
  saveJoined,
  pendingEmail,
  markPending,
  JOINED_EVENT,
  PENDING_EVENT,
} from "@/lib/joined";
import { suggestEmail, isValidEmail } from "@/lib/email";

const ENDPOINT = process.env.NEXT_PUBLIC_WAITLIST_ENDPOINT || "";

type Status = "idle" | "sending" | "sent" | "error" | "joined";

/**
 * Shared waitlist capture — used by the announcement bar, the proof card,
 * and the bottom Early Access section. POSTs JSON {email} to the waitlist
 * endpoint (/api/subscribe → beehiiv, double opt-in).
 *
 * Two things this component is careful about:
 *
 *  1. A submit is NOT a confirmation. beehiiv accepts a typo'd domain
 *     happily and it then never delivers, so a successful POST only marks
 *     this visit pending ("You're on the list ✓ / check your inbox"). The
 *     durable "You're already in ✓" state is set solely by the double
 *     opt-in redirect (?subscribed=1), which proves a human opened the
 *     mail. Anything else claims membership we can't verify.
 *
 *  2. A near-miss domain (gmial.com) gets one suggestion before the submit
 *     goes through — offered, never enforced, so an unusual-but-real
 *     address is never blocked.
 */
export function WaitForm({
  className,
  showMessage = false,
}: {
  className?: string;
  showMessage?: boolean;
}) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [hint, setHint] = useState<string | null>(null);
  const [hintShown, setHintShown] = useState(false);
  const [reason, setReason] = useState<string | null>(null);

  useEffect(() => {
    // ?subscribed=1 = arrival from the beehiiv double-opt-in confirmation.
    // Guarded so only one WaitForm instance cleans the URL; saveJoined
    // broadcasts to the others via the event.
    const url = new URL(window.location.href);
    if (url.searchParams.get("subscribed") === "1") {
      url.searchParams.delete("subscribed");
      window.history.replaceState(null, "", url.toString());
      saveJoined();
    }
    const check = () => {
      if (isJoined()) {
        setStatus("joined");
        return;
      }
      // Every form shows the same address back, and it survives a reload
      // within the visit — the receipt is the point.
      const pending = pendingEmail();
      if (pending) {
        setEmail(pending);
        setStatus((s) => (s === "idle" ? "sent" : s));
      }
    };
    check();
    window.addEventListener(JOINED_EVENT, check);
    window.addEventListener(PENDING_EVENT, check);
    return () => {
      window.removeEventListener(JOINED_EVENT, check);
      window.removeEventListener(PENDING_EVENT, check);
    };
  }, []);

  const defaultMsg = "No spam — build-log emails only. Unsubscribe whenever.";
  const msg =
    status === "sent"
      ? "Check your inbox — first ledger goes out weekly."
      : status === "joined"
        ? "Ledgers land in your inbox weekly. Nothing else to do."
        : status === "error"
          ? (reason ?? "Something went wrong — try again, or DM @PopsPineDev.")
          : defaultMsg;

  const label =
    status === "sending"
      ? "Adding…"
      : status === "sent"
        ? "You’re on the list ✓"
        : status === "joined"
          ? "You’re already in ✓"
          : status === "error"
            ? "That didn’t send"
            : "Join early access";

  function onEmailChange(value: string) {
    setEmail(value);
    // A new value deserves a fresh look — drop any stale suggestion and
    // let it be offered again.
    if (hint) setHint(null);
    if (hintShown) setHintShown(false);
    if (status === "error") {
      setStatus("idle");
      setReason(null);
    }
  }

  function fail(message: string) {
    setReason(message);
    setStatus("error");
  }

  function acceptHint() {
    if (!hint) return;
    setEmail(hint);
    setHint(null);
    setHintShown(true); // already corrected — don't re-prompt
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const value = email.trim();
    if (!value || status === "sending") return;

    // Format first — a malformed address never reaches the network.
    if (!isValidEmail(value)) {
      fail("That isn’t a complete address — check the @ and the ending.");
      return;
    }

    // Offer a correction once. A second submit of the same value proceeds,
    // so an unusual-but-real domain is never blocked.
    if (!hintShown) {
      const suggestion = suggestEmail(value);
      if (suggestion && suggestion !== value) {
        setHint(suggestion);
        setHintShown(true);
        return;
      }
      setHintShown(true);
    }

    if (!ENDPOINT) {
      fail("Something went wrong — try again, or DM @PopsPineDev.");
      return;
    }
    setStatus("sending");
    setReason(null);
    try {
      const r = await fetch(ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ email: value, source: "popspine.com" }),
      });
      if (!r.ok) {
        // The route names why, so the person can fix it instead of
        // guessing. Anything unrecognised falls back to the generic line.
        let code = "";
        try {
          code = ((await r.json()) as { error?: string }).error ?? "";
        } catch {
          /* no body — generic message */
        }
        if (code === "no_mx") {
          fail("That domain can’t receive email — check the spelling.");
        } else if (code === "invalid_format") {
          fail("That isn’t a complete address — check the @ and the ending.");
        } else {
          fail("Something went wrong — try again, or DM @PopsPineDev.");
        }
        return;
      }
      setStatus("sent");
      setHint(null);
      setReason(null);
      // Keep the address in the field as a receipt — the person can see
      // exactly where it went, and a typo is far easier to catch read back
      // than recalled. Pending for this visit only; confirmation is what
      // makes it real.
      setEmail(value);
      markPending(value);
    } catch {
      fail("Something went wrong — try again, or DM @PopsPineDev.");
    }
  }

  return (
    <>
      <form className={className} onSubmit={onSubmit} data-wl>
        {status !== "joined" && (
          <input
            type="email"
            placeholder="you@email.com"
            required
            aria-label="Email address"
            value={email}
            // Once submitted the field is a receipt, not an input — kept
            // readable rather than disabled so the address stays legible.
            readOnly={status === "sent"}
            onChange={(e) => onEmailChange(e.target.value)}
            onBlur={() => {
              if (!hintShown && email.trim()) {
                const suggestion = suggestEmail(email.trim());
                if (suggestion) setHint(suggestion);
              }
            }}
          />
        )}
        <button
          className="btn btn-join"
          type="submit"
          disabled={status === "sending" || status === "sent" || status === "joined"}
        >
          {label}
        </button>
      </form>
      {hint && status !== "joined" && (
        <div className="micro wl-hint" aria-live="polite">
          Did you mean{" "}
          <button type="button" className="wl-hint-btn" onClick={acceptHint}>
            {hint}
          </button>
          ?
        </div>
      )}
      {/* The announce bar renders no message line, but an error must always
          be readable — otherwise the only feedback is a button label. */}
      {(showMessage || status === "error") && (
        <div
          className={showMessage ? "micro" : "micro wl-hint"}
          id={showMessage ? "wlmsg" : undefined}
          aria-live="polite"
        >
          {msg}
        </div>
      )}
    </>
  );
}
