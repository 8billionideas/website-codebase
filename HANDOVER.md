# Handover – 8billionideas website

For Radu, who will deploy the site on the company Vercel account and connect 8billionideas.com.

## What the site is

The marketing website for 8billionideas: *The Critical Curriculum* (eight pillars, Year 1 to Year 13) and the OxfordAQA International GCSE Global Skills Projects. Pages include the homepage, /curriculum, /qualifications, /pricing, /case-studies, /about, /resources, /contact, /privacy-policy and a few partner pages (/roar, /cv-workshop, /minerva, /gec-academy).

## Stack

- Next.js 16 (App Router), React 19, TypeScript
- Tailwind CSS v4 (design tokens in `src/app/globals.css`)
- Deployed on Vercel from the `main` branch (every push to `main` goes to Production)
- `CLAUDE.md` holds the project's working rules and content decisions – worth a read

## Branches

- `main` – the live site, on https://www.8billionideas.com. Every push to `main` deploys to Production.
- `go-live-prep` – has been merged into `main`. It brought the canonical domain (`https://www.8billionideas.com`) for canonical URLs, `sitemap.xml` and `robots.txt`; indexing switched on (except /minerva, /money-masters and /gec-academy); redirects from the old site's URLs; the hosting notes in `CLAUDE.md`; an updated `.env.example`. The branch is kept on GitHub for reference; there's no need to work on it.

## Run it locally

Needs Node.js 20.9 or later and npm.

```
npm install
npm run dev      # http://localhost:3002
npm run build    # production build
npm run start    # serve the production build
npm test         # unit tests (pricing, form payloads, Years/Grades labels)
npm run lint
npx tsc --noEmit # type check
```

## Environment variables

None are required: every value has a working default in the code (the HubSpot and GA4 IDs below are public and committed). Set a variable only to override its default.

| Variable | What it's for | Production |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | Canonical address for canonical URLs, sitemap and robots.txt (default `https://www.8billionideas.com`). Exists once `go-live-prep` is merged. | Not needed |
| `NEXT_PUBLIC_HUBSPOT_PORTAL_ID` | HubSpot portal for all forms | Not needed |
| `NEXT_PUBLIC_HUBSPOT_REGION` | HubSpot data region (default `eu1`) | Not needed |
| `NEXT_PUBLIC_HUBSPOT_DEMO_FORM_ID` | "Request a demo" pop-up | Not needed |
| `NEXT_PUBLIC_HUBSPOT_CONTACT_FORM_ID` | /contact form and the /pricing quote pop-up | Not needed |
| `NEXT_PUBLIC_HUBSPOT_ROAR_FORM_ID` | /roar sign-up form | Not needed |
| `NEXT_PUBLIC_HUBSPOT_FUTURE_JOBS_KIT_FORM_ID` | Future Jobs Kit 2.0 download (/resources) | Not needed |
| `NEXT_PUBLIC_HUBSPOT_MY_FIRST_JOB_KIT_FORM_ID` | My First Job Kit download (/resources) | Not needed |
| `NEXT_PUBLIC_HUBSPOT_CV_WORKSHOP_FORM_ID` | First CV Workshop download (/cv-workshop) | Not needed |
| `NEXT_PUBLIC_HUBSPOT_MONEY_MASTERS_FORM_ID` | Money Masters request (form not created yet; page is offline) | Leave unset |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | GA4 measurement ID override | Not needed |
| `NEXT_PUBLIC_DISABLE_ANALYTICS` | Set to `true` to switch GA4 off | Leave unset in Production; set `true` for Preview |

`NODE_ENV` is set automatically by Next.js/Vercel. Because `NEXT_PUBLIC_` values are built into the site, redeploy after changing any of them. On `main`, `.env.example` still lists an old `NEXT_PUBLIC_HUBSPOT_RESOURCES_FORM_ID` that nothing reads any more; it's corrected on `go-live-prep`.

## Settings in the code

Simple on/off flags, each next to the content it controls:

