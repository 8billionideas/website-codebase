// /curriculum-mapping Lesson explorer. Generated from "8billionideas_Lesson_Explorer_Developer_Copy_QA_Refined.docx".
// Titles, descriptions and notes are copied exactly from the document (including its spacing and
// capitalisation) – don't edit them here without a matching change to the source document.
// The document's internal-only sections (curriculum decisions, editorial QA) are not imported.

import { currentPillarName, type LegacyPillarName, type PillarName } from "@/content/curriculumMapping";

export interface Lesson {
  number: number;
  title: string;
  description: string;
}

export interface LessonGroup {
  number: number;
  title: string;
  description: string;
  // As written in the document, e.g. "3 lessons".
  lessons: string;
}

interface ProgrammeBase {
  year: number;
  // Programmes for the Performance pillar are still keyed "Health & Performance" (its earlier
  // name); getPublishedProgramme maps it to the current name.
  pillar: PillarName | LegacyPillarName;
  // Display name (internal notes in brackets removed).
  name: string;
  // The document's heading, where it differs from the display name.
  sourceName?: string;
}

// "STANDARD · N lessons": the original platform lessons, in order.
export interface StandardProgramme extends ProgrammeBase {
  type: "standard";
  lessons: Lesson[];
}

// "GROUPED OVERVIEW": thematic website groups summarising a longer programme.
export interface GroupedProgramme extends ProgrammeBase {
  type: "grouped";
  sourceLessonCount: number;
  groups: LessonGroup[];
  presentationNote: string | null;
}

// "STANDARD — PROPOSED SIX-PART WEBSITE SEQUENCE": needs curriculum confirmation. Hidden
// behind SHOW_PROPOSED_SEQUENCES; internalNote is never displayed.
export interface ProposedProgramme extends ProgrammeBase {
  type: "proposed";
  lessons: Lesson[];
  internalNote: string;
}

export type Programme = StandardProgramme | GroupedProgramme | ProposedProgramme;

// Proposed six-part sequences stay hidden ("Programme details coming soon") until sign-off.
export const SHOW_PROPOSED_SEQUENCES = false;

// A year and (available) pillar with no programme in this data yet is a "Coming soon" slot: its pill
// is clickable with a small "Coming soon" label and opens "Programme details coming soon". No
// programme titles are invented for these slots.
export const SHOW_MISSING_AS_COMING_SOON = true;

// Year/pillar slots with two documented programmes: only the published one is shown.
export const PUBLISHED_SELECTIONS: {
  year: number;
  pillar: PillarName;
  published: string;
  alternative: string;
}[] = [
  { year: 10, pillar: "Wellbeing", published: "Laser Focus", alternative: "Work Smart" },
  { year: 13, pillar: "Wellbeing", published: "Foundations", alternative: "Heart And Mind" },
];

export const lessonExplorerSection = {
  eyebrow: "LESSON EXPLORER",
  headingLine1: "Each pillar is built into a clear sequence",
  headingLine2: "of lessons for every year group.",
  intro: "Choose a year group and pillar to explore how the learning builds from one lesson to the next.",
  yearLabel: "YEAR GROUP",
  gradeLabel: "GRADE",
  pillarLabel: "PILLAR",
  comingSoonLabel: "Coming soon",
  groupedOverview: (sourceLessonCount: number, groupCount: number) =>
    `Programme overview · ${sourceLessonCount} lessons in ${groupCount} themes`,
  proposed: {
    heading: "Programme details coming soon",
    pre: "We're finalising the lesson sequence for this programme. ",
    linkLabel: "Get in touch",
    post: " to find out more.",
  },
  // A "Coming soon" slot (no programme for this year and pillar yet).
  missing: {
    heading: "Programme details coming soon",
    pre: (pillar: string) => `We're finalising the ${pillar} programme for this year group. `,
    linkLabel: "Get in touch",
    post: " to find out more.",
  },
};

