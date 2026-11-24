"use client";

import { useEffect, useRef } from "react";
import { gsap, F } from "@/lib/gsap";
import { getLenis } from "@/lib/prefs";

/**
 * Opening loader. There is no cover screen: the real hero name is on screen
 * from the first paint, hidden only by a paper-coloured mask that carries its
 * outline. The mask drains away like a rising ink wash while a page counter
 * rolls, then the rest of the hero arrives.
 *
 * Painting the real heading first keeps Largest Contentful Paint at first
 * paint instead of after the animation. The loader only runs when the boot
 * script sets `data-loading` (first visit of a session, home page, motion on).
 */
export default function Loader() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const html = document.documentElement;
    const el = root.current;
    const mask = document.querySelector<HTMLElement>(".hero__inkmask");
    if (!el || !html.hasAttribute("data-loading")) return;

    const count = el.querySelector<HTMLElement>(".loader__num");
    const state = { p: 0 };
    let done = false;
    let exit: gsap.core.Tween | undefined;
    let lastShown = -1;

    // Mask shape: everything above a wavy waterline that falls as p rises.
    const wave = () => {
      const level = 100 - state.p;
      if (mask) {
        const t = performance.now() / 240;
        const amp = state.p > 1 && state.p < 99 ? 5 : 0;
        let pts = "0% 0%, 100% 0%";
        for (let i = 12; i >= 0; i--) {
          const y = Math.max(0, level + Math.sin(i * 0.9 + t) * amp);
          pts += `, ${((i / 12) * 100).toFixed(1)}% ${y.toFixed(2)}%`;
        }
        mask.style.clipPath = `polygon(${pts})`;
      }
      const shown = Math.round(state.p);
      if (count && shown !== lastShown) {
        lastShown = shown;
        count.textContent = String(shown).padStart(3, "0");
      }
    };

    const finish = () => {
      if (done) return;
      done = true;
      gsap.ticker.remove(wave);
      if (mask) mask.style.clipPath = "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)";
      try {
        sessionStorage.setItem("dk-seen", "1");
      } catch {}
      window.dispatchEvent(new Event("dk:intro"));
      exit = gsap.to(el, {
        yPercent: 100,
        duration: F(8),
        ease: "cut",
        onComplete: () => {
          html.removeAttribute("data-loading");
          getLenis()?.start();
        },
      });
    };

    gsap.ticker.add(wave);
    const fonts = document.fonts?.ready ?? Promise.resolve();
    const tween = gsap.to(state, {
      p: 100,
      duration: 1.35,
      ease: "power2.inOut",
      onComplete: () => {
        wave();
        void Promise.race([
          fonts,
          new Promise((r) => setTimeout(r, 1200)),
        ]).then(() => gsap.delayedCall(F(3), finish));
      },
    });

    // On cleanup only stop the animation. The attribute stays, so a remount
    // (React Strict Mode in development) simply starts the loader again; the
    // boot script clears it after a few seconds if nothing ever does.
    return () => {
      tween.kill();
      exit?.kill();
      gsap.ticker.remove(wave);
      gsap.set(el, { clearProps: "transform" });
      if (mask) mask.style.clipPath = "";
    };
  }, []);

  return (
    <div ref={root} className="loader" aria-hidden="true">
      <p className="loader__note label">Inking page 01</p>
      <p className="loader__count display">
        <span className="loader__num">000</span>
      </p>
    </div>
  );
}
