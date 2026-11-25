"use client";

import { useRef } from "react";
import Art, { hasArt } from "@/components/ui/Art";
import { gsap, useGSAP } from "@/lib/gsap";
import { motionOn } from "@/lib/prefs";

/**
 * The cut-in: a letterboxed close-up of Yumeko's intense crimson glowing eyes.
 * Tied to the scroll: As you scroll through the section, her eyelids blink shut
 * and snap open into an intense glowing stare!
 */
export default function Statement() {
  const containerRef = useRef<HTMLElement>(null);
  const cutRef = useRef<HTMLDivElement>(null);
  const lidTopRef = useRef<HTMLDivElement>(null);
  const lidBottomRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!motionOn()) return;
      const section = containerRef.current;
      const lidTop = lidTopRef.current;
      const lidBottom = lidBottomRef.current;
      const cut = cutRef.current;
      if (!section || !lidTop || !lidBottom) return;

      // Eye blink timeline tied to scroll position
      // As the user scrolls into view, the eyes blink (eyelids close down and open back up)
      // finishing in full ecstatic wide stare!
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          end: "bottom 30%",
          scrub: 0.5,
        },
      });

      tl.to([lidTop, lidBottom], {
        scaleY: 0.95,
        duration: 0.15,
        ease: "power2.in",
      })
        .to([lidTop, lidBottom], {
          scaleY: 0,
          duration: 0.15,
          ease: "power3.out",
        })
        // Second quick, sharp anime blink halfway through
        .to(
          [lidTop, lidBottom],
          {
            scaleY: 0.98,
            duration: 0.12,
            ease: "power1.in",
          },
          "+=0.2",
        )
        .to([lidTop, lidBottom], {
          scaleY: 0,
          duration: 0.18,
          ease: "elastic.out(1, 0.4)",
        })
        .to(
          cut,
          {
            boxShadow: "0 0 45px rgba(229, 9, 20, 0.7)",
            duration: 0.25,
            ease: "power2.out",
          },
          "-=0.1",
        );
    },
    { scope: containerRef },
  );

  return (
    <section
      ref={containerRef}
      className="statement on-ink"
      aria-label="Full stack. No bluff. Real ship."
    >
      {hasArt("eyes") ? (
        <div className="statement__cut" ref={cutRef} data-reveal="slit">
          <Art
            name="eyes"
            className="statement__art"
            zoom={1.04}
            sizes="100vw"
          />

          {/* Anime Eyelids for realistic blink simulation */}
          <div
            ref={lidTopRef}
            className="yumeko-eyelid yumeko-eyelid--top"
            aria-hidden="true"
          />
          <div
            ref={lidBottomRef}
            className="yumeko-eyelid yumeko-eyelid--bottom"
            aria-hidden="true"
          />
        </div>
      ) : null}
      <p
        className="statement__text display"
        aria-hidden="true"
        data-scrub-x="-52"
        data-inkfill
      >
        <span>Full stack</span>
        <i>♠</i>
        <span className="outline-text">No bluff</span>
        <i>♥</i>
        <span>Real ship</span>
        <i>♦</i>
        <span className="outline-text statement__last">
          High stakes &gt; safe plays ♣
        </span>
      </p>
    </section>
  );
}
