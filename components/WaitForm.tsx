"use client";

import { useState } from "react";

const ENDPOINT = process.env.NEXT_PUBLIC_WAITLIST_ENDPOINT || "";

type Status = "idle" | "sending" | "sent" | "error";

/**
 * Shared waitlist capture — used by both the announcement bar and the
 * bottom Early Access section. POSTs JSON {email} to the Formspree endpoint.
 * Success copy is canonical: "You're on the list ✓" on the button, and
 * (where a message line exists) "Check your inbox — first ledger goes out
 * weekly."
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

  const defaultMsg = "No spam — build-log emails only. Unsubscribe whenever.";
  const msg =
    status === "sent"
      ? "Check your inbox — first ledger goes out weekly."
      : status === "error"
        ? "Something went wrong — try again, or DM @PopsPineDev."
        : defaultMsg;

  const label =
    status === "sending"
      ? "Adding…"
      : status === "sent"
        ? "You’re on the list ✓"
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
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 2800);
    }
  }

  return (
    <>
      <form className={className} onSubmit={onSubmit} data-wl>
        <input
          type="email"
          placeholder="you@email.com"
          required
          aria-label="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button
          className="btn btn-join"
          type="submit"
          disabled={status === "sending" || status === "sent"}
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
