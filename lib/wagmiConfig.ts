import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { arbitrum, arbitrumSepolia } from "wagmi/chains";

// Hyperliquid accounts are standard EVM addresses. There's no dedicated
// "Hyperliquid chain" to connect a wallet to for signing exchange actions —
// the signature itself carries a `signatureChainId` field in the action
// payload (see lib/hyperliquid.ts). We use Arbitrum / Arbitrum Sepolia here
// purely as reasonable EVM chains for wagmi/RainbowKit's UI chrome (chain
// switcher, block explorer links); they are NOT where the trade-only agent
// approval is submitted — that goes straight to Hyperliquid's own API.
export const wagmiConfig = getDefaultConfig({
  appName: "PopSpine",
  projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || "",
  chains: [arbitrumSepolia, arbitrum],
  ssr: true,
});
