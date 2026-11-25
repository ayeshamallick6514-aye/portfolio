"use client";

import { useEffect, useRef, useState } from "react";

type FloatingCard = {
  id: number;
  suit: string;
  value: string;
  color: string;
  x: number; // percentage
  y: number; // percentage
  rotZ: number; // base rotation deg
  scale: number;
  speed: number;
  spinSpeed: number;
  drift: number;
};

const CARDS_DATA: FloatingCard[] = [
  { id: 1, suit: "♠", value: "A", color: "#141414", x: 8, y: 15, rotZ: -28, scale: 1.05, speed: 6.2, spinSpeed: 7.5, drift: 10 },
  { id: 2, suit: "♥", value: "K", color: "#C81D25", x: 82, y: 10, rotZ: 22, scale: 1.15, speed: 5.4, spinSpeed: 6.8, drift: -12 },
  { id: 3, suit: "♦", value: "Q", color: "#C81D25", x: 88, y: 58, rotZ: 35, scale: 0.95, speed: 7.1, spinSpeed: 8.2, drift: 14 },
  { id: 4, suit: "♣", value: "J", color: "#141414", x: 5, y: 62, rotZ: -18, scale: 1.1, speed: 5.8, spinSpeed: 6.4, drift: -9 },
  { id: 5, suit: "♠", value: "10", color: "#141414", x: 38, y: 82, rotZ: 14, scale: 0.9, speed: 8.0, spinSpeed: 9.0, drift: 11 },
  { id: 6, suit: "JOKER", value: "★", color: "#C81D25", x: 18, y: 38, rotZ: -42, scale: 1.0, speed: 6.6, spinSpeed: 7.2, drift: -13 },
];

/**
 * Interactive Yumeko Hero Section:
 * - Proper aspect ratio & framing showing Yumeko from waist to head holding cards
 * - 3D tumbling & spinning playing cards rotating in motion
 * - Pointer-driven 3D depth and parallax
 * - Hypnotic crimson eye glow flare on hover
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
      {/* Red Calligraphic Kanji Banner */}
      <div className="yumeko-kanji" aria-hidden="true">
        <span>賭ケグルイ</span>
      </div>

      {/* Main Yumeko Character Image with proper wide framing */}
      <div className="yumeko-frame">
        <picture className="yumeko-figure">
          <source
            type="image/avif"
            srcSet="/art/hero-800.avif 800w, /art/hero-1400.avif 1400w, /art/hero-2200.avif 2200w"
            sizes="(max-width: 899px) 100vw, 55vw"
          />
          <source
            type="image/webp"
            srcSet="/art/hero-800.webp 800w, /art/hero-1400.webp 1400w, /art/hero-2200.webp 2200w"
            sizes="(max-width: 899px) 100vw, 55vw"
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

        {/* Ecstatic Crimson Eye Glow Flare */}
        <div className="yumeko-eyes-flare" aria-hidden="true" />
      </div>

      {/* 3D Tumbling & Rotating Playing Cards */}
      <div className="yumeko-cards" aria-hidden="true">
        {CARDS_DATA.map((card) => (
          <div
            key={card.id}
            className={`card-wrapper card-wrapper--${card.id}`}
            style={
              {
                "--card-x": `${card.x}%`,
                "--card-y": `${card.y}%`,
                "--card-rot-z": `${card.rotZ}deg`,
                "--card-scale": card.scale,
                "--card-speed": `${card.speed}s`,
                "--card-spin-speed": `${card.spinSpeed}s`,
                "--card-drift": `${card.drift}px`,
                "--card-color": card.color,
              } as React.CSSProperties
            }
          >
            <div className="card-flipper">
              <div className="card-face card-face--front">
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
              <div className="card-face card-face--back">
                <div className="card-back-pattern">
                  <span>♠</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Flying Casino Poker Chips */}
      <div className="yumeko-chips" aria-hidden="true">
        <div className="chip-item chip-item--1" />
        <div className="chip-item chip-item--2" />
        <div className="chip-item chip-item--3" />
      </div>
    </div>
  );
}
