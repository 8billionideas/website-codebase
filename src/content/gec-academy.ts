// /gec-academy: the GEC Academy × 8billionideas landing page, moved from the static page in
// github.com/8billionideas/gecx8billionideas (index.html, November 2026) and set in the site's own
// design (paper, mint and ink bands; the site's buttons, cards and FAQ). Copy as in the source,
// with the agreed fixes only: "Enroll today" → "Enrol today"; "The Global Skills Projects gives" →
// "give"; the curriculum pillars in the approved names and order ("Health & performance" →
// "Performance", "Financial literacy" → "Financial Literacy"); the placeholder
// "#region=xxxxx&country=xxxxx" removed from the brochure link.

// Switch to true once the claims are signed off.
export const GEC_PAGE_INDEXABLE = false;

export const GEC_ENROL_URL = "https://8billionideas.typeform.com/to/kdzXlQGI";
export const GEC_BROCHURE_URL = "https://8billionideas.typeform.com/to/wGdRNuPK?typeform-source=oxfordaqa-lp.vercel.app";
// TODO: enrolment link / contact form to be confirmed before launch (per the source document).
export const GEC_CLOSING_URL = "https://8billionideas.typeform.com/to/KyFRNPlj";
export const GEC_EMAIL = "press@8billionideas.com";
export const GEC_VIDEO_ID = "nRdsITaVT7c";

export const gecImages = {
  logo: { src: "/images/gec-academy/gec-academy-logo.webp", alt: "GEC Academy", width: 324, height: 134 },
  students: {
    src: "/images/gec-academy/students.webp",
    alt: "Secondary students working together on project papers spread across a library table",
    width: 1330,
    height: 998,
  },
  // The film's YouTube thumbnail (maxresdefault), hosted here so nothing loads from YouTube before
  // the film is played.
  videoThumbnail: { src: "/images/gec-academy/video-thumbnail.webp", width: 1280, height: 720 },
};

export const gecHero = {
  chip: "International GCSE Global Skills Projects",
  headingLine1: "The most important",
  // A non-breaking space keeps "a generation" together when the line wraps.
  headingLine2: "new GCSE in a\u00a0generation",
  lede: "One million students. One powerful new qualification. A real edge in university admissions. GEC Academy brings the OxfordAQA International GCSE Global Skills Projects, delivered by 8billionideas, to students across China and Asia.",
  enrol: "Enrol today",
  primary: "Get started today",
  brochure: "Download brochure",
};

export const gecAsk = {
  title: "Ask about the qualification",
  answers: [
    {
      q: "How is it assessed?",
      a: "There is no written exam. Students complete an Individual Project in Year 1 (60% of the grade) and a Group Sustainability Action Project in Year 2 (40%), both formally graded.",
    },
    {
      q: "Who certifies it?",
      a: "OxfordAQA, the international arm of AQA, one of the UK’s major exam boards, formally grades and certifies both pieces of work.",
    },
    {
      q: "What happens after?",
      a: "Students progressing toward A-level can continue into GEC Academy’s IEPQ at Level 3, deepening the same research and project skills in a more university-facing piece of work.",
    },
    {
      q: "What’s the evidence?",
      a: "The qualification is new, so it has no track record yet. Research on the comparable UK Extended Project Qualification links it to stronger progression into higher education and higher rates of First-Class and 2:1 degrees.",
    },
  ],
};

// count: the number counted up to; format "m" shows 1,000,000 as "1M".
export const gecStats: { count: number; format?: "m"; suffix?: string; text: string }[] = [
  { count: 1000000, format: "m", text: "students targeted across China and Asia over the next decade" },
  { count: 0, text: "written exams. Assessment is entirely project work" },
  { count: 2, text: "projects, each formally graded by OxfordAQA" },
  { count: 1000, suffix: "+", text: "students have already taken part in GEC Academy’s IEPQ" },
];

export const gecVideo = {
  headingBefore: "A short introduction to the ",
  headingEm: "most exciting new GCSE in a generation",
  playLabel: "Play the introduction video",
  badge: "Play the film",
  iframeTitle: "International GCSE Global Skills Projects introduction video",
};

// The statement, word for word; the "em" parts are set in italic accent-green.
export const gecStatement: { text: string; em?: boolean }[] = [
  { text: "Grades open the door. A " },
  { text: "portfolio", em: true },
  { text: " a student can " },
  { text: "defend in person", em: true },
  { text: " is what gets them noticed by an admissions panel." },
];

export const gecWhy = {
  headingBefore: "Why grades alone aren’t ",
  headingEm: "enough any more",
  paragraphs: [
    "Admissions boards see thousands of similar applications every year, many built around exam grades alone. GPAs have been climbing across many school systems for years, which makes a strong set of grades harder to use as a point of difference.",
    "The Global Skills Projects give students that something else: an Individual Project and a Group Sustainability Action Project they can point to directly.",
  ],
  tabsLabel: "Application view",
  tabs: { grades: "Grades only", plus: "Grades + project portfolio" },
  fileTitle: "The applicant file",
  fileSub: "As the admissions panel sees it",
  rows: [
    ["Exam grades", "Strong"],
    ["Predicted GPA", "Similar to thousands of others"],
  ],
  extraRows: [
    ["Individual Project", "Graded by OxfordAQA"],
    ["Group Sustainability Action Project", "Graded by OxfordAQA"],
    ["Documented research process", "On record"],
    ["Panel conversation", "Can be defended in person"],
  ],
  verdicts: {
    grades: { strong: "Hard to tell apart.", text: "The panel has grades, and little else to separate this applicant from the pile." },
    plus: {
      strong: "Easy to tell apart.",
      text: "The panel has graded project work and a research record, and can ask the student to explain it face to face.",
    },
  },
};

