// /privacy-policy: the privacy notice, word for word as supplied (only the formatting – lists,
// paragraphs, subheadings, links – is ours). Don't reword, correct or remove anything here.
// Inline text is a string, or an array of strings and links. Links starting "mailto:" or "/" open in
// the same tab; full URLs open in a new one.

export type Inline = string | { text: string; href: string };
export type Rich = string | Inline[];
export type PolicyListItem = Rich | { content: Rich; items: Rich[] };
export type PolicyBlock =
  | { type: "p"; content: Rich }
  // A small bold subheading (lawful bases, rights and the other sub-sections).
  | { type: "h3"; text: string }
  | { type: "ul"; items: PolicyListItem[] };

export interface PolicySection {
  id: string;
  heading: string;
  shortAnswer: string;
  blocks: PolicyBlock[];
}

const EMAIL = { text: "hello@8billionideas.com", href: "mailto:hello@8billionideas.com" };

export const privacyPolicy = {
  title: "Privacy Policy",
  company: "8billionideas Ltd",
  contentsLabel: "Contents",
  issued: "Issued: 1 May 2023",
};

export const policySections: PolicySection[] = [
  {
    id: "who-we-are",
    heading: "Who we are",
    shortAnswer: "(Short answer: an education company)",
    blocks: [
      {
        type: "p",
        content:
          "We are 8billionideas Limited. We are the data controller responsible for protecting the personal information we hold about you. We genuinely believe in the importance of privacy for everyone. We will keep your personal information safe and secure and we will not misuse it. We appreciate that your personal information belongs to you even if it has been shared with others. This privacy notice explains what we do with your personal information so you understand how we use it. It also tells you what your legal rights are in relation to it and how you can exercise them so that you are in control of your personal information at all times.",
      },
    ],
  },
  {
    id: "information-we-have",
    heading: "What information we have about you",
    shortAnswer: "(Short answer: as little as possible)",
    blocks: [
      {
        type: "p",
        content: [
          "We may have personal information about you which you have given us; which we collect from your device; and, possibly, which we obtain from other sources. Much depends on your relationship with us. We do not provide incentives to individuals to provide us with personal information. When you visit our website, cookies and similar technologies may be used by our online data partners or vendors to associate these activities with other personal information they or others have about you, including by association with your email. We (or service providers on our behalf) may then send communications and marketing to these email. You may opt out of receiving this advertising by visiting ",
          { text: "https://app.retention.com/optout", href: "https://app.retention.com/optout" },
          ". You also have the option to opt out of the collection of your personal data in compliance with GDPR. To exercise this option, please visit ",
          { text: "https://www.rb2b.com/rb2b-gdpr-opt-out", href: "https://www.rb2b.com/rb2b-gdpr-opt-out" },
          ".",
        ],
      },
      { type: "h3", text: "Categories of individuals whose personal information we may process" },
      { type: "p", content: "We process personal information of the following categories of individuals:" },
      {
        type: "ul",
        items: [
          [
            "visitors to our website at ",
            { text: "www.8billionideas.com", href: "https://www.8billionideas.com" },
            " or who may email or call us;",
          ],
          "the primary contact at each of our clients (we sometimes call these 'Point of Contact');",
          "individuals provided with access to our platform by our clients;",
          "contacts at our vendors and partners that we do business with;",
          "individuals whose personal information is contained in content placed in the Platform by users (we are a processor only in relation to such personal information (if any); and",
          "sales prospects.",
        ],
      },
      { type: "h3", text: "Personal information you give us" },
      {
        type: "p",
        content:
          "Contact information such as name, address, email address and/or mobile number. We do not collect or process any financial information other than for payment of certain of our vendors and partners. We do not collect the financial information of any customers, or visitors to our website.",
      },
      { type: "h3", text: "Personal information we collect from your device" },
      {
        type: "p",
        content: [
          "We use Google Analytics which collects information when you visit our website or use our Platform. You can find more information about Google Analytics ",
          { text: "here", href: "https://policies.google.com/technologies/partner-sites" },
          ". In essence, Google Analytics enables us to analyse how you and others interact with our website and the Platform. The information we collect may include:",
        ],
      },
      {
        type: "ul",
        items: [
          "your IP address;",
          "the type of browser you use eg. Chrome;",
          "the type of device you use eg. Samsung;",
          "the type of operating system you use eg. Android;",
          "the timezone setting;",
          "geolocation information.",
        ],
      },
    ],
  },
  {
    id: "why-we-need-it",
    heading: "Why we need your personal information",
    shortAnswer: "(Short answer: to make your life better)",
    blocks: [
      {
        type: "p",
        content:
          "We need certain types of personal information from you so that you can gain access to your Platform account, so that you can buy our services, or so that we can pay you for your services (if relevant). We do not and never will sell your personal information. Without such personal information we are unable to have a business relationship with you.",
      },
      { type: "h3", text: "Personal information we need" },
      {
        type: "ul",
        items: [
          "name, work email address, job title which is required for any individual that requires access to Platform; and",
          "other contact details such as telephone number which may be required for contract processing and account management. We do not use telephone numbers for marketing purposes.",
        ],
      },
    ],
  },
  {
    id: "how-we-use-it",
    heading: "How we use your personal information",
    shortAnswer: "(Short answer: carefully and with respect)",
    blocks: [
      {
        type: "p",
        content:
          "We use personal information only to the extent that is necessary to operate our business and provide you with services. The law allows us to use personal information as long as we tell you what we are using it for (see each bullet point below) and we have a valid lawful basis for doing so. We must tell you which lawful basis (in bold below) we rely on to use your personal information.",
      },
      { type: "h3", text: "To fulfil our contractual obligations to you" },
      {
        type: "p",
        content:
          "We only use this legal basis for processing the personal information of our vendors and partners. We do not use it for our customers or visitors to our website. We use it:",
      },
      {
        type: "ul",
        items: [
          "to provide services requested by our vendors and partners;",
          "to maintain relationships with our vendors and partners; and",
          "to pay certain of our vendors and partners.",
        ],
      },
      { type: "h3", text: "When it is in our legitimate interests" },
      {
        type: "p",
        content:
          "This is one of the following business or commercial reasons (which we do not prioritise above your rights);",
      },
      {
        type: "ul",
        items: [
          "to communicate with individuals that make contact with us;",
          "to tell you about products and services we think may interest you. We have a legitimate interest in promoting our business and increasing sales.",
        ],
      },
    ],
  },
  {
    id: "who-we-share-it-with",
    heading: "Who we share your personal information with",
    shortAnswer: "(Short answer: as few people as possible)",
    blocks: [
      {
        type: "p",
        content:
          "We will only share your personal information with other organisations after careful consideration and only when we have a legitimate reason. We may share your personal information with:",
      },
      {
        type: "ul",
        items: [
          "any organisation you have given us consent to share it with;",
          "law enforcement agencies, regulatory authorities or government bodies where we are under a legal or regulatory obligation to do so;",
          {
            content:
              "our service providers, suppliers, partners and subcontractors where this is necessary to provide our services to you. These include:",
            items: [
              "web analytics companies (Google Analytics, Hubspot, Hotjar);",
              "web-hosting and web development service providers (Webflow, Hubspot)",
              "automated marketing vendors (Hubspot);",
              "payment processors (Stripe, Xero, Airwallex);",
              "cloud based hosting and communications providers (GSuite & AWS); and",
              "online advertising providers (Google, LinkedIn, Reddit).",
            ],
          },
          "any prospective buyer of all or part of our business or assets (and associated advisors and agents) provided they use it only as set out in this privacy notice; and",
          "our legal and other professional advisors and any other organisation necessary to enforce our terms of use and other agreements and/or to protect the rights, property and safety of us, our users or others.",
        ],
      },
    ],
  },
  {
    id: "transfers-outside-the-eea",
    heading: "Whether we transfer personal information outside the EEA",
    shortAnswer: "(Short answer: only occasionally)",
    blocks: [
      {
        type: "p",
        content:
          "We only transfer your personal information to countries outside of the European Economic Area (EEA) when it is necessary (for example where it is stored on servers based in a non-EEA country) and only if your personal information will benefit from the same protection as in the UK or EEA. All EEA countries (the EU, Norway, Iceland and Liechtenstein) provide an adequate level of data protection allowing free transfer of personal information from the UK to any of those countries. We protect your personal information which we transfer out of the EEA to the USA for web analytics purposes; payment processing; cloud based hosting and communication services; and online advertising. We are in the process of ensuring that each organisation to which personal information is transferred has entered into a contract with us which incorporates the European Commission's Model Clauses.",
      },
    ],
  },
  {
    id: "how-long-we-keep-it",
    heading: "How long we keep your personal information",
    shortAnswer: "(Short answer: for as little time as we think sensible)",
    blocks: [
      {
        type: "p",
        content:
          "We only keep your personal information for as long as we need it to carry out the different activities set out in this notice (see How we use your personal information). Any personal information contained within Google Workplace is deleted after 6 years. Any personal information contained within a Platform is deleted 3 months after expiry of the contract governing that Platform. And any personal information contained within Hubspot is deleted once you have unsubscribed from our email marketing list.",
      },
    ],
  },
  {
    id: "your-rights",
    heading: "What your rights are in relation to your personal information",
    shortAnswer: "(Short answer: you have a lot and we are happy to give them to you)",
    blocks: [
      {
        type: "p",
        content: [
          "You can exercise your rights at any time by emailing us at ",
          EMAIL,
          ". We may need to verify your identity before we deal with your request so that your personal information is protected against unauthorised access. If you are an authorised agent making a request exercising rights on behalf of an individual, we are likely to require proof of your authorisation by the individual.",
        ],
      },
      { type: "h3", text: "To opt-out of marketing communications" },
      {
        type: "p",
        content: [
          "You have the right to tell us not to use your personal information for marketing purposes. You may exercise this right at any time by contacting us at ",
          EMAIL,
          ", or clicking the unsubscribe link on any marketing emails we send you.",
        ],
      },
      { type: "h3", text: "To obtain a copy of the personal information we hold about you" },
      { type: "h3", text: "To ask us to correct any inaccurate information we hold about you" },
      { type: "h3", text: "To ask us to delete any personal information we hold about you" },
      {
        type: "p",
        content:
          "You have this right in certain circumstances only. For example, it does not apply if we need to use your personal information to comply with our legal obligations or to establish, exercise or defend a legal claim.",
      },
      { type: "h3", text: "To ask us to restrict our use of your personal information" },
      {
        type: "p",
        content:
          "You have this right in certain circumstances, for example where you have objected to our use of your personal information and we are considering whether our legitimate interests override yours. This is often a temporary measure and we are still allowed to store your information while we are restricted from using it.",
      },
      { type: "h3", text: "To ask us to transfer your personal information to you or another organisation" },
      {
        type: "p",
        content:
          "This right is also known as the right to data portability. It is your right to have your personal information ported to you or a nominated third party in a structured, commonly used and machine readable format. This right applies only to information which we have collected from you and which we process using automated means. You have this right only where we are using your personal information with your consent or to fulfil our contractual obligations to you (see How we use your personal information).",
      },
      { type: "h3", text: "To object to our use of your personal information" },
      {
        type: "p",
        content:
          "You have this right only in relation to our use of your personal information on the ground of legitimate interests (see How we use your personal information).",
      },
    ],
  },
  {
    id: "changes",
    heading: "How and when we make changes to our privacy notice",
    shortAnswer: "(Short answer: right here when we change how we use your information)",
    blocks: [
      {
        type: "p",
        content:
          "Any changes we make to this policy will be posted on this page. Where the changes are significant, we will let you know by email or in another appropriate manner such as when you next interact with our website or your Platform account.",
      },
    ],
  },
  {
    id: "contact-us",
    heading: "How and when to contact us",
    shortAnswer: "(Short answer: send us an email whenever you like)",
    blocks: [
      {
        type: "p",
        content: [
          "We are real people and we care about privacy. It's a big part of our job. We really do welcome any questions, comments or requests you may have regarding this privacy notice. You can email us at ",
          EMAIL,
          ". Please also use those contact details if you have any complaints about the way we have used your personal information. If we do not deal with your complaint satisfactorily, you have the right to complain to the Information Commissioner's Office.",
        ],
      },
    ],
  },
];

