// Remembered state for the newsletter pop-up. Every storage access is wrapped in try/catch:
// private browsing or blocked storage just means the pop-up may show again.

const POPUP_KEY = "8bi-newsletter-popup";
// Set for the browser session when the demo, contact or quote form is submitted.
const FORM_SUBMITTED_KEY = "8bi-form-submitted";
const DISMISS_DAYS = 30;

type PopupState = { state: "dismissed"; at: number } | { state: "signedup" };

function read(): PopupState | null {
  try {
    const raw = window.localStorage.getItem(POPUP_KEY);
    return raw ? (JSON.parse(raw) as PopupState) : null;
  } catch {
    return null;
  }
}

function write(value: PopupState) {
  try {
    window.localStorage.setItem(POPUP_KEY, JSON.stringify(value));
  } catch {
    // Storage unavailable: nothing to remember.
  }
}

// False once the visitor has signed up, or within 30 days of closing it.
export function newsletterPopupAllowed(): boolean {
  const saved = read();
  if (!saved) return true;
  if (saved.state === "signedup") return false;
  return Date.now() - saved.at > DISMISS_DAYS * 24 * 60 * 60 * 1000;
}

export const rememberNewsletterDismissed = () => write({ state: "dismissed", at: Date.now() });
export const rememberNewsletterSignedUp = () => write({ state: "signedup" });

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
