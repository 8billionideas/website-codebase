"use client";

import { useEffect, useId, useRef, useState, type FocusEvent, type FormEvent, type ReactNode } from "react";
import { ArrowLeft, Check } from "lucide-react";
import ModalShell from "@/components/layout/ModalShell";
import Button from "@/components/ui/Button";
import { quoteAddOns } from "@/content/quote-addons";
import { HUBSPOT_QUOTE_FORM_ID, isQuoteFormConfigured, submitHubspotForm } from "@/lib/hubspot";
import { formatMoney } from "@/lib/pricing";

// Confirm these match the internal field names in the HubSpot quote form.
// quote_add_ons is sent as the selected add-on titles separated by semicolons (HubSpot's
// multi-checkbox format), so the form's option values should match the titles exactly.
// Prices are sent as whole pounds with no symbol (e.g. "720").
const HUBSPOT_FIELDS = {
  firstname: "firstname",
  lastname: "lastname",
  email: "email",
  company: "company",
  jobtitle: "jobtitle",
  message: "message",
  product: "quote_product",
  yearGroups: "quote_year_groups",
  pillars: "quote_pillars",
  students: "quote_students",
  ccPrice: "quote_cc_price",
  gcsePrice: "quote_gcse_price",
  addOns: "quote_add_ons",
} as const;

const PRIVACY_POLICY_URL = "https://8billionideas.notion.site/Privacy-Policy-0d819775ea1d4a0a8bdf36d8bdaedd05";

// A snapshot of the calculator when "Request a tailored quote" was clicked. Only the parts
// for the chosen product are set.
export interface QuoteSelection {
  product: "Critical Curriculum" | "International GCSE" | "Both";
  cc?: { yearGroups: number; pillars: number; perYearGroup: number; total: number };
  gcse?: { students: number; fee: number; total: number };
}

type FieldName = "firstname" | "lastname" | "company" | "jobtitle" | "email";
type Values = Record<FieldName, string> & { message: string };
type Errors = Partial<Record<FieldName, string>>;

const EMPTY: Values = { firstname: "", lastname: "", company: "", jobtitle: "", email: "", message: "" };
// Display order, also used to focus the first invalid field on submit.
const ORDER: FieldName[] = ["firstname", "lastname", "email", "company", "jobtitle"];
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

// Same rules and messages as the Request a demo pop-up.
function validate(name: FieldName, value: string): string | undefined {
  const v = value.trim();
  switch (name) {
    case "firstname":
      return v ? undefined : "Please enter your first name";
    case "lastname":
      return v ? undefined : "Please enter your last name";
    case "company":
      return v ? undefined : "Please enter your school or organisation";
    case "jobtitle":
      return v ? undefined : "Please enter your job title";
    case "email":
      if (!v) return "Please enter your work email address";
      return EMAIL_PATTERN.test(v) ? undefined : "Please enter a valid email address";
  }
}

// Pill-shaped inputs, 44px tall (as the Request a demo pop-up).
const INPUT_BASE =
  "w-full border bg-white px-4 text-[15px] text-ink outline-none transition-[border-color,box-shadow] placeholder:text-ink/45 focus:border-accent focus:ring-[3px] focus:ring-accent/20";
const INPUT = `h-11 rounded-full ${INPUT_BASE}`;
const HEADING = "text-[28px] font-light leading-[1.15] text-ink outline-none md:text-[36px]";
const TEXT_LINK =
  "cursor-pointer rounded-sm text-[14px] font-medium text-ink underline decoration-ink/30 underline-offset-2 transition-colors hover:decoration-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent";

const plural = (n: number, one: string, many: string) => `${n.toLocaleString("en-GB")} ${n === 1 ? one : many}`;

function productLabel(selection: QuoteSelection) {
  return selection.product === "Both" ? "Critical Curriculum and International GCSE" : selection.product;
}

