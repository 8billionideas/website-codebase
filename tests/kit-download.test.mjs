// Kit downloads (/resources): with fetch mocked, each kit's payload goes to its own HubSpot form
// (never the old shared resources form) with the three contact fields, the kit in the page context,
// and the subscription only when ticked.
import { test } from "node:test";
import assert from "node:assert/strict";

globalThis.window = { location: { href: "http://localhost:3002/resources", origin: "http://localhost:3002" } };
globalThis.document = { title: "Resources | 8billionideas", cookie: "" };
const calls = [];
globalThis.fetch = async (url, init) => {
  calls.push({ url, body: JSON.parse(init.body) });
  return { ok: true, status: 200 };
};

const hubspot = await import("../src/lib/hubspot.ts");
const { submitKitDownload, HUBSPOT_FUTURE_JOBS_KIT_FORM_ID, HUBSPOT_MY_FIRST_JOB_KIT_FORM_ID, DOWNLOAD_PROCESSING_TEXT } = hubspot;
const OLD_RESOURCES_FORM_ID = "0c0e6eaf-3138-47bb-aad0-401744bf07f5";
const contact = { firstname: "Sam", lastname: "Test", email: "sam@school.org.uk" };
const fieldIds = (body) => body.fields.map((f) => `${f.objectTypeId}/${f.name}`).sort();

test("Future Jobs Kit: its own form, three fields, kit in the context, no subscription unticked", async () => {
  assert.equal(HUBSPOT_FUTURE_JOBS_KIT_FORM_ID, "e55ad940-6e59-43f2-b166-49f099230458");
  calls.length = 0;
  assert.equal(await submitKitDownload({ ...contact, marketingOptIn: false, kitSlug: "future-jobs-kit", kitName: "Future Jobs Kit 2.0" }), true);
  assert.equal(calls.length, 1);
  assert.match(calls[0].url, /\/submit\/6337342\/e55ad940-6e59-43f2-b166-49f099230458$/);
  assert.ok(!calls[0].url.includes(OLD_RESOURCES_FORM_ID));
  assert.deepEqual(fieldIds(calls[0].body), ["0-1/email", "0-1/firstname", "0-1/lastname"]);
  assert.deepEqual(calls[0].body.context, { pageUri: "http://localhost:3002/resources#future-jobs-kit", pageName: "Future Jobs Kit 2.0 download" });
  assert.deepEqual(calls[0].body.legalConsentOptions, { consent: { consentToProcess: true, text: DOWNLOAD_PROCESSING_TEXT } });
});

test("My First Job Kit: its own form and context, and the subscription when ticked", async () => {
  assert.equal(HUBSPOT_MY_FIRST_JOB_KIT_FORM_ID, "aa3a9bf9-2110-4e61-b613-9a232cf922c2");
  calls.length = 0;
  await submitKitDownload({ ...contact, marketingOptIn: true, kitSlug: "my-first-job-kit", kitName: "My First Job Kit" });
  assert.match(calls[0].url, /\/submit\/6337342\/aa3a9bf9-2110-4e61-b613-9a232cf922c2$/);
  assert.deepEqual(fieldIds(calls[0].body), ["0-1/email", "0-1/firstname", "0-1/lastname"]);
  assert.deepEqual(calls[0].body.context, { pageUri: "http://localhost:3002/resources#my-first-job-kit", pageName: "My First Job Kit download" });
  assert.deepEqual(calls[0].body.legalConsentOptions.consent.communications, [
    {
      value: true,
      subscriptionTypeId: 7269415,
      text: "Send me updates from 8billionideas, including programmes, events, resources for schools and our newsletter.",
    },
  ]);
});

test("an unknown kit sends nothing", async () => {
  calls.length = 0;
  assert.equal(await submitKitDownload({ ...contact, marketingOptIn: false, kitSlug: "not-a-kit", kitName: "Not a kit" }), false);
  assert.equal(calls.length, 0);
});

test("the shared resources form is no longer configured", () => {
  assert.equal("HUBSPOT_RESOURCES_FORM_ID" in hubspot, false);
  assert.equal("isResourcesFormConfigured" in hubspot, false);
});
