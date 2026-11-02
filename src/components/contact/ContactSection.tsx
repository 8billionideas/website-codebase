"use client";

import { useEffect, useId, useRef, useState, type FormEvent, type ReactNode } from "react";
import Image from "next/image";
import { Check, ChevronDown } from "lucide-react";
import { HUBSPOT_CONTACT_FORM_ID, isContactFormConfigured, submitHubspotForm } from "@/lib/hubspot";
import Button from "@/components/ui/Button";
import { HELP_TOPICS, teamAvatars } from "@/content/contact";
import { markFormSubmitted } from "@/lib/newsletter-popup";
import { trackEvent } from "@/lib/analytics";

// Field names as set up in the HubSpot "Contact us" form ("0-1/…" are contact properties;
// on this form School / organisation is the contact's "company" property).
const HUBSPOT_FIELDS = {
  firstName: "0-1/firstname",
  lastName: "0-1/lastname",
  email: "0-1/email",
  company: "0-1/company",
  jobTitle: "0-1/jobtitle",
  helpTopic: "0-1/what_can_we_help_with",
  message: "0-1/message",
} as const;

// "What can we help with?": each option's internal value in the HubSpot form.
const HELP_TOPIC_VALUES: Record<(typeof HELP_TOPICS)[number], string> = {
  "Critical Curriculum": "Critical curriculum",
  "International GCSE": "International GCSE",
  Both: "Both",
  "Partnership enquiry": "Partnership enquiry",
  "Something else": "Something else",
};

// The HubSpot form's one marketing checkbox (subscription type 7269415). Consent to process is
// implicit in the HubSpot form (submitting counts as consent), so legalConsentOptions is only
// sent when the box is ticked.
const UPDATES_SUBSCRIPTION_TYPE_ID = 7269415;
const UPDATES_LABEL =
  "Send me updates from 8billionideas, including programmes, events, resources for schools and our newsletter.";
const PROCESSING_TEXT =
  "By clicking submit below, you consent to allow 8billionideas to store and process the personal information submitted above to provide you the content requested.";

const PRIVACY_POLICY_URL = "https://8billionideas.notion.site/Privacy-Policy-0d819775ea1d4a0a8bdf36d8bdaedd05";
const CONTACT_EMAIL = "hello@8billionideas.com";

type Field = "firstName" | "lastName" | "email" | "company" | "jobTitle" | "helpTopic" | "message";
type Values = Record<Field, string> & { updates: boolean };
type Errors = Partial<Record<Field, string>>;

const ORDER: Field[] = ["firstName", "lastName", "email", "company", "jobTitle", "helpTopic", "message"];
const EMPTY: Values = {
  firstName: "", lastName: "", email: "", company: "", jobTitle: "", helpTopic: "", message: "",
  updates: false,
};
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function validate(field: Field, value: string): string | undefined {
  const v = value.trim();
  switch (field) {
    case "firstName":
      return v ? undefined : "Please enter your first name";
    case "lastName":
      return v ? undefined : "Please enter your last name";
    case "email":
      return EMAIL_PATTERN.test(v) ? undefined : "Please enter a valid work email address";
    case "company":
      return v ? undefined : "Please enter your school or organisation";
    case "jobTitle":
      return v ? undefined : "Please enter your job title";
    case "helpTopic":
      return v ? undefined : "Please choose what we can help with";
    case "message":
      return v ? undefined : "Please enter a message";
  }
}

const CONTROL =
  "w-full rounded-lg border bg-white px-4 text-[16px] text-ink outline-none transition-[border-color,box-shadow] placeholder:text-ink/45 focus:border-accent focus:ring-[3px] focus:ring-accent/20";
const ERROR_TEXT = "mt-1.5 text-[13px] text-[#B42318]";

function Label({ htmlFor, children }: { htmlFor?: string; children: ReactNode }) {
  return (
    <label htmlFor={htmlFor} className="block text-[15px] font-medium text-ink">
      {children} <span className="text-accent" aria-hidden="true">*</span>
    </label>
  );
}

