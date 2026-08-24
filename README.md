# popspine.com — landing page

Next.js 14 (App Router) + Tailwind + wagmi/viem/RainbowKit wallet-connect,
with a live testnet `approveAgent` proof-of-mechanism demo as the core
differentiator. Built to sit at `popspine.com`; `app.popspine.com`
(strategy rental) is a separate, later phase — not part of this build.

## 1. What's in here

```
app/            Next.js App Router pages + layout + SEO metadata
components/     Header, Hero, HowItWorks, ProofSection (the demo),
                Differentiators, BuilderCodeSection, WaitlistForm, Footer
lib/
  wagmiConfig.ts   RainbowKit/wagmi chain + WalletConnect config
  hyperliquid.ts   Wraps @nktkas/hyperliquid to sign a TESTNET-only
                   approveAgent action from whatever wallet connects
```

## 2. ⚠️ Before you trust this as "done" — test the demo for real

`lib/hyperliquid.ts` and `components/ProofSection.tsx` are the whole point
of this site (the "verify it, don't trust the word non-custodial" pitch).
I built them against `@nktkas/hyperliquid`'s documented `ExchangeClient({
wallet })` pattern — the same SDK your Hetzner `executor.js` already uses
in production — and the project **compiles and builds clean** end to end.

**Partial verification I *was* able to do from this sandbox:** I wrote
`scripts/verify-approve-agent.mjs`, which builds a real viem `WalletClient`
from a fresh throwaway private key (no funds, generated and discarded,
never reused anywhere) — the exact same object shape wagmi's
`useWalletClient()` hands to `ProofSection.tsx` — and fed it straight into
`approveAgentOnTestnet()`, unmodified. Running it confirmed the SDK's
wallet-adapter correctly *recognizes* a viem `WalletClient` (it detects
`signTypedData`/`getAddresses`/`getChainId` and dispatches to them, rather
than throwing on an unrecognized shape — this is the exact risk the `as
any` cast in `hyperliquid.ts` couldn't rule out at compile time). It then
called `wallet.getChainId()`, which under the hood makes a real
`eth_chainId` JSON-RPC call — and *that* failed, because **this sandbox
has no general internet egress to arbitrary hosts** (public RPC endpoints,
Hyperliquid's testnet API — all blocked here, confirmed via direct `curl`
to four different endpoints, all timing out). That's a sandbox boundary,
not a code bug: a real browser wallet has real RPC access, and so does
your own machine.

**Fastest way to finish verifying (no browser/wallet extension needed):**
run the same script yourself, from a machine with normal internet access:
```bash
npm install    # if you haven't already
node scripts/verify-approve-agent.mjs
```
It prints the throwaway wallet/agent addresses it generated, then either
`SUCCESS: {...}` (full signature + API round-trip confirmed — the demo is
production-ready) or the exact error if something in the handshake needs
adjusting. Either way you'll know definitively, and if it does need a
fix, it's localized to `approveAgentOnTestnet()` in `lib/hyperliquid.ts`.

**Closest to what a real visitor experiences (do this too before
launch):**
1. `npm run dev`, open the site, connect a real wallet on a network with
   testnet ETH/gas (any EVM chain works for the signature itself).
2. Click "Request testnet approval" and confirm the signature prompt looks
   sane (domain, agent address, chain).
3. Confirm it actually lands on Hyperliquid testnet — check
   `https://api.hyperliquid-testnet.xyz/info` with your test wallet address
   (`type: "extraAgents"` in the POST body) and see the agent show up.

## 3. Environment variables

Copy `.env.example` to `.env.local` for local dev, and set the same two
vars in Vercel's project settings for production:

