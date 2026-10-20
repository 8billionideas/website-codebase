"use client";

import { useEffect, useId, useRef, useState, type FocusEvent, type FormEvent } from "react";
import { Check, ChevronDown } from "lucide-react";
import ModalShell from "@/components/layout/ModalShell";
import { isHubspotConfigured, submitDemoRequest } from "@/lib/hubspot";
import Button from "@/components/ui/Button";
import { markFormSubmitted } from "@/lib/newsletter-popup";

const PRIVACY_POLICY_URL = "https://8billionideas.notion.site/Privacy-Policy-0d819775ea1d4a0a8bdf36d8bdaedd05";

type FieldName = "firstname" | "lastname" | "company" | "jobtitle" | "email" | "what_can_we_help_with";
type Values = Record<FieldName, string>;
type Errors = Partial<Record<FieldName, string>>;

const EMPTY: Values = { firstname: "", lastname: "", company: "", jobtitle: "", email: "", what_can_we_help_with: "" };
// Display order, also used to focus the first invalid field on submit.
const ORDER: FieldName[] = ["firstname", "lastname", "email", "company", "jobtitle", "what_can_we_help_with"];

// "What can we help with?" (required in the HubSpot form). Each value is the option's exact
// internal value in the HubSpot form definition; the label is what's shown here.
const HELP_OPTIONS = [
  { label: "Critical Curriculum", value: "Critical curriculum" },
  { label: "International GCSE", value: "International GCSE" },
  { label: "Both", value: "Both" },
  { label: "Partnership enquiry", value: "Partnership enquiry" },
  { label: "Something else", value: "Something else" },
];
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

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
    case "what_can_we_help_with":
      return v ? undefined : "Please choose what we can help with";
  }
}

const STEPS = [
  {
    title: "We'll get in touch",
    text: "A member of our team will contact you to arrange a time that works.",
  },
  {
    title: "We'll tailor the demo",
    text: "We'll focus the conversation around your school and what you're looking to achieve.",
  },
  {
    title: "You'll see 8billionideas in action",
    text: "We'll walk you through the most relevant parts of the curriculum, qualification and platform.",
  },
];

// Pill-shaped inputs, 44px tall.
const INPUT =
  "h-11 w-full rounded-full border bg-white px-4 text-[15px] text-ink outline-none transition-[border-color,box-shadow] placeholder:text-ink/45 focus:border-accent focus:ring-[3px] focus:ring-accent/20";

