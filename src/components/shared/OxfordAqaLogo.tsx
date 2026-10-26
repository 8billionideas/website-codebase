import Image from "next/image";

// The official OxfordAQA logo (public/images/partners/oxfordaqa-logo.webp, 2319×553): the
// supplied transparent PNG ("Oxfordaqa Logo.png") trimmed to a 2% margin, pixels unchanged. Its
// background is transparent and "AQA" is knocked out of the navy box. Never recoloured.
// width is the rendered logo width in px (at least 140, so "International Qualifications" stays
// legible). A caller can set --oxfordaqa-logo-width in its className to change it at a breakpoint
// (e.g. a narrow column), and it never drops below 140px.
// - "light": straight onto light sections (no tile or blend needed: it's transparent).
// - "tile": on dark sections, on a small white tile (the navy lettering would disappear).
export default function OxfordAqaLogo({
  width,
  variant,
  className = "",
}: {
  width: number;
  variant: "light" | "tile";
  className?: string;
}) {
  const logo = (
    <Image
      src="/images/partners/oxfordaqa-logo.webp"
      alt="OxfordAQA International Qualifications"
      width={2319}
      height={553}
      sizes={`${Math.max(140, width)}px`}
      className="block h-auto max-w-none"
      style={{ width: `max(140px, var(--oxfordaqa-logo-width, ${Math.max(140, width)}px))` }}
    />
  );
  if (variant === "light") return <div className={className}>{logo}</div>;
  // Replace with OxfordAQA's official reversed (white) logo when supplied.
  return <div className={`w-max rounded-lg bg-white px-4 py-3 ${className}`}>{logo}</div>;
}
