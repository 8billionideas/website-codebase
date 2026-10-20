"use client";

import { useCallback, useEffect, useId, useRef, useState, type FocusEvent, type FormEvent } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Check } from "lucide-react";
import ModalShell from "@/components/layout/ModalShell";
import Button from "@/components/ui/Button";
import { newsletterPopup as copy } from "@/content/newsletter-popup";
import {
  HUBSPOT_NEWSLETTER_FORM_ID,
  HUBSPOT_NEWSLETTER_SUBSCRIPTION_TYPE_ID,
  isNewsletterFormConfigured,
  submitHubspotForm,
} from "@/lib/hubspot";
import {
  formSubmittedThisSession,
  newsletterPopupAllowed,
  rememberNewsletterDismissed,
  rememberNewsletterSignedUp,
} from "@/lib/newsletter-popup";

const PRIVACY_POLICY_URL = "https://8billionideas.notion.site/Privacy-Policy-0d819775ea1d4a0a8bdf36d8bdaedd05";

// When it may open: 20 seconds after arriving on the site, or once the visitor has scrolled half
// of the current page, whichever comes first.
const OPEN_AFTER_MS = 20_000;
const OPEN_AT_SCROLL = 0.5;
const EXCLUDED_ROUTES = ["/contact"];

type FieldName = "firstname" | "email" | "company";
type Values = Record<FieldName, string>;
type Errors = Partial<Record<FieldName, string>>;

const EMPTY: Values = { firstname: "", email: "", company: "" };
const ORDER: FieldName[] = ["firstname", "email", "company"];
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

// HubSpot field names: contact properties.
const HUBSPOT_FIELDS: Record<FieldName, string> = {
  firstname: "0-1/firstname",
  email: "0-1/email",
  company: "0-1/company",
};

function validate(name: FieldName, value: string): string | undefined {
  const v = value.trim();
  if (name === "email") return EMAIL_PATTERN.test(v) ? undefined : copy.errors.email;
  return v ? undefined : copy.errors[name];
}

// Pill-shaped inputs, 44px tall (as in the demo pop-up).
const INPUT =
  "h-11 w-full rounded-full border bg-white px-4 text-[15px] text-ink outline-none transition-[border-color,box-shadow] placeholder:text-ink/45 focus:border-accent focus:ring-[3px] focus:ring-accent/20";

// Any other pop-up (they all render role="dialog" aria-modal="true" through ModalShell); this
// one is recognised by the data-newsletter-popup marker inside it.
const otherDialogOpen = () =>
  [...document.querySelectorAll('[aria-modal="true"]')].some((dialog) => !dialog.querySelector("[data-newsletter-popup]"));