// DRAFT – needs sign-off. The Cookies section, written from an audit of what the site actually sets
// (production build, November 2026: /, /resources with a kit pop-up open, /roar, /cv-workshop,
// /minerva and /gec-academy, before any choice, after Accept and after Reject). Only list what is
// really set; re-audit before changing it.
export interface CookieRow {
  name: string;
  provider: string;
  purpose: string;
  duration: string;
  type: "Essential" | "Analytics" | "Other";
}

export const cookiesSection = {
  id: "cookies",
  heading: "Cookies",
  shortAnswer: "(Short answer: only what we need, and analytics only if you say yes)",
  intro:
    "A small number of essential items are always on: they remember your cookie choice and, if you use it, whether you prefer to see Years or Grades. These are kept in your browser’s storage rather than as cookies. Analytics cookies (Google Analytics) are only set if you click Accept on our cookie banner. The videos on our ROAR page are hosted by Vimeo, which sets its own security cookies when they load. You can change your choice at any time via “Cookie settings” in the footer.",
  columns: ["Cookie name", "Provider", "Purpose", "How long it lasts", "Type"],
  rows: [
    {
      name: "8bi-cookie-consent",
      provider: "8billionideas (browser storage)",
      purpose: "Remembers whether you accepted or rejected analytics cookies.",
      duration: "12 months, then we ask again",
      type: "Essential",
    },
    {
      name: "8bi-level-mode",
      provider: "8billionideas (browser storage)",
      purpose: "Remembers whether you chose to see Years or Grades. Only set if you change it.",
      duration: "Until you clear your browser’s storage",
      type: "Essential",
    },
    {
      name: "_ga",
      provider: "Google Analytics",
      purpose: "Distinguishes visitors so we can see how our website is used. Only set if you click Accept.",
      duration: "400 days",
      type: "Analytics",
    },
    {
      name: "_ga_VB855D8YGQ",
      provider: "Google Analytics",
      purpose: "Keeps track of your visit for our Google Analytics reports. Only set if you click Accept.",
      duration: "400 days",
      type: "Analytics",
    },
    {
      name: "__cf_bm",
      provider: "Vimeo (via Cloudflare)",
      purpose: "Set by Vimeo’s security service when the videos on our ROAR page load.",
      duration: "30 minutes",
      type: "Other",
    },
    {
      name: "cf_clearance",
      provider: "Vimeo (via Cloudflare)",
      purpose: "Set by Vimeo’s security service when the videos on our ROAR page load.",
      duration: "1 year",
      type: "Other",
    },
    {
      name: "__cf_ob",
      provider: "Vimeo (via Cloudflare)",
      purpose: "Set by Vimeo’s security service when the videos on our ROAR page load.",
      duration: "Until you close your browser",
      type: "Other",
    },
  ] as CookieRow[],
};
