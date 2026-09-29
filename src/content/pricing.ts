import { CtaLink, NamedItem } from "./types";

export const pricing = {
  headline: "Pricing",

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

  cta: {
    headline: "Ready to bring this to your school?",
    primaryCta: { label: "Request a demo", href: "#book-a-demo" } as CtaLink,
  },
};
