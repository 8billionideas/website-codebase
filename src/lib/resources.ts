export type Resource = {
  slug: string;
  type: string;
  title: string;
  // null renders nothing (no empty line or placeholder text).
  description: string | null;
  tags: string[] | null;
  included: string[] | null;
  cta: string;
  url: string;
  // null shows a clean placeholder on the Resources page.
  image: {
    src: string;
    alt: string;
    position: string;
    // "cover" (default) fills the frame; "contain" shows the whole image; "photo" shows a full
    // photo as a rounded 16:9 card, as wide as the "contain" images' box.
    fit?: "cover" | "contain" | "photo";
    // "contain" only: the share of the frame the image may use (default 1), to balance products
    // whose files have different amounts of white space around them.
    scale?: number;
  } | null;
};

// Shown as alternating rows, in this order.
export const KITS: Resource[] = [
  {
    slug: "future-jobs-kit",
    type: "DIGITAL ASSET",
    title: "Future Jobs Kit 2.0",
    description:
      "Help your students explore future careers through engaging classroom discussion and ready-to-use activities. The Future Jobs Kit 2.0 introduces 52 real and emerging career paths, giving students a glimpse into what the world of work could look like in the future.",
    tags: ["Free PDF", "Classroom ready", "Career exploration", "Printable activity"],
    included: [
      "52 future-focused career cards",
      "Five different worlds of work",
      "Skills linked to each career",
      "Education and preparation routes for each role",
    ],
    cta: "Download free resource",
    url: "https://page.8billionideas.com/future-jobs-kit-2.0",
    image: {
      src: "/images/resources/future-jobs-kit.webp",
      alt: "The Future Jobs Kit 2.0 box with example job cards",
      position: "center center",
      fit: "contain",
    },
  },
  {
    slug: "my-first-job-kit",
    type: "DIGITAL ASSET",
    title: "My First Job Kit",
    description:
      "Introduce younger students to the world of work through a fun collection of career cards and classroom activities. My First Job Kit helps students explore different professions, discover new interests and start thinking more confidently about the possibilities ahead.",
    tags: ["Free PDF", "Classroom ready", "Career exploration", "For younger students"],
    included: [
      "50 different jobs to explore",
      "56 cards including six activity cards",
      "Stories that bring each profession to life",
      "Activities designed to build curiosity, communication and critical thinking",
    ],
    cta: "Download free resource",
    url: "https://page.8billionideas.com/my-first-job-kit",
    image: {
      // 2026 mockup (my-first-job-kit-v2, 1600×1225, trimmed to a 4% margin); the old file is kept.
      src: "/images/resources/my-first-job-kit-v2.webp",
      alt: "My First Job Kit by 8billionideas: a box of 50 job cards with a Vet card in front",
      position: "center center",
      fit: "contain",
      // Its artwork fills 92.6% × 90.3% of the file, the Future Jobs Kit's 87.5% × 79.3% (the files
      // are the same shape), so 91% of the frame gives both products about the same area.
      scale: 0.91,
    },
  },
];

export type ClosingImage = {
  src: string;
  alt: string;
  position: string;
};

// Background for the /resources closing band. null renders a plain ink band.
export const closingImage: ClosingImage | null = {
  src: "/images/resources/closing.webp",
  alt: "A smiling secondary student working in a classroom with classmates",
  position: "right center",
};

// The kits' "Download free resource" pop-up (the HubSpot resources form; its workflow emails the
// download link). resource: the value sent with the generate_lead event.
export const KIT_DOWNLOADS: Record<string, { key: "futureJobsKit" | "myFirstJobKit"; resource: string }> = {
  "future-jobs-kit": { key: "futureJobsKit", resource: "future_jobs_kit" },
  "my-first-job-kit": { key: "myFirstJobKit", resource: "my_first_job_kit" },
};

// Direct PDF links for the pop-up's success message. When one is set, a "Download now" button also
// appears there (opening the PDF in a new tab); null shows only the "check your inbox" message.
export const KIT_DOWNLOAD_URLS: Record<"futureJobsKit" | "myFirstJobKit", string | null> = {
  futureJobsKit: null,
  myFirstJobKit: null,
};
