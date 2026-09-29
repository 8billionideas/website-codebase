import { Compass, TrendingUp, Target, Plus, ArrowRight, type LucideIcon } from "lucide-react";
import Container from "@/components/layout/Container";
import { progression } from "@/content/progression";
import type { ProgressionCategory } from "@/content/progression";

const CATEGORY_ICONS: Record<ProgressionCategory["icon"], LucideIcon> = {
  Compass,
  TrendingUp,
  Target,
};

function MountainSilhouette() {
  return (
    <svg
      viewBox="0 0 800 100"
      preserveAspectRatio="none"
      className="pointer-events-none absolute inset-x-0 bottom-0 h-16 w-full text-accent/10"
      aria-hidden="true"
    >
      <path
        d="M0 100 L100 55 L180 85 L260 30 L340 90 L420 45 L500 80 L580 20 L660 70 L740 40 L800 65 L800 100 Z"
        fill="currentColor"
      />
    </svg>
  );
}

export default function Progression() {
  const { index, eyebrow, heading, subheading, annotation, yearHeaders, categories, bottom } =
    progression;

  return (
    <section className="relative overflow-hidden py-16 md:py-24">
      <Container>
        <div className="relative">
          <p className="text-caption text-muted">{index}</p>
          <div className="mt-2 h-8 w-px bg-accent" aria-hidden="true" />

          <p className="mt-6 text-caption uppercase tracking-[0.2em] text-muted">
            {eyebrow}
          </p>
          <h2 className="mt-3 max-w-2xl text-display text-ink">{heading}</h2>
          <p className="mt-4 max-w-xl text-body-lg text-muted">{subheading}</p>

          <p className="absolute right-0 top-0 hidden -rotate-3 text-body italic text-muted md:block">
            {annotation}
          </p>
        </div>

        {/* Desktop grid — each row (header + 3 categories) is its own
            independent grid sharing the same column template, so they
            align visually without fighting over shared auto-placement. */}
        <div className="hidden md:block">
          <div className="mt-16 grid grid-cols-[220px_repeat(4,1fr)] gap-x-6">
            <div />
            {yearHeaders.map((label) => (
              <p
                key={label}
                className="text-center text-caption uppercase tracking-wide text-muted"
              >
                {label}
              </p>
            ))}
          </div>

          {categories.map((category) => {
            const Icon = CATEGORY_ICONS[category.icon];
            return (
              <div
                key={category.name}
                className="mt-8 grid grid-cols-[220px_repeat(4,1fr)] gap-x-6"
              >
                <div>
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-accent/15 text-accent">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <p className="mt-3 text-body-lg text-ink">{category.name}</p>
                </div>

                <div className="relative col-span-4 grid grid-cols-4 gap-x-6">
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute left-2 right-4 top-2 h-px bg-accent"
                  />
                  <ArrowRight
                    aria-hidden="true"
                    className="pointer-events-none absolute -right-1 top-2 h-3 w-3 -translate-y-1/2 text-accent"
                  />

                  {category.cells.map((cell) => (
                    <div key={cell.verb} className="relative">
                      <span className="relative z-10 flex h-4 w-4 items-center justify-center rounded-full border-2 border-accent bg-paper text-accent">
                        <Plus className="h-2.5 w-2.5" aria-hidden="true" />
                      </span>
                      <p className="mt-3 text-body-lg text-ink">{cell.verb}</p>
                      <p className="mt-1 text-caption text-muted">{cell.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Mobile fallback — simple stacked list, no connecting lines. */}
        <div className="mt-12 space-y-12 md:hidden">
          {categories.map((category) => {
            const Icon = CATEGORY_ICONS[category.icon];
            return (
              <div key={category.name}>
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent/15 text-accent">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <p className="text-body-lg text-ink">{category.name}</p>
                </div>

                <div className="mt-6 space-y-6 border-l-2 border-accent/30 pl-5">
                  {category.cells.map((cell, i) => (
                    <div key={cell.verb}>
                      <p className="text-caption uppercase tracking-wide text-accent">
                        {yearHeaders[i]}
                      </p>
                      <p className="mt-1 text-body-lg text-ink">{cell.verb}</p>
                      <p className="mt-1 text-caption text-muted">{cell.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom bridge */}
        <div className="relative mt-20 flex flex-col items-center text-center">
          <div className="h-10 w-px bg-accent" aria-hidden="true" />
          <p className="mt-4 text-caption uppercase tracking-[0.2em] text-muted">
            {bottom.eyebrow}
          </p>
          <p className="mt-3 max-w-xl text-h3 text-ink">{bottom.line}</p>
        </div>
      </Container>

      <MountainSilhouette />
    </section>
  );
}
