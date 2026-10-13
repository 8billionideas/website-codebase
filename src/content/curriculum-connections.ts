// /curriculum-mapping "See how our learning fits alongside yours": subject-and-stage explorer.

export type StageKey = "primary" | "secondary" | "post16";

export interface Stage {
  summary: string;
  // Year groups the example is drawn from (formatted through the Years/Grades helper),
  // or null when eyebrowLabel replaces the label.
  exampleYears: number[] | null;
  eyebrowLabel: string | null;
  heading: string;
  existing: string;
  connection: string;
  skills: string[];
  fit: string;
  example: string;
  extra: string | null;
  status: "confirmed" | "provisional" | "placeholder";
}

export interface Subject {
  id: string;
  name: string;
  description: string;
  intro: string;
  stages: Record<StageKey, Stage>;
}

// Provisional and placeholder examples show an "Example coming soon" state while this is false.
export const SHOW_UNCONFIRMED_EXAMPLES = false;

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
  exampleEyebrow: "EXAMPLE CURRICULUM CONNECTION",
  exampleContentHeading: "Example learning content",
  rowLabels: {
    existing: (subject: string) => `Existing ${subject} learning`,
    connection: "8billionideas connection",
    skills: "Transferable skills",
    fit: "Where it could fit",
  },
  comingSoon: {
    label: "Coming soon",
    heading: "Example coming soon",
    pre: (subject: string) => `We're finalising a ${subject} example for this stage. `,
    linkLabel: "Get in touch",
    post: " and we'll talk you through how it could work in your school.",
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
        exampleYears: [6],
        eyebrowLabel: null,
        heading: "Money and financial choices",
        existing:
          "Applying money calculations, decimal multiplication and multi-step problem-solving to real situations.",
        connection:
          "Through Holiday Money, students practise currency conversion and plan a seven-day trip within a £10,000 budget, making financial decisions as they go.",
        skills: ["Problem-Solving", "Decision-Making", "Collaboration"],
        fit: "An application activity following a money or decimals unit, or within a cross-curricular project. Holiday Money modules are approximately 50 minutes.",
        example: "Holiday Money – Year 6",
        extra:
          "Also for younger primary: Recipe For Success – Year 2, where students plan an activity within a £20 budget.",
        status: "confirmed",
      },
      secondary: {
        summary: "Percentages and financial decisions",
        exampleYears: [9],
        eyebrowLabel: null,
        heading: "Percentages and employment costs",
        existing:
          "Calculating percentages of amounts and applying percentages in financial contexts.",
        connection:
          "Through Diversify Your Money, students work out the cost of employing someone, including employer contributions, before considering how these costs influence business decisions.",
        skills: ["Problem-Solving", "Critical Thinking", "Decision-Making"],
        fit: "A real-world application after a percentages unit, or within relevant financial education. The full module is approximately 50 minutes.",
        example: "Diversify Your Money: Talking The Talk – Year 9",
        extra: null,
        status: "confirmed",
      },
      post16: {
        summary: "Financial modelling and evaluating options",
        exampleYears: null,
        eyebrowLabel: "PROVISIONAL EXAMPLE",
        heading: "Financial modelling and business decisions",
        existing:
          "Applying numerical modelling, rates, costs and quantitative reasoning in relevant Core Maths, Business or enterprise learning.",
        connection:
          "In Financial Modelling And Planning, students calculate customer acquisition costs, estimate customer lifetime value and model the costs of running a start-up, using the results to inform decisions.",
        skills: ["Problem-Solving", "Decision-Making", "Communication"],
        fit: "A potential application within financial modelling, business finance or enterprise enrichment, subject to confirming the programme and age-group suitability.",
        example: "Financial Modelling And Planning – age group and programme to be confirmed",
        extra: null,
        status: "provisional",
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
        exampleYears: [2],
        eyebrowLabel: null,
        heading: "Storytelling and narrative writing",
        existing:
          "Planning and writing a narrative with a clear beginning, middle and end, including characters, settings and a problem.",
        connection:
          "Through Storytellers, students explore how stories are structured before writing their own. They develop characters, choose a genre and create a short narrative using a model text.",
        skills: ["Creative Thinking", "Communication"],
        fit: "Within an existing narrative-writing unit, after story structure has been introduced. Building A Story is approximately 35 minutes.",
        example: "Storytellers: Building A Story – Year 2",
        extra:
          "Also for older primary: Holiday Money – Year 6, where students create a holiday advert and persuasive speech.",
        status: "confirmed",
      },
      secondary: {
        summary: "Persuasive writing, speeches and presenting",
        exampleYears: [8],
        eyebrowLabel: null,
        heading: "Persuasive writing and public speaking",
        existing:
          "Planning and structuring a persuasive speech, using evidence and language appropriate to an audience.",
        connection:
          "Through Take The Stage, students choose an idea, consider their audience and begin scripting a TED-style talk. They structure an introduction, develop arguments supported by evidence and finish with a call to action.",
        skills: ["Communication", "Critical Thinking", "Self-Awareness"],
        fit: "Within a persuasive-writing or spoken-language unit, particularly when preparing speeches or presentations. The lesson is approximately 50 minutes.",
        example: "Take The Stage: Create Your Own TED Talk – Year 8",
        extra: null,
        status: "confirmed",
      },
      post16: {
        summary: "Argument, critical analysis and debate",
        exampleYears: [12],
        eyebrowLabel: null,
        heading: "Evaluating arguments and identifying flawed reasoning",
        existing:
          "Analysing how arguments are constructed, evaluating reasoning and recognising techniques used to persuade audiences.",
        connection:
          "Through Positive Arguments, students investigate common logical fallacies, research examples and explain how weak arguments can be challenged. They present their findings and practise responding to flawed reasoning.",
        skills: ["Critical Thinking", "Communication", "Collaboration"],
        fit: "As a 45-minute application activity in relevant English Language, research-skills or debating provision, including suitable Post-16 enrichment.",
        example: "Positive Arguments: Spot The Problem – Year 12",
        extra: null,
        status: "confirmed",
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
        summary: "Hydration, human biology and healthy choices",
        exampleYears: [4],
        eyebrowLabel: null,
        heading: "Hydration and how the human body works",
        existing:
          "Understanding the importance of water and nutrition for the human body, including how water supports normal bodily functions.",
        connection:
          "Through Grow Together, students explore why the body needs water, including its role in transporting nutrients, removing waste and regulating temperature. They then consider how hydration needs change in different conditions.",
        skills: ["Critical Thinking", "Decision-Making", "Self-Awareness"],
        fit: "Within an existing primary Science unit on the human body, health or nutrition. The water-intake planning activity takes approximately 30 minutes.",
        example: "Grow Together 1.0: Water Water Everywhere – Year 4",
        extra: null,
        status: "confirmed",
      },
      secondary: {
        summary: "Nutrition, evidence and healthy choices",
        exampleYears: [7, 8, 9],
        eyebrowLabel: null,
        heading: "Nutrition and the science of a healthy diet",
        existing:
          "Understanding nutrients, balanced diets and the roles of carbohydrates, proteins and fats in human health.",
        connection:
          "Through Eat Yourself Well, students explore the roles of different nutrients, examine evidence around dietary choices and consider how nutrition influences health. They apply that understanding by planning a balanced plate.",
        skills: ["Critical Thinking", "Problem-Solving", "Decision-Making"],
        fit: "As an applied activity following a KS3 biology unit on nutrition, supporting discussion about nutrients, scientific evidence and healthy eating.",
        example: "Eat Yourself Well – Curriculum Level 2 (approximately Years 7–9)",
        extra: null,
        status: "confirmed",
      },
      post16: {
        summary: "Measurement, evidence and evaluating methods",
        exampleYears: [12],
        eyebrowLabel: "RESEARCH PLACEHOLDER",
        heading: "Evaluating evidence and tracking methods",
        existing:
          "Considering the reliability of measurements, comparing approaches to collecting information and evaluating conclusions.",
        connection:
          "Too Much Tracking? asks students to compare data-driven and non-numerical approaches to tracking personal progress. This could prompt discussion about measurement and evaluation, but the current activity is primarily a wellbeing lesson, not an established Science connection.",
        skills: ["Critical Thinking", "Self-Awareness"],
        fit: "Potential enrichment or interdisciplinary discussion. A direct fit within Post-16 Science teaching has not yet been established.",
        example: "Be Remarkable 1.0: Too Much Tracking? – Year 12",
        extra: null,
        status: "placeholder",
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
        exampleYears: [1, 2],
        eyebrowLabel: null,
        heading: "Self-esteem, kindness and empathy",
        existing:
          "Recognising personal strengths, developing self-respect and understanding how our behaviour affects others.",
        connection:
          "Through Wonderful Me, Amazing You, students explore what makes them unique, create self-portraits and collages of their positive qualities, and take part in activities exploring kindness, compassion and empathy.",
        skills: ["Self-Awareness", "Creative Thinking", "Communication"],
        fit: "Within existing PSHE learning on feelings, self-respect and relationships, or as part of a wider kindness project. The programme includes four modules and a showcase.",
        example: "Wonderful Me, Amazing You: Self-Esteem – Years 1–2",
        extra:
          "Also for older primary: Mission Hide And Seek: Digital Security Squad – Year 3, exploring online safety and personal information.",
        status: "confirmed",
      },
      secondary: {
        summary: "Friendships, bullying and relationships",
        exampleYears: [7],
        eyebrowLabel: null,
        heading: "Managing friendships and responding to bullying",
        existing:
          "Building healthy friendships, understanding unkind behaviour, managing conflict and recognising strategies for responding to bullying.",
        connection:
          "Through Social Butterflies, students investigate why people behave unkindly, reflect on their own behaviour and create character cards exploring different forms of bullying, possible motivations and ways to respond.",
        skills: ["Self-Awareness", "Critical Thinking", "Resilience"],
        fit: "Within a Year 7 PSHE unit on friendships and relationships, secondary transition activities or tutor-time provision. Social Butterflies is structured as a one-day programme with five modules.",
        example: "Social Butterflies: Nastiness & Bullying – Year 7",
        extra: null,
        status: "confirmed",
      },
      post16: {
        summary: "Life decisions, resilience and independence",
        exampleYears: [13],
        eyebrowLabel: null,
        heading: "Preparing for independent life and making decisions",
        existing:
          "Developing personal responsibility, evaluating important choices, reflecting on setbacks and preparing for life beyond school.",
        connection:
          "Through Foundations, students choose a real decision they are facing and work through a structured decision-making template, considering their options, fears and possible outcomes before deciding what to do.",
        skills: ["Decision-Making", "Resilience", "Self-Awareness"],
        fit: "Within Year 13 pastoral programmes, leavers' preparation or existing enrichment provision. The wider Foundations programme also explores bias, commitment and planning for the future.",
        example: "Foundations: How To Make Good Decisions – Year 13",
        extra:
          "Alternative careers example: The Internship: Who's Talking: Interview Skills – Year 12.",
        status: "confirmed",
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
        summary: "Trade, communities and how places change",
        exampleYears: [2],
        eyebrowLabel: null,
        heading: "Trade, imports and our local community",
        existing:
          "Exploring local communities, places around the world and how goods and businesses connect different locations.",
        connection:
          "Through World Of Business, students explore the difference between local and global businesses, investigate where products come from and consider how businesses adapt to different communities. They also explore real examples of imports and exports.",
        skills: ["Problem-Solving", "Critical Thinking", "Creative Thinking"],
        fit: "Within a primary Geography unit on the local area, other countries or trade, as a practical activity connecting places to everyday products and businesses. Modules are approximately 35 minutes.",
        example: "World Of Business: Import Export / Around The World In Business – Year 2",
        extra:
          "Also for History: Work Time Machine: Diving Into History – Year 1, exploring how inventions have changed jobs over time.",
        status: "confirmed",
      },
      secondary: {
        summary: "Urbanisation, sustainability and global challenges",
        exampleYears: [9],
        eyebrowLabel: null,
        heading: "Urbanisation and sustainable cities",
        existing:
          "Understanding how cities grow, the challenges of urbanisation and approaches to creating more sustainable urban environments.",
        connection:
          "Through City Changers, students investigate urban growth and plan a sustainable neighbourhood, considering access to green space, food, employment and everyday services. They apply geographical understanding to a realistic planning challenge.",
        skills: ["Problem-Solving", "Creative Thinking", "Communication"],
        fit: "As an application activity after a Geography unit on urbanisation or sustainable cities, or within a wider sustainability project. The module is approximately 50 minutes.",
        example: "City Changers: Solve It: Sustainable Cities – Year 9",
        extra:
          "Another Geography connection: Solve It: World Hunger – Year 7, exploring food insecurity, inequality and climate.",
        status: "confirmed",
      },
      post16: {
        summary: "Politics, economics and society",
        exampleYears: [12],
        eyebrowLabel: null,
        heading: "Political ideas, welfare and government decisions",
        existing:
          "Exploring political ideologies, the role of government and how different societies approach welfare, public spending and social responsibility.",
        connection:
          "Through Utopian Economics, students design an imagined society, make decisions about welfare provision and represent spending choices in a pie chart. They then develop and present policies, respond to questions and evaluate competing approaches.",
        skills: ["Decision-Making", "Critical Thinking", "Communication"],
        fit: "Within relevant Politics, Economics or Sociology teaching on political ideas and public policy, or as a Post-16 interdisciplinary enrichment activity. The programme includes six modules.",
        example: "Utopian Economics: Going Without / Vote For Utopia – Year 12",
        extra: null,
        status: "confirmed",
      },
    },
  },
];
