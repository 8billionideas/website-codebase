"use client";

import { useEffect, useId, useRef, useState, type FocusEvent, type FormEvent } from "react";
import { Check } from "lucide-react";
import Button from "@/components/ui/Button";
import {
  CV_WORKSHOP_RESOURCE_NAME,
  DOWNLOAD_OPT_IN_TEXT,
  isResourcesFormConfigured,
  submitCvWorkshopDownload,
} from "@/lib/hubspot";
import { trackEvent } from "@/lib/analytics";
import { siteConfig } from "@/lib/site-config";
import { cvWorkshopDownload } from "@/content/cv-workshop";

const PRIVACY_POLICY_URL = siteConfig.legal.find((link) => link.label === "Privacy Policy")?.url ?? undefined;

// The CV form's three fields, all required (as in HubSpot).
type FieldName = "firstname" | "lastname" | "email";
type Values = Record<FieldName, string>;
type Errors = Partial<Record<FieldName, string>>;

const EMPTY: Values = { firstname: "", lastname: "", email: "" };
// Display order, also used to focus the first invalid field on submit.
const ORDER: FieldName[] = ["firstname", "lastname", "email"];
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

// Same rules and messages as the Request a demo pop-up.
function validate(name: FieldName, value: string): string | undefined {
  const v = value.trim();
  switch (name) {
    case "firstname":
      return v ? undefined : "Please enter your first name";
    case "lastname":
      return v ? undefined : "Please enter your last name";
    case "email":
      if (!v) return "Please enter your work email address";
      return EMAIL_PATTERN.test(v) ? undefined : "Please enter a valid email address";
  }
}

// Pill-shaped inputs, 44px tall (as the Request a demo pop-up).
const INPUT =
  "h-11 w-full rounded-full border bg-white px-4 text-[15px] text-ink outline-none transition-[border-color,box-shadow] placeholder:text-ink/45 focus:border-accent focus:ring-[3px] focus:ring-accent/20";

