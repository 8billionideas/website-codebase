// Run with: npm test   (Node's built-in test runner; Node strips the TypeScript types.)
// Pricing rules version 2026-11-06. Amounts are in pence; £ helpers keep the tests readable.
import { test } from "node:test";
import assert from "node:assert/strict";
import {
  PRICE_RULES_VERSION,
  QUOTE_ADD_ONS,
  CC_BANDS,
  CC_LIST_RATE,
  CC_MIN_UNITS,
  CC_UNITS_MAX,
  addOnCost,
  addOnLineLabel,
  addOnSummary,
  addOnsTotal,
  ccBandLines,
  ccCharge,
  ccList,
  ccNextBand,
  ccNextBandMessage,
  ccStatus,
  crossProductHint,
  formatMoney,
  gcseFee,
  gcseNextBand,
  gcseRate,
  ordinal,
  priceQuote,
  quoteBreakdownLines,
  addOnCredits,
  creditAllowance,
  priceCc,
  priceGcse,
} from "../src/lib/pricing.ts";

const gbp = (amount) => Math.round(amount * 100);

test("rules version", () => {
  assert.equal(PRICE_RULES_VERSION, "2026-11-06");
});

// ── Critical Curriculum: marginal bands and the five-programme minimum ──
// The formula from the pricing brief, written out independently of the config.
const briefTotal = (n) =>
  95 * Math.min(n, 13) + 75 * Math.max(Math.min(n - 13, 19), 0) + 55 * Math.max(Math.min(n - 32, 32), 0) + 40 * Math.max(n - 64, 0);
// N programmes = N year groups × 1 pillar (13 × 6 = 78 for the maximum).
const ccQuote = (n) => priceQuote({ cc: n === 78 ? { yearGroups: 13, pillars: 6 } : { yearGroups: n, pillars: 1 } });

test("CC bands: £95 (1–13), £75 (14–32), £55 (33–64), £40 (65+); max 78 programmes", () => {
  assert.deepEqual(
    CC_BANDS.map((b) => [b.from, b.to, b.rate]),
    [[1, 13, gbp(95)], [14, 32, gbp(75)], [33, 64, gbp(55)], [65, null, gbp(40)]]
  );
  assert.equal(CC_MIN_UNITS, 5);
  assert.equal(CC_UNITS_MAX, 78);
});

test("CC 0 programmes → no price, no quote", () => {
  const q = priceQuote({ cc: { yearGroups: 0, pillars: 1 } });
  assert.equal(q.ccSelection.status, "none");
  assert.equal(q.cc, undefined);
  assert.equal(q.quoteReady, false);
  assert.equal(ccStatus(0), "none");
});

test("CC 4 programmes → below the minimum: 1 more needed, no price, no submission", () => {
  const q = ccQuote(4);
  assert.equal(q.ccSelection.status, "below-minimum");
  assert.equal(q.ccSelection.needed, 1);
  assert.equal(q.cc, undefined);
  assert.equal(q.annualRecurring, 0);
  assert.equal(q.quoteReady, false);
});

test("CC exact totals: 5 → £475 … 78 → £4,980", () => {
  const expected = { 5: 475, 13: 1235, 14: 1310, 32: 2660, 33: 2715, 64: 4420, 65: 4460, 78: 4980 };
  for (const [n, total] of Object.entries(expected).map(([n, t]) => [Number(n), t])) {
    const q = ccQuote(n);
    assert.equal(q.cc.units, n);
    assert.equal(q.cc.charge, gbp(total), `${n} programmes`);
    assert.equal(q.annualRecurring, gbp(total), `${n} programmes`);
    assert.equal(q.quoteReady, true);
  }
});

test("CC charge matches the brief's formula for every count, and never drops as programmes are added", () => {
  for (let n = 0; n <= 78; n++) assert.equal(ccCharge(n), gbp(briefTotal(n)), `${n} programmes`);
  for (let n = 1; n < 78; n++) assert.ok(ccCharge(n + 1) > ccCharge(n));
});

