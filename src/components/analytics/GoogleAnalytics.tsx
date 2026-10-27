"use client";

import Script from "next/script";
import { GA_MEASUREMENT_ID, analyticsAllowedHere } from "@/lib/analytics";
import { useConsent } from "@/lib/consent";

// Loads gtag.js only once analytics consent has been granted (a stored choice, or Accept on the
// cookie banner, including later via "Cookie settings"), and only on the production site. Before
// that, nothing is requested from Google. The consent defaults are set earlier, inline in the root
// layout (CONSENT_DEFAULT_SCRIPT).
// Page views: gtag('config') sends the first one; client-side route changes are counted by GA4's
// enhanced measurement ("Page changes based on browser history events", on by default), so no
// page_view is sent by hand (that would double-count).
export default function GoogleAnalytics() {
  const { gaAllowed } = useConsent();
  if (!gaAllowed || !analyticsAllowedHere()) return null;
  return (
    <>
      <Script
        id="ga-gtag"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
      <Script id="ga-config" strategy="afterInteractive">
        {`gtag('js', new Date()); gtag('config', '${GA_MEASUREMENT_ID}');`}
      </Script>
    </>
  );
}
