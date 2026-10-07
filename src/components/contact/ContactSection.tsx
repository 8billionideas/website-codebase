"use client";

import { useEffect, useId, useRef, useState, type FormEvent, type ReactNode } from "react";
import { ArrowRight, Check, Loader2 } from "lucide-react";
import Container from "@/components/layout/Container";
import { HUBSPOT_CONTACT_FORM_ID, isContactFormConfigured, submitHubspotForm } from "@/lib/hubspot";

// Confirm these match the internal field names in the HubSpot form.
const HUBSPOT_FIELDS = {
  firstName: "firstname",
  lastName: "lastname",
  email: "email",
  region: "region",
  school: "school_name",
  role: "jobtitle",
  heardAbout: "how_did_you_hear_about_us",
  message: "message",
  marketingEmails: "marketing_emails_opt_in",
  newsletter: "newsletter_opt_in",
} as const;

const PRIVACY_POLICY_URL = "https://8billionideas.notion.site/Privacy-Policy-0d819775ea1d4a0a8bdf36d8bdaedd05";
const CONTACT_EMAIL = "hello@8billionideas.com";

const REGIONS = ["Africa", "Americas", "Asia-Pacific", "Europe", "Middle East and North Africa", "Other", "Worldwide"];
const HEARD_ABOUT = ["Social media", "Word of mouth", "Event", "Google search", "Newsletter", "Email", "Other"];

type Field = "firstName" | "lastName" | "email" | "region" | "school" | "role" | "heardAbout" | "message";
type Values = Record<Field, string> & { marketingEmails: boolean; newsletter: boolean };
type Errors = Partial<Record<Field, string>>;

const ORDER: Field[] = ["firstName", "lastName", "email", "region", "school", "role", "heardAbout", "message"];
const EMPTY: Values = {
  firstName: "", lastName: "", email: "", region: "", school: "", role: "", heardAbout: "", message: "",
  marketingEmails: false, newsletter: false,
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
      if (!v) return "Please enter your email address";
      return EMAIL_PATTERN.test(v) ? undefined : "Please enter a valid email address";
    case "region":
      return v ? undefined : "Please select your region";
    case "school":
      return v ? undefined : "Please enter the name of your school, college or organisation";
    case "role":
      return v ? undefined : "Please enter your role";
    case "heardAbout":
      return v ? undefined : "Please choose an option";
    case "message":
      return v ? undefined : "Please tell us a little about what you'd like help with";
  }
}

const CONTROL =
  "w-full rounded-lg border bg-white px-4 text-[16px] text-ink outline-none transition-[border-color,box-shadow] focus:border-accent focus:ring-[3px] focus:ring-accent/20";
const ERROR_TEXT = "mt-1.5 text-[13px] text-[#B42318]";

