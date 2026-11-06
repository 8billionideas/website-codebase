"use client";

import {
  Fragment,
  useEffect,
  useId,
  useRef,
  useState,
  type KeyboardEvent,
  type MouseEvent as ReactMouseEvent,
  type PointerEvent as ReactPointerEvent,
  type ReactNode,
} from "react";
import { BookOpen, GraduationCap, Minus, Plus, Tag, type LucideIcon } from "lucide-react";
import {
  YEAR_GROUPS_MIN,
  YEAR_GROUPS_MAX,
  PILLARS_MIN,
  PILLARS_MAX,
  CC_UNITS_MAX,
  CC_LIST_RATE,
  CC_BANDS,
  CC_MIN_UNITS,
  CROSS_PRODUCT_CAP,
  CROSS_PRODUCT_MIN_STUDENTS,
  DEFAULT_YEAR_GROUPS,
  DEFAULT_PILLARS,
  DEFAULT_PRODUCT,
  STUDENTS_MIN,
  STUDENTS_MAX,
  DEFAULT_STUDENTS,
  GCSE_BANDS,
  PRICING_ESTIMATE_NOTE,
  ccNextBandMessage,
  crossProductHint,
  formatMoney,
  gcseNextBand,
  priceQuote,
  type CcSelection,
} from "@/lib/pricing";
import Button from "@/components/ui/Button";
import QuoteRequestModal, { type QuoteSelection } from "@/components/pricing/QuoteRequestModal";
import { trackEvent } from "@/lib/analytics";


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

// Press-and-hold repeat for the − / + buttons. Pointer (mouse, touch, pen): one step on press, then
// after 400ms a step every 100ms, and from 2s every 50ms with the fast step size. It stops on
// release, pointer leave or cancel, blur and at the limits (step returns false). Keyboard: Enter
// and Space step on every keydown, so holding either repeats with the system's key repeat. The
// click that follows a pointer press or key press is skipped; a click with neither (assistive
// tech) steps once.
const HOLD_DELAY_MS = 400;
const HOLD_INTERVAL_MS = 100;
const HOLD_FAST_AFTER_MS = 2000;
const HOLD_FAST_INTERVAL_MS = 50;
// No text selection, double-tap zoom or long-press callout while a finger holds the button.
const STEP_BUTTON =
  "flex h-12 w-12 shrink-0 touch-manipulation select-none items-center justify-center text-ink transition-opacity [-webkit-touch-callout:none]";

function useHoldToRepeat(step: (fast: boolean) => boolean) {
  const stepRef = useRef(step);
  useEffect(() => {
    stepRef.current = step;
  });
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const skipClick = useRef(false);

  function stop() {
    if (timer.current) clearTimeout(timer.current);
    timer.current = null;
  }
  // Cleared after the click event that follows the release.
  function releaseClick() {
    setTimeout(() => {
      skipClick.current = false;
    }, 0);
  }
  useEffect(() => stop, []);

  return {
    onPointerDown(e: ReactPointerEvent<HTMLButtonElement>) {
      if (e.button !== 0 || e.currentTarget.disabled) return;
      skipClick.current = true;
      stop();
      if (!stepRef.current(false)) return;
      const start = Date.now();
      const tick = () => {
        const fast = Date.now() - start >= HOLD_DELAY_MS + HOLD_FAST_AFTER_MS;
        if (stepRef.current(fast)) timer.current = setTimeout(tick, fast ? HOLD_FAST_INTERVAL_MS : HOLD_INTERVAL_MS);
        else timer.current = null;
      };
      timer.current = setTimeout(tick, HOLD_DELAY_MS);
    },
    onPointerUp() {
      stop();
      releaseClick();
    },
    onPointerLeave() {
      stop();
      releaseClick();
    },
    onPointerCancel() {
      stop();
      releaseClick();
    },
    onBlur() {
      stop();
      skipClick.current = false;
    },
    onKeyDown(e: KeyboardEvent<HTMLButtonElement>) {
      if (e.key !== "Enter" && e.key !== " ") return;
      e.preventDefault();
      skipClick.current = true;
      stepRef.current(false);
    },
    onKeyUp(e: KeyboardEvent<HTMLButtonElement>) {
      if (e.key !== "Enter" && e.key !== " ") return;
      e.preventDefault();
      releaseClick();
    },
    onClick() {
      if (skipClick.current) {
        skipClick.current = false;
        return;
      }
      stepRef.current(false);
    },
    // No long-press menu on touch screens.
    onContextMenu(e: ReactMouseEvent) {
      e.preventDefault();
    },
  };
}

