// The /pricing maths, in one pure, tested module (tests/pricing.test.mjs). Every amount is in
// whole pence; formatMoney() turns pence into "£1,167.50" / "£450" for display.
// Rules version 2026-10-30b: marginal Critical Curriculum unit bands, a whole-cohort GCSE rate, a
// conditional cross-product benefit (X), a CC-earned add-on credit (S) and an anti-stacking rule.

// Add-on credits per Decisions 48–49; Decision 50 pending.
export const PRICE_RULES_VERSION = "2026-10-30b";

// Calculator product selected on load: "cc" is Critical Curriculum (the others are "gcse" and "both").
export const DEFAULT_PRODUCT = "cc";

const pounds = (amount: number) => Math.round(amount * 100);
const pct = (pence: number, percent: number) => Math.round((pence * percent) / 100);

// ── Critical Curriculum (CC) ────────────────────────────────────────────────────────────────
// One unit = one pillar in one year group. Six pillars are available now (Sustainability and
// Technology are coming soon), so up to 13 × 6 = 78 units.

export const YEAR_GROUPS_MIN = 1;
export const YEAR_GROUPS_MAX = 13;
export const PILLARS_MIN = 1;
export const PILLARS_MAX = 6;
export const DEFAULT_YEAR_GROUPS = 1;
export const DEFAULT_PILLARS = 1;
export const CC_UNITS_MAX = YEAR_GROUPS_MAX * PILLARS_MAX;

// List price per unit, before volume rates.
export const CC_LIST_RATE = pounds(50);

// Marginal bands: each band prices only the units inside it.
export interface CcBand {
  from: number; // first unit in the band
  to: number | null; // last unit, or null for "and above"
  rate: number; // pence per unit
}

export const CC_BANDS: CcBand[] = [
  { from: 1, to: 9, rate: pounds(50) },
  { from: 10, to: 24, rate: pounds(45) },
  { from: 25, to: 48, rate: pounds(42.5) },
  { from: 49, to: null, rate: pounds(40) },
];

export const ccUnits = (yearGroups: number, pillars: number) => yearGroups * pillars;

export function ccCharge(units: number): number {
  return CC_BANDS.reduce((sum, band) => {
    const upper = band.to ?? Infinity;
    const inBand = Math.max(0, Math.min(units, upper) - band.from + 1);
    return sum + inBand * band.rate;
  }, 0);
}

export const ccList = (units: number) => units * CC_LIST_RATE;

// The rate of the nth unit (the band it falls in).
export function ccUnitRate(n: number): number {
  return (CC_BANDS.find((b) => n >= b.from && (b.to === null || n <= b.to)) ?? CC_BANDS[0]).rate;
}

export interface CcNextBand {
  threshold: number; // the first unit at the next rate (10, 25 or 49)
  needed: number; // units to add to reach it
  rate: number; // the rate from that unit on
  currentRate: number; // the rate of the band the units are in now
}

export function ccNextBand(units: number): CcNextBand | null {
  const next = CC_BANDS.find((b) => b.from > units);
  if (!next) return null;
  return { threshold: next.from, needed: next.from - units, rate: next.rate, currentRate: ccUnitRate(Math.max(1, units)) };
}

export interface CcPrice {
  yearGroups: number;
  pillars: number;
  units: number;
  list: number;
  charge: number;
  saving: number;
}

export function priceCc(yearGroups: number, pillars: number): CcPrice {
  const units = ccUnits(yearGroups, pillars);
  const charge = ccCharge(units);
  const list = ccList(units);
  return { yearGroups, pillars, units, list, charge, saving: list - charge };
}

// ── International GCSE ──────────────────────────────────────────────────────────────────────
// One whole-cohort rate for every student (the cliffs between bands are intentional).

export const STUDENTS_MIN = 10;
export const STUDENTS_MAX = 2000;
export const DEFAULT_STUDENTS = 10;

export interface GcseBand {
  min: number;
  max: number | null;
  rate: number; // pence per student
}

