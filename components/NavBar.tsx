"use client";

import { useEffect, useRef, useState } from "react";
import { useVerified } from "@/lib/useVerified";
import { WaitForm } from "./WaitForm";

const LINKS = [
  { href: "#how", label: "How It Works" },
  { href: "#proof", label: "Proof" },
  { href: "#why", label: "Why It's Different" },
  { href: "#pricing", label: "Pricing" },
  { href: "#faq", label: "FAQ" },
];

/**
 * Announcement bar + fixed pill nav + mobile drawer, plus the scroll chrome:
 * body.past-hero (announce bar slides away, nav rises), .nav-solid (silver
 * glass once past the mint header field), and the sliding segmented
 * indicator that tracks / previews the active section.
 */
export function NavBar() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  // Mirror the proof card's "signature verified" state (24h, same address)
  // into the nav CTA — shared hook, same source of truth as the hero CTA.
  const verified = useVerified();
  const navLinksRef = useRef<HTMLDivElement>(null);
  const indRef = useRef<HTMLSpanElement>(null);
  const navbarRef = useRef<HTMLDivElement>(null);

  // Drawer side effects: body class + scroll lock, Escape to close.
  useEffect(() => {
    document.body.classList.toggle("drawer-open", drawerOpen);
    if (!drawerOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setDrawerOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [drawerOpen]);

  useEffect(() => {
    const navLinksEl = navLinksRef.current;
    const navInd = indRef.current;
    const navEl = navbarRef.current;
    const anchors = navLinksEl
      ? Array.from(navLinksEl.querySelectorAll("a"))
      : [];

    function moveInd(a: HTMLAnchorElement) {
      if (!navInd || !navLinksEl) return;
      const r = a.getBoundingClientRect();
      const p = navLinksEl.getBoundingClientRect();
      navInd.style.width = `${r.width}px`;
      navInd.style.transform = `translateX(${r.left - p.left}px)`;
      navInd.style.opacity = "1";
    }

    function syncNav() {
      if (!anchors.length) return;
      let cur: HTMLAnchorElement | null = null;
      for (const a of anchors) {
        const t = document.querySelector(a.getAttribute("href") || "");
        // 170 > the sections' scroll-margin-top (150px), so a section you
        // just clicked to actually gets marked active — at 140 it never did.
        if (t && t.getBoundingClientRect().top <= 170) cur = a;
      }
      anchors.forEach((a) => a.classList.toggle("is-active", a === cur));
      if (cur) moveInd(cur);
      else if (navInd) navInd.style.opacity = "0";
    }

    const enters = anchors.map((a) => {
      const onEnter = () => moveInd(a);
      a.addEventListener("mouseenter", onEnter);
      a.addEventListener("mouseleave", syncNav);
      return { a, onEnter };
    });

    const root = document.documentElement;
    let ticking = false;
    let lastY = window.scrollY;
    const bannerEl = document.querySelector(".chart-band");

    function onScroll() {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const y = window.scrollY;
        const dy = y - lastY;
        if (Math.abs(dy) > 4) {
          root.classList.toggle("dir-up", dy < 0);
          lastY = y;
        }
        document
          .querySelectorAll<HTMLElement>(".blob")
          .forEach((b, i) => {
            b.style.marginTop = `${y * (0.03 + i * 0.015)}px`;
          });
        if (navEl && bannerEl) {
          const navBottom = navEl.getBoundingClientRect().bottom;
          const past =
            bannerEl.getBoundingClientRect().bottom <= navBottom + 10;
          navEl.classList.toggle("nav-solid", past);
          document.body.classList.toggle("past-hero", past);
        }
        syncNav();
        ticking = false;
      });
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", syncNav, { passive: true });
    window.addEventListener("load", syncNav);
    syncNav();
    onScroll();

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", syncNav);
      window.removeEventListener("load", syncNav);
      enters.forEach(({ a, onEnter }) => {
        a.removeEventListener("mouseenter", onEnter);
        a.removeEventListener("mouseleave", syncNav);
      });
    };
  }, []);

  return (
    <>
      <div className="announce">
        <WaitForm className="ann-form" />
      </div>

      <nav>
        <div className="navbar" ref={navbarRef}>
          <button
            className="nav-burger"
            id="burger"
            aria-label="Open menu"
            aria-expanded={drawerOpen}
            aria-controls="mnav"
            onClick={() => setDrawerOpen((o) => !o)}
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.4"
              strokeLinecap="round"
            >
              <line x1="4" y1="7" x2="20" y2="7" />
              <line x1="4" y1="12" x2="20" y2="12" />
              <line x1="4" y1="17" x2="20" y2="17" />
            </svg>
          </button>
          <div className="brand">
            <span className="brand-mark">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                className="avatar"
                src="/avatar.jpg"
                alt="PopsPineDev"
                width={38}
                height={38}
              />
              <span className="avatar-status"></span>
            </span>
            <span className="lockup">
              <span className="wordmark grad">PopsPineDev</span>
              <span className="wordmark-desc">AUTOMATION</span>
            </span>
            <span className="logo-mark" aria-hidden="true">
              <svg viewBox="0 0 32 32" fill="none">
                <defs>
                  <linearGradient id="markGrad" x1="0" y1="32" x2="32" y2="0">
                    <stop offset="0%" stopColor="#12B79B" />
                    <stop offset="55%" stopColor="#0FA9CF" />
                    <stop offset="100%" stopColor="#7C7BF0" />
                  </linearGradient>
                </defs>
                <path
                  d="M16,3 L27,9.5 L27,22.5 L16,29 L5,22.5 L5,9.5 Z"
                  stroke="url(#markGrad)"
                  strokeWidth="2.2"
                  strokeLinejoin="round"
                />
                <rect x="10" y="17.75" width="3.2" height="5" rx="1.3" fill="#EF5350" />
                <rect x="14.4" y="13.75" width="3.2" height="9" rx="1.3" fill="#4FC3F7" />
                <rect x="18.8" y="9.25" width="3.2" height="13.5" rx="1.3" fill="#4FC3F7" />
              </svg>
            </span>
          </div>
          <div className="nav-links" ref={navLinksRef}>
            <span className="nav-ind" aria-hidden="true" ref={indRef}></span>
            {LINKS.map((l) => (
              <a key={l.href} href={l.href}>
                {l.label}
              </a>
            ))}
          </div>
          <a
            className={`btn${verified ? " btn-done" : ""}`}
            href="#proof"
            aria-label={
              verified ? "Wallet verified — view proof" : "Verify it yourself"
            }
          >
            <span aria-hidden="true" className="btn-label-full">
              {verified ? "Wallet verified ✓" : "Verify it yourself"}
            </span>
            <span aria-hidden="true" className="btn-label-short">
              {verified ? "Verified ✓" : "Verify"}
            </span>
          </a>
        </div>
      </nav>

      <div
        className="drawer-overlay"
        id="mnav-overlay"
        aria-hidden="true"
        onClick={() => setDrawerOpen(false)}
      ></div>
      <aside
        className="drawer"
        id="mnav"
        aria-label="Menu"
        aria-hidden={!drawerOpen}
      >
        <div className="drawer-head">
          <span className="drawer-title">Menu</span>
          <button
            className="drawer-close"
            id="mnav-close"
            aria-label="Close menu"
            onClick={() => setDrawerOpen(false)}
          >
            &#10005;
          </button>
        </div>
        <nav className="drawer-links" onClick={() => setDrawerOpen(false)}>
          <a href="#how">How It Works</a>
          <a href="#proof">Proof</a>
          <a href="#why">Why It&rsquo;s Different</a>
          <a href="#pricing">Pricing</a>
          <a href="#faq">FAQ</a>
        </nav>
        <a
          className={`btn drawer-cta${verified ? " btn-done" : ""}`}
          href="#proof"
          onClick={() => setDrawerOpen(false)}
        >
          {verified ? "Wallet verified ✓" : "Verify it yourself →"}
        </a>
      </aside>
    </>
  );
}
