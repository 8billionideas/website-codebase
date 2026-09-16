import Link from "next/link";
import { ReactNode } from "react";

export default function PrimaryCTA({
  href,
  children,
  className,
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={`inline-flex items-center justify-center rounded-full bg-brand px-6 py-3 text-body font-medium text-white transition-opacity hover:opacity-90 ${className ?? ""}`}
    >
      {children}
    </Link>
  );
}