export default function DemoRequestModal({
  open,
  onClose,
  returnFocusTo,
}: {
  open: boolean;
  onClose: () => void;
  returnFocusTo: () => HTMLElement | null;
}) {
  const uid = useId();
  const id = (name: string) => `${uid}-${name}`;
  const headingId = id("heading");
  const successHeadingId = id("success-heading");

  const [values, setValues] = useState<Values>(EMPTY);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "error" | "success">("idle");
  const [submittedName, setSubmittedName] = useState("");
  const honeypotRef = useRef<HTMLInputElement>(null);
  const firstFieldRef = useRef<HTMLInputElement>(null);
  const successHeadingRef = useRef<HTMLHeadingElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (open && !isHubspotConfigured) {
      console.warn(
        "Demo requests aren't connected: set NEXT_PUBLIC_HUBSPOT_PORTAL_ID and NEXT_PUBLIC_HUBSPOT_DEMO_FORM_ID."
      );
    }
  }, [open]);

  useEffect(() => {
    if (status === "success") successHeadingRef.current?.focus();
  }, [status]);

  function update(name: FieldName, value: string) {
    setValues((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: validate(name, value) }));
    }
  }

  function handleBlur(event: FocusEvent<HTMLInputElement | HTMLSelectElement>) {
    const name = event.currentTarget.name as FieldName;
    const error = validate(name, event.currentTarget.value);
    setErrors((prev) => ({ ...prev, [name]: error }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "submitting" || !isHubspotConfigured) return;

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

    setStatus("submitting");
    try {
      const ok = await submitDemoRequest({
        firstname: firstName,
        lastname: values.lastname.trim(),
        company: values.company.trim(),
        jobtitle: values.jobtitle.trim(),
        email: values.email.trim(),
        what_can_we_help_with: values.what_can_we_help_with,
      });
      if (!ok) throw new Error("HubSpot rejected the submission");
      markFormSubmitted();
      setSubmittedName(firstName);
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  function field(name: FieldName, label: string, options: { type?: string; autoComplete: string; placeholder?: string }) {
    const error = errors[name];
    return (
      <div>
        <label htmlFor={id(name)} className="block text-[14px] font-medium text-ink/80">
          {label}
        </label>
        <input
          ref={name === "firstname" ? firstFieldRef : undefined}
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

  const success = status === "success";

  return (
    <ModalShell
      open={open}
      onClose={onClose}
      labelledBy={success ? successHeadingId : headingId}
      initialFocus={() => firstFieldRef.current}
      returnFocusTo={returnFocusTo}
      closeTone={success ? "white" : "ink"}
      panelClassName={`max-w-[640px] p-7 md:p-12 ${success ? "bg-ink text-white" : "bg-paper"}`}
    >
      {success ? (
        <div aria-live="polite">
          <span className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-accent transition-[transform,opacity] duration-300 ease-out starting:scale-50 starting:opacity-0 motion-reduce:transition-none">
            <Check className="h-8 w-8 text-accent" strokeWidth={1.5} aria-hidden="true" />
          </span>
          <p className="mt-6 text-[12px] uppercase tracking-[0.25em] text-accent">What happens next</p>
          <h2
            id={successHeadingId}
            ref={successHeadingRef}
            tabIndex={-1}
            className="mt-3 text-[28px] font-light leading-[1.2] text-white outline-none md:text-[32px]"
          >
            Thanks, {submittedName}.
            <br />
            What happens next?
          </h2>
          <p className="mt-4 text-[16px] leading-[1.6] text-white/75">
            Once you&apos;ve sent your details, we&apos;ll take it from there and keep the process simple.
          </p>
          <ol className="mt-8 list-none divide-y divide-white/12 p-0">
            {STEPS.map((step, i) => (
              <li key={step.title} className="flex gap-4 py-5 first:pt-0 last:pb-0">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-accent text-[14px] text-accent">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="text-[18px] font-normal text-white">{step.title}</h3>
                  <p className="mt-1 text-[15px] leading-[1.6] text-white/70">{step.text}</p>
                </div>
              </li>
            ))}
          </ol>
          <Button onClick={onClose} className="mt-10">
            Close
          </Button>
        </div>
      ) : (
        <>
          {/* Top padding on mobile keeps the heading clear of the close button. */}
          <div className="pt-8 text-center md:pt-0">
            <h2 id={headingId} className="text-[28px] font-light leading-[1.15] text-ink md:text-[36px]">
              Tell us a little about you
            </h2>
            <p className="mt-2 text-[17px] text-ink/60">It should only take a minute.</p>
          </div>

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
              <label htmlFor={id("what_can_we_help_with")} className="block text-[14px] font-medium text-ink/80">
                What can we help with?
              </label>
              <div className="relative mt-2">
                <select
                  id={id("what_can_we_help_with")}
                  name="what_can_we_help_with"
                  required
                  aria-invalid={errors.what_can_we_help_with ? true : undefined}
                  aria-describedby={errors.what_can_we_help_with ? id("what_can_we_help_with-error") : undefined}
                  value={values.what_can_we_help_with}
                  onChange={(e) => update("what_can_we_help_with", e.target.value)}
                  onBlur={handleBlur}
                  className={`${INPUT} cursor-pointer appearance-none pr-11 ${
                    values.what_can_we_help_with ? "" : "text-ink/45"
                  } ${errors.what_can_we_help_with ? "border-[#B42318]" : "border-ink/15"}`}
                >
                  <option value="" disabled>
                    Please select
                  </option>
                  {HELP_OPTIONS.map((option) => (
                    <option key={option.value} value={option.value} className="text-ink">
                      {option.label}
                    </option>
                  ))}
                </select>
                <ChevronDown
                  className="pointer-events-none absolute top-1/2 right-4 h-4 w-4 -translate-y-1/2 text-ink/60"
                  strokeWidth={1.5}
                  aria-hidden="true"
                />
              </div>
              {errors.what_can_we_help_with && (
                <p id={id("what_can_we_help_with-error")} className="mt-1.5 text-[13px] text-[#B42318]">
                  {errors.what_can_we_help_with}
                </p>
              )}
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

            {/* 20px below the last row (16px gap + 4px). */}
            <div className="mt-1">
              <Button
                type="submit"
                size="form"
                arrow
                loading={status === "submitting"}
                disabled={status === "submitting" || !isHubspotConfigured}
                aria-describedby={!isHubspotConfigured ? id("not-connected") : undefined}
              >
                {status === "submitting" ? "Sending…" : "Request a demo"}
              </Button>
              {!isHubspotConfigured && (
                <p id={id("not-connected")} className="mt-2 text-center text-[13px] text-ink/55">
                  Demo requests aren&apos;t connected yet (review version).
                </p>
              )}
            </div>

            <div className="text-center text-[14px] leading-[1.5] text-ink/65">
              <p>We&apos;ll get back to you to arrange a time that works for you.</p>
              <p className="mt-1">
                By submitting, you agree to our{" "}
                <a
                  href={PRIVACY_POLICY_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-ink underline underline-offset-2"
                >
                  Privacy Policy
                </a>
                .
              </p>
            </div>
          </form>
        </>
      )}
    </ModalShell>
  );
}
