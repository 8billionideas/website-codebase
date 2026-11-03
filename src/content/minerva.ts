import type { HomepageFaq } from "@/lib/homepage-faqs";

// /minerva: the Minerva Virtual Academy (MVA) × 8billionideas partnership page, rebuilt from
// https://minerva8billionideas.vercel.app/ (extracted November 2026). Copy as extracted, with
// mechanical fixes only (British spelling, typos, en dashes, curly apostrophes, the approved
// pillar names and order, "OxfordAQA" and the plural qualification name). Prices, offers, claims
// and commitments are unchanged.

// Every registration and enrol button on the source page goes to this Typeform.
export const MINERVA_REGISTRATION_URL = "https://8billionideas.typeform.com/to/l8AmmTBr";
export const MINERVA_EMAIL = "onlineacademy@8billionideas.com";
export const OXFORDAQA_NEWS_URL =
  "https://www.oxfordaqa.com/news/announcing-a-new-global-partnership-with-8billionideas-to-deliver-international-gcse-global-skills-projects/";
// Linked from the safeguarding FAQ answer on the source (still hosted there).
export const MINERVA_SAFEGUARDING_URL = "https://minerva8billionideas.vercel.app/safeguarding_8bill.pdf";

// MVA's navy (the co-branded logo's own background), so the logo sits seamlessly in the hero.
export const MVA_NAVY = "#0C2F69";

export const minervaLogo = {
  src: "/images/minerva/minerva-x-8billionideas.webp",
  alt: "Minerva Virtual Academy × 8billionideas",
  width: 727,
  height: 151,
};

// The source's two YouTube videos (embedded here with standard controls, no autoplay).
export const minervaVideos = {
  hero: { id: "GlrG-RKVlkQ", title: "Minerva × 8billionideas" },
  partnership: { id: "tRugaViQccA", title: "Minerva Virtual Academy and 8billionideas" },
};

export const minervaHero = {
  eyebrow: "MINERVA × 8BILLIONIDEAS",
  headingLine1: "Empowering the next generation of",
  headingLine2: "world-changers",
  body: "MVA partners with 8billionideas to bring the International GCSE Global Skills Projects and the award-winning Critical Curriculum to our students. Enrol your child into a structured programme that builds real-world skills, confidence, and direction.",
  cta: "Get Started Now",
};

export const minervaOutcomes = {
  heading: "Your child will learn how to…",
  items: [
    { icon: "Lightbulb", title: "Think Independently", text: "Move beyond rote learning. Learn to ask the hard questions." },
    { icon: "Puzzle", title: "Solve Real Problems", text: "Tackle ambiguous, real-world challenges with confidence." },
    { icon: "Users", title: "Lead Confidently", text: "Develop the soft skills required to inspire and guide others." },
    { icon: "ShieldCheck", title: "Stay Resilient", text: "Build the mental fortitude to navigate a changing world." },
  ],
  positioning:
    "Through this partnership, MVA positions its students at the forefront of an evolving educational landscape – one that recognises not only what students know, but how effectively they apply that knowledge in complex, real-world contexts.",
};

export const minervaCurriculum = {
  eyebrow: "THE MOST FUTURE-FOCUSED CURRICULUM",
  heading: "Education for a lifetime",
  intro: "8billionideas Online Academy offers six exclusive pillars designed to equip you with the toolkit for a successful, balanced life.",
  // Approved names and order ("Health & Performance" → "Performance").
  pillars: [
    { name: "Entrepreneurship", text: "Turning ideas into action. Learning to innovate and take calculated risks." },
    { name: "Leadership", text: "Inspiring others and managing team dynamics effectively." },
    { name: "Wellbeing", text: "Understanding mental health and emotional balance for sustainability." },
    { name: "Performance", text: "Optimising physical state for peak mental performance." },
    { name: "Careers", text: "Navigating the modern professional landscape with foresight." },
    { name: "Financial Literacy", text: "Mastering the language of money, investing, and personal finance." },
  ],
  cta: "See pricing",
};

export const minervaGcse = {
  headingLine1: "Access to",
  headingLine2: "the most important new GCSE in a generation",
  body: "MVA students will be among the first globally to access the new International GCSE Global Skills Projects. A brand new GCSE that is designed to ensure that strong academic foundations are complemented by the real-world skills students increasingly need to thrive. Year 7 students will be able to complete a Foundation Course that will set them up for success in the International GCSE Global Skills Projects, which will be available to students in Year 8 and above. The International GCSE Global Skills Projects are designed to be completed over a 12–24 month period, with students working on real-world projects that are assessed by industry experts.",
  facts: {
    firstPartner: { title: "First Global Partner", text: "MVA is the first Global Online School Partner to deliver this pioneering International GCSE." },
    noExams: { title: "No Exams", text: "The first non-exam-based International GCSE, assessed entirely through structured, real-world projects." },
    routes: {
      title: "Study route by location",
      items: [
        { label: "Outside the UK", value: "OxfordAQA International GCSE Global Skills Projects" },
        { label: "Inside the UK", value: "AQA Level 2 HPQ (GCSE equivalent)" },
      ],
    },
    recognition: { title: "Formal Recognition", text: "Sits alongside traditional subjects, integrating academic rigour with real-world outcomes." },
  },
};

