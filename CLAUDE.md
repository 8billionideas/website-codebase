@AGENTS.md

# CLAUDE.md – 8billionideas marketing website

Read this file in full at the start of every session. It holds the rules and decisions for this project. If a request conflicts with anything here, point out the conflict before making changes.

## Project

- Marketing website for **8billionideas** (always written as one lowercase word, never "8 Billion Ideas").
- Two products: **The Critical Curriculum** (eight pillars, Year 1 to Year 13) and the **OxfordAQA International GCSE Global Skills Projects**. 8billionideas is the teaching and learning partner. OxfordAQA provides the qualification.
- Audience: school leaders, heads of department, trusts and governments. Write for teachers, not marketers.

## Repos and environments

- **Work in cam388/8bi-website-non-interactive**. This is the primary build.
- **Never touch cam388/8bi-website-v1** (the interactive version, kept as it is).
- **Never touch anything running on localhost:3000.**
- The dev server for this repo runs on **localhost:3002** (check package.json if unsure).
- Confirm the working directory before making any changes.
- Deployment target: **Webflow Cloud** (Next.js via the OpenNext Cloudflare adapter). Requires Next.js 15+. basePath and assetPrefix in next.config must match the Webflow mount path. Use fetch for outbound calls, not axios.

## Stack

Next.js (App Router), TypeScript, Tailwind v4 (tokens in the @theme block of src/app/globals.css), lucide-react icons (thin stroke, 1.5).

## How to work (important)

1. **Diagnose before editing.** Start from src/app/page.tsx (or the route file) and follow the imports to the component that is actually rendered. Check for duplicate or older copies of components before editing. Earlier changes have failed because the wrong copy was edited.
2. **Only change what was asked.** Keep all other copy, layout and behaviour exactly as it is.
3. **Report before big changes.** For fixes, report the cause first. For removals, list what will be deleted.
4. **Never run destructive git commands** (git checkout -- <file>, git restore, git reset, git stash, git clean, git pull) without asking first. When reverting, revert only the specific change and keep other uncommitted work.
5. **Verify properly.** Run the typecheck. Hard-refresh localhost:3002. Check at 1440px, 1024px, 768px and 375px. For visual fixes, confirm with a Playwright/Puppeteer script (computed styles, bounding boxes) and save screenshots to /tmp.
6. **If a change doesn't show up:** stop the dev server, delete .next, restart, then check again before assuming the code is wrong.
7. **Delete components and data only if nothing else imports them** (search first).
8. Finish by summarising every file created, changed or deleted.

## Content rules

- **Never invent copy, statistics, quotes, dates, lesson titles or descriptions.** Use the exact wording given. If something is missing, use an empty (null) data field that renders nothing, or a clearly labelled placeholder.
- **British English** throughout (organisation, programme, prioritise).
- Use **en dashes (–)**, not em dashes, in all visible copy (spaced: " – "). Keep quotes word for word, except that the company name inside quotes is always written "8billionideas" (Marketing, October 2026).
- Numbers: spell out one to nine, numerals from 10 up. Ages, percentages, money and measurements are always numerals.
- Approved headline figures: **350+ schools** and **1 million+ students** as big stat numbers; in sentences, write "more than 350 schools" and "more than 1 million students".
- Always name **OxfordAQA** when the GCSE is mentioned. On each page, the first mention is "OxfordAQA International GCSE Global Skills Projects", then "Global Skills Projects" (always plural). 8billionideas is the "teaching and learning partner" (never "official delivery partner").
- In body text the programme is always *The Critical Curriculum* (capital T, italic), via src/components/shared/CriticalCurriculumName.tsx. Headings, pricing labels, buttons and form options are decided case by case.
- The only email address shown on the website is hello@8billionideas.com. Never use personal email addresses.
- The support role is the **Partnership Manager**. Never "project manager". Never promise "24/7".
- Plain English. No marketing inflation, no unsourced industry statistics.

## Design system

