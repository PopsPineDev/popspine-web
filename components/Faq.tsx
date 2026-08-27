const ITEMS: { q: string; a: React.ReactNode }[] = [
  {
    q: "What happens if your server dies mid-trade?",
    a: (
      <p>
        Nothing happens to your protection — that&rsquo;s the point of the
        architecture. Stops and targets are placed as real orders on
        Hyperliquid the moment a position opens. The exchange holds them, not
        my server. A dead server means no new trades, never an unguarded
        position.
      </p>
    ),
  },
  {
    q: "What can the agent wallet actually do?",
    a: (
      <p>
        Place and manage orders on the account it&rsquo;s scoped to.
        That&rsquo;s the whole list. It cannot withdraw, transfer, bridge, or
        touch collateral — not as policy, but because the permission itself
        doesn&rsquo;t include it. The testnet demo above lets you read the
        exact permission before you believe me.
      </p>
    ),
  },
  {
    q: "How do I revoke it?",
    a: (
      <p>
        In the Hyperliquid app: API &rarr; your agent &rarr; revoke. One
        click, on the exchange, with no involvement from me. Works even if
        this site disappears tomorrow.
      </p>
    ),
  },
  {
    q: "Which TradingView plan do I need?",
    a: (
      <p>
        Any paid plan — webhook alerts aren&rsquo;t available on the free
        tier. Your existing strategies don&rsquo;t need rewriting; the alert
        template drops into what you already have.
      </p>
    ),
  },
  {
    q: "Which wallets work?",
    a: (
      <p>
        Any EVM wallet — MetaMask, Rabby, Rainbow, or a hardware wallet
        through them. Heads up: wallets may flag this as a new/unlisted site.
        That&rsquo;s expected for a domain this young, not a red flag — and if
        you&rsquo;d rather never connect your main wallet to any new site
        (smart habit), a fresh wallet works the same.
      </p>
    ),
  },
  {
    q: "Who’s building this?",
    a: (
      <p>
        One developer, in public. I write Pine Script v6 daily, run this exact
        infrastructure on my own capital, and publish the weekly ledgers —
        including the ugly weeks. I&rsquo;m pseudonymous, but everything is
        checkable: this site&rsquo;s code is{" "}
        <a href="https://github.com/PopsPineDev">public on GitHub</a>, the
        receipts land on <a href="https://x.com/popspinedev">X</a>, and the
        testnet demo above doesn&rsquo;t care who I am — read the signature
        instead of trusting a face.
      </p>
    ),
  },
  {
    q: "When does mainnet happen?",
    a: (
      <p>
        When the evidence says so, not when marketing does: the gate is clean,
        fully-organic trade cycles on the current code, logged in public.
        Testnet receipts are published weekly either way. Waitlist hears
        first.
      </p>
    ),
  },
  {
    q: "What do you store?",
    a: (
      <p>
        No keys, ever — they never leave your wallet. The waitlist stores your
        email and nothing else.
      </p>
    ),
  },
];

export function Faq() {
  return (
    <section id="faq">
      <div className="wrap">
        <div className="rv">
          <div className="eyebrow">Questions a skeptic should ask</div>
          <h2>Asked and answered.</h2>
        </div>
        <div className="faq">
          {ITEMS.map((item) => (
            <details className="faq-item rv" key={item.q}>
              <summary>{item.q}</summary>
              {item.a}
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
