import type { Metadata, Viewport } from "next";
import { Poppins } from "next/font/google";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import DemoModalProvider from "@/components/demo/DemoModalProvider";
import BookDemoSection from "@/components/shared/BookDemoSection";
import HideOnRoutes from "@/components/shared/HideOnRoutes";
import NewsletterPopup from "@/components/shared/NewsletterPopup";
import Script from "next/script";
import CookieBanner from "@/components/analytics/CookieBanner";
import GoogleAnalytics from "@/components/analytics/GoogleAnalytics";
import { ANALYTICS_ENABLED, CONSENT_DEFAULT_SCRIPT } from "@/lib/analytics";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "8billionideas",
  description: "8billionideas website",
  robots: { index: false, follow: false },
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
          {/* /resources and /contact have their own closing sections instead. */}
          <HideOnRoutes routes={["/resources", "/contact"]}>
            <BookDemoSection />
          </HideOnRoutes>
          <Footer />
          {/* Site-wide newsletter sign-up pop-up (timing and rules in the component). */}
          <NewsletterPopup />
        </DemoModalProvider>
      </body>
    </html>
  );
}
