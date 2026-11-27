// /careers: role data (src/content/careers.ts), the "how to apply" line on each card and the page wiring.
import { test } from "node:test";
import assert from "node:assert/strict";
import { existsSync, readFileSync, statSync } from "node:fs";
import * as careers from "../src/content/careers.ts";

const { openRoles, freelanceRoles, publishedRoles, careersDownloads, CAREERS_EMAIL } = careers;
const read = (path) => readFileSync(new URL(`../${path}`, import.meta.url), "utf8");
const pageSources = () =>
  read("src/content/careers.ts") + read("src/app/careers/page.tsx") + read("src/components/careers/RoleCard.tsx");

// The line under each card, as RoleCard renders it.
const applyLine = (role) =>
  `${role.applyLead}, email your CV to ${CAREERS_EMAIL} with “${role.emailSubject}” in the subject line.`;

test("each card says how to apply, with the exact subject line", () => {
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
