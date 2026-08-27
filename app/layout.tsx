import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./providers";

const title = "PopsPineDev Automation";
const description =
  "TradingView alerts fire straight into Hyperliquid through a non-custodial, trade-only agent wallet. Your private key never leaves your wallet — verify it yourself on testnet.";

// Hex-bars mark, same artwork as the nav logo — served as an SVG data URI so
// the favicon needs no extra network request.
const FAVICON =
  "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjEuOSAxLjkgMjguMiAyOC4yIj48ZGVmcz48bGluZWFyR3JhZGllbnQgaWQ9ImciIHgxPSIwIiB5MT0iMzIiIHgyPSIzMiIgeTI9IjAiPjxzdG9wIG9mZnNldD0iMCUiIHN0b3AtY29sb3I9IiMxMkI3OUIiLz48c3RvcCBvZmZzZXQ9IjU1JSIgc3RvcC1jb2xvcj0iIzBGQTlDRiIvPjxzdG9wIG9mZnNldD0iMTAwJSIgc3RvcC1jb2xvcj0iIzdDN0JGMCIvPjwvbGluZWFyR3JhZGllbnQ+PC9kZWZzPjxwYXRoIGQ9Ik0xNiwzIEwyNyw5LjUgTDI3LDIyLjUgTDE2LDI5IEw1LDIyLjUgTDUsOS41IFoiIGZpbGw9Im5vbmUiIHN0cm9rZT0idXJsKCNnKSIgc3Ryb2tlLXdpZHRoPSIyLjkiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz48cmVjdCB4PSIxMCIgeT0iMTcuNzUiIHdpZHRoPSIzLjIiIGhlaWdodD0iNSIgcng9IjEuMyIgZmlsbD0iI0VGNTM1MCIvPjxyZWN0IHg9IjE0LjQiIHk9IjEzLjc1IiB3aWR0aD0iMy4yIiBoZWlnaHQ9IjkiIHJ4PSIxLjMiIGZpbGw9IiM0RkMzRjciLz48cmVjdCB4PSIxOC44IiB5PSI5LjI1IiB3aWR0aD0iMy4yIiBoZWlnaHQ9IjEzLjUiIHJ4PSIxLjMiIGZpbGw9IiM0RkMzRjciLz48L3N2Zz4=";

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
  icons: { icon: [{ url: FAVICON, type: "image/svg+xml" }] },
  openGraph: {
    title,
    description,
    url: "https://popspine.com",
    siteName: "PopsPineDev Automation",
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
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Boot script — must run before first paint: the drawer burger and
            the scroll-reveal treatment are gated on html.js, so restricted
            previews / JS-off browsers get full content instead of a blank
            page (progressive enhancement, per the design handoff). */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "document.documentElement.classList.add('js');document.documentElement.setAttribute('data-variant','spring');",
          }}
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
