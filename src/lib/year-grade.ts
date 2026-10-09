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
