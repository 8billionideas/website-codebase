import Link from "next/link";
import type { CaseStudy } from "@/lib/case-studies";

export default function CaseStudyCard({ study }: { study: CaseStudy }) {
  return (
    <Link
      href={`/case-studies/${study.slug}`}
      className="group flex h-full flex-col rounded-2xl border border-ink/10 p-7 transition-all duration-200 hover:-translate-y-1 hover:shadow-lg"
    >
      <span className="inline-flex w-fit items-center rounded-full border border-accent px-3 py-1 text-caption text-ink">
        {study.card?.label ?? study.tag}
      </span>
      <p className="mt-4 text-[20px] font-normal text-ink">{study.card?.name ?? study.name}</p>
      {study.location && <p className="mt-1 text-[14px] text-muted">{study.location}</p>}
      {study.headlineFact && <p className="mt-3 text-[15px] font-medium text-accent">{study.headlineFact}</p>}
      <p className="mt-2 text-[15px] leading-[1.6] text-ink/75">{study.summary}</p>
      <span className="mt-auto pt-4 text-[15px] font-medium text-ink underline decoration-transparent underline-offset-2 transition-colors group-hover:decoration-ink">
        Read the case study →
      </span>
    </Link>
  );
}
