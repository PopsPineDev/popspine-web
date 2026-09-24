export function Pricing() {
  return (
    <section id="pricing">
      <div className="wrap">
        <div className="band rv">
          <div className="eyebrow">Honest money</div>
          <h2 style={{ maxWidth: "22ch" }}>
            I&rsquo;ll only get paid when your strategy actually trades.
          </h2>
          <p className="lede">
            Nothing is charged today. Revenue will come from Hyperliquid builder codes — a native fee
            on executed volume, approved once by you, capped by the exchange,
            and revocable the same way the agent wallet is. No funds ever
            route through me: it&rsquo;s fee attribution by the exchange, not
            a payment I collect. If the bot never trades, I never earn.
            Execution will be pay-per-fill. If I ever offer something beyond
            execution — strategy rental, say — it&rsquo;ll be priced on its own
            and announced in the ledger before it exists anywhere else.
          </p>
          <div className="stats">
            <div className="stat rv d1">
              <div className="n">Pay-per-fill</div>
              <div className="l">How I&rsquo;ll get paid</div>
            </div>
            <div className="stat rv d2">
              <div className="n">Trade-only</div>
              <div className="l">Agent wallet permission</div>
            </div>
            <div className="stat rv d3">
              <div className="n">Testnet</div>
              <div className="l">Current phase — zero live capital</div>
            </div>
            <div className="stat rv d4">
              <div className="n">$0</div>
              <div className="l">Charged to date — builder codes not yet enabled</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
