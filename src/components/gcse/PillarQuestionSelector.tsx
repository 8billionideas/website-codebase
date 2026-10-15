"use client";

import { useEffect, useId, useRef, useState, type KeyboardEvent } from "react";
import type { GcsePillarTile } from "@/content/gcse";

export default function PillarQuestionSelector({
  pillars,
  label,
}: {
  pillars: GcsePillarTile[];
  label: string;
}) {
  const [active, setActive] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const listRef = useRef<HTMLDivElement>(null);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const baseId = useId();
  const tabId = (i: number) => `${baseId}-tab-${i}`;
  const panelId = `${baseId}-panel`;

  function select(index: number) {
    const next = (index + pillars.length) % pillars.length;
    setActive(next);
    const tab = tabRefs.current[next];
    tab?.focus();
    tab?.scrollIntoView({ block: "nearest", inline: "nearest" });
  }

  // Below lg the row scrolls sideways; fade the right edge only while there's more to see.
  useEffect(() => {
    const el = listRef.current;
    if (!el) return;
    const update = () =>
      setCanScrollRight(el.scrollWidth - el.clientWidth - el.scrollLeft > 1);
    update();
    el.addEventListener("scroll", update, { passive: true });
    const observer = new ResizeObserver(update);
    observer.observe(el);
    return () => {
      el.removeEventListener("scroll", update);
      observer.disconnect();
    };
  }, []);

  function handleKeyDown(e: KeyboardEvent, index: number) {
    const keys: Record<string, number> = {
      ArrowRight: index + 1,
      ArrowDown: index + 1,
      ArrowLeft: index - 1,
      ArrowUp: index - 1,
      Home: 0,
      End: pillars.length - 1,
    };
    if (e.key in keys) {
      e.preventDefault();
      select(keys[e.key]);
    }
  }

  return (
    <div>
      {/* Desktop (lg+): the pills wrap, with a forced 4 + 4 split from xl. Below lg, one line that scrolls sideways with
          snap, a hidden scrollbar and a fade on the right. */}
      <div className="relative">
        <div
          ref={listRef}
          role="tablist"
          aria-label="Pillars"
          className="[-ms-overflow-style:none] [scrollbar-width:none] -mx-6 flex snap-x snap-mandatory flex-nowrap gap-2 overflow-x-auto px-6 pb-2 [&::-webkit-scrollbar]:hidden md:-mx-12 md:px-12 lg:mx-0 lg:snap-none lg:flex-wrap lg:gap-y-2.5 lg:overflow-visible xl:gap-y-0 lg:px-0 lg:pb-0"
        >
          {pillars.map((pillar, i) => {
            const selected = i === active;
            return [
              // Forces the 4 + 4 split from xl. It forms its own (empty) flex line, so there the
              // rows have no row gap and the second row's pills carry the spacing instead.
              // At 1024–1279px the pills just wrap to fit the narrower column.
              i === 4 && (
                <span key="row-break" aria-hidden="true" className="hidden basis-full xl:block" />
              ),
              <button
                key={pillar.name}
                ref={(el) => {
                  tabRefs.current[i] = el;
                }}
                id={tabId(i)}
                type="button"
                role="tab"
                aria-selected={selected}
                aria-controls={panelId}
                tabIndex={selected ? 0 : -1}
                onClick={() => setActive(i)}
                onKeyDown={(e) => handleKeyDown(e, i)}
                className={`shrink-0 snap-start whitespace-nowrap rounded-full px-3.5 py-2 text-[13px] transition-colors lg:px-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2 focus-visible:ring-offset-paper ${i >= 4 ? "xl:mt-2.5" : ""} ${
                  selected
                    ? "border border-ink bg-ink font-normal text-white"
                    : "border border-ink/15 bg-white font-normal text-ink hover:border-ink/30"
                }`}
              >
                {pillar.name}
              </button>,
            ];
          })}
        </div>
        <div
          aria-hidden="true"
          className={`pointer-events-none absolute top-0 -right-6 bottom-2 w-12 bg-gradient-to-l from-paper to-transparent transition-opacity duration-200 md:-right-12 lg:hidden ${
            canScrollRight ? "opacity-100" : "opacity-0"
          }`}
        />
      </div>

      <div
        id={panelId}
        role="tabpanel"
        aria-labelledby={tabId(active)}
        className="mt-6"
      >
        <p className="text-[12px] uppercase tracking-[0.2em] text-ink/55">{label}</p>
        {/* Every question sits in the same grid cell so the tallest one sets the height. */}
        <div className="mt-3 grid" aria-live="polite">
          {pillars.map((pillar, i) => {
            const selected = i === active;
            return (
              <p
                key={pillar.name}
                aria-hidden={!selected}
                className={`col-start-1 row-start-1 text-[22px] font-normal leading-[1.35] text-ink transition-[opacity,visibility] duration-300 motion-reduce:transition-none ${
                  selected ? "visible opacity-100" : "invisible opacity-0"
                }`}
              >
                {pillar.question}
              </p>
            );
          })}
        </div>
      </div>
    </div>
  );
}
