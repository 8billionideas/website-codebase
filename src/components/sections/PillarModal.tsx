"use client";

import { useEffect, useState } from "react";
import { Pillar } from "@/content/pillars";

function ChevronIcon({ direction }: { direction: "left" | "right" }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
      className={direction === "left" ? "" : "rotate-180"}
    >
      <path
        d="M10 3L5 8l5 5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function InfoBubble({
  label,
  tone,
  items,
}: {
  label: string;
  tone: "accent" | "brand";
  items?: string[];
}) {
  const bubbleBg = tone === "accent" ? "bg-accent/10" : "bg-brand/10";
  const dotBg = tone === "accent" ? "bg-accent" : "bg-brand";

  return (
    <div className={`rounded-lg ${bubbleBg} p-5`}>
      <p className="text-caption font-medium uppercase tracking-wide text-ink/70">
        {label}
      </p>
      {items && items.length > 0 ? (
        <ul className="mt-3 space-y-2">
          {items.map((item, i) => (
            <li key={i} className="flex items-start gap-2.5">
              <span className={`mt-2 h-1.5 w-1.5 shrink-0 rounded-full ${dotBg}`} />
              <span className="text-body text-ink">{item}</span>
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-3 text-body italic text-muted">Detail coming soon</p>
      )}
    </div>
  );
}

export default function PillarModal({
  pillar,
  onClose,
}: {
  pillar: Pillar | null;
  onClose: () => void;
}) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    setIndex(0);
  }, [pillar]);

  useEffect(() => {
    if (!pillar) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [pillar, onClose]);

  if (!pillar) return null;

  const examples = pillar.examples ?? [];
  const example = examples[index];
  const hasCarousel = examples.length > 1;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-ink/40 px-4 py-8"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="pillar-modal-title"
        onClick={(event) => event.stopPropagation()}
        className="relative max-h-[85vh] w-full max-w-4xl overflow-y-auto rounded-xl bg-paper p-8 shadow-2xl sm:p-10"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-5 top-5 flex h-8 w-8 items-center justify-center rounded-full text-muted transition-colors hover:bg-ink/5 hover:text-ink"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
            <path
              d="M1 1l12 12M13 1L1 13"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </button>

        <h3 id="pillar-modal-title" className="text-h3 text-ink">
          {pillar.name}
        </h3>

        {examples.length === 0 ? (
          <>
            <p className="mt-4 max-w-md text-body-lg text-muted">
              {pillar.description}
            </p>
            <p className="mt-6 rounded-lg bg-surface px-4 py-3 text-caption text-muted">
              Example lesson coming soon
            </p>
          </>
        ) : (
          <>
            <div
              key={index}
              className="mt-6 grid grid-cols-1 gap-8 animate-[fade-in-up_200ms_ease-out] md:grid-cols-2"
            >
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h4 className="text-body-lg font-semibold text-ink">
                    {example.course}
                  </h4>
                  {example.stage && (
                    <span className="rounded-full bg-ink/10 px-2 py-0.5 text-caption text-muted">
                      {example.stage}
                    </span>
                  )}
                </div>

                <p className="mt-4 text-caption font-medium uppercase tracking-wide text-muted">
                  Overview
                </p>
                <p
                  className={`mt-1 text-body-lg ${
                    example.overview ? "text-ink" : "italic text-muted"
                  }`}
                >
                  {example.overview ?? "Detail coming soon"}
                </p>

                {example.module && (
                  <div className="mt-6">
                    <p className="text-caption font-medium uppercase tracking-wide text-muted">
                      {example.module.heading}
                    </p>
                    <p className="mt-1 text-body-lg text-ink">
                      {example.module.description}
                    </p>
                  </div>
                )}
              </div>

              <div className="flex flex-col gap-4">
                <InfoBubble label="Skills" tone="accent" items={example.skills} />
                <InfoBubble label="Benefits" tone="brand" items={example.benefits} />
              </div>
            </div>

            {hasCarousel && (
              <div className="mt-8 flex items-center justify-between border-t border-ink/10 pt-6">
                <button
                  type="button"
                  onClick={() =>
                    setIndex((i) => (i - 1 + examples.length) % examples.length)
                  }
                  aria-label="Previous example"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-ink/15 text-ink transition-colors hover:border-accent"
                >
                  <ChevronIcon direction="left" />
                </button>

                <div className="flex flex-col items-center gap-2">
                  <div className="flex flex-wrap items-center justify-center gap-2">
                    {examples.map((_, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => setIndex(i)}
                        aria-label={`Go to example ${i + 1}`}
                        aria-current={i === index}
                        className={`h-2 w-2 rounded-full transition-colors ${
                          i === index ? "bg-accent" : "bg-ink/15 hover:bg-ink/30"
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-caption text-muted">
                    {index + 1} of {examples.length}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setIndex((i) => (i + 1) % examples.length)}
                  aria-label="Next example"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-ink/15 text-ink transition-colors hover:border-accent"
                >
                  <ChevronIcon direction="right" />
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