export const GCSE_BANDS: GcseBand[] = [
  { min: 10, max: 25, rate: pounds(105) },
  { min: 26, max: 50, rate: pounds(85) },
  { min: 51, max: 100, rate: pounds(65) },
  { min: 101, max: 150, rate: pounds(50) },
  { min: 151, max: 199, rate: pounds(45) },
  { min: 200, max: null, rate: pounds(40) },
];

export function gcseBand(students: number): GcseBand {
  return GCSE_BANDS.find((b) => students >= b.min && (b.max === null || students <= b.max)) ?? GCSE_BANDS[0];
}

export const gcseRate = (students: number) => gcseBand(students).rate;
export const gcseFee = (students: number) => students * gcseRate(students);

export const gcseBandLabel = (band: GcseBand) => (band.max === null ? `${band.min}+` : `${band.min}–${band.max}`);

export interface GcseNextBand {
  threshold: number; // 26, 51, 101, 151 or 200
  needed: number;
  rate: number;
}

export function gcseNextBand(students: number): GcseNextBand | null {
  const next = GCSE_BANDS.find((b) => b.min > students);
  return next ? { threshold: next.min, needed: next.min - students, rate: next.rate } : null;
}

export interface GcsePrice {
  students: number;
  rate: number;
  fee: number;
  band: string; // "26–50"
}

export function priceGcse(students: number): GcsePrice {
  const band = gcseBand(students);
  return { students, rate: band.rate, fee: students * band.rate, band: gcseBandLabel(band) };
}

// ── Cross-product benefit (X) ───────────────────────────────────────────────────────────────
// Both products, 15+ students: MIN(£10 × students, £300, 15% of the CC list, 5% of the GCSE fee),
// never more than the CC charge. Conditional: earned once the GCSE cohort is purchased and activated.

export const CROSS_PRODUCT_MIN_STUDENTS = 15;
export const CROSS_PRODUCT_CAP = pounds(300);

export function crossProductBenefit(cc: CcPrice | undefined, gcse: GcsePrice | undefined): number {
  if (!cc || !gcse || gcse.students < CROSS_PRODUCT_MIN_STUDENTS) return 0;
  const x = Math.min(gcse.students * pounds(10), CROSS_PRODUCT_CAP, pct(cc.list, 15), pct(gcse.fee, 5));
  return Math.min(x, cc.charge);
}

// Students still needed to qualify (null once there are enough).
export function crossProductHint(students: number): number | null {
  return students < CROSS_PRODUCT_MIN_STUDENTS ? CROSS_PRODUCT_MIN_STUDENTS - students : null;
}

// ── Services (quote add-ons) ────────────────────────────────────────────────────────────────

export type AddOnId = "cpd" | "online-experience" | "live-experience" | "assembly";
export type LiveGroupId = "50" | "100" | "150" | "200";

export interface LiveExperienceGroup {
  id: LiveGroupId;
  label: string; // "Up to 50 students"
  shortLabel: string; // "Up to 50"
  facilitators: number;
  pricePerDay: number; // pence
}

// One facilitator for every 50 students; larger groups are quoted separately.
export const LIVE_EXPERIENCE_GROUPS: LiveExperienceGroup[] = [
  { id: "50", label: "Up to 50 students", shortLabel: "Up to 50", facilitators: 1, pricePerDay: pounds(900) },
  { id: "100", label: "Up to 100 students", shortLabel: "Up to 100", facilitators: 2, pricePerDay: pounds(1800) },
  { id: "150", label: "Up to 150 students", shortLabel: "Up to 150", facilitators: 3, pricePerDay: pounds(2700) },
  { id: "200", label: "Up to 200 students", shortLabel: "Up to 200", facilitators: 4, pricePerDay: pounds(3600) },
];

export const ADD_ON_QUANTITY_MIN = 1;
export const ADD_ON_QUANTITY_MAX = 10;

export interface QuoteAddOn {
  id: AddOnId;
  title: string; // also the HubSpot multi-checkbox option value
  shortTitle: string; // used in summary lines ("Live Experience · up to 100 students · 2 days")
  description: string;
  // "fixed": price as shown; "group-days": group price per day × days; "quantity": price × quantity.
  pricing: "fixed" | "group-days" | "quantity";
  price: number; // pence; for "group-days", the lowest group's price per day
  unit: string;
}

