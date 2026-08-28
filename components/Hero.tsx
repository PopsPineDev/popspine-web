import { JVideo } from "./JVideo";
import { HeroCta } from "./HeroCta";

function Ck() {
  return (
    <svg className="claim-ck" viewBox="0 0 20 20" aria-hidden="true">
      <circle cx="10" cy="10" r="10" fill="#12B79B" opacity=".14" />
      <path
        d="M5.8 10.4l2.7 2.7 5.7-5.9"
        fill="none"
        stroke="#0E9C84"
        strokeWidth="2.1"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Hero() {
  return (
    <section className="hero">
      <div className="chart-band" aria-hidden="true"></div>
      <div className="wrap">
        <div className="hero-grid">
          <div className="hero-copy">
            <h1 className="rv d1">
              Your strategy, executed.
              <br />
              <span className="grad">Never your private key.</span>
            </h1>
            <p className="sub rv d2">
              TradingView alerts fire straight into Hyperliquid through a
              non-custodial agent wallet.
            </p>
            <ul className="claims rv d3">
              <li>
                <Ck />
                <span>
                  Your private key <a href="#proof">never leaves your wallet</a>.
                </span>
              </li>
              <li>
                <Ck />
                <span>
                  Trade-only agent wallet,{" "}
                  <a href="#faq">revocable in one click</a>.
                </span>
              </li>
              <li>
                <Ck />
                <span>
                  Your signals execute <a href="#how">24/7 — awake or not</a>.
                </span>
              </li>
            </ul>
            <div className="cta-row rv d3">
              <HeroCta />
              <a className="btn btn-ghost" href="#how">
                See the architecture
              </a>
            </div>
          </div>

          <div className="hero-visual rv d2">
            <div className="phone-wrap">
              <div className="phone">
                <div className="phone-screen"></div>
                <div className="phone-island"></div>
                <span className="phone-rail" aria-hidden="true"></span>
                <span className="phone-side phone-side-a" aria-hidden="true"></span>
                <span className="phone-side phone-side-b" aria-hidden="true"></span>
              </div>
              <div className="fc fc-flow">
                <span className="fc-dot"></span>TradingView{" "}
                <span className="fc-arrow">&rarr;</span> Hyperliquid fill
              </div>
              <div className="fc fc-tg">
                <div className="tg-head">
                  <span className="tg-ava">P</span>
                  <span className="tg-name">
                    PopsPineAlerts<span className="tg-bot">bot</span>
                  </span>
                </div>
                <div className="tg-msg">
                  <span className="tg-side tg-long">LONG</span> BTC/USDC filled{" "}
                  <b>0.5 @ 78,929</b>
                  <span className="tg-time">03:47</span>
                </div>
                <div className="tg-msg">
                  <span className="tg-side tg-exit">EXIT</span> BTC/USDC closed{" "}
                  <b>0.5 @ 79,683</b>
                  <span className="tg-time">06:12</span>
                </div>
              </div>
            </div>
            <p className="visual-cap">
              Every entry, re-entry and exit — pushed to Telegram the moment it
              fills.
            </p>
          </div>
        </div>

        <div id="how" className="stage-label rv">
          <div className="eyebrow">What you actually do</div>
        </div>
        <div className="journey">
          <div className="jstep rv">
            <div className="jnum">1</div>
            <h4>Paste the alert template into your strategy.</h4>
            <p>
              Any Pine Script v6 strategy works — the template drops into your
              alert message and fills itself from your entries and exits.
            </p>
          </div>
          <div className="jstep rv d1">
            <div className="jnum">2</div>
            <h4>Connect a trade-only agent wallet.</h4>
            <p>
              One signature, scoped to trading only, revocable by you at any
              time. Your private key never leaves your wallet.
            </p>
          </div>
          <div className="jstep rv d2">
            <div className="jnum">3</div>
            <h4>That&rsquo;s it. Signals execute 24/7.</h4>
            <p>
              Every entry, exit, and stop lands on Hyperliquid whether
              you&rsquo;re at the screen or asleep — with the receipt pushed to
              Telegram the moment it fills.
            </p>
          </div>
        </div>

        <JVideo />

        <div className="stage-label rv">
          <div className="eyebrow">Under the hood</div>
        </div>
        <div className="flow">
          <div className="node rv">
            <div className="idx">01</div>
            <h4>Pine Script v6</h4>
            <p>
              Your strategy decides. Deterministic, backtestable, no AI in the
              live path.
            </p>
          </div>
          <div className="node rv d1">
            <div className="idx">02</div>
            <h4>Authenticated webhook</h4>
            <p>
              Every alert carries a signal id, a timestamp, and a shared secret
              compared in constant time. Duplicates and stale signals die at
              the gate.
            </p>
          </div>
          <div className="node rv d2">
            <div className="idx">03</div>
            <h4>Execution layer</h4>
            <p>
              Validated, deduped, freshness-checked, ownership-guarded — then
              executed.
            </p>
          </div>
          <div className="node rv d3">
            <div className="idx">04</div>
            <h4>On-exchange safety</h4>
            <p>
              SL and TP placed as real orders at entry. They survive the server
              dying.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
