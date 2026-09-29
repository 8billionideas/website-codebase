"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

// Cross-fades between renders keyed by `fadeKey`, so switching a selection
// doesn't cause a hard content swap. Skips the fade on first mount so the
// panel doesn't flash in on initial load. Respects prefers-reduced-motion.
export function CrossFade({ fadeKey, children }: { fadeKey: string; children: ReactNode }) {
  const [visible, setVisible] = useState(true);
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    setVisible(false);
    const frame = requestAnimationFrame(() => setVisible(true));
    return () => cancelAnimationFrame(frame);
  }, [fadeKey]);

  return (
    <div
      className={`transition-opacity duration-200 motion-reduce:transition-none ${
        visible ? "opacity-100" : "opacity-0"
      }`}
    >
      {children}
    </div>
  );
}
