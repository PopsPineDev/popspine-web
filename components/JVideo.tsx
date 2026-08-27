"use client";

import { useState } from "react";

/**
 * Demo-video slot from the video kit.
 *
 * PORT NOTE: when /public/demo.mp4 exists, replace ONLY the inner
 * .jvideo-poster below with:
 *
 *   <video src="/demo.mp4" poster="/demo-poster.jpg" preload="metadata"
 *          controls playsInline
 *          style={{width:"100%",height:"100%",display:"block",objectFit:"cover"}} />
 *
 * Keep the outer .jvideo glass card and the .jv-reqs rows untouched, and
 * lazy-load below the fold. Do NOT use a YouTube iframe. Until the video
 * ships, the play button shows an honest status line instead of pretending.
 */
export function JVideo() {
  const [status, setStatus] = useState("");

  return (
    <div className="jvideo rv d1">
      <div className="jvideo-poster">
        <div className="jv-grid" aria-hidden="true"></div>
        <div className="jv-tag">demo &middot; 60 seconds &middot; testnet</div>
        <button
          className="jv-play"
          id="jv-play"
          aria-label="Play the demo"
          onClick={() =>
            setStatus(
              "Being recorded on testnet right now — the walkthrough drops in this exact spot.",
            )
          }
        >
          <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M8 5.5v13l11-6.5z" />
          </svg>
        </button>
        <div className="jv-line">
          Watch all three steps happen &mdash; paste, sign, fill.
        </div>
        <div className="jv-status" id="jv-status" aria-live="polite">
          {status}
        </div>
      </div>
      <div className="jv-reqs">
        <div className="req-row">
          <span className="req-k">You&rsquo;ll need</span>
          <span className="req-v">
            A paid TradingView plan (webhook alerts aren&rsquo;t on the free
            tier) &middot; any EVM wallet &middot; 5 minutes.
          </span>
        </div>
        <div className="req-row">
          <span className="req-k">Supported today</span>
          <span className="req-v">
            <b>BTC, SOL, HYPE</b> perps on Hyperliquid &mdash; more markets as
            they earn their way in.
          </span>
        </div>
      </div>
    </div>
  );
}
