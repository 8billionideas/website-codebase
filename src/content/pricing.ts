import { NamedItem } from "./types";

export const pricing = {
  hero: {
    eyebrow: "PRICING",
    headlineLead: "Your school,",
    headlineEmphasis: "your budget",
    intro:
      "Choose the year groups and pillars you want and see an estimated price per year straight away. Start small and add more as your school grows.",
    image: {
      src: "/images/pricing/hero.webp",
      alt: "Secondary students working together around a table with notebooks and a laptop",
    },
  },

  whatsIncluded: {
    eyebrow: "WHAT'S INCLUDED",
    headingLead: "What's included",
    headingEmphasis: "in the price",
    intro:
      "Everything you need to get started, with the flexibility to add more support when you need it.",
    core: [
      {
        name: "Ready-to-teach learning",
        description:
          "Structured lessons, videos, activity materials and teacher guidance already built.",
      },
      {
        name: "Teacher and student platform access",
        description: "A dedicated space for delivery, learning, resources and progress.",
      },
      {
        name: "Built-in progression checks",
        description:
          "Simple start and end-of-programme assessments to show development over time.",
      },
    ] as NamedItem[],
    support: [
      {
        name: "A dedicated Partnership Manager",
        description: "Support with implementation, curriculum mapping and ongoing delivery.",
      },
      {
        name: "Staff onboarding and support",
        description: "Helping your team get set up quickly and deliver with confidence.",
      },
    ] as NamedItem[],
    more: {
      name: "Looking for more?",
      description:
        "Live launch sessions, live drop-down days and facilitator-led delivery can be added separately.",
      ariaLabel: "Talk to us about live sessions and delivery",
    },
  },

};
