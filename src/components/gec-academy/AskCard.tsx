"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { MarkIcon } from "./Icons";
import { prefersReducedMotion } from "./motion";
import { gecAsk } from "@/content/gec-academy";

// "Ask about the qualification" as a white site card: a question pill types its answer out (two
// characters every 16ms); the first question is asked 900ms after load. Reduced motion shows the
// whole answer at once. Screen readers get each full answer once (a hidden live region).
export default function AskCard() {
  const [active, setActive] = useState<number | null>(null);
  const [typed, setTyped] = useState("");
  const [done, setDone] = useState(false);
  const timer = useRef<number | undefined>(undefined);

  const ask = useCallback((i: number) => {
    setActive(i);
    window.clearInterval(timer.current);
    setDone(false);
    const text = gecAsk.answers[i].a;
    if (prefersReducedMotion()) {
      setTyped(text);
      setDone(true);
      return;
    }
    let n = 0;
    setTyped("");
    timer.current = window.setInterval(() => {
      n += 2;
      setTyped(text.slice(0, n));
      if (n >= text.length) {
        window.clearInterval(timer.current);
        setDone(true);
      }
    }, 16);
  }, []);

  useEffect(() => {
    const start = window.setTimeout(() => ask(0), 900);
    return () => {
      window.clearTimeout(start);
      window.clearInterval(timer.current);
    };
  }, [ask]);

  const current = active === null ? null : gecAsk.answers[active];

  return (
    <div className="overflow-hidden rounded-2xl border border-ink/10 bg-white shadow-[0_8px_24px_rgba(22,33,61,0.08)]">
      <div className="flex items-center gap-2 border-b border-ink/10 px-5 py-3.5">
        <span className="h-2.5 w-2.5 rounded-full bg-ink/15" aria-hidden="true" />
        <span className="h-2.5 w-2.5 rounded-full bg-ink/15" aria-hidden="true" />
        <span className="h-2.5 w-2.5 rounded-full bg-ink/15" aria-hidden="true" />
        <p className="ml-2 text-[14px] font-medium text-ink">{gecAsk.title}</p>
      </div>
      {/* Tall enough for the longest answer, so the card doesn't jump while typing. */}
      <div className="min-h-[220px] px-5 py-5 sm:min-h-[190px]" aria-hidden="true">
        {current && (
          <p className="ml-auto w-fit max-w-[85%] rounded-[18px_18px_4px_18px] bg-accent/15 px-4 py-2 text-[14px] text-ink">
            {current.q}
          </p>
        )}
        <div className="mt-4 flex gap-3">
          <MarkIcon className="mt-1 h-auto w-7 shrink-0" />
          <p className="text-[15px] leading-[1.6] text-ink/80">
            {typed}
            {!done && current && (
              <span className="ml-0.5 inline-block h-[1em] w-[2px] translate-y-[2px] animate-pulse bg-accent motion-reduce:hidden" />
            )}
          </p>
        </div>
      </div>
      <p className="sr-only" aria-live="polite">
        {current ? `${current.q} ${current.a}` : ""}
      </p>
      <div className="flex flex-wrap gap-2 px-5 pb-5" role="group" aria-label="Suggested questions">
        {gecAsk.answers.map((item, i) => (
          <button
            key={item.q}
            type="button"
            aria-pressed={active === i}
            onClick={() => ask(i)}
            className={`cursor-pointer rounded-full border-[1.5px] border-accent px-3.5 py-2 text-[13px] font-medium text-ink transition-[background-color,transform] duration-150 focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-accent/40 focus-visible:ring-offset-2 motion-reduce:transition-none ${
              active === i ? "bg-accent" : "bg-transparent hover:-translate-y-px hover:bg-accent/10 motion-reduce:hover:translate-y-0"
            }`}
          >
            {item.q}
          </button>
        ))}
      </div>
    </div>
  );
}
