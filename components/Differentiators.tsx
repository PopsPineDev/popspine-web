const points = [
  {
    title: "Provable, not just claimed",
    body: "“Non-custodial” is now the standard word every automation tool in this category reaches for. Words are cheap. We show the on-chain approval itself — test it yourself above.",
  },
  {
    title: "Deterministic execution, not an LLM making live calls",
    body: "Your strategy's logic runs exactly as written, every time — no model deciding in the moment whether to deviate. If you want an AI agent making live trading decisions, that's a different category of product with a different risk profile than this one.",
  },
  {
    title: "Pine v6-native, built by someone who writes Pine daily",
    body: "This isn't a generic relay bolted onto a webhook. It's built by a working Pine Script developer who understands strategy-side quirks — repaint traps, stale-exit timing, ALMA/HTF confirmation — not just the plumbing between TradingView and an exchange.",
  },
];

export function Differentiators() {
  return (
    <section className="section py-20">
      <h2 className="text-2xl font-semibold sm:text-3xl">
        Why this, and not another automation relay
      </h2>
      <div className="mt-10 grid gap-6 sm:grid-cols-3">
        {points.map((p) => (
          <div key={p.title} className="card p-6">
            <h3 className="font-medium text-white">{p.title}</h3>
            <p className="mt-2 text-sm text-textDim">{p.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
