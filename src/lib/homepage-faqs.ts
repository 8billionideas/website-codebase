export interface HomepageFaqLink {
  label: string;
  href: string;
}

export interface HomepageFaq {
  question: string;
  paragraphs: string[];
  link?: HomepageFaqLink;
}

export const homepageFaqs: HomepageFaq[] = [
  {
    question: "Do we need to use the entire curriculum?",
    paragraphs: [
      "Not at all. 8billionideas is designed to give schools flexibility over what they introduce and when. You can choose the year groups and Pillars of Learning that are most relevant to your school, whether that's one specific area you want to strengthen or a broader curriculum across multiple year groups. Some schools start with a focused part of the curriculum and build from there, while others take a whole-school approach from the beginning.",
    ],
  },
  {
    question: "How does 8billionideas fit into our existing curriculum?",
    paragraphs: [
      "We know every school already has a busy curriculum, so 8billionideas doesn't need to sit separately from everything you're already teaching. There are natural connections across the curriculum, from literacy and numeracy to science, art and beyond.",
      "Our Curriculum Mapping page brings those connections to life, showing you where 8billionideas can complement your existing curriculum and how other schools are bringing the two together in practice.",
    ],
    link: { label: "Explore Curriculum Mapping →", href: "/curriculum-mapping" },
  },
  {
    question: "What age groups is the curriculum designed for?",
    paragraphs: [
      "The 8billionideas learning journey is designed for Year 1 through to Year 13, with the content, challenge and learning developing as students progress through school. Rather than students encountering these skills through occasional standalone activities, schools can create a progressive journey that develops with them, from their earliest experiences of ideas, creativity and problem-solving through to increasingly sophisticated real-world projects, careers, entrepreneurship and preparation for life beyond school.",
    ],
  },
  {
    question: "Do teachers need to plan or create the lessons themselves?",
    paragraphs: [
      "No. We've built the curriculum so your teachers don't have to. Schools receive the learning content, lesson plans, resources and supporting materials needed to deliver each Learning Hub, all brought together through the 8billionideas platform. Teachers can see what they're delivering, what students are developing and what they need for each lesson without having to build a new programme themselves.",
      "We also support your school with implementation, so you're not simply given access to a platform and left to work everything out. The intention is simple: give students brilliant learning experiences without creating another planning burden for teachers.",
    ],
  },
  {
    question: "How much does it cost to bring 8billionideas into our school?",
    paragraphs: [
      "Our pricing is as flexible as the curriculum itself. Rather than expecting every school to fit into the same package, you can build an approach around your own priorities, choosing the year groups and Pillars of Learning that are right for your students.",
      "That means you can start small, with access from less than £250, or build a much broader programme across multiple year groups and pillars. There's no need to pay for more than your school needs, and you can always grow your use of the curriculum over time.",
    ],
    link: { label: "Explore our pricing →", href: "/pricing" },
  },
  {
    question: "Can schools following any curriculum offer the International GCSE Global Skills Projects?",
    paragraphs: [
      "Yes. The Global Skills Projects qualification isn't limited to schools following a British or OxfordAQA curriculum. Schools following IB, American, Cambridge, Pearson and other international curricula can offer the qualification too. If your school isn't currently an OxfordAQA centre, that doesn't prevent you from getting started. 8billionideas will support you through the registration process, and OxfordAQA is currently waiving the usual centre registration fee for schools introducing the qualification.",
    ],
  },
];
