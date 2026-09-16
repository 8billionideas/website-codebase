"use client";

import { KeyboardEvent, useState } from "react";
import { Pillar } from "@/content/pillars";

export default function PillarCard({ pillar }: { pillar: Pillar }) {
  const [open, setOpen] = useState(false);

  if (pillar.comingSoon) {
    return (
      <div className="border-t-2 border-ink/10 pt-4 opacity-50">
        <div className="flex flex-wrap items-center gap-2">
          <h3 className="text-h3 text-ink">{pillar.name}</h3>
          <span className="rounded-full bg-ink/10 px-2 py-0.5 text-caption text-muted">
            Coming soon
          </span>
        </div>
        <p className="mt-2 text-body text-muted">{pillar.description}</p>
      </div>
    );
  }

  // Every activation path (hover-in, focus-in, click, keyboard) opens the
  // card; only leaving it (mouseleave/blur) closes it. This is deliberate:
  // a click always fires after a mouseenter in real browsers, so a toggle
  // here would immediately re-close a card that hover had just opened.
  const expand = () => setOpen(true);
  const close = () => setOpen(false);

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      expand();
    }
  };

  return (
    <div
      role="button"
      tabIndex={0}
      aria-expanded={open}
      onMouseEnter={expand}
      onMouseLeave={close}
      onFocus={expand}
      onBlur={close}
      onClick={expand}
      onKeyDown={handleKeyDown}
      className="cursor-pointer border-t-2 border-ink/10 pt-4"
    >
      <h3 className="text-h3 text-ink">{pillar.name}</h3>
      <p className="mt-2 text-body text-muted">{pillar.description}</p>

      <div
        className={`grid overflow-hidden transition-all duration-200 ${
          open ? "mt-4 grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="min-h-0">
          <div
            className={
              pillar.placeholder
                ? "rounded-lg border border-dashed border-muted/60 p-3"
                : "rounded-lg bg-surface p-3"
            }
          >
            <p
              className={
                pillar.placeholder
                  ? "text-caption italic text-muted"
                  : "text-caption font-medium text-brand"
              }
            >
              {pillar.course}
            </p>
            <p
              className={
                pillar.placeholder
                  ? "mt-1 text-body italic text-muted"
                  : "mt-1 text-body text-ink"
              }
            >
              {pillar.explanation}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
