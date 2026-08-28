"use client";

import { useState } from "react";
import { useAccount, useWalletClient } from "wagmi";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { approveAgentOnTestnet } from "@/lib/hyperliquid";
import { WaitForm } from "./WaitForm";

const AGENT_ADDRESS = (process.env.NEXT_PUBLIC_AGENT_ADDRESS ||
  "0x0000000000000000000000000000000000000000") as `0x${string}`;

const IDLE_STATUS =
  "Testnet only · no funds at risk · nothing is stored · your wallet may flag this as a new site — expected for a young domain (see FAQ)";

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

  const connectedLabel =
    state === "signing"
      ? "Check your wallet…"
      : state === "success"
        ? "Signature verified ✓"
        : "Request testnet signature";

  const connectedStatus =
    state === "signing"
      ? "Read the permission before you sign — that’s the whole point."
      : state === "success"
        ? "Trade-only agent approved on testnet. Revoke any time."
        : state === "error"
          ? `Didn’t go through: ${errorMsg || "request was rejected or failed."}`
          : "Wallet connected · Hyperliquid testnet — read the permission before you sign.";

  return (
    <section id="proof">
      <div className="wrap">
        <div className="rv">
          <div className="eyebrow">The proof</div>
          <h2>Don&apos;t trust the claim. Read the signature.</h2>
          <p className="lede">
            Everyone writes &quot;non-custodial&quot; on their landing page.
            Here&apos;s the actual permission you&apos;d be granting — request
            it on testnet right now and read it yourself before you believe
            anybody, including me.
          </p>
        </div>

        <div className="demo-grid">
          <div className="glass rv d1">
            <div className="eyebrow">Live testnet demo</div>
            <h3
              style={{
                marginTop: 12,
                fontSize: 22,
                letterSpacing: "-.03em",
              }}
            >
              Hyperliquid{" "}
              <code
                style={{
                  fontFamily: "'JetBrains Mono',monospace",
                  fontSize: 19,
                }}
              >
                approveAgent
              </code>
            </h3>
            <div className="sigbox sig">
              <div className="k">{"// what this signature actually grants"}</div>
              <div className="perm">
                <span className="tick y">✓</span> Place and manage orders on
                your behalf
              </div>
              <div className="perm">
                <span className="tick n">✕</span> Withdraw funds —{" "}
                <span className="no" style={{ marginLeft: 4 }}>
                  impossible, ever
                </span>
              </div>
              <div className="perm">
                <span className="tick n">✕</span> Transfer, bridge, or move
                collateral
              </div>
              <div className="perm">
                <span className="tick y">✓</span> Revocable by you, any time,
                without us
              </div>
            </div>

            {isConnected ? (
              <>
                <button
                  className="btn connect"
                  onClick={runDemo}
                  disabled={state === "signing"}
                >
                  {connectedLabel}
                </button>
                <div className="status" id="status" aria-live="polite">
                  {connectedStatus}
                </div>
                {state === "success" && (
                  <div style={{ marginTop: 22, textAlign: "center" }}>
                    <p
                      style={{
                        fontSize: "14.5px",
                        lineHeight: 1.55,
                        color: "var(--ink)",
                        fontWeight: 500,
                        marginBottom: 4,
                      }}
                    >
                      That&rsquo;s the exact mechanism mainnet will use. Want in
                      when it goes live?
                    </p>
                    <WaitForm className="form" />
                  </div>
                )}
              </>
            ) : (
              <ConnectButton.Custom>
                {({ openConnectModal, mounted }) => (
                  <>
                    <button
                      className="btn connect"
                      onClick={openConnectModal}
                      disabled={!mounted}
                    >
                      Connect wallet &amp; read the request
                    </button>
                    <div className="status" id="status">
                      {IDLE_STATUS}
                    </div>
                  </>
                )}
              </ConnectButton.Custom>
            )}
          </div>

          <div className="glass rv d2">
            <div className="eyebrow">Payload contract</div>
            <h3
              style={{
                marginTop: 12,
                fontSize: 22,
                letterSpacing: "-.03em",
              }}
            >
              The boring fields that keep you safe
            </h3>
            <div className="sigbox sig" style={{ marginTop: 18 }}>
              <span className="k">{"{"}</span>
              <br />
              &nbsp;&nbsp;&quot;token&quot;: <span className="ok">&quot;••••••••&quot;</span>,{" "}
              <span className="k">{"// shared secret — constant-time compare"}</span>
              <br />
              &nbsp;&nbsp;&quot;symbol&quot;: <span className="ok">&quot;BTCUSDC.P&quot;</span>,{" "}
              <span className="k">{"// TV ticker, mapped server-side"}</span>
              <br />
              &nbsp;&nbsp;&quot;action&quot;: <span className="ok">&quot;buy&quot;</span>,
              <br />
              &nbsp;&nbsp;&quot;side_intent&quot;: <span className="ok">&quot;entry&quot;</span>,
              <br />
              &nbsp;&nbsp;&quot;qty_pct&quot;: <span className="ok">25</span>,
              <br />
              &nbsp;&nbsp;&quot;leverage&quot;: <span className="ok">3</span>,
              <br />
              &nbsp;&nbsp;&quot;sl_price&quot;: <span className="ok">64100</span>,
              <br />
              &nbsp;&nbsp;&quot;tp_price&quot;: <span className="ok">69800</span>,
              <br />
              &nbsp;&nbsp;<span className="k">&quot;signal_id&quot;</span>: &quot;x7f3…&quot;,{" "}
              <span className="k">{"// dedupe — duplicates die at the gate"}</span>
              <br />
              &nbsp;&nbsp;<span className="k">&quot;ts&quot;</span>: 1787654321000,{" "}
              <span className="k">{"// staleness gate — old signals refused"}</span>
              <br />
              &nbsp;&nbsp;&quot;strategy&quot;: <span className="ok">&quot;confluence-v6&quot;</span>{" "}
              <span className="k">{"// one strategy owns each coin"}</span>
              <br />
              <span className="k">{"}"}</span>
            </div>
            <p
              style={{
                marginTop: 18,
                fontSize: "14.2px",
                lineHeight: 1.6,
                color: "var(--slate)",
              }}
            >
              This is the literal payload the executor accepts — not a
              simplified mock. Three of these fields do nothing on a good day
              and everything on a bad one: <code>signal_id</code> kills
              duplicates, <code>ts</code> refuses stale signals, and on exits{" "}
              <code>reduce_only: true</code> means a close can never
              accidentally open a position.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
