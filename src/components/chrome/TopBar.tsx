"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { chapters, profile } from "@/content/profile";
import {
  currentTheme,
  getLenis,
  setMotion,
  setTheme,
  themes,
  useMotion,
  useTheme,
} from "@/lib/prefs";
import { ChapterLink } from "./TLink";

const primary = chapters.filter((c) =>
  ["work", "stack", "story", "contact"].includes(c.id),
);

function ThemeDots({ idPrefix }: { idPrefix: string }) {
  const theme = useTheme();
  return (
    <div className="theme-dots" role="group" aria-label="Colour theme">
      {themes.map((t) => (
        <button
          key={t.id}
          id={`${idPrefix}-${t.id}`}
          type="button"
          className="theme-dot"
          style={{ ["--dot" as string]: t.swatch }}
          aria-pressed={theme === t.id}
          aria-label={`${t.label} theme`}
          title={t.label}
          onClick={() => setTheme(t.id)}
        />
      ))}
    </div>
  );
}

function MotionToggle() {
  const motion = useMotion();
  return (
    <button
      type="button"
      className="motion-toggle"
      aria-pressed={motion}
      onClick={() => setMotion(!motion)}
      title={motion ? "Turn animation off" : "Turn animation on"}
    >
      <span className="motion-toggle__dot" aria-hidden="true" />
      Motion {motion ? "on" : "off"}
    </button>
  );
}

export default function TopBar() {
  const [stuck, setStuck] = useState(false);
  const [open, setOpen] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);

  // In development, Strict Mode remounts can reset attributes set by the boot
  // script. Re-apply the stored theme; a no-op in production.
  useLayoutEffect(() => {
    try {
      const stored = localStorage.getItem("dk-theme");
      if (stored && stored !== currentTheme())
        document.documentElement.dataset.theme = stored;
    } catch {}
  }, []);

  useEffect(() => {
    const onScroll = () => setStuck(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const d = dialog.current;
    if (!d) return;
    if (open && !d.open) {
      d.showModal();
      getLenis()?.stop();
    } else if (!open && d.open) {
      d.close();
      getLenis()?.start();
    }
  }, [open]);

  const close = () => setOpen(false);

  return (
    <>
      <header className={`topbar${stuck ? " is-stuck" : ""}`}>
        <ChapterLink to="opening" className="brand">
          <span className="brand__mark" aria-hidden="true">
            AP
          </span>
          <span className="brand__handle">{profile.handle}</span>
          <span className="sr-only">, {profile.name}: back to the top</span>
        </ChapterLink>

        <nav className="topbar__nav" aria-label="Primary">
          {primary.map((c) => (
            <ChapterLink key={c.id} to={c.id} className="navlink">
              <span className="navlink__no" aria-hidden="true">
                {c.no}
              </span>
              {c.nav}
            </ChapterLink>
          ))}
        </nav>

        <div className="topbar__tools">
          <ThemeDots idPrefix="bar" />
          <MotionToggle />
        </div>

        <button
          type="button"
          className="menu-btn"
          aria-haspopup="dialog"
          aria-expanded={open}
          onClick={() => setOpen(true)}
        >
          <span className="menu-btn__bars" aria-hidden="true" />
          Menu
        </button>
      </header>

      <dialog
        ref={dialog}
        className="menu"
        aria-label="Chapters"
        onClose={close}
        onClick={(e) => {
          if (e.target === dialog.current) close();
        }}
      >
        <div className="menu__inner">
          <div className="menu__top">
            <span className="label">Volume 01 — Contents</span>
            <button type="button" className="menu__close" onClick={close}>
              Close
            </button>
          </div>
          <ol className="menu__list">
            {chapters.map((c) => (
              <li key={c.id}>
                <ChapterLink to={c.id} className="menu__link" onClick={close}>
                  <span className="menu__no">{c.no}</span>
                  <span className="menu__label">{c.label}</span>
                  <span className="menu__jp" aria-hidden="true" lang="ja">
                    {c.jp}
                  </span>
                </ChapterLink>
              </li>
            ))}
          </ol>
          <div className="menu__foot">
            <ThemeDots idPrefix="menu" />
            <MotionToggle />
          </div>
        </div>
      </dialog>
    </>
  );
}
