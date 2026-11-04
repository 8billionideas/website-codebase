// Quote request pop-up (/pricing): the discount code was removed (its HubSpot property was deleted),
// so no discount-code field, state or "Discount code" line may come back in the pop-up or the
// message sent to HubSpot.
import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const source = readFileSync(new URL("../src/components/pricing/QuoteRequestModal.tsx", import.meta.url), "utf8");

test("no discount code in the quote request pop-up or its HubSpot submission", () => {
  assert.doesNotMatch(source, /discount[\s_-]?code/i);
});
