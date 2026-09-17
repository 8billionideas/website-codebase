import { CtaLink, NamedItem } from "./types";

export interface PricingBand {
  label: string;
  fee: number;
}

export const pricing = {
  headline: "Pricing",
  subhead: "Choose a view below to see indicative pricing, calculated live.",

  criticalCurriculum: {
    toggleLabel: "Critical Curriculum",
    ratePerCourse: 40,
    pillarOptions: [3, 6, 8],
    defaultPillars: 6,
    defaultYearGroups: 7,
    minYearGroups: 1,
    maxYearGroups: 14,
  },
  gcse: {
    toggleLabel: "International GCSE",
    bands: [
      { label: "10–25", fee: 105 },
      { label: "26–50", fee: 85 },
      { label: "51–100", fee: 65 },
      { label: "101–150", fee: 50 },
      { label: "151–200", fee: 45 },
      { label: "200+", fee: 40 },
    ] as PricingBand[],
    defaultBandIndex: 2,
  },

  included: {
    heading: "Every school gets",
    items: [
      {
        name: "Partnership Manager",
        description:
          "Takes you through every step of the way — your direct point of contact for any questions about the course.",
      },
      {
        name: "Staff Onboarding",
        description: "Structured onboarding so your team starts strong from day one.",
      },
      {
        name: "Teacher Learning Platform",
        description: "Everything your teachers need to deliver lessons with confidence.",
      },
      {
        name: "Student Learning Platform",
        description:
          "Where students access lessons, track progress, and complete work.",
      },
      {
        name: "Student Certificates",
        description: "Recognised certificates marking real progress and achievement.",
      },
      {
        name: "Community Access",
        description:
          "Join a network of schools doing the same work, sharing what works.",
      },
      {
        name: "Marketing Kit",
        description:
          "Ready-made materials to tell parents and governors what you're doing.",
      },
    ] as NamedItem[],
  },

  // Copy here is a first draft and hasn't been reviewed/signed off yet.
  budget: {
    heading: "Why this matters for your budget",
    items: [
      {
        name: "Enrolment & ROI",
        description:
          "A stronger, more distinctive offer that helps attract and retain enrolments — a direct return on the investment.",
      },
      {
        name: "Reduces costs",
        description:
          "One partner instead of six separate providers means fewer contracts, less admin, and less staff time spent managing vendors.",
      },
      {
        name: "Improves education",
        description:
          "Real skills development that strengthens outcomes across the whole school, not just exam results.",
      },
      {
        name: "Cost neutral",
        description:
          "Pricing that scales with what you choose, so schools can start small and expand without renegotiating from scratch.",
      },
    ] as NamedItem[],
  },

  cta: {
    headline: "Ready to bring this to your school?",
    primaryCta: { label: "Book a demo", href: "#book-a-demo" } as CtaLink,
  },
};
