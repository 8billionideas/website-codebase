"use client";

import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import DemoRequestModal from "@/components/demo/DemoRequestModal";

type OpenDemo = (returnFocusTo?: HTMLElement | null) => void;

const DemoModalContext = createContext<OpenDemo | null>(null);

export function useDemoModal(): OpenDemo {
  const open = useContext(DemoModalContext);
  if (!open) throw new Error("useDemoModal must be used inside <DemoModalProvider>");
  return open;
}

export default function DemoModalProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  // A new key per opening gives a fresh, empty form each time.
  const [session, setSession] = useState(0);
  const returnFocusRef = useRef<HTMLElement | null>(null);
  const pathname = usePathname();

  const openDemo = useCallback<OpenDemo>((returnFocusTo) => {
    returnFocusRef.current = returnFocusTo ?? (document.activeElement as HTMLElement | null);
    setSession((n) => n + 1);
    setOpen(true);
  }, []);

  // ?demo=1 opens the modal (links from emails and ads), then the parameter is removed.
  useEffect(() => {
    const url = new URL(window.location.href);
    if (url.searchParams.get("demo") !== "1") return;
    url.searchParams.delete("demo");
    window.history.replaceState(window.history.state, "", url.pathname + url.search + url.hash);
    // Deferred, and deliberately not cancelled: the parameter is already gone, so a
    // re-run of this effect can't open it twice.
    setTimeout(() => openDemo(null), 0);
  }, [pathname, openDemo]);

  return (
    <DemoModalContext.Provider value={openDemo}>
      {children}
      <DemoRequestModal
        key={session}
        open={open}
        onClose={() => setOpen(false)}
        returnFocusTo={() => returnFocusRef.current}
      />
    </DemoModalContext.Provider>
  );
}
