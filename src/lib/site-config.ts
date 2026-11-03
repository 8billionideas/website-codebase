import { KITS } from "@/lib/resources";

// Site-wide contact details and links (used by the footer). null hides an item.

export interface SiteLink {
  label: string;
  url: string | null;
}

export type SocialNetwork = "LinkedIn" | "Instagram" | "YouTube" | "Spotify";

function kitUrl(slug: string): string {
  const kit = KITS.find((k) => k.slug === slug);
  if (!kit) throw new Error(`No kit found in src/lib/resources.ts with slug "${slug}"`);
  return kit.url;
}

// TODO: Add when the CityFibre landing page is built.
export const SHOW_CITYFIBRE_LINK = false;
export const CITYFIBRE_URL: string | null = null;

// The footer's Partnerships column: one line per partner page (e.g. MVA or OxfordAQA later).
// Shown only with an href; site paths open in the same tab, full URLs in a new one.
export const footerPartners: { label: string; href: string | null }[] = [
  { label: "Money Masters (with Zoud)", href: "/money-masters" },
  { label: "Minerva Virtual Academy", href: "/minerva" },
  { label: "ROAR with Lions Clubs", href: "/roar" },
  { label: "GEC Academy", href: "/gec-academy" },
  { label: "CityFibre", href: SHOW_CITYFIBRE_LINK ? CITYFIBRE_URL : null },
];

export const siteConfig = {
  email: "hello@8billionideas.com",
  phone: null as string | null,

  social: [
    { network: "LinkedIn", url: "https://www.linkedin.com/company/8billionideas/posts/?feedView=all" },
    { network: "Instagram", url: "https://www.instagram.com/8billionideas2.0/" },
    { network: "YouTube", url: "https://www.youtube.com/channel/UCBsKeJdYtWy5aHDToETzBiw" },
    { network: "Spotify", url: "https://open.spotify.com/episode/5DcalamYyjPrgUG5inqxlI" },
  ] as { network: SocialNetwork; url: string }[],

  // Only links with a url are shown.
  legal: [
    { label: "Privacy Policy", url: "https://8billionideas.notion.site/Privacy-Policy-0d819775ea1d4a0a8bdf36d8bdaedd05" },
    { label: "Cookie Policy", url: null },
    { label: "Safeguarding", url: null },
    { label: "Terms of Use", url: null },
  ] as SiteLink[],

  // Kit URLs come from src/lib/resources.ts so they're only defined once.
  // inFooter: false keeps a link on file without showing it in the footer.
  externalKits: [
    { label: "Future Jobs Kit 2.0", url: kitUrl("future-jobs-kit"), inFooter: true },
    { label: "My First Job Kit", url: kitUrl("my-first-job-kit"), inFooter: true },
    { label: "Weekly Whiteboard", url: "https://page.8billionideas.com/weekly-whiteboard", inFooter: false },
  ] as { label: string; url: string; inFooter: boolean }[],
};
