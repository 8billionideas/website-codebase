"use client";

import type { ReactNode } from "react";
import { useDemoModal } from "@/components/demo/DemoModalProvider";
import Button from "@/components/ui/Button";

// Opens the Request a demo modal. appearance="button" renders the shared green
// CTA Button; "plain" (default) is an unstyled button for inline links and other
// non-button triggers, which bring their own classes.
export default function DemoTrigger({
  className = "",
  children,
  ariaLabel,
  onBeforeOpen,
  returnFocusTo,
  appearance = "plain",
  arrow = true,
}: {
  className?: string;
  children: ReactNode;
  ariaLabel?: string;
  onBeforeOpen?: () => void;
  returnFocusTo?: () => HTMLElement | null;
  appearance?: "plain" | "button";
  // Only used with appearance="button".
  arrow?: boolean;
}) {
  const openDemo = useDemoModal();
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const trigger = event.currentTarget;
    onBeforeOpen?.();
    openDemo(returnFocusTo ? returnFocusTo() : trigger);
  };

  if (appearance === "button") {
    return (
      <Button aria-haspopup="dialog" aria-label={ariaLabel} onClick={handleClick} arrow={arrow} className={className}>
        {children}
      </Button>
    );
  }

  return (
    <button
      type="button"
      aria-haspopup="dialog"
      aria-label={ariaLabel}
      onClick={handleClick}
      className={`cursor-pointer ${className}`}
    >
      {children}
    </button>
  );
}
