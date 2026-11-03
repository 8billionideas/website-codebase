"use client";

import { useEffect, useId, useRef, useState, type FocusEvent, type FormEvent } from "react";
import { Check, ChevronDown } from "lucide-react";
import ModalShell from "@/components/layout/ModalShell";
import Button from "@/components/ui/Button";
import { isMoneyMastersFormConfigured, submitMoneyMastersRequest } from "@/lib/hubspot";
import { trackEvent } from "@/lib/analytics";
import { siteConfig } from "@/lib/site-config";
import { EMIRATES, moneyMastersRequest } from "@/content/money-masters";

const PRIVACY_POLICY_URL = siteConfig.legal.find((link) => link.label === "Privacy Policy")?.url ?? undefined;

type FieldName = "firstname" | "lastname" | "email" | "jobtitle" | "company" | "state";
type Values = Record<FieldName, string>;
type Errors = Partial<Record<FieldName, string>>;

const EMPTY: Values = { firstname: "", lastname: "", email: "", jobtitle: "", company: "", state: "" };
// Display order, also used to focus the first invalid field on submit.
const ORDER: FieldName[] = ["firstname", "lastname", "email", "jobtitle", "company", "state"];
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
    case "jobtitle":
      return v ? undefined : "Please enter your job title";
    case "company":
      return v ? undefined : "Please enter your school";
    case "state":
      return v ? undefined : "Please choose your emirate";
  }
}

// Pill-shaped inputs, 44px tall (as the Request a demo pop-up).
const INPUT =
  "h-11 w-full rounded-full border bg-white px-4 text-[15px] text-ink outline-none transition-[border-color,box-shadow] placeholder:text-ink/45 focus:border-accent focus:ring-[3px] focus:ring-accent/20";

