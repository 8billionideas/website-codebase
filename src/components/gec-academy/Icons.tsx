// The 8billionideas dot mark (eight circles, as in the source page), for the ask card and the
// pillar picker on /gec-academy.
export const MARK_DOTS: [number, number][] = [
  [60, 18],
  [148, 18],
  [18, 62],
  [60, 62],
  [104, 62],
  [148, 62],
  [104, 106],
  [148, 106],
];

// The logo's dot green.
export const MARK_GREEN = "#26C794";

export function MarkIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 190 125" fill={MARK_GREEN} aria-hidden="true" className={className}>
      {MARK_DOTS.map(([cx, cy]) => (
        <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="17" />
      ))}
    </svg>
  );
}