| Flag | File | Now | What it does |
|---|---|---|---|
| `SHOW_MONEY_MASTERS` | `src/content/money-masters.ts` | `false` | Money Masters page (/money-masters is a 404 while off), its /resources row and footer link |
| `SHOW_CITYFIBRE_LINK` | `src/lib/site-config.ts` | `false` | CityFibre footer link (needs `CITYFIBRE_URL` once that page exists) |
| `SHOW_CHELSEA_LOGO` | `src/content/home.ts` | `true` | Chelsea FC crest on the homepage testimonial (logo permission still to confirm) |
| `GEC_PAGE_INDEXABLE` | `src/content/gec-academy.ts` | `false` | Lets search engines index /gec-academy once its claims are signed off |
| `SHOW_GCSE_QUOTE` | `src/content/gcse.ts` | `false` | Quote break on /qualifications (placeholder quote) |
| `SHOW_HOME_QUOTE` | `src/components/sections/HomeQuoteBand.tsx` | `true` | Homepage quote band |
| `SHOW_MINERVA_TESTIMONIAL` | `src/content/minerva.ts` | `true` | Testimonial on /minerva |
| `SHOW_CAREER_LEADERS_STAT` | `src/content/cv-workshop.ts` | `true` | Statistic on /cv-workshop |
| `SHOW_PROPOSED_SEQUENCES` | `src/content/lesson-explorer.ts` | `false` | Unapproved lesson sequences in the Lesson Explorer |
| `SHOW_MISSING_AS_COMING_SOON` | `src/content/lesson-explorer.ts` | `true` | "Coming soon" for years with no programme yet |

## Integrations

**Google Analytics 4** – measurement ID `G-VB855D8YGQ` (`src/lib/analytics.ts`). Uses Consent Mode v2: nothing loads until a visitor clicks Accept on the cookie banner. Only runs on production builds and never on localhost – so it **will** run on `*.vercel.app` Production deployments; set `NEXT_PUBLIC_DISABLE_ANALYTICS=true` for Vercel's Preview environment. Events: `generate_lead`, `demo_click`, `login_click`, `quote_click`.

**HubSpot** – portal `6337342`, region `eu1` (`src/lib/hubspot.ts`). Forms are posted to the HubSpot Forms API from the site's own forms (no HubSpot embed scripts).

| Form | Form ID | Used on |
|---|---|---|
| Request a demo | `50392331-59e5-418f-90b3-5637649a6fa6` | "Request a demo" pop-up (nav and buttons, site-wide) |
| Contact | `5a358bf0-8a69-4999-8046-b1decabb8d8d` | /contact form, and the "Request a tailored quote" pop-up on /pricing |
| ROAR sign-up | `51b30d26-843b-4ed3-8944-70ca0654709b` | /roar |
| Future Jobs Kit 2.0 | `e55ad940-6e59-43f2-b166-49f099230458` | /resources download pop-up |
| My First Job Kit | `aa3a9bf9-2110-4e61-b613-9a232cf922c2` | /resources download pop-up |
| First CV Workshop | `561208a7-c30b-4c1f-ba6c-4303592604af` | /cv-workshop |
| Money Masters request | not created yet | /money-masters (offline) |

Platform login links (Student, Teacher, Admin) live in `src/lib/config.ts`.

## Go-live steps

1. Import the GitHub repo `8billionideas/website-codebase` into the company Vercel account (framework: Next.js; defaults are fine).
2. Add environment variables if any are needed (see above) – at minimum `NEXT_PUBLIC_DISABLE_ANALYTICS=true` for **Preview** only.
3. Deploy `main` and test on the `*.vercel.app` URL: pages, Lesson Explorer, pricing calculator, and each form (they submit to the live HubSpot forms, so use clearly marked test details and delete the test contacts afterwards).
4. Merge `go-live-prep` into `main` (Vercel redeploys automatically). Check `/robots.txt`, `/sitemap.xml` and a few old URLs from the redirect list.
5. In Vercel, add `8billionideas.com` and `www.8billionideas.com` to the project, with `www` as the primary domain and the bare domain redirecting to it.
6. At the DNS provider, update **only** the root (`@`) and `www` records to the values Vercel shows. Don't touch MX, TXT (SPF, DKIM, DMARC, verifications) or `page.8billionideas.com` (HubSpot landing pages).
7. Once live: test every form again on the real domain, and check GA4 Realtime after accepting cookies.
8. Submit `https://www.8billionideas.com/sitemap.xml` in Google Search Console.

## Redirects

- **Old main-site URLs**: every URL in the old site's sitemap redirects (308) to the closest new page. They're in `next.config.ts` on `go-live-prep`, so they go live with step 4.
- **HubSpot pages**: after go-live, set up redirects in HubSpot from `page.8billionideas.com/roar-2026`, `/roar-2024`, `/cv-lesson` and `/future-jobs-kit-2.0` to the new pages on the main site.
- **Money Masters rulebook** (`page.8billionideas.com/money-masters-rulebook`) stays live in HubSpot.

## Contact

Cam Harris – cam@8billionideas.com
