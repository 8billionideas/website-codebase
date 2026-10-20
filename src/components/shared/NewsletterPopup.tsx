"use client";

import { useCallback, useEffect, useId, useRef, useState, type FocusEvent, type FormEvent } from "react";
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

// When it may open: 5 seconds after the visitor arrives (the first page load; the layout
// persists across pages, so the timer runs once). How often is set by
// NEWSLETTER_POPUP_FREQUENCY in src/lib/newsletter-popup.ts.
const OPEN_AFTER_MS = 5000;
const EXCLUDED_ROUTES = ["/contact"];

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
// HubSpot field name: the contact's email property.
const HUBSPOT_EMAIL_FIELD = "0-1/email";

const validateEmail = (value: string) => (EMAIL_PATTERN.test(value.trim()) ? undefined : copy.emailError);

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
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | undefined>();
  const [status, setStatus] = useState<"idle" | "submitting" | "error" | "success">("idle");
  const [submittedEmail, setSubmittedEmail] = useState("");

  const emailRef = useRef<HTMLInputElement>(null);
  const successHeadingRef = useRef<HTMLHeadingElement>(null);
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

  // Called by the timer.
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

  // 5 seconds after arriving. A visit that starts with ?demo=1 (the demo pop-up opens first) is
  // skipped; the parameter is read here before DemoModalProvider removes it.
  useEffect(() => {
    if (new URLSearchParams(window.location.search).get("demo") === "1") return;
    const timer = window.setTimeout(tryOpen, OPEN_AFTER_MS);
    return () => window.clearTimeout(timer);
  }, [tryOpen]);

  // Note any other pop-up opening during this page view.
  useEffect(() => {
    const observer = new MutationObserver(() => {
      if (otherDialogOpen()) blockedThisViewRef.current = true;
    });
    observer.observe(document.body, { childList: true });
    return () => observer.disconnect();
  }, []);

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
    // Closing without signing up: don't show again this visit, or for 30 days (by setting).
    if (status !== "success") rememberNewsletterDismissed();
    setOpen(false);
  }

  function update(value: string) {
    setEmail(value);
    if (error) setError(validateEmail(value));
  }

  function handleBlur(event: FocusEvent<HTMLInputElement>) {
    setError(validateEmail(event.currentTarget.value));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "submitting" || !isNewsletterFormConfigured) return;

    const invalid = validateEmail(email);
    setError(invalid);
    if (invalid) {
      emailRef.current?.focus();
      return;
    }

    const address = email.trim();
    const succeed = () => {
      setSubmittedEmail(address);
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
        { [HUBSPOT_EMAIL_FIELD]: address },
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

  const success = status === "success";
  const headingId = id(success ? "success-heading" : "heading");

  return (
    <ModalShell
      open={open}
      onClose={close}
      labelledBy={headingId}
      initialFocus={() => emailRef.current}
      returnFocusTo={() => returnFocusRef.current}
      variant="sheet"
      overlayOpacity={0.5}
      panelClassName="bg-paper md:max-w-[420px]"
    >
      {/* data-newsletter-popup marks this dialog so the "another pop-up is open" check ignores it. */}
      <div data-newsletter-popup="" className="p-6 pt-12 md:p-7">
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
            {/* Right padding keeps the eyebrow and heading clear of the close button. */}
            <p className="pr-10 text-[12px] uppercase tracking-[0.25em] text-accent">{copy.eyebrow}</p>
            <h2 id={headingId} className="mt-2 pr-10 text-[26px] font-light leading-[1.2] text-ink">
              {copy.headingLine1}
              <br />
              <em className="text-accent">{copy.headingLine2}</em>
            </h2>
            <p className="mt-2 text-[14px] leading-[1.55] text-ink/70">{copy.line}</p>

            <form noValidate onSubmit={handleSubmit} className="mt-5 flex flex-col gap-3">
              <div>
                <label htmlFor={id("email")} className="block text-[14px] font-medium text-ink/80">
                  {copy.email.label}
                </label>
                <input
                  ref={emailRef}
                  id={id("email")}
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder={copy.email.placeholder}
                  required
                  aria-invalid={error ? true : undefined}
                  aria-describedby={error ? id("email-error") : undefined}
                  value={email}
                  onChange={(e) => update(e.target.value)}
                  onBlur={handleBlur}
                  className={`mt-1.5 ${INPUT} ${error ? "border-[#B42318]" : "border-ink/15"}`}
                />
                {error && (
                  <p id={id("email-error")} className="mt-1.5 text-[13px] text-[#B42318]">
                    {error}
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

              <div>
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

              <p className="text-[11px] leading-[1.5] text-ink/55">
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
    </ModalShell>
  );
}
