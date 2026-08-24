/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config) => {
    // @coinbase/cdp-sdk (pulled in transitively by RainbowKit's default
    // "Coinbase Smart Wallet" connector via @wagmi/connectors ->
    // @base-org/account) declares @x402/* as OPTIONAL peer deps for its
    // x402 payment-protocol support. We never touch that code path, but
    // Next's production webpack build still tries to statically resolve
    // the imports and fails. Alias them to false so webpack treats them
    // as empty modules instead of hard errors.
    config.resolve.alias = {
      ...config.resolve.alias,
      "@x402/core": false,
      "@x402/core/client": false,
      "@x402/evm": false,
      "@x402/evm/upto/client": false,
      "@x402/evm/exact/client": false,
      "@x402/extensions": false,
      "@x402/svm": false,
      "@x402/svm/exact/client": false,
    };
    // Standard wagmi/RainbowKit + Next.js warnings: optional deps pulled in
    // by the MetaMask/WalletConnect connectors that only matter in React
    // Native or Node server contexts, never in the browser bundle we ship.
    config.resolve.fallback = {
      ...config.resolve.fallback,
      "@react-native-async-storage/async-storage": false,
      "pino-pretty": false,
    };
    return config;
  },
};

export default nextConfig;
