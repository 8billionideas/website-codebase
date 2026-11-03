// Google Analytics 4 with Consent Mode v2, "basic" mode: the consent defaults (all denied) are set
// before anything else runs, and gtag.js only loads once the visitor accepts analytics cookies on
// the cookie banner (or has a stored "granted" choice). Nothing is sent to Google before that.
// See GoogleAnalytics.tsx (loader), CookieBanner.tsx and src/lib/consent.ts.

// Public ID (shown in the page source anyway), safe to commit. NEXT_PUBLIC_GA_MEASUREMENT_ID
// overrides it.
export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || "G-VB855D8YGQ";

// Production builds only, and never when NEXT_PUBLIC_DISABLE_ANALYTICS is "true". Local hosts are
// excluded at runtime by analyticsAllowedHere().
export const ANALYTICS_ENABLED =
  process.env.NODE_ENV === "production" && process.env.NEXT_PUBLIC_DISABLE_ANALYTICS !== "true";

const LOCAL_HOSTS = ["localhost", "127.0.0.1", "[::1]", "::1"];

export function analyticsAllowedHere() {
  if (!ANALYTICS_ENABLED || typeof window === "undefined") return false;
  const host = window.location.hostname;
  return !LOCAL_HOSTS.includes(host) && !host.endsWith(".localhost");
}

// ---- The visitor's choice: localStorage "8bi-cookie-consent" = { value, date }, asked again after
// 12 months. Every access is wrapped, so blocked storage just means "no choice yet".
export type ConsentChoice = "granted" | "denied";
export const CONSENT_STORAGE_KEY = "8bi-cookie-consent";
export const CONSENT_MAX_AGE_MS = 365 * 24 * 60 * 60 * 1000;

export function readStoredConsent(): ConsentChoice | null {
  try {
    const stored = JSON.parse(window.localStorage.getItem(CONSENT_STORAGE_KEY) ?? "null");
    if (stored?.value !== "granted" && stored?.value !== "denied") return null;
    const age = Date.now() - new Date(stored.date).getTime();
    return age >= 0 && age < CONSENT_MAX_AGE_MS ? stored.value : null;
  } catch {
    return null;
  }
}

// The choice made in this page view, so it still applies if storage is blocked.
let currentChoice: ConsentChoice | null = null;

export function currentConsent(): ConsentChoice | null {
  return currentChoice ?? readStoredConsent();
}

export function writeStoredConsent(value: ConsentChoice) {
  currentChoice = value;
  try {
    window.localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify({ value, date: new Date().toISOString() }));
  } catch {
    // Storage blocked: the choice applies to this page view only.
  }
}

// Runs inline before anything else (root layout, strategy "beforeInteractive"): defines gtag,
// sets every consent type to denied, then restores a stored, unexpired "granted" for analytics
// (ads stay denied; we don't run ads). gtag.js itself is loaded later, only with consent.
export const CONSENT_DEFAULT_SCRIPT = `window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
window.gtag = gtag;
gtag('consent', 'default', { analytics_storage: 'denied', ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied', wait_for_update: 500 });
try {
  var c = JSON.parse(localStorage.getItem('${CONSENT_STORAGE_KEY}') || 'null');
  var age = c ? Date.now() - new Date(c.date).getTime() : -1;
  if (c && c.value === 'granted' && age >= 0 && age < ${CONSENT_MAX_AGE_MS}) gtag('consent', 'update', { analytics_storage: 'granted' });
} catch (e) {}`;

type Gtag = (...args: unknown[]) => void;
declare global {
  interface Window {
    gtag?: Gtag;
  }
}

export function updateGtagConsent(value: ConsentChoice) {
  window.gtag?.("consent", "update", { analytics_storage: value });
}

// After a Reject (e.g. from "Cookie settings" later in a visit), remove any GA cookies already set.
// GA sets them on the highest domain it can, so every parent domain is tried.
export function clearAnalyticsCookies() {
  const names = document.cookie
    .split(";")
    .map((part) => part.split("=")[0].trim())
    .filter((name) => name === "_ga" || name.startsWith("_ga_"));
  const labels = window.location.hostname.split(".");
  const domains = [""].concat(labels.map((_, i) => labels.slice(i).join(".")).map((d) => `; domain=.${d}`));
  for (const name of names) {
    for (const domain of domains) {
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/${domain}`;
    }
  }
}

// ---- Events. Only these parameters can be sent, so names, emails, schools and other personal
// data can never reach Google Analytics; any string containing "@" is dropped too.
const ALLOWED_PARAMS = new Set(["form_name", "location", "role", "value", "currency", "product", "resource", "resource_name", "transport_type"]);

export type EventParams = Record<string, string | number>;

export function trackEvent(name: string, params: EventParams = {}) {
  if (!analyticsAllowedHere() || currentConsent() !== "granted" || typeof window.gtag !== "function") return;
  const safe = Object.fromEntries(
    Object.entries(params).filter(
      ([key, value]) => ALLOWED_PARAMS.has(key) && (typeof value === "number" || !value.includes("@"))
    )
  );
  window.gtag("event", name, safe);
}
