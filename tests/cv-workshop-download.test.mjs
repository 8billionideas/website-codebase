// First CV Workshop download (/cv-workshop): with fetch mocked, the HubSpot payload goes to its own
// form (not the old shared resources form) with the three contact fields, the /cv-workshop page
// context, and the subscription only when the box is ticked.
import { test } from "node:test";
import assert from "node:assert/strict";

globalThis.window = { location: { href: "http://localhost:3002/cv-workshop", origin: "http://localhost:3002" } };
globalThis.document = { title: "Free CV workshop for students | 8billionideas", cookie: "" };
const calls = [];
globalThis.fetch = async (url, init) => {
  calls.push({ url, body: JSON.parse(init.body) });
  return { ok: true, status: 200 };
};

const { submitCvWorkshopDownload, HUBSPOT_CV_WORKSHOP_FORM_ID, DOWNLOAD_PROCESSING_TEXT } = await import("../src/lib/hubspot.ts");
const contact = { firstname: "Sam", lastname: "Test", email: "sam@school.org.uk" };
const fieldIds = (body) => body.fields.map((f) => `${f.objectTypeId}/${f.name}`).sort();

test("CV workshop: its own form, three fields, its own context, no subscription when unticked", async () => {
  assert.equal(HUBSPOT_CV_WORKSHOP_FORM_ID, "561208a7-c30b-4c1f-ba6c-4303592604af");
  calls.length = 0;
  assert.equal(await submitCvWorkshopDownload({ ...contact, marketingOptIn: false }), true);
  assert.equal(calls.length, 1);
  assert.match(calls[0].url, /\/submit\/6337342\/561208a7-c30b-4c1f-ba6c-4303592604af$/);
  assert.ok(!calls[0].url.includes("0c0e6eaf-3138-47bb-aad0-401744bf07f5"));
  assert.deepEqual(fieldIds(calls[0].body), ["0-1/email", "0-1/firstname", "0-1/lastname"]);
  assert.deepEqual(calls[0].body.context, { pageUri: "http://localhost:3002/cv-workshop", pageName: "First CV Workshop download" });
  assert.deepEqual(calls[0].body.legalConsentOptions, {
    consent: { consentToProcess: true, text: DOWNLOAD_PROCESSING_TEXT },
  });
});

test("CV workshop: ticking the box adds subscription type 7269415", async () => {
  calls.length = 0;
  await submitCvWorkshopDownload({ ...contact, marketingOptIn: true });
  assert.deepEqual(fieldIds(calls[0].body), ["0-1/email", "0-1/firstname", "0-1/lastname"]);
  assert.deepEqual(calls[0].body.legalConsentOptions.consent.communications, [
    {
      value: true,
      subscriptionTypeId: 7269415,
      text: "Send me updates from 8billionideas, including programmes, events, resources for schools and our newsletter.",
    },
  ]);
});
