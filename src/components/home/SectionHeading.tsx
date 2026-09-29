import { ReactNode } from "react";

// Shared visual language for homepage Sections 5 and 6, so a dark section
// (ink background) and a light section (paper background) read as one
// family. `variant` picks the colour set; every other value (size, weight,
// tracking, line-height) is identical across both.
export type SectionVariant = "light" | "dark";

const HEADING_COLOR: Record<SectionVariant, string> = {
  light: "text-ink",
  dark: "text-white",
};
const BODY_COLOR: Record<SectionVariant, string> = {
  light: "text-ink/75",
  dark: "text-white/75",
};
const MUTED_COLOR: Record<SectionVariant, string> = {
  light: "text-ink/55",
  dark: "text-white/55",
};
const LINE_COLOR: Record<SectionVariant, string> = {
  light: "bg-ink",
  dark: "bg-white",
};

export function SectionMarker({
  number,
  variant,
}: {
  number: string;
  variant: SectionVariant;
}) {
  return (
    <div>
      <p className={`text-[12px] font-medium tracking-[0.1em] ${MUTED_COLOR[variant]}`}>
        {number}
      </p>
      <div className={`mt-2 h-12 w-px ${LINE_COLOR[variant]}`} aria-hidden="true" />
    </div>
  );
}

export function Eyebrow({
  children,
  variant,
  className = "",
}: {
  children: ReactNode;
  variant: SectionVariant;
  className?: string;
}) {
  return (
    <p className={`text-[12px] uppercase tracking-[0.25em] ${MUTED_COLOR[variant]} ${className}`}>
      {children}
    </p>
  );
}

export function SectionH2({
  children,
  variant,
  className = "",
}: {
  children: ReactNode;
  variant: SectionVariant;
  className?: string;
}) {
  return (
    <h2
      className={`text-[40px] font-light leading-[1.1] tracking-[-0.01em] md:text-[64px] ${HEADING_COLOR[variant]} ${className}`}
    >
      {children}
    </h2>
  );
}

export function SectionBody({
  children,
  variant,
  className = "",
}: {
  children: ReactNode;
  variant: SectionVariant;
  className?: string;
}) {
  return (
    <p className={`max-w-[560px] text-[18px] leading-[1.6] ${BODY_COLOR[variant]} ${className}`}>
      {children}
    </p>
  );
}

export function Tagline({
  lines,
  variant,
  className = "",
}: {
  lines: string[];
  variant: SectionVariant;
  className?: string;
}) {
  return (
    <div className={`flex items-start gap-4 ${className}`}>
      <div className={`mt-1 h-12 w-px opacity-40 ${LINE_COLOR[variant]}`} aria-hidden="true" />
      <div className={`space-y-1 text-[12px] uppercase tracking-[0.25em] ${MUTED_COLOR[variant]}`}>
        {lines.map((line) => (
          <p key={line}>{line}</p>
        ))}
      </div>
    </div>
  );
}
