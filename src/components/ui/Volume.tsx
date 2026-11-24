"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { motionOn, useMotion } from "@/lib/prefs";
import { profile, site } from "@/content/profile";

/**
 * The portfolio as an object: a manga volume built from six CSS 3D faces.
 * No 3D library and no canvas, so it is real text, takes the theme colours,
 * and costs nothing to load. It turns as the footer scrolls into view and
 * leans toward the pointer. With motion off it rests in one pose.
 * Decoration only: everything printed on it exists as text elsewhere.
 */
export default function Volume() {
  const root = useRef<HTMLDivElement>(null);
  const motion = useMotion();

  useGSAP(
    () => {
      const el = root.current;
      if (!el || !motionOn()) return;
      const book = el.querySelector<HTMLElement>(".volume__book");
      const lean = el.querySelector<HTMLElement>(".volume__lean");
      if (!book || !lean) return;

      // The scroll turns the book from spine-on to its resting three-quarter view.
      gsap.fromTo(
        book,
        { rotationY: 118, rotationX: 2 },
        {
          rotationY: 30,
          rotationX: 9,
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top bottom",
            end: "center 62%",
            scrub: 0.6,
          },
        },
      );

      if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches)
        return;
      const ry = gsap.quickTo(lean, "rotationY", {
        duration: 0.7,
        ease: "power3",
      });
      const rx = gsap.quickTo(lean, "rotationX", {
        duration: 0.7,
        ease: "power3",
      });
      const move = (e: PointerEvent) => {
        const r = el.getBoundingClientRect();
        const dx = (e.clientX - (r.left + r.width / 2)) / window.innerWidth;
        const dy = (e.clientY - (r.top + r.height / 2)) / window.innerHeight;
        ry(gsap.utils.clamp(-1, 1, dx * 2) * 26);
        rx(gsap.utils.clamp(-1, 1, dy * 2) * -12);
      };
      window.addEventListener("pointermove", move, { passive: true });
      return () => window.removeEventListener("pointermove", move);
    },
    { scope: root, dependencies: [motion], revertOnUpdate: true },
  );

  return (
    <div className="volume" ref={root} aria-hidden="true">
      <div className="volume__lean">
        <div className="volume__book">
          <div className="volume__face volume__front">
            <p className="volume__top">
              <span className="volume__mark">AP</span>
              <span>Vol. {site.volume}</span>
            </p>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className="volume__art"
              src="/art/hero-800.webp"
              alt=""
              width={800}
              height={547}
              loading="lazy"
              decoding="async"
            />
            <p className="volume__name">
              <span>{profile.first}</span>
              <span>{profile.last}</span>
            </p>
            <p className="volume__role">{profile.role}</p>
          </div>
          <div className="volume__face volume__back">
            <span className="volume__kan" lang="ja">
              完
            </span>
            <span className="volume__backline">
              End of volume {site.volume}
            </span>
          </div>
          <div className="volume__face volume__spine">
            <span>
              {profile.name} <i>·</i> Vol. {site.volume}
            </span>
          </div>
          <div className="volume__face volume__fore" />
          <div className="volume__face volume__head" />
          <div className="volume__face volume__tail" />
        </div>
      </div>
    </div>
  );
}
