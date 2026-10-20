// Config and remembered state for the newsletter pop-up. Every storage access is wrapped in
// try/catch: private browsing or blocked storage just means the pop-up may show again.

// How often the pop-up may show once closed without signing up:
// - "session": once per visit (remembered in sessionStorage), so it doesn't reappear on every
//   page, but shows again on the visitor's next visit.
// - "30-days": hidden for 30 days after it's closed (remembered in localStorage).
// After a sign-up it never shows again in either mode (localStorage).
// Switch to '30-days' before launch.
export const NEWSLETTER_POPUP_FREQUENCY: "session" | "30-days" = "session";

const POPUP_KEY = "8bi-newsletter-popup";
// Set for the browser session when the demo, contact or quote form is submitted.
const FORM_SUBMITTED_KEY = "8bi-form-submitted";
const DISMISS_DAYS = 30;

type PopupState = { state: "dismissed"; at: number } | { state: "signedup" };

const storage = (kind: "local" | "session") => (kind === "local" ? window.localStorage : window.sessionStorage);

function read(kind: "local" | "session"): PopupState | null {
  try {
    const raw = storage(kind).getItem(POPUP_KEY);
    return raw ? (JSON.parse(raw) as PopupState) : null;
  } catch {
    return null;
  }
}

function write(kind: "local" | "session", value: PopupState) {
  try {
    storage(kind).setItem(POPUP_KEY, JSON.stringify(value));
  } catch {
    // Storage unavailable: nothing to remember.
  }
}

// False once the visitor has signed up, and after it's been closed: for the rest of the visit
// ("session") or for 30 days ("30-days").
export function newsletterPopupAllowed(): boolean {
  const saved = read("local");
  if (saved?.state === "signedup") return false;
  if (NEWSLETTER_POPUP_FREQUENCY === "session") return read("session") === null;
  if (!saved) return true;
  return Date.now() - saved.at > DISMISS_DAYS * 24 * 60 * 60 * 1000;
}

export const rememberNewsletterDismissed = () =>
  write(NEWSLETTER_POPUP_FREQUENCY === "session" ? "session" : "local", { state: "dismissed", at: Date.now() });
export const rememberNewsletterSignedUp = () => write("local", { state: "signedup" });

export function markFormSubmitted() {
  try {
    window.sessionStorage.setItem(FORM_SUBMITTED_KEY, "1");
  } catch {
    // Storage unavailable.
  }
}

export function formSubmittedThisSession(): boolean {
  try {
    return window.sessionStorage.getItem(FORM_SUBMITTED_KEY) === "1";
  } catch {
    return false;
  }
}
