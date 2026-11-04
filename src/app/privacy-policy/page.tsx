import type { Metadata } from "next";
import Link from "next/link";
import Container from "@/components/layout/Container";
import {
  cookiesSection,
  policySections,
  privacyPolicy,
  type Inline,
  type PolicyBlock,
  type PolicyListItem,
  type Rich,
} from "@/content/privacy-policy";

// Privacy and cookies notice: a narrow, left-aligned reading column with a contents list of anchor
// links. Copy lives in src/content/privacy-policy.ts. No robots override, so it follows the
// site-wide setting (indexable once the site is).
export const metadata: Metadata = {
  title: "Privacy Policy | 8billionideas",
  description: "How 8billionideas collects, uses and protects your personal information, and how we use cookies.",
};

const LINK =
  "font-medium underline underline-offset-2 hover:text-ink/70 focus-visible:rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent";
const BODY = "text-[17px] leading-[1.7] text-ink";
const H2 = "scroll-mt-24 text-balance text-[26px] font-light leading-[1.2] tracking-[-0.01em] text-ink md:text-[32px]";
// The "(Short answer: …)" line under each heading.
const SHORT_ANSWER = "mt-2 text-[18px] italic leading-[1.5] text-accent";

function InlineText({ content }: { content: Rich }) {
  const parts: Inline[] = typeof content === "string" ? [content] : content;
  return (
    <>
      {parts.map((part, i) => {
        if (typeof part === "string") return part;
        if (part.href.startsWith("/")) {
          return (
            <Link key={i} href={part.href} className={LINK}>
              {part.text}
            </Link>
          );
        }
        if (part.href.startsWith("mailto:")) {
          return (
            <a key={i} href={part.href} className={LINK}>
              {part.text}
            </a>
          );
        }
        return (
          <a key={i} href={part.href} target="_blank" rel="noopener noreferrer" className={`${LINK} break-words`}>
            {part.text}
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
        );
      })}
    </>
  );
}

function List({ items, nested = false }: { items: PolicyListItem[]; nested?: boolean }) {
  return (
    <ul className={`${nested ? "mt-2 list-[circle]" : "mt-4 list-disc"} space-y-2 pl-6 ${BODY}`}>
      {items.map((item, i) => (
        <li key={i} className="pl-1">
          {typeof item === "object" && !Array.isArray(item) ? (
            <>
              <InlineText content={item.content} />
              <List items={item.items} nested />
            </>
          ) : (
            <InlineText content={item} />
          )}
        </li>
      ))}
    </ul>
  );
}

function Block({ block }: { block: PolicyBlock }) {
  if (block.type === "h3") {
    return <h3 className="mt-6 text-[17px] font-semibold leading-[1.4] text-ink">{block.text}</h3>;
  }
  if (block.type === "ul") return <List items={block.items} />;
  return (
    <p className={`mt-4 ${BODY}`}>
      <InlineText content={block.content} />
    </p>
  );
}

export default function PrivacyPolicyPage() {
  const contents = [...policySections, cookiesSection].map(({ id, heading }) => ({ id, heading }));

  return (
    <section className="bg-paper py-section">
      <Container>
        <div className="max-w-[720px]">
          <h1 className="text-[40px] font-light leading-[1.1] tracking-[-0.01em] text-ink md:text-[52px]">
            {privacyPolicy.title}
          </h1>
          <p className="mt-3 text-[16px] text-ink/70">{privacyPolicy.company}</p>

          <nav aria-labelledby="privacy-contents" className="mt-content">
            <h2 id="privacy-contents" className="text-[12px] uppercase tracking-[0.25em] text-ink/70">
              {privacyPolicy.contentsLabel}
            </h2>
            <ol className="mt-4 list-decimal space-y-2 pl-6 text-[16px] leading-[1.5] text-ink">
              {contents.map(({ id, heading }) => (
                <li key={id} className="pl-1">
                  <a href={`#${id}`} className={LINK}>
                    {heading}
                  </a>
                </li>
              ))}
            </ol>
          </nav>

          {policySections.map((section) => (
            <div key={section.id} className="mt-content">
              <h2 id={section.id} className={H2}>
                {section.heading}
              </h2>
              <p className={SHORT_ANSWER}>{section.shortAnswer}</p>
              {section.blocks.map((block, i) => (
                <Block key={i} block={block} />
              ))}
            </div>
          ))}

          {/* DRAFT – needs sign-off: the Cookies section (see cookiesSection in
              src/content/privacy-policy.ts for how it was audited). */}
          <div className="mt-content">
            <h2 id={cookiesSection.id} className={H2}>
              {cookiesSection.heading}
            </h2>
            <p className={SHORT_ANSWER}>{cookiesSection.shortAnswer}</p>
            <p className={`mt-4 ${BODY}`}>{cookiesSection.intro}</p>
            {/* Scrolls sideways inside its own box on narrow screens, never the page. */}
            <div
              role="region"
              aria-label="Cookies we use"
              tabIndex={0}
              className="mt-6 overflow-x-auto rounded-sm border border-ink/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              <table className="w-full min-w-[640px] border-collapse text-left text-[15px] leading-[1.5] text-ink">
                <thead className="bg-ink/[0.04]">
                  <tr>
                    {cookiesSection.columns.map((column) => (
                      <th key={column} scope="col" className="border-b border-ink/15 px-4 py-3 font-semibold">
                        {column}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {cookiesSection.rows.map((row) => (
                    <tr key={row.name} className="border-b border-ink/10 align-top last:border-b-0">
                      <th scope="row" className="px-4 py-3 font-medium break-all">
                        {row.name}
                      </th>
                      <td className="px-4 py-3">{row.provider}</td>
                      <td className="px-4 py-3">{row.purpose}</td>
                      <td className="px-4 py-3">{row.duration}</td>
                      <td className="px-4 py-3">{row.type}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <p className={`mt-content ${BODY}`}>{privacyPolicy.issued}</p>
        </div>
      </Container>
    </section>
  );
}
