"use client";

import { useState } from "react";
import type { CurriculumItem } from "@/content/home";

export default function CurriculumTabs({ items }: { items: CurriculumItem[] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = items[activeIndex];

  return (
    <div className="mt-8">
      <div className="flex flex-wrap gap-2">
        {items.map((item, index) => (
          <button
            key={item.name}
            type="button"
            onClick={() => setActiveIndex(index)}
            onMouseEnter={() => setActiveIndex(index)}
            aria-pressed={index === activeIndex}
            className={`rounded-full border px-4 py-2 text-body font-medium transition-colors ${
              index === activeIndex
                ? "border-accent bg-accent/10 text-ink"
                : "border-ink/15 text-muted hover:border-ink/30"
            }`}
          >
            {item.name}
          </button>
        ))}
      </div>

      <div
        key={activeIndex}
        className="mt-4 rounded-lg bg-paper p-5 animate-[fade-in-up_200ms_ease-out]"
      >
        <p className="text-body-lg text-ink">{active.detail}</p>
      </div>
    </div>
  );
}
