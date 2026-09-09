"use client";

import { useRef, useState } from "react";
import { track } from "@/lib/track";

const MEDIA = "https://media.popspine.com/r2-upload";
const SRC_720 = `${MEDIA}/popspine-demo-v8-720p.mp4`;
const SRC_1080 = `${MEDIA}/popspine-demo-v8.mp4`;
const POSTER = `${MEDIA}/popspine-demo-poster-v8.jpg`;

/**
 * Demo-video slot.
 *
 * Served from R2 behind media.popspine.com (zero egress cost, range
 * requests supported, so scrubbing works). Deliberate choices:
 *
 *  - preload="none". The poster is 320KB; the video is 24MB. Nobody pays
 *    for bytes they didn't ask to watch, and this section sits below the
 *    fold. The poster attribute alone renders the frame.
 *  - 720p is the default source, not the 1080p. 24MB starts playing on a
 *    phone; 82MB does not. The full-quality file is one click away for
 *    anyone who wants to read the wallet permission text closely — which
 *    is the one moment in the video where resolution actually matters.
 *  - A real <video>, not a YouTube embed: no third-party cookies, no
 *    tracker to disclose, no "watch on YouTube" exit ramp.
 */
export function JVideo() {
  const ref = useRef<HTMLVideoElement>(null);
  const [hq, setHq] = useState(false);

  // Swap the source without losing the viewer's place. Reloading a <video>
  // resets currentTime, so it's captured and restored on the next metadata
  // load — and playback resumes only if it was already running.
  function upgrade() {
    const v = ref.current;
    if (!v || hq) return;
    const at = v.currentTime;
    const wasPlaying = !v.paused && !v.ended;
    setHq(true);
    track("demo_full_quality");
    requestAnimationFrame(() => {
      const el = ref.current;
      if (!el) return;
      const restore = () => {
        try {
          el.currentTime = at;
        } catch {
          /* seek beyond a not-yet-buffered range — start from the top */
        }
        if (wasPlaying) void el.play().catch(() => {});
      };
      el.addEventListener("loadedmetadata", restore, { once: true });
      el.load();
    });
  }

  return (
    <div className="jvideo rv d1" id="demo">
      <div className="jv-shell">
        {/* aria-label: without it a screen reader announces this as a bare
            "video". The name carries what a sighted viewer gets free from
            the caption — what it shows, how long it runs, and that it is
            testnet, the last of which is a claim rather than decoration. */}
        <video
          ref={ref}
          className="jv-video"
          src={hq ? SRC_1080 : SRC_720}
          poster={POSTER}
          preload="none"
          controls
          playsInline
          aria-label="PopsPineDev demo — paste, sign, fill (8:13, filmed on Hyperliquid testnet)"
          onPlay={() => track("demo_play")}
        />
        <div className="jv-cap">
          <h2 className="jv-tag">demo &middot; paste &middot; sign &middot; fill</h2>
          <div className="jv-line">
            Three steps, filmed on testnet: paste the alert template into a Pine
            strategy &middot; connect a wallet and read the{" "}
            <code>approveAgent</code> permission before signing &middot; watch a
            real signal fill on Hyperliquid and the receipt land in Telegram.
          </div>
          <div className="jv-status" id="jv-status" aria-live="polite">
            8:13 &middot; filmed end to end on Hyperliquid testnet &middot;{" "}
            {hq ? (
              <span className="jv-hq-on">full quality (1080p)</span>
            ) : (
              <button type="button" className="jv-hq" onClick={upgrade}>
                full quality (1080p)
              </button>
            )}
          </div>
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
      {/* Google indexes video separately from the page, and a VideoObject is
          what makes it eligible. Duration is ISO 8601: 8m13s. */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "VideoObject",
            name: "PopsPineDev Automation — TradingView to Hyperliquid, end to end",
            description:
              "A full walkthrough on Hyperliquid testnet: pasting the alert template into a Pine strategy, reading the approveAgent permission before signing, and watching a signal fill with the receipt landing in Telegram.",
            thumbnailUrl: [POSTER],
            uploadDate: "2026-09-09",
            duration: "PT8M13S",
            contentUrl: SRC_1080,
            embedUrl: "https://popspine.com/#demo",
            publisher: {
              "@type": "Organization",
              name: "PopsPineDev Automation",
              url: "https://popspine.com",
            },
          }),
        }}
      />
    </div>
  );
}
