"use client";

import { Fragment, useEffect, useId, useRef, useState, type KeyboardEvent, type ReactNode } from "react";
import { BookOpen, GraduationCap, Minus, Plus, type LucideIcon } from "lucide-react";
import {
  PILLAR_OPTIONS,
  PRICE_PER_PILLAR_PER_YEAR_GROUP,
  YEAR_GROUPS_MIN,
  YEAR_GROUPS_MAX,
  DEFAULT_YEAR_GROUPS,
  DEFAULT_PILLARS,
  DEFAULT_PRODUCT,
  STUDENTS_MIN,
  STUDENTS_MAX,
  DEFAULT_STUDENTS,
  calculateCurriculumPrice,
  getGcseTier,
  formatMoney,
} from "@/lib/pricing";
import Button from "@/components/ui/Button";
import QuoteRequestModal, { type QuoteSelection } from "@/components/pricing/QuoteRequestModal";


type Product = "cc" | "gcse" | "both";
type StepKind = "yearGroups" | "pillars" | "students";

const PRODUCT_OPTIONS: { value: Product; label: string; icons: LucideIcon[] }[] = [
  { value: "cc", label: "Critical Curriculum", icons: [BookOpen] },
  { value: "gcse", label: "International GCSE", icons: [GraduationCap] },
  { value: "both", label: "Both", icons: [BookOpen, GraduationCap] },
];

function FadeOnChange({ value, className }: { value: string; className?: string }) {
  const [visible, setVisible] = useState(true);
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    setVisible(false);
    const frame = requestAnimationFrame(() => setVisible(true));
    return () => cancelAnimationFrame(frame);
  }, [value]);

  return (
    <span
      className={`inline-block transition-opacity duration-300 motion-reduce:transition-none ${
        visible ? "opacity-100" : "opacity-0"
      } ${className ?? ""}`}
    >
      {value}
    </span>
  );
}

function StepShell({
  number,
  title,
  helper,
  children,
}: {
  number: number;
  title: string;
  helper: string;
  children: ReactNode;
}) {
  return (
    <div>
      <div className="flex items-start gap-4">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-ink text-[15px] font-normal text-white">
          {number}
        </span>
        <div>
          <p className="text-[20px] font-normal text-ink">{title}</p>
          <p className="mt-1 text-[15px] text-ink/65">{helper}</p>
        </div>
      </div>
      <div className="mt-5 pl-14">{children}</div>
    </div>
  );
}

function PillStepper({
  value,
  min,
  max,
  label,
  onChange,
  editable = false,
}: {
  value: number;
  min: number;
  max: number;
  label: string;
  onChange: (next: number) => void;
  editable?: boolean;
}) {
  const [draft, setDraft] = useState<string | null>(null);

  function decrement() {
    onChange(Math.max(min, value - 1));
  }
  function increment() {
    onChange(Math.min(max, value + 1));
  }
  function handleKeyDown(e: KeyboardEvent) {
    if (e.key === "ArrowUp" || e.key === "ArrowRight") {
      e.preventDefault();
      increment();
    } else if (e.key === "ArrowDown" || e.key === "ArrowLeft") {
      e.preventDefault();
      decrement();
    }
  }

  const displayValue = draft ?? value.toLocaleString("en-GB");

  return (
    <div className="flex items-center gap-3">
      <div className="inline-flex items-center divide-x divide-ink/15 rounded-full border border-ink/15">
        <button
          type="button"
          onClick={decrement}
          disabled={value <= min}
          aria-label={`Decrease ${label}`}
          className="flex h-12 w-12 shrink-0 items-center justify-center text-ink transition-opacity disabled:cursor-not-allowed disabled:opacity-30"
        >
          <Minus className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
        </button>
        {editable ? (
          <input
            type="text"
            inputMode="numeric"
            aria-label={`Number of ${label}`}
            value={displayValue}
            onFocus={() => setDraft(String(value))}
            onChange={(e) => setDraft(e.target.value.replace(/[^\d]/g, ""))}
            onBlur={() => {
              const parsed = draft === null || draft === "" ? value : parseInt(draft, 10);
              const clamped = Math.min(max, Math.max(min, Number.isNaN(parsed) ? value : parsed));
              onChange(clamped);
              setDraft(null);
            }}
            onKeyDown={handleKeyDown}
            className="h-12 w-24 border-0 bg-transparent text-center text-[28px] font-light text-ink outline-none focus-visible:ring-2 focus-visible:ring-accent"
          />
        ) : (
          <div
            role="spinbutton"
            tabIndex={0}
            aria-label={`Number of ${label}`}
            aria-valuemin={min}
            aria-valuemax={max}
            aria-valuenow={value}
            onKeyDown={handleKeyDown}
            className="flex h-12 w-16 items-center justify-center text-[28px] font-light text-ink outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            {value}
          </div>
        )}
        <button
          type="button"
          onClick={increment}
          disabled={value >= max}
          aria-label={`Increase ${label}`}
          className="flex h-12 w-12 shrink-0 items-center justify-center text-ink transition-opacity disabled:cursor-not-allowed disabled:opacity-30"
        >
          <Plus className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
        </button>
      </div>
      <span className="text-[15px] text-ink/60">{label}</span>
    </div>
  );
}