const PILLAR_LIST = "6 pillars of learning per year (Entrepreneurship, Leadership, Wellbeing, Performance, Careers, Financial Literacy)";

export interface MinervaPathway {
  emoji: string;
  tag: string;
  title: string;
  subtitle: string;
  lines: string[];
  commitment: string;
  price: string;
  priceUsd: string;
  priceUnit: string;
  wasPrice: string | null;
  features: string[];
  bestFor: string;
  cta: string;
  secondaryLink: { label: string; href: string } | null;
  recommended: boolean;
}

export const minervaPathways = {
  heading: "Choose the right pathway for your child",
  intro: "We offer flexible options to support every student, whether they’re looking for a full, immersive experience or a more focused pathway into the International GCSE Global Skills Projects.",
  options: [
    {
      emoji: "🌱",
      tag: "Flexible",
      title: "Option 1: 8billionideas Online Academy Only",
      subtitle: "Ongoing Skills Development",
      lines: ["Immediate access to the 8billionideas Online Academy courses."],
      commitment: "Commitment of ~1–2 hrs / week",
      price: "£295",
      priceUsd: "≈ $375",
      priceUnit: "per student / per year",
      wasPrice: null,
      features: [
        "Access to the 8billionideas Online Academy",
        PILLAR_LIST,
        "Structured content and activities",
        "Access to 8billionideas Mentors",
        "Development of confidence, creativity, and future-ready skills",
      ],
      bestFor: "Best for students who want to build skills without committing to the International GCSE pathway",
      cta: "Enrol in 8billionideas Online Academy",
      secondaryLink: null,
      recommended: false,
    },
    {
      emoji: "🎯",
      tag: "Focused",
      title: "Option 2: International GCSE-Focused Pathway",
      subtitle: "Access to the full International GCSE qualification.",
      lines: ["A more focused route into the qualification."],
      commitment: "Commitment of ~2–3 hrs / week",
      price: "£395",
      priceUsd: "≈ $505",
      priceUnit: "per student / per year",
      wasPrice: null,
      features: [
        "Enrolment into the International GCSE Global Skills Projects",
        "Access to 70+ International GCSE modules, Reflection Journal, and project work",
        "Opportunity to complete and gain the accredited qualification",
        "Access to 8billionideas Mentors",
      ],
      bestFor: "Best for students who want to focus primarily on achieving the International GCSE",
      cta: "Enrol in the International GCSE Pathway",
      secondaryLink: { label: "Find out more on the OxfordAQA website", href: OXFORDAQA_NEWS_URL },
      recommended: false,
    },
    {
      emoji: "🚀",
      tag: "Recommended",
      title: "Option 3: Full Experience",
      subtitle: "Online Academy + International GCSE Pathway",
      lines: ["Access to 8billionideas Online Academy courses, plus the International GCSE."],
      commitment: "Commitment of ~3–4 hrs / week",
      price: "£495",
      priceUsd: "≈ $630",
      priceUnit: "per student / per year",
      wasPrice: "Normally costs £1,000 / year",
      features: [
        "Access to the 8billionideas Online Academy",
        PILLAR_LIST,
        "Automatic enrolment into the International GCSE Global Skills Projects",
        "Access to the International GCSE learning portal (70+ modules)",
        "Reflection Journal and full activity materials",
        "Structured pathway from learning to final project and certification",
      ],
      bestFor: "Best for students who want both continuous development and a formal qualification",
      cta: "Enrol in Full Experience",
      secondaryLink: null,
      recommended: true,
    },
  ] as MinervaPathway[],
  familyOffer: {
    badge: "25%",
    badgeLine: "OFF",
    eyebrow: "👨‍👩‍👧‍👦 Family Offer",
    heading: "Siblings Discount",
    text: "Signing up 2 or more children? Use code SIB25 to save 25% off for each sibling. Make powerful learning more affordable for your whole family.",
    code: "SIB25",
    cta: "Use SIB25",
  },
};

export const minervaGlance = {
  eyebrow: "AT A GLANCE",
  headingLine1: "The logistics:",
  headingLine2: "Everything you need to know",
  items: [
    { icon: "Sparkles", question: "What is it?", answer: "Prime access to six accredited programmes per year and the opportunity to study for an International GCSE in Global Skills. Students pick the pathway that best suits their needs and work through high-energy modules at their own pace, supported by live bi-weekly check-ins." },
    { icon: "Award", question: "Why sign up?", answer: "Your child will build a digital portfolio of work, earn digital certificates for every module, and take part in termly showcases to celebrate their achievements." },
    { icon: "Users", question: "Who is it for?", answer: "Specifically designed for MVA students in Years 7 to 13 who want an extra edge in their personal development." },
    { icon: "Laptop", question: "Where is it accessed?", answer: "Fully integrated into Canvas. It’s a seamless part of the MVA learning ecosystem." },
    { icon: "CalendarDays", question: "When does it start?", answer: "Register your interest now and secure immediate access for your child." },
    { icon: "PoundSterling", question: "How much does it cost?", answer: "Depending on the pathway chosen, your child will pay between £295 and £495 for the full academic year, including all modules, access to the International GCSE content, certificates, and showcase events." },
  ],
};

