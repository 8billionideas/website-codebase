export interface GcsePillarTile {
  name: string;
  question: string;
}

export interface GcseQuote {
  quote: string;
  name: string;
  role: string;
}

export interface GcseFeaturedQuote {
  text: string;
  name: string;
  role: string;
  isPlaceholder: boolean;
}

// PLACEHOLDER quote: replace with an approved quote and attribution before launch, or set SHOW_GCSE_QUOTE to false.
// When false, section 05 (the quote break) isn't rendered and the thin divider between
// "Ready to deliver" and the platform section returns.
export const SHOW_GCSE_QUOTE = true;

export const gcse = {
  hero: {
    eyebrow: "OXFORDAQA INTERNATIONAL GCSE GLOBAL SKILLS PROJECTS",
    headingLine1: "Turn real-world learning into",
    headingLine2: "a recognised qualification",
    subline:
      "Give your students the opportunity to work towards an International GCSE through practical projects that explore real-world topics and challenges. Developed by OxfordAQA and supported by 8billionideas as its teaching and learning partner, the qualification comes with a structured learning experience, ready-to-teach resources and a dedicated platform to help your school deliver it.",
    // Set to a date string (e.g. "September 2027") to show a small pill
    // above the H1. Leave null to render nothing.
    launchDate: null as string | null,
  },

  // 02: which year groups the qualification can sit in.
  curriculumFit: {
    eyebrow: "FLEXIBLE BY DESIGN",
    headingLine1: "Works with the curriculum",
    headingLine2: "you already follow",
    intro:
      "Whether you follow a British, IB, American, Indian or another international curriculum, the qualification can fit alongside what you already teach, with the flexibility to introduce it at the point that makes the most sense for your school and your students.",
    curricula: [
      "British curriculum",
      "IB curriculum",
      "American curriculum",
      "Indian curriculum",
      "Other international curricula",
    ],
    routesHeading: "Choose where it fits",
    foundation: {
      label: "FOUNDATION ROUTE",
      text: "Build the foundations in Year 7 before students begin the qualification in Year 8 and complete it by the end of Year 9.",
      from: { years: "Year 7", name: "Foundation year" },
      to: { years: "Years 8–9", name: "International GCSE Global Skills Projects" },
    },
    routes: [
      {
        label: "ACCELERATED ROUTE",
        years: "Year 9",
        name: "Accelerated programme",
        text: "An accelerated option for schools that want students to complete the qualification within Year 9.",
      },
      {
        label: "TRADITIONAL ROUTE",
        years: "Years 10–11",
        name: "International GCSE Global Skills Projects",
        text: "Deliver the qualification across Years 10 and 11 alongside the traditional GCSE years.",
      },
    ],
    closingLead: "However your school is structured,",
    closingRest: " we'll help you work out where the qualification fits best.",
  },

  // 03: how the qualification is assessed.
  qualification: {
    eyebrow: "HOW THE QUALIFICATION WORKS",
    headingLine1: "Students demonstrate their learning",
    headingLine2: "through independent and group projects",
    intro:
      "The OxfordAQA International GCSE Global Skills Projects qualification is assessed through two projects rather than a traditional written exam. Students explore real-world topics, research their ideas, work independently and collaboratively, and demonstrate what they've learned through practical work.",
    projects: [
      {
        label: "INDIVIDUAL PROJECT",
        weighting: "60%",
        text: "Students choose a topic to investigate, carry out research and develop an individual project that demonstrates their understanding, ideas and ability to work independently.",
      },
      {
        label: "GROUP SUSTAINABILITY ACTION PROJECT",
        weighting: "40%",
        text: "Students work together to explore a sustainability issue, plan a response and put their ideas into action through a collaborative project.",
      },
    ],
    columns: [
      {
        icon: "FileText",
        title: "No written examination",
        text: "Students are assessed through their project work, giving them the opportunity to demonstrate their learning in a different way.",
      },
      {
        icon: "Route",
        title: "What students do throughout the qualification",
        // Shown as one line, with the arrows in accent-green.
        steps: ["Research", "Plan", "Create", "Present", "Reflect"],
      },
    ],
  },

  // 04: what 8billionideas has already prepared.
  readyToDeliver: {
    eyebrow: "READY TO DELIVER",
    headingLine1: "You don't have to build a",
    headingLine2: "new course from scratch",
    intro:
      "Introducing a new qualification can mean planning lessons, creating resources and working out how everything fits together. As OxfordAQA's teaching and learning partner, we've already developed the teaching materials and learning structure to help your school deliver the qualification without having to build the course itself.",
    reassurance: "You can focus on teaching and supporting your students, rather than developing the course yourself.",
    listHeading: "What we've already prepared for your school",
    items: [
      { number: "01", title: "Ready-to-teach lessons", line: "Clear objectives, teaching materials and activities, all prepared for you." },
      { number: "02", title: "A structured learning journey", line: "Planned learning that guides students through both projects." },
      { number: "03", title: "Resources for teachers and students", line: "Videos, activities and materials to support teaching and learning." },
      { number: "04", title: "Guidance throughout the projects", line: "Practical resources to support project work from start to finish." },
    ],
  },

  // 07: how a school gets set up.
  gettingStarted: {
    eyebrow: "GETTING STARTED",
    headingLine1: "Everything is in place to help",
    headingLine2: "your school get started",
    intro:
      "Introducing the qualification doesn't have to mean a complicated setup process. We'll help your school get everything ready, introduce your teachers and students to the platform, and provide support throughout delivery.",
    stepsHeading: "How we help you get started",
    steps: [
      {
        number: "01",
        title: "Share your student information",
        text: "Your school provides the details we need to prepare teacher and student access to the platform.",
      },
      {
        number: "02",
        title: "We set up your platform",
        text: "We create the accounts and prepare access to the lessons, resources and qualification materials.",
      },
      {
        number: "03",
        title: "We show your team how it works",
        text: "Teachers and students are introduced to the platform so they know where to find everything and how to get started.",
      },
      {
        number: "04",
        title: "Your Partnership Manager supports delivery",
        text: "You'll have a dedicated point of contact to help with implementation, answer questions and keep everything moving.",
      },
      {
        number: "05",
        title: "Ongoing guidance and support",
        text: "We'll continue supporting your school throughout delivery, including key checkpoints and guidance when needed.",
      },
    ],
    reassurances: [
      {
        icon: "Users",
        title: "You don't need a specialist teacher",
        text: "The lessons, resources and teaching structure are already prepared, so your existing teaching team can be supported to deliver the qualification without building a new specialist department.",
      },
      {
        icon: "FileText",
        title: "Need help with centre registration?",
        text: "We can also guide schools through the OxfordAQA centre-registration process where required.",
      },
    ],
  },

  // 09: why schools choose the qualification.
  whySchoolsChoose: {
    eyebrow: "WHY SCHOOLS CHOOSE IT",
    headingLine1: "Give students another way to learn",
    headingLine2: "and achieve a recognised qualification",
    intro:
      "Not every student learns or demonstrates their abilities in the same way. This qualification gives schools another option alongside their existing subjects, combining practical, project-based learning with a recognised International GCSE.",
    offersHeading: "What this offers your school",
    featured: {
      title: "A recognised qualification for practical learning",
      text: "Students can work towards an International GCSE through research and projects, rather than treating this type of learning as an extracurricular activity.",
    },
    benefits: [
      {
        icon: "FileText",
        title: "A different approach to assessment",
        text: "With no written examination, students have the opportunity to demonstrate their understanding through independent and collaborative project work.",
      },
      {
        icon: "Users",
        title: "Develop skills alongside academic subjects",
        text: "Give students opportunities to practise research, communication, collaboration and problem-solving while continuing with their existing curriculum.",
      },
      {
        icon: "CalendarDays",
        title: "More flexibility in your curriculum",
        text: "Introduce project-based learning at a point that suits your school, including the option to complete the qualification before the traditional GCSE years.",
      },
      {
        icon: "Star",
        title: "Something different to offer students and parents",
        text: "Broaden your school's qualification offering with an additional pathway that connects classroom learning to real-world topics and challenges.",
      },
    ],
    closing:
      "Give students another opportunity to demonstrate what they can do, while building on the curriculum your school already offers.",
  },

  projectThemes: {
    eyebrow: "PROJECT THEMES",
    headingLine1: "Explore the topics students can",
    headingLine2: "investigate through their projects",
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
    intro:
      "Students can explore a wide range of real-world topics, from sustainability and technology to entrepreneurship and wellbeing. These themes offer inspiration for students to develop their own questions, investigate issues that interest them and shape their projects.",
    individual: {
      eyebrow: "INDIVIDUAL PROJECT · 60%",
      title: "Individual Project",
      line: "Students choose a topic that interests them and develop their own research question to investigate.",
      questionHeading: "Explore an example research question",
      questionLabel: "RESEARCH QUESTION",
      image: {
        src: "/images/gcse/project-individual-photo.webp",
        position: "70% center",
        alt: "A student writing notes beside a laptop while researching a project",
      },
    },
    group: {
      eyebrow: "GROUP PROJECT · 40%",
      title: "Group Sustainability Action Project",
      line: "Students work together on a shared sustainability challenge, using the UN Sustainable Development Goals to help shape their project.",
      focusLabel: "PROJECT FOCUS",
      focus: "A collaborative project based on a real-world sustainability issue.",
      image: {
        src: "/images/gcse/project-group-photo.webp",
        // The crop is wider than the 3/2 frame; anchored right of centre so the boy stays in.
        position: "85% center",
        alt: "Two students working together on a garden project outdoors",
      },
    },
  },

  // PLACEHOLDER quote: replace with an approved quote and attribution before launch, or set SHOW_GCSE_QUOTE to false.
  quote: {
    text: "The Global Skills Projects qualification gives our students a fantastic opportunity to explore real-world challenges, develop their independent thinking and work collaboratively, while gaining a recognised qualification that complements their academic studies.",
    name: "[Customer Name]",
    role: "[Job Title], [School Name]",
    isPlaceholder: true,
  } as GcseFeaturedQuote,

  platform: {
    eyebrow: "THE PLATFORM",
    headingLine1: "Run the whole qualification",
    headingLine2: "in one place",
    body: "Teachers and students have their own access to the 8billionideas platform, bringing lessons, resources and project work together in one place. Teachers can manage learning and follow student progress, while students can access their materials, complete activities and keep track of their next steps.",
    audiences: [
      {
        title: "For teachers",
        text: "Access teaching materials, guide students through their projects and see how their work is progressing.",
      },
      {
        title: "For students",
        text: "Find lessons and project activities, complete work and see what to focus on next.",
      },
    ],
    // Set to true once a real platform video is ready. While false, no
    // "See the platform" button or video area renders — no placeholder.
    showPlatformVideo: false,
    image: {
      src: "/images/gcse/platform-dashboard.webp",
      alt: "The 8billionideas platform on a laptop, showing a student progression dashboard with key skills progress and a lesson list",
    },
  },

  partnership: {
    eyebrow: "THE PARTNERSHIP",
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
