import type { WalletClient } from "viem";

/**
 * Wraps Hyperliquid's official SDK (@nktkas/hyperliquid) to submit a
 * testnet-only `approveAgent` action, signed by whatever wallet the visitor
 * just connected via RainbowKit/wagmi.
 *
 * WHY THE SDK AND NOT HAND-ROLLED EIP-712:
 * Hyperliquid's own docs explicitly warn against hand-constructing the
 * signing payload for exchange actions ("use an existing SDK instead of
 * manually generating signatures" — incorrect signatures are hard to
 * debug). @nktkas/hyperliquid is the same SDK already running in
 * production on the Hetzner executor (see executor.js), so reusing it here
 * keeps the signing logic consistent and correct instead of me
 * reconstructing the EIP-712 domain/types from memory.
 *
 * ⚠️ PARTIALLY VERIFIED, NOT LIVE-TESTED: built against the SDK's
 * documented ExchangeClient({ wallet }) pattern, which accepts a
 * viem-compatible signer. scripts/verify-approve-agent.mjs feeds this
 * function a real viem WalletClient (throwaway key, no funds) and
 * confirmed the SDK's wallet-adapter correctly recognizes it and
 * dispatches to signTypedData/getAddresses/getChainId — the shape
 * mismatch this file's `as any` cast could have been hiding is ruled
 * out. What's NOT verified from this sandbox (no general internet
 * egress here): the actual signature + Hyperliquid testnet API
 * round-trip. Run that same script from a machine with real internet
 * access, or click through the live demo with a real wallet, before
 * treating this as production-ready. If the handshake needs an
 * adjustment, the fix is localized to this one file.
 */
export async function approveAgentOnTestnet(
  walletClient: WalletClient,
  agentAddress: `0x${string}`,
  agentName = "PopSpine (testnet demo)"
) {
  const hl = await import("@nktkas/hyperliquid");

  const transport = new hl.HttpTransport({ isTestnet: true });
  // The SDK's internal `AbstractWallet` type isn't exported from its public
  // entrypoint, so we can't reference it by name here. A viem WalletClient
  // implements the signTypedData/account shape the SDK expects at runtime
  // (see the file-level comment above) — this cast documents that gap
  // rather than hiding a real type mismatch.
  const exchClient = new hl.ExchangeClient({
    transport,
    wallet: walletClient as any,
  });

  return exchClient.approveAgent({
    agentAddress,
    agentName,
  });
}