export const QUOTE_ADD_ONS: QuoteAddOn[] = [
  {
    id: "cpd",
    title: "CPD",
    shortTitle: "CPD",
    description: "Practical training that helps staff feel confident using the platform and delivering the learning.",
    pricing: "quantity",
    price: pounds(1975),
    unit: "per booking",
  },
  {
    id: "online-experience",
    title: "Online Experience",
    shortTitle: "Online Experience",
    description: "Interactive online sessions for your students, led by the 8billionideas team.",
    pricing: "quantity",
    price: pounds(995),
    unit: "each",
  },
  {
    id: "live-experience",
    title: "Live Experience (full day)",
    shortTitle: "Live Experience",
    description: "A full day of facilitator-led workshops in school, with one facilitator for every 50 students.",
    pricing: "group-days",
    price: LIVE_EXPERIENCE_GROUPS[0].pricePerDay,
    unit: "per day",
  },
  {
    id: "assembly",
    title: "Assembly (Showcase / Live Showcase)",
    shortTitle: "Assembly",
    description: "A live assembly or showcase to launch the programme or celebrate students' work.",
    pricing: "quantity",
    price: pounds(450),
    unit: "per assembly",
  },
];

export interface AddOnOptions {
  groupId?: LiveGroupId; // Live Experience
  days?: number; // Live Experience
  quantity?: number; // CPD, Online Experience and Assembly
}

export interface SelectedAddOn {
  id: AddOnId;
  options?: AddOnOptions;
}

export function getAddOn(id: AddOnId): QuoteAddOn {
  const addOn = QUOTE_ADD_ONS.find((a) => a.id === id);
  if (!addOn) throw new Error(`Unknown add-on "${id}"`);
  return addOn;
}

export function getLiveGroup(id: LiveGroupId = "50"): LiveExperienceGroup {
  return LIVE_EXPERIENCE_GROUPS.find((g) => g.id === id) ?? LIVE_EXPERIENCE_GROUPS[0];
}

export const clampQuantity = (n: number | undefined) =>
  Math.min(ADD_ON_QUANTITY_MAX, Math.max(ADD_ON_QUANTITY_MIN, Math.round(n ?? 1)));

export function addOnCost(addOn: QuoteAddOn | AddOnId, options: AddOnOptions = {}): number {
  const a = typeof addOn === "string" ? getAddOn(addOn) : addOn;
  switch (a.pricing) {
    case "fixed":
      return a.price;
    case "group-days":
      return getLiveGroup(options.groupId).pricePerDay * clampQuantity(options.days);
    case "quantity":
      return a.price * clampQuantity(options.quantity);
  }
}

export function addOnsTotal(addOns: SelectedAddOn[]): number {
  return addOns.reduce((sum, a) => sum + addOnCost(a.id, a.options), 0);
}

// ── CC-earned add-on credit (S): Decisions 48–49 ─────────────────────────────────────────────
// One shared allowance per Critical Curriculum purchase (requires CC), by units. Every standard
// add-on is eligible, each line capped at a percentage of its fee. Credits are applied line by line
// in a fixed order until the allowance runs out. (Virtual CPD and separate facilitator-led services
// are excluded; they aren't selectable here.)

export function creditAllowance(units: number): number {
  if (units >= 36) return pounds(300);
  if (units >= 18) return pounds(150);
  if (units >= 6) return pounds(75);
  if (units >= 1) return pounds(25);
  return 0;
}

// Per-line credit cap, as a percentage of the line's fee.
export const CREDIT_CAP_PERCENT: Record<AddOnId, number> = {
  cpd: 10, // per booking
  "online-experience": 10, // per experience
  "live-experience": 5, // of the line's fee (group rate × days)
  assembly: 5, // per assembly
};

// The fixed order credits are applied in.
export const CREDIT_ORDER: AddOnId[] = ["cpd", "online-experience", "live-experience", "assembly"];

