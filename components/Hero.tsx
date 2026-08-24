export function Hero() {
  return (
    <section className="section pt-20 pb-16 text-center">
      <div className="mx-auto mb-5 inline-flex items-center gap-2 rounded-full border border-panelBorder bg-panel px-3 py-1 text-xs text-textDim">
        <span className="h-1.5 w-1.5 rounded-full bg-accent" />
        Built and run on the operator's own capital — no customer funds at risk, ever
      </div>
      <h1 className="mx-auto max-w-3xl text-4xl font-semibold tracking-tight sm:text-5xl">
        Your Pine Script signals.
        <br />
        <span className="text-accent">Live on Hyperliquid.</span> Your keys never leave your wallet.
      </h1>
      <p className="mx-auto mt-6 max-w-xl text-lg text-textDim">
        TradingView webhook → execution on Hyperliquid, through a trade-only
        agent wallet that can never withdraw. Don't take our word for it —
        connect a wallet below and see the actual on-chain approval yourself.
      </p>
      <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
        <a
          href="#proof"
          className="rounded-xl bg-accent px-6 py-3 font-medium text-ink transition hover:bg-accent/90"
        >
          Verify the proof
        </a>
        <a
          href="#waitlist"
          className="rounded-xl border border-panelBorder px-6 py-3 font-medium text-white transition hover:border-accent/60"
        >
          Join early access
        </a>
      </div>
    </section>
  );
}
