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
    // "cover" (default) fills the frame; "contain" shows the whole image.
    fit?: "cover" | "contain";
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
      src: "/images/resources/my-first-job-kit.webp",
      alt: "The My First Job Kit box with example job cards",
      position: "center center",
      fit: "contain",
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
