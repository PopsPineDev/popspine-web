"use client";

import { useState } from "react";

type Status = "idle" | "sending" | "sent" | "error";

const ENDPOINT = process.env.NEXT_PUBLIC_WAITLIST_ENDPOINT || "";

export function WaitlistForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!ENDPOINT) {
      setStatus("error");
      return;
    }
    setStatus("sending");
    try {
      const res = await fetch(ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ email, source: "popspine.com" }),
      });
      setStatus(res.ok ? "sent" : "error");
    } catch {
      setStatus("error");
    }
  }

  return (
    <section id="waitlist" className="section py-20">
      <div className="card mx-auto max-w-2xl p-8 text-center sm:p-10">
        <h2 className="text-2xl font-semibold sm:text-3xl">Get early access</h2>
        <p className="mt-3 text-textDim">
          Strategy rental on <span className="font-mono">app.popspine.com</span> isn&apos;t
          live yet — leave your email and you&apos;ll hear the moment it is.
        </p>

        {status === "sent" ? (
          <p className="mt-8 text-accent">You&apos;re on the list. Talk soon.</p>
        ) : (
          <form onSubmit={onSubmit} className="mt-8 flex flex-col gap-3 sm:flex-row">
            <input
              type="email"
              required
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 rounded-xl border border-panelBorder bg-ink px-4 py-3 text-sm outline-none focus:border-accent"
            />
            <button
              type="submit"
              disabled={status === "sending"}
              className="rounded-xl bg-accent px-6 py-3 font-medium text-ink transition hover:bg-accent/90 disabled:opacity-50"
            >
              {status === "sending" ? "Joining…" : "Join waitlist"}
            </button>
          </form>
        )}
        {status === "error" && (
          <p className="mt-4 text-xs text-red-400">
            {ENDPOINT
              ? "Something didn't go through — try again in a moment."
              : "Waitlist isn't wired up to a live endpoint yet (see README: set NEXT_PUBLIC_WAITLIST_ENDPOINT)."}
          </p>
        )}
      </div>
    </section>
  );
}
