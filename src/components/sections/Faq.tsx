"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import Link from "next/link";
import Container from "@/components/layout/Container";
import { home } from "@/content/home";
import { homepageFaqs, type HomepageFaq } from "@/lib/homepage-faqs";

const NO_ANSWER_YET = "Answer coming soon";

function buildStructuredData(faqs: HomepageFaq[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs
      .filter((faq) => faq.paragraphs.join(" ").trim() !== NO_ANSWER_YET)
      .map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: faq.paragraphs.join(" "),
        },
      })),
  };
}

interface FaqProps {
  headline?: string;
  faqs?: HomepageFaq[];
}

export default function Faq({ headline = home.faq.headline, faqs = homepageFaqs }: FaqProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const splitIndex = Math.ceil(faqs.length / 2);
  const leftColumn = faqs.slice(0, splitIndex).map((faq, i) => ({ faq, index: i }));
  const rightColumn = faqs.slice(splitIndex).map((faq, i) => ({ faq, index: i + splitIndex }));

  function toggle(index: number) {
    setOpenIndex((prev) => (prev === index ? null : index));
  }

  function renderQuestion(faq: HomepageFaq, index: number) {
    const open = index === openIndex;
    const panelId = `faq-panel-${index}`;

    return (
      <li key={faq.question}>
        <h3>
          <button
            type="button"
            id={`faq-question-${index}`}
            onClick={() => toggle(index)}
            onKeyDown={(event) => {
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                toggle(index);
              }
            }}
            aria-expanded={open}
            aria-controls={panelId}
            className="group flex w-full items-center justify-between gap-6 py-4 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2"
          >
            <span className="text-[15px] font-normal text-ink transition-colors group-hover:text-accent lg:text-[16px]">
              {faq.question}
            </span>
            <Plus
              className={`h-4 w-4 shrink-0 text-ink transition-transform duration-200 ${
                open ? "rotate-45" : ""
              }`}
              strokeWidth={1.5}
              aria-hidden="true"
            />
          </button>
        </h3>

        <div
          id={panelId}
          role="region"
          aria-labelledby={`faq-question-${index}`}
          className={`grid transition-[grid-template-rows] duration-[250ms] ease-out ${
            open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
          }`}
        >
          <div className="overflow-hidden">
            <div
              className={`space-y-3 pb-4 text-[14px] leading-[1.7] text-ink/75 transition-opacity duration-[250ms] ${
                open ? "opacity-100" : "opacity-0"
              }`}
            >
              {faq.paragraphs.map((paragraph, pIndex) => (
                <p key={pIndex}>{paragraph}</p>
              ))}
              {faq.link && (
                <p>
                  <Link
                    href={faq.link.href}
                    className="font-medium text-ink underline decoration-transparent underline-offset-2 transition-colors hover:decoration-ink"
                  >
                    {faq.link.label}
                  </Link>
                </p>
              )}
            </div>
          </div>
        </div>
      </li>
    );
  }

  return (
    <section className="bg-surface py-16 md:py-24">
      <Container>
        <h2 className="text-h2 text-ink">{headline}</h2>

        <div className="flex flex-col lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-12">
          <ul className="mt-10 divide-y divide-ink/12 border-t border-b border-ink/12">
            {leftColumn.map(({ faq, index }) => renderQuestion(faq, index))}
          </ul>
          <ul className="divide-y divide-ink/12 border-b border-ink/12 lg:mt-10 lg:border-t">
            {rightColumn.map(({ faq, index }) => renderQuestion(faq, index))}
          </ul>
        </div>
      </Container>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildStructuredData(faqs)) }}
      />
    </section>
  );
}
