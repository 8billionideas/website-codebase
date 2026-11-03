// ROAR sign-up: with fetch mocked, the HubSpot payload goes to the ROAR form and carries exactly the
// form's six fields (address on the company record) plus its legitimate-interest consent.
import { test } from "node:test";
import assert from "node:assert/strict";

globalThis.window = { location: { href: "http://localhost:3002/roar" } };
globalThis.document = { title: "ROAR 2026 with Lions Clubs | 8billionideas", cookie: "" };
const calls = [];
globalThis.fetch = async (url, init) => {
  calls.push({ url, body: JSON.parse(init.body) });
  return { ok: true, status: 200 };
};

const { submitRoarSignUp, HUBSPOT_ROAR_FORM_ID } = await import("../src/lib/hubspot.ts");

test("ROAR sign-up: the extracted form ID, field names and consent", async () => {
  assert.equal(HUBSPOT_ROAR_FORM_ID, "51b30d26-843b-4ed3-8944-70ca0654709b");
  const ok = await submitRoarSignUp({
    firstname: "Sam",
    lastname: "Test",
    email: "sam@school.org.uk",
    company: "Test Primary School",
    address: "1 School Lane, Lewes",
    jobtitle: "PSHE Lead",
  });
  assert.equal(ok, true);
  assert.equal(calls.length, 1);
  assert.match(calls[0].url, /\/submit\/6337342\/51b30d26-843b-4ed3-8944-70ca0654709b$/);
  const fields = calls[0].body.fields;
  assert.deepEqual(
    fields.map((f) => `${f.objectTypeId ? `${f.objectTypeId}/` : ""}${f.name}`).sort(),
    ["0-2/address", "company", "email", "firstname", "jobtitle", "lastname"]
  );
  assert.deepEqual(calls[0].body.legalConsentOptions, {
    legitimateInterest: {
      value: true,
      subscriptionTypeId: 7431096,
      legalBasis: "LEGITIMATE_INTEREST_PQL",
      text: calls[0].body.legalConsentOptions.legitimateInterest.text,
    },
  });
  assert.match(calls[0].body.legalConsentOptions.legitimateInterest.text, /^8billionideas needs the contact information/);
});
