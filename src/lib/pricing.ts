export const PRICE_PER_PILLAR_PER_YEAR_GROUP = 40;
export const PILLAR_OPTIONS = [1, 3, 6] as const;
export const YEAR_GROUPS_MIN = 1;
export const YEAR_GROUPS_MAX = 13;
export const DEFAULT_YEAR_GROUPS = 1;
export const DEFAULT_PILLARS = 1;
// Calculator product selected on load: "cc" is Critical Curriculum (the others are "gcse" and "both").
export const DEFAULT_PRODUCT = "cc";

export interface CurriculumPriceBreakdown {
  perYearGroup: number;
  total: number;
}

export function calculateCurriculumPrice(
  pillars: number,
  yearGroups: number
): CurriculumPriceBreakdown {
  const perYearGroup = pillars * PRICE_PER_PILLAR_PER_YEAR_GROUP;
  const total = perYearGroup * yearGroups;
  return { perYearGroup, total };
}

export interface GcseTier {
  label: string;
  min: number;
  max: number | null;
  fee: number;
}

export const GCSE_TIERS: GcseTier[] = [
  { label: "10–25", min: 10, max: 25, fee: 105 },
  { label: "26–50", min: 26, max: 50, fee: 85 },
  { label: "51–100", min: 51, max: 100, fee: 65 },
  { label: "101–150", min: 101, max: 150, fee: 50 },
  { label: "151–200", min: 151, max: 200, fee: 45 },
  { label: "200+", min: 201, max: null, fee: 40 },
];

export const STUDENTS_MIN = 10;
export const STUDENTS_MAX = 2000;
export const DEFAULT_STUDENTS = 10;

export function getGcseTier(students: number): GcseTier {
  return (
    GCSE_TIERS.find((tier) => students >= tier.min && (tier.max === null || students <= tier.max)) ??
    GCSE_TIERS[GCSE_TIERS.length - 1]
  );
}

export interface GcsePriceBreakdown {
  fee: number;
  total: number;
}

export function getGcseTotal(students: number): GcsePriceBreakdown {
  const tier = getGcseTier(students);
  return { fee: tier.fee, total: tier.fee * students };
}

const currencyFormatter = new Intl.NumberFormat("en-GB", {
  style: "currency",
  currency: "GBP",
  maximumFractionDigits: 0,
});

export function formatMoney(amount: number): string {
  return currencyFormatter.format(amount);
}

// ── Quote add-ons (the /pricing "Request a tailored quote" pop-up) ─────────────────────────

export type AddOnId = "cpd" | "online-experience" | "live-experience" | "assembly";
export type LiveGroupId = "50" | "100" | "150" | "200";

export interface LiveExperienceGroup {
  id: LiveGroupId;
  label: string; // "Up to 50 students"
  shortLabel: string; // "Up to 50"
  facilitators: number;
  pricePerDay: number;
}

// One facilitator for every 50 students; larger groups are quoted separately.
export const LIVE_EXPERIENCE_GROUPS: LiveExperienceGroup[] = [
  { id: "50", label: "Up to 50 students", shortLabel: "Up to 50", facilitators: 1, pricePerDay: 900 },
  { id: "100", label: "Up to 100 students", shortLabel: "Up to 100", facilitators: 2, pricePerDay: 1800 },
  { id: "150", label: "Up to 150 students", shortLabel: "Up to 150", facilitators: 3, pricePerDay: 2700 },
  { id: "200", label: "Up to 200 students", shortLabel: "Up to 200", facilitators: 4, pricePerDay: 3600 },
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
  price: number; // for "group-days", the lowest group's price per day
  unit: string;
}

export const QUOTE_ADD_ONS: QuoteAddOn[] = [
  {
    id: "cpd",
    title: "CPD",
    shortTitle: "CPD",
    description: "Practical training that helps staff feel confident using the platform and delivering the learning.",
    pricing: "fixed",
    price: 1975,
    unit: "per year",
  },
  {
    id: "online-experience",
    title: "Online Experience",
    shortTitle: "Online Experience",
    description: "Interactive online sessions for your students, led by the 8billionideas team.",
    pricing: "fixed",
    price: 995,
    unit: "per year",
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
    price: 450,
    unit: "per assembly",
  },
];

export interface AddOnOptions {
  groupId?: LiveGroupId; // Live Experience
  days?: number; // Live Experience
  quantity?: number; // Assembly
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

const clampQuantity = (n: number | undefined) =>
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

// The subscription parts of a quote (Critical Curriculum and/or International GCSE totals).
export interface QuoteSubscriptions {
  cc?: { total: number };
  gcse?: { total: number };
}

export function addOnsTotal(addOns: SelectedAddOn[]): number {
  return addOns.reduce((sum, a) => sum + addOnCost(a.id, a.options), 0);
}

export function quoteTotal(selection: QuoteSubscriptions, addOns: SelectedAddOn[]): number {
  return (selection.cc?.total ?? 0) + (selection.gcse?.total ?? 0) + addOnsTotal(addOns);
}

const plural = (n: number, one: string, many: string) => `${n} ${n === 1 ? one : many}`;

// Summary row label: "CPD", "Live Experience · up to 100 students · 2 days", "Assembly × 2".
export function addOnLineLabel(id: AddOnId, options: AddOnOptions = {}): string {
  const a = getAddOn(id);
  if (a.pricing === "group-days") {
    return `${a.shortTitle} · ${getLiveGroup(options.groupId).label.toLowerCase()} · ${plural(clampQuantity(options.days), "day", "days")}`;
  }
  if (a.pricing === "quantity") return `${a.shortTitle} × ${clampQuantity(options.quantity)}`;
  return a.shortTitle;
}

// Readable detail for HubSpot: "CPD £1,975; Live Experience up to 100 students × 2 days £3,600; Assembly × 2 £900".
export function addOnDetails(addOns: SelectedAddOn[]): string {
  return addOns
    .map(({ id, options = {} }) => {
      const a = getAddOn(id);
      const cost = formatMoney(addOnCost(id, options));
      if (a.pricing === "group-days") {
        return `${a.shortTitle} ${getLiveGroup(options.groupId).label.toLowerCase()} × ${plural(clampQuantity(options.days), "day", "days")} ${cost}`;
      }
      if (a.pricing === "quantity") return `${a.shortTitle} × ${clampQuantity(options.quantity)} ${cost}`;
      return `${a.shortTitle} ${cost}`;
    })
    .join("; ");
}
