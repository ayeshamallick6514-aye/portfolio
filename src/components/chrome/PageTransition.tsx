"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { gsap, F } from "@/lib/gsap";
import { getLenis, setTransitionHandler } from "@/lib/prefs";

const COVERED = "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)";
const FROM_LEFT = "polygon(0% 0%, 0% 0%, -30% 100%, -30% 100%)";
const TO_RIGHT = "polygon(130% 0%, 100% 0%, 100% 100%, 100% 100%)";

/**
 * Ink-wipe page transition: a one-frame impact burst, then a diagonal sheet
 * of ink covers the page, the route changes underneath, and the ink leaves.
 */
export default function PageTransition() {
  const root = useRef<HTMLDivElement>(null);
  const pending = useRef(false);
  const failsafe = useRef<number | undefined>(undefined);
  const pathname = usePathname();

  const reveal = () => {
    const el = root.current;
    if (!el || !pending.current) return;
    pending.current = false;
    window.clearTimeout(failsafe.current);
    const sheet = el.querySelector(".pt__sheet");
    gsap
      .timeline({
        onComplete: () => {
          el.classList.remove("is-active");
          getLenis()?.start();
        },
      })
      .to(sheet, { clipPath: TO_RIGHT, duration: F(13), ease: "cut" }, F(2));
  };

  useEffect(() => {
    setTransitionHandler((go) => {
      const el = root.current;
      if (!el || pending.current) return go();
      pending.current = true;
      el.classList.add("is-active");
      getLenis()?.stop();
      const sheet = el.querySelector(".pt__sheet");
      const burst = el.querySelector(".pt__burst");
      gsap
        .timeline({
          onComplete: () => {
            go();
            // If the route does not change (same page), still clear the ink.
            failsafe.current = window.setTimeout(reveal, 1400);
          },
        })
        .set(sheet, { clipPath: FROM_LEFT })
        .set(burst, { autoAlpha: 1 })
        .set(burst, { autoAlpha: 0 }, F(2))
        .to(sheet, { clipPath: COVERED, duration: F(9), ease: "cut" }, F(1));
    });
    return () => setTransitionHandler(null);
  }, []);

  // The new route has rendered: take the ink away.
  useEffect(() => {
    if (pending.current) reveal();
  }, [pathname]);

  return (
    <div ref={root} className="pt" aria-hidden="true">
      <div className="pt__burst" />
      <div className="pt__sheet" />
    </div>
  );
}
