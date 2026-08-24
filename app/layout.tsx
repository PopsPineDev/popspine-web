import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./providers";

const title = "PopSpine — TradingView to Hyperliquid, non-custodial";
const description =
  "Turn your Pine Script signals into live Hyperliquid execution. Your keys never leave your wallet — verify it yourself, on-chain, before you trust it.";

export const metadata: Metadata = {
  metadataBase: new URL("https://popspine.com"),
  title,
  description,
  keywords: [
    "TradingView automation",
    "Pine Script webhook",
    "Hyperliquid bot",
    "non-custodial trading automation",
    "agent wallet",
    "TradingView to Hyperliquid",
  ],
  openGraph: {
    title,
    description,
    url: "https://popspine.com",
    siteName: "PopSpine",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    creator: "@popspinedev",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-ink text-white antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
