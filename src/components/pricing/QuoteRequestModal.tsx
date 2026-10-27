"use client";

import { useEffect, useId, useRef, useState, type FocusEvent, type FormEvent, type ReactNode } from "react";
import { ArrowLeft, Check, Minus, Plus } from "lucide-react";
import ModalShell from "@/components/layout/ModalShell";
import Button from "@/components/ui/Button";
import { HUBSPOT_QUOTE_FORM_ID, isQuoteFormConfigured, submitHubspotForm } from "@/lib/hubspot";
import {
  ADD_ON_QUANTITY_MAX,
  ADD_ON_QUANTITY_MIN,
  LIVE_EXPERIENCE_GROUPS,
  QUOTE_ADD_ONS,
  addOnCost,
  addOnLineLabel,
  addOnSummary,
  addOnsTotal,
  formatMoney,
  getAddOn,
  getLiveGroup,
  quoteTotal,
  type AddOnId,
  type AddOnOptions,
  type LiveGroupId,
  type QuoteAddOn,
  type SelectedAddOn,
} from "@/lib/pricing";
import { markFormSubmitted } from "@/lib/newsletter-popup";
import { trackEvent } from "@/lib/analytics";

// Quote requests are submitted to the HubSpot Contact form (see HUBSPOT_QUOTE_FORM_ID).
// All fields are contact properties ("0-1/…"). Prices, totals and counts are sent as plain
// numbers (e.g. "720"); quote_addons is the ticked add-on titles separated by semicolons
// (HubSpot's multi-checkbox format), so its option values must match the titles exactly.
const HUBSPOT_FIELDS = {
  firstname: "0-1/firstname",
  lastname: "0-1/lastname",
  email: "0-1/email",
  company: "0-1/company",
  jobtitle: "0-1/jobtitle",
  // Both required on the Contact form.
  helpTopic: "0-1/what_can_we_help_with",
  message: "0-1/message",
  product: "0-1/quote_product",
  yearGroups: "0-1/quote_year_groups",
  pillars: "0-1/quote_pillars",
  students: "0-1/quote_students",
  ccPrice: "0-1/quote_critical_curriculum_price",
  gcsePrice: "0-1/quote_international_gcse_price",
  addOns: "0-1/quote_addons",
  addOnsPrice: "0-1/quote_addon_price",
  total: "0-1/quote_total",
} as const;

// Fill in when the HubSpot admin creates these (e.g. "0-1/quote_cpd_quantity"). Each is sent
// only once it has a name; until then the message summary covers this information.
const PENDING_HUBSPOT_FIELDS: Record<
  | "cpdQuantity"
  | "onlineExperienceQuantity"
  | "liveExperienceGroupSize"
  | "liveExperienceDays"
  | "assemblyQuantity"
  | "cpdPrice"
  | "onlineExperiencePrice"
  | "liveExperiencePrice"
  | "assemblyPrice"
  | "discountCode",
  string | null
> = {
  cpdQuantity: null,
  onlineExperienceQuantity: null,
  liveExperienceGroupSize: null,
  liveExperienceDays: null,
  assemblyQuantity: null,
  cpdPrice: null,
  onlineExperiencePrice: null,
  liveExperiencePrice: null,
  assemblyPrice: null,
  discountCode: null,
};

// The Contact form's internal values for "What can we help with?".
const HELP_TOPIC_VALUES: Record<QuoteSelection["product"], string> = {
  "Critical Curriculum": "Critical curriculum",
  "International GCSE": "International GCSE",
  Both: "Both",
};

const PRIVACY_POLICY_URL = "https://8billionideas.notion.site/Privacy-Policy-0d819775ea1d4a0a8bdf36d8bdaedd05";

// A snapshot of the calculator when "Request a tailored quote" was clicked. Only the parts
// for the chosen product are set.
export interface QuoteSelection {
  product: "Critical Curriculum" | "International GCSE" | "Both";
  cc?: { yearGroups: number; pillars: number; perYearGroup: number; total: number };
  gcse?: { students: number; fee: number; total: number };
}

type FieldName = "firstname" | "lastname" | "company" | "jobtitle" | "email";
type Values = Record<FieldName, string> & { message: string; discountCode: string };
type Errors = Partial<Record<FieldName, string>>;

const EMPTY: Values = { firstname: "", lastname: "", company: "", jobtitle: "", email: "", message: "", discountCode: "" };
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

