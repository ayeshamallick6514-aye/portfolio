"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { motionOn, useMotion } from "@/lib/prefs";

/**
 * A follower that trails the pointer: a small dot that opens into a ring over
 * links and into a labelled disc over anything with `data-cursor="Label"`.
 * The real cursor stays visible; this is an accent, not a replacement.
 */
export default function Cursor() {
  const ref = useRef<HTMLDivElement>(null);
  const motion = useMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el || !motionOn()) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches)
      return;

    const label = el.querySelector<HTMLElement>(".cursor__label");
    const xTo = gsap.quickTo(el, "x", { duration: 0.3, ease: "power3" });
    const yTo = gsap.quickTo(el, "y", { duration: 0.3, ease: "power3" });
    let shown = false;

    const move = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      if (!shown) {
        shown = true;
        gsap.set(el, { x: e.clientX, y: e.clientY });
        el.classList.add("is-on");
      }
      xTo(e.clientX);
      yTo(e.clientY);
      const target = e.target instanceof Element ? e.target : null;
      const tagged = target?.closest<HTMLElement>("[data-cursor]") ?? null;
      const link = target?.closest("a, button") ?? null;
      el.classList.toggle("is-label", Boolean(tagged));
      el.classList.toggle("is-link", Boolean(link) && !tagged);
      if (tagged && label) label.textContent = tagged.dataset.cursor ?? "";
    };
    const leave = () => {
      shown = false;
      el.classList.remove("is-on");
    };

    window.addEventListener("pointermove", move, { passive: true });
    document.documentElement.addEventListener("pointerleave", leave);
    return () => {
      window.removeEventListener("pointermove", move);
      document.documentElement.removeEventListener("pointerleave", leave);
      el.classList.remove("is-on", "is-label", "is-link");
    };
  }, [motion]);

  return (
    <div ref={ref} className="cursor" aria-hidden="true">
      <span className="cursor__label" />
    </div>
  );
}
