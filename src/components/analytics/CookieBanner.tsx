"use client";

import { useEffect, useRef } from "react";
import Button from "@/components/ui/Button";
import { chooseConsent, initConsent, useConsent } from "@/lib/consent";

const PRIVACY_POLICY_URL = "https://8billionideas.notion.site/Privacy-Policy-0d819775ea1d4a0a8bdf36d8bdaedd05";

// Cookie consent bar, on every page until the visitor accepts or rejects analytics cookies (asked
// again after 12 months; the footer's "Cookie settings" reopens it). Fixed to the bottom: full
// width on mobile; from md a centred white card up to 760px wide, 16px from the edges. Above page
// content and the nav (z-40), below pop-ups (z-50). It's a labelled region, not a dialog, so it
// doesn't trap focus; it's rendered first in <body> so keyboard users reach it before the nav.
export default function CookieBanner() {
  const { ready, bannerOpen } = useConsent();
  const regionRef = useRef<HTMLDivElement>(null);
  const wasReady = useRef(false);

  useEffect(() => {
    initConsent();
  }, []);

  // Reopened from "Cookie settings": move focus to it (not on first arrival, to avoid stealing focus).
  useEffect(() => {
    if (!ready) return;
    if (wasReady.current && bannerOpen) regionRef.current?.querySelector("button")?.focus();
    wasReady.current = true;
  }, [ready, bannerOpen]);

  if (!ready || !bannerOpen) return null;

  return (
    <div
      ref={regionRef}
      role="region"
      aria-label="Cookie consent"
      className="fixed inset-x-0 bottom-0 z-[45] md:bottom-4 md:left-1/2 md:right-auto md:w-[calc(100%-32px)] md:max-w-[760px] md:-translate-x-1/2"
    >
      <div className="flex flex-col gap-4 bg-white px-5 pt-4 pb-[max(1rem,env(safe-area-inset-bottom))] shadow-[0_-4px_24px_rgba(22,33,61,0.12)] md:flex-row md:items-center md:gap-6 md:rounded-xl md:px-6 md:pb-4">
        <p className="text-[14px] leading-[1.55] text-ink">
          We use cookies to understand how our website is used and to improve it. You can accept or reject
          analytics cookies.{" "}
          <a
            href={PRIVACY_POLICY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="whitespace-nowrap font-medium underline underline-offset-2 hover:text-ink/70 focus-visible:rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            Privacy Policy
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
        </p>
        <div className="flex shrink-0 gap-3">
          <Button size="small" className="flex-1 md:flex-none" onClick={() => chooseConsent("granted")}>
            Accept
          </Button>
          <Button size="small" variant="outline" className="flex-1 md:flex-none" onClick={() => chooseConsent("denied")}>
            Reject
          </Button>
        </div>
      </div>
    </div>
  );
}
