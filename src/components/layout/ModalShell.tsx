"use client";

import { useEffect, useRef, useState, type KeyboardEvent, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]):not([tabindex="-1"]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

// Shared overlay, panel, focus trap, Escape, scroll lock and enter animation for
// the site's modals (Login, Request a demo, the quote and newsletter pop-ups).
// variant "sheet": below 768px the panel is a bottom sheet (full width, rounded top corners, at
// most 85% of the screen tall and scrollable) that slides up; from 768px a centred dialog.
export default function ModalShell({
  open,
  onClose,
  labelledBy,
  initialFocus,
  returnFocusTo,
  panelClassName,
  closeTone = "ink",
  variant = "dialog",
  overlayOpacity = 0.6,
  children,
}: {
  open: boolean;
  onClose: () => void;
  labelledBy: string;
  initialFocus: () => HTMLElement | null;
  returnFocusTo: () => HTMLElement | null;
  panelClassName: string;
  closeTone?: "ink" | "white";
  variant?: "dialog" | "sheet";
  overlayOpacity?: number;
  children: ReactNode;
}) {
  const panelRef = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);
  // Read the latest callbacks without re-running the open/close effect.
  const focusRefs = useRef({ initialFocus, returnFocusTo });
  useEffect(() => {
    focusRefs.current = { initialFocus, returnFocusTo };
  });

  useEffect(() => {
    if (!open) return;
    const { body } = document;
    const previousOverflow = body.style.overflow;
    body.style.overflow = "hidden";
    const frame = requestAnimationFrame(() => {
      setShown(true);
      focusRefs.current.initialFocus()?.focus();
    });
    return () => {
      cancelAnimationFrame(frame);
      body.style.overflow = previousOverflow;
      setShown(false);
      focusRefs.current.returnFocusTo()?.focus();
    };
  }, [open]);

  if (!open) return null;

  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key === "Escape") {
      event.stopPropagation();
      onClose();
      return;
    }
    if (event.key !== "Tab" || !panelRef.current) return;
    const focusable = [...panelRef.current.querySelectorAll<HTMLElement>(FOCUSABLE)].filter(
      (el) => el.offsetParent !== null
    );
    if (focusable.length === 0) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    const active = document.activeElement;
    if (event.shiftKey && (active === first || !panelRef.current.contains(active))) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && (active === last || !panelRef.current.contains(active))) {
      event.preventDefault();
      first.focus();
    }
  }

  return createPortal(
    <div
      className={`fixed inset-0 z-50 flex justify-center overflow-y-auto transition-opacity duration-150 motion-reduce:transition-none ${
        variant === "sheet" ? "items-end md:items-center md:px-4 md:py-6" : "items-center px-4 py-6"
      } ${shown ? "opacity-100" : "opacity-0"}`}
      onKeyDown={handleKeyDown}
    >
      <div
        className="fixed inset-0 backdrop-blur-[4px]"
        style={{ backgroundColor: `rgba(22,33,61,${overlayOpacity})` }}
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={labelledBy}
        className={`relative w-full shadow-[0_20px_60px_rgba(22,33,61,0.25)] transition-[transform,background-color] motion-reduce:transition-none ${
          variant === "sheet"
            ? `mt-auto max-h-[85vh] overflow-y-auto rounded-t-2xl duration-300 ease-out md:my-auto md:max-h-none md:overflow-visible md:rounded-2xl md:duration-150 ${
                shown ? "translate-y-0 md:scale-100" : "translate-y-full md:translate-y-0 md:scale-95"
              }`
            : `my-auto rounded-2xl duration-150 ${shown ? "scale-100" : "scale-95"}`
        } ${panelClassName}`}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className={`absolute right-4 top-4 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 ${
            closeTone === "white"
              ? "text-white hover:bg-white/10 focus-visible:ring-white"
              : "text-ink hover:bg-ink/5 focus-visible:ring-ink"
          }`}
        >
          <X className="h-5 w-5" strokeWidth={1.5} aria-hidden="true" />
        </button>
        {children}
      </div>
    </div>,
    document.body
  );
}
