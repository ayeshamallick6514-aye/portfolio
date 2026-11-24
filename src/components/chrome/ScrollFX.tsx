"use client";

import { useRef } from "react";
import { gsap, F, ScrollTrigger, SplitText, useGSAP } from "@/lib/gsap";
import { motionOn, useMotion } from "@/lib/prefs";

declare global {
  interface Window {
    __dkfx?: boolean;
  }
}

/**
 * Scroll choreography for everything marked up with data attributes:
 *   data-reveal="up"     rise and fade in
 *   data-reveal="lines"  headline lines slide up from behind a mask
 *   data-reveal="chars"  letters punch in one by one
 *   data-reveal="clip"   panel wipes in from the left
 *   data-reveal="slit"   opens from a centre line, like an anime cut-in
 *   data-reveal="drop"   falls into place with a little spin, like a receipt
 *   data-reveal="stamp"  lands like a rubber stamp, on twos
 *   data-parallax="n"    drifts n percent across its time in view
 *   data-zoom="s"        starts at scale s and settles to 1 as it crosses
 *   data-scrub-x="n"     slides sideways by n percent, tied to the scroll
 *   data-reveal="fold"   hinges down from its top edge in 3D, like paper feeding out
 *   data-reveal="deal"   flips over in 3D from the side, like a dealt print
 *   data-turn="n"        turns n degrees either way in 3D across its time in view
 *   data-screen          child leans back in 3D and stands up as it scrolls in
 *   data-pull            a volume that slides out and turns its cover to face you
 *   data-inkfill         outlined words that fill with ink as they cross the screen
 *   data-tilt            leans in 3D toward the pointer
 *   data-magnetic        leans toward the pointer
 * Markup stays server-rendered; with motion off nothing here runs and the
 * page is simply static.
 */
