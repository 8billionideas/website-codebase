// /curriculum panels (V3 developer content): 15 panels, the two held post-16 panels kept
// unpublished, and none of the document's instructions or em dashes in what's shown.
import { test } from "node:test";
import assert from "node:assert/strict";

const { subjects, STAGES } = await import("../src/content/curriculum-connections.ts");

const panels = subjects.flatMap((subject) =>
  STAGES.map(({ key }) => ({ id: `${subject.id}/${key}`, stage: subject.stages[key] }))
);
const shown = panels.filter((p) => p.stage.published);
const strings = (value) =>
  typeof value === "string" ? [value] : value && typeof value === "object" ? Object.values(value).flatMap(strings) : [];

test("five subjects × three stages, with only Maths and Science post-16 held", () => {
  assert.equal(panels.length, 15);
  assert.deepEqual(
    panels.filter((p) => !p.stage.published).map((p) => p.id),
    ["maths/post16", "science/post16"]
  );
});

test("published panels have every field the card shows", () => {
  for (const { id, stage } of shown) {
    for (const field of [stage.summary, stage.eyebrow, stage.heading, stage.fit, stage.explore.programme]) {
      assert.ok(field?.trim(), `${id}: empty field`);
    }
    assert.ok(stage.learning.headline && stage.learning.text, `${id}: learning`);
    assert.ok(stage.application.headline && stage.application.text, `${id}: application`);
    assert.ok(stage.skills.length > 0, `${id}: skills`);
    assert.match(stage.source.url, /^https:\/\/www\.gov\.uk\//, `${id}: source`);
    assert.match(stage.source.label, /^Source: .+ \(GOV\.UK\)$/, `${id}: source label`);
  }
});

test("no em dashes, and none of the document's instructions to us", () => {
  for (const { id, stage } of panels) {
    for (const text of strings(stage)) {
      assert.ok(!text.includes("—"), `${id}: em dash in "${text}"`);
      assert.ok(!/(^|\. )Do not\b/.test(text), `${id}: "Do not…" in "${text}"`);
      assert.ok(!text.includes("subject to current availability confirmation"), `${id}: availability note`);
    }
  }
});
