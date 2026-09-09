import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./providers";

const title = "PopsPineDev Automation";
const description =
  "TradingView alerts fire straight into Hyperliquid through a non-custodial, trade-only agent wallet. Your private key never leaves your wallet — verify it yourself on testnet.";

// Demo media, served from R2 behind our own subdomain. Absolute URLs are
// required here — a share card is rendered by someone else's crawler.
const MEDIA = "https://media.popspine.com/r2-upload";
const POSTER = `${MEDIA}/popspine-demo-poster-v8.jpg`;
const DEMO_MP4 = `${MEDIA}/popspine-demo-v8.mp4`;

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
    images: [
      {
        url: POSTER,
        width: 1920,
        height: 1080,
        alt: "PopsPineDev Automation — your strategy, executed. Never your private key.",
      },
    ],
    // 1080p here on purpose: the platforms that inline a video player fetch
    // it themselves, and a share card is the one place worth the bytes.
    videos: [{ url: DEMO_MP4, width: 1920, height: 1080, type: "video/mp4" }],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    creator: "@popspinedev",
    images: [POSTER],
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
        {/* The poster is the first byte fetched from this host and it sits
            below the fold — warming the connection early makes the frame
            appear on scroll rather than after it. */}
        <link rel="preconnect" href="https://media.popspine.com" />
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
        {/* Self-hosted Umami — no cookies, no fingerprinting, no cross-site
            identifiers, so no consent banner is required. Served from our own
            subdomain, which also means the blockers that strip plausible.io
            and cdn.usefathom.com don't strip this. Deferred: it must never
            delay first paint. */}
        <script
          defer
          src="https://analytics.popspine.com/script.js"
          data-website-id="7699a7f4-7c3a-4609-a8c2-44733fef9e1a"
        />
      </head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
