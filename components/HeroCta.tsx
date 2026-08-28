"use client";

import { useVerified } from "@/lib/useVerified";

/**
 * Hero primary CTA — mirrors the nav's verified badge: once the connected
 * wallet has a live agent approval (24h memory), the ask flips from
 * "go verify" to a calm "already verified" badge that still links to #proof.
 */
export function HeroCta() {
  const verified = useVerified();

  return (
    <a className={`btn${verified ? " btn-done" : ""}`} href="#proof">
      {verified ? "Wallet verified ✓" : "Verify it yourself →"}
    </a>
  );
}
