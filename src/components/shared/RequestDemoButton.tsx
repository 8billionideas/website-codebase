import Link from "next/link";
import { ArrowRight } from "lucide-react";

const DEMO_HREF = "#book-a-demo";

export default function RequestDemoButton({ className = "" }: { className?: string }) {
  return (
    <Link
      href={DEMO_HREF}
      className={`inline-flex w-full items-center justify-center gap-2 rounded-full bg-accent px-6 py-3 text-body font-medium text-ink transition-colors hover:bg-ink hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2 md:w-auto ${className}`}
    >
      Request a demo
      <ArrowRight className="h-4 w-4" aria-hidden="true" />
    </Link>
  );
}
