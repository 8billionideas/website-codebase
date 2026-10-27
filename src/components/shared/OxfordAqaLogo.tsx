import Image from "next/image";

// The official OxfordAQA logos, both transparent and never recoloured:
// - "light" (light sections): the navy logo (oxfordaqa-logo.webp, 2319×553), from the supplied
//   transparent PNG ("Oxfordaqa Logo.png") trimmed to a 2% margin, pixels unchanged. "AQA" is
//   knocked out of the navy box, so it shows the section colour.
// - "dark" (dark sections): the white logo (oxfordaqa-logo-white.webp, 999×230), from the supplied
//   white-on-navy square ("OxfordAQA International Qualifications.png"), cropped to an even 1%
//   (10px) margin with the navy keyed out: every pixel is white, with the alpha from its brightness,
//   so the edges stay anti-aliased with no dark fringe. "AQA" is knocked out of the white box, so it
//   shows the section colour. No tile or blend needed for either.
// width is the rendered logo width in px (at least 140, so "International Qualifications" stays
// legible). A caller can set --oxfordaqa-logo-width in its className to change it at a breakpoint
// (e.g. a narrow column), and it never drops below 140px.
const LOGOS = {
  light: { src: "/images/partners/oxfordaqa-logo.webp", width: 2319, height: 553 },
  dark: { src: "/images/partners/oxfordaqa-logo-white.webp", width: 999, height: 230 },
} as const;

export default function OxfordAqaLogo({
  width,
  variant,
  className = "",
}: {
  width: number;
  variant: keyof typeof LOGOS;
  className?: string;
}) {
  const logo = LOGOS[variant];
  return (
    // w-max: only as wide as the logo, so a caller's mx-auto centres it (a full-width wrapper
    // left-aligned the block image inside it).
    <div className={`w-max ${className}`}>
      <Image
        src={logo.src}
        alt="OxfordAQA International Qualifications"
        width={logo.width}
        height={logo.height}
        sizes={`${Math.max(140, width)}px`}
        className="block h-auto max-w-none"
        style={{ width: `max(140px, var(--oxfordaqa-logo-width, ${Math.max(140, width)}px))` }}
      />
    </div>
  );
}
