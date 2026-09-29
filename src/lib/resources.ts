export type Resource = {
  slug: string;
  type: string;
  title: string;
  // null renders nothing (no empty line or placeholder text).
  description: string | null;
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
    title: "The Future Jobs Kit",
    description:
      "A free resource designed to equip students with the skills and knowledge required for the jobs of tomorrow.",
    cta: "Download now",
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
    description: null,
    cta: "Download now",
    url: "https://page.8billionideas.com/my-first-job-kit",
    image: {
      src: "/images/resources/my-first-job-kit.webp",
      alt: "The My First Job Kit box with example job cards",
      position: "center center",
      fit: "contain",
    },
  },
];

// Shown as its own band.
export const NEWSLETTER: Resource = {
  slug: "weekly-whiteboard",
  type: "NEWSLETTER",
  title: "Weekly Whiteboard",
  description: null,
  cta: "Join now",
  url: "https://page.8billionideas.com/weekly-whiteboard",
  image: null,
};