test("total per month = total per year ÷ 12 (whole pounds when exact, otherwise to the penny)", () => {
  const monthly = (q) => [formatMoney(q.annualRecurring), formatMoney(q.monthlyRecurring)];
  assert.deepEqual(monthly(ccQuote(5)), ["£475", "£39.58"]);
  assert.deepEqual(monthly(ccQuote(13)), ["£1,235", "£102.92"]);
  assert.deepEqual(monthly(priceQuote({ cc: { yearGroups: 8, pillars: 5 }, gcse: { students: 120 } })), ["£8,800", "£733.33"]);
  assert.deepEqual(monthly(priceQuote({ gcse: { students: 120 } })), ["£6,000", "£500"]);
  // Recurring only: one-off extras don't change it.
  assert.equal(priceQuote({ cc: { yearGroups: 5, pillars: 1 }, addOns: [{ id: "cpd" }] }).monthlyRecurring, gbp(39.58));
});

test("CC boundaries, adding and removing: 4↔5, 13↔14, 32↔33, 64↔65", () => {
  // [from, to, change in price]
  for (const [a, b, step] of [[13, 14, 75], [32, 33, 55], [64, 65, 40]]) {
    assert.equal(ccCharge(b) - ccCharge(a), gbp(step), `${a}→${b}`);
    assert.equal(ccCharge(a) - ccCharge(b), -gbp(step), `${b}→${a}`);
  }
  assert.equal(ccQuote(5).cc.charge, gbp(475));
  assert.equal(ccQuote(5).quoteReady, true);
  assert.equal(ccQuote(4).cc, undefined); // removing the fifth programme withdraws the licence price
  assert.equal(ccQuote(4).quoteReady, false);
});

test("CC band breakdown (for the quote message)", () => {
  const lines = (n) => ccBandLines(n).map((l) => [l.units, l.band.rate, l.subtotal]);
  assert.deepEqual(lines(19), [[13, gbp(95), gbp(1235)], [6, gbp(75), gbp(450)]]);
  assert.deepEqual(lines(78), [[13, gbp(95), gbp(1235)], [19, gbp(75), gbp(1425)], [32, gbp(55), gbp(1760)], [14, gbp(40), gbp(560)]]);
  assert.deepEqual(lines(0), []);
});

test("CC list is £95 per programme (the first band); saving = list − charge", () => {
  assert.equal(CC_LIST_RATE, gbp(95));
  assert.equal(ccList(10), gbp(950));
  assert.equal(priceCc(2, 5).saving, 0); // 10 programmes: all at £95
  assert.equal(priceCc(2, 7).saving, gbp(20)); // 14 programmes: the 14th is £75
  assert.equal(priceCc(13, 6).saving, gbp(7410 - 4980));
});

test("CC next band", () => {
  assert.deepEqual(ccNextBand(5), { threshold: 14, needed: 9, rate: gbp(75), currentRate: gbp(95) });
  assert.deepEqual(ccNextBand(13), { threshold: 14, needed: 1, rate: gbp(75), currentRate: gbp(95) });
  assert.deepEqual(ccNextBand(14), { threshold: 33, needed: 19, rate: gbp(55), currentRate: gbp(75) });
  assert.deepEqual(ccNextBand(64), { threshold: 65, needed: 1, rate: gbp(40), currentRate: gbp(55) });
  assert.equal(ccNextBand(65), null);
  assert.equal(ccNextBand(78), null);
});

test("CC next-band nudge", () => {
  assert.equal(ccNextBandMessage(0), null);
  assert.equal(ccNextBandMessage(3), "Add 11 more programmes to unlock £75 for additional programmes");
  assert.equal(ccNextBandMessage(5), "Add 9 more programmes to unlock £75 for additional programmes");
  assert.equal(ccNextBandMessage(13), "Your next programme is £75");
  assert.equal(ccNextBandMessage(14), "Add 19 more programmes to unlock £55 for additional programmes");
  assert.equal(ccNextBandMessage(32), "Your next programme is £55");
  assert.equal(ccNextBandMessage(33), "Add 32 more programmes to unlock £40 for additional programmes");
  assert.equal(ccNextBandMessage(40), "Add 25 more programmes to unlock £40 for additional programmes");
  assert.equal(ccNextBandMessage(64), "Your next programme is £40");
  assert.equal(ccNextBandMessage(65), "Additional programmes are £40 each");
  assert.equal(ccNextBandMessage(78), "Additional programmes are £40 each");
});

