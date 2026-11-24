"use client";

import { useRef } from "react";
import { gsap, F, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { motionOn, useMotion } from "@/lib/prefs";

/**
 * Opening choreography. The name itself is always on screen from first paint
 * (see Loader). After the loader, the title takes one impact beat, the brush
 * stroke wipes across, the figure drops onto the last letter and the
 * supporting text settles. On later visits only the supporting text moves.
 */
export default function HeroIntro() {
  const anchor = useRef<HTMLSpanElement>(null);
  const motion = useMotion();

  useGSAP(
    (_context, contextSafe) => {
      const hero = anchor.current?.closest<HTMLElement>(".hero");
      if (!hero || !contextSafe || !motionOn()) return;
      const q = gsap.utils.selector(hero);
      const fades = q("[data-intro='fade']");
      const slash = q("[data-intro='slash']");
      const figure = q("[data-intro='art']");
      const title = q(".hero__title > .hero__name");

      const full = contextSafe(() => {
        gsap
          .timeline({ defaults: { ease: "slam" } })
          .set([fades, figure, slash], { autoAlpha: 1 })
          // Impact: three stepped frames, like a held anime cut.
          .fromTo(
            title,
            { scale: 1.045, transformOrigin: "0% 100%" },
            { scale: 1, duration: F(4), ease: "steps(3)" },
            0,
          )
          .fromTo(
            slash,
            { clipPath: "inset(-40% 100% -40% 0)" },
            { clipPath: "inset(-40% 0% -40% 0)", duration: F(10), ease: "cut" },
            F(1),
          )
          .fromTo(
            figure,
            { clipPath: "inset(0% 0% 0% 100%)" },
            {
              clipPath: "inset(0% 0% 0% 0%)",
              duration: F(14),
              ease: "cut",
              clearProps: "clipPath",
            },
            F(6),
          )
          .from(
            fades,
            { y: 26, autoAlpha: 0, duration: F(16), stagger: F(2.5) },
            F(5),
          );
      });

      const quick = () => {
        gsap.from(fades, {
          y: 16,
          autoAlpha: 0,
          duration: F(12),
          stagger: F(1.5),
          ease: "slam",
          clearProps: "all",
        });
      };

      // Leaving the hero: three depths, three speeds.
      const leave = {
        trigger: hero,
        start: "top top",
        end: "bottom top",
        scrub: true,
      };
      gsap.to(q(".hero__slash"), {
        yPercent: 34,
        rotate: -3,
        ease: "none",
        scrollTrigger: leave,
      });
      gsap.to(q(".hero__art"), {
        scale: 1.1,
        yPercent: 4,
        transformOrigin: "70% 100%",
        ease: "none",
        scrollTrigger: leave,
      });
      gsap.to(q(".hero__canvas"), {
        yPercent: 18,
        ease: "none",
        scrollTrigger: leave,
      });
      // On desktop the hero holds still while the next chapter slides over it.
      if (
        window.matchMedia(
          "(min-width: 900px) and (hover: hover) and (pointer: fine)",
        ).matches &&
        hero.offsetHeight <= window.innerHeight + 4
      ) {
        ScrollTrigger.create({
          trigger: hero,
          start: "top top",
          end: "bottom top",
          pin: true,
          pinSpacing: false,
        });
        gsap.to(q(".hero__foot"), {
          autoAlpha: 0,
          y: -40,
          ease: "none",
          scrollTrigger: {
            trigger: hero,
            start: "top top",
            end: "45% top",
            scrub: true,
          },
        });
      }
      // Transforms go on the heading itself, not on its wrappers: a transform
      // on the wrapper would lift the brush stroke above the artwork.
      gsap.to(q(".hero__title > .hero__name, .hero__top"), {
        yPercent: -5,
        ease: "none",
        scrollTrigger: leave,
      });

      if (document.documentElement.hasAttribute("data-loading")) {
        const onIntro = () => full();
        window.addEventListener("dk:intro", onIntro, { once: true });
        return () => window.removeEventListener("dk:intro", onIntro);
      }
      quick();
    },
    { dependencies: [motion] },
  );

  return <span ref={anchor} hidden />;
}