// "Critical Curriculum · 3 year groups · 6 pillars · 2 add-ons · Estimated total £3,595"
// (plus "· Discount code: WELCOME10" when one is entered).
function recapLine(selection: QuoteSelection, addOnCount: number, total: number, discountCode: string) {
  const parts = [productLabel(selection)];
  if (selection.cc) parts.push(plural(selection.cc.yearGroups, "year group", "year groups"), plural(selection.cc.pillars, "pillar", "pillars"));
  if (selection.gcse) parts.push(plural(selection.gcse.students, "student", "students"));
  parts.push(addOnCount ? plural(addOnCount, "add-on", "add-ons") : "no add-ons");
  parts.push(`Estimated total ${formatMoney(total)}`);
  if (discountCode) parts.push(`Discount code: ${discountCode}`);
  return parts.join(" · ");
}

// The Contact form's (required) message: the visitor's notes, a blank line, then a summary of
// the quote. Only the lines that apply are included.
function quoteMessage(
  selection: QuoteSelection,
  addOns: SelectedAddOn[],
  total: number,
  notes: string,
  discountCode: string
) {
  const lines = ["Quote request via website", `Product: ${productLabel(selection)}`];
  if (selection.cc) {
    lines.push(
      `Year groups: ${selection.cc.yearGroups} · Pillars: ${selection.cc.pillars} · Critical Curriculum price: ${formatMoney(selection.cc.total)}`
    );
  }
  if (selection.gcse) {
    lines.push(`Students: ${selection.gcse.students} · International GCSE price: ${formatMoney(selection.gcse.total)}`);
  }
  if (addOns.length) {
    lines.push(`Add-ons: ${addOnSummary(addOns)}`, `Add-ons total: ${formatMoney(addOnsTotal(addOns))}`);
  }
  lines.push(`Estimated total: ${formatMoney(total)}`);
  if (discountCode) lines.push(`Discount code: ${discountCode}`);
  const summary = lines.join("\n");
  return notes ? `${notes}\n\n${summary}` : summary;
}

// Values for the not-yet-created HubSpot properties, keyed by their (future) field names.
function pendingFieldValues(addOns: SelectedAddOn[], discountCode: string): Record<string, string | undefined> {
  const values: Record<string, string | undefined> = {};
  const set = (key: keyof typeof PENDING_HUBSPOT_FIELDS, value: string | undefined) => {
    const name = PENDING_HUBSPOT_FIELDS[key];
    if (name && value) values[name] = value;
  };
  for (const { id, options = {} } of addOns) {
    const cost = String(addOnCost(id, options));
    const quantity = String(options.quantity ?? 1);
    if (id === "cpd") {
      set("cpdQuantity", quantity);
      set("cpdPrice", cost);
    }
    if (id === "online-experience") {
      set("onlineExperienceQuantity", quantity);
      set("onlineExperiencePrice", cost);
    }
    if (id === "assembly") {
      set("assemblyQuantity", quantity);
      set("assemblyPrice", cost);
    }
    if (id === "live-experience") {
      set("liveExperienceGroupSize", getLiveGroup(options.groupId).label);
      set("liveExperienceDays", String(options.days ?? 1));
      set("liveExperiencePrice", cost);
    }
  }
  set("discountCode", discountCode);
  return values;
}

// Add-ons priced per item, with their stepper labels.
type QuantityAddOnId = "cpd" | "online-experience" | "assembly";
const QUANTITY_LABELS: Record<QuantityAddOnId, string> = {
  cpd: "Number of CPD sessions",
  "online-experience": "Number of online experiences",
  assembly: "Number of assemblies",
};

// "Number of CPD sessions" → "number of CPD sessions" (keeps acronyms intact in button labels).
const lowerFirst = (text: string) => text.charAt(0).toLowerCase() + text.slice(1);

