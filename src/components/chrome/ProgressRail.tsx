"use client";

import { useEffect, useRef } from "react";
import { chapters } from "@/content/profile";

/**
 * Reading progress on the left edge, plus a small label that names the
 * chapter currently on screen (desktop only, via CSS).
 */
export default function ProgressRail() {
  const bar = useRef<HTMLSpanElement>(null);
  const label = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    let raf = 0;
    let current = "";
    const update = () => {
      raf = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? Math.min(Math.max(window.scrollY / max, 0), 1) : 0;
      if (bar.current) bar.current.style.transform = `scaleY(${p})`;

      // Which chapter straddles the middle of the screen?
      const mid = window.innerHeight * 0.5;
      let found = "";
      for (const c of chapters) {
        const el = document.getElementById(c.id);
        if (!el) continue;
        const r = el.getBoundingClientRect();
        if (r.top <= mid && r.bottom > mid) found = `${c.no} / 08 — ${c.label}`;
      }
      if (found !== current && label.current) {
        current = found;
        const el = label.current;
        el.classList.remove("is-shown");
        el.textContent = found;
        // Restart the flip animation.
        void el.offsetWidth;
        if (found) el.classList.add("is-shown");
      }
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className="rail" aria-hidden="true">
      <span ref={bar} className="rail__bar" />
      <span ref={label} className="rail__chapter" />
    </div>
  );
}