// The most a line can receive: per unit × quantity for add-ons priced per item; a percentage of the
// line's fee for the Live Experience.
export function creditCeiling(id: AddOnId, options: AddOnOptions = {}): number {
  const a = getAddOn(id);
  const percent = CREDIT_CAP_PERCENT[id];
  if (a.pricing === "quantity") return pct(a.price, percent) * clampQuantity(options.quantity);
  return pct(addOnCost(id, options), percent);
}

export interface CreditLine {
  id: AddOnId;
  options: AddOnOptions;
  label: string;
  fee: number;
  pct: number;
  ceiling: number;
  credit: number; // earned on this line (before the anti-stacking rule)
}

export interface AddOnCredits {
  allowance: number;
  lines: CreditLine[]; // in CREDIT_ORDER
  total: number; // S
  remaining: number;
}

export function addOnCredits(cc: CcPrice | undefined, addOns: SelectedAddOn[]): AddOnCredits {
  const allowance = cc ? creditAllowance(cc.units) : 0;
  let remaining = allowance;
  const lines = CREDIT_ORDER.flatMap((id) => addOns.filter((a) => a.id === id)).map(({ id, options = {} }) => {
    const fee = addOnCost(id, options);
    const ceiling = creditCeiling(id, options);
    const credit = Math.min(ceiling, remaining);
    remaining -= credit;
    return { id, options, label: addOnLineLabel(id, options), fee, pct: CREDIT_CAP_PERCENT[id], ceiling, credit };
  });
  return { allowance, lines, total: allowance - remaining, remaining };
}

// ── A whole quote ───────────────────────────────────────────────────────────────────────────

export interface QuoteInput {
  cc?: { yearGroups: number; pillars: number };
  gcse?: { students: number };
  addOns?: SelectedAddOn[];
}

export interface QuoteService extends CreditLine {
  cost: number; // = fee
  creditApplied: number; // after the anti-stacking rule
  net: number; // fee − creditApplied
}

export type Stacking =
  // Exactly one line has credit: C = MIN(20% of that line's fee, 15% of the CC list).
  | { basis: "single-line"; lineId: AddOnId; cap: number; combined: number; outcome: "both" | "larger" }
  // More than one line has credit (Decision 50 pending): only the larger benefit applies.
  | { basis: "multi-line"; cap: null; combined: number; outcome: "larger" };

export interface QuoteBreakdown {
  rulesVersion: string;
  cc?: CcPrice;
  gcse?: GcsePrice;
  // The combined (cross-product) benefit: what was earned, what applies, and whether it was dropped.
  crossProduct: { earned: number; applied: number; dropped: boolean };
  // The add-on credit: the CC allowance, S earned and applied, and what's left of the allowance.
  serviceCredit: { allowance: number; earned: number; applied: number; dropped: boolean; remaining: number };
  // Anti-stacking, when both benefits are earned.
  stacking: Stacking | null;
  // Decision 50 pending: set when more than one service line has credit alongside X.
  pendingCombinationReview: boolean;
  services: QuoteService[];
  servicesTotal: number;
  annualRecurring: number;
  oneOff: number;
  year1Total: number;
}