function PillStepper({
  value,
  min,
  max,
  label,
  onChange,
  editable = false,
  fastStep = 1,
}: {
  value: number;
  min: number;
  max: number;
  label: string;
  onChange: (next: number) => void;
  editable?: boolean;
  // Step size once a press has been held for 2 seconds.
  fastStep?: number;
}) {
  const [draft, setDraft] = useState<string | null>(null);
  // The latest value, updated as soon as a step is taken, so repeated steps never use a stale one.
  const valueRef = useRef(value);
  useEffect(() => {
    valueRef.current = value;
  }, [value]);

  function stepBy(delta: number) {
    const next = Math.min(max, Math.max(min, valueRef.current + delta));
    if (next === valueRef.current) return false;
    valueRef.current = next;
    onChange(next);
    return next > min && next < max;
  }
  const decreaseHold = useHoldToRepeat((fast) => stepBy(fast ? -fastStep : -1));
  const increaseHold = useHoldToRepeat((fast) => stepBy(fast ? fastStep : 1));
  // Arrow keys step by one (holding repeats with the system's key repeat). While the number field is
  // being edited, they step from the typed number and the field shows each new value.
  function handleKeyDown(e: KeyboardEvent) {
    const delta =
      e.key === "ArrowUp" || e.key === "ArrowRight" ? 1 : e.key === "ArrowDown" || e.key === "ArrowLeft" ? -1 : 0;
    if (!delta) return;
    e.preventDefault();
    if (draft !== null) {
      const typed = parseInt(draft, 10);
      if (!Number.isNaN(typed)) valueRef.current = Math.min(max, Math.max(min, typed));
    }
    stepBy(delta);
    if (draft !== null) setDraft(String(valueRef.current));
  }

  const displayValue = draft ?? value.toLocaleString("en-GB");

  return (
    <div className="flex items-center gap-3">
      <div className="inline-flex items-center divide-x divide-ink/15 rounded-full border border-ink/15">
        <button
          type="button"
          {...decreaseHold}
          disabled={value <= min}
          aria-label={`Decrease ${label}`}
          className={`${STEP_BUTTON} disabled:cursor-not-allowed disabled:opacity-30`}
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
          {...increaseHold}
          disabled={value >= max}
          aria-label={`Increase ${label}`}
          className={`${STEP_BUTTON} disabled:cursor-not-allowed disabled:opacity-30`}
        >
          <Plus className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
        </button>
      </div>
      <span className="text-[15px] text-ink/60">{label}</span>
    </div>
  );
}

// A discount progress track: filled to the current value, with a dot and rate label at each band
// threshold (and the starting rate at the left). position() maps a value to 0–1 along the track.
function DiscountProgress({
  label,
  value,
  min,
  max,
  valueText,
  startLabel,
  markers,
  position,
  describedBy,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  valueText: string;
  startLabel: string;
  markers: { at: number; label: string }[];
  position: (v: number) => number;
  describedBy: string;
}) {
  const fill = Math.min(1, Math.max(0, position(value)));
  return (
    <div
      role="progressbar"
      aria-label={label}
      aria-valuemin={min}
      aria-valuemax={max}
      aria-valuenow={Math.min(value, max)}
      aria-valuetext={valueText}
      aria-describedby={describedBy}
      className="relative pt-1 pb-7"
    >
      <div className="relative h-2 rounded-full bg-ink/10">
        <div
          className="absolute inset-y-0 left-0 rounded-full bg-accent transition-[width] duration-300 ease-out motion-reduce:transition-none"
          style={{ width: `${fill * 100}%` }}
        />
        {markers.map((m) => {
          const at = position(m.at);
          return (
            <span
              key={m.at}
              aria-hidden="true"
              className={`absolute top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-paper transition-colors duration-300 motion-reduce:transition-none ${
                value >= m.at ? "bg-accent" : "bg-ink/30"
              }`}
              style={{ left: `${at * 100}%` }}
            />
          );
        })}
      </div>
      <div aria-hidden="true" className="relative mt-2 text-[12px] leading-none text-ink/60">
        <span className="absolute left-0">{startLabel}</span>
        {markers.map((m) => {
          const at = position(m.at);
          return (
            <span
              key={m.at}
              // Each rate label starts at its dot ("from here on"); the one at the far end sits
              // right-aligned. (Centred, the first CC labels overlapped at 375px.)
              className={`absolute whitespace-nowrap ${at >= 1 ? "-translate-x-full" : "-translate-x-1.5"} ${value >= m.at ? "font-medium text-ink" : ""}`}
              style={{ left: `${at * 100}%` }}
            >
              {m.label}
            </span>
          );
        })}
      </div>
    </div>
  );
}

