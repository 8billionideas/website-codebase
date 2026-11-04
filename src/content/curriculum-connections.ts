// /curriculum-mapping "See how our learning fits alongside yours": subject-and-stage explorer.
// Panel content from "8billionideas_Curriculum_Mapping_Developer_Content_V3.docx" (4 November 2026),
// field for field, with em dashes as en dashes. Not imported: the document's publishing status,
// internal verification notes, change log, release checks and source list. Removed from "Where it
// could fit" as instructions to us rather than copy for schools: every sentence starting "Do not…"
// and the phrase "subject to current availability confirmation". The learning and application
// headlines were supplied separately (November 2026).

import type { PillarName } from "@/content/curriculumMapping";

export type StageKey = "primary" | "secondary" | "post16";

export interface Stage {
  // "Stage selector summary".
  summary: string;
  // "Panel eyebrow", exactly as written.
  eyebrow: string;
  // "Panel topic heading".
  heading: string;
  // false: held back. The panel shows the "Coming soon" state and the selector a "Coming soon"
  // label; the content below is kept for when it's approved.
  published: boolean;
  // THE LEARNING: a short headline and the "Relevant … learning" paragraph.
  learning: { headline: string | null; text: string };
  // THE APPLICATION: a short headline and the "8billionideas connection" paragraph.
  application: { headline: string | null; text: string };
  // HOW SCHOOLS COULD USE IT: "Where it could fit", then the "Additional supporting example".
  fit: string;
  extra: string | null;
  // WHAT STUDENTS DEVELOP: "Transferable skills".
  skills: string[];
  // "Example learning content" (kept for reference; the Explore link names its programme).
  example: string;
  // The Explore link: the programme name, and the Lesson Explorer year and pillar it opens on
  // (null when the programme isn't in the Lesson Explorer, so the link only scrolls there).
  explore: { programme: string; year: number | null; pillar: PillarName | null };
  // "Curriculum source": a reference link, not an endorsement.
  source: { label: string; url: string };
}

export interface Subject {
  id: string;
  name: string;
  description: string;
  intro: string;
  stages: Record<StageKey, Stage>;
}

export const STAGES: { key: StageKey; name: string; fromYear: number; toYear: number }[] = [
  { key: "primary", name: "Primary", fromYear: 1, toYear: 6 },
  { key: "secondary", name: "Secondary", fromYear: 7, toYear: 11 },
  { key: "post16", name: "Post-16", fromYear: 12, toYear: 13 },
];

export const curriculumConnectionsSection = {
  eyebrow: "CURRICULUM MAPPING",
  headingLine1: "See how our learning fits",
  headingLine2: "alongside yours",
  intro:
    "Explore how 8billionideas complements familiar subjects and the learning already taking place in your school.",
  note: "Examples aligned to the National Curriculum in England. Schools following other curricula can use them as a guide to similar learning.",
  labels: {
    learning: "The learning",
    application: "The application",
    applicationSide: "8billionideas",
    fit: "How schools could use it",
    skills: "What students develop",
  },
  explore: (programme: string) => `Explore ${programme} in the Lesson Explorer`,
  comingSoon: {
    label: "Coming soon",
    eyebrow: "POST-16 · COMING SOON",
    heading: "Post-16 example coming soon",
    pre: "We're finalising this example. ",
    linkLabel: "Explore our post-16 programmes in the Lesson Explorer",
    post: ".",
  },
};

const SOURCES = {
  maths: {
    label: "Source: National Curriculum in England – Mathematics (GOV.UK)",
    url: "https://www.gov.uk/government/publications/national-curriculum-in-england-mathematics-programmes-of-study/national-curriculum-in-england-mathematics-programmes-of-study",
  },
  english: {
    label: "Source: National Curriculum in England – English (GOV.UK)",
    url: "https://www.gov.uk/government/publications/national-curriculum-in-england-english-programmes-of-study/national-curriculum-in-england-english-programmes-of-study",
  },
  science: {
    label: "Source: National Curriculum in England – Science (GOV.UK)",
    url: "https://www.gov.uk/government/publications/national-curriculum-in-england-science-programmes-of-study/national-curriculum-in-england-science-programmes-of-study",
  },
  geography: {
    label: "Source: National Curriculum in England – Geography (GOV.UK)",
    url: "https://www.gov.uk/government/publications/national-curriculum-in-england-geography-programmes-of-study/national-curriculum-in-england-geography-programmes-of-study",
  },
  rshe: {
    label: "Source: Relationships Education and RSHE guidance (GOV.UK)",
    url: "https://www.gov.uk/government/publications/relationships-education-relationships-and-sex-education-rse-and-health-education",
  },
  coreMaths: {
    label: "Source: Core Maths qualifications technical guidance (GOV.UK)",
    url: "https://www.gov.uk/government/publications/core-maths-qualifications-technical-guidance",
  },
  politics: {
    label: "Source: A-level Politics subject content (GOV.UK)",
    url: "https://www.gov.uk/government/publications/gce-as-and-a-level-politics",
  },
  englishLanguage: {
    label: "Source: A-level English Language subject content (GOV.UK)",
    url: "https://www.gov.uk/government/publications/gce-as-and-a-levels-for-english-language",
  },
};

