// /careers: role data (src/content/careers.ts), the cards and their pop-outs, and the page wiring.
import { test } from "node:test";
import assert from "node:assert/strict";
import { existsSync, readFileSync, statSync } from "node:fs";
import * as careers from "../src/content/careers.ts";

const { openRoles, freelanceRoles, publishedRoles, careersDownloads, CAREERS_EMAIL, OPEN_ROLES_PDF, FREELANCE_PDF } = careers;
const read = (path) => readFileSync(new URL(`../${path}`, import.meta.url), "utf8");
const pageSources = () =>
  read("src/content/careers.ts") +
  read("src/app/careers/page.tsx") +
  read("src/components/careers/RoleCard.tsx") +
  read("src/components/careers/RoleList.tsx");

// The line in each role's pop-out, as RoleList renders it.
const applyLine = (role) =>
  `${role.applyLead}, email your CV to ${CAREERS_EMAIL} with “${role.emailSubject}” in the subject line.`;

test("each pop-out says how to apply, with the exact subject line", () => {
  assert.deepEqual(
    [...openRoles, ...freelanceRoles].map(applyLine),
    [
      "To apply, email your CV to recruitment@8billionideas.com with “Studio Manager – Video Production” in the subject line.",
      "To apply, email your CV to recruitment@8billionideas.com with “Global Skills Teacher – International GCSE (Online)” in the subject line.",
      "To apply, email your CV to recruitment@8billionideas.com with “Business Development Manager – OxfordAQA” in the subject line.",
      "To join, email your CV to recruitment@8billionideas.com with “Freelance Facilitator” in the subject line.",
    ]
  );
});

test("no mailto links, apply buttons or apply_click event on /careers", () => {
  assert.doesNotMatch(pageSources(), /mailto:|apply_click|trackEvent|Apply now|Join the pool/);
});

test("cards show the one-line summary; each pop-out links to its PDF", () => {
  assert.deepEqual(
    [...openRoles, ...freelanceRoles].map((role) => [role.id, role.summary, role.pdf]),
    [
      [
        "studio-manager",
        "Lead our studio – running shoots in our studio and in schools, managing the production schedule and our UK-based editors, and raising the bar on every video we make.",
        OPEN_ROLES_PDF,
      ],
      [
        "global-skills-teacher",
        "Teach and mentor students through the International GCSE Global Skills Projects online – leading live lessons, guiding project work and helping every student stay on track.",
        OPEN_ROLES_PDF,
      ],
      [
        "business-development-manager",
        "Take the International GCSE Global Skills Projects to schools across the Middle East and beyond – running the full sales cycle with school leaders, from first call to signed contract.",
        OPEN_ROLES_PDF,
      ],
      [
        "freelance-facilitator",
        "Lead high-energy workshops and enrichment sessions in schools across the UAE, bringing our award-winning Critical Curriculum to life.",
        FREELANCE_PDF,
      ],
    ]
  );
  assert.deepEqual(careersDownloads.map((d) => d.href), [OPEN_ROLES_PDF, FREELANCE_PDF]);
});

test("role ids (the pop-out hashes) are unique, plain ASCII and don't clash with the page's ids", () => {
  const ids = [...openRoles, ...freelanceRoles].map((role) => role.id);
  assert.equal(new Set(ids).size, ids.length);
  for (const id of ids) assert.match(id, /^[a-z0-9-]+$/);
  assert.ok(!ids.includes("open-roles"));
  const list = read("src/components/careers/RoleList.tsx");
  assert.match(list, /window\.history\.replaceState\(window\.history\.state, "", `#\$\{id\}`\)/);
  assert.match(list, /addEventListener\("hashchange"/);
});

test("only published roles are shown", () => {
  assert.equal(publishedRoles(openRoles).length, 3);
  const hidden = openRoles.map((role, i) => ({ ...role, published: i !== 1 }));
  assert.deepEqual(
    publishedRoles(hidden).map((role) => role.id),
    ["studio-manager", "business-development-manager"]
  );
});

test("typographic apostrophes and quotes, en dashes, no draft markers", () => {
  const text = JSON.stringify(careers);
  assert.doesNotMatch(text, /'|\\"/, "straight apostrophe or quote in the copy");
  assert.doesNotMatch(pageSources(), /—/);
  assert.doesNotMatch(read("src/content/careers.ts"), /DRAFT/);
});

test("no salary figures and no other email addresses in the careers content", () => {
  const text = JSON.stringify(careers);
  assert.doesNotMatch(text, /AED|£|\$|€|\d\s?k\b|per annum|per month/i);
  assert.deepEqual([...new Set(text.match(/[\w.+-]+@[\w-]+\.[\w.]+/g))], ["recruitment@8billionideas.com"]);
});

test("both PDFs exist and are under 10 MB", () => {
  for (const { href } of careersDownloads) {
    const file = new URL(`../public${href}`, import.meta.url);
    assert.ok(existsSync(file), href);
    assert.ok(statSync(file).size < 10 * 1024 * 1024, href);
  }
});

test("Careers is in the footer and the sitemap, and /careers isn't redirected", () => {
  assert.match(read("src/components/layout/Footer.tsx"), /About us<\/Link><\/li>\n\s*<li><Link href="\/careers" className=\{COLUMN_LINK\}>Careers<\/Link><\/li>/);
  assert.match(read("src/app/sitemap.ts"), /"\/careers",/);
  assert.doesNotMatch(read("next.config.ts"), /\["\/careers"/);
});