// "Critical Curriculum · 3 year groups · 6 pillars · 2 add-ons"
function recapLine(selection: QuoteSelection, addOnCount: number) {
  const parts = [productLabel(selection)];
  if (selection.cc) parts.push(plural(selection.cc.yearGroups, "year group", "year groups"), plural(selection.cc.pillars, "pillar", "pillars"));
  if (selection.gcse) parts.push(plural(selection.gcse.students, "student", "students"));
  parts.push(addOnCount ? plural(addOnCount, "add-on", "add-ons") : "no add-ons");
  return parts.join(" · ");
}

function SummaryCard({ title, rows, total }: { title: string; rows: [string, string][]; total: number }) {
  return (
    <div className="rounded-xl border border-ink/10 bg-white p-5">
      <h3 className="text-[17px] font-medium leading-[1.3] text-ink">{title}</h3>
      <dl className="mt-3 space-y-2 text-[15px] leading-[1.4]">
        {rows.map(([label, value]) => (
          <div key={label} className="flex items-baseline justify-between gap-4">
            <dt className="text-ink/65">{label}</dt>
            <dd className="text-ink">{value}</dd>
          </div>
        ))}
        <div className="flex items-baseline justify-between gap-4 border-t border-ink/10 pt-2">
          <dt className="font-medium text-ink">Indicative price</dt>
          <dd className="font-medium text-ink">{formatMoney(total)} / year</dd>
        </div>
      </dl>
    </div>
  );
}

function StepIndicator({ step }: { step: 1 | 2 }) {
  return (
    // Right padding keeps it clear of the close button.
    <div className="pr-12">
      <p aria-live="polite" className="text-[12px] uppercase leading-[1.5] tracking-[0.15em] text-ink/55">
        Step {step} of 2
      </p>
      <div aria-hidden="true" className="mt-2 grid max-w-[200px] grid-cols-2 gap-1.5">
        <span className="h-1 rounded-full bg-accent" />
        <span className={`h-1 rounded-full transition-colors ${step === 2 ? "bg-accent" : "bg-ink/12"}`} />
      </div>
    </div>
  );
}

