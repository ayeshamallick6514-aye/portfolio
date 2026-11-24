"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { getLenis, motionOn, setLenis, useMotion } from "@/lib/prefs";

/**
 * Smooth scrolling for mouse and trackpad only. Touch devices keep native
 * scroll, and so does anyone with motion turned off.
 */
export default function SmoothScroll() {
  const motion = useMotion();
  const pathname = usePathname();

  useEffect(() => {
    if (!motionOn()) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches)
      return;

    const lenis = new Lenis({ autoRaf: false, lerp: 0.12, wheelMultiplier: 1 });
    setLenis(lenis);
    lenis.on("scroll", ScrollTrigger.update);
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    if (document.documentElement.hasAttribute("data-loading")) lenis.stop();

    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
      setLenis(null);
    };
  }, [motion]);

  // After a route change, let the new page lay out, then re-measure.
  useEffect(() => {
    const id = window.requestAnimationFrame(() => {
      getLenis()?.resize();
      ScrollTrigger.refresh();
    });
    return () => window.cancelAnimationFrame(id);
  }, [pathname]);

  return null;
}
