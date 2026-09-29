import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import Container from "@/components/layout/Container";
import { Eyebrow } from "@/components/home/SectionHeading";

export const metadata: Metadata = {
  title: "Blog | 8billionideas",
};

export default function BlogPage() {
  return (
    <div className="bg-paper py-16 md:py-24">
      <Container>
        <Eyebrow variant="light">BLOG</Eyebrow>
        <h1 className="mt-4 text-[36px] font-light leading-[1.1] tracking-[-0.01em] text-ink md:text-[56px]">
          Blog
        </h1>
        <p className="mt-6 max-w-[640px] text-[18px] leading-[1.6] text-ink/75">
          Coming soon.
        </p>
        <div className="mt-8">
          <Link
            href="#book-a-demo"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-accent px-6 py-3 text-body font-medium text-ink transition-colors hover:bg-ink hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2"
          >
            Request a demo
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </Container>
    </div>
  );
}
