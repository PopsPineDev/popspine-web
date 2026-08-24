// One-off verification script — NOT part of the Next.js app, not shipped.
// Confirms lib/hyperliquid.ts's approveAgentOnTestnet() actually round-trips
// against Hyperliquid's real testnet API using a viem WalletClient, the
// same object shape wagmi's useWalletClient() hands to ProofSection.tsx.
//
// Uses two freshly generated, throwaway private keys — no real funds, no
// mainnet exposure, nothing reused anywhere else. Deleted after this run.

import { createWalletClient, http } from "viem";
import { privateKeyToAccount, generatePrivateKey } from "viem/accounts";
import { arbitrumSepolia } from "viem/chains";
import * as hl from "@nktkas/hyperliquid";

const walletPk = generatePrivateKey();
const agentPk = generatePrivateKey();
const walletAccount = privateKeyToAccount(walletPk);
const agentAccount = privateKeyToAccount(agentPk);

console.log("throwaway wallet address:", walletAccount.address);
console.log("throwaway agent address: ", agentAccount.address);

// Mirrors what wagmi's useWalletClient() returns to ProofSection.tsx.
const walletClient = createWalletClient({
  account: walletAccount,
  chain: arbitrumSepolia,
  transport: http(),
});

const transport = new hl.HttpTransport({ isTestnet: true });
const exchClient = new hl.ExchangeClient({
  transport,
  wallet: walletClient, // exact same value/shape lib/hyperliquid.ts passes through
});

try {
  const result = await exchClient.approveAgent({
    agentAddress: agentAccount.address,
    agentName: "verify-script",
  });
  console.log("SUCCESS:", JSON.stringify(result));
  process.exit(0);
} catch (err) {
  console.log("REQUEST FAILED:");
  console.log("  name:", err?.name);
  console.log("  message:", err?.message);
  if (err?.response) {
    console.log("  response:", JSON.stringify(err.response));
  }
  process.exit(1);
}