export default function NewsletterPopup() {
  const pathname = usePathname();
  const uid = useId();
  const id = (name: string) => `${uid}-${name}`;

  const [open, setOpen] = useState(false);
  const [values, setValues] = useState<Values>(EMPTY);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "error" | "success">("idle");
  const [submittedEmail, setSubmittedEmail] = useState("");

  const firstFieldRef = useRef<HTMLInputElement>(null);
  const successHeadingRef = useRef<HTMLHeadingElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const honeypotRef = useRef<HTMLInputElement>(null);
  const returnFocusRef = useRef<HTMLElement | null>(null);
  // Opened once per page load at most (storage then decides for later visits).
  const shownRef = useRef(false);
  // Another pop-up has been open during this page view, so this one stays away for the view.
  const blockedThisViewRef = useRef(false);
  const pathnameRef = useRef(pathname);

  const show = useCallback(() => {
    returnFocusRef.current = document.activeElement as HTMLElement | null;
    shownRef.current = true;
    setOpen(true);
  }, []);

  // Called by the timer and the scroll listener.
  const tryOpen = useCallback(() => {
    if (shownRef.current || EXCLUDED_ROUTES.includes(pathnameRef.current)) return;
    if (!newsletterPopupAllowed() || formSubmittedThisSession()) return;
    if (otherDialogOpen()) blockedThisViewRef.current = true;
    if (blockedThisViewRef.current) return;
    show();
  }, [show]);

  // A new page view: forget any block from the previous page.
  useEffect(() => {
    pathnameRef.current = pathname;
    blockedThisViewRef.current = otherDialogOpen();
  }, [pathname]);

  // Note any other pop-up opening during this page view.
  useEffect(() => {
    const observer = new MutationObserver(() => {
      if (otherDialogOpen()) blockedThisViewRef.current = true;
    });
    observer.observe(document.body, { childList: true });
    return () => observer.disconnect();
  }, []);

  // 20 seconds on the site (the layout persists across pages, so this runs once).
  useEffect(() => {
    const timer = window.setTimeout(tryOpen, OPEN_AFTER_MS);
    return () => window.clearTimeout(timer);
  }, [tryOpen]);

  // Half of the current page scrolled.
  useEffect(() => {
    function onScroll() {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollable > 0 && window.scrollY / scrollable >= OPEN_AT_SCROLL) tryOpen();
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [pathname, tryOpen]);

  // ?newsletter=1 opens it straight away for review (ignoring the timing and the remembered
  // state, though never on /contact), then the parameter is removed.
  useEffect(() => {
    const url = new URL(window.location.href);
    if (url.searchParams.get("newsletter") !== "1") return;
    url.searchParams.delete("newsletter");
    window.history.replaceState(window.history.state, "", url.pathname + url.search + url.hash);
    if (EXCLUDED_ROUTES.includes(pathname)) return;
    setTimeout(show, 0);
  }, [pathname, show]);

  useEffect(() => {
    if (status === "success") successHeadingRef.current?.focus();
  }, [status]);

  function close() {
    // Closing without signing up: don't show again for 30 days.
    if (status !== "success") rememberNewsletterDismissed();
    setOpen(false);
  }

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
    if (status === "submitting" || !isNewsletterFormConfigured) return;

    const nextErrors: Errors = {};
    for (const name of ORDER) nextErrors[name] = validate(name, values[name]);
    setErrors(nextErrors);
    const firstInvalid = ORDER.find((name) => nextErrors[name]);
    if (firstInvalid) {
      formRef.current?.querySelector<HTMLInputElement>(`[name="${firstInvalid}"]`)?.focus();
      return;
    }

    const email = values.email.trim();
    const succeed = () => {
      setSubmittedEmail(email);
      setStatus("success");
      rememberNewsletterSignedUp();
    };
    // Bots fill the hidden field; pretend it worked and send nothing.
    if (honeypotRef.current?.value) {
      succeed();
      return;
    }

    setStatus("submitting");
    try {
      const ok = await submitHubspotForm(
        HUBSPOT_NEWSLETTER_FORM_ID,
        {
          [HUBSPOT_FIELDS.firstname]: values.firstname.trim(),
          [HUBSPOT_FIELDS.email]: email,
          [HUBSPOT_FIELDS.company]: values.company.trim(),
        },
        HUBSPOT_NEWSLETTER_SUBSCRIPTION_TYPE_ID
          ? {
              consent: {
                consentToProcess: true,
                text: copy.consentText,
                communications: [
                  { value: true, subscriptionTypeId: HUBSPOT_NEWSLETTER_SUBSCRIPTION_TYPE_ID, text: copy.consentText },
                ],
              },
            }
          : undefined
      );
      if (!ok) throw new Error("HubSpot rejected the submission");
      succeed();
    } catch {
      setStatus("error");
    }
  }

  function field(name: FieldName, options: { type?: string; autoComplete: string }) {
    const error = errors[name];
    return (
      <div>
        <label htmlFor={id(name)} className="block text-[14px] font-medium text-ink/80">
          {copy.fields[name].label}
        </label>
        <input
          ref={name === "firstname" ? firstFieldRef : undefined}
          id={id(name)}
          name={name}
          type={options.type ?? "text"}
          autoComplete={options.autoComplete}
          placeholder={copy.fields[name].placeholder}
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
      onClose={close}
      labelledBy={headingId}
      initialFocus={() => firstFieldRef.current}
      returnFocusTo={() => returnFocusRef.current}
      variant="sheet"
      overlayOpacity={0.5}
      panelClassName="bg-paper md:max-w-[780px] md:overflow-hidden"
    >
      {/* Marks this dialog so the "another pop-up is open" check ignores it. */}
      <div data-newsletter-popup="" className="md:grid md:grid-cols-[2fr_3fr]">
        {/* Desktop only: the image (or a placeholder while there isn't one), full height. */}
        <div className="relative hidden min-h-full md:block">
          {copy.image ? (
            <Image src={copy.image.src} alt={copy.image.alt} fill sizes="312px" className="object-cover" />
          ) : (
            <div className="flex h-full items-center justify-center bg-accent/12">
              <span className="text-[12px] text-ink/45">Image placeholder</span>
            </div>
          )}
        </div>

        <div className="p-6 pt-12 md:p-9">
          {success ? (
            <div aria-live="polite">
              <span className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-accent">
                <Check className="h-7 w-7 text-accent" strokeWidth={1.5} aria-hidden="true" />
              </span>
              <h2
                id={headingId}
                ref={successHeadingRef}
                tabIndex={-1}
                className="mt-5 text-[26px] font-light leading-[1.2] text-ink outline-none"
              >
                {copy.successHeading}
              </h2>
              <p className="mt-2 text-[15px] leading-[1.6] text-ink/70">{copy.successLine(submittedEmail)}</p>
              <button
                type="button"
                onClick={close}
                className="mt-6 cursor-pointer text-[15px] font-medium text-ink underline underline-offset-4 hover:text-ink/70"
              >
                {copy.close}
              </button>
            </div>
          ) : (
            <>
              <p className="text-[12px] uppercase tracking-[0.25em] text-accent">{copy.eyebrow}</p>
              <h2 id={headingId} className="mt-3 text-[26px] font-light leading-[1.2] text-ink md:text-[32px]">
                {copy.headingLine1}
                <br />
                <em className="text-accent">{copy.headingLine2}</em>
              </h2>
              <p className="mt-3 text-[15px] leading-[1.6] text-ink/70">{copy.line}</p>

              <form ref={formRef} noValidate onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
                {field("firstname", { autoComplete: "given-name" })}
                {field("email", { type: "email", autoComplete: "email" })}
                {field("company", { autoComplete: "organization" })}

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
                    disabled={status === "submitting" || !isNewsletterFormConfigured}
                    aria-describedby={!isNewsletterFormConfigured ? id("not-connected") : undefined}
                  >
                    {status === "submitting" ? copy.buttonLoading : copy.button}
                  </Button>
                  {!isNewsletterFormConfigured && (
                    <p id={id("not-connected")} className="mt-2 text-center text-[13px] text-ink/55">
                      {copy.notConnected}
                    </p>
                  )}
                </div>

                <p className="text-[12px] leading-[1.5] text-ink/55">
                  {copy.smallPrintBefore}
                  <a
                    href={PRIVACY_POLICY_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-ink underline underline-offset-2"
                  >
                    {copy.smallPrintLink}
                  </a>
                  {copy.smallPrintAfter}
                </p>
              </form>
            </>
          )}
        </div>
      </div>
    </ModalShell>
  );
}