export const minervaRegister = {
  eyebrow: "READY TO UNLOCK YOUR CHILD’S POTENTIAL?",
  heading: "Register now",
  line: "Click the button below to give your child access to the 8billionideas programmes.",
  cardHeading: "Start their journey today",
  cardText: "Choose the pathway that best suits your child and secure their place to give them immediate access to the courses and dedicated mentorship.",
  cta: "Get Started Now",
  note: "Please note: After filling out the form and processing the payment, you will receive a confirmation email containing more information about the starting dates for your child’s year group programmes.",
  // On the source, "Terms of Service" and "Privacy Policy" here are plain text (no links).
  terms: "By registering, you agree to our Terms of Service and Privacy Policy.",
  redirect: "You will be redirected to our secure registration portal.",
  helpHeading: "Need help?",
  helpLabel: "Email us",
  includedHeading: "What is included",
  included: [
    "6 skill-building programmes per year",
    "Weekly mentor check-ins",
    "Practical projects & challenges",
    "Certificates of completion",
    "Lifetime access to materials",
  ],
};

// Confirm this testimonial is real and approved.
export const SHOW_MINERVA_TESTIMONIAL = true;
export const minervaTestimonial = {
  quote: "My daughter has grown so much in confidence since starting the programme. She actually looks forward to learning!",
  name: "Sarah M.",
  role: "Parent",
};

export const minervaFaqHeading = "Common Questions";

export const minervaFaqs: HomepageFaq[] = [
  {
    question: "What does my child need to get started?",
    paragraphs: ["A device with internet access and curiosity. We use a browser-based learning management system that is compatible with most laptops and tablets. No special software downloads are required."],
  },
  {
    question: "Does my child need to sit exams for the International GCSE?",
    paragraphs: ["There are no exams with the OxfordAQA International GCSE Global Skills Projects. It is entirely coursework based and everything will be assessed by 8billionideas internally and OxfordAQA externally."],
  },
  {
    question: "How much time should students expect to spend on the programme each week?",
    paragraphs: ["It depends on the pathway option you choose: we recommend around 1–2 hours a week for Option 1 (Academy only), 2–3 hours for Option 2 (International GCSE only) and 3–4 hours for Option 3 (Full Programme). It’s fully self-paced, so students can power through on a free Saturday or take it slow during exam weeks! No fixed deadlines and a relaxed weekly check-in with our facilitator if they’d like to join."],
  },
  {
    question: "How does the Online Academy and the International GCSE work day to day for my child?",
    paragraphs: ["Students access all course materials through Canvas, the MVA learning platform. The curriculum is designed for flexibility, allowing students to work independently, complete tasks, and watch tutorials at their own pace. Each week, students attend a structured lesson facilitated by 8billionideas. These sessions are vital for collaboration and real-time guidance."],
  },
  {
    question: "What if a session is missed?",
    paragraphs: ["If a student is unable to attend a live session, catching up is straightforward: Every session is recorded via Google Meet and recordings are saved into a dedicated folder that students can access at any time to review the material."],
  },
  {
    question: "Can my child join the International GCSE course later in the year?",
    paragraphs: ["Yes, students can join this GCSE at any point, completing the two years’ worth of GCSE content and be entered during the February–May examination diet. As all course content is hosted on Canvas, late joiners can catch up independently using previously released materials and tutorials."],
  },
  {
    question: "Is this included in the Minerva tuition?",
    paragraphs: ["The 8billionideas Online Academy and International GCSE are specially curated programmes, offered to MVA students through our partnership and complement your child’s existing MVA learning. As it’s an optional enrichment rather than part of standard MVA tuition, it carries its own fee. Please refer to the pathway options above for full pricing."],
  },
  {
    question: "Is there a registration deadline for the OxfordAQA qualification?",
    paragraphs: ["There’s no strict enrolment deadline, students can join at any point in the year and work through the pre-recorded content at their own pace. Coursework is submitted at the end of the GCSE programme, so depending on when a student joins, they may complete within the standard two-year timeline or take additional time if needed. Due to the commitment required to complete the GCSE, we recommend students consider their capacity and whether they will be able to allocate the suggested amount of time."],
  },
  {
    question: "Is there a withdrawal policy?",
    // "Refund Policy" is plain text on the source (no link).
    paragraphs: ["Once a student commits to undertaking the online academy programme or International GCSE, please refer to our Refund Policy."],
  },
  {
    question: "Do you have a safeguarding policy for the 8billionideas Online Academy?",
    paragraphs: ["Yes, safeguarding and student wellbeing are a key priority across all Online Academy programmes. You can view our full safeguarding policy here:"],
    link: { label: "Safeguarding Policy", href: MINERVA_SAFEGUARDING_URL, newTab: true },
  },
  {
    question: "Can parents track progress?",
    paragraphs: ["Yes, parents receive periodic updates and students will have a portfolio of work they can share with you at the end of each module."],
  },
];
