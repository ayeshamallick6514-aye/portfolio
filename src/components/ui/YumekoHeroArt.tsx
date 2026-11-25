"use client";

import { useEffect, useRef, useState } from "react";
import { motionOn } from "@/lib/prefs";

type FloatingCard = {
  id: number;
  suit: string;
  value: string;
  color: string;
  x: number; // percentage
  y: number; // percentage
  rot: number; // deg
  scale: number;
  speed: number;
  drift: number;
};

const CARDS_DATA: FloatingCard[] = [
  { id: 1, suit: "♠", value: "A", color: "#141414", x: 12, y: 18, rot: -24, scale: 0.95, speed: 6.2, drift: 8 },
  { id: 2, suit: "♥", value: "K", color: "#C81D25", x: 78, y: 12, rot: 18, scale: 1.1, speed: 5.4, drift: -10 },
  { id: 3, suit: "♦", value: "Q", color: "#C81D25", x: 86, y: 55, rot: 32, scale: 0.88, speed: 7.1, drift: 12 },
  { id: 4, suit: "♣", value: "J", color: "#141414", x: 6, y: 64, rot: -16, scale: 1.05, speed: 5.8, drift: -7 },
  { id: 5, suit: "♠", value: "10", color: "#141414", x: 42, y: 78, rot: 12, scale: 0.82, speed: 8.0, drift: 9 },
  { id: 6, suit: "JOKER", value: "★", color: "#C81D25", x: 22, y: 42, rot: -38, scale: 0.9, speed: 6.6, drift: -11 },
];

/**
 * Interactive Yumeko Jabami artwork:
 * - High-resolution hero artwork of Yumeko
 * - Floating, rotating playing cards (Aces, Kings, Jokers) that sway dynamically with physics
 * - Interactive pointer parallax & ecstatic crimson eye flares on hover
 */
export default function YumekoHeroArt() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [pointer, setPointer] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const onPointerMove = (e: PointerEvent) => {
      const rect = el.getBoundingClientRect();
      const px = (e.clientX - (rect.left + rect.width / 2)) / (rect.width / 2);
      const py = (e.clientY - (rect.top + rect.height / 2)) / (rect.height / 2);
      setPointer({ x: Math.max(-1, Math.min(1, px)), y: Math.max(-1, Math.min(1, py)) });
    };

    const onPointerLeave = () => {
      setPointer({ x: 0, y: 0 });
      setIsHovered(false);
    };

    const onPointerEnter = () => {
      setIsHovered(true);
    };

    el.addEventListener("pointermove", onPointerMove);
    el.addEventListener("pointerleave", onPointerLeave);
    el.addEventListener("pointerenter", onPointerEnter);

    return () => {
      el.removeEventListener("pointermove", onPointerMove);
      el.removeEventListener("pointerleave", onPointerLeave);
      el.removeEventListener("pointerenter", onPointerEnter);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`yumeko-art${isHovered ? " yumeko-art--ecstasy" : ""}`}
      style={
        {
          "--px": pointer.x,
          "--py": pointer.y,
        } as React.CSSProperties
      }
    >
      {/* Red Calligraphic Kanji Backdrop Banner (Kakegurui aura) */}
      <div className="yumeko-kanji" aria-hidden="true">
        <span>賭ケグルイ</span>
      </div>

      {/* Main Yumeko Character Image */}
      <picture className="yumeko-figure">
        <source
          type="image/avif"
          srcSet="/art/hero-800.avif 800w, /art/hero-1400.avif 1400w, /art/hero-2200.avif 2200w"
          sizes="(max-width: 899px) 100vw, 52vw"
        />
        <source
          type="image/webp"
          srcSet="/art/hero-800.webp 800w, /art/hero-1400.webp 1400w, /art/hero-2200.webp 2200w"
          sizes="(max-width: 899px) 100vw, 52vw"
        />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/art/hero-1400.webp"
          alt="Yumeko Jabami"
          width={2200}
          height={1505}
          className="yumeko-img"
          loading="eager"
          decoding="async"
        />
      </picture>

      {/* Ecstatic Crimson Eye Glow effect */}
      <div className="yumeko-eyes-flare" aria-hidden="true" />

      {/* Floating 3D Playing Cards */}
      <div className="yumeko-cards" aria-hidden="true">
        {CARDS_DATA.map((card) => (
          <div
            key={card.id}
            className={`card-item card-item--${card.id}`}
            style={
              {
                "--card-x": `${card.x}%`,
                "--card-y": `${card.y}%`,
                "--card-rot": `${card.rot}deg`,
                "--card-scale": card.scale,
                "--card-speed": `${card.speed}s`,
                "--card-drift": `${card.drift}px`,
                "--card-color": card.color,
              } as React.CSSProperties
            }
          >
            <div className="card-face">
              <div className="card-corner card-corner--tl">
                <span>{card.value}</span>
                <span className="card-suit">{card.suit}</span>
              </div>
              <div className="card-center">
                <span>{card.suit}</span>
              </div>
              <div className="card-corner card-corner--br">
                <span>{card.value}</span>
                <span className="card-suit">{card.suit}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Flying Casino Chips */}
      <div className="yumeko-chips" aria-hidden="true">
        <div className="chip-item chip-item--1" />
        <div className="chip-item chip-item--2" />
        <div className="chip-item chip-item--3" />
      </div>
    </div>
  );
}
