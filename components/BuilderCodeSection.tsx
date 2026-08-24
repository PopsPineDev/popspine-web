export function BuilderCodeSection() {
  return (
    <section id="pricing" className="section py-20">
      <div className="card p-8 sm:p-10">
        <h2 className="text-2xl font-semibold sm:text-3xl">
          How this gets funded — the honest version
        </h2>
        <div className="mt-6 grid gap-8 sm:grid-cols-2">
          <div>
            <h3 className="font-medium text-white">No hidden subscription tax on day one</h3>
            <p className="mt-2 text-sm text-textDim">
              At launch, this runs on Hyperliquid&apos;s builder-code
              mechanism: a small, transparent share of your own trading
              fees, attributed automatically by the exchange. No funds
              ever route through us to make that happen — it&apos;s
              order-fee attribution, not a payment we collect.
            </p>
          </div>
          <div>
            <h3 className="font-medium text-white">Revenue arrives with volume, not before it</h3>
            <p className="mt-2 text-sm text-textDim">
              We&apos;re not going to imply a big existing customer base
              to make this look more proven than it is. Early usage runs
              on the operator&apos;s own capital. If it doesn&apos;t
              generate real trading volume, it doesn&apos;t generate real
              revenue — for us or for you.
            </p>
          </div>
        </div>
        <p className="mt-8 text-xs text-textDim">
          Strategy rental / subscription tiers are planned for a later
          phase and are not live yet. This is not financial advice, and
          nothing here should be read as a promise of investment
          performance.
        </p>
      </div>
    </section>
  );
}