test("CC below the minimum alongside GCSE: GCSE still priced, but no CC price, benefits or quote", () => {
  const q = priceQuote({ cc: { yearGroups: 4, pillars: 1 }, gcse: { students: 30 }, addOns: [{ id: "cpd" }] });
  assert.equal(q.cc, undefined);
  assert.equal(q.gcse.fee, gbp(2550));
  assert.equal(q.crossProduct.earned, 0);
  assert.equal(q.serviceCredit.allowance, 0);
  assert.equal(q.quoteReady, false);
  // Deselecting the CC (GCSE only) makes the quote available again.
  assert.equal(priceQuote({ gcse: { students: 30 } }).quoteReady, true);
});

// ── GCSE: whole-cohort rate ──
test("GCSE fee: one rate for the whole cohort (cliffs are intentional)", () => {
  assert.equal(gcseFee(10), gbp(1050));
  assert.equal(gcseFee(25), gbp(2625));
  assert.equal(gcseFee(26), gbp(2210));
  assert.equal(gcseFee(199), gbp(8955));
  assert.equal(gcseFee(200), gbp(8000));
  assert.equal(gcseRate(150), gbp(50));
  assert.equal(gcseRate(151), gbp(45));
});

test("GCSE full price (every student at £105) and saving", () => {
  assert.deepEqual([priceGcse(50).full, priceGcse(50).fee, priceGcse(50).saving], [gbp(5250), gbp(4250), gbp(1000)]);
  assert.equal(priceGcse(20).saving, 0);
  assert.equal(priceGcse(200).saving, gbp(13000));
});

test("GCSE next band", () => {
  assert.deepEqual(gcseNextBand(25), { threshold: 26, needed: 1, rate: gbp(85) });
  assert.deepEqual(gcseNextBand(26), { threshold: 51, needed: 25, rate: gbp(65) });
  assert.deepEqual(gcseNextBand(199), { threshold: 200, needed: 1, rate: gbp(40) });
  assert.equal(gcseNextBand(200), null);
});

// ── Cross-product benefit (X) ──
test("no cross-product benefit below 15 students", () => {
  const q = priceQuote({ cc: { yearGroups: 4, pillars: 6 }, gcse: { students: 10 } });
  assert.equal(q.crossProduct.earned, 0);
  assert.equal(q.gcse.fee, gbp(1050));
  assert.equal(crossProductHint(10), 5);
  assert.equal(crossProductHint(15), null);
});

test("24 CC + 20 GCSE → X = £105; annual recurring £4,055", () => {
  const q = priceQuote({ cc: { yearGroups: 4, pillars: 6 }, gcse: { students: 20 } });
  assert.equal(q.cc.units, 24);
  assert.equal(q.cc.charge, gbp(2060));
  assert.equal(q.crossProduct.earned, gbp(105));
  assert.equal(q.crossProduct.applied, gbp(105));
  assert.equal(q.annualRecurring, gbp(4055));
});

test("40 CC + 120 GCSE → X capped at £300; annual recurring £8,800", () => {
  // X = MIN(£1,200, £300, 15% × £3,800 = £570, 5% × £6,000 = £300) = £300.
  const q = priceQuote({ cc: { yearGroups: 8, pillars: 5 }, gcse: { students: 120 } });
  assert.equal(q.cc.charge, gbp(3100));
  assert.equal(q.gcse.fee, gbp(6000));
  assert.equal(q.crossProduct.applied, gbp(300));
  assert.equal(q.annualRecurring, gbp(8800));
});

test("X needs both products", () => {
  assert.equal(priceQuote({ gcse: { students: 100 } }).crossProduct.earned, 0);
  assert.equal(priceQuote({ cc: { yearGroups: 13, pillars: 6 } }).crossProduct.earned, 0);
});

// ── Add-on credit (S): Decisions 48–49 ──
// N units = N year groups × 1 pillar.
const credits = (units, addOns) => addOnCredits(priceCc(units, 1), addOns);
const line = (q, id) => q.services.find((s) => s.id === id);

test("allowance by CC units (the £25 tier is live)", () => {
  assert.equal(creditAllowance(1), gbp(25));
  assert.equal(creditAllowance(5), gbp(25));
  assert.equal(creditAllowance(6), gbp(75));
  assert.equal(creditAllowance(17), gbp(75));
  assert.equal(creditAllowance(18), gbp(150));
  assert.equal(creditAllowance(35), gbp(150));
  assert.equal(creditAllowance(36), gbp(300));
});

