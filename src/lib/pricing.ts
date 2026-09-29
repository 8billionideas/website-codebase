export const PRICE_PER_PILLAR_PER_YEAR_GROUP = 40;
export const PILLAR_OPTIONS = [1, 3, 6] as const;
export const YEAR_GROUPS_MIN = 1;
export const YEAR_GROUPS_MAX = 13;
export const DEFAULT_YEAR_GROUPS = 1;
export const DEFAULT_PILLARS = 1;

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
