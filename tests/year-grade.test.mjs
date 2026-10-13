// Run with: npm test   (Node's built-in test runner; Node strips the TypeScript types.)
import { test } from "node:test";
import assert from "node:assert/strict";
import { formatLevel, formatLevelUpper, formatLevelRange, formatLevelShort } from "../src/lib/year-grade.ts";

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

test("ranges in both modes", () => {
  assert.equal(formatLevelRange(1, 6, "years"), "Years 1–6");
  assert.equal(formatLevelRange(7, 11, "years"), "Years 7–11");
  assert.equal(formatLevelRange(12, 13, "years"), "Years 12–13");
  assert.equal(formatLevelRange(1, 6, "grades"), "Kindergarten–Grade 5");
  assert.equal(formatLevelRange(7, 11, "grades"), "Grades 6–10");
  assert.equal(formatLevelRange(12, 13, "grades"), "Grades 11–12");
  assert.equal(formatLevelRange(1, 2, "grades"), "Kindergarten–Grade 1");
  assert.equal(formatLevelRange(7, 9, "grades"), "Grades 6–8");
  assert.equal(formatLevelRange(9, 9, "grades"), "Grade 8");
  assert.equal(formatLevelRange(6, 6, "years"), "Year 6");
});

test("short labels for pills", () => {
  assert.equal(formatLevelShort(1, "years"), "1");
  assert.equal(formatLevelShort(13, "years"), "13");
  assert.equal(formatLevelShort(1, "grades"), "K");
  assert.equal(formatLevelShort(7, "grades"), "6");
  assert.equal(formatLevelShort(13, "grades"), "12");
});
