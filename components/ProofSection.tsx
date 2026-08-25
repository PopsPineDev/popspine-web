"use client";

import { useState } from "react";
import { useAccount, useWalletClient } from "wagmi";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { approveAgentOnTestnet } from "@/lib/hyperliquid";

const AGENT_ADDRESS = (process.env.NEXT_PUBLIC_AGENT_ADDRESS ||
  "0x0000000000000000000000000000000000000000") as `0x${string}`;

type DemoState = "idle" | "signing" | "success" | "error";

export function ProofSection() {
  const { isConnected } = useAccount();
  const { data: walletClient } = useWalletClient();
  const [state, setState] = useState<DemoState>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function runDemo() {
    if (!walletClient) return;
    setState("signing");
    setErrorMsg("");
    try {
      await approveAgentOnTestnet(walletClient, AGENT_ADDRESS);
      setState("success");
    } catch (e) {
      setErrorMsg(e instanceof Error ? e.message : String(e));
      setState("error");
    }
  }

  return (
    <section id="proof" className="section py-20">
      <div className="card p-8 sm:p-10">
        <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-panelBorder px-3 py-1 text-xs text-textDim">
          <span className="h-1.5 w-1.5 rounded-full bg-accent" />
          Hyperliquid TESTNET demo — no real funds, no real permission
        </div>
        <h2 className="mt-4 text-2xl font-semibold sm:text-3xl">
          Don&apos;t trust the word &quot;non-custodial.&quot; Verify it.
        </h2>
        <p className="mt-3 max-w-2xl text-textDim">
          Every automation service in this space says &quot;non-custodial.&quot;
          Almost none show you the actual mechanism. Connect a wallet and
          request a real, on-chain <span className="font-mono text-white">approveAgent</span> signature
          on Hyperliquid&apos;s testnet — a trade-only permission that can
          place and close orders, and can <span className="text-white">never</span> withdraw,
          transfer, or touch anything outside the account it&apos;s scoped to.
          You can read the raw signed action yourself before deciding
          whether to trust it on mainnet.
        </p>

        <div className="mt-8 rounded-xl border border-panelBorder bg-ink/60 p-6">
          {!isConnected ? (
            <div className="flex flex-col items-center gap-4 py-6 text-center">
              <p className="text-sm text-textDim">Step 1 — connect a wallet (testnet, any EVM wallet works)</p>
              <ConnectButton />
              <p className="max-w-md text-xs text-textDim">
                Your wallet may flag this as a new/unlisted site — that&apos;s
                expected for a domain that just launched, not a sign of risk.
                If you&apos;d rather not connect your main wallet to any new
                site as a rule (smart habit), any wallet with a small test
                balance works the same for this demo.
              </p>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-4 py-6 text-center">
              <p className="text-sm text-textDim">
                Step 2 — request the trade-only agent approval on testnet
              </p>
              <button
                onClick={runDemo}
                disabled={state === "signing"}
                className="rounded-xl bg-accent px-6 py-3 font-medium text-ink transition hover:bg-accent/90 disabled:opacity-50"
              >
                {state === "signing" ? "Check your wallet…" : "Request testnet approval"}
              </button>

              {state === "success" && (
                <p className="max-w-md text-sm text-accent">
                  Signed and accepted by Hyperliquid testnet. That&apos;s the
                  exact mechanism production would use — scoped, revocable,
                  withdrawal-proof by construction, not by promise.
                </p>
              )}
              {state === "error" && (
                <p className="max-w-md text-sm text-red-400">
                  Didn&apos;t go through: {errorMsg || "request was rejected or failed."}
                </p>
              )}
            </div>
          )}
        </div>

        <p className="mt-6 text-xs text-textDim">
          This connects to Hyperliquid&apos;s testnet only. No mainnet funds,
          no live trading account, and no data collected are involved in
          this demo — it exists purely so you can see the real signing
          mechanism instead of taking our description of it on faith.
        </p>
      </div>
    </section>
  );
}
