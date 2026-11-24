"use client";

import { useSyncExternalStore } from "react";
import type Lenis from "lenis";

/* ---------- Motion preference ---------- */

type Listener = () => void;
const motionListeners = new Set<Listener>();

export const motionOn = () =>
  typeof document === "undefined" ||
  document.documentElement.dataset.motion !== "off";

export function setMotion(on: boolean) {
  document.documentElement.dataset.motion = on ? "on" : "off";
  try {
    localStorage.setItem("dk-motion", on ? "on" : "off");
  } catch {}
  motionListeners.forEach((l) => l());
}

const subscribeMotion = (l: Listener) => {
  motionListeners.add(l);
  return () => {
    motionListeners.delete(l);
  };
};

/** True when animation is allowed. Re-renders when the visitor toggles it. */
export function useMotion() {
  return useSyncExternalStore(subscribeMotion, motionOn, () => true);
}

/* ---------- Theme ---------- */

export const themes = [
  { id: "blood", label: "Blood", swatch: "#B4101C" },
  { id: "aged", label: "Aged", swatch: "#932517" },
  { id: "indigo", label: "Indigo", swatch: "#1F3FAE" },
  { id: "moss", label: "Moss", swatch: "#33603B" },
] as const;

export type ThemeId = (typeof themes)[number]["id"];

const themeListeners = new Set<Listener>();

export const currentTheme = (): ThemeId =>
  typeof document === "undefined"
    ? "blood"
    : ((document.documentElement.dataset.theme as ThemeId) ?? "blood");

export function setTheme(id: ThemeId) {
  const root = document.documentElement;
  root.classList.add("theme-shift");
  root.dataset.theme = id;
  try {
    localStorage.setItem("dk-theme", id);
  } catch {}
  themeListeners.forEach((l) => l());
  window.setTimeout(() => root.classList.remove("theme-shift"), 500);
}

export const subscribeTheme = (l: Listener) => {
  themeListeners.add(l);
  return () => {
    themeListeners.delete(l);
  };
};

export function useTheme() {
  return useSyncExternalStore(
    subscribeTheme,
    currentTheme,
    () => "blood" as ThemeId,
  );
}

/** Reads a CSS colour token (#rrggbb) from the root as 0..1 RGB. */
export function tokenRgb(name: string): [number, number, number] {
  const raw = getComputedStyle(document.documentElement)
    .getPropertyValue(name)
    .trim();
  const hex = raw.startsWith("#") ? raw.slice(1) : "0a0a0a";
  const n = parseInt(hex.length === 3 ? hex.replace(/(.)/g, "$1$1") : hex, 16);
  return [((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255];
}

/* ---------- Smooth scroll handle ---------- */

let lenis: Lenis | null = null;
export const setLenis = (l: Lenis | null) => {
  lenis = l;
};
export const getLenis = () => lenis;

export function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  if (lenis) {
    lenis.scrollTo(el, { duration: 1.1 });
  } else {
    el.scrollIntoView({
      behavior: motionOn() ? "smooth" : "auto",
      block: "start",
    });
  }
  history.replaceState(null, "", `#${id}`);
}

/* ---------- Page transition bridge ---------- */

type TransitionHandler = (go: () => void) => void;
let transitionHandler: TransitionHandler | null = null;

export const setTransitionHandler = (h: TransitionHandler | null) => {
  transitionHandler = h;
};

/** Runs `go` behind the ink wipe when motion is allowed, otherwise at once. */
export function navigateWithInk(go: () => void) {
  if (transitionHandler && motionOn()) transitionHandler(go);
  else go();
}
