export interface GcseProjectCard {
  label: string;
  title: string;
  line: string;
  taughtHours: number;
  guidedHours: number;
  outcomes: string[];
}

export interface GcsePillarTile {
  name: string;
  question: string;
}

export interface GcseIconPoint {
  icon: string;
  title: string;
}

export interface GcseIconTextPoint {
  icon: string;
  title: string;
  description: string;
}

export interface GcseQuote {
  quote: string;
  name: string;
  role: string;
}

export const gcse = {
  hero: {
    eyebrow: "THE QUALIFICATION",
    headingLine1: "OxfordAQA International GCSE",
    headingLine2: "Global Skills Projects",
    subline:
      "A real qualification built on real projects, not exams — developed with OxfordAQA, delivered by 8billionideas.",
    // Set to a date string (e.g. "September 2027") to show a small pill
    // above the H1. Leave null to render nothing.
    launchDate: null as string | null,
  },

  whatItIs: {
    eyebrow: "HOW IT FITS",
    headingLines: ["A GCSE that sits", "alongside your"],
    headingEmphasis: "core subjects",
    paragraphs: [
      "Our International GCSE in Global Skills Projects is designed to work alongside the subjects you already offer. It fits into the timetable schools already run, giving students a structured space to develop real-world skills through project-based learning.",
      "It complements core classroom learning in subjects like Maths, English, Science and Languages – not instead of them – helping students make connections, apply their knowledge and see the bigger picture.",
    ],
    image: {
      src: "/images/gcse/how-it-fits.webp",
      alt: "A student's desk with Maths, English, Science and Languages books and a timetable showing Global Skills Projects lessons alongside them",
    },
  },

  howItWorks: {
    eyebrow: "HOW IT WORKS",
    headingLine1: "Two projects,",
    headingLine2: "two years",
    // Hours and outcomes are easy to update here once checked against the
    // OxfordAQA specification.
    cards: [
      {
        label: "FIRST YEAR",
        title: "Individual project",
        line: "Each student explores a topic linked to one or two of our eight pillars.",
        taughtHours: 35,
        guidedHours: 35,
        outcomes: ["Journal", "Presentation", "Written report"],
      },
      {
        label: "SECOND YEAR",
        title: "Group project",
        line: "Students work together on a project linked to one of the United Nations Sustainable Development Goals.",
        taughtHours: 25,
        guidedHours: 25,
        outcomes: ["Journal", "Written report"],
      },
    ] as GcseProjectCard[],
  },

  projectThemes: {
    eyebrow: "PROJECT THEMES",
    headingLine1: "Real questions,",
    headingLine2: "real-world challenges",
    firstYearHeading: "First year: the eight pillars",
    firstYearLine:
      "Individual projects explore one or two of the eight pillars. Example questions:",
    pillars: [
      {
        name: "Entrepreneurship",
        question: "How can a young entrepreneur turn an idea into a successful business?",
      },
      {
        name: "Careers",
        question: "How can young people prepare for a career in a continuously changing world?",
      },
      {
        name: "Wellbeing",
        question:
          "How can schools better support the mental health and wellbeing of their students?",
      },
      {
        name: "Leadership",
        question: "What makes an effective leader in times of global crisis?",
      },
      {
        name: "Health & Performance",
        question: "How does sports psychology impact the performance of elite athletes?",
      },
      {
        name: "Financial Literacy",
        question:
          "What are the most effective ways to teach financial independence to teenagers?",
      },
      {
        name: "Sustainability",
        question: "How can local communities reduce their carbon footprint effectively?",
      },
      {
        name: "Technology",
        question: "What role will artificial intelligence play in the future of education?",
      },
    ] as GcsePillarTile[],
    secondYearHeading: "Second year: a United Nations goal",
    secondYearLine:
      "Group projects work towards one of the United Nations Sustainable Development Goals, applying what students have learned to a shared, real-world challenge.",

    intro:
      "Students explore meaningful questions through projects that help them apply what they learn to the world around them.",
    firstYearEyebrow: "FIRST YEAR · INDIVIDUAL PROJECT",
    questionLabel: "Research question",
    secondYear: {
      eyebrow: "SECOND YEAR",
      title: "Group project",
      subtitle: "United Nations Sustainable Development Goal",
      line: "Students work together on a shared, real-world challenge, applying what they have learned to a broader global issue.",
    },
    image: {
      src: "/images/gcse/project-themes.webp",
      alt: "A Global Skills Project brief for Entrepreneurship lying on a desk, showing its research question and project details",
    },
    globeImage: "/images/gcse/sdg-globe.webp",
  },

  platform: {
    eyebrow: "THE PLATFORM",
    headingLine1: "Run the whole qualification",
    headingLine2: "in one place",
    body: "Plan and deliver every lesson, and follow each student's progress through their projects, all on one platform.",
    points: [
      { icon: "BookOpen", title: "Every lesson ready to teach" },
      { icon: "TrendingUp", title: "Follow each project as it develops" },
      { icon: "LayoutGrid", title: "Lessons, resources and progress together" },
    ] as GcseIconPoint[],
    // Set to true once a real platform video is ready. While false, no
    // "See the platform" button or video area renders — no placeholder.
    showPlatformVideo: false,
    image: {
      src: "/images/gcse/platform.webp",
      alt: "The 8billionideas platform on a laptop, showing the International GCSE Global Skills Project course and its lessons",
    },
  },

  partnership: {
    eyebrow: "THE PARTNERSHIP",
  },

  whyUs: {
    eyebrow: "WHY 8BILLIONIDEAS",
    headingLine1: "Why partner",
    headingLine2: "with us?",
    points: [
      {
        icon: "Rocket",
        title: "Implementation",
        description:
          "A dedicated Partnership Manager and a one-stop digital platform for delivery and guidance.",
      },
      {
        icon: "BookOpen",
        title: "Experience",
        description:
          "Full access to all our lessons and educational content for students and teachers.",
      },
      {
        icon: "Users",
        title: "Community",
        description:
          "Mentorship opportunities and a global network of forward-thinking schools.",
      },
    ] as GcseIconTextPoint[],
    image: {
      src: "/images/gcse/why-partner.webp",
      alt: "A partnership manager talking through materials with two teachers around a table",
    },
  },

  quotesLabel: "WHAT OUR PARTNERS SAY",
  quotes: [
    {
      quote:
        "Partnering with 8billionideas reflects OxfordAQA's commitment to preparing students not just for exams, but for the world beyond them.",
      name: "Jennifer Duggan",
      role: "Head of International Qualifications, OxfordAQA",
    },
    {
      // Placeholder — do not write a quote here. While this starts with
      // "[Paste", the card renders a dashed border and "Quote to be added."
      quote: "[Paste approved quote here]",
      name: "Emily Cheffins",
      role: "Chief Examiner, OxfordAQA",
    },
    {
      quote:
        "This International GCSE is a milestone in education, bridging the gap between traditional academics and the critical skills needed for the future.",
      name: "David Harkin",
      role: "CEO, 8billionideas",
    },
  ] as GcseQuote[],

  recognition: {
    eyebrow: "RECOGNITION",
    line: "Shortlisted for the T4 Education Global EdTech Prize 2026, Top 25 Start-Ups",
  },

  championSchoolsHeadline: "Our champion schools",

  // The fourth question reuses the homepage FAQ's answer exactly — see
  // gcse/page.tsx, which imports it from homepageFaqs rather than
  // retyping it here.
  faq: {
    heading: "Frequently asked questions",
    items: [
      {
        question: "How does the qualification work?",
        paragraphs: ["Answer coming soon"],
      },
      {
        question: "How will this qualification help students stand out?",
        paragraphs: ["Answer coming soon"],
      },
      {
        question: "If a student leaves after the first year, do they receive a certificate?",
        paragraphs: ["Answer coming soon"],
      },
    ],
  },

  closingCta: {
    headingLine1: "Ready to give your students",
    headingLine2: "the opportunity of a lifetime?",
  },
};