test("24 CC + 1 Online Experience → credit £99.50; net £895.50; remaining £50.50", () => {
  const q = priceQuote({ cc: { yearGroups: 4, pillars: 6 }, addOns: [{ id: "online-experience" }] });
  assert.equal(q.serviceCredit.allowance, gbp(150));
  assert.equal(line(q, "online-experience").creditApplied, gbp(99.5));
  assert.equal(line(q, "online-experience").net, gbp(895.5));
  assert.equal(q.serviceCredit.applied, gbp(99.5));
  assert.equal(q.serviceCredit.remaining, gbp(50.5));
});

test("36 CC + 1 CPD + 1 Online → £197.50 + £99.50 = £297; remaining £3", () => {
  const c = credits(36, [{ id: "online-experience" }, { id: "cpd" }]); // order given doesn't matter
  assert.deepEqual(c.lines.map((l) => [l.id, l.credit]), [["cpd", gbp(197.5)], ["online-experience", gbp(99.5)]]);
  assert.equal(c.total, gbp(297));
  assert.equal(c.remaining, gbp(3));
});

// 5 programmes is now the smallest licence, so the £25 tier only applies at exactly 5.
test("5 CC + 1 CPD → £25 (allowance-limited)", () => {
  assert.equal(credits(5, [{ id: "cpd" }]).total, gbp(25));
});

test("5 CC + 1 Assembly → £22.50 (5% cap); remaining £2.50", () => {
  const c = credits(5, [{ id: "assembly" }]);
  assert.equal(c.lines[0].ceiling, gbp(22.5));
  assert.equal(c.total, gbp(22.5));
  assert.equal(c.remaining, gbp(2.5));
});

test("18 CC + Live Experience up to 100 × 2 days (£3,600) → ceiling £180; credit £150", () => {
  const c = credits(18, [{ id: "live-experience", options: { groupId: "100", days: 2 } }]);
  assert.equal(c.lines[0].fee, gbp(3600));
  assert.equal(c.lines[0].pct, 5);
  assert.equal(c.lines[0].ceiling, gbp(180));
  assert.equal(c.total, gbp(150));
});

test("CPD: 6 CC → £75; 36 CC → £197.50; 36 CC + 2 CPD → £300 (shared allowance, £197.50 per booking)", () => {
  assert.equal(credits(6, [{ id: "cpd" }]).total, gbp(75));
  assert.equal(credits(36, [{ id: "cpd" }]).total, gbp(197.5));
  const two = credits(36, [{ id: "cpd", options: { quantity: 2 } }]);
  assert.equal(two.lines[0].ceiling, gbp(395));
  assert.equal(two.total, gbp(300));
});

test("GCSE only + any add-on → no credit", () => {
  for (const addOn of [{ id: "cpd" }, { id: "online-experience" }, { id: "live-experience" }, { id: "assembly" }]) {
    const q = priceQuote({ gcse: { students: 40 }, addOns: [addOn] });
    assert.equal(q.serviceCredit.allowance, 0);
    assert.equal(q.serviceCredit.applied, 0);
  }
});

// ── Anti-stacking ──
test("24 CC + 20 GCSE + 1 CPD (single line) → X £105, S £150, C = MIN(£395, £342) → both apply", () => {
  const q = priceQuote({ cc: { yearGroups: 4, pillars: 6 }, gcse: { students: 20 }, addOns: [{ id: "cpd" }] });
  assert.equal(q.crossProduct.earned, gbp(105));
  assert.equal(q.serviceCredit.earned, gbp(150));
  assert.deepEqual(q.stacking, { basis: "single-line", lineId: "cpd", cap: gbp(342), combined: gbp(255), outcome: "both" });
  assert.equal(q.crossProduct.dropped, false);
  assert.equal(q.crossProduct.applied, gbp(105));
  assert.equal(q.serviceCredit.applied, gbp(150));
  assert.equal(q.pendingCombinationReview, false);
  assert.equal(q.annualRecurring, gbp(4055));
  assert.equal(q.oneOff, gbp(1825));
  assert.equal(q.year1Total, gbp(5880));
});