export default function QuoteRequestModal({
  open,
  onClose,
  onChangeSelection,
  returnFocusTo,
  selection,
}: {
  open: boolean;
  onClose: () => void;
  // Closes the pop-up and sends focus back to the calculator.
  onChangeSelection: () => void;
  returnFocusTo: () => HTMLElement | null;
  selection: QuoteSelection;
}) {
  const uid = useId();
  const id = (name: string) => `${uid}-${name}`;

  const [step, setStep] = useState<1 | 2>(1);
  const [addOns, setAddOns] = useState<string[]>([]);
  const [values, setValues] = useState<Values>(EMPTY);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "error" | "success">("idle");
  const [submittedName, setSubmittedName] = useState("");
  const honeypotRef = useRef<HTMLInputElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const movedStep = useRef(false);

  const selectedAddOns = quoteAddOns.filter((a) => addOns.includes(a.id));

  useEffect(() => {
    if (open && !isQuoteFormConfigured) {
      console.warn(
        "Quote requests aren't connected: set NEXT_PUBLIC_HUBSPOT_PORTAL_ID and NEXT_PUBLIC_HUBSPOT_QUOTE_FORM_ID."
      );
    }
  }, [open]);

  // Move focus to the new step's heading (or the success heading) after each change.
  useEffect(() => {
    if (movedStep.current || status === "success") headingRef.current?.focus();
  }, [step, status]);

  function goTo(next: 1 | 2) {
    movedStep.current = true;
    setStep(next);
  }

  function toggleAddOn(addOnId: string) {
    setAddOns((prev) => (prev.includes(addOnId) ? prev.filter((x) => x !== addOnId) : [...prev, addOnId]));
  }

  function update(name: keyof Values, value: string) {
    setValues((prev) => ({ ...prev, [name]: value }));
    if (name !== "message" && errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: validate(name, value) }));
    }
  }

  function handleBlur(event: FocusEvent<HTMLInputElement>) {
    // Read the value now: the state update runs after the event has been released.
    const name = event.currentTarget.name as FieldName;
    const error = validate(name, event.currentTarget.value);
    setErrors((prev) => ({ ...prev, [name]: error }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "submitting" || !isQuoteFormConfigured) return;

    const nextErrors: Errors = {};
    for (const name of ORDER) nextErrors[name] = validate(name, values[name]);
    setErrors(nextErrors);
    const firstInvalid = ORDER.find((name) => nextErrors[name]);
    if (firstInvalid) {
      formRef.current?.querySelector<HTMLInputElement>(`[name="${firstInvalid}"]`)?.focus();
      return;
    }

    const firstName = values.firstname.trim();
    // Bots fill the hidden field; pretend it worked and send nothing.
    if (honeypotRef.current?.value) {
      setSubmittedName(firstName);
      setStatus("success");
      return;
    }

    const { cc, gcse } = selection;
    setStatus("submitting");
    try {
      const ok = await submitHubspotForm(HUBSPOT_QUOTE_FORM_ID, {
        [HUBSPOT_FIELDS.firstname]: firstName,
        [HUBSPOT_FIELDS.lastname]: values.lastname.trim(),
        [HUBSPOT_FIELDS.email]: values.email.trim(),
        [HUBSPOT_FIELDS.company]: values.company.trim(),
        [HUBSPOT_FIELDS.jobtitle]: values.jobtitle.trim(),
        [HUBSPOT_FIELDS.message]: values.message.trim(),
        [HUBSPOT_FIELDS.product]: selection.product,
        // Fields that don't apply to the product are left out (empty values aren't sent).
        [HUBSPOT_FIELDS.yearGroups]: cc ? String(cc.yearGroups) : undefined,
        [HUBSPOT_FIELDS.pillars]: cc ? String(cc.pillars) : undefined,
        [HUBSPOT_FIELDS.ccPrice]: cc ? String(cc.total) : undefined,
        [HUBSPOT_FIELDS.students]: gcse ? String(gcse.students) : undefined,
        [HUBSPOT_FIELDS.gcsePrice]: gcse ? String(gcse.total) : undefined,
        [HUBSPOT_FIELDS.addOns]: selectedAddOns.map((a) => a.title).join(";"),
      });
      if (!ok) throw new Error("HubSpot rejected the submission");
      setSubmittedName(firstName);
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  function field(name: FieldName, label: string, options: { type?: string; autoComplete: string; placeholder: string }) {
    const error = errors[name];
    return (
      <div>
        <label htmlFor={id(name)} className="block text-[14px] font-medium text-ink/80">
          {label}
        </label>
        <input
          id={id(name)}
          name={name}
          type={options.type ?? "text"}
          autoComplete={options.autoComplete}
          placeholder={options.placeholder}
          required
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? id(`${name}-error`) : undefined}
          value={values[name]}
          onChange={(e) => update(name, e.target.value)}
          onBlur={handleBlur}
          className={`mt-2 ${INPUT} ${error ? "border-[#B42318]" : "border-ink/15"}`}
        />
        {error && (
          <p id={id(`${name}-error`)} className="mt-1.5 text-[13px] text-[#B42318]">
            {error}
          </p>
        )}
      </div>
    );
  }

  const summaryCards: ReactNode = (
    <div className="space-y-3">
      {selection.cc && (
        <SummaryCard
          title="Critical Curriculum"
          rows={[
            ["Year groups", String(selection.cc.yearGroups)],
            ["Pillars per year group", String(selection.cc.pillars)],
            ["Price per year group", formatMoney(selection.cc.perYearGroup)],
          ]}
          total={selection.cc.total}
        />
      )}
      {selection.gcse && (
        <SummaryCard
          title="International GCSE"
          rows={[
            ["Students", selection.gcse.students.toLocaleString("en-GB")],
            ["Price per student", formatMoney(selection.gcse.fee)],
          ]}
          total={selection.gcse.total}
        />
      )}
    </div>
  );

  const success = status === "success";
  const headingId = id(success ? "success-heading" : `step-${step}-heading`);

  return (
    <ModalShell
      open={open}
      onClose={onClose}
      labelledBy={headingId}
      initialFocus={() => headingRef.current}
      returnFocusTo={returnFocusTo}
      panelClassName="max-w-[640px] bg-paper p-7 md:p-12"
    >
      {success ? (
        <div aria-live="polite">
          <span className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-accent transition-[transform,opacity] duration-300 ease-out starting:scale-50 starting:opacity-0 motion-reduce:transition-none">
            <Check className="h-8 w-8 text-accent" strokeWidth={1.5} aria-hidden="true" />
          </span>
          <h2 id={headingId} ref={headingRef} tabIndex={-1} className={`mt-6 ${HEADING}`}>
            Thanks, {submittedName}.
          </h2>
          <p className="mt-3 text-[16px] leading-[1.6] text-ink/70">
            We&apos;ll put together your tailored quote and be in touch soon.
          </p>

          <div className="mt-6 rounded-xl border border-ink/10 bg-white p-5 text-[15px] leading-[1.5]">
            <p className="text-[12px] uppercase tracking-[0.15em] text-ink/55">Your request</p>
            <ul className="mt-3 list-none space-y-1.5 p-0">
              {selection.cc && (
                <li className="flex justify-between gap-4">
                  <span className="text-ink/70">Critical Curriculum</span>
                  <span className="font-medium text-ink">{formatMoney(selection.cc.total)} / year</span>
                </li>
              )}
              {selection.gcse && (
                <li className="flex justify-between gap-4">
                  <span className="text-ink/70">International GCSE</span>
                  <span className="font-medium text-ink">{formatMoney(selection.gcse.total)} / year</span>
                </li>
              )}
            </ul>
            <p className="mt-3 border-t border-ink/10 pt-3 text-ink/70">
              {selectedAddOns.length ? `Add-ons: ${selectedAddOns.map((a) => a.title).join(", ")}` : "No add-ons"}
            </p>
          </div>

          <Button onClick={onClose} className="mt-8">
            Close
          </Button>
        </div>
      ) : (
        <>
          <StepIndicator step={step} />

          {step === 1 ? (
            <div className="mt-6">
              <h2 id={headingId} ref={headingRef} tabIndex={-1} className={HEADING}>
                Your selection
              </h2>
              <p className="mt-2 text-[15px] leading-[1.6] text-ink/65">
                Here&apos;s what you&apos;ve chosen. Add any extras, then we&apos;ll put together a tailored quote.
              </p>

              <div className="mt-6">{summaryCards}</div>
              <button type="button" onClick={onChangeSelection} className={`mt-3 ${TEXT_LINK}`}>
                Change selection
              </button>

              <fieldset className="mt-8" aria-describedby={id("addons-help")}>
                <legend className="text-[17px] font-medium leading-[1.3] text-ink">Optional add-ons</legend>
                <p id={id("addons-help")} className="mt-1 text-[14px] leading-[1.5] text-ink/60">
                  Tick any extras you&apos;d like included. We&apos;ll add pricing for these to your quote.
                </p>
                <div className="mt-4 flex flex-col gap-2">
                  {quoteAddOns.map((addOn) => {
                    const checked = addOns.includes(addOn.id);
                    return (
                      <label
                        key={addOn.id}
                        className="flex cursor-pointer items-start gap-3 rounded-[10px] border border-ink/10 bg-white px-4 py-3.5 transition-colors hover:border-ink/25 has-[:checked]:border-accent has-[:checked]:bg-accent/[0.06] has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-accent has-[:focus-visible]:ring-offset-2 has-[:focus-visible]:ring-offset-paper motion-reduce:transition-none"
                      >
                        <input
                          type="checkbox"
                          name="addOns"
                          value={addOn.id}
                          checked={checked}
                          onChange={() => toggleAddOn(addOn.id)}
                          aria-describedby={id(`${addOn.id}-desc`)}
                          className="sr-only"
                        />
                        <span
                          aria-hidden="true"
                          className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-[5px] border transition-colors motion-reduce:transition-none ${
                            checked ? "border-accent bg-accent" : "border-ink/30 bg-white"
                          }`}
                        >
                          {checked && <Check className="h-3.5 w-3.5 text-ink" strokeWidth={2.5} />}
                        </span>
                        <span>
                          <span className="block text-[15px] font-medium leading-[1.35] text-ink">{addOn.title}</span>
                          <span id={id(`${addOn.id}-desc`)} className="mt-0.5 block text-[13px] leading-[1.5] text-ink/65">
                            {addOn.description}
                          </span>
                        </span>
                      </label>
                    );
                  })}
                </div>
              </fieldset>

              <Button type="button" size="form" arrow onClick={() => goTo(2)} className="mt-8">
                Next
              </Button>
            </div>
          ) : (
            <div className="mt-6">
              <button type="button" onClick={() => goTo(1)} className={`inline-flex items-center gap-1.5 ${TEXT_LINK}`}>
                <ArrowLeft className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
                Back
              </button>
              <h2 id={headingId} ref={headingRef} tabIndex={-1} className={`mt-4 ${HEADING}`}>
                Your details
              </h2>
              <p className="mt-2 text-[17px] text-ink/60">It should only take a minute.</p>

              {/* 16px between rows, 12px between columns; two-column rows stack below 640px. */}
              <form ref={formRef} noValidate onSubmit={handleSubmit} className="mt-8 flex flex-col gap-4">
                <div className="grid grid-cols-1 gap-x-3 gap-y-4 sm:grid-cols-2">
                  {field("firstname", "First name", { autoComplete: "given-name", placeholder: "First name" })}
                  {field("lastname", "Last name", { autoComplete: "family-name", placeholder: "Last name" })}
                </div>
                {field("email", "Work email", { type: "email", autoComplete: "email", placeholder: "name@school.com" })}
                <div className="grid grid-cols-1 gap-x-3 gap-y-4 sm:grid-cols-2">
                  {field("company", "School / organisation", { autoComplete: "organization", placeholder: "School name" })}
                  {field("jobtitle", "Job title", { autoComplete: "organization-title", placeholder: "Your role" })}
                </div>
                <div>
                  <label htmlFor={id("message")} className="block text-[14px] font-medium text-ink/80">
                    Anything else we should know? (optional)
                  </label>
                  <textarea
                    id={id("message")}
                    name="message"
                    rows={3}
                    value={values.message}
                    onChange={(e) => update("message", e.target.value)}
                    className={`mt-2 resize-y rounded-2xl border-ink/15 py-3 leading-[1.5] ${INPUT_BASE}`}
                  />
                </div>

                {/* Honeypot: hidden from people and assistive tech; bots tend to fill it. */}
                <div aria-hidden="true" className="absolute -left-[10000px] top-auto h-px w-px overflow-hidden">
                  <label htmlFor={id("website")}>Website</label>
                  <input ref={honeypotRef} id={id("website")} name="website" type="text" tabIndex={-1} autoComplete="off" defaultValue="" />
                </div>

                {status === "error" && (
                  <p role="alert" className="rounded-lg bg-[#B42318]/[0.08] px-4 py-3 text-[14px] text-[#B42318]">
                    Something went wrong sending your details. Please try again.
                  </p>
                )}

                <div className="mt-1">
                  <p className="mb-3 text-[13px] leading-[1.5] text-ink/60">{recapLine(selection, selectedAddOns.length)}</p>
                  <Button
                    type="submit"
                    size="form"
                    arrow
                    loading={status === "submitting"}
                    disabled={status === "submitting" || !isQuoteFormConfigured}
                    aria-describedby={!isQuoteFormConfigured ? id("not-connected") : undefined}
                  >
                    {status === "submitting" ? "Sending…" : "Request my quote"}
                  </Button>
                  {!isQuoteFormConfigured && (
                    <p id={id("not-connected")} className="mt-2 text-center text-[13px] text-ink/55">
                      Quote requests aren&apos;t connected yet (review version).
                    </p>
                  )}
                </div>

                <p className="text-center text-[14px] leading-[1.5] text-ink/65">
                  By submitting, you agree to our{" "}
                  <a href={PRIVACY_POLICY_URL} target="_blank" rel="noopener noreferrer" className="text-ink underline underline-offset-2">
                    Privacy Policy
                  </a>
                  .
                </p>
              </form>
            </div>
          )}
        </>
      )}
    </ModalShell>
  );
}