// Under each product's headline price: what was chosen, the full price (struck through) and the
// price paid, then the saving in accent green (#21D199 on the ink panel: 8.07:1, passes AA).
// The full price and the saving only show when there is a saving.
function PanelPriceLines({ summary, full, price, saving }: { summary: string; full: number; price: number; saving: number }) {
  return (
    <div className="mt-6 space-y-1.5 text-[16px]">
      <p className="text-white/80">{summary}</p>
      {saving > 0 && (
        <div className="flex items-baseline justify-between gap-4">
          <span className="text-white/80">Full price</span>
          {/* line-through on the number itself: it doesn't carry into an inline-block. */}
          <s className="text-white/50">
            <FadeOnChange value={formatMoney(full)} className="line-through" />
          </s>
        </div>
      )}
      <div className="flex items-baseline justify-between gap-4">
        <span className="text-white/80">Your price</span>
        <span className="text-white">
          <FadeOnChange value={formatMoney(price)} /> / year
        </span>
      </div>
      {saving > 0 && <SavingLine label="You save" amount={formatMoney(saving)} />}
    </div>
  );
}

// A bright-green saving line with a tag icon: "You save £165", "Total saving: £180".
function SavingLine({ label, amount, bold = false }: { label: string; amount: string; bold?: boolean }) {
  return (
    <p className={`flex items-center gap-2 pt-1 text-[18px] text-accent ${bold ? "font-semibold" : "font-medium"}`}>
      <Tag className="h-4 w-4 shrink-0" strokeWidth={1.5} aria-hidden="true" />
      <span>
        {label} <FadeOnChange value={amount} />
      </span>
    </p>
  );
}

