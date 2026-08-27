export function Why() {
  return (
    <section id="why">
      <div className="wrap">
        <div className="rv">
          <div className="eyebrow">Why it&apos;s different</div>
          <h2>Architecture, not promises.</h2>
          <p className="lede">
            Built by a developer who writes Pine Script v6 daily — and
            publishes the failures too: every bug caught, every rejection
            logged, every week.
          </p>
        </div>
        <div className="cards">
          <div className="card rv">
            <div className="ico">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="3" y="11" width="18" height="11" rx="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
            </div>
            <h3>Provably non-custodial</h3>
            <p>
              Agent wallets grant trade-only rights at the exchange level. Not
              a policy, not a promise — a permission you can read and revoke
              yourself.
            </p>
          </div>
          <div className="card rv d1">
            <div className="ico">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                <path d="M9 12l2 2 4-4" />
              </svg>
            </div>
            <h3>Safety lives on-exchange</h3>
            <p>
              Stops and targets are placed as real orders the moment a
              position opens. If the server dies mid-trade, the position stays
              guarded.
            </p>
          </div>
          <div className="card rv d2">
            <div className="ico">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                <path d="M13.73 21a2 2 0 0 1-3.46 0" />
                <path d="M2 8c0-2.2.7-4.3 2-6" />
                <path d="M22 8a10 10 0 0 0-2-6" />
              </svg>
            </div>
            <h3>Silence is never &quot;fine&quot;</h3>
            <p>
              Every rejection, clamp and refusal pushes an alert and lands in
              an audit ledger. A system that fails quietly is a system you
              can&apos;t trust.
            </p>
          </div>
          <div className="card rv d3">
            <div className="ico">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="6" cy="19" r="3" />
                <path d="M9 19h8.5a3.5 3.5 0 0 0 0-7h-11a3.5 3.5 0 0 1 0-7H15" />
                <circle cx="18" cy="5" r="3" />
              </svg>
            </div>
            <h3>Deterministic, not an LLM</h3>
            <p>
              No AI makes live trading calls. Your Pine strategy decides; the
              executor carries it out. Same signal in, same order out — every
              time, backtestable.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
