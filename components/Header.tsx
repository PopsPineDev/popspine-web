"use client";

import { ConnectButton } from "@rainbow-me/rainbowkit";

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-panelBorder/60 bg-ink/80 backdrop-blur">
      <div className="section flex h-16 items-center justify-between">
        <a href="/" className="flex items-center gap-2 font-semibold tracking-tight">
          <span className="h-2 w-2 rounded-full bg-accent" />
          PopSpine
        </a>
        <nav className="hidden gap-8 text-sm text-textDim md:flex">
          <a href="#how-it-works" className="hover:text-white">How it works</a>
          <a href="#proof" className="hover:text-white">Verify the proof</a>
          <a href="#pricing" className="hover:text-white">Monetization</a>
          <a href="#waitlist" className="hover:text-white">Early access</a>
        </nav>
        <ConnectButton
          showBalance={false}
          chainStatus="icon"
          accountStatus="address"
        />
      </div>
    </header>
  );
}
