"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { CustomEase } from "gsap/CustomEase";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, SplitText, CustomEase, useGSAP);
  // "slam": fast arrival, long settle. Used for type and panels.
  CustomEase.create("slam", "0.16, 1, 0.3, 1");
  // "cut": hard in, hard out. Used for wipes.
  CustomEase.create("cut", "0.76, 0, 0.24, 1");
}

// Timing counted in frames at 24 fps, so everything shares one rhythm.
export const F = (frames: number) => frames / 24;

export { gsap, ScrollTrigger, SplitText, useGSAP };
