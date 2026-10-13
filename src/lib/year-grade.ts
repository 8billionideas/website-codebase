// UK year groups ↔ US-style grades. Year 1 is Kindergarten; Year N (2–13) is Grade N-1.
// Always format year labels through these helpers (never hardcode "Year 7" / "Grade 6").

export type LevelMode = "years" | "grades";

export function formatLevel(year: number, mode: LevelMode): string {
  if (mode === "years") return `Year ${year}`;
  return year <= 1 ? "Kindergarten" : `Grade ${year - 1}`;
}

export function formatLevelUpper(year: number, mode: LevelMode): string {
  return formatLevel(year, mode).toUpperCase();
}

// A span of year groups, e.g. "Years 7–11" / "Grades 6–10", "Years 1–6" / "Kindergarten–Grade 5".
// A single year falls back to formatLevel.
export function formatLevelRange(fromYear: number, toYear: number, mode: LevelMode): string {
  if (fromYear === toYear) return formatLevel(fromYear, mode);
  if (mode === "years") return `Years ${fromYear}–${toYear}`;
  if (fromYear <= 1) return `Kindergarten–Grade ${toYear - 1}`;
  return `Grades ${fromYear - 1}–${toYear - 1}`;
}

// Just the number, for compact pills: "7" / "6", and "K" for Kindergarten (Year 1).
export function formatLevelShort(year: number, mode: LevelMode): string {
  if (mode === "years") return String(year);
  return year <= 1 ? "K" : String(year - 1);
}
