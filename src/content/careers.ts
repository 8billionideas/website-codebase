// /careers content: every role lives here. To add a role, copy an entry; to hide one without deleting
// it, set published: false (the cards are numbered 01, 02, … from the published roles only).
//
// Applications go to recruitment@8billionideas.com (agreed for /careers only; everywhere else the
// site shows hello@8billionideas.com). It's shown as plain text under each card, with no mailto links.

export const CAREERS_EMAIL = "recruitment@8billionideas.com";

export interface CareerRole {
  // Stable key, never shown.
  id: string;
  title: string;
  subtitle: string | null;
  tags: string[];
  description: string;
  // The line under the card: "{applyLead}, email your CV to {CAREERS_EMAIL} with “{emailSubject}” in
  // the subject line."
  applyLead: "To apply" | "To join";
  // The email's subject line, exactly as the PDFs ask for it.
  emailSubject: string;
  published: boolean;
}

export const careersHero = {
  eyebrow: "CAREERS",
  // Rendered as "Join the" + italic accent-green "8billionideas team".
  headingStart: "Join the",
  headingEnd: "8billionideas team",
  lead: "Got big ideas, bags of energy and a love of helping young people shine? We’d love to hear from you.",
  // The brief said "over half a million students"; the site's approved figure is used instead (Cam,
  // November 2026). The two PDFs still say "over half a million".
  body: "We’re a global education company on a mission to give every young person the skills and belief to change the world. We’ve partnered with more than 350 schools and reached more than 1 million students – and we’re just getting started.",
  cta: "See open roles",
  imageAlt: "A team working together at laptops around a table in a bright, plant-filled office",
};

export const openRolesSection = {
  eyebrow: "OPEN ROLES",
  // Update this when roles are added or hidden.
  heading: "Three roles open in Dubai",
};

export const openRoles: CareerRole[] = [
  {
    id: "studio-manager",
    title: "Studio Manager",
    subtitle: "Video Production",
    tags: ["Dubai", "Full time"],
    description:
      "Video is at the heart of how we bring our mission to life, and we need a Studio Manager with energy, vision and serious organisational skills to lead it. You’ll plan and run shoots in our studio and in schools, own the production schedule, lead our UK-based editors and drive the roll-out of AI-assisted workflows. If you’ve directed video at volume and you’re never satisfied with “good enough”, we’d love to meet you.",
    applyLead: "To apply",
    emailSubject: "Studio Manager – Video Production",
    published: true,
  },
  {
    id: "global-skills-teacher",
    title: "Global Skills Teacher",
    subtitle: "International GCSE (Online)",
    tags: ["Online", "30 hours a week", "Hybrid – one day a week in Dubai"],
    description:
      "Together with OxfordAQA, we’ve launched the International GCSE Global Skills Projects, a skills-based, project-led qualification, and our student community is growing fast. We’re looking for a qualified secondary teacher who lights up a screen, gets 15-year-olds talking and turns “I can’t” into “I did it”. You’ll run live online lessons, mentor students 1:1 and help shape how the programme is taught. 30 hours a week, hybrid, with one day a week in our Dubai office.",
    applyLead: "To apply",
    emailSubject: "Global Skills Teacher – International GCSE (Online)",
    published: true,
  },
  {
    id: "business-development-manager",
    title: "Business Development Manager",
    subtitle: "OxfordAQA (Education Sales)",
    tags: ["Dubai", "Hybrid"],
    description:
      "Want to launch something brand new? We need a high-energy, target-driven BDM to take the International GCSE Global Skills Projects to schools across the Middle East and beyond. You’ll run the full sales cycle with school leaders, build a healthy pipeline and work alongside OxfordAQA’s regional team on joint campaigns and events. You’ll bring at least three years’ B2B sales experience, ideally in education. Competitive base salary plus commission.",
    applyLead: "To apply",
    emailSubject: "Business Development Manager – OxfordAQA",
    published: true,
  },
];

export const freelanceSection = {
  eyebrow: "FREELANCE",
  heading: "Join our freelance pool",
  intro: "We’re always looking for high-energy, motivational freelancers to bring our programmes to life. We recruit all year round.",
};

export const freelanceRoles: CareerRole[] = [
  {
    id: "freelance-facilitator",
    title: "Freelance Facilitator",
    subtitle: "Workshops, camps and enrichment",
    tags: ["Dubai", "Schools across the UAE", "Flexible"],
    description:
      "Love bringing a room to life? We’re building a pool of freelance facilitators to deliver our workshops, camps and enrichment programmes in schools across the UAE. You’ll lead energetic, hands-on sessions that help young people build creativity, confidence and real-world skills, and leave them buzzing about what they can do. Experience working with children or young people is essential, and teaching, coaching or youth work experience is a bonus. Flexible, project-based work that fits around your schedule.",
    applyLead: "To join",
    emailSubject: "Freelance Facilitator",
    published: true,
  },
];

// The full role descriptions, as PDFs in public/downloads.
export const careersDownloads = [
  { label: "Open roles – full details (PDF)", href: "/downloads/8billionideas-careers-open-roles.pdf" },
  { label: "Freelance facilitators – full details (PDF)", href: "/downloads/8billionideas-freelance-talent-pool.pdf" },
];

export const safeguardingNote =
  "All roles are subject to safer recruitment checks, including references and an enhanced background check.";

export const publishedRoles = (roles: CareerRole[]) => roles.filter((role) => role.published);
