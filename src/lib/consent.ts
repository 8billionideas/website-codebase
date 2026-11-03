import { useSyncExternalStore } from "react";
import {
  clearAnalyticsCookies,
  readStoredConsent,
  updateGtagConsent,
  writeStoredConsent,
  type ConsentChoice,
} from "@/lib/analytics";

// Shared cookie-consent state for the banner and the GA loader.
// ready: the stored choice has been read (client only). choice: the visitor's current choice, or
// null until they make one. bannerOpen: the cookie banner is showing. gaAllowed: analytics consent
// has been granted at some point in this page view, so the GA tag stays loaded once it has loaded.
export interface ConsentState {
  ready: boolean;
  choice: ConsentChoice | null;
  bannerOpen: boolean;
  gaAllowed: boolean;
}

const SERVER_STATE: ConsentState = { ready: false, choice: null, bannerOpen: false, gaAllowed: false };
let state = SERVER_STATE;
const listeners = new Set<() => void>();
// Where focus goes back to after a choice made from "Cookie settings".
let returnFocusTo: HTMLElement | null = null;

function setState(next: Partial<ConsentState>) {
  state = { ...state, ...next };
  listeners.forEach((listener) => listener());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

// Called once on the client (by the cookie banner): reads the stored choice and shows the banner
// if there isn't one (or it's over 12 months old).
export function initConsent() {
  if (state.ready) return;
  const choice = readStoredConsent();
  setState({ ready: true, choice, bannerOpen: choice === null, gaAllowed: choice === "granted" });
}

export function chooseConsent(value: ConsentChoice) {
  writeStoredConsent(value);
  updateGtagConsent(value);
  if (value === "denied") clearAnalyticsCookies();
  setState({ choice: value, bannerOpen: false, gaAllowed: state.gaAllowed || value === "granted" });
  returnFocusTo?.focus();
  returnFocusTo = null;
}

// The footer's "Cookie settings" link: reopens the banner, and focus returns to the link afterwards.
export function openCookieSettings(trigger?: HTMLElement | null) {
  returnFocusTo = trigger ?? null;
  setState({ bannerOpen: true });
}

export function useConsent() {
  return useSyncExternalStore(subscribe, () => state, () => SERVER_STATE);
}
