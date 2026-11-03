// "Request Money Masters": with a form ID set and fetch mocked, the HubSpot payload carries exactly
// the seven expected fields.
import { test } from "node:test";
import assert from "node:assert/strict";

// The form ID is read when the module loads, so set it (and the browser globals the helper uses)
// before importing.
process.env.NEXT_PUBLIC_HUBSPOT_MONEY_MASTERS_FORM_ID = "test-money-masters-form";
globalThis.window = { location: { href: "http://localhost:3002/money-masters" } };
globalThis.document = { title: "Money Masters | 8billionideas", cookie: "" };
const calls = [];
globalThis.fetch = async (url, init) => {
  calls.push({ url, body: JSON.parse(init.body) });
  return { ok: true, status: 200 };
};

const { submitMoneyMastersRequest, isMoneyMastersFormConfigured } = await import("../src/lib/hubspot.ts");

test("Money Masters request: the payload has the seven fields and nothing else", async () => {
  assert.equal(isMoneyMastersFormConfigured, true);
  const ok = await submitMoneyMastersRequest({
    firstname: "Amira",
    lastname: "Test",
    email: "amira@school.ae",
    jobtitle: "Head of Year 7",
    company: "Test School",
    state: "Dubai",
  });
  assert.equal(ok, true);
  assert.equal(calls.length, 1);
  assert.match(calls[0].url, /\/submissions\/v3\/integration\/submit\/\d+\/test-money-masters-form$/);
  const fields = Object.fromEntries(calls[0].body.fields.map((f) => [f.name, f.value]));
  assert.deepEqual(Object.keys(fields).sort(), ["company", "country", "email", "firstname", "jobtitle", "lastname", "state"]);
  assert.equal(fields.country, "United Arab Emirates");
  assert.equal(fields.state, "Dubai");
  // Contact properties only (no record-type prefix).
  assert.ok(calls[0].body.fields.every((f) => !("objectTypeId" in f)));
});
