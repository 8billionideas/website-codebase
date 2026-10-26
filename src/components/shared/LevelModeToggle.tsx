"use client";

import { useRef, type KeyboardEvent } from "react";
import { useLevelMode } from "@/lib/level-mode";
import { formatLevel, formatLevelRange, type LevelMode } from "@/lib/year-grade";

const OPTIONS: { value: LevelMode; label: string }[] = [
  { value: "years", label: "Years" },
  { value: "grades", label: "Grades" },
];

// "Years | Grades" segmented control (a radio group). tone="dark" for ink backgrounds.
export default function LevelModeToggle({
  tone = "light",
  className = "",
}: {
  tone?: "light" | "dark";
  className?: string;
}) {
  const [mode, setMode] = useLevelMode();
  const refs = useRef<(HTMLButtonElement | null)[]>([]);
  const dark = tone === "dark";

  function handleKeyDown(event: KeyboardEvent, index: number) {
    if (!["ArrowRight", "ArrowLeft", "ArrowUp", "ArrowDown"].includes(event.key)) return;
    event.preventDefault();
    const next = (index + 1) % OPTIONS.length; // two options: any arrow moves to the other one
    setMode(OPTIONS[next].value);
    refs.current[next]?.focus();
  }

  return (
    <div
      role="radiogroup"
      aria-label="Show year groups as"
      className={`inline-flex shrink-0 rounded-full border p-[3px] ${dark ? "border-white/30" : "border-ink/15"} ${className}`}
    >
      {OPTIONS.map((option, i) => {
        const active = option.value === mode;
        return (
          <button
            key={option.value}
            ref={(el) => {
              refs.current[i] = el;
            }}
            type="button"
            role="radio"
            aria-checked={active}
            tabIndex={active ? 0 : -1}
            onClick={() => setMode(option.value)}
            onKeyDown={(e) => handleKeyDown(e, i)}
            className={`cursor-pointer rounded-full px-3.5 py-1.5 text-[13px] leading-[1.3] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 ${
              dark ? "focus-visible:ring-offset-ink" : "focus-visible:ring-offset-paper"
            } ${
              active
                ? dark
                  ? "bg-white text-ink"
                  : "bg-ink text-white"
                : dark
                  ? "text-white/70 hover:text-white"
                  : "text-ink/70 hover:text-ink"
            }`}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}

// A year label that follows the Years/Grades choice. Both versions sit in the same grid
// cell (the hidden one invisible), so the label's box never changes size when switching.
// With `to`, it's a band of year groups ("Years 1–3" / "Kindergarten–Grade 2").
export function LevelText({
  year,
  to,
  suffix = "",
  upper = false,
}: {
  year: number;
  to?: number;
  suffix?: string;
  upper?: boolean;
}) {
  const [mode] = useLevelMode();
  const format = (y: number, m: LevelMode) => {
    const label = to === undefined ? formatLevel(y, m) : formatLevelRange(y, to, m);
    return upper ? label.toUpperCase() : label;
  };
  return (
    <span className="inline-grid">
      {(["years", "grades"] as const).map((m) => (
        <span
          key={m}
          aria-hidden={m !== mode}
          className={`[grid-area:1/1] transition-opacity duration-200 motion-reduce:transition-none ${
            m === mode ? "opacity-100" : "invisible opacity-0"
          }`}
        >
          {format(year, m)}
          {suffix}
        </span>
      ))}
    </span>
  );
}