export function priceQuote({ cc: ccInput, gcse: gcseInput, addOns = [] }: QuoteInput): QuoteBreakdown {
  const cc = ccInput ? priceCc(ccInput.yearGroups, ccInput.pillars) : undefined;
  const gcse = gcseInput ? priceGcse(gcseInput.students) : undefined;
  const x = crossProductBenefit(cc, gcse);
  const credits = addOnCredits(cc, addOns);
  const s = credits.total;

  // Anti-stacking, when both X and S are earned (ties keep the recurring X).
  let xApplied = x;
  let sApplied = s;
  let stacking: Stacking | null = null;
  let pendingCombinationReview = false;
  if (x > 0 && s > 0) {
    const combined = x + s;
    const credited = credits.lines.filter((l) => l.credit > 0);
    if (credited.length === 1) {
      const line = credited[0];
      const cap = Math.min(pct(line.fee, 20), pct(cc?.list ?? 0, 15));
      const outcome = combined <= cap ? "both" : "larger";
      stacking = { basis: "single-line", lineId: line.id, cap, combined, outcome };
    } else {
      // Decision 50 pending: multi-service GCSE stacking basis; do not hard-code an interpretation.
      // Conservative: no combined cap; only the larger benefit applies, flagged for the team's review.
      stacking = { basis: "multi-line", cap: null, combined, outcome: "larger" };
      pendingCombinationReview = true;
    }
    if (stacking.outcome === "larger") {
      if (s > x) xApplied = 0;
      else sApplied = 0;
    }
  }

  const services: QuoteService[] = credits.lines.map((line) => {
    const creditApplied = sApplied > 0 ? line.credit : 0;
    return { ...line, cost: line.fee, creditApplied, net: line.fee - creditApplied };
  });
  const servicesTotal = services.reduce((sum, a) => sum + a.fee, 0);
  const annualRecurring = (cc?.charge ?? 0) + (gcse?.fee ?? 0) - xApplied;
  const oneOff = servicesTotal - sApplied;

  return {
    rulesVersion: PRICE_RULES_VERSION,
    cc,
    gcse,
    crossProduct: { earned: x, applied: xApplied, dropped: x > 0 && xApplied === 0 },
    serviceCredit: {
      allowance: credits.allowance,
      earned: s,
      applied: sApplied,
      dropped: s > 0 && sApplied === 0,
      remaining: credits.allowance - sApplied,
    },
    stacking,
    pendingCombinationReview,
    services,
    servicesTotal,
    annualRecurring,
    oneOff,
    year1Total: annualRecurring + oneOff,
  };
}

// ── Formatting ──────────────────────────────────────────────────────────────────────────────

const wholePounds = new Intl.NumberFormat("en-GB", { style: "currency", currency: "GBP", maximumFractionDigits: 0 });
const withPence = new Intl.NumberFormat("en-GB", { style: "currency", currency: "GBP", minimumFractionDigits: 2 });

// Pence → "£450" or "£1,167.50" (pennies only when there are some).
export function formatMoney(pence: number): string {
  return pence % 100 === 0 ? wholePounds.format(pence / 100) : withPence.format(pence / 100);
}

// Pence → a plain number of pounds for HubSpot number fields ("1167.5", "450").
export const poundsValue = (pence: number) => String(pence / 100);

const plural = (n: number, one: string, many: string) => `${n} ${n === 1 ? one : many}`;

// "10th", "25th", "49th"…
export function ordinal(n: number): string {
  const tens = n % 100;
  const suffix = tens >= 11 && tens <= 13 ? "th" : ({ 1: "st", 2: "nd", 3: "rd" } as Record<number, string>)[n % 10] ?? "th";
  return `${n}${suffix}`;
}

// Summary row label: "CPD × 2", "Live Experience · up to 100 students · 2 days", "Assembly × 2".
export function addOnLineLabel(id: AddOnId, options: AddOnOptions = {}): string {
  const a = getAddOn(id);
  if (a.pricing === "group-days") {
    return `${a.shortTitle} · ${getLiveGroup(options.groupId).label.toLowerCase()} · ${plural(clampQuantity(options.days), "day", "days")}`;
  }
  if (a.pricing === "quantity") return `${a.shortTitle} × ${clampQuantity(options.quantity)}`;
  return a.shortTitle;
}

// For the quote request's message summary:
// "CPD × 2 (£3,950); Live Experience, up to 100 students × 2 days (£3,600); Assembly × 2 (£900)".
export function addOnSummary(addOns: SelectedAddOn[]): string {
  return addOns
    .map(({ id, options = {} }) => {
      const a = getAddOn(id);
      const cost = `(${formatMoney(addOnCost(id, options))})`;
      if (a.pricing === "group-days") {
        return `${a.shortTitle}, ${getLiveGroup(options.groupId).label.toLowerCase()} × ${plural(clampQuantity(options.days), "day", "days")} ${cost}`;
      }
      if (a.pricing === "quantity") return `${a.shortTitle} × ${clampQuantity(options.quantity)} ${cost}`;
      return `${a.shortTitle} ${cost}`;
    })
    .join("; ");
}

