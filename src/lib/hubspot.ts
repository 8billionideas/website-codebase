// HubSpot Forms API config.
// These HubSpot IDs are public (shown in HubSpot's embed code), so they're safe to commit.
// Environment variables override them (see .env.example).
const HUBSPOT_DEFAULTS = {
  portalId: "6337342",
  // Data-hosting region of the HubSpot account.
  region: "eu1",
  demoFormId: "50392331-59e5-418f-90b3-5637649a6fa6",
  contactFormId: "5a358bf0-8a69-4999-8046-b1decabb8d8d",
  // Pending: HubSpot admin creating the 'Website – Money Masters request' form.
  moneyMastersFormId: null as string | null,
  // The ROAR sign-up form (as embedded on page.8billionideas.com/roar-2026).
  roarFormId: "51b30d26-843b-4ed3-8944-70ca0654709b",
  // The First CV Workshop download form (as embedded on page.8billionideas.com/cv-lesson); its
  // HubSpot workflow emails the download link.
  cvWorkshopFormId: "561208a7-c30b-4c1f-ba6c-4303592604af",
};

// NEXT_PUBLIC_ variables are inlined at build time, so each is read by its full name.
export const HUBSPOT_PORTAL_ID = process.env.NEXT_PUBLIC_HUBSPOT_PORTAL_ID || HUBSPOT_DEFAULTS.portalId;
export const HUBSPOT_REGION = process.env.NEXT_PUBLIC_HUBSPOT_REGION || HUBSPOT_DEFAULTS.region;
export const HUBSPOT_DEMO_FORM_ID = process.env.NEXT_PUBLIC_HUBSPOT_DEMO_FORM_ID || HUBSPOT_DEFAULTS.demoFormId;
export const HUBSPOT_CONTACT_FORM_ID =
  process.env.NEXT_PUBLIC_HUBSPOT_CONTACT_FORM_ID || HUBSPOT_DEFAULTS.contactFormId;
// Quote requests go to the Contact form by agreement with the HubSpot admin.
export const HUBSPOT_QUOTE_FORM_ID = HUBSPOT_CONTACT_FORM_ID;


export const HUBSPOT_MONEY_MASTERS_FORM_ID =
  process.env.NEXT_PUBLIC_HUBSPOT_MONEY_MASTERS_FORM_ID || HUBSPOT_DEFAULTS.moneyMastersFormId || "";

export const HUBSPOT_ROAR_FORM_ID = process.env.NEXT_PUBLIC_HUBSPOT_ROAR_FORM_ID || HUBSPOT_DEFAULTS.roarFormId;

export const HUBSPOT_CV_WORKSHOP_FORM_ID =
  process.env.NEXT_PUBLIC_HUBSPOT_CV_WORKSHOP_FORM_ID || HUBSPOT_DEFAULTS.cvWorkshopFormId || "";

export const isHubspotConfigured = Boolean(HUBSPOT_PORTAL_ID && HUBSPOT_DEMO_FORM_ID);
export const isContactFormConfigured = Boolean(HUBSPOT_PORTAL_ID && HUBSPOT_CONTACT_FORM_ID);
export const isQuoteFormConfigured = Boolean(HUBSPOT_PORTAL_ID && HUBSPOT_QUOTE_FORM_ID);
export const isMoneyMastersFormConfigured = Boolean(HUBSPOT_PORTAL_ID && HUBSPOT_MONEY_MASTERS_FORM_ID);
export const isRoarFormConfigured = Boolean(HUBSPOT_PORTAL_ID && HUBSPOT_ROAR_FORM_ID);
export const isCvWorkshopFormConfigured = Boolean(HUBSPOT_PORTAL_ID && HUBSPOT_CV_WORKSHOP_FORM_ID);

// Forms API v3 submission hosts. HubSpot's Forms API v3 reference documents only the standard
// host, so it's tried first. For EU accounts, a 404 there ("form not found") is retried once at
// the EU host, which exists but isn't in HubSpot's docs.
const SUBMIT_HOST = "https://api.hsforms.com";
const EU_SUBMIT_HOST = "https://api-eu1.hsforms.com";

// Demo form field names, as set up in HubSpot. "0-1/…" are contact properties; the form's
// "School / organisation" field is the company record's Name ("0-2/name").
const DEMO_FORM_FIELDS = {
  firstname: "0-1/firstname",
  lastname: "0-1/lastname",
  email: "0-1/email",
  company: "0-2/name",
  jobtitle: "0-1/jobtitle",
  what_can_we_help_with: "0-1/what_can_we_help_with",
} as const;

export interface DemoRequest {
  firstname: string;
  lastname: string;
  company: string;
  jobtitle: string;
  email: string;
  // The option's internal value in the HubSpot form (e.g. "Critical curriculum").
  what_can_we_help_with: string;
}

// legalConsentOptions as documented for the Forms API v3 submission endpoint: explicit consent,
// or legitimate interest (a form set up that way shows only its privacy text, no checkboxes).
export type HubspotLegalConsentOptions =
  | {
      consent: {
        consentToProcess: boolean;
        text: string;
        communications?: { value: boolean; subscriptionTypeId: number; text: string }[];
      };
    }
  | {
      legitimateInterest: { value: boolean; subscriptionTypeId: number; legalBasis: string; text: string };
    };

function readHubspotCookie(): string | undefined {
  const match = document.cookie.match(/(?:^|;\s*)hubspotutk=([^;]+)/);
  return match ? decodeURIComponent(match[1]) : undefined;
}

