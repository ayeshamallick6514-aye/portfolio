"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import type { ComponentProps, MouseEvent } from "react";
import { navigateWithInk, scrollToId } from "@/lib/prefs";

type Props = Omit<ComponentProps<typeof Link>, "href"> & { href: string };

const isPlainClick = (e: MouseEvent) =>
  e.button === 0 && !e.metaKey && !e.ctrlKey && !e.shiftKey && !e.altKey;

/** Internal link that navigates behind the ink-wipe page transition. */
export default function TLink({ href, onClick, children, ...rest }: Props) {
  const router = useRouter();
  return (
    <Link
      href={href}
      {...rest}
      onClick={(e) => {
        onClick?.(e);
        if (e.defaultPrevented || !isPlainClick(e)) return;
        e.preventDefault();
        navigateWithInk(() => router.push(href));
      }}
    >
      {children}
    </Link>
  );
}

type AnchorProps = Omit<ComponentProps<"a">, "href"> & { to: string };

/**
 * Link to a chapter on the home page. On the home page it scrolls; from a
 * case study it navigates home first.
 */
export function ChapterLink({ to, onClick, children, ...rest }: AnchorProps) {
  const router = useRouter();
  return (
    <a
      href={`/#${to}`}
      {...rest}
      onClick={(e) => {
        onClick?.(e);
        if (e.defaultPrevented || !isPlainClick(e)) return;
        e.preventDefault();
        if (window.location.pathname === "/") scrollToId(to);
        else navigateWithInk(() => router.push(`/#${to}`));
      }}
    >
      {children}
    </a>
  );
}