export const PRICING_EXCLUSIONS =
  "Working estimate. Excludes VAT/tax, OxfordAQA entry and assessment fees, OUP products, third-party charges and travel or venue costs. Your formal quote will confirm the exact scope.";

// The full breakdown for the HubSpot message summary (one fact per line). validUntil is for the
// team only (submitted + 30 calendar days); it isn't shown on the website.
export function quoteBreakdownLines(q: QuoteBreakdown, submittedAt: string, validUntil?: string): string[] {
  const lines = [`Pricing rules version: ${q.rulesVersion}`];
  if (q.cc) {
    lines.push(
      `Critical Curriculum: ${q.cc.yearGroups} year group(s) × ${q.cc.pillars} pillar(s) = ${q.cc.units} units · list ${formatMoney(q.cc.list)} (£50 per unit) · charge ${formatMoney(q.cc.charge)} / year (saving ${formatMoney(q.cc.saving)})`
    );
  }
  if (q.gcse) {
    lines.push(
      `International GCSE: ${q.gcse.students} students · band ${q.gcse.band} at ${formatMoney(q.gcse.rate)} per student · ${formatMoney(q.gcse.fee)} / year`
    );
  }
  const dropReason = q.pendingCombinationReview
    ? "more than one add-on has credit, so only the larger benefit applies pending Decision 50"
    : "only the larger benefit applies; see stacking";
  if (q.cc && q.gcse) {
    const x = q.crossProduct;
    lines.push(
      x.earned === 0
        ? `Combined benefit (X): not earned (needs ${CROSS_PRODUCT_MIN_STUDENTS}+ students)`
        : x.dropped
          ? `Combined benefit (X): ${formatMoney(x.earned)} earned, NOT applied (${dropReason})`
          : `Combined benefit (X): −${formatMoney(x.applied)} applied (conditional on the GCSE cohort being confirmed and activated)`
    );
  }
  if (q.services.length) {
    lines.push("Services:");
    for (const line of q.services) {
      lines.push(
        `  ${line.label}: fee ${formatMoney(line.fee)} · cap ${line.pct}% · ceiling ${formatMoney(line.ceiling)} · credit applied ${formatMoney(line.creditApplied)} · net ${formatMoney(line.net)}`
      );
    }
  }
  if (q.cc) {
    const sc = q.serviceCredit;
    lines.push(
      sc.dropped
        ? `Add-on credit (S): allowance ${formatMoney(sc.allowance)} · ${formatMoney(sc.earned)} earned, NOT applied (${dropReason}) · remaining ${formatMoney(sc.remaining)}`
        : `Add-on credit (S): allowance ${formatMoney(sc.allowance)} · credit used ${formatMoney(sc.applied)} · remaining ${formatMoney(sc.remaining)} (usable on eligible add-ons within 6 months of activation)`
    );
  }
  if (q.stacking) {
    const st = q.stacking;
    const result = st.outcome === "both" ? "both applied" : `only the larger applied (${q.crossProduct.dropped ? "X" : "S"} dropped)`;
    lines.push(
      st.basis === "single-line"
        ? `Stacking (single add-on line): X ${formatMoney(q.crossProduct.earned)} + S ${formatMoney(q.serviceCredit.earned)} = ${formatMoney(st.combined)} vs cap C ${formatMoney(st.cap)} (MIN of 20% of that line's fee and 15% of the CC list) → ${result}`
        : `Stacking (more than one add-on line has credit): X ${formatMoney(q.crossProduct.earned)} and S ${formatMoney(q.serviceCredit.earned)} → ${result}; no combined cap (Decision 50 pending)`
    );
  }
  lines.push(`Pending combination review (Decision 50): ${q.pendingCombinationReview ? "YES – confirm in the formal quote" : "no"}`);
  lines.push(
    `Annual (recurring): ${formatMoney(q.annualRecurring)}`,
    `One-off services: ${formatMoney(q.oneOff)}`,
    `Year 1 total: ${formatMoney(q.year1Total)}`,
    `Submitted at: ${submittedAt}`
  );
  if (validUntil) lines.push(`Price valid until: ${validUntil}`);
  lines.push(PRICING_EXCLUSIONS);
  return lines;
}