test("10 CC + 20 GCSE + 1 CPD (single line) → C = MIN(£395, £142.50) → only the larger (S)", () => {
  // X = MIN(£200, £300, 15% × £950 = £142.50, 5% × £2,100 = £105) = £105; S = £75; £180 > £142.50.
  const q = priceQuote({ cc: { yearGroups: 10, pillars: 1 }, gcse: { students: 20 }, addOns: [{ id: "cpd" }] });
  assert.deepEqual(q.stacking, { basis: "single-line", lineId: "cpd", cap: gbp(142.5), combined: gbp(180), outcome: "larger" });
  assert.equal(q.crossProduct.dropped, false);
  assert.equal(q.crossProduct.applied, gbp(105));
  assert.equal(q.serviceCredit.dropped, true);
});

test("24 CC + 20 GCSE + CPD + Online: the allowance is used up on CPD, so the single-line rule applies", () => {
  const q = priceQuote({ cc: { yearGroups: 4, pillars: 6 }, gcse: { students: 20 }, addOns: [{ id: "cpd" }, { id: "online-experience" }] });
  assert.equal(line(q, "cpd").credit, gbp(150));
  assert.equal(line(q, "online-experience").credit, 0);
  assert.equal(q.stacking.basis, "single-line");
  assert.equal(q.stacking.cap, gbp(342));
  assert.equal(q.serviceCredit.applied, gbp(150));
  assert.equal(q.crossProduct.applied, gbp(105));
  assert.equal(q.pendingCombinationReview, false);
});

test("36 CC + 20 GCSE + CPD + Online (two credited lines) → only the larger (S £297), flagged for review", () => {
  const q = priceQuote({ cc: { yearGroups: 6, pillars: 6 }, gcse: { students: 20 }, addOns: [{ id: "cpd" }, { id: "online-experience" }] });
  assert.equal(q.crossProduct.earned, gbp(105));
  assert.equal(q.serviceCredit.earned, gbp(297));
  assert.deepEqual(q.stacking, { basis: "multi-line", cap: null, combined: gbp(402), outcome: "larger" });
  assert.equal(q.serviceCredit.applied, gbp(297));
  assert.equal(q.crossProduct.applied, 0);
  assert.equal(q.pendingCombinationReview, true);
  assert.equal(q.annualRecurring, gbp(2880 + 2100));
  assert.equal(q.oneOff, gbp(1975 + 995 - 297));
});

test("both benefits apply when X + S fits under a single line's cap", () => {
  // 78 programmes: list £7,410 (15% = £1,111.50); 1 CPD £1,975 (20% = £395); X £78.75 + S £197.50 = £276.25 ≤ £395.
  const q = priceQuote({ cc: { yearGroups: 13, pillars: 6 }, gcse: { students: 15 }, addOns: [{ id: "cpd" }] });
  assert.equal(q.stacking.outcome, "both");
  assert.equal(q.crossProduct.applied, gbp(78.75));
  assert.equal(q.serviceCredit.applied, gbp(197.5));
});

test("when X is the larger benefit, the add-on credit is dropped and lines pay full price", () => {
  // 5 programmes: allowance £25; 1 Assembly credit £22.50. 5 programmes + 40 students:
  // X = MIN(£400, £300, 15% × £475 = £71.25, 5% × £3,400 = £170) = £71.25.
  const q = priceQuote({ cc: { yearGroups: 5, pillars: 1 }, gcse: { students: 40 }, addOns: [{ id: "assembly" }] });
  assert.equal(q.crossProduct.applied, gbp(71.25));
  assert.equal(q.serviceCredit.dropped, true);
  assert.equal(line(q, "assembly").creditApplied, 0);
  assert.equal(line(q, "assembly").net, gbp(450));
  assert.equal(q.serviceCredit.remaining, gbp(25));
});

// ── Services ──
test("add-ons are the four priced extras, in order", () => {
  assert.deepEqual(
    QUOTE_ADD_ONS.map((a) => a.id),
    ["cpd", "online-experience", "live-experience", "assembly"]
  );
  assert.equal(QUOTE_ADD_ONS.find((a) => a.id === "cpd").unit, "per booking");
});

