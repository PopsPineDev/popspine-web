export function Footer() {
  return (
    <footer>
      <div className="wrap">
        <div className="foot-grid">
          <div className="foot-col">
            <div className="foot-brand">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img className="avatar-sm" src="/avatar.jpg" alt="" />
              <span>
                PopsPineDev <b>Automation</b>
              </span>
            </div>
            <p>
              TradingView strategies, executed on Hyperliquid through a
              trade-only agent wallet. Built in public by{" "}
              <a href="https://x.com/popspinedev" rel="me">
                @popspinedev
              </a>
              .
            </p>
          </div>
          <div className="foot-col">
            <h5>Product</h5>
            <a href="#how">How it works</a>
            <a href="#proof">Proof</a>
            <a href="#why">Why it&rsquo;s different</a>
            <a href="#pricing">Pricing</a>
            <a href="#faq">FAQ</a>
          </div>
          <div className="foot-col">
            <h5>Elsewhere</h5>
            <a href="https://t.me/popspineledger">
              Live receipts (Telegram)
            </a>
            <a href="https://x.com/popspinedev">X / Twitter</a>
            <a href="https://www.tradingview.com/u/PopsPineDev/">
              TradingView (scripts)
            </a>
            <a href="https://www.fiverr.com/papajune/custom-tradingview-indicator-or-strategy-in-pine-script-v6">
              Fiverr (Pine Script services)
            </a>
            <a href="https://github.com/PopsPineDev">GitHub</a>
            <a href="https://linktr.ee/PopsPineDev">Linktree</a>
            <a href="mailto:contact@popspine.com">contact@popspine.com</a>
          </div>
        </div>
        <div className="foot-bottom">
          Built in public by <a href="https://x.com/popspinedev">@popspinedev</a>{" "}
          · Testnet phase — zero live capital · Perpetual futures carry
          substantial risk of loss; automation reduces manual effort, not
          market risk; nothing here is financial advice. · Privacy: the
          waitlist stores your email, nothing else — unsubscribe any time.
        </div>
      </div>
    </footer>
  );
}
