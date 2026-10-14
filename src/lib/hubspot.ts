// HubSpot Forms API config. Values come from the environment (see .env.example);
// never hardcode real IDs here.
export const HUBSPOT_PORTAL_ID = process.env.NEXT_PUBLIC_HUBSPOT_PORTAL_ID ?? "";
// Data-hosting region of the HubSpot account ("eu1" for 8billionideas).
export const HUBSPOT_REGION = process.env.NEXT_PUBLIC_HUBSPOT_REGION ?? "";
export const HUBSPOT_DEMO_FORM_ID = process.env.NEXT_PUBLIC_HUBSPOT_DEMO_FORM_ID ?? "";
export const HUBSPOT_CONTACT_FORM_ID = process.env.NEXT_PUBLIC_HUBSPOT_CONTACT_FORM_ID ?? "";
export const HUBSPOT_QUOTE_FORM_ID = process.env.NEXT_PUBLIC_HUBSPOT_QUOTE_FORM_ID ?? "";

export const isHubspotConfigured = Boolean(HUBSPOT_PORTAL_ID && HUBSPOT_DEMO_FORM_ID);
export const isContactFormConfigured = Boolean(HUBSPOT_PORTAL_ID && HUBSPOT_CONTACT_FORM_ID);
export const isQuoteFormConfigured = Boolean(HUBSPOT_PORTAL_ID && HUBSPOT_QUOTE_FORM_ID);

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

function readHubspotCookie(): string | undefined {
  const match = document.cookie.match(/(?:^|;\s*)hubspotutk=([^;]+)/);
  return match ? decodeURIComponent(match[1]) : undefined;
}

// Posts to the HubSpot Forms API. Empty values are left out. A key can name the record type
// as HubSpot does ("0-2/name" is the company's Name); plain keys are contact properties.
export async function submitHubspotForm(
  formId: string,
  values: Record<string, string | undefined>
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
