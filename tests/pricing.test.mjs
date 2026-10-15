// Run with: npm test   (Node's built-in test runner; Node strips the TypeScript types.)
import { test } from "node:test";
import assert from "node:assert/strict";
import {
  QUOTE_ADD_ONS,
  addOnCost,
  addOnDetails,
  addOnLineLabel,
  addOnsTotal,
  calculateCurriculumPrice,
  quoteTotal,
} from "../src/lib/pricing.ts";

test("add-ons are the four priced extras, in order", () => {
  assert.deepEqual(
    QUOTE_ADD_ONS.map((a) => a.id),
    ["cpd", "online-experience", "live-experience", "assembly"]
  );
});

test("CPD and Online Experience are their price × quantity (default 1)", () => {
  assert.equal(addOnCost("cpd"), 1975);
  assert.equal(addOnCost("online-experience"), 995);
  assert.equal(addOnCost("cpd", { quantity: 2 }), 3950);
  assert.equal(addOnCost("online-experience", { quantity: 3 }), 2985);
  assert.equal(addOnCost("cpd", { quantity: 11 }), 19750);
});

test("CPD and Online Experience are priced each", () => {
  assert.equal(QUOTE_ADD_ONS.find((a) => a.id === "cpd").unit, "each");
  assert.equal(QUOTE_ADD_ONS.find((a) => a.id === "online-experience").unit, "each");
});

test("Live Experience is the group's price per day × days", () => {
  assert.equal(addOnCost("live-experience", { groupId: "100", days: 2 }), 3600);
  assert.equal(addOnCost("live-experience", { groupId: "200", days: 1 }), 3600);
  assert.equal(addOnCost("live-experience", { groupId: "50", days: 1 }), 900);
  assert.equal(addOnCost("live-experience", { groupId: "150", days: 3 }), 8100);
  // Defaults: up to 50 students, 1 day.
  assert.equal(addOnCost("live-experience"), 900);
});

test("Assembly is £450 × the number of assemblies", () => {
  assert.equal(addOnCost("assembly", { quantity: 3 }), 1350);
  assert.equal(addOnCost("assembly"), 450);
});

test("quantities stay within 1–10", () => {
  assert.equal(addOnCost("assembly", { quantity: 0 }), 450);
  assert.equal(addOnCost("assembly", { quantity: 25 }), 4500);
  assert.equal(addOnCost("live-experience", { groupId: "50", days: 11 }), 9000);
});

test("estimated total: Critical Curriculum + CPD + Live Experience", () => {
  const cc = calculateCurriculumPrice(6, 3); // 3 year groups, 6 pillars
  assert.equal(cc.total, 720);
  const addOns = [{ id: "cpd" }, { id: "live-experience", options: { groupId: "50", days: 1 } }];
  assert.equal(quoteTotal({ cc }, addOns), 3595);
});

test("estimated total: Critical Curriculum (1 year group, 1 pillar) + CPD × 2 + Online Experience × 1", () => {
  const cc = calculateCurriculumPrice(1, 1);
  assert.equal(cc.total, 40);
  const addOns = [
    { id: "cpd", options: { quantity: 2 } },
    { id: "online-experience", options: { quantity: 1 } },
  ];
  assert.equal(addOnsTotal(addOns), 4945);
  assert.equal(quoteTotal({ cc }, addOns), 4985);
});

test("estimated total with every option changed", () => {
  const addOns = [
    { id: "cpd" },
    { id: "live-experience", options: { groupId: "100", days: 2 } },
    { id: "assembly", options: { quantity: 2 } },
  ];
  assert.equal(addOnsTotal(addOns), 6475);
  assert.equal(quoteTotal({ cc: { total: 720 } }, addOns), 7195);
  assert.equal(quoteTotal({ gcse: { total: 3900 } }, []), 3900);
  assert.equal(quoteTotal({ cc: { total: 720 }, gcse: { total: 3900 } }, [{ id: "online-experience" }]), 5615);
});

test("summary labels and HubSpot details line", () => {
  assert.equal(addOnLineLabel("cpd"), "CPD × 1");
  assert.equal(addOnLineLabel("cpd", { quantity: 2 }), "CPD × 2");
  assert.equal(addOnLineLabel("online-experience", { quantity: 3 }), "Online Experience × 3");
  assert.equal(addOnLineLabel("live-experience", { groupId: "100", days: 2 }), "Live Experience · up to 100 students · 2 days");
  assert.equal(addOnLineLabel("live-experience", { groupId: "50", days: 1 }), "Live Experience · up to 50 students · 1 day");
  assert.equal(addOnLineLabel("assembly", { quantity: 2 }), "Assembly × 2");
  assert.equal(
    addOnDetails([
      { id: "cpd" },
      { id: "live-experience", options: { groupId: "100", days: 2 } },
      { id: "assembly", options: { quantity: 2 } },
    ]),
    "CPD × 1 £1,975; Live Experience up to 100 students × 2 days £3,600; Assembly × 2 £900"
  );
  assert.equal(
    addOnDetails([
      { id: "cpd", options: { quantity: 2 } },
      { id: "online-experience", options: { quantity: 1 } },
      { id: "live-experience", options: { groupId: "100", days: 2 } },
      { id: "assembly", options: { quantity: 2 } },
    ]),
    "CPD × 2 £3,950; Online Experience × 1 £995; Live Experience up to 100 students × 2 days £3,600; Assembly × 2 £900"
  );
});