export const subjects: Subject[] = [
  {
    id: "maths",
    name: "Maths",
    description: "Numeracy & Financial Skills",
    intro:
      "See how familiar mathematical learning connects to practical, future-focused activities at different stages of school.",
    stages: {
      primary: {
        summary: "Money, budgeting and practical choices",
        eyebrow: "EXAMPLE CURRICULUM CONNECTION · PRIMARY · YEAR 6 EXAMPLE",
        heading: "Money and financial choices",
        published: true,
        learning: {
          headline: "Decimals, percentages and mathematical reasoning.",
          text: "Year 6 pupils use written calculation methods, work with decimals and percentages, solve multi-step problems and apply ratio and proportion to practical contexts. They use rounding and estimation to check the reasonableness of answers.",
        },
        application: {
          headline: "Plan a seven-day holiday with £10,000.",
          text: "Through Holiday Money, students practise currency conversion and plan a seven-day trip within a £10,000 budget, making financial decisions as they go.",
        },
        fit: "An applied budgeting challenge after relevant Year 6 calculation, decimals or percentage work, or as a cross-curricular extension. Currency conversion is an application context, not a separately specified Year 6 requirement. Holiday Money modules are approximately 50 minutes.",
        extra: "Also for younger primary: Recipe For Success – Year 2, where students plan an activity within a £20 budget.",
        skills: ["Problem-Solving", "Decision-Making", "Collaboration"],
        example: "Holiday Money – Year 6",
        explore: { programme: "Holiday Money", year: 6, pillar: "Financial Literacy" },
        source: SOURCES.maths,
      },
      secondary: {
        summary: "Percentages and financial decisions",
        eyebrow: "EXAMPLE CURRICULUM CONNECTION · SECONDARY · YEAR 9 EXAMPLE",
        heading: "Percentages and employment costs",
        published: true,
        learning: {
          headline: "Percentages and proportional reasoning.",
          text: "At Key Stage 3, pupils work with percentages, fractions and proportional reasoning, using appropriate calculations to solve mathematical and real-world problems. These skills can be applied to financial comparisons and cost calculations.",
        },
        application: {
          headline: "Work out the real cost of employing someone.",
          text: "Through Diversify Your Money, students work out the cost of employing someone, including employer contributions, before considering how these costs influence business decisions.",
        },
        fit: "A real-world extension of KS3 percentage and proportional-reasoning learning, potentially in Year 9, or within financial education. Employer contributions are a business application, not prescribed KS3 mathematics content. The full module is approximately 50 minutes.",
        extra: null,
        skills: ["Problem-Solving", "Critical Thinking", "Decision-Making"],
        example: "Diversify Your Money: Talking The Talk – Year 9",
        explore: { programme: "Diversify Your Money", year: 9, pillar: "Financial Literacy" },
        source: SOURCES.maths,
      },
      // HELD (V3 publishing hold): programme and age-group suitability unconfirmed.
      post16: {
        summary: "Financial modelling and evaluating options",
        eyebrow: "POTENTIAL POST-16 CONNECTION · PROGRAMME UNCONFIRMED",
        heading: "Financial modelling and business decisions",
        published: false,
        learning: {
          headline: null,
          text: "Depending on the qualification or enrichment programme, post-16 learners may apply numerical reasoning, rates, data analysis and financial modelling to business or everyday decisions. Exact subject outcomes must be checked against the school’s chosen specification.",
        },
        application: {
          headline: null,
          text: "In Financial Modelling And Planning, students calculate customer acquisition costs, estimate customer lifetime value and model the costs of running a start-up, using the results to inform decisions.",
        },
        fit: "Potentially useful in Core Maths, Business or enterprise enrichment, subject to checking the qualification specification and confirming the age-group suitability and availability of the 8billionideas programme.",
        extra: null,
        skills: ["Problem-Solving", "Decision-Making", "Communication"],
        example: "Financial Modelling And Planning – age group and programme to be confirmed",
        explore: { programme: "Financial Modelling And Planning", year: null, pillar: null },
        source: SOURCES.coreMaths,
      },
    },
  },
  {
    id: "english",
    name: "English",
    description: "Literacy & Language",
    intro:
      "See how familiar English learning connects to practical, future-focused activities at different stages of school.",
    stages: {
      primary: {
        summary: "Storytelling, narrative writing and persuasion",
        eyebrow: "EXAMPLE CURRICULUM CONNECTION · PRIMARY · YEAR 2 EXAMPLE",
        heading: "Storytelling and narrative writing",
        published: true,
        learning: {
          headline: "Planning and writing narratives.",
          text: "In Year 2, pupils write narratives about personal experiences and those of others, discuss and plan what they intend to write, sequence ideas and read their writing aloud. The spoken-language programme across Years 1–6 also develops listening, discussion, storytelling and presentation.",
        },
        application: {
          headline: "Create your own short story.",
          text: "Through Storytellers, students explore how stories are structured before writing their own. They develop characters, choose a genre and create a short narrative using a model text.",
        },
        fit: "Within a Year 2 narrative-writing unit, with an additional spoken-language opportunity for discussion and sharing stories. Building A Story is approximately 35 minutes.",
        extra: "Also for older primary: Holiday Money – Year 6, where students create a holiday advert and persuasive speech.",
        skills: ["Creative Thinking", "Communication"],
        example: "Storytellers: Building A Story – Year 2",
        explore: { programme: "Storytellers", year: 2, pillar: "Wellbeing" },
        source: SOURCES.english,
      },
      secondary: {
        summary: "Persuasive writing, speeches and presenting",
        eyebrow: "EXAMPLE CURRICULUM CONNECTION · SECONDARY · YEAR 8 EXAMPLE",
        heading: "Persuasive writing and public speaking",
        published: true,
        learning: {
          headline: "Writing and speaking for different audiences.",
          text: "At Key Stage 3, pupils write for different purposes and audiences, plan and structure their work, and speak confidently through short speeches and presentations. They use appropriate vocabulary and evidence to communicate ideas clearly.",
        },
        application: {
          headline: "Script your own TED-style talk.",
          text: "Through Take The Stage, students choose an idea, consider their audience and begin scripting a TED-style talk. They structure an introduction, develop arguments supported by evidence and finish with a call to action.",
        },
        fit: "Within a KS3 persuasive-writing or spoken-language unit, with Year 8 as an illustrative placement. The activity is approximately 50 minutes.",
        extra: null,
        skills: ["Communication", "Critical Thinking", "Self-Awareness"],
        example: "Take The Stage: Create Your Own TED Talk – Year 8",
        explore: { programme: "Take The Stage", year: 8, pillar: "Leadership" },
        source: SOURCES.english,
      },
      post16: {
        summary: "Argument, critical analysis and debate",
        eyebrow: "POTENTIAL POST-16 CONNECTION · YEAR 12 EXAMPLE",
        heading: "Evaluating arguments and identifying flawed reasoning",
        published: true,
        learning: {
          headline: "How language shapes meaning and influences audiences.",
          text: "In suitable post-16 English Language or critical-literacy provision, students may analyse how language shapes meaning and influences audiences, using evidence to evaluate viewpoints. Explicit work on logical fallacies is an enrichment or cross-curricular critical-thinking application rather than a universal A-level English requirement.",
        },
        application: {
          headline: "Spot and challenge flawed arguments.",
          text: "Through Positive Arguments, students investigate common logical fallacies, research examples and explain how weak arguments can be challenged. They present their findings and practise responding to flawed reasoning.",
        },
        fit: "As a 45-minute enrichment or application activity in English Language, debate or research-skills provision. Any A-level alignment should be checked against the school’s awarding-body specification.",
        extra: null,
        skills: ["Critical Thinking", "Communication", "Collaboration"],
        example: "Positive Arguments: Spot The Problem – Year 12",
        explore: { programme: "Positive Arguments", year: 12, pillar: "Leadership" },
        source: SOURCES.englishLanguage,
      },
    },
  },
  {
    id: "science",
    name: "Science",
    description: "Scientific Enquiry & STEM",
    intro:
      "See how familiar scientific learning connects to practical, future-focused activities at different stages of school.",
    stages: {
      primary: {
        summary: "Human digestion, hydration and healthy choices",
        eyebrow: "RELATED CURRICULUM CONNECTION · PRIMARY · YEAR 4 EXAMPLE",
        heading: "The human digestive system and healthy hydration",
        published: true,
        learning: {
          headline: "The human digestive system.",
          text: "In Year 4 Science, pupils describe the basic parts of the human digestive system and their functions. Learning about food, nutrition and the body is developed across primary science; exploring why we need water and how hydration affects health is a related extension, not a specific Year 4 statutory requirement.",
        },
        application: {
          headline: "Find out why your body needs water.",
          text: "Through Grow Together, students explore why the body needs water, including its role in transporting nutrients, removing waste and regulating temperature. They then consider how hydration needs change in different conditions.",
        },
        // Removed: "Do not present this lesson as direct coverage of a specified Year 4 hydration objective."
        fit: "As a health-related extension alongside Year 4 work on digestion, or in health education or PSHE. The water-intake planning activity takes approximately 30 minutes.",
        extra: null,
        skills: ["Critical Thinking", "Decision-Making", "Self-Awareness"],
        example: "Grow Together 1.0: Water Water Everywhere – Year 4",
        explore: { programme: "Grow Together 1.0", year: 4, pillar: "Performance" },
        source: SOURCES.science,
      },
      secondary: {
        summary: "Nutrition, evidence and healthy choices",
        eyebrow: "EXAMPLE CURRICULUM CONNECTION · SECONDARY · YEARS 7–9 EXAMPLE",
        heading: "Nutrition and the science of a healthy diet",
        published: true,
        learning: {
          headline: "The components of a healthy diet.",
          text: "At Key Stage 3, pupils study the components of a healthy human diet, including carbohydrates, fats, proteins, vitamins, minerals, fibre and water, and why each is needed. They also consider the consequences of dietary imbalance.",
        },
        application: {
          headline: "Plan a balanced plate.",
          text: "Through Eat Yourself Well, students explore the roles of different nutrients, examine evidence around dietary choices and consider how nutrition influences health. They apply that understanding by planning a balanced plate.",
        },
        fit: "As an applied activity following a KS3 biology unit on nutrition. Curriculum Level 2 is approximately Years 7–9, but schools may sequence this learning differently.",
        extra: null,
        skills: ["Critical Thinking", "Problem-Solving", "Decision-Making"],
        example: "Eat Yourself Well – Curriculum Level 2 (approximately Years 7–9)",
        // Not in the Lesson Explorer data, so the link only scrolls there.
        explore: { programme: "Eat Yourself Well", year: null, pillar: null },
        source: SOURCES.science,
      },
      // HELD (V3 publishing hold): research placeholder, no confirmed Science alignment.
      post16: {
        summary: "Measurement, evidence and evaluating methods",
        eyebrow: "RESEARCH PLACEHOLDER · NO CONFIRMED SCIENCE ALIGNMENT",
        heading: "Evaluating evidence and tracking methods",
        published: false,
        learning: {
          headline: null,
          text: "A post-16 research or enrichment activity may encourage students to compare quantitative and qualitative information, question measurement methods and consider the limitations of conclusions. A direct connection to a specific post-16 Science qualification has not been established.",
        },
        application: {
          headline: null,
          text: "Too Much Tracking? asks students to compare data-driven and non-numerical approaches to tracking personal progress. This could prompt discussion about measurement and evaluation, but the current activity is primarily a wellbeing lesson, not an established Science connection.",
        },
        // Removed: "Do not publish this as a verified Science curriculum match without selecting a
        // qualification and a more directly relevant science resource."
        fit: "Interdisciplinary enrichment only at present.",
        extra: null,
        skills: ["Critical Thinking", "Self-Awareness"],
        example: "Be Remarkable 1.0: Too Much Tracking? – Year 12",
        explore: { programme: "Be Remarkable 1.0", year: 12, pillar: "Performance" },
        source: SOURCES.science,
      },
    },
  },
  {
    id: "personal-development",
    name: "Personal Development",
    description: "PSHE, Wellbeing & Life Skills",
    intro:
      "See how familiar personal development learning connects to practical, future-focused activities at different stages of school.",
    stages: {
      primary: {
        summary: "Self-esteem, kindness and empathy",
        eyebrow: "EXAMPLE LEARNING CONNECTION · PRIMARY · YEARS 1–2 EXAMPLE",
        heading: "Self-esteem, kindness and empathy",
        published: true,
        learning: {
          headline: "Respectful behaviour, care for others and friendships.",
          text: "Primary Relationships Education and wider school PSHE can help pupils recognise respectful behaviour, care for others and understand the importance of positive friendships. Schools may extend this through activities on self-esteem, individual strengths, empathy and kindness.",
        },
        application: {
          headline: "Celebrate what makes you unique.",
          text: "Through Wonderful Me, Amazing You, students explore what makes them unique, create self-portraits and collages of their positive qualities, and take part in activities exploring kindness, compassion and empathy.",
        },
        fit: "Within primary Relationships Education, school PSHE or a wider kindness and belonging project. The programme includes four modules and a showcase.",
        extra: "Also for older primary: Mission Hide And Seek: Digital Security Squad – Year 3, exploring online safety and personal information.",
        skills: ["Self-Awareness", "Creative Thinking", "Communication"],
        example: "Wonderful Me, Amazing You: Self-Esteem – Years 1–2",
        explore: { programme: "Wonderful Me, Amazing You", year: 1, pillar: "Wellbeing" },
        source: SOURCES.rshe,
      },
      secondary: {
        summary: "Friendships, bullying and relationships",
        eyebrow: "EXAMPLE LEARNING CONNECTION · SECONDARY · YEAR 7 EXAMPLE",
        heading: "Managing friendships and responding to bullying",
        published: true,
        learning: {
          headline: "Healthy relationships and responding to bullying.",
          text: "Secondary Relationships Education includes understanding healthy and respectful relationships, recognising bullying and harmful behaviour, and knowing appropriate ways to seek help and respond. Schools can explore conflict, motivations and personal choices further through PSHE and pastoral learning.",
        },
        application: {
          headline: "Explore why people behave unkindly.",
          text: "Through Social Butterflies, students investigate why people behave unkindly, reflect on their own behaviour and create character cards exploring different forms of bullying, possible motivations and ways to respond.",
        },
        fit: "Within Year 7 transition, Relationships Education, school PSHE or tutor-time provision. Social Butterflies is structured as a one-day programme with five modules.",
        extra: null,
        skills: ["Self-Awareness", "Critical Thinking", "Resilience"],
        example: "Social Butterflies: Nastiness & Bullying – Year 7",
        explore: { programme: "Social Butterflies", year: 7, pillar: "Leadership" },
        source: SOURCES.rshe,
      },
      post16: {
        summary: "Life decisions, resilience and independence",
        eyebrow: "POST-16 ENRICHMENT CONNECTION · YEAR 13 EXAMPLE",
        heading: "Preparing for independent life and making decisions",
        published: true,
        learning: {
          headline: "Evaluating choices and planning for life after school.",
          text: "Post-16 pastoral and enrichment programmes may support students to evaluate personal choices, develop independence, reflect on setbacks and plan for life after school. These are school-level developmental aims, not a prescribed Year 13 National Curriculum programme.",
        },
        application: {
          headline: "Work through a real decision you're facing.",
          text: "Through Foundations, students choose a real decision they are facing and work through a structured decision-making template, considering their options, fears and possible outcomes before deciding what to do.",
        },
        fit: "Within Year 13 pastoral programmes, leavers’ preparation or existing enrichment provision. The wider Foundations programme also explores bias, commitment and planning for the future.",
        extra: "Alternative careers example: The Internship: Who’s Talking: Interview Skills – Year 12.",
        skills: ["Decision-Making", "Resilience", "Self-Awareness"],
        example: "Foundations: How To Make Good Decisions – Year 13",
        explore: { programme: "Foundations", year: 13, pillar: "Wellbeing" },
        source: SOURCES.rshe,
      },
    },
  },
  {
    id: "humanities",
    name: "Humanities",
    description: "History, Geography & Social Studies",
    intro:
      "See how familiar Humanities learning connects to practical, future-focused activities at different stages of school.",
    stages: {
      primary: {
        summary: "Places, communities and global connections",
        eyebrow: "RELATED CURRICULUM CONNECTION · PRIMARY · YEAR 2 EXAMPLE",
        heading: "Local communities and places around the world",
        published: true,
        learning: {
          headline: "Your locality and places around the world.",
          text: "At Key Stage 1, pupils learn about their locality, the United Kingdom and places elsewhere in the world. They compare the human and physical geography of contrasting places and use basic geographical vocabulary to describe features of communities and environments. Imports and exports are an additional business application, not a specified KS1 requirement.",
        },
        application: {
          headline: "Discover where everyday products come from.",
          text: "Through World Of Business, students explore the difference between local and global businesses, investigate where products come from and consider how businesses adapt to different communities. They also explore real examples of imports and exports.",
        },
        // Removed: "Do not label trade or imports and exports as statutory Year 2 geography outcomes."
        fit: "As an enrichment activity linked to KS1 geography on locality and contrasting places, using businesses and products as an applied example. Modules are approximately 35 minutes.",
        extra: "Also for History: Work Time Machine: Diving Into History – Year 1, exploring how inventions have changed jobs over time.",
        skills: ["Problem-Solving", "Critical Thinking", "Creative Thinking"],
        example: "World Of Business: Import Export / Around The World In Business – Year 2",
        explore: { programme: "World Of Business", year: 2, pillar: "Entrepreneurship" },
        source: SOURCES.geography,
      },
      secondary: {
        summary: "Urbanisation, sustainability and global challenges",
        eyebrow: "EXAMPLE CURRICULUM CONNECTION · SECONDARY · YEAR 9 EXAMPLE",
        heading: "Urbanisation and sustainable cities",
        published: true,
        learning: {
          headline: "Population, urbanisation and human geography.",
          text: "At Key Stage 3, pupils study human geographical processes including population and urbanisation, and how human activity interacts with physical environments and natural systems. Sustainable urban planning provides an applied context for exploring these themes.",
        },
        application: {
          headline: "Plan a sustainable neighbourhood.",
          text: "Through City Changers, students investigate urban growth and plan a sustainable neighbourhood, considering access to green space, food, employment and everyday services. They apply geographical understanding to a realistic planning challenge.",
        },
        fit: "After a KS3 geography unit on urbanisation or as part of a sustainability project, with Year 9 as an illustrative placement. The module is approximately 50 minutes.",
        // Removed from the end: ", subject to current availability confirmation".
        extra: "Another Geography connection: Solve It: World Hunger – Year 7, exploring food insecurity, inequality and climate.",
        skills: ["Problem-Solving", "Creative Thinking", "Communication"],
        example: "City Changers: Solve It: Sustainable Cities – Year 9",
        explore: { programme: "City Changers", year: 9, pillar: "Entrepreneurship" },
        source: SOURCES.geography,
      },
      post16: {
        summary: "Politics, economics and society",
        eyebrow: "POTENTIAL POST-16 CONNECTION · YEAR 12 EXAMPLE",
        heading: "Political ideas, welfare and government decisions",
        published: true,
        learning: {
          headline: "Political ideas and the role of the state.",
          text: "Depending on the qualification, post-16 students may examine political ideologies, institutions, government decisions and competing views of the role of the state. A-level Politics provides a relevant subject framework, but specific welfare and budget activities depend on the chosen specification or enrichment programme.",
        },
        application: {
          headline: "Design a society and decide how to spend its budget.",
          text: "Through Utopian Economics, students design an imagined society, make decisions about welfare provision and represent spending choices in a pie chart. They then develop and present policies, respond to questions and evaluate competing approaches.",
        },
        fit: "Potentially within A-level Politics teaching on political ideas, or in related Economics/Sociology and interdisciplinary enrichment. Check the school’s awarding-body specification before claiming a direct syllabus match. The programme includes six modules.",
        extra: null,
        skills: ["Decision-Making", "Critical Thinking", "Communication"],
        example: "Utopian Economics: Going Without / Vote For Utopia – Year 12",
        explore: { programme: "Utopian Economics", year: 12, pillar: "Financial Literacy" },
        source: SOURCES.politics,
      },
    },
  },
];