export default function ContactSection() {
  const uid = useId();
  const id = (name: string) => `${uid}-${name}`;
  const [values, setValues] = useState<Values>(EMPTY);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "error" | "success">("idle");
  const [submittedName, setSubmittedName] = useState("");
  const formRef = useRef<HTMLFormElement>(null);
  const honeypotRef = useRef<HTMLInputElement>(null);
  const successHeadingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (status === "success") successHeadingRef.current?.focus();
  }, [status]);

  function setValue(field: Field, value: string) {
    setValues((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: validate(field, value) }));
  }

  function checkField(field: Field, value: string) {
    const error = validate(field, value);
    setErrors((prev) => ({ ...prev, [field]: error }));
  }

  function describedBy(field: Field) {
    return errors[field] ? id(`${field}-error`) : undefined;
  }

  function errorText(field: Field) {
    return errors[field] ? (
      <p id={id(`${field}-error`)} className={ERROR_TEXT}>
        {errors[field]}
      </p>
    ) : null;
  }

  function borderFor(field: Field) {
    return errors[field] ? "border-[#B42318]" : "border-ink/15";
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "submitting" || !isContactFormConfigured) return;

    const nextErrors: Errors = {};
    for (const field of ORDER) nextErrors[field] = validate(field, values[field]);
    setErrors(nextErrors);
    const firstInvalid = ORDER.find((field) => nextErrors[field]);
    if (firstInvalid) {
      formRef.current?.querySelector<HTMLElement>(`[data-field="${firstInvalid}"]`)?.focus();
      return;
    }

    const firstName = values.firstName.trim();
    // Bots fill the hidden field; pretend it worked and send nothing.
    if (honeypotRef.current?.value) {
      setSubmittedName(firstName);
      setStatus("success");
      return;
    }

    setStatus("submitting");
    try {
      const ok = await submitHubspotForm(HUBSPOT_CONTACT_FORM_ID, {
        [HUBSPOT_FIELDS.firstName]: firstName,
        [HUBSPOT_FIELDS.lastName]: values.lastName.trim(),
        [HUBSPOT_FIELDS.email]: values.email.trim(),
        [HUBSPOT_FIELDS.company]: values.company.trim(),
        [HUBSPOT_FIELDS.jobTitle]: values.jobTitle.trim(),
        [HUBSPOT_FIELDS.helpTopic]: HELP_TOPIC_VALUES[values.helpTopic as keyof typeof HELP_TOPIC_VALUES],
        [HUBSPOT_FIELDS.message]: values.message.trim(),
      }, values.updates
        ? {
            consent: {
              consentToProcess: true,
              text: PROCESSING_TEXT,
              communications: [{ value: true, subscriptionTypeId: UPDATES_SUBSCRIPTION_TYPE_ID, text: UPDATES_LABEL }],
            },
          }
        : undefined);
      if (!ok) throw new Error("HubSpot rejected the submission");
      markFormSubmitted();
      trackEvent("generate_lead", { form_name: "contact" });
      setSubmittedName(firstName);
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  function textField(
    field: Field,
    label: string,
    options: { type?: string; autoComplete: string; placeholder: string }
  ) {
    return (
      <div>
        <Label htmlFor={id(field)}>{label}</Label>
        <input
          id={id(field)}
          data-field={field}
          name={field}
          type={options.type ?? "text"}
          autoComplete={options.autoComplete}
          placeholder={options.placeholder}
          required
          aria-invalid={errors[field] ? true : undefined}
          aria-describedby={describedBy(field)}
          value={values[field]}
          onChange={(e) => setValue(field, e.target.value)}
          onBlur={(e) => checkField(field, e.currentTarget.value)}
          className={`mt-2 h-[52px] ${CONTROL} ${borderFor(field)}`}
        />
        {errorText(field)}
      </div>
    );
  }

  const avatars = teamAvatars.slice(0, 3);

  return (
    <section id="contact" className="bg-paper pb-section">
      <div className="mx-auto max-w-[1196px] px-6 md:px-12">
        {status === "success" ? (
          <div aria-live="polite" className="flex flex-col items-center py-12 text-center">
            <span className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-accent transition-[transform,opacity] duration-300 ease-out starting:scale-50 starting:opacity-0 motion-reduce:transition-none">
              <Check className="h-7 w-7 text-accent" strokeWidth={1.5} aria-hidden="true" />
            </span>
            <h2
              ref={successHeadingRef}
              tabIndex={-1}
              className="mt-6 text-[28px] font-light leading-[1.2] text-ink outline-none"
            >
              Thanks, {submittedName}.
            </h2>
            <p className="mt-3 text-[16px] leading-[1.6] text-ink/70">
              We&apos;ve received your message and a member of our team will be in touch soon.
            </p>
          </div>
        ) : (
          <form ref={formRef} noValidate onSubmit={handleSubmit} aria-label="Contact us">
            <div className="grid grid-cols-1 gap-y-5 md:grid-cols-2 md:gap-x-6">
              {textField("firstName", "First name", { autoComplete: "given-name", placeholder: "Enter your first name" })}
              {textField("lastName", "Last name", { autoComplete: "family-name", placeholder: "Enter your last name" })}
              {textField("email", "Work email", { type: "email", autoComplete: "email", placeholder: "Enter your work email" })}
              {textField("company", "School / organisation", {
                autoComplete: "organization",
                placeholder: "Enter your school or organisation",
              })}
              {textField("jobTitle", "Job title", { autoComplete: "organization-title", placeholder: "Enter your job title" })}

              <div>
                <Label htmlFor={id("helpTopic")}>What can we help with?</Label>
                <div className="relative mt-2">
                  <select
                    id={id("helpTopic")}
                    data-field="helpTopic"
                    name="helpTopic"
                    required
                    aria-invalid={errors.helpTopic ? true : undefined}
                    aria-describedby={describedBy("helpTopic")}
                    value={values.helpTopic}
                    onChange={(e) => setValue("helpTopic", e.target.value)}
                    onBlur={(e) => checkField("helpTopic", e.currentTarget.value)}
                    className={`h-[52px] cursor-pointer appearance-none pr-11 ${CONTROL} ${borderFor("helpTopic")} ${
                      values.helpTopic ? "" : "text-ink/45"
                    }`}
                  >
                    <option value="">Please select</option>
                    {HELP_TOPICS.map((topic) => (
                      <option key={topic} value={topic} className="text-ink">
                        {topic}
                      </option>
                    ))}
                  </select>
                  <ChevronDown
                    className="pointer-events-none absolute top-1/2 right-4 h-4 w-4 -translate-y-1/2 text-ink/55"
                    strokeWidth={1.5}
                    aria-hidden="true"
                  />
                </div>
                {errorText("helpTopic")}
              </div>

              <div className="md:col-span-2">
                <Label htmlFor={id("message")}>Message</Label>
                <textarea
                  id={id("message")}
                  data-field="message"
                  name="message"
                  rows={5}
                  required
                  placeholder="Tell us how we can help…"
                  aria-invalid={errors.message ? true : undefined}
                  aria-describedby={describedBy("message")}
                  value={values.message}
                  onChange={(e) => setValue("message", e.target.value)}
                  onBlur={(e) => checkField("message", e.currentTarget.value)}
                  className={`mt-2 resize-y py-3 leading-[1.5] ${CONTROL} ${borderFor("message")}`}
                />
                {errorText("message")}
              </div>
            </div>

            {/* Email consent */}
            <div className="mt-6 flex flex-col gap-4 text-[14px] leading-[1.6] text-ink/70">
              <p>
                8billionideas would like to send you emails about our work with schools. Please tick the box below
                if you&apos;d like to hear from us. This is optional and won&apos;t affect your enquiry.
              </p>
              <label className="flex cursor-pointer items-start gap-3">
                <span className="relative mt-px flex h-5 w-5 shrink-0">
                  <input
                    type="checkbox"
                    name="updates"
                    checked={values.updates}
                    onChange={(e) => setValues((prev) => ({ ...prev, updates: e.target.checked }))}
                    className="peer h-5 w-5 cursor-pointer appearance-none rounded border border-ink/30 bg-white transition-colors checked:border-accent checked:bg-accent focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-accent/40"
                  />
                  <Check
                    className="pointer-events-none absolute inset-0 m-auto hidden h-3.5 w-3.5 text-ink peer-checked:block"
                    strokeWidth={2}
                    aria-hidden="true"
                  />
                </span>
                <span>{UPDATES_LABEL}</span>
              </label>
              <p>
                You can unsubscribe from our emails at any time using the link in any email or by contacting{" "}
                <a href={`mailto:${CONTACT_EMAIL}`} className="font-medium text-ink underline underline-offset-2">
                  {CONTACT_EMAIL}
                </a>
                . For more information on how we use your data, please see our{" "}
                <a
                  href={PRIVACY_POLICY_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-ink underline underline-offset-2"
                >
                  Privacy Policy
                </a>
                .
              </p>
              <p>
                By clicking submit below, you consent to allow 8billionideas to store and process the personal
                information submitted above to provide you the content requested.
              </p>
            </div>

            {/* Honeypot: hidden from people and assistive tech; bots tend to fill it. */}
            <div aria-hidden="true" className="absolute -left-[10000px] top-auto h-px w-px overflow-hidden">
              <label htmlFor={id("website")}>Website</label>
              <input ref={honeypotRef} id={id("website")} name="website" type="text" tabIndex={-1} autoComplete="off" defaultValue="" />
            </div>

            {status === "error" && (
              <p role="alert" className="mt-6 rounded-lg bg-[#B42318]/[0.08] px-4 py-3 text-[14px] text-[#B42318]">
                Something went wrong sending your message. Please try again, or email {CONTACT_EMAIL}.
              </p>
            )}

            {/* Submit row: button | divider | (avatars) | reassurance. Stacked on mobile. */}
            <div className="mt-8 flex flex-col gap-6 md:flex-row md:items-center md:gap-8">
              <Button
                type="submit"
                arrow
                loading={status === "submitting"}
                disabled={status === "submitting" || !isContactFormConfigured}
                aria-describedby={!isContactFormConfigured ? id("not-connected") : undefined}
                className="w-full md:w-auto"
              >
                {status === "submitting" ? "Sending…" : "Send message"}
              </Button>
              <span className="hidden h-12 w-px bg-ink/15 md:block" aria-hidden="true" />
              <div className="flex items-center gap-4">
                {avatars.length > 0 && (
                  <div className="flex shrink-0 -space-x-3">
                    {avatars.map((avatar) => (
                      <span
                        key={avatar.src}
                        className="relative h-11 w-11 overflow-hidden rounded-full border-2 border-white"
                      >
                        <Image src={avatar.src} alt={avatar.alt} fill sizes="44px" className="object-cover" />
                      </span>
                    ))}
                  </div>
                )}
                <div>
                  <p className="text-[16px] text-ink">A real person from our team will get back to you.</p>
                  <p className="mt-1 text-[11px] uppercase tracking-[0.2em] text-ink/55">
                    USUALLY WITHIN ONE WORKING DAY.
                  </p>
                </div>
              </div>
            </div>
            {!isContactFormConfigured && (
              <p id={id("not-connected")} className="mt-3 text-[13px] text-ink/55">
                The contact form isn&apos;t connected yet (review version).
              </p>
            )}
          </form>
        )}
      </div>
    </section>
  );
}
