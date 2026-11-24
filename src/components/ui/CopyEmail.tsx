"use client";

import { useState } from "react";

export default function CopyEmail({ email }: { email: string }) {
  const [state, setState] = useState<"idle" | "copied" | "failed">("idle");

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setState("copied");
    } catch {
      setState("failed");
    }
    window.setTimeout(() => setState("idle"), 2200);
  };

  return (
    <button type="button" className="btn btn--ghost copy" onClick={copy}>
      <span aria-live="polite">
        {state === "idle"
          ? "Copy email"
          : state === "copied"
            ? "Copied"
            : "Press Ctrl+C to copy"}
      </span>
    </button>
  );
}
