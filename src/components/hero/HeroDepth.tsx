"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { motionOn, useMotion } from "@/lib/prefs";

// How far forward or back each letter sits. Positive is nearer the reader.
const depth = [-0.7, 0.5, -0.25, 1, -0.9, 0.35, -0.55, 0.8, -0.3];

/**
 * Depth in the name. On a desktop with a mouse, each letter of the heading is
 * given its own depth; moving the pointer over the hero shifts near letters
 * one way and far letters the other and turns them slightly, so the name
 * reads as layered. Nothing moves until the pointer does, and the letters
 * settle back when it leaves.
 *
 * The letters are wrapped here, on the client, after the page has painted.
 * Kerning is switched off for the heading in CSS, so wrapping them changes
 * no widths. The heading keeps its full text as its accessible name.
 */
export default function HeroDepth() {
  const anchor = useRef<HTMLSpanElement>(null);
  const motion = useMotion();

  useGSAP(
    () => {
      const hero = anchor.current?.closest<HTMLElement>(".hero");
      if (!hero || !motionOn()) return;
      if (
        !window.matchMedia(
          "(min-width: 900px) and (hover: hover) and (pointer: fine)",
        ).matches
      )
        return;
      const heading = hero.querySelector<HTMLElement>(
        ".hero__title > .hero__name",
      );
      if (!heading) return;
      const words = Array.from(
        heading.querySelectorAll<HTMLElement>(".hero__word"),
      );
      const original = words.map((w) => w.textContent ?? "");
      const hadLabel = heading.hasAttribute("aria-label");

      let letters: HTMLElement[] = [];
      let move: ((e: PointerEvent) => void) | null = null;
      let leave: (() => void) | null = null;

      const start = () => {
        if (letters.length) return;
        if (!hadLabel) heading.setAttribute("aria-label", original.join(" "));
        words.forEach((w, wi) => {
          w.textContent = "";
          for (const ch of original[wi]) {
            const s = document.createElement("span");
            s.className = "hero__ch";
            s.setAttribute("aria-hidden", "true");
            s.textContent = ch;
            w.appendChild(s);
            letters.push(s);
          }
        });
        gsap.set(letters, { transformPerspective: 700 });
        const z = letters.map((_, i) => depth[i % depth.length]);
        const pos = { x: 0, y: 0 };
        const draw = () => {
          for (let i = 0; i < letters.length; i++) {
            gsap.set(letters[i], {
              x: pos.x * z[i] * 8,
              y: pos.y * z[i] * 6,
              rotationY: pos.x * (5 + z[i] * 3),
              rotationX: pos.y * -4,
            });
          }
        };
        const toX = gsap.quickTo(pos, "x", {
          duration: 0.35,
          ease: "power3",
          onUpdate: draw,
        });
        const toY = gsap.quickTo(pos, "y", {
          duration: 0.35,
          ease: "power3",
          onUpdate: draw,
        });
        move = (e: PointerEvent) => {
          const r = hero.getBoundingClientRect();
          toX(((e.clientX - r.left) / r.width - 0.5) * 2);
          toY(((e.clientY - r.top) / r.height - 0.5) * 2);
        };
        leave = () => {
          toX(0);
          toY(0);
        };
        hero.addEventListener("pointermove", move, { passive: true });
        hero.addEventListener("pointerleave", leave);
      };

      // Wait for the opening to finish before touching the heading.
      let timer: ReturnType<typeof setTimeout> | undefined;
      const later = () => {
        timer = setTimeout(start, 1400);
      };
      if (document.documentElement.hasAttribute("data-loading")) {
        window.addEventListener("dk:intro", later, { once: true });
      } else {
        timer = setTimeout(start, 500);
      }

      return () => {
        window.removeEventListener("dk:intro", later);
        if (timer) clearTimeout(timer);
        if (move) hero.removeEventListener("pointermove", move);
        if (leave) hero.removeEventListener("pointerleave", leave);
        if (letters.length) {
          gsap.killTweensOf(letters);
          words.forEach((w, wi) => {
            w.textContent = original[wi];
          });
          if (!hadLabel) heading.removeAttribute("aria-label");
          letters = [];
        }
      };
    },
    { dependencies: [motion], revertOnUpdate: true },
  );

  return <span ref={anchor} hidden />;
}