function MoneyMastersRequestModal({
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
  const [values, setValues] = useState<Values>(EMPTY);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "error" | "success">("idle");
  const [submitted, setSubmitted] = useState({ name: "", school: "" });
  const honeypotRef = useRef<HTMLInputElement>(null);
  const firstFieldRef = useRef<HTMLInputElement>(null);
  const successHeadingRef = useRef<HTMLHeadingElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (status === "success") successHeadingRef.current?.focus();
  }, [status]);

  function update(name: FieldName, value: string) {
    setValues((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: validate(name, value) }));
  }

  function handleBlur(event: FocusEvent<HTMLInputElement | HTMLSelectElement>) {
    const name = event.currentTarget.name as FieldName;
    const error = validate(name, event.currentTarget.value);
    setErrors((prev) => ({ ...prev, [name]: error }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "submitting" || !isMoneyMastersFormConfigured) return;

    const nextErrors: Errors = {};
    for (const name of ORDER) nextErrors[name] = validate(name, values[name]);
    setErrors(nextErrors);
    const firstInvalid = ORDER.find((name) => nextErrors[name]);
    if (firstInvalid) {
      formRef.current?.querySelector<HTMLElement>(`[name="${firstInvalid}"]`)?.focus();
      return;
    }

    const done = { name: values.firstname.trim(), school: values.company.trim() };
    // Bots fill the hidden field; pretend it worked and send nothing.
    if (honeypotRef.current?.value) {
      setSubmitted(done);
      setStatus("success");
      return;
    }

    setStatus("submitting");
    try {
      const ok = await submitMoneyMastersRequest({
        firstname: values.firstname.trim(),
        lastname: values.lastname.trim(),
        email: values.email.trim(),
        jobtitle: values.jobtitle.trim(),
        company: values.company.trim(),
        state: values.state,
      });
      if (!ok) throw new Error("HubSpot rejected the submission");
      trackEvent("generate_lead", { form_name: "money_masters_request" });
      setSubmitted(done);
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
  const headingId = id(success ? "success-heading" : "heading");

  return (
    <ModalShell
      open={open}
      onClose={onClose}
      labelledBy={headingId}
      initialFocus={() => (success ? successHeadingRef.current : firstFieldRef.current)}
      returnFocusTo={returnFocusTo}
      panelClassName="max-w-[480px] bg-paper p-7 md:p-10"
    >
      {success ? (
        <div aria-live="polite">
          <span className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-accent transition-[transform,opacity] duration-300 ease-out starting:scale-50 starting:opacity-0 motion-reduce:transition-none">
            <Check className="h-7 w-7 text-accent" strokeWidth={1.5} aria-hidden="true" />
          </span>
          <h2
            id={headingId}
            ref={successHeadingRef}
            tabIndex={-1}
            className="mt-6 text-[24px] font-light leading-[1.3] text-ink outline-none md:text-[28px]"
          >
            Thanks, {submitted.name}! We&apos;ll be in touch about Money Masters for {submitted.school}.
          </h2>
          <Button onClick={onClose} className="mt-8">
            Close
          </Button>
        </div>
      ) : (
        <>
          {/* Top padding on mobile keeps the heading clear of the close button. */}
          <div className="pt-8 pr-8 md:pt-0">
            <h2 id={headingId} className="text-[28px] font-light leading-[1.15] text-ink md:text-[32px]">
              {moneyMastersRequest.heading}
            </h2>
            <p className="mt-3 text-[15px] leading-[1.6] text-ink/70">{moneyMastersRequest.line}</p>
          </div>

          {/* 16px between rows, 12px between columns; two-column rows stack below 640px. */}
          <form ref={formRef} noValidate onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
            <div className="grid grid-cols-1 gap-x-3 gap-y-4 sm:grid-cols-2">
              {field("firstname", "First name", { autoComplete: "given-name", placeholder: "First name" })}
              {field("lastname", "Last name", { autoComplete: "family-name", placeholder: "Last name" })}
            </div>
            {field("email", "Work email", { type: "email", autoComplete: "email", placeholder: "name@school.com" })}
            <div className="grid grid-cols-1 gap-x-3 gap-y-4 sm:grid-cols-2">
              {field("jobtitle", "Job title", { autoComplete: "organization-title", placeholder: "Your role" })}
              {field("company", "School", { autoComplete: "organization", placeholder: "School name" })}
            </div>
            <div>
              <label htmlFor={id("state")} className="block text-[14px] font-medium text-ink/80">
                Emirate
              </label>
              <div className="relative mt-2">
                <select
                  id={id("state")}
                  name="state"
                  required
                  aria-invalid={errors.state ? true : undefined}
                  aria-describedby={errors.state ? id("state-error") : undefined}
                  value={values.state}
                  onChange={(e) => update("state", e.target.value)}
                  onBlur={handleBlur}
                  className={`${INPUT} cursor-pointer appearance-none pr-11 ${values.state ? "" : "text-ink/45"} ${
                    errors.state ? "border-[#B42318]" : "border-ink/15"
                  }`}
                >
                  <option value="" disabled>
                    Please select
                  </option>
                  {EMIRATES.map((emirate) => (
                    <option key={emirate} value={emirate} className="text-ink">
                      {emirate}
                    </option>
                  ))}
                </select>
                <ChevronDown
                  className="pointer-events-none absolute top-1/2 right-4 h-4 w-4 -translate-y-1/2 text-ink/60"
                  strokeWidth={1.5}
                  aria-hidden="true"
                />
              </div>
              {errors.state && (
                <p id={id("state-error")} className="mt-1.5 text-[13px] text-[#B42318]">
                  {errors.state}
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

            <div className="mt-1">
              <Button
                type="submit"
                size="form"
                arrow
                loading={status === "submitting"}
                disabled={status === "submitting" || !isMoneyMastersFormConfigured}
                aria-describedby={!isMoneyMastersFormConfigured ? id("not-connected") : undefined}
              >
                {status === "submitting" ? "Sending…" : moneyMastersRequest.submit}
              </Button>
              {!isMoneyMastersFormConfigured && (
                <p id={id("not-connected")} className="mt-2 text-center text-[13px] text-ink/60">
                  Requests aren&apos;t connected yet – please email{" "}
                  <a href={`mailto:${siteConfig.email}`} className="text-ink underline underline-offset-2">
                    {siteConfig.email}
                  </a>
                </p>
              )}
            </div>

            <p className="text-[12px] leading-[1.5] text-ink/60">
              {moneyMastersRequest.smallPrint} See our{" "}
              <a href={PRIVACY_POLICY_URL} target="_blank" rel="noopener noreferrer" className="text-ink underline underline-offset-2">
                Privacy Policy
              </a>
              .
            </p>
          </form>
        </>
      )}
    </ModalShell>
  );
}

// The green "Request the cards" button (the /money-masters card; "Request your cards" under the
// Money Masters resource on /resources). Opens the request pop-up.
export default function MoneyMastersRequestTrigger({
  label = moneyMastersRequest.submit,
  className = "w-full sm:w-auto",
}: {
  label?: string;
  className?: string;
}) {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  // A new key each time it opens, so the form starts fresh.
  const [session, setSession] = useState(0);

  function openModal(event: React.MouseEvent<HTMLButtonElement>) {
    triggerRef.current = event.currentTarget;
    setSession((n) => n + 1);
    setOpen(true);
  }

  return (
    <>
      <Button aria-haspopup="dialog" onClick={openModal} arrow className={className}>
        {label}
      </Button>
      {session > 0 && (
        <MoneyMastersRequestModal
          key={session}
          open={open}
          onClose={() => setOpen(false)}
          returnFocusTo={() => triggerRef.current}
        />
      )}
    </>
  );
}
