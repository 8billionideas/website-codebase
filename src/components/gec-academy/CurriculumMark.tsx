"use client";

import { useState } from "react";
import { MARK_DOTS } from "./Icons";
import { gecCurriculum } from "@/content/gec-academy";

const VIOLET = "#6840FC";

// The eight pillars beside the 8billionideas dot mark (all eight dots accent-green). Hovering,
// focusing or clicking a pillar turns the dot at the same position violet (pillar 1 → dot 1, in the
// approved order), highlights that pillar's button (violet border, dot and tint) and shows its
// description; leaving the list (or the button losing focus) clears it.
export default function CurriculumMark() {
  const [active, setActive] = useState<number | null>(null);
  const caption = active === null ? gecCurriculum.caption : gecCurriculum.areas[active].text;

  return (
    <div className="mt-content grid grid-cols-1 items-center gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
      <div>
        <svg viewBox="-12 -12 214 149" className="mx-auto block w-full max-w-[340px] overflow-visible" aria-hidden="true">
          {MARK_DOTS.map(([cx, cy], i) => (
            <circle
              key={`${cx}-${cy}`}
              cx={cx}
              cy={cy}
              r="17"
              fill={active === i ? VIOLET : "#21D199"}
              className={`origin-center transition-[fill,transform] duration-300 [transform-box:fill-box] motion-reduce:transition-none ${
                active === i ? "scale-[1.18]" : ""
              }`}
            />
          ))}
        </svg>
        <p className="mt-6 min-h-[1.6em] text-center text-[16px] leading-[1.6] text-ink" aria-live="polite">
          {caption}
        </p>
      </div>
      <div className="flex flex-wrap gap-2.5" onMouseLeave={() => setActive(null)}>
        {gecCurriculum.areas.map((area, i) => {
          const on = active === i;
          return (
            <button
              key={area.name}
              type="button"
              aria-pressed={on}
              onMouseEnter={() => setActive(i)}
              onFocus={() => setActive(i)}
              onBlur={() => setActive((prev) => (prev === i ? null : prev))}
              onClick={() => setActive(i)}
              className={`flex cursor-pointer items-center gap-2.5 whitespace-nowrap rounded-full border-[1.5px] px-4 py-2.5 text-[15px] font-medium text-ink transition-[background-color,border-color] duration-150 focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-[#6840FC]/30 focus-visible:ring-offset-2 focus-visible:ring-offset-paper motion-reduce:transition-none ${
                on ? "border-[#6840FC] bg-[#6840FC]/[0.08]" : "border-ink/15 bg-white"
              }`}
            >
              <span
                aria-hidden="true"
                className={`h-2 w-2 shrink-0 rounded-full transition-colors duration-150 motion-reduce:transition-none ${on ? "bg-[#6840FC]" : "bg-accent"}`}
              />
              {area.name}
            </button>
          );
        })}
      </div>
    </div>
  );
}