function Label({ htmlFor, children }: { htmlFor?: string; children: ReactNode }) {
  return (
    <label htmlFor={htmlFor} className="block text-[15px] font-medium text-ink">
      {children}
      <span className="text-accent" aria-hidden="true">*</span>
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

  function describedBy(field: Field, extra?: string) {
    const ids = [extra, errors[field] ? id(`${field}-error`) : undefined].filter(Boolean);
    return ids.length ? ids.join(" ") : undefined;
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
        [HUBSPOT_FIELDS.region]: values.region,
        [HUBSPOT_FIELDS.school]: values.school.trim(),
        [HUBSPOT_FIELDS.role]: values.role.trim(),
        [HUBSPOT_FIELDS.heardAbout]: values.heardAbout,
        [HUBSPOT_FIELDS.message]: values.message.trim(),
        [HUBSPOT_FIELDS.marketingEmails]: String(values.marketingEmails),
        [HUBSPOT_FIELDS.newsletter]: String(values.newsletter),
      });
      if (!ok) throw new Error("HubSpot rejected the submission");
      setSubmittedName(firstName);
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  function textField(field: Field, label: string, options: { type?: string; autoComplete: string; helper?: string }) {
    const helperId = options.helper ? id(`${field}-helper`) : undefined;
    return (
      <div>
        <Label htmlFor={id(field)}>{label}</Label>
        {options.helper && (
          <p id={helperId} className="mt-1 text-[13px] text-ink/55">
            {options.helper}
          </p>
        )}
        <input
          id={id(field)}
          data-field={field}
          name={field}
          type={options.type ?? "text"}
          autoComplete={options.autoComplete}
          required
          aria-invalid={errors[field] ? true : undefined}
          aria-describedby={describedBy(field, helperId)}
          value={values[field]}
          onChange={(e) => setValue(field, e.target.value)}
          onBlur={(e) => checkField(field, e.currentTarget.value)}
          className={`mt-2 h-[52px] ${CONTROL} ${borderFor(field)}`}
        />
        {errorText(field)}
      </div>
    );
  }

  return (
    <section id="contact" className="bg-paper py-16 md:py-24">
      <Container>
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[2fr_3fr] lg:gap-16">
          <div className="text-left lg:sticky lg:top-24 lg:self-start">
            <p className="text-[12px] uppercase tracking-[0.25em] text-accent">CONTACT US</p>
            <h1 className="mt-4 text-[36px] font-light leading-[1.1] tracking-[-0.01em] text-ink md:text-[56px]">
              Let&apos;s start
              <br />
              <em className="text-accent">a conversation</em>
            </h1>
            <p className="mt-5 text-[18px] leading-[1.6] text-ink/70">
              Whether you have a question, an idea or a challenge you&apos;d like help with, tell us a
              little about it and a member of our team will get back to you.
            </p>
            <p className="mt-8 text-[14px] text-ink/55">Prefer email?</p>
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="mt-1 inline-block text-[16px] font-medium text-ink underline decoration-transparent underline-offset-4 transition-colors hover:decoration-ink"
            >
              {CONTACT_EMAIL}
            </a>
          </div>

          <div className="rounded-2xl border border-ink/10 bg-white p-6 md:p-10 lg:self-start">
            {status === "success" ? (
              <div aria-live="polite">
                <span className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-accent transition-[transform,opacity] duration-300 ease-out starting:scale-50 starting:opacity-0 motion-reduce:transition-none">
                  <Check className="h-7 w-7 text-accent" strokeWidth={1.5} aria-hidden="true" />
                </span>
                <h3
                  ref={successHeadingRef}
                  tabIndex={-1}
                  className="mt-6 text-[28px] font-light leading-[1.2] text-ink outline-none"
                >
                  Thanks, {submittedName}.
                </h3>
                <p className="mt-3 text-[16px] leading-[1.6] text-ink/70">
                  We&apos;ve received your message and a member of our team will be in touch soon.
                </p>
              </div>
            ) : (
              <form ref={formRef} noValidate onSubmit={handleSubmit} className="flex flex-col gap-6">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  {textField("firstName", "First name", { autoComplete: "given-name" })}
                  {textField("lastName", "Last name", { autoComplete: "family-name" })}
                </div>

                {textField("email", "E-mail address", {
                  type: "email",
                  autoComplete: "email",
                  helper: "Please enter your work email address",
                })}

                <div>
                  <Label htmlFor={id("region")}>What region are you located in?</Label>
                  <select
                    id={id("region")}
                    data-field="region"
                    name="region"
                    required
                    aria-invalid={errors.region ? true : undefined}
                    aria-describedby={describedBy("region")}
                    value={values.region}
                    onChange={(e) => setValue("region", e.target.value)}
                    onBlur={(e) => checkField("region", e.currentTarget.value)}
                    className={`mt-2 h-[52px] ${CONTROL} ${borderFor("region")}`}
                  >
                    <option value="">Please Select</option>
                    {REGIONS.map((region) => (
                      <option key={region} value={region}>
                        {region}
                      </option>
                    ))}
                  </select>
                  {errorText("region")}
                </div>

                {textField("school", "What is the name of your school, college or organisation?", {
                  autoComplete: "organization",
                })}
                {textField("role", "And what is your role at said school, college, or organisation?", {
                  autoComplete: "organization-title",
                })}

                <fieldset
                  aria-describedby={describedBy("heardAbout")}
                  onBlur={(e) => {
                    if (!e.currentTarget.contains(e.relatedTarget as Node | null)) checkField("heardAbout", values.heardAbout);
                  }}
                >
                  <legend className="text-[15px] font-medium text-ink">
                    How did you hear about us?
                    <span className="text-accent" aria-hidden="true">*</span>
                  </legend>
                  <div className="mt-3 grid grid-cols-1 gap-x-6 gap-y-3 md:grid-cols-2">
                    {HEARD_ABOUT.map((option, i) => (
                      <label key={option} className="flex cursor-pointer items-center gap-3 text-[16px] text-ink">
                        <input
                          type="radio"
                          name="heardAbout"
                          value={option}
                          required
                          data-field={i === 0 ? "heardAbout" : undefined}
                          checked={values.heardAbout === option}
                          onChange={() => setValue("heardAbout", option)}
                          className="h-5 w-5 shrink-0 cursor-pointer appearance-none rounded-full border border-ink/30 bg-white transition-colors checked:border-accent checked:bg-accent checked:shadow-[inset_0_0_0_3px_white] focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-accent/40"
                        />
                        {option}
                      </label>
                    ))}
                  </div>
                  {errorText("heardAbout")}
                </fieldset>

                <div>
                  <Label htmlFor={id("message")}>
                    Tell us about some of the challenges you would like us to help you solve. Also
                    include if you have ideas about year group(s), dates, and whether you&apos;d like
                    whole-day events or weekly engagements.
                  </Label>
                  <textarea
                    id={id("message")}
                    data-field="message"
                    name="message"
                    rows={6}
                    required
                    aria-invalid={errors.message ? true : undefined}
                    aria-describedby={describedBy("message")}
                    value={values.message}
                    onChange={(e) => setValue("message", e.target.value)}
                    onBlur={(e) => checkField("message", e.currentTarget.value)}
                    className={`mt-2 resize-y py-3 leading-[1.5] ${CONTROL} ${borderFor("message")}`}
                  />
                  {errorText("message")}
                </div>

                <div className="flex flex-col gap-4 text-[14px] leading-[1.6] text-ink/70">
                  <p>
                    8billionideas would like to send you emails about our work with schools. Please tick
                    the boxes below if you&apos;d like to hear from us. This is optional and won&apos;t
                    affect your enquiry.
                  </p>
                  {(
                    [
                      ["marketingEmails", "I'd like to receive occasional emails from 8billionideas about programmes, events and resources for schools."],
                      ["newsletter", "I'd like to receive the 8billionideas newsletter by email."],
                    ] as const
                  ).map(([key, text]) => (
                    <label key={key} className="flex cursor-pointer items-start gap-3">
                      <span className="relative mt-px flex h-5 w-5 shrink-0">
                        <input
                          type="checkbox"
                          name={key}
                          checked={values[key]}
                          onChange={(e) => setValues((prev) => ({ ...prev, [key]: e.target.checked }))}
                          className="peer h-5 w-5 cursor-pointer appearance-none rounded border border-ink/30 bg-white transition-colors checked:border-accent checked:bg-accent focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-accent/40"
                        />
                        <Check
                          className="pointer-events-none absolute inset-0 m-auto hidden h-3.5 w-3.5 text-ink peer-checked:block"
                          strokeWidth={2}
                          aria-hidden="true"
                        />
                      </span>
                      <span>{text}</span>
                    </label>
                  ))}
                  <p>
                    You can unsubscribe from our emails at any time using the link in any email or by
                    contacting{" "}
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
                    By clicking submit below, you consent to allow 8billionideas to store and process the
                    personal information submitted above to provide you the content requested.
                  </p>
                </div>

                {/* Honeypot: hidden from people and assistive tech; bots tend to fill it. */}
                <div aria-hidden="true" className="absolute -left-[10000px] top-auto h-px w-px overflow-hidden">
                  <label htmlFor={id("website")}>Website</label>
                  <input ref={honeypotRef} id={id("website")} name="website" type="text" tabIndex={-1} autoComplete="off" defaultValue="" />
                </div>

                {status === "error" && (
                  <p role="alert" className="rounded-lg bg-[#B42318]/[0.08] px-4 py-3 text-[14px] text-[#B42318]">
                    Something went wrong sending your message. Please try again, or email {CONTACT_EMAIL}.
                  </p>
                )}

                <div>
                  <button
                    type="submit"
                    disabled={status === "submitting" || !isContactFormConfigured}
                    aria-describedby={!isContactFormConfigured ? id("not-connected") : undefined}
                    className="flex h-14 w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-accent px-6 text-body font-medium text-ink transition-colors hover:bg-ink hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:bg-accent disabled:hover:text-ink"
                  >
                    {status === "submitting" ? (
                      <>
                        <Loader2 className="h-5 w-5 animate-spin motion-reduce:animate-none" strokeWidth={1.5} aria-hidden="true" />
                        Sending…
                      </>
                    ) : (
                      <>
                        Begin your journey with 8billionideas
                        <ArrowRight className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
                      </>
                    )}
                  </button>
                  {!isContactFormConfigured && (
                    <p id={id("not-connected")} className="mt-2 text-center text-[13px] text-ink/55">
                      The contact form isn&apos;t connected yet (review version).
                    </p>
                  )}
                </div>
              </form>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}
