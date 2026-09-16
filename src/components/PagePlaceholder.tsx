import { PageContent } from "@/content/types";

export default function PagePlaceholder({ title, description }: PageContent) {
  return (
    <div className="mx-auto max-w-[75rem] px-6 py-24 md:px-12">
      <h1 className="text-display text-ink">{title}</h1>
      <p className="mt-4 text-body-lg text-muted">{description}</p>
    </div>
  );
}
