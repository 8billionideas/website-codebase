"use client";

import { useId, useState } from "react";
import { Plus } from "lucide-react";
import Container from "@/components/layout/Container";
import { gecFaq } from "@/content/gec-academy";

const H2 = "text-balance text-[32px] font-light leading-[1.15] tracking-[-0.01em] text-ink md:text-[52px]";

// Questions, answered: three topic tabs (the site's pill style) and each topic's questions in the
// site FAQ accordion style, one answer open at a time (the first question starts open).
export default function GecFaq() {
  const uid = useId();
  const [topic, setTopic] = useState(gecFaq.topics[0].key);
  const [open, setOpen] = useState<Record<string, number | null>>({ [gecFaq.topics[0].key]: 0 });

  return (
    <section className="bg-paper py-section" id="faq">
      <Container className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,4fr)_minmax(0,7fr)] lg:gap-16">
        <div>
          <h2 className={H2}>
            {gecFaq.headingBefore.trim()}
            <br />
            <em className="text-accent">{gecFaq.headingEm}</em>
          </h2>
          <div className="mt-content flex flex-wrap gap-2.5 lg:flex-col lg:items-start" role="tablist" aria-label={gecFaq.tabsLabel}>
            {gecFaq.topics.map((t) => (
              <button
                key={t.key}
                type="button"
                role="tab"
                id={`${uid}-tab-${t.key}`}
                aria-selected={topic === t.key}
                aria-controls={`${uid}-panel-${t.key}`}
                onClick={() => setTopic(t.key)}
                className={`cursor-pointer whitespace-nowrap rounded-full border-[1.5px] px-4 py-2.5 text-[14px] font-medium transition-[background-color,border-color,color] duration-150 focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-accent/40 focus-visible:ring-offset-2 focus-visible:ring-offset-paper motion-reduce:transition-none ${
                  topic === t.key ? "border-accent bg-accent text-ink" : "border-accent bg-transparent text-ink hover:bg-accent/10"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>
        <div>
          {gecFaq.topics.map((t) => (
            <ul
              key={t.key}
              role="tabpanel"
              id={`${uid}-panel-${t.key}`}
              aria-labelledby={`${uid}-tab-${t.key}`}
              hidden={topic !== t.key}
              className="list-none divide-y divide-ink/12 border-t border-b border-ink/12 p-0"
            >
              {t.items.map((item, i) => {
                const isOpen = open[t.key] === i;
                const id = `${uid}-${t.key}-${i}`;
                return (
                  <li key={item.q}>
                    <h3>
                      <button
                        type="button"
                        id={`${id}-q`}
                        aria-expanded={isOpen}
                        aria-controls={`${id}-a`}
                        onClick={() => setOpen((prev) => ({ ...prev, [t.key]: isOpen ? null : i }))}
                        className="group flex w-full cursor-pointer items-center justify-between gap-6 py-4 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2"
                      >
                        <span className="text-[16px] font-normal text-ink transition-colors group-hover:text-accent lg:text-[17px]">
                          {item.q}
                        </span>
                        <Plus
                          className={`h-4 w-4 shrink-0 text-ink transition-transform duration-200 motion-reduce:transition-none ${isOpen ? "rotate-45" : ""}`}
                          strokeWidth={1.5}
                          aria-hidden="true"
                        />
                      </button>
                    </h3>
                    <div
                      id={`${id}-a`}
                      role="region"
                      aria-labelledby={`${id}-q`}
                      inert={!isOpen}
                      className={`grid transition-[grid-template-rows] duration-[250ms] ease-out motion-reduce:transition-none ${
                        isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                      }`}
                    >
                      <div className="overflow-hidden">
                        <p
                          className={`pb-4 text-[15px] leading-[1.7] text-ink/75 transition-opacity duration-[250ms] motion-reduce:transition-none ${
                            isOpen ? "opacity-100" : "opacity-0"
                          }`}
                        >
                          {item.a}
                        </p>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          ))}
        </div>
      </Container>
    </section>
  );
}
