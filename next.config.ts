import type { NextConfig } from "next";

// The previous www.8billionideas.com site (its sitemap, November 2026), each old path sent to the
// closest page here; no sensible match goes to the homepage. /, /about and /resources exist on both
// sites, so they need no redirect. permanent: true is a 308.
const OLD_SITE_REDIRECTS: [source: string, destination: string][] = [
  // Product, programme and school-type pages
  ["/product", "/curriculum-mapping"],
  ["/what-we-do/challenges", "/curriculum-mapping"],
  ["/what-we-do/curriculum", "/curriculum-mapping"],
  ["/broadcast", "/curriculum-mapping"],
  ["/broadcast/programmes", "/curriculum-mapping"],
  ["/programmes/:slug", "/curriculum-mapping"],
  ["/startup-school-set-menu-programme", "/curriculum-mapping"],
  ["/perform-better-for-schools", "/curriculum-mapping"],
  ["/8billionideas-for-primary-schools", "/curriculum-mapping"],
  ["/8billionideas-for-secondary-schools", "/curriculum-mapping"],
  ["/8billionideas-for-se", "/curriculum-mapping"],
  ["/8billionideas-for-international-schools", "/curriculum-mapping"],
  // Building a programme, CPD and live experiences (priced as add-ons on /pricing)
  ["/broadcast/tailor-your-programme", "/pricing"],
  ["/what-we-do/cpd", "/pricing"],
  ["/what-we-do/live-experiences", "/pricing"],
  // Company, team, stories and contact
  ["/8billionideas-meet-the-team", "/about"],
  ["/careers", "/about"],
  ["/customer-stories", "/case-studies"],
  ["/book-a-meeting", "/contact"],
  ["/partnerships", "/contact"],
  // Resources
  ["/creating-ripples", "/resources"],
  ["/the-tech-toolkit", "/resources"],
  // No match on this site
  ["/holiday-camps/:path*", "/"],
  ["/academy", "/"],
  ["/what-we-do/courses", "/"],
  ["/for-parents", "/"],
  ["/perform-better-parents", "/"],
  ["/8billionideas-india", "/"],
  ["/8billionideas-ica-pilot-programme", "/"],
  ["/unlocking-education", "/"],
  ["/choose-your-character", "/"],
  ["/login", "/"],
  ["/checkout", "/"],
  ["/paypal-checkout", "/"],
  ["/order-confirmation", "/"],
  ["/thank-you", "/"],
  ["/results", "/"],
  ["/coming-soon", "/"],
];

const nextConfig: NextConfig = {
  async redirects() {
    // NOC and EPQ have been removed — GCSE is the only qualification page.
    // /nocn and /epq never existed as routes in this repo, but are included
    // defensively in case any old external links used those spellings.
    return [
      { source: "/noc", destination: "/gcse", permanent: true },
      { source: "/nocn", destination: "/gcse", permanent: true },
      { source: "/epq", destination: "/gcse", permanent: true },
      // Blog and Community were placeholder pages; retired in favour of /about.
      { source: "/community", destination: "/about", permanent: true },
      { source: "/blog", destination: "/about", permanent: true },
      {
        source: "/implementation",
        destination: "/curriculum-mapping",
        permanent: true,
      },
      // A retired case study.
      { source: "/case-studies/gems-world-academy", destination: "/case-studies", permanent: true },
      ...OLD_SITE_REDIRECTS.map(([source, destination]) => ({ source, destination, permanent: true })),
    ];
  },
};

export default nextConfig;
