"use client";

import { useEffect, useState } from "react";
import { isJoined, saveJoined, JOINED_EVENT } from "@/lib/joined";

const ENDPOINT = process.env.NEXT_PUBLIC_WAITLIST_ENDPOINT || "";

type Status = "idle" | "sending" | "sent" | "error" | "joined";

/**
 * Shared waitlist capture — used by the announcement bar, the proof card,
 * and the bottom Early Access section. POSTs JSON {email} to the waitlist
 * endpoint (/api/subscribe → beehiiv). Success copy is canonical:
 * "You're on the list ✓" on the button, and (where a message line exists)
 * "Check your inbox — first ledger goes out weekly."
 *
 * Returning members: a successful signup on this device, or landing from
 * the beehiiv confirmation redirect (?subscribed=1), stores a durable
 * joined flag — every instance then shows "You're already in ✓" instead
 * of asking again.
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
      if (isJoined()) setStatus((s) => (s === "sent" ? s : "joined"));
    };
    check();
    window.addEventListener(JOINED_EVENT, check);
    return () => window.removeEventListener(JOINED_EVENT, check);
  }, []);

  const defaultMsg = "No spam — build-log emails only. Unsubscribe whenever.";
  const msg =
    status === "sent"
      ? "Check your inbox — first ledger goes out weekly."
      : status === "joined"
        ? "Ledgers land in your inbox weekly. Nothing else to do."
        : status === "error"
          ? "Something went wrong — try again, or DM @PopsPineDev."
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

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const value = email.trim();
    if (!value || status === "sending") return;
    if (!ENDPOINT) {
      setStatus("error");
      return;
    }
    setStatus("sending");
    try {
      const r = await fetch(ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ email: value, source: "popspine.com" }),
      });
      if (!r.ok) throw new Error(String(r.status));
      setStatus("sent");
      setEmail("");
      saveJoined();
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 2800);
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
            onChange={(e) => setEmail(e.target.value)}
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
      {showMessage && (
        <div className="micro" id="wlmsg" aria-live="polite">
          {msg}
        </div>
      )}
    </>
  );
}