test("service prices are unchanged", () => {
  assert.equal(addOnCost("cpd"), gbp(1975));
  assert.equal(addOnCost("cpd", { quantity: 2 }), gbp(3950));
  assert.equal(addOnCost("online-experience", { quantity: 3 }), gbp(2985));
  assert.equal(addOnCost("live-experience", { groupId: "100", days: 2 }), gbp(3600));
  assert.equal(addOnCost("live-experience", { groupId: "200", days: 1 }), gbp(3600));
  assert.equal(addOnCost("live-experience"), gbp(900));
  assert.equal(addOnCost("assembly", { quantity: 3 }), gbp(1350));
  // Quantities stay within 1–10.
  assert.equal(addOnCost("assembly", { quantity: 0 }), gbp(450));
  assert.equal(addOnCost("assembly", { quantity: 25 }), gbp(4500));
  assert.equal(addOnsTotal([{ id: "cpd" }, { id: "live-experience", options: { groupId: "100", days: 2 } }, { id: "assembly", options: { quantity: 2 } }]), gbp(6475));
});

// ── Formatting and summaries ──
test("money shows pennies only when needed", () => {
  assert.equal(formatMoney(gbp(1167.5)), "£1,167.50");
  assert.equal(formatMoney(gbp(450)), "£450");
  assert.equal(formatMoney(gbp(3345)), "£3,345");
  assert.equal(formatMoney(gbp(197.5)), "£197.50");
  // The CC totals as shown on the page.
  assert.deepEqual(
    [5, 13, 14, 32, 33, 64, 65, 78].map((n) => formatMoney(ccCharge(n))),
    ["£475", "£1,235", "£1,310", "£2,660", "£2,715", "£4,420", "£4,460", "£4,980"]
  );
  assert.equal(ordinal(10), "10th");
  assert.equal(ordinal(25), "25th");
  assert.equal(ordinal(49), "49th");
  assert.equal(ordinal(21), "21st");
});

test("summary labels", () => {
  assert.equal(addOnLineLabel("cpd", { quantity: 2 }), "CPD × 2");
  assert.equal(addOnLineLabel("live-experience", { groupId: "100", days: 2 }), "Live Experience · up to 100 students · 2 days");
  assert.equal(
    addOnSummary([{ id: "cpd", options: { quantity: 2 } }, { id: "live-experience", options: { groupId: "100", days: 2 } }]),
    "CPD × 2 (£3,950); Live Experience, up to 100 students × 2 days (£3,600)"
  );
  assert.equal(addOnSummary([]), "");
});

test("HubSpot breakdown lines cover the whole calculation", () => {
  const q = priceQuote({ cc: { yearGroups: 4, pillars: 6 }, gcse: { students: 20 }, addOns: [{ id: "cpd" }] });
  const text = quoteBreakdownLines(q, "2026-11-06T10:00:00+00:00", "2026-12-06").join("\n");
  for (const fragment of [
    "Pricing rules version: 2026-11-06",
    "Critical Curriculum: Standard licence request (5+ programmes)",
    "CC programmes: 24 (4 year group(s) × 6 pillar(s) per year group)",
    "CC bands: 13 × £95 = £1,235; 11 × £75 = £825",
    "CC price: £2,060 / year · list £2,280 (£95 per programme) · saving £220",
    "band 10–25 at £105 per student",
    "Combined benefit (X): −£105 applied",
    "CPD × 1: fee £1,975 · cap 10% · ceiling £197.50 · credit applied £150 · net £1,825",
    "Add-on credit (S): allowance £150 · credit used £150 · remaining £0",
    "cap C £342",
    "both applied",
    "Pending combination review (Decision 50): no",
    "Price valid until: 2026-12-06",
    "Annual (recurring): £4,055",
    "One-off services: £1,825",
    "Year 1 total: £5,880",
    "Submitted at: 2026-11-06T10:00:00+00:00",
    "Excludes VAT/tax",
  ]) {
    assert.ok(text.includes(fragment), `missing: ${fragment}`);
  }
});

test("HubSpot breakdown: every band used is listed (78 programmes)", () => {
  const text = quoteBreakdownLines(priceQuote({ cc: { yearGroups: 13, pillars: 6 } }), "2026-11-06T10:00:00+00:00").join("\n");
  assert.ok(text.includes("CC bands: 13 × £95 = £1,235; 19 × £75 = £1,425; 32 × £55 = £1,760; 14 × £40 = £560"));
  assert.ok(text.includes("CC price: £4,980 / year"));
});
