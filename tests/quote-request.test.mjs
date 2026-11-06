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

// The quote is only sent once the Critical Curriculum meets its five-programme minimum (quoteReady
// from priceQuote, tested in pricing.test.mjs); the calculator's button is disabled until then too.
test("the pop-up won't submit unless the quote is ready", () => {
  assert.match(source, /if \(status === "submitting" \|\| !isQuoteFormConfigured \|\| !q\.quoteReady\) return;/);
  const calculator = readFileSync(new URL("../src/components/pricing/PricingCalculator.tsx", import.meta.url), "utf8");
  assert.match(calculator, /disabled=\{!quote\.quoteReady\}/);
  assert.match(calculator, /if \(!quote\.quoteReady\) return;/);
});