export const programmes: Programme[] = [
  // Year 1
  {
    year: 1,
    pillar: "Entrepreneurship",
    name: "Lightbulb Moments",
    type: "standard",
    lessons: [
      { number: 1, title: "What Makes An Entrepreneur?", description: "Discover entrepreneurial qualities and recognise what makes you unique." },
      { number: 2, title: "Lightbulb Moments", description: "Generate imaginative business ideas and choose one to develop." },
      { number: 3, title: "Concept To Prototype", description: "Bring your business idea to life through hands-on prototyping." },
      { number: 4, title: "Creating The Trailer", description: "Create a trailer that introduces and promotes your prototype." },
      { number: 5, title: "Showcase", description: "Present your idea and prototype in a final competition." },
    ],
  },
  {
    year: 1,
    pillar: "Careers",
    name: "Work Time Machine",
    type: "standard",
    lessons: [
      { number: 1, title: "Year 1: Work Time Machine Challenge", description: "Explore different jobs and discover how interests connect to skills." },
      { number: 2, title: "Diving Into History", description: "Travel through time to discover how jobs have changed." },
      { number: 3, title: "Incredible People", description: "Meet inspiring figures and connect different jobs with careers." },
      { number: 4, title: "Stone Age Travellers", description: "Solve imaginary Stone Age challenges and create a job advert." },
      { number: 5, title: "Future Job Maker", description: "Imagine life in 2160 and invent a future career." },
      { number: 6, title: "Work Time Machine: Showcase", description: "Present your imagined jobs from the past and future." },
    ],
  },
  // Leadership: from the Leadership master (November 2026).
  {
    year: 1,
    pillar: "Leadership",
    name: "Shoulders of Giants",
    type: "standard",
    lessons: [
      { number: 1, title: "What Makes a Great Leader?", description: "Explore qualities that make people effective and inspiring leaders." },
      { number: 2, title: "Respect in Action", description: "Understand respect and its importance in everyday relationships." },
      { number: 3, title: "Speaking Up for Yourself", description: "Practise expressing ideas and speaking confidently for yourself." },
      { number: 4, title: "What Makes a Team?", description: "Identify qualities that help people work together." },
      { number: 5, title: "Sharing Ideas", description: "Discuss different viewpoints and practise listening to others." },
      { number: 6, title: "Planning a Leadership Field Trip", description: "Plan a field trip inspired by an influential figure." },
    ],
  },
  {
    year: 1,
    pillar: "Wellbeing",
    name: "Wonderful Me, Amazing You",
    type: "standard",
    lessons: [
      { number: 1, title: "Wonderful Me, Amazing You: Self-Esteem", description: "Explore personal strengths and celebrate them through a creative collage." },
      { number: 2, title: "Wonderful Me, Amazing You: Self-Respect", description: "Understand self-respect and practise recognising when to say no." },
      { number: 3, title: "Wonderful Me, Amazing You: Compassion", description: "Discover everyday ways to show kindness and care for others." },
      { number: 4, title: "Wonderful Me, Amazing You: Empathy", description: "Explore different perspectives and develop empathy through role play." },
      { number: 5, title: "Wonderful Me, Amazing You: Showcase", description: "Work together to perform an original play about kindness." },
    ],
  },
  {
    year: 1,
    pillar: "Financial Literacy",
    name: "Money Doesn't Grow On Trees",
    type: "standard",
    lessons: [
      { number: 1, title: "Coins, Notes and Numbers", description: "Explore, compare and design different coins and banknotes." },
      { number: 2, title: "Where Money Comes From:  Earning", description: "Sort examples of earning and not earning money." },
      { number: 3, title: "Where Money Comes From: Gifts", description: "Explore how money can be received as gifts." },
      { number: 4, title: "Where Money Comes From: Luck", description: "Investigate luck, chance and fairness through an interactive bingo game." },
      { number: 5, title: "Money Trees Project", description: "Create artwork that contributes to a collaborative classroom money tree." },
      { number: 6, title: "Showcase", description: "Bring together and present your class money tree display." },
    ],
  },
  // Year 2
  {
    year: 2,
    pillar: "Entrepreneurship",
    name: "World Of Business",
    type: "standard",
    lessons: [
      { number: 1, title: "Introduction To The World Of Business", description: "Adapt business ideas for South Korea, Iceland and Australia." },
      { number: 2, title: "Around The World In Business", description: "Compare local and global businesses and adapt them." },
      { number: 3, title: "Import Export", description: "Discover where products come from through import and export." },
      { number: 4, title: "Final Project Session 1", description: "Choose a project and sketch initial ideas for its development." },
      { number: 5, title: "Final Project Session 2", description: "Make posters, shopfronts or stalls for the showcase." },
      { number: 6, title: "World Of Business: Showcase", description: "Present completed projects and share your ideas with classmates." },
    ],
  },
  {
    year: 2,
    pillar: "Careers",
    name: "Eating The Frog",
    type: "standard",
    lessons: [
      { number: 1, title: "Sticker Quest", description: "Explore 'eating the frog' and make a reward chart." },
      { number: 2, title: "Song Time", description: "Compose a song to make a chore fun." },
      { number: 3, title: "Routine Olympics", description: "Design imaginative Routine Olympics games that make everyday chores enjoyable." },
      { number: 4, title: "Game App", description: "Design a game app that makes everyday chores more engaging." },
      { number: 5, title: "Invention", description: "Prototype an invention, such as a robotic hand." },
      { number: 6, title: "Eating The Frog: Showcase", description: "Demonstrate your favourite project and explain how it works." },
    ],
  },
  // Leadership: from the Leadership master (November 2026).
  {
    year: 2,
    pillar: "Leadership",
    name: "Badge of Honour",
    type: "standard",
    lessons: [
      { number: 1, title: "Who Inspires Us?", description: "Identify people who inspire others through their actions." },
      { number: 2, title: "What Makes Someone Inspiring?", description: "Explore qualities and actions that make people inspiring." },
      { number: 3, title: "Communication in Teams", description: "Discover how teams share information and work together." },
      { number: 4, title: "Building a Team", description: "Explore team roles and the strengths people bring." },
      { number: 5, title: "Making Your Case", description: "Practise building an argument and explaining your reasoning." },
      { number: 6, title: "Create Your Dream Team", description: "Choose team members and explain how they work together." },
    ],
  },
  {
    year: 2,
    pillar: "Wellbeing",
    name: "Storytellers",
    type: "standard",
    lessons: [
      { number: 1, title: "Storytelling Together", description: "Play story circle games to build stories together." },
      { number: 2, title: "Creating Characters", description: "Create an original story character and bring them to life through drawing." },
      { number: 3, title: "Story Types", description: "Compare different story genres and choose one for your story." },
      { number: 4, title: "Building A Story", description: "Plan and write a beginning, middle and end." },
      { number: 5, title: "Creating The Cover", description: "Design an original cover and assemble your completed storybook." },
      { number: 6, title: "Storytellers: Showcase", description: "Read their storybook aloud and share with peers." },
    ],
  },
  {
    year: 2,
    pillar: "Financial Literacy",
    name: "A Recipe For Success",
    type: "standard",
    lessons: [
      { number: 1, title: "Module 1: Needs And Wants", description: "Tell needs from wants and design a cake." },
      { number: 2, title: "Module 2: Saving For A Rainy Day", description: "Explore reasons people save money for the future." },
      { number: 3, title: "Module 3: Making Good Money Choices", description: "Decide whether to spend or save in scenarios." },
      { number: 4, title: "Module 4: Can You Budget?", description: "Make thoughtful spending choices while working within a shopping budget." },
      { number: 5, title: "Module 5: Selling And Earning", description: "Explore how people earn and plan class earning." },
      { number: 6, title: "Module 6: The Bake Sale", description: "Design a bake sale and reflect on money." },
    ],
  },
  // Year 3
  {
    year: 3,
    pillar: "Entrepreneurship",
    name: "Design The Next Toy Craze",
    type: "standard",
    lessons: [
      { number: 1, title: "Playtime: Design The Next Toy Craze", description: "Explore the toy industry and sketch an original toy idea." },
      { number: 2, title: "Meet Your First Customer: The Power of Profiles", description: "Build customer profiles to understand who the toy is for." },
      { number: 3, title: "Concept To Prototype", description: "Turn a toy concept into a prototype from recyclables." },
      { number: 4, title: "Art Of The Pitch", description: "Discover what makes a strong pitch and practise their own." },
      { number: 5, title: "Showcase", description: "Pitch and demonstrate toy prototypes in the final showcase." },
    ],
  },
  {
    year: 3,
    pillar: "Careers",
    name: "Hireable Hobbies",
    type: "standard",
    lessons: [
      { number: 1, title: "World Of Hobbies", description: "Explore hobbies from around the world at country stations." },
      { number: 2, title: "Historical Hobbies", description: "Imagine hobbies in past eras through a time-travel task." },
      { number: 3, title: "What I Would Love Doing", description: "Invent a future hobby club and design its poster." },
      { number: 4, title: "Bring Your Hobby To Class", description: "Tell their hobby story to classmates using show-and-tell props." },
      { number: 5, title: "The Great Hobby Swap!", description: "Teach a partner their hobby and learn theirs." },
      { number: 6, title: "Demo Day", description: "Demonstrate a partner's hobby in pairs to the class." },
    ],
  },
  // Leadership: from the Leadership master (November 2026).
  {
    year: 3,
    pillar: "Leadership",
    name: "Escape Room",
    type: "standard",
    lessons: [
      { number: 1, title: "The People Behind a Team", description: "Explore how different people contribute to successful teamwork." },
      { number: 2, title: "The Qualities of a Leader", description: "Identify leadership qualities that help groups solve problems." },
      { number: 3, title: "Giving and Receiving Feedback", description: "Practise sharing constructive feedback and responding to others." },
      { number: 4, title: "Working Better Together", description: "Explore how cooperation helps teams complete shared challenges." },
      { number: 5, title: "Making Decisions as a Team", description: "Share ideas, listen and agree on decisions together." },
      { number: 6, title: "Design Your Escape Room", description: "Develop an escape room concept using teamwork and creativity." },
    ],
  },
  {
    year: 3,
    pillar: "Wellbeing",
    name: "Act It!",
    type: "standard",
    lessons: [
      { number: 1, title: "The Performing Arts", description: "Explore performing arts benefits through improvised skits on issues." },
      { number: 2, title: "Friendships And Relationships", description: "Explore friendship and perform group sketches about it." },
      { number: 3, title: "Sleep And Screens", description: "Explore healthy sleep and screen habits through improvised sketches." },
      { number: 4, title: "Change And Adapt", description: "Create sketches giving advice about coping with change." },
      { number: 5, title: "What's The Script?", description: "Explore script-writing basics and write a short group script." },
      { number: 6, title: "The Film Festival: Showcase", description: "Perform original drama pieces and share your work with others." },
    ],
  },
  {
    year: 3,
    pillar: "Financial Literacy",
    name: "Mission Hide And Seek",
    type: "standard",
    lessons: [
      { number: 1, title: "What Is Security?", description: "Discover what security means and how to protect belongings." },
      { number: 2, title: "My Money Box", description: "Design a money box to keep your savings secure." },
      { number: 3, title: "Keeping It Safe", description: "Compare safes and money boxes, then design a safe." },
      { number: 4, title: "Digital Security Squad", description: "Create strong passwords and PINs to stay safe online." },
      { number: 5, title: "My Personal Pin", description: "Design an object protected by a strong PIN code." },
      { number: 6, title: "Mission Hide And Seek", description: "Design and present a house built around practical security ideas." },
    ],
  },
  // Year 4
  {
    year: 4,
    pillar: "Entrepreneurship",
    name: "Awareness Aces",
    type: "standard",
    lessons: [
      { number: 1, title: "Awareness Aces: Creating Awareness", description: "Explore how organisations raise awareness for good causes." },
      { number: 2, title: "Awareness Aces: Sponsor Challenge", description: "Assess sponsor challenges and design one for a cause." },
      { number: 3, title: "Awareness Aces: Word Of Mouth", description: "Use word of mouth and promotional materials to spread awareness." },
      { number: 4, title: "Awareness Aces: Creating A Pledge", description: "Design a pledge activity for a cause they value." },
      { number: 5, title: "Awareness Aces: Testing Traction", description: "Present pledges and challenges to win class traction tokens." },
    ],
  },
  {
    year: 4,
    pillar: "Careers",
    name: "Grown Up For A Day",
    type: "standard",
    lessons: [
      { number: 1, title: "Grown Up For A Day: Work", description: "Explore what makes work happy and redesign a workplace." },
      { number: 2, title: "Grown Up For A Day: Money", description: "Explore how banks work and design their own currency." },
      { number: 3, title: "Grown Up For A Day: Civics", description: "Explore how politics works and design government departments." },
      { number: 4, title: "Grown Up For A Day: Education", description: "Compare education systems and design their dream school." },
      { number: 5, title: "Grown Up For A Day: Showcase", description: "Present their best grown-up idea in a show and tell." },
    ],
  },
  // Leadership: from the Leadership master (November 2026).
  {
    year: 4,
    pillar: "Leadership",
    name: "Curve Balls",
    type: "standard",
    lessons: [
      { number: 1, title: "Understanding Your Market", description: "Explore how audiences perceive a brand and its message." },
      { number: 2, title: "Reflect and Respond", description: "Consider market feedback and adapt your response." },
      { number: 3, title: "Responding to a Crisis", description: "Develop and communicate a solution when challenges arise." },
      { number: 4, title: "Seizing Opportunities", description: "Practise making decisive choices when opportunities emerge." },
      { number: 5, title: "Evaluating Threats", description: "Assess potential threats and explore flexible responses." },
      { number: 6, title: "The Growth Journey Showcase", description: "Present how your brand adapts to changing challenges." },
    ],
  },
  {
    year: 4,
    pillar: "Wellbeing",
    name: "Culture Explorers",
    type: "standard",
    lessons: [
      { number: 1, title: "A World To Discover", description: "Explore what culture means and agree a class contract." },
      { number: 2, title: "What's Your Cultural Identity?", description: "Reflect on their own cultural identity and background." },
      { number: 3, title: "What Makes Us The Same?", description: "Discover traditions and games that connect people across different cultures." },
      { number: 4, title: "Examples And Inspiration", description: "Examine cultural products and plan contributions to a class gallery." },
      { number: 5, title: "Time To Explore", description: "Research a chosen culture in groups for the showcase." },
      { number: 6, title: "The Cultural Gallery", description: "Present cultural projects in a class gallery showcase." },
    ],
  },
  {
    year: 4,
    pillar: "Financial Literacy",
    name: "Credit And Debit",
    type: "standard",
    lessons: [
      { number: 1, title: "An Introduction", description: "Define credit and debit and sort everyday examples." },
      { number: 2, title: "Good and Bad Habits", description: "Compare helpful and risky habits when managing everyday money." },
      { number: 3, title: "Needs, Wants, and Savings", description: "Prioritise needs, wants and savings when managing money." },
      { number: 4, title: "Who Is It For?", description: "Explore different customers when developing an idea for a financial product." },
      { number: 5, title: "Knowledge Is Power!", description: "Design a leaflet for a new credit card product." },
      { number: 6, title: "Showcase", description: "Present team credit card leaflets in the final showcase." },
    ],
  },
  {
    year: 4,
    pillar: "Health & Performance",
    name: "Grow Together 1.0",
    type: "grouped",
    sourceLessonCount: 12,
    groups: [
      { number: 1, title: "Body Awareness & Healthy Habits", description: "Discover how hygiene, body awareness and healthy choices support wellbeing.", lessons: "3 lessons" },
      { number: 2, title: "Nutrition & Movement", description: "Explore balanced eating, physical activity and the importance of hydration.", lessons: "3 lessons" },
      { number: 3, title: "Mindset & Personal Growth", description: "Understand stress, practise new skills and recognise your personal strengths.", lessons: "3 lessons" },
      { number: 4, title: "Teamwork & Reflection", description: "Explore kindness, teamwork and reflect on your developing healthy habits.", lessons: "3 lessons" },
    ],
    presentationNote: null,
  },
  // Year 5
  {
    year: 5,
    pillar: "Entrepreneurship",
    name: "Green My City",
    type: "standard",
    lessons: [
      { number: 1, title: "What Makes An Entrepreneur?", description: "Identify entrepreneurial skills and invent a Stone Age business." },
      { number: 2, title: "Pinpointing Problems", description: "Identify a sustainability challenge affecting cities and consider possible solutions." },
      { number: 3, title: "Concept To Prototype", description: "Prototype a sustainable solution using design thinking and recyclables." },
      { number: 4, title: "Art Of The Pitch", description: "Practise how to pitch their prototype for the Showcase." },
      { number: 5, title: "Showcase", description: "Present your sustainable prototype and explain how your idea developed." },
    ],
  },
  {
    year: 5,
    pillar: "Careers",
    name: "Qualified",
    type: "standard",
    lessons: [
      { number: 1, title: "Process Vs Product", description: "Explore process versus product learning through a straw-building challenge." },
      { number: 2, title: "Be The Expert", description: "Map personal passions to see themselves as an expert." },
      { number: 3, title: "Make The Certificate", description: "Design a certificate for their own team-created qualification." },
      { number: 4, title: "Create The Study Guide", description: "Write a study guide and test for their peers." },
      { number: 5, title: "Take The Test", description: "Sit their peers' tests to earn their qualification." },
      { number: 6, title: "Graduation Ceremony", description: "Celebrate by awarding certificates in a graduation ceremony." },
    ],
  },
  // Leadership: from the Leadership master (November 2026).
  {
    year: 5,
    pillar: "Leadership",
    name: "Treasure Island",
    type: "standard",
    lessons: [
      { number: 1, title: "Leadership Through the Team’s Eyes", description: "Explore how team members perceive and respond to leaders." },
      { number: 2, title: "Earning and Showing Respect", description: "Explore how leaders build respect through their actions." },
      { number: 3, title: "Communicating Your Ideas", description: "Practise explaining ideas clearly and confidently to others." },
      { number: 4, title: "The Art of Delegation", description: "Explore how leaders share responsibilities across a team." },
      { number: 5, title: "Understanding Team Strengths", description: "Evaluate team strengths and identify areas for improvement." },
      { number: 6, title: "Leading Through Challenges", description: "Consider how leaders respond when situations become difficult." },
    ],
  },
  {
    year: 5,
    pillar: "Wellbeing",
    name: "Express It!",
    type: "standard",
    lessons: [
      { number: 1, title: "Creating The Concept", description: "Explore curation basics and choose an exhibition theme." },
      { number: 2, title: "My Art Collection", description: "Research and select artworks that fit their theme." },
      { number: 3, title: "Curation And Flow", description: "Develop a clear storyline that brings your art exhibition together." },
      { number: 4, title: "Describing", description: "Write compelling descriptions for each artwork and the exhibition." },
      { number: 5, title: "Winning That Bid", description: "Prepare and rehearse a bid for museum space." },
      { number: 6, title: "The World Museum: Showcase", description: "Present your curated art exhibition and explain your team’s choices." },
    ],
  },
  {
    year: 5,
    pillar: "Financial Literacy",
    name: "Interest-ing",
    type: "standard",
    lessons: [
      { number: 1, title: "Interest-ing: Why We Save", description: "Explore why people save and set a savings goal." },
      { number: 2, title: "Interest-ing: Understanding Savings Accounts", description: "Explore how savings accounts work and earn interest." },
      { number: 3, title: "Interest-ing: Good And Bad Interest", description: "Compare interest earned on savings with interest on borrowing." },
      { number: 4, title: "Interest-ing: Planning Your Nest Egg", description: "Develop a savings plan and prepare a pitch." },
      { number: 5, title: "Interest-ing: Making Your Nest Egg", description: "Create a nest egg craft sharing savings knowledge." },
      { number: 6, title: "Interest-ing: The Showcase", description: "Present finished nest egg projects in a class display." },
    ],
  },
  {
    year: 5,
    pillar: "Health & Performance",
    name: "Grow Together 2.0",
    type: "grouped",
    sourceLessonCount: 12,
    groups: [
      { number: 1, title: "Sleep, Nutrition & Healthy Habits", description: "Explore how sleep, food and screen habits influence everyday health.", lessons: "3 lessons" },
      { number: 2, title: "Mindfulness & Wellbeing", description: "Discover the benefits of mindfulness, play and making time for yourself.", lessons: "3 lessons" },
      { number: 3, title: "Perseverance & Personal Growth", description: "Explore individual differences, determination and making thoughtful decisions about challenges.", lessons: "3 lessons" },
      { number: 4, title: "Applying & Reflecting", description: "Apply healthy living knowledge through creative projects and personal reflection.", lessons: "3 lessons" },
    ],
    presentationNote: null,
  },
  // Year 6
  {
    year: 6,
    pillar: "Entrepreneurship",
    name: "Incredible Intrapreneurs",
    type: "standard",
    lessons: [
      { number: 1, title: "What Makes An Entrepreneur?", description: "Explore intrapreneurship and recognise the qualities that help people innovate." },
      { number: 2, title: "Innovate Self", description: "Set SMART goals to develop ideas for your own improvement." },
      { number: 3, title: "Innovate Home", description: "Use intrapreneurial ideas to improve their home environment." },
      { number: 4, title: "Innovate Community", description: "Apply intrapreneurial thinking to suggest improvements in your community." },
      { number: 5, title: "Innovate School", description: "Prepare a classroom innovation idea for a school contest." },
      { number: 6, title: "Incredible Intrapreneurs: Showcase", description: "Present your improvement proposals and gather feedback from classmates." },
    ],
  },
  {
    year: 6,
    pillar: "Careers",
    name: "Career Explorers",
    type: "standard",
    lessons: [
      { number: 1, title: "Theme Park Imagineer", description: "Design a theme park using creative problem solving." },
      { number: 2, title: "Alien Linguist", description: "Practise communication and problem-solving by decoding an imaginary alien language." },
      { number: 3, title: "Space Travel Agent", description: "Use organisation skills to plan a space holiday." },
      { number: 4, title: "Candy Connoisseur", description: "Take initiative to invent a bestselling sweet treat." },
      { number: 5, title: "Career Explorers: Showcase", description: "Present their favourite career idea in show and tell." },
    ],
  },
  // Leadership: from the Leadership master (November 2026).
  {
    year: 6,
    pillar: "Leadership",
    name: "Campaigners",
    type: "standard",
    lessons: [
      { number: 1, title: "Introducing Campaigns", description: "Discover what campaigns are and who leads them." },
      { number: 2, title: "What Makes a Campaign Memorable?", description: "Explore why certain campaigns inspire attention and action." },
      { number: 3, title: "Communicating a Cause", description: "Examine how campaigns communicate issues to different audiences." },
      { number: 4, title: "Working Towards a Shared Goal", description: "Explore how campaigners cooperate to achieve shared objectives." },
      { number: 5, title: "Why People Campaign", description: "Investigate what motivates people to campaign for change." },
      { number: 6, title: "Choose Your Cause", description: "Identify a cause and develop an idea for campaigning." },
    ],
  },
  {
    year: 6,
    pillar: "Wellbeing",
    name: "Dear Future Me",
    type: "standard",
    lessons: [
      { number: 1, title: "Hello Mini Me", description: "Reflect on past achievements and create a Mini Me poster." },
      { number: 2, title: "R-e-s-p-e-c-t", description: "Recognise their positive qualities and reflect on character." },
      { number: 3, title: "Shoot And Score", description: "Imagine your future and set meaningful goals for five years ahead." },
      { number: 4, title: "Create Your Future", description: "Explore how societies work and design their ideal city." },
      { number: 5, title: "Oh The Places You’ll Go", description: "Explore countries, volunteering and a future to-do list." },
      { number: 6, title: "Dear Future Me: Showcase", description: "Plan a letter to their future self and share it." },
    ],
  },
  {
    year: 6,
    pillar: "Financial Literacy",
    name: "Holiday Money",
    type: "standard",
    lessons: [
      { number: 1, title: "Holiday Money 1: Pick And Mix", description: "Choose a destination and create a holiday leaflet." },
      { number: 2, title: "Holiday Money 2: Meet The Icons", description: "Explore currencies, calculate exchange rates and design banknotes." },
      { number: 3, title: "Holiday Money 3: Discovering Destinations", description: "Research tourist attractions and create an advert for your destination." },
      { number: 4, title: "Module 4: Holiday Armour", description: "Understand travel insurance and write their own policy." },
      { number: 5, title: "Module 5: Project Planners", description: "Budget as a team for a fun seven-day trip." },
      { number: 6, title: "Module 6: Selling Sunshine", description: "Pitch their holiday package in a persuasive speech." },
    ],
  },
  {
    year: 6,
    pillar: "Health & Performance",
    name: "Grow Together 3.0",
    type: "grouped",
    sourceLessonCount: 12,
    groups: [
      { number: 1, title: "Nutrition & Healthy Habits", description: "Explore balanced eating, healthy screen habits and everyday wellbeing choices.", lessons: "3 lessons" },
      { number: 2, title: "Movement & Mindfulness", description: "Discover the benefits of exercise, nature and simple meditation techniques.", lessons: "3 lessons" },
      { number: 3, title: "Mindset & Personal Performance", description: "Explore motivation, concentration and the qualities that help people succeed.", lessons: "3 lessons" },
      { number: 4, title: "Teamwork & Reflection", description: "Investigate teamwork, apply health knowledge and reflect on personal progress.", lessons: "3 lessons" },
    ],
    presentationNote: null,
  },
  // Year 7
  {
    year: 7,
    pillar: "Entrepreneurship",
    name: "Across The Board",
    type: "standard",
    lessons: [
      { number: 1, title: "Research and Ideation", description: "Ideate an original board game and build product design skills." },
      { number: 2, title: "Sustainable Play", description: "Explore sustainable materials for use in board games." },
      { number: 3, title: "Design Evolution and Lo-Fi Prototyping", description: "Bring game ideas to life with a lo-fi prototype." },
      { number: 4, title: "Create your Hi-Fi Prototype", description: "Refine game details and build a hi-fi prototype." },
      { number: 5, title: "Playtesting", description: "Explore user experience by testing games are playable." },
      { number: 6, title: "Showcase", description: "Share final board game designs in the showcase." },
    ],
  },
  {
    year: 7,
    pillar: "Careers",
    name: "Quirky Careers",
    type: "standard",
    lessons: [
      { number: 1, title: "Quirky Careers: Which One Is For You?", description: "Research niche careers and speculate on future jobs." },
      { number: 2, title: "Quirky Careers: Ethical Hacking", description: "Explore ethical hacking and test their own cybersecurity." },
      { number: 3, title: "Quirky Careers: Vertical Farmers", description: "Plan a sustainable future city with vertical farms." },
      { number: 4, title: "Quirky Careers: Robot Technician", description: "Investigate robotics careers and design robots for potential customers." },
      { number: 5, title: "Quirky Careers: Interstellar Entrepreneur", description: "Explore space business and design a commercial space station." },
      { number: 6, title: "Quirky Careers: Showcase", description: "Pitch their team's space station design to judges." },
    ],
  },
  // Leadership: from the Leadership master (November 2026).
  {
    year: 7,
    pillar: "Leadership",
    name: "Social Butterflies",
    type: "standard",
    lessons: [
      { number: 1, title: "Understanding Different Demographics", description: "Explore differences within communities and how groups are represented." },
      { number: 2, title: "Making Everyone Feel Included", description: "Identify ways to include people from different backgrounds." },
      { number: 3, title: "Communicating Across Differences", description: "Practise adapting communication for different people and groups." },
      { number: 4, title: "Inclusive Leadership", description: "Explore how leaders create welcoming and inclusive teams." },
      { number: 5, title: "Evaluating Team Composition", description: "Consider different strengths and perspectives within a team." },
      { number: 6, title: "Responding to Bullying", description: "Explore constructive ways to challenge bullying and exclusion." },
    ],
  },
  {
    year: 7,
    pillar: "Wellbeing",
    name: "Healthy Hype",
    type: "standard",
    lessons: [
      { number: 1, title: "Healthy Hype: Is It To Be Believed?", description: "Assess online health information and create a guidance infographic." },
      { number: 2, title: "Healthy Hype: Media Literacy", description: "Build media literacy by writing and fact-checking fake news." },
      { number: 3, title: "Healthy Hype: Challenging The Myths", description: "Explore why misinformation spreads and build fact-or-fake quizzes." },
      { number: 4, title: "Healthy Hype: Building The Right Conversations", description: "Practise respectful debate when disagreeing about information online." },
      { number: 5, title: "Healthy Hype: Reform For Social Media", description: "Debate social media reform and design a healthier information product." },
      { number: 6, title: "Healthy Hype: Showcase", description: "Present a tech solution for safer online health advice." },
    ],
  },
  // Financial Literacy: supplied separately from the source document (November 2026).
  {
    year: 7,
    pillar: "Financial Literacy",
    name: "Demystifying Money",
    type: "standard",
    lessons: [
      { number: 1, title: "The Concept of Money", description: "Explore money personalities and reflect on your financial attitudes." },
      { number: 2, title: "Moving Out", description: "Make financial decisions when preparing to live independently." },
      { number: 3, title: "Moving Up", description: "Explore everyday expenses and financial responsibilities of independent living." },
      { number: 4, title: "Rainy Days", description: "Discover why saving matters and prepare for unexpected expenses." },
      { number: 5, title: "Risk and Reward", description: "Evaluate financial risks and rewards through practical decisions." },
      { number: 6, title: "Cost and Value", description: "Analyse costs and value when making important financial choices." },
    ],
  },
  {
    year: 7,
    pillar: "Health & Performance",
    name: "Future Frontiers 1.0",
    type: "grouped",
    sourceLessonCount: 12,
    groups: [
      { number: 1, title: "Mindset & Emotional Intelligence", description: "Explore positive thinking, emotional awareness and strategies for building confidence.", lessons: "3 lessons" },
      { number: 2, title: "Resilience & Social Confidence", description: "Develop approaches to overcoming setbacks, managing nerves and building friendships.", lessons: "3 lessons" },
      { number: 3, title: "Healthy Performance Habits", description: "Explore physical activity, outdoor exercise and healthier approaches to rewards.", lessons: "3 lessons" },
      { number: 4, title: "Learning, Reflection & Communication", description: "Investigate health information, share your learning and reflect on progress.", lessons: "3 lessons" },
    ],
    presentationNote: null,
  },
  // Year 8
  {
    year: 8,
    pillar: "Entrepreneurship",
    name: "Business Code Red",
    type: "standard",
    lessons: [
      { number: 1, title: "What Is Consultancy", description: "Explore consultancy and brand their own consultancy firm." },
      { number: 2, title: "The Recruitment Crisis", description: "Analyse today's job market and design an ideal job post." },
      { number: 3, title: "Retaining The Right People", description: "Explore staff retention and propose improvements to workplace culture." },
      { number: 4, title: "Refining The Product", description: "Create a unique selling point and problem statement." },
      { number: 5, title: "Reaching Out To Consumers", description: "Assess customer engagement and design an advert in Canva." },
      { number: 6, title: "Impact Reports", description: "Present recommendations to save Deadzone to a panel." },
    ],
  },
  {
    year: 8,
    pillar: "Careers",
    name: "Careers To Save The World",
    type: "standard",
    lessons: [
      { number: 1, title: "Careers To Save The World: The Problems We Face", description: "Identify global challenges and curate world-saving job posts." },
      { number: 2, title: "Careers To Save The World: Science At The Heart Of It", description: "Research scientific careers tackling the future's biggest challenges." },
      { number: 3, title: "Careers To Save The World: Talking With Robots", description: "Explore AI careers and create speculative job posts." },
      { number: 4, title: "Careers To Save The World: International Development", description: "Explore international development careers and design brand values." },
      { number: 5, title: "Careers To Save The World: The Mother Of Invention", description: "Invent a product that solves a global problem." },
      { number: 6, title: "Careers To Save The World: Showcase", description: "Present their company's world-changing solution to a panel." },
    ],
  },
  // Leadership: from the Leadership master (November 2026).
  {
    year: 8,
    pillar: "Leadership",
    name: "Take The Stage",
    type: "standard",
    lessons: [
      { number: 1, title: "Introducing Yourself with Confidence", description: "Practise introducing yourself clearly and confidently to an audience." },
      { number: 2, title: "Communication Masterclass", description: "Explore techniques for communicating ideas clearly and effectively." },
      { number: 3, title: "Confident Speaking and Debate", description: "Develop confidence when presenting ideas and debating different viewpoints." },
      { number: 4, title: "Create Your TED Talk", description: "Plan and structure an original talk on a chosen topic." },
      { number: 5, title: "Preparing for Your Showcase", description: "Prepare your speech and organise your ideas for presentation." },
      { number: 6, title: "Rehearsing Your Talk", description: "Practise delivery and refine your presentation through rehearsal." },
    ],
  },
  {
    year: 8,
    pillar: "Wellbeing",
    name: "Better Bonds",
    type: "standard",
    lessons: [
      { number: 1, title: "Better Bonds: Bonds For Everyone", description: "Explore Social Bond Theory and design a community festival." },
      { number: 2, title: "Better Bonds: Active Listening", description: "Practise active listening skills through short scripted classroom sketches." },
      { number: 3, title: "Better Bonds: Connections In Learning", description: "Apply Communities of Practice by creating a fictional forum." },
      { number: 4, title: "Better Bonds: Making Memories", description: "Explore deep processing techniques and how they support remembering information." },
      { number: 5, title: "Better Bonds Showcase: A Capsule In Time", description: "Present personal time capsules and give peer feedback." },
    ],
  },
  {
    year: 8,
    pillar: "Financial Literacy",
    name: "Money Minds",
    type: "standard",
    lessons: [
      { number: 1, title: "Backgrounds And Values", description: "Explore how their background shapes their money values." },
      { number: 2, title: "What's Rational? (demo)", description: "Judge, then empathise with, seemingly irrational money decisions." },
      { number: 3, title: "Why Money Is Emotional", description: "Explore how emotions and cognitive biases affect money choices." },
      { number: 4, title: "Fintech Finale", description: "Invent a fintech idea tackling a Money Minds issue." },
      { number: 5, title: "Fintech Idea Pitch And Present", description: "Pitch your original fintech idea and explain the problem it addresses." },
    ],
  },
  {
    year: 8,
    pillar: "Health & Performance",
    name: "Future Frontiers 2.0",
    type: "grouped",
    sourceLessonCount: 12,
    groups: [
      { number: 1, title: "Physical Health & Nutrition", description: "Explore exercise, food and screen habits that influence everyday health.", lessons: "3 lessons" },
      { number: 2, title: "Self-Awareness & Learning", description: "Understand personal behaviours, learning processes and how healthier habits develop.", lessons: "3 lessons" },
      { number: 3, title: "Competition & Performance", description: "Explore sportsmanship, competition and strategies for managing pressure and stress.", lessons: "3 lessons" },
      { number: 4, title: "Applying & Reflecting", description: "Put learning into practice, share ideas and reflect on progress.", lessons: "3 lessons" },
    ],
    presentationNote: null,
  },
  // Year 9
  {
    year: 9,
    pillar: "Entrepreneurship",
    name: "City Changers",
    type: "standard",
    lessons: [
      { number: 1, title: "Solve It: Sustainable Cities", description: "Plan a sustainable city neighbourhood that works for everyone." },
      { number: 2, title: "Brand A City", description: "Create branding for a sustainable city or hometown." },
      { number: 3, title: "Concept To Prototype", description: "Sketch a lo-fi design, then build a hi-fi prototype." },
      { number: 4, title: "Tell The World: Create A Campaign", description: "Create a campaign that makes their hometown more sustainable." },
      { number: 5, title: "Your City", description: "Lobby local representatives to adopt their sustainable idea." },
      { number: 6, title: "Showcase", description: "Present their sustainable city idea, prototype and campaign." },
    ],
  },
  {
    year: 9,
    pillar: "Careers",
    name: "Careers To Shape The Future",
    type: "standard",
    lessons: [
      { number: 1, title: "Data Science 101", description: "Turn data into meaningful stories like data scientists." },
      { number: 2, title: "Amazing Algorithms", description: "Explore how algorithms work and why they matter for AI." },
      { number: 3, title: "Working With AI", description: "Experiment with machine learning and its benefits and problems." },
      { number: 4, title: "The World Of Cybersecurity", description: "Investigate cybersecurity careers through practical challenges that test relevant skills." },
      { number: 5, title: "Health Tech", description: "Explore health technology careers and innovations supporting human performance." },
    ],
  },
  // Leadership: from the Leadership master (November 2026).
  {
    year: 9,
    pillar: "Leadership",
    name: "Personality Power",
    type: "standard",
    lessons: [
      { number: 1, title: "Exploring Different Personalities", description: "Explore how people may differ in personality and behaviour." },
      { number: 2, title: "How Personalities Are Perceived", description: "Consider how different personalities are understood by others." },
      { number: 3, title: "Communicating with Different Personalities", description: "Explore communication approaches for different personality preferences." },
      { number: 4, title: "Working with Different Personalities", description: "Practise collaborating with people who approach tasks differently." },
      { number: 5, title: "Exploring Personality Profiles", description: "Reflect on personality frameworks and their limitations." },
      { number: 6, title: "Understanding Your Personality", description: "Identify personal tendencies and consider their influence on teamwork." },
    ],
  },
  {
    year: 9,
    pillar: "Wellbeing",
    name: "Personal Philosophy",
    type: "standard",
    lessons: [
      { number: 1, title: "What Is Philosophy?", description: "Understand philosophy and apply ideas to life questions." },
      { number: 2, title: "Philosophy: Judge And Explore", description: "Judge different philosophies and apply them to decisions." },
      { number: 3, title: "Create Your Own Philosophy", description: "Create a personal life philosophy to guide decisions." },
      { number: 4, title: "The Forum", description: "Argue and defend their philosophy against peer challengers." },
    ],
  },
  // Financial Literacy: supplied separately from the source document (November 2026).
  {
    year: 9,
    pillar: "Financial Literacy",
    name: "Diverse Dollars",
    type: "standard",
    lessons: [
      { number: 1, title: "Revenue Streams", description: "Explore different ways people earn and generate income." },
      { number: 2, title: "Sowing Seeds", description: "Discover how to maximise income from a single source." },
      { number: 3, title: "Your A Game", description: "Develop income streams based on an original business idea." },
      { number: 4, title: "Talking The Talk", description: "Explore how company values influence workplace incentives." },
      { number: 5, title: "Inspiring Belief", description: "Create an investor pitch to communicate your business idea." },
      { number: 6, title: "Founders", description: "Explore pitch decks and the importance of diversified revenue." },
    ],
  },
  {
    year: 9,
    pillar: "Health & Performance",
    name: "Future Frontiers 3.0",
    type: "grouped",
    sourceLessonCount: 12,
    groups: [
      { number: 1, title: "Fitness & Physical Performance", description: "Explore exercise techniques, strength, flexibility and different approaches to training.", lessons: "4 lessons" },
      { number: 2, title: "Nutrition & Recovery", description: "Investigate food, rest and mindfulness as foundations of healthy performance.", lessons: "3 lessons" },
      { number: 3, title: "Personal Growth & Wellbeing", description: "Explore school transitions, inspiring role models and technology in performance.", lessons: "3 lessons" },
      { number: 4, title: "Reflection & Communication", description: "Reflect on progress, present your learning and practise giving feedback.", lessons: "2 lessons" },
    ],
    presentationNote: null,
  },
  // Year 10
  {
    year: 10,
    pillar: "Entrepreneurship",
    name: "Charity Founders",
    type: "standard",
    lessons: [
      { number: 1, title: "Charity Founders: Finding A Cause", description: "Define a social cause that matters to them." },
      { number: 2, title: "Charity Founders:  Paying It Forward", description: "Investigate how charities operate and support causes through business approaches." },
      { number: 3, title: "Charity Founders: Getting The Word Out", description: "Design a social media strategy for their charity." },
      { number: 4, title: "Charity Founders: Raising The Funds", description: "Build a fundraising strategy for their charity plan." },
      { number: 5, title: "Charity Founders: Launch Day", description: "Present their charity and business plan for feedback." },
    ],
  },
  {
    year: 10,
    pillar: "Careers",
    name: "Career Starter Pack",
    type: "standard",
    lessons: [
      { number: 1, title: "The Job Market", description: "Research and debate how today's job market works." },
      { number: 2, title: "Your CV", description: "Craft a standout CV using a professional template." },
      { number: 3, title: "Interview Skills", description: "Practise responding to interview questions using the STAR method." },
      { number: 4, title: "Respect", description: "Explore the workplace rights and responsibilities of new employees." },
      { number: 5, title: "Build Your Career Starter Pack", description: "Finish and submit their career starter pack guide." },
    ],
  },
  // Leadership: from the Leadership master (November 2026).
  {
    year: 10,
    pillar: "Leadership",
    name: "Positive Arguments",
    type: "standard",
    lessons: [
      { number: 1, title: "Spotting Problems in Arguments", description: "Identify common weaknesses and problems in arguments." },
      { number: 2, title: "Digital Debate", description: "Explore respectful ways to disagree and debate online." },
      { number: 3, title: "Agree to Disagree", description: "Practise responding constructively to disagreements and resolving conflict." },
      { number: 4, title: "The Conflict Resolution Challenge", description: "Apply conflict-resolution approaches to a challenging scenario." },
      { number: 5, title: "Healthy Conflict", description: "Express different perspectives clearly while maintaining respectful discussion." },
    ],
  },
  {
    year: 10,
    pillar: "Wellbeing",
    name: "Laser Focus",
    type: "standard",
    lessons: [
      { number: 1, title: "The Attention Economy", description: "Investigate the attention economy and how digital design influences behaviour." },
      { number: 2, title: "How Focus Works", description: "Test a hypothesis about focus with an experiment." },
      { number: 3, title: "Focus Killers", description: "Identify what kills focus and how to fight back." },
      { number: 4, title: "Laser Focus Challenge", description: "Design an original challenge aimed at strengthening attention and focus." },
      { number: 5, title: "Laser Focus: Showcase", description: "Present their focus challenge in a show and tell." },
    ],
  },
  {
    year: 10,
    pillar: "Financial Literacy",
    name: "Banking Bonus",
    type: "standard",
    lessons: [
      { number: 1, title: "Banking Bonus: What Is Banking?", description: "Explore key banking terms, milestones and smart shopping." },
      { number: 2, title: "Banking Bonus 2: Playing It Smart", description: "Compare bank accounts and learn to improve credit scores." },
      { number: 3, title: "Banking Bonus 3: Banking For You", description: "Compare traditional and digital banking and app design." },
      { number: 4, title: "Banking Bonus 4: Fraud Prevention", description: "Recognise fraud and create top tips to prevent it." },
      { number: 5, title: "Banking Bonus 5: From Cash To Clicks", description: "Select features and design pages for a banking app." },
      { number: 6, title: "Banking Bonus 6: Showcase: Present The App", description: "Pitch their banking app and evaluate peers' designs." },
    ],
  },
  {
    year: 10,
    pillar: "Health & Performance",
    name: "Achieve Anything 1.0",
    type: "grouped",
    sourceLessonCount: 12,
    groups: [
      { number: 1, title: "Mindset & Focus", description: "Explore memory, concentration and how the brain develops new habits.", lessons: "3 lessons" },
      { number: 2, title: "Nutrition & Healthy Habits", description: "Examine food choices, moderation and their influence on everyday performance.", lessons: "2 lessons" },
      { number: 3, title: "Goals & Physical Performance", description: "Apply goal-setting techniques and explore fitness, movement and injury prevention.", lessons: "4 lessons" },
      { number: 4, title: "Ethics, Leadership & Reflection", description: "Investigate sustainability in sport and reflect on your personal progress.", lessons: "3 lessons" },
    ],
    presentationNote: null,
  },
  {
    year: 10,
    pillar: "Wellbeing",
    name: "Work Smart",
    type: "proposed",
    lessons: [
      { number: 1, title: "Productivity: Goals", description: "Set meaningful SMART goals and understand what motivates you." },
      { number: 2, title: "Create a Vision Board", description: "Create a visual representation of your goals and ambitions." },
      { number: 3, title: "Productivity: To-dos and Tasks", description: "Design a personal system for organising tasks and responsibilities." },
      { number: 4, title: "Productivity: Prioritisation", description: "Distinguish urgent from important tasks and prioritise your workload." },
      { number: 5, title: "Productivity: Time Management", description: "Explore time-management techniques and create a practical personal timetable." },
      { number: 6, title: "Do: Work Smart Project", description: "Build and present your own personalised productivity system." },
    ],
    internalNote: "Website grouping: original Showcase is incorporated into Do: Work Smart Project. Original platform has 7 lessons.",
  },
  // Year 11
  {
    year: 11,
    pillar: "Entrepreneurship",
    name: "Startup School",
    type: "grouped",
    sourceLessonCount: 14,
    groups: [
      { number: 1, title: "Discover the Opportunity", description: "Identify real problems and explore how entrepreneurs develop innovative ideas.", lessons: "3 lessons" },
      { number: 2, title: "Build Your Business", description: "Shape your startup through prototyping, customer research and business planning.", lessons: "5 lessons" },
      { number: 3, title: "Explore Funding", description: "Investigate crowdfunding and investment options for developing your startup.", lessons: "2 lessons" },
      { number: 4, title: "Perfect Your Pitch", description: "Develop compelling pitches and practise presenting ideas with confidence.", lessons: "4 lessons" },
    ],
    presentationNote: null,
  },
  {
    year: 11,
    pillar: "Careers",
    name: "Hire Me",
    type: "standard",
    lessons: [
      { number: 1, title: "Networking", description: "Practise introductions and design their own networking event." },
      { number: 2, title: "Professional Presence", description: "Build a professional LinkedIn profile using insider tips." },
      { number: 3, title: "Professional Comms", description: "Explore ego states and practise diplomatic workplace communication." },
      { number: 4, title: "How Hiring Works", description: "Explore how hiring works and roleplay the candidate experience." },
      { number: 5, title: "Interview Skills", description: "Practise interview skills through mock interviews on both sides." },
      { number: 6, title: "Showcase", description: "Present their Hire Me file to demonstrate professionalism." },
    ],
  },
  // Leadership: from the Leadership master (November 2026).
  {
    year: 11,
    pillar: "Leadership",
    name: "Leadership Styles",
    type: "standard",
    lessons: [
      { number: 1, title: "Exploring Leadership Styles", description: "Discover different leadership styles and where they can be effective." },
      { number: 2, title: "Leading with Respect", description: "Explore how respectful leadership supports inclusion and teamwork." },
      { number: 3, title: "Leadership and Conflict", description: "Compare how different leaders approach and resolve conflict." },
      { number: 4, title: "Leadership Lessons from History", description: "Examine how leaders have handled conflicts throughout history." },
      { number: 5, title: "Leading Through Difficult Times", description: "Consider how leaders respond to setbacks and difficult situations." },
      { number: 6, title: "Communicating Your Leadership Style", description: "Practise expressing your leadership approach clearly to others." },
    ],
  },
  {
    year: 11,
    pillar: "Financial Literacy",
    name: "Cryptic Currency",
    type: "standard",
    lessons: [
      { number: 1, title: "Mobile Money", description: "Analyse and compare mobile money apps and their users." },
      { number: 2, title: "Crypto 101", description: "Explain cryptocurrency, blockchain and the risks of investing." },
      { number: 3, title: "Is Art Money?", description: "Explore NFTs, then create and market their own." },
      { number: 4, title: "Digital Dangers", description: "Identify online finance risks and invent safety solutions." },
      { number: 5, title: "Raising Awareness", description: "Create a public service announcement on safe online finance." },
      { number: 6, title: "The Showcase", description: "Present their PSA and reflect on key takeaways." },
    ],
  },
  {
    year: 11,
    pillar: "Health & Performance",
    name: "Achieve Anything 2.0",
    type: "grouped",
    sourceLessonCount: 12,
    groups: [
      { number: 1, title: "Health & Energy", description: "Explore sleep, nutrition and movement to support everyday performance.", lessons: "3 lessons" },
      { number: 2, title: "Critical Thinking & Personal Growth", description: "Evaluate health information and develop self-awareness through reflection and goal-setting.", lessons: "3 lessons" },
      { number: 3, title: "Learning & Communication", description: "Apply active learning strategies and practise resolving disagreements constructively.", lessons: "2 lessons" },
      { number: 4, title: "Body Awareness & Performance", description: "Understand body awareness and design exercises to improve physical performance.", lessons: "4 lessons" },
    ],
    presentationNote: null,
  },
  // Year 12
  {
    year: 12,
    pillar: "Entrepreneurship",
    name: "Beyond The Metaverse",
    type: "standard",
    lessons: [
      { number: 1, title: "Digital Frontiers", description: "Debate the opportunities and challenges raised by emerging digital technologies." },
      { number: 2, title: "Ideating In The Metaverse", description: "Generate an idea for an original 3D Metaverse experience." },
      { number: 3, title: "Design In The Metaverse", description: "Explore design and user experience principles using 3D software." },
      { number: 4, title: "3D Design Creation", description: "Prototype their Metaverse setting using 3D modelling software." },
      { number: 5, title: "Showcase: Into Your Metaverse", description: "Showcase their 3D Metaverse concept and receive feedback." },
    ],
  },
  {
    year: 12,
    pillar: "Careers",
    name: "The Internship",
    type: "grouped",
    sourceLessonCount: 19,
    groups: [
      { number: 1, title: "People & HR", description: "Explore recruitment, workplace personalities, teamwork and what shapes company culture.", lessons: "6 lessons" },
      { number: 2, title: "Design", description: "Develop prototypes, digital designs and app concepts for a business.", lessons: "4 lessons" },
      { number: 3, title: "Marketing & Sales", description: "Explore customer needs, marketing, sales proposals and client relationships.", lessons: "5 lessons" },
      { number: 4, title: "Operations", description: "Build spreadsheet and project management skills through practical business tasks.", lessons: "3 lessons" },
      { number: 5, title: "Final Portfolio", description: "Bring together work from across departments into one final portfolio.", lessons: "1 lesson" },
    ],
    presentationNote: null,
  },
  // Leadership: from the Leadership master (November 2026).
  {
    year: 12,
    pillar: "Leadership",
    name: "Challenging Perceptions",
    type: "standard",
    lessons: [
      { number: 1, title: "How Leadership Is Perceived", description: "Examine assumptions about who becomes a leader." },
      { number: 2, title: "Demanded or Earned Respect?", description: "Compare leadership based on authority and earned respect." },
      { number: 3, title: "Communicating Across Demographics", description: "Explore how leaders communicate with different groups." },
      { number: 4, title: "Adapting to Different Audiences", description: "Develop approaches for reaching audiences with different needs." },
      { number: 5, title: "Mobilising Communities", description: "Consider how leaders engage groups towards shared objectives." },
      { number: 6, title: "Recognising the Value of Others", description: "Explore ways to champion contributions across diverse communities." },
    ],
  },
  {
    year: 12,
    pillar: "Wellbeing",
    name: "Thrive",
    type: "proposed",
    lessons: [
      { number: 1, title: "Positive Psychology 101: How To Be Happy", description: "Explore the science behind happiness and personal fulfilment." },
      { number: 2, title: "Active & Passive Consumption", description: "Evaluate your screen habits and set healthier digital boundaries." },
      { number: 3, title: "Personality Power", description: "Identify your personal strengths and values through personality assessments." },
      { number: 4, title: "Finding Your Passion", description: "Explore your interests and create a roadmap towards personal fulfilment." },
      { number: 5, title: "The Power Of Flow", description: "Discover how flow influences concentration, motivation and meaningful engagement." },
      { number: 6, title: "How To Be Creative", description: "Practise creative thinking techniques and showcase your Well Rounded project." },
    ],
    internalNote: "Website grouping: original Project Showcase is incorporated into How To Be Creative. Original platform has 7 lessons.",
  },
  {
    year: 12,
    pillar: "Financial Literacy",
    name: "Utopian Economics",
    type: "standard",
    lessons: [
      { number: 1, title: "Utopian Economics: The Nature Of Money (1/6)", description: "Explore political views on money and define their Utopia." },
      { number: 2, title: "Utopian Economics: Going Without (2/6)", description: "Examine welfare and its role in a Utopia." },
      { number: 3, title: "Utopian Economics: Labour Market Analysis (3/3)", description: "Evaluate their Utopia's labour market and respond to crisis." },
      { number: 4, title: "Utopian Economics: Learning To Earn (4/6)", description: "Decide how their Utopia funds and delivers education." },
      { number: 5, title: "Utopian Economics: Campaigns For Causes (5/6)", description: "Define their Utopia and campaign for people's votes." },
      { number: 6, title: "Utopian Economics: Vote For Utopia (6/6)", description: "Present their policies as the winning Utopia is chosen." },
    ],
  },
  {
    year: 12,
    pillar: "Health & Performance",
    name: "Be Remarkable 1.0",
    type: "grouped",
    sourceLessonCount: 12,
    groups: [
      { number: 1, title: "Performance & Mindset", description: "Explore personal success, sports psychology and strategies for managing pressure.", lessons: "3 lessons" },
      { number: 2, title: "Personal Leadership & Reflection", description: "Develop accountability, prepare for success and reflect on personal progress.", lessons: "3 lessons" },
      { number: 3, title: "Productivity & Learning", description: "Explore effective organisation, health tracking and techniques for remembering information.", lessons: "3 lessons" },
      { number: 4, title: "Wellbeing & Innovation", description: "Investigate the wellness industry and design an original wellbeing app.", lessons: "3 lessons" },
    ],
    presentationNote: null,
  },
  // Year 13
  {
    year: 13,
    pillar: "Entrepreneurship",
    name: "CEO Of Your Own Life",
    type: "standard",
    lessons: [
      { number: 1, title: "Planning For Growth", description: "Plan personal growth using strengths, interests and Wheel of Life." },
      { number: 2, title: "Check Yourself Before You Wreck Yourself", description: "Practise decision making and task ordering through timed role plays." },
      { number: 3, title: "A Unique Insight: The CEO", description: "Take a personality test and use insights to understand themselves." },
      { number: 4, title: "Hands On: Piktochart", description: "Create an infographic presenting personality insights in Piktochart." },
      { number: 5, title: "Showcase: Personal Keynote", description: "Deliver a three to five minute personal keynote presentation." },
    ],
  },
  {
    year: 13,
    pillar: "Careers",
    name: "Learning About The Machine",
    type: "standard",
    lessons: [
      { number: 1, title: "Learning About The Machine: A Brief Introduction", description: "Research positive real-world AI case studies and present findings." },
      { number: 2, title: "Learning About The Machine: Tools For Productivity", description: "Use ChatGPT to automate study planning and build a timetable." },
      { number: 3, title: "Learning About The Machine: Tools For Information", description: "Build and train a chatbot to understand machine learning." },
      { number: 4, title: "Learning About The Machine: Tools For Creativity", description: "Use ChatGPT to create prompts for fiction writing." },
      { number: 5, title: "Learning About The Machine: Responsible and Ethical Use", description: "Evaluate pros and cons of AI and present views." },
      { number: 6, title: "Learning About The Machine: Predicting The Future", description: "Predict AI's impact on jobs through a future job post." },
    ],
  },
  // Leadership: from the Leadership master (November 2026).
  {
    year: 13,
    pillar: "Leadership",
    name: "Thought Leadership",
    type: "standard",
    lessons: [
      { number: 1, title: "What Is Thought Leadership?", description: "Explore what distinguishes thought leadership from personal opinion." },
      { number: 2, title: "Building Credibility and Respect", description: "Examine why certain voices earn influence and respect." },
      { number: 3, title: "Communicating Influential Ideas", description: "Explore how thought leaders communicate ideas to others." },
      { number: 4, title: "Thought Leaders Through History", description: "Investigate influential thinkers and their contributions throughout history." },
      { number: 5, title: "Ideas That Inspire Change", description: "Examine how influential ideas inspire people and drive change." },
      { number: 6, title: "Making Complex Ideas Accessible", description: "Explore how thought leaders explain complex ideas clearly." },
    ],
  },
  {
    year: 13,
    pillar: "Wellbeing",
    name: "Heart And Mind",
    type: "standard",
    lessons: [
      { number: 1, title: "Expressing", description: "Practise expressing emotions and start a mental health journal." },
      { number: 2, title: "Challenging", description: "Explore techniques to challenge and reframe negative thoughts." },
      { number: 3, title: "Appreciating", description: "Practise gratitude and apply it to the journal." },
      { number: 4, title: "Finish The Project", description: "Complete a personal mental health journal using your earlier learning." },
      { number: 5, title: "Showcase", description: "Present your mental health journal and explain your creative choices." },
    ],
  },
  {
    year: 13,
    pillar: "Financial Literacy",
    name: "Financial Philosophy",
    type: "standard",
    lessons: [
      { number: 1, title: "Popular Perspectives", description: "Compare economic beliefs and debate money and happiness." },
      { number: 2, title: "Let’s Get Economical", description: "Explore economic terms, nudging, and plan a fundraising campaign." },
      { number: 3, title: "Evolving Economic Ethos", description: "Link financial philosophy to politics and the Overton Window." },
      { number: 4, title: "People, Policies And Systems", description: "Study money values across demographics and prepare a debate." },
      { number: 5, title: "Applying It: Your Philosophical Movement", description: "Build a campaign case for their chosen philosophy." },
      { number: 6, title: "Win Your Campaign", description: "Debate their campaign and evaluate peers to pick a winner." },
    ],
  },
  {
    year: 13,
    pillar: "Health & Performance",
    name: "Be Remarkable 2.0",
    type: "grouped",
    sourceLessonCount: 12,
    groups: [
      { number: 1, title: "Personal Goals & Direction", description: "Reflect on your ambitions and build a practical plan for progress.", lessons: "3 lessons" },
      { number: 2, title: "Motivation & Accountability", description: "Explore motivation, social support and strategies for navigating personal setbacks.", lessons: "3 lessons" },
      { number: 3, title: "Learning & Performance", description: "Investigate writing, memory techniques and project management to improve organisation.", lessons: "3 lessons" },
      { number: 4, title: "Leadership & Reflection", description: "Plan a workshop, share your learning and reflect on personal growth.", lessons: "3 lessons" },
    ],
    presentationNote: null,
  },
  {
    year: 13,
    pillar: "Wellbeing",
    name: "Foundations",
    type: "grouped",
    sourceLessonCount: 17,
    groups: [
      { number: 1, title: "Preparing for Adulthood", description: "Explore independence, personal milestones and the choices shaping adult life.", lessons: "4 lessons" },
      { number: 2, title: "Defining Success & Direction", description: "Discover what matters to you and shape your future ambitions.", lessons: "3 lessons" },
      { number: 3, title: "Productivity & Resilience", description: "Develop practical approaches to time management, prioritisation and overcoming setbacks.", lessons: "3 lessons" },
      { number: 4, title: "Relationships & Wellbeing", description: "Explore positive relationships, emotional awareness and healthier digital habits.", lessons: "3 lessons" },
      { number: 5, title: "Personal Identity & Career Choices", description: "Reflect on your values, work personality and what makes careers fulfilling.", lessons: "4 lessons" },
    ],
    presentationNote: "These are thematic groupings and do not represent strict chronological teaching order.",
  },
];

// The one programme shown for a year and pillar (null when there isn't one).
export function getPublishedProgramme(year: number, pillar: PillarName): Programme | null {
  const candidates = programmes.filter((p) => p.year === year && currentPillarName(p.pillar) === pillar);
  if (candidates.length <= 1) return candidates[0] ?? null;
  const selection = PUBLISHED_SELECTIONS.find((s) => s.year === year && s.pillar === pillar);
  return candidates.find((p) => p.name === selection?.published) ?? null;
}
