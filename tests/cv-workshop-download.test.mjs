// First CV Workshop download: with fetch mocked, the HubSpot payload goes to the CV form and carries
// exactly its three contact fields, with the marketing subscription only when the box is ticked.
import { test } from "node:test";
import assert from "node:assert/strict";

globalThis.window = { location: { href: "http://localhost:3002/resources" } };
globalThis.document = { title: "Resources | 8billionideas", cookie: "" };
const calls = [];
globalThis.fetch = async (url, init) => {
  calls.push({ url, body: JSON.parse(init.body) });
  return { ok: true, status: 200 };
};

const { submitCvWorkshopDownload, HUBSPOT_CV_WORKSHOP_FORM_ID, CV_WORKSHOP_PROCESSING_TEXT } = await import("../src/lib/hubspot.ts");
const contact = { firstname: "Sam", lastname: "Test", email: "sam@school.org.uk" };
const fieldIds = (body) => body.fields.map((f) => `${f.objectTypeId}/${f.name}`).sort();

test("CV workshop: the extracted form ID and field names, no subscription when unticked", async () => {
  assert.equal(HUBSPOT_CV_WORKSHOP_FORM_ID, "561208a7-c30b-4c1f-ba6c-4303592604af");
  calls.length = 0;
  assert.equal(await submitCvWorkshopDownload({ ...contact, marketingOptIn: false }), true);
  assert.equal(calls.length, 1);
  assert.match(calls[0].url, /\/submit\/6337342\/561208a7-c30b-4c1f-ba6c-4303592604af$/);
  assert.deepEqual(fieldIds(calls[0].body), ["0-1/email", "0-1/firstname", "0-1/lastname"]);
  assert.deepEqual(calls[0].body.legalConsentOptions, {
    consent: { consentToProcess: true, text: CV_WORKSHOP_PROCESSING_TEXT },
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
