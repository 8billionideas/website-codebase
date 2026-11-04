import type { Metadata, Viewport } from "next";
import { Poppins } from "next/font/google";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import DemoModalProvider from "@/components/demo/DemoModalProvider";
import BookDemoSection from "@/components/shared/BookDemoSection";
import HideOnRoutes from "@/components/shared/HideOnRoutes";
import Script from "next/script";
import CookieBanner from "@/components/analytics/CookieBanner";
import GoogleAnalytics from "@/components/analytics/GoogleAnalytics";
import { ANALYTICS_ENABLED, CONSENT_DEFAULT_SCRIPT } from "@/lib/analytics";
import { SITE_URL } from "@/lib/site-config";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

// Indexable by default; /minerva, /money-masters and /gec-academy set their own noindex. Each page
// sets its canonical path (relative to metadataBase).
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "8billionideas",
  description: "8billionideas website",
};

// Locks the site to its designed light theme. "only light" also stops browsers
// (e.g. Chrome on Android, Samsung Internet) from auto-darkening the page.
export const viewport: Viewport = {
  colorScheme: "only light",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${poppins.variable} h-full scroll-smooth antialiased`}>
      <body className="min-h-full flex flex-col font-sans">
        {/* Google Consent Mode v2 defaults (all denied), set before anything else runs. GA itself
            loads only after consent (GoogleAnalytics). Production builds only. */}
        {ANALYTICS_ENABLED && (
          <Script id="ga-consent-default" strategy="beforeInteractive">
            {CONSENT_DEFAULT_SCRIPT}
          </Script>
        )}
        {/* First in the page, so keyboard users reach it before the nav. */}
        <CookieBanner />
        <GoogleAnalytics />
        <DemoModalProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          {/* /resources and /contact have their own closing sections instead; /money-masters, /minerva,
              /roar, /cv-workshop and /gec-academy end with the footer. */}
          <HideOnRoutes routes={["/resources", "/contact", "/money-masters", "/minerva", "/roar", "/cv-workshop", "/gec-academy"]}>
            <BookDemoSection />
          </HideOnRoutes>
          <Footer />
        </DemoModalProvider>
      </body>
    </html>
  );
}
