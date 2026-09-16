import { CtaLink, NamedItem } from "./types";

export interface StatCallout {
  stat: string;
  source: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export const home = {
  hero: {
    headline:
      "We help schools teach the skills exams don't — from FS1 to Year 13, ending in a real GCSE qualification.",
    subhead:
      "A week-to-week curriculum that fits around your existing timetable, teaching the skills the core curriculum doesn't — no overhaul, no new systems to learn, just lessons ready to run, building toward a real GCSE qualification.",
    primaryCta: { label: "Explore the GCSE", href: "/gcse" } as CtaLink,
    secondaryCta: {
      label: "Explore the Critical Curriculum",
      href: "/critical-curriculum",
    } as CtaLink,
  },

  criticalCurriculum: {
    headline: "The Critical Curriculum",
    subhead:
      "Our award-winning framework of eight future-focused learning pillars, designed to sit alongside academic excellence.",
  },

  gcse: {
    eyebrow: "OxfordAQA International GCSE — Global Skills Projects",
    headline: "No exam. Real projects, real skills.",
    projectSplit:
      "60% individual project, 40% group project — assessed by portfolio, not a written exam.",
    stat: {
      stat: "Exam-based qualifications fail students at 3x the rate of coursework-based ones.",
      source: "Imperial College London",
    } as StatCallout,
    platformLine:
      "A dedicated platform supports every student through both projects.",
    primaryCta: { label: "Find out more", href: "/gcse" } as CtaLink,
    secondaryCta: { label: "Book a demo", href: "#book-a-demo" } as CtaLink,
  },

  whyDifferent: {
    headline: "One system, not six separate providers",
    body: "Most providers solve one piece — careers, or wellbeing, or enterprise. The Critical Curriculum brings curriculum, qualifications, careers, entrepreneurship, work experience, teacher development and impact measurement into eight pillars — plus 250+ ready-to-teach learning experiences your staff don't have to build themselves.",
  },

  proof: {
    headline: "Why choose us",
    items: [
      {
        name: "Safeguarding",
        description:
          "Every mentor is DBS-checked and trained in safeguarding and youth coaching.",
      },
      {
        name: "Progression",
        description: "Each academic year builds on the last, from age 4 to 18.",
      },
    ] as NamedItem[],
  },

  pricing: {
    headline: "Pricing",
    subhead:
      "[PLACEHOLDER — pricing tiers and copy to be confirmed with the commercial team.]",
  },

  faq: {
    headline: "Frequently asked questions",
    items: [
      {
        question: "[PLACEHOLDER question]",
        answer: "[PLACEHOLDER answer]",
      },
      {
        question: "[PLACEHOLDER question]",
        answer: "[PLACEHOLDER answer]",
      },
    ] as FaqItem[],
  },

  finalCta: {
    headline: "Ready to bring the Critical Curriculum to your school?",
    primaryCta: { label: "Find out more", href: "/find-out-more" } as CtaLink,
    secondaryCta: { label: "Book a demo", href: "#book-a-demo" } as CtaLink,
  },
};