// − [n] + stepper for add-on quantities (days, sessions, experiences, assemblies), 1–10.
function Stepper({ label, value, onChange }: { label: string; value: number; onChange: (next: number) => void }) {
  const labelId = useId();
  const button =
    "flex h-9 w-9 cursor-pointer items-center justify-center rounded-full text-ink transition-colors hover:bg-ink/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent aria-disabled:cursor-not-allowed aria-disabled:opacity-35 aria-disabled:hover:bg-transparent motion-reduce:transition-none";
  const atMin = value <= ADD_ON_QUANTITY_MIN;
  const atMax = value >= ADD_ON_QUANTITY_MAX;
  return (
    <div>
      <p id={labelId} className="text-[13px] font-medium leading-[1.4] text-ink">
        {label}
      </p>
      {/* aria-disabled (not disabled) at the limits, so focus stays on the button. */}
      <div role="group" aria-labelledby={labelId} className="mt-2 inline-flex items-center rounded-full border border-ink/15 bg-white p-0.5">
        <button
          type="button"
          aria-label={`Decrease ${lowerFirst(label)}`}
          aria-disabled={atMin || undefined}
          onClick={() => !atMin && onChange(value - 1)}
          className={button}
        >
          <Minus className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
        </button>
        <output aria-live="polite" className="w-10 text-center text-[15px] font-medium tabular-nums text-ink">
          {value}
        </output>
        <button
          type="button"
          aria-label={`Increase ${lowerFirst(label)}`}
          aria-disabled={atMax || undefined}
          onClick={() => !atMax && onChange(value + 1)}
          className={button}
        >
          <Plus className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}

// A selectable add-on: the header row (checkbox, title, description, price) toggles it; when
// ticked, any options (children) slide open below. Options are kept if it's unticked.
function AddOnCard({
  addOn,
  checked,
  onToggle,
  descId,
  children,
}: {
  addOn: QuoteAddOn;
  checked: boolean;
  onToggle: () => void;
  descId: string;
  children?: ReactNode;
}) {
  const price = addOn.pricing === "group-days" ? `from ${formatMoney(addOn.price)}` : formatMoney(addOn.price);
  return (
    <div
      className={`rounded-[10px] border transition-colors motion-reduce:transition-none ${
        checked ? "border-accent bg-accent/[0.06]" : "border-ink/10 bg-white hover:border-ink/25"
      }`}
    >
      <label className="flex cursor-pointer items-start gap-3 px-4 py-3.5">
        <input
          type="checkbox"
          name="addOns"
          value={addOn.id}
          checked={checked}
          onChange={onToggle}
          aria-describedby={descId}
          className="peer sr-only"
        />
        <span
          aria-hidden="true"
          className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-[5px] border transition-colors peer-focus-visible:ring-2 peer-focus-visible:ring-accent peer-focus-visible:ring-offset-2 motion-reduce:transition-none ${
            checked ? "border-accent bg-accent" : "border-ink/30 bg-white"
          }`}
        >
          {checked && <Check className="h-3.5 w-3.5 text-ink" strokeWidth={2.5} />}
        </span>
        <span className="min-w-0 flex-1">
          <span className="block text-[15px] font-medium leading-[1.35] text-ink">{addOn.title}</span>
          <span id={descId} className="mt-0.5 block text-[13px] leading-[1.5] text-ink/65">
            {addOn.description}
          </span>
          {/* Below 640px the price sits under the description, leaving the text room to breathe. */}
          <span className="mt-1.5 block sm:hidden">
            <span className="text-[15px] font-medium text-ink">{price}</span>{" "}
            <span className="text-[12px] text-ink/60">{addOn.unit}</span>
          </span>
        </span>
        <span className="hidden shrink-0 text-right sm:block">
          <span className="block whitespace-nowrap text-[15px] font-medium leading-[1.35] text-ink">{price}</span>
          <span className="block whitespace-nowrap text-[12px] leading-[1.5] text-ink/60">{addOn.unit}</span>
        </span>
      </label>
      {children && (
        <div
          className={`grid transition-[grid-template-rows] duration-200 ease-out motion-reduce:transition-none ${
            checked ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
          }`}
        >
          {/* Collapsed options are inert, so they can't be tabbed to. */}
          <div className="overflow-hidden" inert={!checked}>
            <div className="mx-4 flex flex-col gap-4 border-t border-accent/25 pt-4 pb-4">{children}</div>
          </div>
        </div>
      )}
    </div>
  );
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
  const [ticked, setTicked] = useState<AddOnId[]>([]);
  const [liveGroup, setLiveGroup] = useState<LiveGroupId>("50");
  const [liveDays, setLiveDays] = useState(1);
  // Quantity for each "quantity" add-on (kept if the add-on is unticked and ticked again).
  const [quantities, setQuantities] = useState<Record<QuantityAddOnId, number>>({
    cpd: 1,
    "online-experience": 1,
    assembly: 1,
  });
  const [values, setValues] = useState<Values>(EMPTY);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "error" | "success">("idle");
  const [submittedName, setSubmittedName] = useState("");
  const honeypotRef = useRef<HTMLInputElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const movedStep = useRef(false);

  const optionsFor = (addOnId: AddOnId): AddOnOptions =>
    addOnId === "live-experience"
      ? { groupId: liveGroup, days: liveDays }
      : addOnId in quantities
        ? { quantity: quantities[addOnId as QuantityAddOnId] }
        : {};
  // Ticked add-ons with their current options, in list order.
  const selectedAddOns: SelectedAddOn[] = QUOTE_ADD_ONS.filter((a) => ticked.includes(a.id)).map((a) => ({
    id: a.id,
    options: optionsFor(a.id),
  }));
  const total = quoteTotal(selection, selectedAddOns);

  useEffect(() => {
    if (open && !isQuoteFormConfigured) {
      console.warn(
        "Quote requests aren't connected: set NEXT_PUBLIC_HUBSPOT_PORTAL_ID and NEXT_PUBLIC_HUBSPOT_CONTACT_FORM_ID."
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

  function toggleAddOn(addOnId: AddOnId) {
    setTicked((prev) => (prev.includes(addOnId) ? prev.filter((x) => x !== addOnId) : [...prev, addOnId]));
  }

  function update(name: keyof Values, value: string) {
    setValues((prev) => ({ ...prev, [name]: value }));
    if (name !== "message" && name !== "discountCode" && errors[name]) {
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
      // Optional, not validated, and it doesn't change any prices.
      const discountCode = values.discountCode.trim();
      const hasAddOns = selectedAddOns.length > 0;
      const ok = await submitHubspotForm(HUBSPOT_QUOTE_FORM_ID, {
        [HUBSPOT_FIELDS.firstname]: firstName,
        [HUBSPOT_FIELDS.lastname]: values.lastname.trim(),
        [HUBSPOT_FIELDS.email]: values.email.trim(),
        [HUBSPOT_FIELDS.company]: values.company.trim(),
        [HUBSPOT_FIELDS.jobtitle]: values.jobtitle.trim(),
        [HUBSPOT_FIELDS.helpTopic]: HELP_TOPIC_VALUES[selection.product],
        [HUBSPOT_FIELDS.message]: quoteMessage(selection, selectedAddOns, total, values.message.trim(), discountCode),
        [HUBSPOT_FIELDS.product]: selection.product,
        // Fields that don't apply to the selection are left out (empty values aren't sent).
        [HUBSPOT_FIELDS.yearGroups]: cc ? String(cc.yearGroups) : undefined,
        [HUBSPOT_FIELDS.pillars]: cc ? String(cc.pillars) : undefined,
        [HUBSPOT_FIELDS.ccPrice]: cc ? String(cc.total) : undefined,
        [HUBSPOT_FIELDS.students]: gcse ? String(gcse.students) : undefined,
        [HUBSPOT_FIELDS.gcsePrice]: gcse ? String(gcse.total) : undefined,
        [HUBSPOT_FIELDS.addOns]: hasAddOns ? selectedAddOns.map((a) => getAddOn(a.id).title).join(";") : undefined,
        [HUBSPOT_FIELDS.addOnsPrice]: hasAddOns ? String(addOnsTotal(selectedAddOns)) : undefined,
        [HUBSPOT_FIELDS.total]: String(total),
        ...pendingFieldValues(selectedAddOns, discountCode),
      });
      if (!ok) throw new Error("HubSpot rejected the submission");
      markFormSubmitted();
      trackEvent("generate_lead", { form_name: "quote_request", value: total, currency: "GBP", product: selection.product });
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

  // Rows for the estimated total (step 1) and the success recap.
  const totalRows: [string, string][] = [
    ...(selection.cc ? [["Critical Curriculum", `${formatMoney(selection.cc.total)} / year`] as [string, string]] : []),
    ...(selection.gcse ? [["International GCSE", `${formatMoney(selection.gcse.total)} / year`] as [string, string]] : []),
    ...selectedAddOns.map((a): [string, string] => [addOnLineLabel(a.id, a.options), formatMoney(addOnCost(a.id, a.options))]),
  ];

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
            <dl className="mt-3 space-y-1.5">
              {totalRows.map(([label, value]) => (
                <div key={label} className="flex justify-between gap-4">
                  <dt className="text-ink/70">{label}</dt>
                  <dd className="shrink-0 font-medium text-ink">{value}</dd>
                </div>
              ))}
            </dl>
            {!selectedAddOns.length && <p className="mt-1.5 text-ink/70">No add-ons</p>}
            {values.discountCode.trim() && (
              <p className="mt-1.5 text-ink/70">Discount code: {values.discountCode.trim()}</p>
            )}
            <div className="mt-3 flex items-baseline justify-between gap-4 border-t border-ink/10 pt-3">
              <span className="font-medium text-ink">Estimated total</span>
              <span className="text-[18px] font-medium text-ink">{formatMoney(total)}</span>
            </div>
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
                  Tick any extras you&apos;d like included. Prices are shown below and added to your estimated total.
                </p>
                <div className="mt-4 flex flex-col gap-2">
                  {QUOTE_ADD_ONS.map((addOn) => {
                    const checked = ticked.includes(addOn.id);
                    const card = (children?: ReactNode) => (
                      <AddOnCard
                        key={addOn.id}
                        addOn={addOn}
                        checked={checked}
                        onToggle={() => toggleAddOn(addOn.id)}
                        descId={id(`${addOn.id}-desc`)}
                      >
                        {children}
                      </AddOnCard>
                    );
                    if (addOn.id === "live-experience") {
                      const group = getLiveGroup(liveGroup);
                      return card(
                        <>
                          <fieldset>
                            <legend className="text-[13px] font-medium leading-[1.4] text-ink">Group size</legend>
                            <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-4">
                              {LIVE_EXPERIENCE_GROUPS.map((g) => (
                                <label
                                  key={g.id}
                                  className="flex cursor-pointer flex-col items-center rounded-full border border-ink/15 bg-white px-3 py-2 text-center text-ink transition-colors hover:border-ink/35 has-[:checked]:border-ink has-[:checked]:bg-ink has-[:checked]:text-white has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-accent has-[:focus-visible]:ring-offset-2 motion-reduce:transition-none"
                                >
                                  <input
                                    type="radio"
                                    name={id("live-group")}
                                    value={g.id}
                                    checked={liveGroup === g.id}
                                    onChange={() => setLiveGroup(g.id)}
                                    className="sr-only"
                                  />
                                  <span className="text-[14px] font-medium leading-[1.3]">{g.shortLabel}</span>
                                  <span className="text-[12px] leading-[1.4] opacity-75">{formatMoney(g.pricePerDay)} / day</span>
                                </label>
                              ))}
                            </div>
                          </fieldset>
                          <Stepper label="Number of days" value={liveDays} onChange={setLiveDays} />
                          <p className="text-[13px] leading-[1.5] text-ink/60">
                            Need more than 200 students? We&apos;ll include larger groups in your quote.
                          </p>
                          <p className="text-right text-[14px] font-medium text-ink">
                            {plural(liveDays, "day", "days")} × {formatMoney(group.pricePerDay)} ={" "}
                            {formatMoney(addOnCost("live-experience", { groupId: liveGroup, days: liveDays }))}
                          </p>
                        </>
                      );
                    }
                    if (addOn.pricing === "quantity" && addOn.id in QUANTITY_LABELS) {
                      const qid = addOn.id as QuantityAddOnId;
                      const quantity = quantities[qid];
                      return card(
                        <>
                          <Stepper
                            label={QUANTITY_LABELS[qid]}
                            value={quantity}
                            onChange={(next) => setQuantities((q) => ({ ...q, [qid]: next }))}
                          />
                          <p className="text-right text-[14px] font-medium text-ink">
                            {quantity} × {formatMoney(addOn.price)} = {formatMoney(addOnCost(qid, { quantity }))}
                          </p>
                        </>
                      );
                    }
                    return card();
                  })}
                </div>
              </fieldset>

              {/* Estimated total: the subscriptions plus each ticked add-on, updating live. */}
              <div className="mt-8 rounded-xl border border-ink/10 bg-white p-5">
                <dl className="space-y-2 text-[15px] leading-[1.4]">
                  {totalRows.map(([label, value]) => (
                    <div key={label} className="flex items-baseline justify-between gap-4">
                      <dt className="text-ink/70">{label}</dt>
                      <dd className="shrink-0 text-ink">{value}</dd>
                    </div>
                  ))}
                </dl>
                <div className="mt-3 flex items-baseline justify-between gap-4 border-t border-ink/10 pt-3">
                  <span className="text-[17px] font-medium text-ink">Estimated total</span>
                  <span aria-live="polite" aria-atomic="true" className="text-[22px] font-medium leading-[1.2] text-ink">
                    {formatMoney(total)}
                  </span>
                </div>
                <p className="mt-2 text-[12px] leading-[1.5] text-ink/55">Your final quote will confirm any VAT or travel costs.</p>
              </div>

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
                <div>
                  <label htmlFor={id("discountCode")} className="block text-[14px] font-medium text-ink/80">
                    Discount code (optional)
                  </label>
                  <input
                    id={id("discountCode")}
                    name="discountCode"
                    type="text"
                    autoComplete="off"
                    autoCapitalize="characters"
                    spellCheck={false}
                    maxLength={30}
                    placeholder="e.g. WELCOME10"
                    value={values.discountCode}
                    onChange={(e) => update("discountCode", e.target.value.toUpperCase())}
                    className={`mt-2 border-ink/15 ${INPUT}`}
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
                  <p className="mb-3 text-[13px] leading-[1.5] text-ink/60">{recapLine(selection, selectedAddOns.length, total, values.discountCode.trim())}</p>
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