export const gecAssess = {
  headingBefore: "Assessed by doing, ",
  headingEm: "not by sitting an exam",
  lede: "Two pieces of real project work over two years. Both are formally graded and certified by OxfordAQA, the international arm of AQA, one of the UK’s major exam boards.",
  projects: [
    {
      tone: "a",
      year: "Year 1",
      title: "Individual Project",
      text: "Students choose their own topic and develop it as a written report of around 2,500 words, or as a practical project with a shorter supporting report.",
      percent: 60,
    },
    {
      tone: "b",
      year: "Year 2",
      title: "Group Sustainability Action Project",
      text: "Students work in teams on a real sustainability challenge, then present their findings formally.",
      percent: 40,
    },
  ] as const,
  ringLabel: "of the final grade",
};

export const gecCurriculum = {
  headingBefore: "Supported by 8billionideas’ ",
  headingEm: "The Critical Curriculum",
  // "The Critical Curriculum" in this text is set in italics on the page.
  lede: "Students choose their own Individual Project topic. The Critical Curriculum supports every topic with eight areas of future-ready skills, giving students the thinking they need to make the most of their project.",
  caption: "Pick an area to light its dot",
  // The approved pillar names and order; each lights the dot at the same position in the mark.
  areas: [
    { name: "Entrepreneurship", text: "Build an idea into something real." },
    { name: "Leadership", text: "Lead others, and yourself." },
    { name: "Wellbeing", text: "Look after your own and others’ wellbeing." },
    { name: "Performance", text: "Understand how health and performance connect." },
    { name: "Careers", text: "Prepare for a changing working world." },
    { name: "Financial Literacy", text: "Make confident decisions about money." },
    { name: "Sustainability", text: "Take action on real-world challenges." },
    { name: "Technology", text: "Use technology with purpose." },
  ],
};

export const gecPathway = {
  headingBefore: "A pathway that ",
  headingEm: "grows with the student",
  lede: "Rather than two separate qualifications to choose between, GEC Academy and 8billionideas are building one continuous pathway, from IGCSE through to A-level.",
  steps: [
    { level: "Level 2", title: "Global Skills Projects", text: "A first, formally assessed step into independent research and project work." },
    {
      level: "Level 3",
      title: "IEPQ",
      text: "GEC Academy’s International Extended Project Qualification deepens the same skills into a university-facing piece of work.",
    },
    { level: "Envisaged next", title: "Advanced research", text: "More advanced, research-based learning, as the partnership develops." },
  ],
  glance: [
    { small: "Continuous progression", title: "One route", text: "Global Skills Projects → IEPQ → advanced research" },
    { small: "Tangible outcomes", title: "Work to show", text: "Project outputs, a documented research process and formal OxfordAQA results" },
    { small: "Two-way markets", title: "Shared growth", text: "Coordinated development across China, Asia and the Middle East" },
  ],
};

export const gecFaq = {
  headingBefore: "Questions, ",
  headingEm: "answered",
  tabsLabel: "FAQ topics",
  topics: [
    {
      key: "q",
      label: "The qualification",
      items: [
        { q: "Is there a written exam?", a: "No. Assessment is two pieces of real project work, each formally graded by OxfordAQA." },
        {
          q: "How is the final grade split?",
          a: "The Individual Project in Year 1 is worth 60%. The Group Sustainability Action Project in Year 2 is worth the remaining 40%.",
        },
        {
          q: "What do students produce?",
          a: "In Year 1, a written report of around 2,500 words, or a practical project with a shorter supporting report. In Year 2, a team project presented formally.",
        },
        { q: "Who certifies the qualification?", a: "OxfordAQA, the international arm of AQA, one of the UK’s major exam boards." },
      ],
    },
    {
      key: "p",
      label: "The pathway",
      items: [
        {
          q: "What comes after the Global Skills Projects?",
          a: "For students progressing toward A-level, GEC Academy’s International Extended Project Qualification (IEPQ) is the natural Level 3 continuation.",
        },
        {
          q: "Are these two separate qualifications?",
          a: "No. GEC Academy and 8billionideas are building one continuous pathway from IGCSE through to A-level.",
        },
        {
          q: "How much learning does the IEPQ involve?",
          a: "Typically around 120 hours, including at least 30 hours of guided teaching, before formal OxfordAQA certification.",
        },
      ],
    },
    {
      key: "s",
      label: "For schools and families",
      items: [
        {
          q: "Does the qualification have a track record?",
          a: "Not yet, because it is new. Comparable independent, project-based qualifications, such as the UK’s Extended Project Qualification, already show what this kind of learning can do.",
        },
        {
          q: "Where is it available?",
          a: "GEC Academy brings it to students across China and Asia. 8billionideas is bringing GEC Academy’s IEPQ to schools in the Middle East.",
        },
        { q: "How do I get in touch?", a: "Email 8billionideas at press@8billionideas.com." },
      ],
    },
  ],
};

export const gecCta = {
  headingBefore: "Ready to give your students ",
  headingEm: "the opportunity of a lifetime?",
  primary: "Start your journey today",
  brochure: "Download brochure",
  mailBefore: "If you have any questions or enquiries, please email us at ",
};
