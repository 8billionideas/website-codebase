// First CV Workshop: the fourth resource on /resources and its landing page, /cv-workshop, with the
// download form connected to the HubSpot form from the old page (page.8billionideas.com/cv-lesson).

// TODO: Add the lesson mock-up (the video and activity book) when one is made. The old page has
// only the video thumbnail, so /resources and /cv-workshop show a mint "Image coming soon" block
// until then. The alt text is cvWorkshopResource.alt.
export const CV_WORKSHOP_IMAGE: { src: string; width: number; height: number } | null = null;

// Confirm this figure is current.
export const SHOW_CAREER_LEADERS_STAT = true;

export const cvWorkshopResource = {
  type: "FREE VIDEO WORKSHOP",
  title: "First CV Workshop",
  description:
    "A done-for-you video workshop and printable activity book that shows students how to create their first CV: what to include, how to structure it and how to make it stand out.",
  tags: ["Free video", "Activity book", "Classroom ready", "Careers"],
  included: [
    "A video workshop on writing a first CV",
    "A printable activity book",
    "Activity 1: build a CV – what to include and how to structure it",
    "Activity 2: unscramble a scrambled CV and match it to the right candidate",
  ],
  cta: "Find out more",
  url: "/cv-workshop",
  // Alt text for the image, once there is one.
  alt: "First CV Workshop: video workshop and printable activity book by 8billionideas",
};

export const cvWorkshopHero = {
  eyebrow: "FREE VIDEO WORKSHOP + ACTIVITY MATERIALS",
  headingLine1: "Help your students",
  // Non-breaking spaces keep "first CV" and "your free" together when the lines wrap.
  headingLine2: "create their first\u00a0CV",
  body: "Get a free video workshop, plus the accompanying activity book, to show your students how to create their first CV.",
  cta: "Download for free",
  stat: "More than 2,150 Career Leaders use our content",
};

export const cvWorkshopDoneForYou = {
  heading: "Get a done-for-you CV workshop",
  body: "Help your students get work-ready by equipping them with the skills to create their first CV. Create an engaging learning experience by using the video and printable activity materials to run a hands-on CV lesson.",
};

export const cvWorkshopHandsOn = {
  heading: "Make use of hands-on learning",
  line: "The lesson pack contains printable activity materials with two engaging activities you can try out with your students:",
  activities: [
    { title: "Build a CV:", text: "how to create one, what to include and how to structure it." },
    { title: "Unscramble a scrambled CV:", text: "what makes sense for which candidate?" },
  ],
};

export const cvWorkshopDownload = {
  headingLine1: "Download your\u00a0free",
  headingLine2: "CV workshop",
  line: "Get your students excited for the world of work! Fill in the form to receive the download link straight to your inbox.",
  optInLead: "Want to hear from us?",
  submit: "Download now",
};
