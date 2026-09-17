"use client";

import { useState } from "react";
import { pricing } from "@/content/pricing";

type View = "criticalCurriculum" | "gcse";

export default function PricingConfigurator() {
  const { criticalCurriculum, gcse } = pricing;
  const [view, setView] = useState<View>("criticalCurriculum");
  const [yearGroups, setYearGroups] = useState(criticalCurriculum.defaultYearGroups);
  const [pillars, setPillars] = useState(criticalCurriculum.defaultPillars);
  const [bandIndex, setBandIndex] = useState(gcse.defaultBandIndex);

  const total = pillars * yearGroups * criticalCurriculum.ratePerCourse;
  const band = gcse.bands[bandIndex];

  const handleYearGroupsChange = (value: string) => {
    const parsed = Number(value);
    if (Number.isNaN(parsed)) return;
    const clamped = Math.min(
      criticalCurriculum.maxYearGroups,
      Math.max(criticalCurriculum.minYearGroups, Math.round(parsed))
    );
    setYearGroups(clamped);
  };

  return (
    <div className="mt-10">
      <div className="inline-flex rounded-full bg-ink/5 p-1">
        <button
          type="button"
          onClick={() => setView("criticalCurriculum")}
          className={`rounded-full px-4 py-2 text-body font-medium transition-colors ${
            view === "criticalCurriculum"
              ? "bg-accent text-ink"
              : "text-muted hover:text-ink"
          }`}
        >
          {criticalCurriculum.toggleLabel}
        </button>
        <button
          type="button"
          onClick={() => setView("gcse")}
          className={`rounded-full px-4 py-2 text-body font-medium transition-colors ${
            view === "gcse" ? "bg-accent text-ink" : "text-muted hover:text-ink"
          }`}
        >
          {gcse.toggleLabel}
        </button>
      </div>

      {view === "criticalCurriculum" ? (
        <div className="mt-8 rounded-lg bg-surface p-6 md:p-8">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <label className="block">
              <span className="text-caption font-medium uppercase tracking-wide text-muted">
                Year groups
              </span>
              <input
                type="number"
                min={criticalCurriculum.minYearGroups}
                max={criticalCurriculum.maxYearGroups}
                value={yearGroups}
                onChange={(event) => handleYearGroupsChange(event.target.value)}
                className="mt-2 w-full rounded-md border border-ink/15 bg-paper px-3 py-2 text-body-lg text-ink"
              />
            </label>

            <div>
              <span className="text-caption font-medium uppercase tracking-wide text-muted">
                Pillars
              </span>
              <div className="mt-2 flex gap-2">
                {criticalCurriculum.pillarOptions.map((option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => setPillars(option)}
                    aria-pressed={pillars === option}
                    className={`flex-1 rounded-md border px-3 py-2 text-body-lg font-medium transition-colors ${
                      pillars === option
                        ? "border-accent bg-accent/10 text-ink"
                        : "border-ink/15 text-muted hover:border-ink/30"
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-8 rounded-lg bg-accent/10 p-6">
            <p className="text-caption font-medium uppercase tracking-wide text-ink/70">
              Estimated price
            </p>
            <p className="mt-2 text-h3 text-ink">
              {pillars} pillars × {yearGroups} year groups = £{total.toLocaleString()}
              /year
            </p>
            <p className="mt-1 text-caption text-muted">
              £{criticalCurriculum.ratePerCourse} per course, per year group, per year
            </p>
          </div>
        </div>
      ) : (
        <div className="mt-8 rounded-lg bg-surface p-6 md:p-8">
          <span className="text-caption font-medium uppercase tracking-wide text-muted">
            Number of students
          </span>
          <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3">
            {gcse.bands.map((option, i) => (
              <button
                key={option.label}
                type="button"
                onClick={() => setBandIndex(i)}
                aria-pressed={i === bandIndex}
                className={`rounded-md border px-3 py-2 text-body font-medium transition-colors ${
                  i === bandIndex
                    ? "border-accent bg-accent/10 text-ink"
                    : "border-ink/15 text-muted hover:border-ink/30"
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>

          <div className="mt-8 rounded-lg bg-accent/10 p-6">
            <p className="text-caption font-medium uppercase tracking-wide text-ink/70">
              Per-student annual fee
            </p>
            <p className="mt-2 text-h3 text-ink">£{band.fee}/student/year</p>
            <p className="mt-1 text-caption text-muted">
              For {band.label} students
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
