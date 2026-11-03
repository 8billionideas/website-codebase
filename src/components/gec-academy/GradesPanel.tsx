"use client";

import { useState } from "react";
import { gecWhy } from "@/content/gec-academy";

type Mode = "grades" | "plus";
const MODES: Mode[] = ["grades", "plus"];

// "Grades only" / "Grades + project portfolio" as a white site card: a segmented control (green
// selected pill), the applicant-file rows (the project rows open in mint) and the verdict.
export default function GradesPanel() {
  const [mode, setMode] = useState<Mode>("grades");
  const verdict = gecWhy.verdicts[mode];
  const plus = mode === "plus";

  return (
    <div className="rounded-2xl border border-ink/10 bg-white p-5 shadow-[0_8px_24px_rgba(22,33,61,0.08)] md:p-7 lg:sticky lg:top-8">
      <div className="inline-flex max-w-full rounded-full border border-ink/15 p-[3px]" role="tablist" aria-label={gecWhy.tabsLabel}>
        {MODES.map((m) => (
          <button
            key={m}
            type="button"
            role="tab"
            aria-selected={mode === m}
            onClick={() => setMode(m)}
            className={`cursor-pointer rounded-full px-4 py-2 text-[14px] leading-[1.3] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 motion-reduce:transition-none ${
              mode === m ? "bg-accent font-medium text-ink" : "text-ink/70 hover:text-ink"
            }`}
          >
            {gecWhy.tabs[m]}
          </button>
        ))}
      </div>

      <div className="mt-6 flex items-center gap-4 border-b border-ink/10 pb-5">
        <span className="h-11 w-11 shrink-0 rounded-full bg-[linear-gradient(135deg,#6840FC,#21D199)]" aria-hidden="true" />
        <div>
          <p className="text-[16px] font-medium text-ink">{gecWhy.fileTitle}</p>
          <p className="text-[14px] text-ink/65">{gecWhy.fileSub}</p>
        </div>
      </div>

      <div className="mt-4 grid gap-2.5">
        {gecWhy.rows.map(([label, value]) => (
          <div key={label} className="flex justify-between gap-4 rounded-xl bg-ink/[0.04] px-4 py-3 text-[15px]">
            <span className="text-ink">{label}</span>
            <span className="text-right text-ink/65">{value}</span>
          </div>
        ))}
        {/* The project rows open with the "plus" view. */}
        <div
          className={`grid transition-[grid-template-rows,opacity] duration-500 ease-out motion-reduce:transition-none ${
            plus ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
          }`}
          aria-hidden={!plus}
        >
          <div className="grid gap-2.5 overflow-hidden">
            {gecWhy.extraRows.map(([label, value]) => (
              <div key={label} className="flex justify-between gap-4 rounded-xl border border-accent/40 bg-accent/10 px-4 py-3 text-[15px]">
                <span className="text-ink">{label}</span>
                <span className="text-right font-medium text-ink">{value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <p className="mt-5 rounded-xl bg-ink/[0.04] px-4 py-3.5 text-[15px] leading-[1.6] text-ink/75" aria-live="polite">
        <strong className="font-medium text-ink">{verdict.strong}</strong> {verdict.text}
      </p>
    </div>
  );
}
