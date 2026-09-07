"use client";

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
  return (
    <div className="jvideo rv d1">
      <div className="jvideo-poster">
        <div className="jv-grid" aria-hidden="true"></div>
        <div className="jv-tag">demo &middot; testnet &middot; in edit</div>
        <div className="jv-line">
          Three steps, filmed on testnet: paste the alert template into a Pine
          strategy &middot; connect a wallet and read the{" "}
          <code>approveAgent</code> permission before signing &middot; watch a
          real signal fill on Hyperliquid and the receipt land in Telegram.
        </div>
        <div className="jv-status" id="jv-status" aria-live="polite">
          Being cut now — it lands in this exact spot, unlisted first for the
          waitlist.
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
            <b>BTC, ETH, SOL, HYPE</b> perps on Hyperliquid &mdash; more
            markets as they earn their way in.
          </span>
        </div>
      </div>
    </div>
  );
}
