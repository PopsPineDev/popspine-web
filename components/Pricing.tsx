export function Pricing() {
  return (
    <section id="pricing">
      <div className="wrap">
        <div className="band rv">
          <div className="eyebrow">Honest money</div>
          <h2 style={{ maxWidth: "22ch" }}>
            No subscription. I get paid only when a trade actually executes.
          </h2>
          <p className="lede">
            Revenue comes from Hyperliquid builder codes — a native 0.01% fee
            on executed volume, approved once by you, capped by the exchange,
            and revocable the same way the agent wallet is. No funds ever
            route through me: it&rsquo;s fee attribution by the exchange, not
            a payment I collect. If the bot never trades, I never earn.
            Strategy rental and subscription tiers may come in a later phase —
            execution itself stays pay-per-fill.
          </p>
          <div className="stats">
            <div className="stat rv d1">
              <div className="n">0</div>
              <div className="l">Subscription fees</div>
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
              <div className="n">0.01%</div>
              <div className="l">Fee per executed fill, capped on-chain</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