export default function ScrollFX() {
  const anchor = useRef<HTMLSpanElement>(null);
  const motion = useMotion();

  useGSAP(
    (_context, contextSafe) => {
      window.__dkfx = true;
      const scope = anchor.current?.parentElement;
      // Read the live preference: the hook's first value during hydration is
      // always "on", and tweens started then would outlive the switch.
      if (!scope || !contextSafe || !motionOn()) return;
      // Only elements that have not been revealed yet; ".is-in" also switches
      // off the CSS that pre-hides them.
      const q = (sel: string) =>
        gsap.utils.toArray<HTMLElement>(
          sel.replace(/\]$/, "]:not(.is-in)"),
          scope,
        );
      const any = gsap.utils.selector(scope);
      const mark = (els: Element[]) =>
        els.forEach((el) => el.classList.add("is-in"));
      const cleanups: Array<() => void> = [];
      const fine = window.matchMedia(
        "(hover: hover) and (pointer: fine)",
      ).matches;

      /* ---------- one-shot reveals ---------- */

      ScrollTrigger.batch(q("[data-reveal='up']"), {
        start: "top 90%",
        once: true,
        onEnter: contextSafe((els: Element[]) => {
          mark(els);
          gsap.fromTo(
            els,
            { opacity: 0, y: 36 },
            {
              opacity: 1,
              y: 0,
              duration: F(12),
              ease: "slam",
              stagger: F(1),
              overwrite: true,
              clearProps: "opacity,transform",
            },
          );
        }),
      });

      ScrollTrigger.batch(q("[data-reveal='clip']"), {
        start: "top 94%",
        once: true,
        onEnter: contextSafe((els: Element[]) => {
          mark(els);
          gsap.fromTo(
            els,
            { clipPath: "inset(0% 100% 0% 0%)" },
            {
              clipPath: "inset(0% 0% 0% 0%)",
              duration: F(11),
              ease: "cut",
              stagger: F(1.5),
              clearProps: "clipPath",
            },
          );
        }),
      });

      ScrollTrigger.batch(q("[data-reveal='slit']"), {
        start: "top 78%",
        once: true,
        onEnter: contextSafe((els: Element[]) => {
          mark(els);
          gsap.fromTo(
            els,
            { clipPath: "inset(50% 0% 50% 0%)" },
            {
              clipPath: "inset(0% 0% 0% 0%)",
              duration: F(7),
              ease: "steps(6)",
              clearProps: "clipPath",
            },
          );
        }),
      });

      ScrollTrigger.batch(q("[data-reveal='drop']"), {
        start: "top 94%",
        once: true,
        onEnter: contextSafe((els: Element[]) => {
          mark(els);
          gsap.fromTo(
            els,
            { opacity: 0, y: -90, rotate: (i: number) => (i % 2 ? 7 : -8) },
            {
              opacity: 1,
              y: 0,
              rotate: 0,
              duration: F(10),
              ease: "back.out(1.4)",
              stagger: F(1),
              clearProps: "opacity,transform",
            },
          );
        }),
      });

      ScrollTrigger.batch(q("[data-reveal='fold']"), {
        start: "top 97%",
        once: true,
        onEnter: contextSafe((els: Element[]) => {
          mark(els);
          gsap.fromTo(
            els,
            {
              opacity: 0,
              rotationX: -86,
              transformPerspective: 900,
              transformOrigin: "50% 0%",
            },
            {
              opacity: 1,
              rotationX: 0,
              duration: F(11),
              ease: "back.out(1.5)",
              stagger: F(1.2),
              clearProps: "opacity,transform,transformOrigin",
            },
          );
        }),
      });

      ScrollTrigger.batch(q("[data-reveal='deal']"), {
        start: "top 92%",
        once: true,
        onEnter: contextSafe((els: Element[]) => {
          mark(els);
          gsap.fromTo(
            els,
            {
              opacity: 0,
              rotationY: -80,
              x: -70,
              transformPerspective: 1000,
              transformOrigin: "0% 50%",
            },
            {
              opacity: 1,
              rotationY: 0,
              x: 0,
              duration: F(11),
              ease: "back.out(1.3)",
              stagger: F(1.5),
              clearProps: "opacity,transform,transformOrigin",
            },
          );
        }),
      });

      ScrollTrigger.batch(q("[data-reveal='stamp']"), {
        start: "top 92%",
        once: true,
        onEnter: contextSafe((els: Element[]) => {
          mark(els);
          gsap.fromTo(
            els,
            { opacity: 0, scale: 2.4 },
            {
              opacity: 1,
              scale: 1,
              duration: F(5),
              ease: "steps(4)",
              stagger: F(1.5),
              delay: F(5),
              clearProps: "opacity,transform",
            },
          );
        }),
      });

      // Text is split only when it is about to enter, so the cost is spread
      // over the scroll instead of paid at start-up.
      q("[data-reveal='lines']").forEach((el) => {
        ScrollTrigger.create({
          trigger: el,
          start: "top 92%",
          once: true,
          onEnter: contextSafe(() => {
            const split = SplitText.create(el, {
              type: "lines",
              mask: "lines",
              linesClass: "split-line",
            });
            el.classList.add("is-in");
            gsap.from(split.lines, {
              yPercent: 112,
              rotate: 3,
              duration: F(14),
              ease: "slam",
              stagger: F(1.5),
              onComplete: () => split.revert(),
            });
            cleanups.push(() => split.revert());
          }),
        });
      });

      q("[data-reveal='chars']").forEach((el) => {
        ScrollTrigger.create({
          trigger: el,
          start: "top 90%",
          once: true,
          onEnter: contextSafe(() => {
            const split = SplitText.create(el, { type: "chars" });
            el.classList.add("is-in");
            // each letter flips up in 3D, like a split-flap board
            gsap.from(split.chars, {
              // tipped away from the reader, so letters never swell into
              // their neighbours on the way up
              rotationX: 92,
              yPercent: 30,
              opacity: 0,
              transformPerspective: 900,
              transformOrigin: "50% 100%",
              duration: F(11),
              ease: "back.out(1.8)",
              stagger: F(0.8),
              onComplete: () => split.revert(),
            });
            cleanups.push(() => split.revert());
          }),
        });
      });

      /* ---------- tied to the scroll ---------- */

      any("[data-parallax]").forEach((el) => {
        const amount = parseFloat(el.getAttribute("data-parallax") ?? "0");
        gsap.fromTo(
          el,
          { yPercent: -amount },
          {
            yPercent: amount,
            ease: "none",
            scrollTrigger: {
              trigger: el.parentElement ?? el,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          },
        );
      });

      any("[data-turn]").forEach((el) => {
        const n = parseFloat(el.getAttribute("data-turn") ?? "6");
        gsap.fromTo(
          el,
          { rotationY: -n },
          {
            rotationY: n,
            ease: "none",
            scrollTrigger: {
              trigger: el,
              start: "top bottom",
              end: "bottom top",
              scrub: 0.6,
            },
          },
        );
      });

      // The next volume: spine-on at first, then out and round to its cover.
      any("[data-pull]").forEach((el) => {
        gsap.fromTo(
          el,
          { rotationY: -4, x: 70 },
          {
            rotationY: -46,
            x: 0,
            ease: "none",
            scrollTrigger: {
              trigger: el.closest("nav") ?? el,
              start: "top 96%",
              end: "top 42%",
              scrub: 0.15,
            },
          },
        );
      });

      // Ink fill: every word starts as an outline, and an ink front sweeps
      // left to right across the screen as the band scrolls through. Each
      // word is filled up to wherever the front is, so it stays in step with
      // the sideways slide. No smoothing: it tracks the scroll exactly.
      any("[data-inkfill]").forEach((el) => {
        const words = Array.from(
          el.querySelectorAll<HTMLElement>(":scope > span"),
        );
        if (!words.length) return;
        el.classList.add("is-fill");
        let progress = 0;
        const paint = () => {
          const front = (0.02 + 1.2 * progress) * window.innerWidth;
          for (const w of words) {
            const r = w.getBoundingClientRect();
            const f = gsap.utils.clamp(0, 1, (front - r.left) / (r.width || 1));
            w.style.setProperty("--f", f.toFixed(3));
          }
        };
        // Timed on the text itself: the fill runs while the line travels from
        // the bottom of the screen to just above the middle. While the band
        // is on screen the fill is redrawn every frame, because the words are
        // also sliding sideways underneath the front.
        const st = ScrollTrigger.create({
          trigger: el,
          start: "top 94%",
          end: "top 36%",
          onUpdate: (self) => {
            progress = self.progress;
          },
          onRefresh: (self) => {
            progress = self.progress;
            paint();
          },
        });
        const watch = ScrollTrigger.create({
          trigger: el,
          start: "top bottom",
          end: "bottom top",
          onToggle: (self) => {
            if (self.isActive) gsap.ticker.add(paint);
            else gsap.ticker.remove(paint);
          },
        });
        if (watch.isActive) gsap.ticker.add(paint);
        cleanups.push(() => {
          gsap.ticker.remove(paint);
          st.kill();
          watch.kill();
          el.classList.remove("is-fill");
          words.forEach((w) => w.style.removeProperty("--f"));
        });
      });

      // A screen that leans back and stands up as it scrolls into view.
      any("[data-screen]").forEach((el) => {
        const target = el.firstElementChild;
        if (!target) return;
        gsap.fromTo(
          target,
          {
            rotationX: 20,
            scale: 0.88,
            transformPerspective: 1400,
            transformOrigin: "50% 35%",
          },
          {
            rotationX: 0,
            scale: 1,
            ease: "none",
            scrollTrigger: {
              trigger: el,
              start: "top 100%",
              end: "top 46%",
              scrub: 0.15,
            },
          },
        );
      });

      any("[data-zoom]").forEach((el) => {
        const from = parseFloat(el.getAttribute("data-zoom") ?? "1.15");
        gsap.fromTo(
          el,
          { scale: from },
          {
            scale: 1,
            ease: "none",
            scrollTrigger: {
              trigger: el.parentElement ?? el,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          },
        );
      });

      any("[data-scrub-x]").forEach((el) => {
        const to = parseFloat(el.getAttribute("data-scrub-x") ?? "-40");
        gsap.fromTo(
          el,
          { xPercent: to < 0 ? 6 : -6 + to },
          {
            xPercent: to < 0 ? to : 6,
            ease: "none",
            scrollTrigger: {
              trigger: el.parentElement ?? el,
              start: "top bottom",
              end: "bottom top",
              scrub: 0.5,
            },
          },
        );
      });

      // Marquee tapes: on top of their own loop, the two tapes slide against
      // each other with the scroll and lean with its speed.
      any(".tapes").forEach((tapes) => {
        const a = tapes.querySelector(".tape--a .tape__shift");
        const b = tapes.querySelector(".tape--b .tape__shift");
        const st = {
          trigger: tapes,
          start: "top bottom",
          end: "bottom top",
          scrub: 0.6,
        };
        if (a)
          gsap.fromTo(
            a,
            { xPercent: -5 },
            { xPercent: 5, ease: "none", scrollTrigger: st },
          );
        if (b)
          gsap.fromTo(
            b,
            { xPercent: 5 },
            { xPercent: -5, ease: "none", scrollTrigger: st },
          );
      });

      /* ---------- pointer ---------- */

      if (fine) {
        any("[data-magnetic]").forEach((el) => {
          const xTo = gsap.quickTo(el, "x", { duration: 0.35, ease: "power3" });
          const yTo = gsap.quickTo(el, "y", { duration: 0.35, ease: "power3" });
          const move = (e: Event) => {
            const ev = e as PointerEvent;
            const r = el.getBoundingClientRect();
            xTo((ev.clientX - (r.left + r.width / 2)) * 0.22);
            yTo((ev.clientY - (r.top + r.height / 2)) * 0.3);
          };
          const leave = () => {
            xTo(0);
            yTo(0);
          };
          el.addEventListener("pointermove", move);
          el.addEventListener("pointerleave", leave);
          cleanups.push(() => {
            el.removeEventListener("pointermove", move);
            el.removeEventListener("pointerleave", leave);
          });
        });

        any("[data-tilt]").forEach((el) => {
          gsap.set(el, { transformPerspective: 1100 });
          const rx = gsap.quickTo(el, "rotationX", {
            duration: 0.5,
            ease: "power3",
          });
          const ry = gsap.quickTo(el, "rotationY", {
            duration: 0.5,
            ease: "power3",
          });
          const move = (e: Event) => {
            const ev = e as PointerEvent;
            const r = el.getBoundingClientRect();
            rx((0.5 - (ev.clientY - r.top) / r.height) * 5);
            ry(((ev.clientX - r.left) / r.width - 0.5) * 6);
          };
          const leave = () => {
            rx(0);
            ry(0);
          };
          el.addEventListener("pointermove", move);
          el.addEventListener("pointerleave", leave);
          cleanups.push(() => {
            el.removeEventListener("pointermove", move);
            el.removeEventListener("pointerleave", leave);
          });
        });
      }

      // Fonts and images shift layout after first measure.
      const refresh = () => ScrollTrigger.refresh();
      document.fonts?.ready.then(refresh).catch(() => {});
      window.addEventListener("load", refresh, { once: true });

      return () => {
        window.removeEventListener("load", refresh);
        cleanups.forEach((fn) => fn());
      };
    },
    { dependencies: [motion] },
  );

  return <span ref={anchor} hidden />;
}
