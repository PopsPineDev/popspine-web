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
              Your Pine strategy fires the alert. The order, the stop and the
              exit land on Hyperliquid exactly as written — through a
              permission you can read and revoke.
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
                  Exits and stops that fill mid-bar{" "}
                  <a href="#how">still execute</a> — nothing refused as
                  &ldquo;stale&rdquo;.
                </span>
              </li>
              <li>
                <Ck />
                <span>
                  <strong>
                    Your system,{" "}
                    <a
                      href="https://t.me/popspineledger"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      executed — while you live your life
                    </a>
                    .
                  </strong>
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
                  <b>@ 78,929</b>
                  <span className="tg-time">03:47</span>
                </div>
                <div className="tg-msg">
                  <span className="tg-side tg-exit">EXIT</span> BTC/USDC ·
                  stop hit <b>@ 78,410</b>
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
          <h2 className="eyebrow">What you actually do</h2>
        </div>
        <div className="journey">
          <div className="jstep rv">
            <div className="jnum">1</div>
            <h3>Paste the alert template into your strategy.</h3>
            <p>
              Any Pine Script v6 strategy works — the template drops into your
              alert message and fills itself from your entries and exits.
            </p>
          </div>
          <div className="jstep rv d1">
            <div className="jnum">2</div>
            <h3>Connect a trade-only agent wallet.</h3>
            <p>
              One signature, scoped to trading only, revocable by you at any
              time. Your private key never leaves your wallet.
            </p>
          </div>
          <div className="jstep rv d2">
            <div className="jnum">3</div>
            <h3>That&rsquo;s it. Signals execute 24/7.</h3>
            <p>
              Every entry, exit, and stop lands on Hyperliquid whether
              you&rsquo;re at the screen or asleep — with the receipt on your
              phone before you&rsquo;ve looked up.
            </p>
          </div>
        </div>

        <JVideo />

        <div className="stage-label rv">
          <h2 className="eyebrow">Under the hood</h2>
        </div>
        <div className="flow">
          <div className="node rv">
            <div className="idx">01</div>
            <h3>Pine Script v6</h3>
            <p>
              Your strategy decides. Deterministic, backtestable, no AI in the
              live path.
            </p>
          </div>
          <div className="node rv d1">
            <div className="idx">02</div>
            <h3>Authenticated webhook</h3>
            <p>
              Every alert carries a signal id, a timestamp, and a shared secret
              compared in constant time. Duplicates and stale signals die at
              the gate.
            </p>
          </div>
          <div className="node rv d2">
            <div className="idx">03</div>
            <h3>Execution layer</h3>
            <p>
              Validated, deduped, freshness-checked, ownership-guarded — then
              executed. Exits and stop-moves are exempt from the freshness gate
              on purpose: TradingView composes them at bar close, the fill
              happens intrabar, and a stop that fires mid-bar must never be
              refused as &ldquo;stale&rdquo;.
            </p>
          </div>
          <div className="node rv d3">
            <div className="idx">04</div>
            <h3>On-exchange safety</h3>
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