// The CC panel below the five-programme minimum: no price, just the prompt; from one programme,
// how many more are needed and a five-step progress bar.
function CcMinimumPrompt({ selection, id }: { selection: CcSelection; id: string }) {
  const { units, needed, status } = selection;
  return (
    <div className="mt-6 text-[16px]" aria-live="polite">
      <p className="text-white/80">Selected programmes: {units}</p>
      <p id={id} className="mt-3 leading-[1.5] text-white">
        Choose at least five programmes
      </p>
      {status === "below-minimum" && (
        <>
          <p className="mt-3 font-medium text-accent">{needed} more needed</p>
          <div
            role="progressbar"
            aria-label="Programmes towards the minimum"
            aria-valuemin={0}
            aria-valuemax={CC_MIN_UNITS}
            aria-valuenow={units}
            aria-valuetext={`${units} of ${CC_MIN_UNITS} programmes`}
            className="mt-3 grid max-w-[240px] gap-1.5"
            style={{ gridTemplateColumns: `repeat(${CC_MIN_UNITS}, minmax(0, 1fr))` }}
          >
            {Array.from({ length: CC_MIN_UNITS }, (_, i) => (
              <span
                key={i}
                aria-hidden="true"
                className={`h-1.5 rounded-full transition-colors duration-300 motion-reduce:transition-none ${i < units ? "bg-accent" : "bg-white/20"}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

const plural = (n: number, one: string, many: string) => `${n.toLocaleString("en-GB")} ${n === 1 ? one : many}`;

// CC: to scale, 0–78 units (shown as programmes), markers where each lower rate starts (14th, 33rd, 65th).
const ccPosition = (v: number) => (Math.min(Math.max(v, 1), CC_UNITS_MAX) - 1) / (CC_UNITS_MAX - 1);
const CC_MARKERS = CC_BANDS.slice(1).map((b) => ({ at: b.from, label: formatMoney(b.rate) }));

// GCSE: the band thresholds (26, 51, 101, 151, 200) evenly spaced (to scale, the first labels would
// overlap), filling within each step; the visual stops at 200+.
const GCSE_POINTS = GCSE_BANDS.map((b) => b.min);
function gcsePosition(v: number) {
  const last = GCSE_POINTS.length - 1;
  if (v >= GCSE_POINTS[last]) return 1;
  const i = Math.max(0, GCSE_POINTS.findIndex((p, k) => v >= p && v < GCSE_POINTS[k + 1]));
  return (i + (v - GCSE_POINTS[i]) / (GCSE_POINTS[i + 1] - GCSE_POINTS[i])) / last;
}
const GCSE_MARKERS = GCSE_BANDS.slice(1).map((b) => ({ at: b.min, label: formatMoney(b.rate) }));

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

  // Everything comes from the pricing module (src/lib/pricing.ts); no services in the calculator.
  const quote = priceQuote({
    cc: showCC ? { yearGroups, pillars } : undefined,
    gcse: showGcse ? { students } : undefined,
  });
  // ccSelection is whatever was chosen; cc (the price) is only set from five programmes.
  const ccSelection = quote.ccSelection;
  const cc = quote.cc;
  const gcse = quote.gcse;
  const ccNudge = ccSelection ? ccNextBandMessage(ccSelection.units) : null;
  const gcseNext = gcse ? gcseNextBand(gcse.students) : null;
  const crossHint = showCC && showGcse ? crossProductHint(students) : null;
  // Every saving line shown in the panel; the total shows for Both, or with more than one line.
  const savings = [cc?.saving ?? 0, gcse?.saving ?? 0, quote.crossProduct.applied].filter((v) => v > 0);
  const totalSaving = savings.reduce((sum, v) => sum + v, 0);
  const showTotalSaving = totalSaving > 0 && (product === "both" || savings.length > 1);
  const ccHelpId = `${radioGroupName}-cc-help`;
  const ccMinimumId = `${radioGroupName}-cc-minimum`;
  const gcseHelpId = `${radioGroupName}-gcse-help`;

  const steps: StepKind[] =
    product === "cc"
      ? ["yearGroups", "pillars"]
      : product === "gcse"
        ? ["students"]
        : ["yearGroups", "pillars", "students"];

  function openQuote(event: React.MouseEvent<HTMLButtonElement>) {
    // Never a CC quote below five programmes (the button is disabled then too).
    if (!quote.quoteReady) return;
    trackEvent("quote_click");
    quoteButtonRef.current = event.currentTarget;
    setQuoteSelection({
      product: product === "cc" ? "Critical Curriculum" : product === "gcse" ? "International GCSE" : "Both",
      cc: showCC ? { yearGroups, pillars } : undefined,
      gcse: showGcse ? { students } : undefined,
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
            <PillStepper
              value={pillars}
              min={PILLARS_MIN}
              max={PILLARS_MAX}
              label={pillars === 1 ? "pillar per year group" : "pillars per year group"}
              onChange={setPillars}
            />
            {/* Below 640px the note, bar and message use the full width (not the step's 56px
                indent), so the bar's rate labels have room. */}
            {ccSelection && (
              <div className="mt-6 -ml-14 sm:ml-0">
                <p className="text-[13px] text-ink/60">1 programme = 1 pillar for 1 year group</p>
                <div className="mt-4">
                  <DiscountProgress
                    label="Critical Curriculum programmes"
                    value={ccSelection.units}
                    min={0}
                    max={CC_UNITS_MAX}
                    valueText={plural(ccSelection.units, "programme", "programmes")}
                    startLabel={formatMoney(CC_LIST_RATE)}
                    markers={CC_MARKERS}
                    position={ccPosition}
                    describedBy={ccHelpId}
                  />
                </div>
                {/* The next-band nudge, from the bands in src/lib/pricing.ts (none at 0). */}
                <p id={ccHelpId} aria-live="polite" className="text-[14px] leading-[1.5] text-ink/80">
                  {ccNudge}
                </p>
                <p className="mt-2 text-[13px] leading-[1.5] text-ink/60">
                  Pricing is calculated in bands. Lower rates apply only to additional programmes within each band.
                </p>
              </div>
            )}
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
              fastStep={5}
            />
            {gcse && (
              <div className="mt-6 -ml-14 sm:ml-0">
                <DiscountProgress
                  label="International GCSE students"
                  value={gcse.students}
                  min={STUDENTS_MIN}
                  max={GCSE_POINTS[GCSE_POINTS.length - 1]}
                  valueText={plural(gcse.students, "student", "students")}
                  startLabel={formatMoney(GCSE_BANDS[0].rate)}
                  markers={GCSE_MARKERS}
                  position={gcsePosition}
                  describedBy={gcseHelpId}
                />
                <div id={gcseHelpId} aria-live="polite" className="space-y-1 text-[14px] leading-[1.5] text-ink/80">
                  <p>
                    {gcseNext
                      ? `Add ${plural(gcseNext.needed, "more student", "more students")} and the price for all your students drops to ${formatMoney(gcseNext.rate)} each.`
                      : `You're on our lowest price: ${formatMoney(GCSE_BANDS[GCSE_BANDS.length - 1].rate)} per student.`}
                  </p>
                  {crossHint !== null && (
                    <p>
                      Add {plural(crossHint, "more GCSE student", "more GCSE students")} ({CROSS_PRODUCT_MIN_STUDENTS} or more) to get a
                      discount of up to {formatMoney(CROSS_PRODUCT_CAP)} for choosing both.
                    </p>
                  )}
                </div>
              </div>
            )}
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
            Build the Critical Curriculum that fits your school. Select programmes across the year groups and
            pillars you need, and see your indicative annual price as you go.
          </p>
          <p className="mt-3 max-w-xl text-[16px] leading-[1.6] text-ink/70">
            Programmes start at {formatMoney(CC_BANDS[0].rate)} per year, with lower prices for additional programmes
            as your selection grows. Minimum selection: five programmes.
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
            YOUR ESTIMATED PRICE PER YEAR
          </p>

          {ccSelection && (
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

              {cc ? (
                <>
                  <p className="mt-6 text-[14px] text-white/80">Indicative annual Critical Curriculum licence</p>
                  <p className="mt-2" aria-live="polite">
                    <FadeOnChange
                      value={formatMoney(cc.charge)}
                      className="text-[48px] font-light leading-[1] text-white md:text-[64px]"
                    />
                    <span className="ml-2 text-[20px] font-light text-white/80">/ year</span>
                  </p>

                  <PanelPriceLines
                    summary={`Selected programmes: ${cc.units}`}
                    full={cc.list}
                    price={cc.charge}
                    saving={cc.saving}
                  />
                  <p className="mt-3 text-[13px] leading-[1.5] text-white/60">
                    As you add more programmes, additional programmes can cost less. Existing selections keep their
                    original band price.
                  </p>
                </>
              ) : (
                <CcMinimumPrompt selection={ccSelection} id={ccMinimumId} />
              )}
            </div>
          )}

          {ccSelection && gcse && (
            <div className="my-8 h-px w-full bg-white/15" aria-hidden="true" />
          )}

          {gcse && (
            <div className={ccSelection ? "" : "mt-6"}>
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
                  value={formatMoney(gcse.fee)}
                  className="text-[48px] font-light leading-[1] text-white md:text-[64px]"
                />
                <span className="ml-2 text-[20px] font-light text-white/80">/ year</span>
              </p>

              <PanelPriceLines
                summary={`${plural(gcse.students, "student", "students")} × ${formatMoney(gcse.rate)}`}
                full={gcse.full}
                price={gcse.fee}
                saving={gcse.saving}
              />
            </div>
          )}

          {cc && gcse && quote.crossProduct.applied > 0 && (
            <div className="mt-6 border-t border-white/15 pt-4">
              <SavingLine label="Discount for choosing both:" amount={`−${formatMoney(quote.crossProduct.applied)}`} />
              <p className="mt-1 text-[13px] leading-[1.5] text-white/60">
                Applied once your GCSE students are confirmed.
              </p>
            </div>
          )}

          {showTotalSaving && (
            <div className="mt-6 border-t border-white/15 pt-4">
              <SavingLine label="Total saving:" amount={formatMoney(totalSaving)} bold />
            </div>
          )}

          {/* No total while the Critical Curriculum is below its five-programme minimum. */}
          {quote.quoteReady && (
            <div className="mt-6 border-t border-white/15 pt-5">
              <div className="flex items-baseline justify-between gap-4">
                <span className="text-[16px] font-medium text-white">Total per year</span>
                <span aria-live="polite" className="text-[20px] font-medium text-white">
                  {formatMoney(quote.annualRecurring)} / year
                </span>
              </div>
              {/* The recurring total ÷ 12 (one-off extras aren't included). */}
              <div className="mt-2 flex items-baseline justify-between gap-4">
                <span className="whitespace-nowrap text-[15px] text-white/80">Total per month</span>
                <span className="whitespace-nowrap text-[16px] text-white/80">{formatMoney(quote.monthlyRecurring)} / month</span>
              </div>
              <p className="mt-0.5 text-right text-[12px] leading-[1.5] text-white/60">Billed annually</p>
            </div>
          )}
          <p className="mt-3 text-[12px] leading-[1.5] text-white/60">{PRICING_ESTIMATE_NOTE}</p>

          <p className="mt-8 text-[15px] leading-[1.6] text-white/80">
            Your price is indicative and will be confirmed by our team based on your school&apos;s requirements.
          </p>

          <Button
            aria-haspopup="dialog"
            onClick={openQuote}
            disabled={!quote.quoteReady}
            aria-describedby={!quote.quoteReady && ccSelection ? ccMinimumId : undefined}
            arrow
            className="mt-6 w-full"
          >
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
