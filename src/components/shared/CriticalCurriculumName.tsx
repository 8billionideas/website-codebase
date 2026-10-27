import { Fragment, type ReactNode } from "react";

// The programme's name in body text: always "The Critical Curriculum" (capital T, even
// mid-sentence) and in italics, in the surrounding text's colour (Marketing, October 2026).
// Headings, pricing labels, buttons and form options keep their own styling.
const NAME = "The Critical Curriculum";

export default function CriticalCurriculumName() {
  return <em className="italic">{NAME}</em>;
}

// For copy that comes from content files as plain strings: renders every "The Critical
// Curriculum" in the text with <CriticalCurriculumName />.
export function withCriticalCurriculum(text: string): ReactNode {
  const parts = text.split(NAME);
  if (parts.length === 1) return text;
  return parts.map((part, i) => (
    <Fragment key={i}>
      {part}
      {i < parts.length - 1 && <CriticalCurriculumName />}
    </Fragment>
  ));
}
