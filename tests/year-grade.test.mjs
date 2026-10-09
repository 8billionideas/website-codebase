// Run with: npm test   (Node's built-in test runner; Node strips the TypeScript types.)
import { test } from "node:test";
import assert from "node:assert/strict";
import { formatLevel, formatLevelUpper } from "../src/lib/year-grade.ts";

test("years mode keeps UK year groups", () => {
  assert.equal(formatLevel(1, "years"), "Year 1");
  assert.equal(formatLevel(7, "years"), "Year 7");
  assert.equal(formatLevel(13, "years"), "Year 13");
});

test("grades mode: Year 1 is Kindergarten, Year N is Grade N-1", () => {
  const cases = [
    [1, "Kindergarten"],
    [2, "Grade 1"],
    [3, "Grade 2"],
    [7, "Grade 6"],
    [10, "Grade 9"],
    [13, "Grade 12"],
  ];
  for (const [year, expected] of cases) assert.equal(formatLevel(year, "grades"), expected);
});

test("upper-case variants for eyebrows", () => {
  assert.equal(formatLevelUpper(7, "years"), "YEAR 7");
  assert.equal(formatLevelUpper(7, "grades"), "GRADE 6");
  assert.equal(formatLevelUpper(1, "grades"), "KINDERGARTEN");
});
