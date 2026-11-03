// Kit downloads (/resources): with fetch mocked, the HubSpot payload goes to the resources form with
// its three contact fields, the kit in the page context, and the subscription only when ticked.
import { test } from "node:test";
import assert from "node:assert/strict";

globalThis.window = { location: { href: "http://localhost:3002/resources", origin: "http://localhost:3002" } };
globalThis.document = { title: "Resources | 8billionideas", cookie: "" };
const calls = [];
globalThis.fetch = async (url, init) => {
  calls.push({ url, body: JSON.parse(init.body) });
  return { ok: true, status: 200 };
};

const { submitKitDownload, HUBSPOT_RESOURCES_FORM_ID, DOWNLOAD_PROCESSING_TEXT } = await import("../src/lib/hubspot.ts");
const contact = { firstname: "Sam", lastname: "Test", email: "sam@school.org.uk" };
const fieldIds = (body) => body.fields.map((f) => `${f.objectTypeId}/${f.name}`).sort();

test("Future Jobs Kit: resources form, three fields, kit in the context, no subscription unticked", async () => {
  assert.equal(HUBSPOT_RESOURCES_FORM_ID, "0c0e6eaf-3138-47bb-aad0-401744bf07f5");
  calls.length = 0;
  assert.equal(await submitKitDownload({ ...contact, marketingOptIn: false, kitSlug: "future-jobs-kit", kitName: "Future Jobs Kit 2.0" }), true);
  assert.match(calls[0].url, /\/submit\/6337342\/0c0e6eaf-3138-47bb-aad0-401744bf07f5$/);
  assert.deepEqual(fieldIds(calls[0].body), ["0-1/email", "0-1/firstname", "0-1/lastname"]);
  assert.deepEqual(calls[0].body.context, { pageUri: "http://localhost:3002/resources#future-jobs-kit", pageName: "Future Jobs Kit 2.0 download" });
  assert.deepEqual(calls[0].body.legalConsentOptions, { consent: { consentToProcess: true, text: DOWNLOAD_PROCESSING_TEXT } });
});

test("My First Job Kit: its own context, and the subscription when ticked", async () => {
  calls.length = 0;
  await submitKitDownload({ ...contact, marketingOptIn: true, kitSlug: "my-first-job-kit", kitName: "My First Job Kit" });
  assert.deepEqual(calls[0].body.context, { pageUri: "http://localhost:3002/resources#my-first-job-kit", pageName: "My First Job Kit download" });
  assert.deepEqual(calls[0].body.legalConsentOptions.consent.communications, [
    {
      value: true,
      subscriptionTypeId: 7269415,
      text: "Send me updates from 8billionideas, including programmes, events, resources for schools and our newsletter.",
    },
  ]);
});
