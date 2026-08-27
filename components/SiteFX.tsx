"use client";

import { useEffect } from "react";

/**
 * Scroll-reveal engine (ported from the design handoff): replays every time
 * a .rv block enters or leaves the viewport, in either direction, with a
 * 2.5s force-reveal safety net so a misbehaving IntersectionObserver can
 * never leave the page blank. The reveal styling itself is gated on html.js
 * (added by the boot script in layout.tsx) so JS-off browsers see everything.
 */
export function SiteFX() {
  useEffect(() => {
    const io = new IntersectionObserver(
      (es) =>
        es.forEach((e) => e.target.classList.toggle("in", e.isIntersecting)),
      { threshold: 0.12, rootMargin: "0px 0px -15% 0px" },
    );
    document.querySelectorAll(".rv").forEach((el) => io.observe(el));

    const t = setTimeout(() => {
      document.querySelectorAll(".rv:not(.in)").forEach((el) => {
        const r = el.getBoundingClientRect();
        if (r.top < innerHeight && r.bottom > 0) el.classList.add("in");
      });
    }, 2500);

    return () => {
      clearTimeout(t);
      io.disconnect();
    };
  }, []);

  return null;
}