// /cv-workshop download form (#download): submits to the HubSpot resources form, like the kits' pop-up
// on /resources (shared helper, EU fallback), whose workflow emails the download link. The success
// message replaces the form.
export default function CvWorkshopForm() {
  const uid = useId();
  const id = (name: string) => `${uid}-${name}`;
  const [values, setValues] = useState<Values>(EMPTY);
  const [optIn, setOptIn] = useState(false);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "error" | "success">("idle");
  const [submittedName, setSubmittedName] = useState("");
  const honeypotRef = useRef<HTMLInputElement>(null);
  const successHeadingRef = useRef<HTMLHeadingElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (status === "success") successHeadingRef.current?.focus();
  }, [status]);

  function update(name: FieldName, value: string) {
    setValues((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: validate(name, value) }));
  }

  function handleBlur(event: FocusEvent<HTMLInputElement>) {
    const name = event.currentTarget.name as FieldName;
    const error = validate(name, event.currentTarget.value);
    setErrors((prev) => ({ ...prev, [name]: error }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "submitting" || !isResourcesFormConfigured) return;

    const nextErrors: Errors = {};
    for (const name of ORDER) nextErrors[name] = validate(name, values[name]);
    setErrors(nextErrors);
    const firstInvalid = ORDER.find((name) => nextErrors[name]);
    if (firstInvalid) {
      formRef.current?.querySelector<HTMLElement>(`[name="${firstInvalid}"]`)?.focus();
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
      const ok = await submitCvWorkshopDownload({
        firstname: firstName,
        lastname: values.lastname.trim(),
        email: values.email.trim(),
        marketingOptIn: optIn,
      });
      if (!ok) throw new Error("HubSpot rejected the submission");
      trackEvent("generate_lead", { form_name: CV_WORKSHOP_RESOURCE_NAME, resource: "cv_workshop" });
      setSubmittedName(firstName);
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div aria-live="polite" className="w-full max-w-[560px] rounded-2xl bg-white p-7 text-ink md:p-10">
        <span className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-accent">
          <Check className="h-7 w-7 text-accent" strokeWidth={1.5} aria-hidden="true" />
        </span>
        <h3 ref={successHeadingRef} tabIndex={-1} className="mt-6 text-[24px] font-light leading-[1.3] outline-none md:text-[28px]">
          Thanks, {submittedName}! Check your inbox for your download link.
        </h3>
      </div>
    );
  }

  function field(name: FieldName, label: string, options: { type?: string; autoComplete: string; placeholder?: string }) {
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

  return (
    <form
      ref={formRef}
      noValidate
      onSubmit={handleSubmit}
      className="flex w-full max-w-[560px] flex-col gap-4 rounded-2xl bg-white p-7 text-ink md:p-10"
    >
      {/* 16px between rows, 12px between columns; the names stack below 640px. */}
      <div className="grid grid-cols-1 gap-x-3 gap-y-4 sm:grid-cols-2">
        {field("firstname", "First name", { autoComplete: "given-name", placeholder: "First name" })}
        {field("lastname", "Last name", { autoComplete: "family-name", placeholder: "Last name" })}
      </div>
      {field("email", "Work email", { type: "email", autoComplete: "email", placeholder: "name@school.com" })}

      {/* The form's optional marketing opt-in (unticked by default). */}
      <label className="flex cursor-pointer items-start gap-3 text-[14px] leading-[1.5] text-ink/70">
        <span className="relative mt-px flex h-5 w-5 shrink-0">
          <input
            type="checkbox"
            name="marketingOptIn"
            checked={optIn}
            onChange={(e) => setOptIn(e.target.checked)}
            className="peer h-5 w-5 cursor-pointer appearance-none rounded border border-ink/30 bg-white transition-colors checked:border-accent checked:bg-accent focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-accent/40"
          />
          <Check
            className="pointer-events-none absolute inset-0 m-auto hidden h-3.5 w-3.5 text-ink peer-checked:block"
            strokeWidth={2}
            aria-hidden="true"
          />
        </span>
        <span>
          <span className="font-medium text-ink">{cvWorkshopDownload.optInLead}</span> {DOWNLOAD_OPT_IN_TEXT}
        </span>
      </label>

      {/* Honeypot: hidden from people and assistive tech; bots tend to fill it. */}
      <div aria-hidden="true" className="absolute -left-[10000px] top-auto h-px w-px overflow-hidden">
        <label htmlFor={id("website")}>Website</label>
        <input ref={honeypotRef} id={id("website")} name="website" type="text" tabIndex={-1} autoComplete="off" defaultValue="" />
      </div>

      {status === "error" && (
        <p role="alert" className="rounded-lg bg-[#B42318]/[0.08] px-4 py-3 text-[14px] text-[#B42318]">
          Something went wrong sending your details. Please try again, or email{" "}
          <a href={`mailto:${siteConfig.email}`} className="font-medium underline underline-offset-2">
            {siteConfig.email}
          </a>
          .
        </p>
      )}

      <div className="mt-1">
        <Button
          type="submit"
          size="form"
          arrow
          loading={status === "submitting"}
          disabled={status === "submitting" || !isResourcesFormConfigured}
          aria-describedby={!isResourcesFormConfigured ? id("not-connected") : undefined}
        >
          {status === "submitting" ? "Sending…" : cvWorkshopDownload.submit}
        </Button>
        {!isResourcesFormConfigured && (
          <p id={id("not-connected")} className="mt-2 text-center text-[13px] text-ink/60">
            Downloads aren&apos;t connected yet – please email{" "}
            <a href={`mailto:${siteConfig.email}`} className="text-ink underline underline-offset-2">
              {siteConfig.email}
            </a>
          </p>
        )}
      </div>

      <p className="text-[12px] leading-[1.5] text-ink/60">
        We&apos;ll use your details to send your download. You can unsubscribe at any time. See our{" "}
        <a href={PRIVACY_POLICY_URL} target="_blank" rel="noopener noreferrer" className="text-ink underline underline-offset-2">
          Privacy Policy
        </a>
        .
      </p>
    </form>
  );
}
