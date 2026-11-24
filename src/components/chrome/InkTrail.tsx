"use client";

import { useEffect, useRef } from "react";
import { motionOn, subscribeTheme, tokenRgb, useMotion } from "@/lib/prefs";

type P = { x: number; y: number; t: number };

/**
 * A dry-brush trail behind the cursor. Decorative only: the real cursor stays,
 * and the canvas runs only while the pointer is moving.
 */
export default function InkTrail() {
  const ref = useRef<HTMLCanvasElement>(null);
  const motion = useMotion();

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas || !motionOn()) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches)
      return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const LIFE = 420;
    let pts: P[] = [];
    let raf = 0;
    let dpr = 1;
    let ink = tokenRgb("--ink");

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(window.innerWidth * dpr);
      canvas.height = Math.floor(window.innerHeight * dpr);
    };
    resize();

    const draw = () => {
      const now = performance.now();
      pts = pts.filter((p) => now - p.t < LIFE);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      ctx.lineCap = "round";
      for (let i = 1; i < pts.length; i++) {
        const a = pts[i - 1];
        const b = pts[i];
        const age = (now - b.t) / LIFE;
        const speed = Math.min(Math.hypot(b.x - a.x, b.y - a.y), 60);
        // Faster strokes are thinner, like a brush running dry.
        const w = (1 - age) * (9 - speed * 0.11);
        if (w <= 0.2) continue;
        ctx.strokeStyle = `rgba(${ink[0] * 255}, ${ink[1] * 255}, ${ink[2] * 255}, ${0.5 * (1 - age)})`;
        ctx.lineWidth = w;
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.stroke();
      }
      raf = pts.length > 1 ? requestAnimationFrame(draw) : 0;
      if (!raf) ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    };

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      pts.push({ x: e.clientX, y: e.clientY, t: performance.now() });
      if (pts.length > 60) pts.shift();
      if (!raf) raf = requestAnimationFrame(draw);
    };

    const unsubTheme = subscribeTheme(() => {
      ink = tokenRgb("--ink");
    });
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("resize", resize);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("resize", resize);
      unsubTheme();
      cancelAnimationFrame(raf);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    };
  }, [motion]);

  return <canvas ref={ref} className="ink-trail" aria-hidden="true" />;
}
