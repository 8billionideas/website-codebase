// Money Masters, the card game created with Zoud: the /money-masters page and the Money Masters
// section on /resources. The content of the old HubSpot page
// (page.8billionideas.com/money-masters-rulebook), moved onto the site.

// The main image: the open box with the Retirement Regret, Overdue Bill and Financing Fail cards in
// front (transparent background, trimmed to a 3% margin, 1198×1068). The previous box-only image
// (money-masters-box) is kept. Used on /resources and at the top of /money-masters;
// null shows an "Image coming soon" placeholder.
export const MONEY_MASTERS_IMAGE: { src: string; alt: string; width: number; height: number } | null = {
  src: "/images/money-masters/money-masters-cards.webp",
  alt: "Money Masters card game by Zoud and 8billionideas: an open box of cards with the Retirement Regret, Overdue Bill and Financing Fail cards in front",
  width: 1198,
  height: 1068,
};

// The game's own dark green (sampled from the videos), behind the cream logos.
export const MONEY_MASTERS_GREEN = "#34543F";

export const moneyMastersLogos = {
  partnership: {
    src: "/images/money-masters/zoud-x-8billionideas.webp",
    alt: "Zoud × 8billionideas",
    width: 410,
    height: 111,
  },
  game: {
    src: "/images/money-masters/money-masters-logo.webp",
    alt: "Money Masters",
    width: 1168,
    height: 428,
  },
};

// The Money Masters entry on /resources, shown as a third resource row in the kits' own format.
export const moneyMastersResource = {
  type: "CARD GAME",
  title: "Money Masters",
  description:
    "A fast, funny card game created with Zoud that teaches students about budgeting, saving and spending wisely. Available in English and Arabic.",
  cta: "Watch how to play",
  url: "/money-masters",
};

// Word for word from the old page.
export const moneyMastersIntro = [
  "You just cracked open something awesome. Money Masters is a fast, funny, and surprisingly sneaky card game that teaches you the real-life secrets of good money habits. Think budgets, saving, spending wisely, and outsmarting your friends at the table.",
  "You'll laugh, you'll gasp, you might even yell, and by the end, you'll actually know a thing or two about how money works in the real world. Pretty cool for a card game, right?",
];
export const moneyMastersIntroCta = "👇 Grab the full rulebook below and let's go!";

// Streamed from HubSpot's file hosting (the eu1 host the na1 URLs redirect to; video/mp4 with range
// requests). The rulebooks are the files the old page's CTAs pointed to; those CTA redirects now
// end in a 404 on 7billionideas-6337342.hs-sites.com, so these link to the same files on the
// HubSpot file host directly.
const FILES = "https://6337342.fs1.hubspotusercontent-eu1.net/hubfs/6337342";

export interface MoneyMastersVideo {
  key: "en" | "ar";
  label: string;
  duration: string;
  src: string;
  poster: string;
  captions: { src: string; srcLang: string; label: string } | null;
  rulebook: string;
}

export const moneyMastersVideos: MoneyMastersVideo[] = [
  {
    key: "en",
    label: "English",
    duration: "2:18",
    src: `${FILES}/video_assets/211462945071/inherited/web_optimized.mp4`,
    poster: "/images/money-masters/poster-english.webp",
    captions: null,
    rulebook: `${FILES}/Money%20Masters%20Rules.pdf`,
  },
  {
    key: "ar",
    label: "Arabic",
    duration: "2:54",
    src: `${FILES}/video_assets/211825927471/inherited/web_optimized.mp4`,
    poster: "/images/money-masters/poster-arabic.webp",
    // Saved from the old page (page.8billionideas.com/media-transcripts/211825927471/ar.vtt).
    captions: { src: "/money-masters/ar.vtt", srcLang: "ar", label: "العربية" },
    rulebook: `${FILES}/Money%20Masters%20arabic%20rule%20book.pdf`,
  },
];

export const moneyMastersSurveys = [
  { title: "Daily activity count", href: "https://www.surveymonkey.com/r/86FFFWX", cta: "Log today's activity" },
  { title: "Zoud survey (under 13)", href: "https://www.surveymonkey.com/r/S77CRZ9", cta: "Complete the survey" },
  { title: "Zoud survey (13+)", href: "https://www.surveymonkey.com/r/66D2ZFB", cta: "Complete the survey" },
];
