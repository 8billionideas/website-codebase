import Link from "next/link";
import { ReactNode } from "react";

const VARIANT_STYLES = {
  // For use on paper/surface (light) backgrounds.
  light: "border-ink/20 text-ink hover:border-brand hover:text-brand",
  // For use on the ink (dark) background, e.g. the final CTA band.
  dark: "border-white/30 text-white hover:border-white/60",
};

export default function SecondaryCTA({
  href,
  children,
  variant = "light",
  className,
}: {
  href: string;
  children: ReactNode;
  variant?: keyof typeof VARIANT_STYLES;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={`inline-flex items-center justify-center rounded-full border px-6 py-3 text-body font-medium transition-colors ${VARIANT_STYLES[variant]} ${className ?? ""}`}
    >
      {children}
    </Link>
  );
}
