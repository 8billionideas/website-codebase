export type PillarInteraction = "carousel" | "single" | "brief" | "none";

export interface PillarModule {
  heading: string;
  description: string;
}

export interface PillarExample {
  course: string;
  // Year/stage tag, e.g. "Year 7" — omitted when not known yet.
  stage?: string;
  overview?: string;
  module?: PillarModule;
  skills?: string[];
  benefits?: string[];
  // True for entries with no source content yet — renders "Detail coming soon"
  // across overview/skills/benefits instead of any of the fields above.
  comingSoon?: boolean;
}

export interface Pillar {
  name: string;
  description: string;
  // "carousel": 2+ examples, opens with prev/next. "single": exactly one
  // example, opens with no carousel controls. "brief": opens showing only
  // the pillar description (no examples yet). "none": not clickable.
  interaction: PillarInteraction;
  examples?: PillarExample[];
  // Shown as a small badge on the card. Only set for interaction "none".
  badge?: string;
}

export const pillars: Pillar[] = [
  {
    name: "Entrepreneurship",
    description:
      "Build initiative, creativity, and the confidence to turn ideas into action.",
    interaction: "carousel",
    examples: [
      {
        course: "Lightbulb Moments",
        stage: "Year 1",
        overview:
          "A creative and hands-on ideas competition that introduces entrepreneurship at a young age, allowing students to explore starting their own business and unlocking exciting ideas.",
        module: {
          heading: "Module 1",
          description:
            "Students learn the key skills and attributes of an entrepreneur, ending with the 'Stone Age' task — building a business model in a time before currency existed.",
        },
        skills: [
          "Confidence in Expressing Ideas",
          "Early Problem-Solving",
          "Foundational Communication",
          "Resilience Through Trial and Error",
        ],
        benefits: [
          "Encourages early confidence and voice",
          "Builds a culture where ideas are valued",
          "Develops positive learning behaviours from the outset",
          "Lays foundations for creative, independent thinking",
        ],
      },
      {
        course: "Green My City",
        overview:
          "Students become eco-innovators on a mission to green our cities — exploring real-world urban issues and designing bold, sustainable solutions.",
        skills: [
          "Risk Awareness",
          "Practical Problem-Solving",
          "Confidence in Responsibility",
          "Clear Communication",
        ],
        benefits: [
          "Strong enrichment for ambitious students",
          "Builds habits linked to high performance",
          "Reduces stress through practical organisation",
          "Reinforces wellbeing and independence",
        ],
      },
      {
        course: "Design The Next Toy Craze",
        stage: "Year 2",
        overview:
          "Students become imaginative product designers, exploring creativity, empathy and design thinking to prototype and pitch playful ideas.",
        module: {
          heading: "Module",
          description:
            "Meet Your First Customer — understanding what customers want at every stage of design.",
        },
        skills: [
          "Creative Problem-Solving",
          "Clear Communication",
          "Resilience in Refinement",
        ],
        benefits: [
          "Strengthens design thinking early",
          "Builds confidence through hands-on making",
          "Encourages collaborative discussion",
          "Reinforces perseverance and iteration",
        ],
      },
      {
        course: "World Of Business",
        overview:
          "Students become international thinkers exploring trade, business and innovation across borders.",
        module: {
          heading: "Module",
          description:
            "Introduction To The World Of Business — discovering what makes businesses similar and different globally.",
        },
        skills: [
          "Analytical Thinking",
          "Problem-Solving",
          "Collaborative Communication",
          "Resilience Through Challenge",
        ],
        benefits: [
          "Develops confidence discussing global concepts",
          "Builds teamwork",
          "Supports curiosity and critical thinking",
          "Broadens understanding of how the world works",
        ],
      },
      {
        course: "Qualified",
        overview:
          "Students uncover the true meaning of being qualified, exploring how qualifications open doors beyond careers.",
        module: {
          heading: "Module",
          description:
            "Be The Expert — exploring how expertise develops through curiosity, practice and reflection.",
        },
        skills: [
          "Self-Reflection & Metacognition",
          "Goal Setting & Progress Tracking",
          "Resilience & Growth Mindset",
          "Curiosity & Independent Learning",
        ],
        benefits: [
          "Shifts mindset from outcomes to progress",
          "Builds confidence through understanding success",
          "Creates a culture of continuous improvement",
          "Turns students into active drivers of their own learning",
        ],
      },
      {
        course: "Grown Up For A Day",
        overview:
          "Students dive into the worlds of work, politics, money and education, designing fresh ideas and solving real problems.",
        module: {
          heading: "Module 2/5",
          description:
            "Politics — learning how politics functions by designing government departments that better serve communities.",
        },
        skills: [
          "Critical Thinking & Decision-Making",
          "Leadership & Influence",
          "Collaboration & Negotiation",
          "Systems Thinking",
        ],
        benefits: [
          "Builds confident communicators",
          "Develops real-world awareness",
          "Encourages active participation",
          "Creates a culture of responsibility and leadership",
        ],
      },
      {
        course: "Dear Future Me",
        overview:
          "Students become architects of their own future through self-leadership, creative thinking and community design.",
        module: {
          heading: "Module 1/6",
          description:
            "Hello Mini Me — developing self-leadership through reflection and confidence-building.",
        },
        skills: [
          "Self-Awareness",
          "Emotional Literacy",
          "Confident Self-Expression",
          "Resilience and Optimism",
        ],
        benefits: [
          "Builds confidence through reflection on strengths and values",
          "Supports emotional literacy at a key transition point",
          "Encourages positive goal-setting",
          "Aligns with wellbeing and pastoral priorities",
        ],
      },
      {
        course: "Startup School",
        overview:
          "Over three immersive days, students shape ideas, build business plans and master pitching.",
        module: {
          heading: "Module 1",
          description:
            "Unlocking the Founder Mindset — discovering entrepreneurial strengths and the mindset needed to start a business.",
        },
        skills: [
          "Resilience Under Scrutiny",
          "Entrepreneurial Thinking",
          "Advanced Communication",
          "Leadership and Collaboration",
        ],
        benefits: [
          "Strong enrichment for ambitious students",
          "Develops public speaking and structured argument",
          "Creates portfolio-quality artefacts",
          "Aligns with future pathways in business and innovation",
        ],
      },
      {
        course: "Charity Founders",
        overview:
          "Students discover how to choose meaningful causes, build campaigns and launch real-world fundraisers.",
        module: {
          heading: "Module 1",
          description:
            "What Cause? — identifying a cause aligned with personal values.",
        },
        skills: [
          "Ethical Decision-Making",
          "Persuasive Communication",
          "Collaborative Leadership",
          "Strategic Problem-Solving",
        ],
        benefits: [
          "Aligns with service learning and social responsibility",
          "Develops empathetic, credible communicators",
          "Enhances school culture around active citizenship",
          "Supports character education",
        ],
      },
      {
        course: "Business Code Red",
        comingSoon: true,
      },
    ],
  },
  {
    name: "Careers",
    description:
      "Help students explore pathways, purpose, and the fast-changing world of work.",
    interaction: "carousel",
    examples: [
      {
        course: "The Internship",
        stage: "Flagship",
        overview:
          "A professional simulation designed for every career path — students master universal skills required in Healthcare, Engineering, Law and the Arts, building a tangible portfolio.",
        skills: [
          "Crisis Management & Resilience",
          "High-Stakes Communication",
          "Project Management",
          "Strategic Persuasion & Data Literacy",
          "Collaborative Leadership",
          "Data & Operational Literacy",
          "Rapid Prototyping & Innovation",
          "Professional Self-Awareness",
        ],
        benefits: [
          "A Bespoke Career Passport tailored to the student's chosen industry",
          "Demonstrable mastery of high-pressure problem-solving",
          "UK-regulated NOCN certification for university applications",
          "A professional \"Evidence Pack\" for interviews",
          "Transferable mastery of the universal \"Workplace OS\"",
        ],
      },
      {
        course: "Career Explorers",
        overview:
          "Students step into exciting roles — from theme park designers to alien communicators — using creativity and problem-solving.",
        module: {
          heading: "Module",
          description:
            "Theme Park Imagineer — designing a thrilling, imaginative park.",
        },
        skills: [
          "Early Problem-Solving",
          "Creativity",
          "Foundational Collaboration",
          "Self-Management",
        ],
        benefits: [
          "Strengthens communication by turning ideas into structured outputs",
          "Creates a culture where ideas are explored",
          "Embeds creativity across year groups",
          "Develops resilience through problem-solving",
        ],
      },
      {
        course: "Career To Shape The Future",
        stage: "Year 8",
        overview:
          "Students dive into data science, AI, cybersecurity and health tech through hands-on challenges.",
        module: {
          heading: "Module 1/6",
          description:
            "Data Science 101: Storytelling — analysing and visualising data to communicate insights.",
        },
        skills: [
          "Analytical Thinking",
          "Storytelling With Evidence",
          "Problem-Solving",
          "Creative Confidence",
        ],
        benefits: [
          "Early exposure to future-focused disciplines",
          "Encourages curiosity around emerging careers",
          "Positions the school as forward-thinking",
          "Develops confidence navigating uncertainty",
        ],
      },
      {
        course: "Hire Me",
        overview:
          "Students guide themselves through essential skills like networking, building an online presence and mastering workplace communication.",
        module: {
          heading: "Module 1/6",
          description:
            "Networking — connecting authentically and building professional relationships.",
        },
        skills: [
          "Professional Self-Presentation",
          "Confident Communication",
          "Critical Self-Reflection",
          "Resilience in Selection Processes",
        ],
        benefits: [
          "Prepares students for work experience and Sixth Form opportunities",
          "Strengthens confidence in high-stakes conversations",
          "Provides tangible outputs (CVs, profiles, interview experience)",
          "Supports long-term careers outcomes",
        ],
      },
      {
        course: "Career Starter Pack",
        skills: [
          "Career Self-Awareness",
          "Creative Communication",
          "Problem-Solving",
          "Resilience Under Challenge",
        ],
        benefits: [
          "Builds early careers literacy without premature specialisation",
          "Reinforces a growth mindset",
          "Provides visible evidence of initiative",
          "Strengthens transition readiness into KS4",
        ],
      },
      {
        course: "Learning About the Machine",
        overview:
          "Students dive into the rapidly evolving world of artificial intelligence, exploring how AI enhances productivity and shapes the future of work.",
      },
    ],
  },
  {
    name: "Financial Literacy",
    description:
      "Give students the knowledge to manage money, risk, and real-world decisions.",
    interaction: "carousel",
    examples: [
      {
        course: "Utopian Economics",
        overview:
          "Students become global change makers, exploring how economic values shape nations — building fictional economies rooted in real-world concepts.",
        module: {
          heading: "Module",
          description:
            "Labour Market Analysis — using real labour market data to make policy decisions.",
        },
        skills: [
          "Economic & Systems Thinking",
          "Critical Analysis & Decision Making",
          "Debate, Communication & Persuasion",
          "Creative Problem Solving & Innovation",
        ],
        benefits: [
          "Connects classroom learning to global economic issues",
          "Enhances analytical thinking and strategic reasoning",
          "Inspires critical thinking about fairness and policy impact",
        ],
      },
      {
        course: "Secret and Safe",
        stage: "Year 3",
        overview:
          "Students build awareness of personal security, both physical and digital, designing safety solutions.",
        module: {
          heading: "Module 1/6",
          description:
            "What's Security? — exploring why protecting personal belongings matters.",
        },
        skills: [
          "Risk Awareness",
          "Practical Problem-Solving",
          "Confidence in Responsibility",
          "Clear Communication",
        ],
        benefits: [
          "Builds confidence managing personal safety",
          "Reinforces responsible decision-making",
          "Develops practical problem-solving",
          "Supports safeguarding and early financial literacy",
        ],
      },
      {
        course: "Demystifying Money",
        stage: "Year 7",
        comingSoon: true,
      },
    ],
  },
  {
    name: "Wellbeing",
    description:
      "Develop emotional resilience, self-awareness, and healthy habits that last a lifetime.",
    interaction: "carousel",
    examples: [
      {
        course: "Heart and Mind",
        overview:
          "Students design a personal mental health journal, learning to express emotions and challenge negative thoughts using real psychological tools.",
        module: {
          heading: "Module",
          description:
            "Challenging — identifying and challenging negative thinking patterns through CBT.",
        },
        skills: ["Self-Awareness", "Emotional Regulation", "Resilience", "Self-Management"],
      },
      {
        course: "Storytellers",
        stage: "Year 2",
        comingSoon: true,
      },
    ],
  },
  {
    name: "Performance",
    description:
      "Equip students with the mindset and discipline to perform under pressure.",
    interaction: "carousel",
    examples: [
      {
        course: "Work Smart",
        overview:
          "Students design personalised productivity systems using vision boards, task management tools and time management techniques.",
        module: {
          heading: "Module 1/6",
          description:
            "Productivity: Goals — defining the purpose behind working smarter.",
        },
        skills: [
          "Self-Management & Organisation",
          "Clear Communication",
          "Problem-Solving Efficiency",
          "Goal-Setting & Prioritisation",
        ],
        benefits: [
          "Directly supports GCSE and Sixth Form performance",
          "Builds habits linked to high-performing students",
          "Reduces stress through organisation",
          "Reinforces wellbeing and independence",
        ],
      },
      {
        course: "Be Remarkable 2.0",
        overview:
          "A personal performance and reflection programme challenging students to improve in an area that matters most to them.",
        module: {
          heading: "Module",
          description:
            "Project Management — how successful projects are structured, planned and delivered.",
        },
        skills: ["Self-Reflection", "Leadership", "Accountability", "Resilience"],
      },
    ],
  },
  {
    name: "Leadership",
    description:
      "Grow communication, decision-making, and the ability to positively influence others.",
    interaction: "carousel",
    examples: [
      {
        course: "Leadership Styles",
        overview:
          "Students explore how effective leaders communicate, make decisions and respond under pressure.",
        module: {
          heading: "Module",
          description:
            "Navigating Bad Times — how leaders stay calm and make decisions under pressure.",
        },
        skills: ["Leadership", "Communication", "Decision-Making", "Social Skills"],
      },
      {
        course: "Positive Arguments",
        overview:
          "A fast-paced debate and communication experience helping students express opinions and navigate disagreement productively.",
        module: {
          heading: "Module",
          description: "The Digital Debate — critical thinking in online discussions.",
        },
        skills: ["Communication", "Critical Thinking", "Active Listening", "Digital Citizenship"],
      },
      {
        course: "Take the Stage",
        comingSoon: true,
      },
    ],
  },
  {
    name: "Sustainability",
    description:
      "Inspire students to think critically about the planet and act on meaningful change.",
    interaction: "none",
  },
  {
    name: "Technology",
    description:
      "Help learners understand, question, and use technology with purpose and confidence.",
    interaction: "none",
  },
];