// Posts to the HubSpot Forms API. Empty values are left out. A key can name the record type
// as HubSpot does ("0-2/name" is the company's Name); plain keys are contact properties.
export async function submitHubspotForm(
  formId: string,
  values: Record<string, string | undefined>,
  legalConsentOptions?: HubspotLegalConsentOptions
): Promise<boolean> {
  const fields = Object.entries(values)
    .filter(([, value]) => value)
    .map(([key, value]) => {
      const typed = key.match(/^(\d+-\d+)\/(.+)$/);
      return typed ? { objectTypeId: typed[1], name: typed[2], value } : { name: key, value };
    });
  const hutk = readHubspotCookie();
  const body = JSON.stringify({
    fields,
    context: {
      pageUri: window.location.href,
      pageName: document.title,
      ...(hutk ? { hutk } : {}),
    },
    ...(legalConsentOptions ? { legalConsentOptions } : {}),
  });
  const post = (host: string) =>
    fetch(`${host}/submissions/v3/integration/submit/${HUBSPOT_PORTAL_ID}/${formId}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body,
    });

  let host = SUBMIT_HOST;
  let response = await post(host);
  if (response.status === 404 && HUBSPOT_REGION === "eu1") {
    host = EU_SUBMIT_HOST;
    response = await post(host);
  }
  if (response.ok && process.env.NODE_ENV === "development") {
    console.info(`HubSpot form submitted via ${host}`);
  }
  return response.ok;
}

export function submitDemoRequest(request: DemoRequest): Promise<boolean> {
  return submitHubspotForm(
    HUBSPOT_DEMO_FORM_ID,
    Object.fromEntries(Object.entries(request).map(([key, value]) => [DEMO_FORM_FIELDS[key as keyof DemoRequest], value]))
  );
}

// "Request Money Masters" (UAE schools, through Zoud). Plain contact properties; country is always
// "United Arab Emirates", state is the emirate.
export interface MoneyMastersRequest {
  firstname: string;
  lastname: string;
  email: string;
  jobtitle: string;
  company: string;
  state: string;
}

export function submitMoneyMastersRequest(request: MoneyMastersRequest): Promise<boolean> {
  return submitHubspotForm(HUBSPOT_MONEY_MASTERS_FORM_ID, { ...request, country: "United Arab Emirates" });
}

// ROAR sign-up (/roar): the six fields of the HubSpot form, by their internal names. address is the
// company record's Address ("0-2/address"), as in the form. The form's hidden pro_con_persona_type
// field has no default value, so nothing is sent for it.
export interface RoarSignUp {
  firstname: string;
  lastname: string;
  email: string;
  company: string;
  address: string;
  jobtitle: string;
}

// The form uses legitimate interest (LEGITIMATE_INTEREST_PQL, subscription type 7431096): its
// privacy text is shown, with no consent checkboxes.
export const ROAR_PRIVACY_TEXT =
  "8billionideas needs the contact information you provide to us to contact you about our products and services. You may unsubscribe from these communications at any time. For information on how to unsubscribe, as well as our privacy practices and commitment to protecting your privacy, please review our Privacy Policy.";

export function submitRoarSignUp(request: RoarSignUp): Promise<boolean> {
  const { address, ...contact } = request;
  return submitHubspotForm(
    HUBSPOT_ROAR_FORM_ID,
    { ...contact, "0-2/address": address },
    {
      legitimateInterest: {
        value: true,
        subscriptionTypeId: 7431096,
        legalBasis: "LEGITIMATE_INTEREST_PQL",
        text: ROAR_PRIVACY_TEXT,
      },
    }
  );
}

// First CV Workshop download (/resources): the form's three contact fields, by their internal names
// ("0-1/firstname", "0-1/lastname", "0-1/email"), plus its one optional marketing checkbox.
export interface CvWorkshopDownload {
  firstname: string;
  lastname: string;
  email: string;
  // "Send me updates from 8billionideas…" (unticked by default).
  marketingOptIn: boolean;
}

// The form's consent settings: processing consent is implicit (the small print, no checkbox), and
// the opt-in is the communication checkbox for subscription type 7269415.
export const CV_WORKSHOP_SUBSCRIPTION_TYPE_ID = 7269415;
export const CV_WORKSHOP_PROCESSING_TEXT =
  "We’ll use your details to send your download. You can unsubscribe at any time. See our Privacy Policy.";
export const CV_WORKSHOP_OPT_IN_TEXT =
  "Send me updates from 8billionideas, including programmes, events, resources for schools and our newsletter.";

export function submitCvWorkshopDownload({ marketingOptIn, ...contact }: CvWorkshopDownload): Promise<boolean> {
  return submitHubspotForm(
    HUBSPOT_CV_WORKSHOP_FORM_ID,
    { "0-1/firstname": contact.firstname, "0-1/lastname": contact.lastname, "0-1/email": contact.email },
    {
      consent: {
        consentToProcess: true,
        text: CV_WORKSHOP_PROCESSING_TEXT,
        // The subscription is only sent when the box is ticked.
        ...(marketingOptIn
          ? {
              communications: [
                { value: true, subscriptionTypeId: CV_WORKSHOP_SUBSCRIPTION_TYPE_ID, text: CV_WORKSHOP_OPT_IN_TEXT },
              ],
            }
          : {}),
      },
    }
  );
}
