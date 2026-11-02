// Run with: npm test   (Node's built-in test runner; Node strips the TypeScript types.)
// Pricing rules version 2026-10-30. Amounts are in pence; £ helpers keep the tests readable.
import { test } from "node:test";
import assert from "node:assert/strict";
import {
  PRICE_RULES_VERSION,
  QUOTE_ADD_ONS,
  addOnCost,
  addOnLineLabel,
  addOnSummary,
  addOnsTotal,
  ccCharge,
  ccList,
  ccNextBand,
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
  assert.equal(PRICE_RULES_VERSION, "2026-10-30b");
});

// ── Critical Curriculum: marginal bands ──
test("CC charge: band boundaries (each band prices only its own units)", () => {
  assert.equal(ccCharge(1), gbp(50));
  assert.equal(ccCharge(9), gbp(450));
  assert.equal(ccCharge(10) - ccCharge(9), gbp(45)); // the 10th adds £45
  assert.equal(ccCharge(10), gbp(495));
  assert.equal(ccCharge(24), gbp(1125));
  assert.equal(ccCharge(25) - ccCharge(24), gbp(42.5)); // the 25th adds £42.50
  assert.equal(ccCharge(25), gbp(1167.5));
  assert.equal(ccCharge(36), gbp(1635));
  assert.equal(ccCharge(48), gbp(2145));
  assert.equal(ccCharge(49) - ccCharge(48), gbp(40)); // the 49th adds £40
  assert.equal(ccCharge(49), gbp(2185));
  assert.equal(ccCharge(78), gbp(3345));
});

test("CC list is £50 per unit; adding units never lowers the price of earlier ones", () => {
  assert.equal(ccList(10), gbp(500));
  assert.equal(priceCc(2, 5).saving, gbp(5));
  for (let n = 1; n < 78; n++) assert.ok(ccCharge(n + 1) > ccCharge(n));
});

test("CC next band", () => {
  assert.deepEqual(ccNextBand(9), { threshold: 10, needed: 1, rate: gbp(45), currentRate: gbp(50) });
  assert.deepEqual(ccNextBand(10), { threshold: 25, needed: 15, rate: gbp(42.5), currentRate: gbp(45) });
  assert.deepEqual(ccNextBand(24), { threshold: 25, needed: 1, rate: gbp(42.5), currentRate: gbp(45) });
  assert.deepEqual(ccNextBand(48), { threshold: 49, needed: 1, rate: gbp(40), currentRate: gbp(42.5) });
  assert.equal(ccNextBand(49), null);
  assert.equal(ccNextBand(78), null);
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

test("24 CC + 20 GCSE → X = £105; annual recurring £3,120", () => {
  const q = priceQuote({ cc: { yearGroups: 4, pillars: 6 }, gcse: { students: 20 } });
  assert.equal(q.cc.units, 24);
  assert.equal(q.crossProduct.earned, gbp(105));
  assert.equal(q.crossProduct.applied, gbp(105));
  assert.equal(q.annualRecurring, gbp(3120));
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

test("3 CC + 1 CPD → £25 (allowance-limited)", () => {
  assert.equal(credits(3, [{ id: "cpd" }]).total, gbp(25));
});

test("3 CC + 1 Assembly → £22.50 (5% cap); remaining £2.50", () => {
  const c = credits(3, [{ id: "assembly" }]);
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
test("24 CC + 20 GCSE + 1 CPD (single line) → X £105, S £150, C = MIN(£395, £180) → only S", () => {
  const q = priceQuote({ cc: { yearGroups: 4, pillars: 6 }, gcse: { students: 20 }, addOns: [{ id: "cpd" }] });
  assert.equal(q.crossProduct.earned, gbp(105));
  assert.equal(q.serviceCredit.earned, gbp(150));
  assert.deepEqual(q.stacking, { basis: "single-line", lineId: "cpd", cap: gbp(180), combined: gbp(255), outcome: "larger" });
  assert.equal(q.crossProduct.dropped, true);
  assert.equal(q.serviceCredit.applied, gbp(150));
  assert.equal(q.pendingCombinationReview, false);
  assert.equal(q.annualRecurring, gbp(3225));
  assert.equal(q.oneOff, gbp(1825));
  assert.equal(q.year1Total, gbp(5050));
});

test("24 CC + 20 GCSE + CPD + Online: the allowance is used up on CPD, so the single-line rule applies", () => {
  const q = priceQuote({ cc: { yearGroups: 4, pillars: 6 }, gcse: { students: 20 }, addOns: [{ id: "cpd" }, { id: "online-experience" }] });
  assert.equal(line(q, "cpd").credit, gbp(150));
  assert.equal(line(q, "online-experience").credit, 0);
  assert.equal(q.stacking.basis, "single-line");
  assert.equal(q.stacking.cap, gbp(180));
  assert.equal(q.serviceCredit.applied, gbp(150));
  assert.equal(q.crossProduct.applied, 0);
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
  assert.equal(q.annualRecurring, gbp(1635 + 2100));
  assert.equal(q.oneOff, gbp(1975 + 995 - 297));
});

test("both benefits apply when X + S fits under a single line's cap", () => {
  // 78 units: list £3,900 (15% = £585); 1 CPD £1,975 (20% = £395); X £78.75 + S £197.50 = £276.25 ≤ £395.
  const q = priceQuote({ cc: { yearGroups: 13, pillars: 6 }, gcse: { students: 15 }, addOns: [{ id: "cpd" }] });
  assert.equal(q.stacking.outcome, "both");
  assert.equal(q.crossProduct.applied, gbp(78.75));
  assert.equal(q.serviceCredit.applied, gbp(197.5));
});

test("when X is the larger benefit, the add-on credit is dropped and lines pay full price", () => {
  // 5 units: allowance £25; 1 Assembly credit £22.50. 5 units + 40 students: X = MIN(£400, £300, 15% × £250 = £37.50, 5% × £3,400) = £37.50.
  const q = priceQuote({ cc: { yearGroups: 5, pillars: 1 }, gcse: { students: 40 }, addOns: [{ id: "assembly" }] });
  assert.equal(q.crossProduct.applied, gbp(37.5));
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
  const text = quoteBreakdownLines(q, "2026-10-30T10:00:00+00:00", "2026-11-29").join("\n");
  for (const fragment of [
    "Pricing rules version: 2026-10-30b",
    "= 24 units",
    "list £1,200",
    "charge £1,125 / year",
    "band 10–25 at £105 per student",
    "Combined benefit (X): £105 earned, NOT applied",
    "CPD × 1: fee £1,975 · cap 10% · ceiling £197.50 · credit applied £150 · net £1,825",
    "Add-on credit (S): allowance £150 · credit used £150 · remaining £0",
    "cap C £180",
    "Pending combination review (Decision 50): no",
    "Price valid until: 2026-11-29",
    "X dropped",
    "Annual (recurring): £3,225",
    "One-off services: £1,825",
    "Year 1 total: £5,050",
    "Submitted at: 2026-10-30T10:00:00+00:00",
    "Excludes VAT/tax",
  ]) {
    assert.ok(text.includes(fragment), `missing: ${fragment}`);
  }
});
