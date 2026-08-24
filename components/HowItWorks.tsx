const steps = [
  {
    n: "01",
    title: "Your Pine Script fires an alert",
    body: "Any TradingView strategy or indicator — v6 confluence logic, trend regime filters, whatever you already run — sends a webhook the moment its condition is met.",
  },
  {
    n: "02",
    title: "A trade-only agent wallet executes it",
    body: "The signal reaches Hyperliquid through an agent wallet scoped to trading only. It can open, adjust, and close positions. It cannot withdraw, transfer, or touch anything else.",
  },
  {
    n: "03",
    title: "You keep the keys, always",
    body: "Your main wallet never signs anything except the original, revocable approval. Revoke it any time and the agent's access ends immediately — verifiable on-chain, not by trusting a dashboard.",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="section py-20">
      <h2 className="text-2xl font-semibold sm:text-3xl">How it works</h2>
      <p className="mt-3 max-w-xl text-textDim">
        Three steps, no custody at any point.
      </p>
      <div className="mt-10 grid gap-6 sm:grid-cols-3">
        {steps.map((s) => (
          <div key={s.n} className="card p-6">
            <div className="font-mono text-sm text-accent">{s.n}</div>
            <h3 className="mt-3 font-medium">{s.title}</h3>
            <p className="mt-2 text-sm text-textDim">{s.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
