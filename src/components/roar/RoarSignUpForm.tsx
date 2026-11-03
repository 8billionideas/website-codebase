"use client";

import { useEffect, useId, useRef, useState, type FocusEvent, type FormEvent } from "react";
import { Check } from "lucide-react";
import Button from "@/components/ui/Button";
import { ROAR_PRIVACY_TEXT, isRoarFormConfigured, submitRoarSignUp } from "@/lib/hubspot";
import { trackEvent } from "@/lib/analytics";
import { siteConfig } from "@/lib/site-config";
import { roarSignUp } from "@/content/roar";

const PRIVACY_POLICY_URL = siteConfig.legal.find((link) => link.label === "Privacy Policy")?.url ?? undefined;

// The ROAR HubSpot form's fields: internal names and labels exactly as in the form; all required.
type FieldName = "firstname" | "lastname" | "email" | "company" | "address" | "jobtitle";
type Values = Record<FieldName, string>;
type Errors = Partial<Record<FieldName, string>>;

const FIELDS: { name: FieldName; label: string; type?: string; autoComplete: string; error: string }[] = [
  { name: "firstname", label: "First name", autoComplete: "given-name", error: "Please enter your first name" },
  { name: "lastname", label: "Last name", autoComplete: "family-name", error: "Please enter your last name" },
  { name: "email", label: "E-mail address", type: "email", autoComplete: "email", error: "Please enter your work email address" },
  { name: "company", label: "What is the name of your school, college, or organisation?", autoComplete: "organization", error: "Please enter your school, college or organisation" },
  { name: "address", label: "What is your school’s address?", autoComplete: "street-address", error: "Please enter your school’s address" },
  { name: "jobtitle", label: "What is your role at your school?", autoComplete: "organization-title", error: "Please enter your role" },
];
const ORDER = FIELDS.map((field) => field.name);
const EMPTY = Object.fromEntries(ORDER.map((name) => [name, ""])) as Values;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function validate(name: FieldName, value: string): string | undefined {
  const v = value.trim();
  const field = FIELDS.find((f) => f.name === name)!;
  if (!v) return field.error;
  if (name === "email" && !EMAIL_PATTERN.test(v)) return "Please enter a valid email address";
  return undefined;
}

// Pill-shaped inputs, 44px tall (as the site's other forms).
const INPUT =
  "h-11 w-full rounded-full border bg-white px-4 text-[15px] text-ink outline-none transition-[border-color,box-shadow] placeholder:text-ink/45 focus:border-accent focus:ring-[3px] focus:ring-accent/20";

// /roar sign-up: submits to the ROAR HubSpot form (shared helper, EU fallback) with the form's
// legitimate-interest consent; the privacy text is shown, as on the original page.
export default function RoarSignUpForm() {
  const uid = useId();
  const id = (name: string) => `${uid}-${name}`;
  const [values, setValues] = useState<Values>(EMPTY);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "error" | "success">("idle");
  const [submittedName, setSubmittedName] = useState("");
  const honeypotRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const successRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (status === "success") successRef.current?.focus();
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
    if (status === "submitting" || !isRoarFormConfigured) return;

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
      const trimmed = Object.fromEntries(ORDER.map((name) => [name, values[name].trim()])) as Values;
      const ok = await submitRoarSignUp(trimmed);
      if (!ok) throw new Error("HubSpot rejected the submission");
      trackEvent("generate_lead", { form_name: "roar_sign_up" });
      setSubmittedName(firstName);
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div aria-live="polite" className="rounded-2xl bg-white p-7 text-ink md:p-10">
        <span className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-accent">
          <Check className="h-7 w-7 text-accent" strokeWidth={1.5} aria-hidden="true" />
        </span>
        <h3 ref={successRef} tabIndex={-1} className="mt-6 text-[26px] font-light leading-[1.3] outline-none md:text-[30px]">
          Thanks, {submittedName}! We’ll be in touch about ROAR soon.
        </h3>
      </div>
    );
  }

  const field = ({ name, label, type, autoComplete }: (typeof FIELDS)[number]) => {
    const error = errors[name];
    return (
      <div key={name}>
        <label htmlFor={id(name)} className="block text-[14px] font-medium text-ink/80">
          {label} <span aria-hidden="true">*</span>
        </label>
        <input
          id={id(name)}
          name={name}
          type={type ?? "text"}
          autoComplete={autoComplete}
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
  };

  return (
    <form ref={formRef} noValidate onSubmit={handleSubmit} className="rounded-2xl bg-paper p-7 text-ink md:p-10">
      <div className="flex flex-col gap-5">
        {/* First and last name side by side from sm; everything else full width. */}
        <div className="grid grid-cols-1 gap-x-3 gap-y-5 sm:grid-cols-2">{FIELDS.slice(0, 2).map(field)}</div>
        {FIELDS.slice(2).map(field)}

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

        {/* The form's privacy text (legitimate interest), word for word. */}
        <p className="text-[13px] leading-[1.6] text-ink/65">
          {ROAR_PRIVACY_TEXT.replace(/Privacy Policy\.$/, "")}
          <a href={PRIVACY_POLICY_URL} target="_blank" rel="noopener noreferrer" className="text-ink underline underline-offset-2">
            Privacy Policy
          </a>
          .
        </p>

        <div>
          <Button
            type="submit"
            arrow
            loading={status === "submitting"}
            disabled={status === "submitting" || !isRoarFormConfigured}
            aria-describedby={!isRoarFormConfigured ? id("not-connected") : undefined}
            className="w-full sm:w-auto"
          >
            {status === "submitting" ? "Sending…" : roarSignUp.submit}
          </Button>
          {!isRoarFormConfigured && (
            <p id={id("not-connected")} className="mt-2 text-[13px] text-ink/60">
              Not connected yet – please email {siteConfig.email}
            </p>
          )}
        </div>
      </div>
    </form>
  );
}
