"use client";

import type { ReactNode } from "react";
import { useDemoModal } from "@/components/demo/DemoModalProvider";

// Drop-in replacement for the old "#book-a-demo" links: same classes and children,
// but opens the Request a demo modal.
export default function DemoTrigger({
  className = "",
  children,
  ariaLabel,
  onBeforeOpen,
  returnFocusTo,
}: {
  className?: string;
  children: ReactNode;
  ariaLabel?: string;
  onBeforeOpen?: () => void;
  returnFocusTo?: () => HTMLElement | null;
}) {
  const openDemo = useDemoModal();
  return (
    <button
      type="button"
      aria-haspopup="dialog"
      aria-label={ariaLabel}
      onClick={(event) => {
        const trigger = event.currentTarget;
        onBeforeOpen?.();
        openDemo(returnFocusTo ? returnFocusTo() : trigger);
      }}
      className={`cursor-pointer ${className}`}
    >
      {children}
    </button>
  );
}