| Variable | Where to get it | Notes |
|---|---|---|
| `NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID` | [dashboard.reown.com](https://dashboard.reown.com) — WalletConnect rebranded to **Reown** in 2025; the old `cloud.walletconnect.com` signup now lives there. Log in, create a project, copy the Project ID — no payment step to get the ID itself, takes a couple minutes. | **Required at build time.** RainbowKit throws during static generation if this is empty — the build will fail on Vercel without it, same as it did here until I set a dummy value to test. |
| `NEXT_PUBLIC_AGENT_ADDRESS` | An agent wallet address you generate for the **testnet demo only** | Public by design — it's the address visitors approve on testnet, not your real trading agent. Don't reuse your production Hetzner agent address here. |

`NEXT_PUBLIC_WAITLIST_ENDPOINT` (used by `components/WaitlistForm.tsx`) is
optional — without it the form just shows "not wired up yet" instead of
submitting. Easiest option: a free [Formspree](https://formspree.io) form
endpoint, no backend needed.

## 4. Local dev

```bash
npm install
cp .env.example .env.local   # then fill in the two vars above
npm run dev                  # http://localhost:3000
```

## 5. Deploying to popspine.com (Vercel)

1. This zip already has a git repo initialized with commits (verified
   `.env`/`node_modules`/`.next` are all excluded — check `git status`
   yourself if you want to double-check before pushing). Create an empty
   repo named `popspine-web` under [github.com/PopsPineDev](https://github.com/PopsPineDev)
   (private is fine — don't check "Initialize with a README", this repo
   already has one), then from inside this folder:
   ```bash
   git remote add origin git@github.com:PopsPineDev/popspine-web.git
   git push -u origin main
   ```
   (If you haven't set up SSH keys with GitHub, use the HTTPS URL instead:
   `https://github.com/PopsPineDev/popspine-web.git` — GitHub will prompt
   for a personal access token instead of your password on push.)
2. [vercel.com/new](https://vercel.com/new) → import that repo → framework
   auto-detects as Next.js, no config needed.
3. In the Vercel project's **Settings → Environment Variables**, add
   `NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID` and `NEXT_PUBLIC_AGENT_ADDRESS`
   (and `NEXT_PUBLIC_WAITLIST_ENDPOINT` if you set one up) for the
   Production environment. Redeploy after adding them if the first deploy
   ran before you did.
4. **Point your domain**: Vercel project → **Settings → Domains** → add
   `popspine.com` (and `www.popspine.com`, redirect one to the other —
   Vercel's UI offers this automatically). Vercel will show you the exact
   A record (apex) or CNAME (subdomain) to add — **use whatever value your
   own project's Domains card shows**, don't copy one from a guide or a
   past project: Vercel now assigns anycast IPs from a pool matched to
   your plan/project, so it's not always the same address for everyone.
5. In your domain registrar's DNS panel, add the record Vercel showed you.
   Propagation is usually minutes, sometimes up to ~24h depending on your
   registrar's TTL.
6. HTTPS is automatic (Vercel provisions the cert once DNS resolves).

`app.popspine.com` isn't built yet — when it exists, it'll be a second
Vercel project (or a route group in this one) mapped to that subdomain via
the same Domains panel, but that's explicitly out of scope for now.

## 6. Known trade-offs / things flagged during the build

- **`npm audit`: 26 findings → 0.** History of how it got there:
  1. `next` bumped `14.2.15 → 14.2.35` (patched the flagged 14.x advisory).
  2. `package.json` `overrides` pinned `axios`, `uuid`, and `ws` — deep
     transitive deps pulled in by RainbowKit's wallet connectors
     (Coinbase's SDK, MetaMask's SDK, WalletConnect's client), not code in
     this repo — to patched, same-major-version releases (e.g.
     `uuid@9.0.1 → 11.1.1`, verified it keeps the dual CJS/ESM export shape
     those SDKs need). 26 → 2.
  3. **`next` bumped `14.2.35 → 16.3.2`, `react`/`react-dom` `18.3.1 →
     19.2.8`.** This is the jump I'd flagged as risky and held off on
     until you gave the go-ahead — RainbowKit's latest release (`2.2.11`,
     still the newest as of this build) hard-pins `wagmi: "^2.9.0"` as a
     peer dependency, so a `wagmi@3` bump (npm's own suggested "fix")
     would've broken wallet-connect outright. Going `next@16` instead
     sidesteps that entirely — wagmi/viem/RainbowKit stayed on their
     existing 2.x versions the whole time, only Next and React moved.
     2 → 0.
  - **Turbopack risk, and how I avoided it:** Next 16 makes Turbopack the
    default bundler, and there's an open RainbowKit compatibility bug with
    it ([rainbow-me/rainbowkit#2595](https://github.com/rainbow-me/rainbowkit/issues/2595) —
    `pino`/`thread-stream` module resolution fails under Turbopack). Next
    16 also *requires* opting out of Turbopack explicitly if your project
    has a custom `webpack()` config (this one does, for the `@x402`/`pino-pretty`
    aliasing below) — it fails the build otherwise rather than silently
    ignoring your config. So `package.json`'s `dev`/`build` scripts both
    pass `--webpack` to keep using the same webpack pipeline this project
    was already built and tested against, sidestepping the open Turbopack
    bug entirely rather than betting on it. You get the Next 16 security
    fixes without picking up Turbopack's newer, less-proven-with-RainbowKit
    default.
  - **What I checked before calling it done:** clean `next build --webpack`
    (webpack compile + TypeScript + static generation all passed, first
    try), `npm audit` → 0, then a real production smoke test —
    `next start`, curled the page, confirmed HTTP 200, real page content,
    and that every "error" string in the served HTML was benign (RainbowKit's
    own `--rk-colors-error` CSS theme token, Next's built-in error-page
    boilerplate that ships in every app) rather than an actual thrown
    exception. Also re-ran `scripts/verify-approve-agent.mjs` — same
    result as before (wallet-adapter dispatch confirmed working, blocked
    only by this sandbox's lack of general internet egress) — confirming
    the upgrade didn't change that code path's behavior.
  - Per [Next 16's upgrade guide](https://nextjs.org/docs/app/guides/upgrading/version-16),
    also added `data-scroll-behavior="smooth"` to `<html>` in
    `app/layout.tsx` (Next no longer auto-manages `scroll-behavior:
    smooth` during navigations unless you opt in) and dropped the `lint`
    script (`next lint` was removed in v16; there's no ESLint config in
    this project yet, so nothing was depending on it).
  - Everything else in the v16 breaking-changes list — async
    `params`/`searchParams`/`cookies`/`headers`, `middleware` → `proxy`,
    parallel routes, sitemaps, AMP — doesn't apply here: this is a single
    static page with no dynamic routes, no middleware, no Server Actions.
- `next.config.mjs` has a webpack `resolve.alias`/`fallback` block. This
  is a standard, documented workaround for a real build failure: RainbowKit
  pulls in Coinbase's Smart Wallet connector, which pulls in optional
  `@x402` payment-protocol deps (that we never use) and a couple of
  React-Native/Node-only optional deps from MetaMask's SDK and
  WalletConnect's logger. Without the alias, `next build` hard-fails on
  "module not found" for code paths that never execute in this app.