export default function PricingCalculator() {
  const [product, setProduct] = useState<Product>(DEFAULT_PRODUCT);
  const [yearGroups, setYearGroups] = useState(DEFAULT_YEAR_GROUPS);
  const [pillars, setPillars] = useState<number>(DEFAULT_PILLARS);
  const [students, setStudents] = useState(DEFAULT_STUDENTS);
  const radioGroupName = useId();

  // Quote pop-up: a snapshot of the selection when it opens, and a new key per opening so
  // it always starts fresh at step 1.
  const [quoteOpen, setQuoteOpen] = useState(false);
  const [quoteSession, setQuoteSession] = useState(0);
  const [quoteSelection, setQuoteSelection] = useState<QuoteSelection | null>(null);
  const quoteButtonRef = useRef<HTMLButtonElement | null>(null);
  const productFieldsetRef = useRef<HTMLFieldSetElement>(null);
  // Where focus goes when the pop-up closes: the quote button, or the calculator's product
  // choice after "Change selection".
  const quoteReturnTo = useRef<"button" | "calculator">("button");

  const showCC = product === "cc" || product === "both";
  const showGcse = product === "gcse" || product === "both";

  const { perYearGroup, total: ccTotal } = calculateCurriculumPrice(pillars, yearGroups);
  const gcseTier = getGcseTier(students);
  const gcseTotal = gcseTier.fee * students;

  const steps: StepKind[] =
    product === "cc"
      ? ["yearGroups", "pillars"]
      : product === "gcse"
        ? ["students"]
        : ["yearGroups", "pillars", "students"];

  function openQuote(event: React.MouseEvent<HTMLButtonElement>) {
    quoteButtonRef.current = event.currentTarget;
    setQuoteSelection({
      product: product === "cc" ? "Critical Curriculum" : product === "gcse" ? "International GCSE" : "Both",
      cc: showCC ? { yearGroups, pillars, perYearGroup, total: ccTotal } : undefined,
      gcse: showGcse ? { students, fee: gcseTier.fee, total: gcseTotal } : undefined,
    });
    quoteReturnTo.current = "button";
    setQuoteSession((n) => n + 1);
    setQuoteOpen(true);
  }

  function renderStep(kind: StepKind, number: number) {
    switch (kind) {
      case "yearGroups":
        return (
          <StepShell
            key={kind}
            number={number}
            title="How many year groups?"
            helper="Select the number of year groups you want to use 8billionideas with."
          >
            <PillStepper
              value={yearGroups}
              min={YEAR_GROUPS_MIN}
              max={YEAR_GROUPS_MAX}
              label={yearGroups === 1 ? "year group" : "year groups"}
              onChange={setYearGroups}
            />
          </StepShell>
        );
      case "pillars":
        return (
          <StepShell
            key={kind}
            number={number}
            title="How many pillars per year group?"
            helper="Choose how many pillars you'd like to deliver in each selected year group."
          >
            <fieldset>
              <legend className="sr-only">How many pillars per year group?</legend>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                {PILLAR_OPTIONS.map((option) => (
                  <label
                    key={option}
                    className="relative flex cursor-pointer flex-col rounded-xl border border-ink/12 bg-white p-5 text-ink transition-colors has-[:checked]:border-ink has-[:checked]:bg-ink has-[:checked]:text-white has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-accent has-[:focus-visible]:ring-offset-2"
                  >
                    <input
                      type="radio"
                      name={`pillars-${radioGroupName}`}
                      value={option}
                      checked={pillars === option}
                      onChange={() => setPillars(option)}
                      className="sr-only"
                    />
                    <span className="text-[18px]">
                      {option} pillar{option === 1 ? "" : "s"}
                    </span>
                    <span className="mt-1 text-[14px] opacity-70">
                      {formatMoney(option * PRICE_PER_PILLAR_PER_YEAR_GROUP)} per year group
                    </span>
                  </label>
                ))}
              </div>
            </fieldset>
          </StepShell>
        );
      case "students":
        return (
          <StepShell
            key={kind}
            number={number}
            title="How many students will take the qualification?"
            helper="Select the number of students you expect to enter for the International GCSE."
          >
            <PillStepper
              value={students}
              min={STUDENTS_MIN}
              max={STUDENTS_MAX}
              label="students"
              onChange={setStudents}
              editable
            />
          </StepShell>
        );
    }
  }

  return (
    <div className="mt-12">
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-[58fr_42fr] lg:items-start lg:gap-12">
        {/* LEFT — controls */}
        <div>
          <p className="text-[12px] uppercase tracking-[0.25em] text-accent">
            THE CRITICAL CURRICULUM
          </p>
          <h2 className="mt-4 text-[34px] font-light leading-[1.1] tracking-[-0.01em] text-ink md:text-[56px]">
            Create a programme
            <br />
            that fits your school.
          </h2>
          <p className="mt-4 max-w-xl text-[18px] leading-[1.6] text-ink/70">
            Choose what you&apos;d like to include and see an indicative price, calculated
            live. Pricing is simple, transparent and scales with what you need.
          </p>

          {/* Product selector */}
          <fieldset ref={productFieldsetRef} className="mt-10">
            <legend className="text-[12px] uppercase tracking-[0.2em] text-ink/60">
              WHAT ARE YOU LOOKING TO BRING INTO YOUR SCHOOL?
            </legend>
            <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
              {PRODUCT_OPTIONS.map((option) => (
                <label
                  key={option.value}
                  className="relative flex cursor-pointer items-center justify-center gap-2 rounded-[10px] border border-ink/12 bg-white px-5 py-4 text-[16px] text-ink transition-colors has-[:checked]:border-ink has-[:checked]:bg-ink has-[:checked]:text-white has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-accent has-[:focus-visible]:ring-offset-2"
                >
                  <input
                    type="radio"
                    name={`product-${radioGroupName}`}
                    value={option.value}
                    checked={product === option.value}
                    onChange={() => setProduct(option.value)}
                    className="sr-only"
                  />
                  <span className="flex items-center gap-1">
                    {option.icons.map((Icon, i) => (
                      <Icon key={i} className="h-5 w-5" strokeWidth={1.5} aria-hidden="true" />
                    ))}
                  </span>
                  {option.label}
                </label>
              ))}
            </div>
          </fieldset>

          {/* Steps */}
          <div className="mt-10">
            {steps.map((kind, i) => (
              <Fragment key={kind}>
                {i > 0 && <div className="my-8 h-px w-full bg-ink/10" aria-hidden="true" />}
                {renderStep(kind, i + 1)}
              </Fragment>
            ))}
          </div>
        </div>

        {/* RIGHT — price panel */}
        <div className="rounded-2xl bg-ink p-9 text-white lg:sticky lg:top-24">
          <p className="text-[12px] uppercase tracking-[0.25em] text-white/70">
            YOUR INDICATIVE ANNUAL PRICING
          </p>

          {showCC && (
            <div className="mt-6">
              <div className="flex items-center gap-3">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-accent/20">
                  <BookOpen className="h-6 w-6 text-white" strokeWidth={1.5} aria-hidden="true" />
                </span>
                <div>
                  <p className="text-[20px] font-normal text-white">Critical Curriculum</p>
                  <p className="text-[12px] uppercase tracking-[0.1em] text-white/60">
                    (School-funded)
                  </p>
                </div>
              </div>

              <p className="mt-6" aria-live="polite">
                <FadeOnChange
                  value={formatMoney(ccTotal)}
                  className="text-[48px] font-light leading-[1] text-white md:text-[64px]"
                />
                <span className="ml-2 text-[20px] font-light text-white/80">/ year</span>
              </p>

              <div className="mt-6 space-y-4 text-[16px]">
                <div className="flex items-center justify-between">
                  <span className="text-white/80">Year groups</span>
                  <span>{yearGroups}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-white/80">Pillars per year group</span>
                  <span>{pillars}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-white/80">Price per year group</span>
                  <span>{formatMoney(perYearGroup)}</span>
                </div>
              </div>
            </div>
          )}

          {showCC && showGcse && (
            <div className="my-8 h-px w-full bg-white/15" aria-hidden="true" />
          )}

          {showGcse && (
            <div className={showCC ? "" : "mt-6"}>
              <div className="flex items-center gap-3">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-accent/20">
                  <GraduationCap className="h-6 w-6 text-white" strokeWidth={1.5} aria-hidden="true" />
                </span>
                <div>
                  <p className="text-[20px] font-normal text-white">International GCSE</p>
                  <p className="text-[12px] uppercase tracking-[0.1em] text-white/60">
                    (Typically parent-funded)
                  </p>
                </div>
              </div>

              <p className="mt-6" aria-live="polite">
                <FadeOnChange
                  value={formatMoney(gcseTotal)}
                  className="text-[48px] font-light leading-[1] text-white md:text-[64px]"
                />
                <span className="ml-2 text-[20px] font-light text-white/80">/ year</span>
              </p>

              <div className="mt-6 space-y-4 text-[16px]">
                <div className="flex items-center justify-between">
                  <span className="text-white/80">Students</span>
                  <span>{students.toLocaleString("en-GB")}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-white/80">Price per student</span>
                  <span>{formatMoney(gcseTier.fee)}</span>
                </div>
              </div>
            </div>
          )}

          <p className="mt-8 text-[15px] leading-[1.6] text-white/80">
            These are indicative prices based on your current selections. Get in touch for a
            tailored quote based on your school&apos;s specific needs.
          </p>

          <Button aria-haspopup="dialog" onClick={openQuote} arrow className="mt-6 w-full">
            Request a tailored quote
          </Button>
        </div>
      </div>

      {quoteSelection && (
        <QuoteRequestModal
          key={quoteSession}
          open={quoteOpen}
          selection={quoteSelection}
          onClose={() => setQuoteOpen(false)}
          onChangeSelection={() => {
            quoteReturnTo.current = "calculator";
            setQuoteOpen(false);
          }}
          returnFocusTo={() =>
            quoteReturnTo.current === "calculator"
              ? productFieldsetRef.current?.querySelector<HTMLInputElement>("input:checked") ?? null
              : quoteButtonRef.current
          }
        />
      )}
    </div>
  );
}