- **Poppins only.** No other fonts, including no serif.
- Tokens: accent-green #21D199, violet #6840FC, ink #16213D, paper #FFFDFA.
- Weights: headings 300, body and labels 400, buttons 500. Nothing thinner than 300.
- Heading pattern: Poppins 300, final phrase in **italic accent-green**, text-wrap: balance.
- Eyebrows: 12px, uppercase, letter-spacing 0.25em.
- All button-style CTAs use the shared **Button** component (src/components/ui/Button.tsx; DemoTrigger with appearance="button" for demo CTAs): green with ink text, a white hover with a thin border and shadow. Inline text links are not buttons. (White on green fails contrast, so button text is always ink.)
- The logo is the shared Logo component (public/images/logo.svg source). Use variant 'light' on light backgrounds (navy wordmark #16234C) and 'dark' on dark backgrounds (white wordmark). The dots are always #26C794. The favicon uses the dot mark only.
- The site is locked to the light colour scheme.
- **No floating boxes.** Any section with a background colour or image runs full width, edge to edge, with no rounded corners. Content stays inside the normal container.
- **Hero and section text is always left-aligned**, with its left edge lined up with the nav logo. When adding a background image, do not let the layout centre the text.
- Image heroes: full-width next/image with priority, an ink gradient on the left for dark images (or paper for light images), and a stronger even overlay on mobile. Text must pass WCAG AA contrast.
- No horizontal page scroll at any width. Rows of items that can't fit scroll on one line instead of wrapping.

## Images

- New images are usually in ~/Downloads. Copy them into public/images/... with clean names, create optimised WebP versions, and never modify the originals.
- Always write alt text. Lazy-load anything below the fold.
- Never crop logos or faces. Logos (schools, clubs, universities) need permission before launch.

## Site structure

Nav: Our Curriculum (link) · Qualifications (link to /gcse) · Case Studies · Pricing · About (dropdown: About Us, Resources, Contact us) · Login · Request a demo.

Pages: / (homepage), /curriculum-mapping (Our Curriculum), /gcse, /pricing, /case-studies and /case-studies/[slug], /about, /resources, /contact. /community and /blog redirect to /about. /implementation redirects to /curriculum-mapping. Old NOC and EPQ routes redirect to /gcse.

## Key facts and data

- The eight pillars, in this order: Entrepreneurship, Leadership, Wellbeing, Performance (formerly "Health & Performance"), Careers, Financial Literacy, Sustainability, Technology. Sustainability and Technology are marked **Coming soon**.
- Skills: eight transferable skills (Critical Thinking, Creative Thinking, Problem-Solving, Communication, Collaboration, Resilience, Self-Awareness, Decision-Making), shown as a Discovering / Developing / Applying progression across Year 1, 4, 7, 10 and 13.
- Lesson explorer data comes from the Lesson Explorer developer document (src/content/lesson-explorer.ts): one published programme per year and pillar, standard lesson sequences or grouped overviews; no durations are shown; proposed six-part sequences stay hidden until curriculum sign-off.
- Pricing (single source of truth in src/lib/pricing.ts):
  - Critical Curriculum: **£40 per pillar per year group**. Sellable options are **1, 3 or 6 pillars** only. Year groups 1 to 13.
  - GCSE fee per student: 10–25 £105 · 26–50 £85 · 51–100 £65 · 101–150 £50 · 151–200 £45 · 200+ £40. Minimum 10 students.
  - Calculator defaults are the minimums: 1 year group, 1 pillar, 10 students.
- HubSpot: the portal and form IDs live in src/lib/hubspot.ts as public defaults (they're shown in HubSpot's embed code, so safe to commit), with the NEXT_PUBLIC_HUBSPOT_* environment variables as optional overrides. The demo pop-up and /contact form post through the shared Forms API helper there; the quote form ID is still null (not connected).
- Data files: src/lib/case-studies.ts, src/lib/pricing.ts, src/lib/curriculum-subjects.ts, src/content/lesson-explorer.ts, src/lib/resources.ts, src/lib/homepage-faqs.ts, plus the testimonials data in src/content/home.ts (home.proof.testimonials and home.proof.bandTestimonial).
- Case studies order: The Internship (featured), Nord Anglia Education India, Severn Academies, Harrow Sustainability450, Chelsea FC Academy.
- Newsletter pop-up: Shows 5s after arriving, once per visit (NEWSLETTER_POPUP_FREQUENCY = 'session'; switch to '30-days' before launch); never again after sign-up; not on /contact; ?newsletter=1 opens it for review. Single compact box (about 420px), email only. Offer: 10% off with code WELCOME10 (sent by HubSpot email); sales verifies eligibility on the contact record.

## Open items (don't resolve these by guessing)

- GCSE price cliff (e.g. 25 students cost more than 26). Pricing rule to be decided by David.
- "Typically parent-funded" wording for the GCSE, to be confirmed.
- OxfordAQA specification checks: claims, learning hours, "recognised by universities", "internally assessed, externally moderated". Approval of the Jennifer Duggan and Emily Cheffins quotes. GCSE launch date (August vs September 2026).
- Permission to show school and club names and logos (especially Chelsea and Harrow).
- Lesson titles from the curriculum team (Samira, Lakshmi, Lyndsay). Subject-to-pillar mapping sign-off (Lyndsay).
- Procurement one-pager (Elysha). About page 2025 timeline facts. Ann Haydon's current job title.
- Safeguarding content currently doesn't appear anywhere on the site.
