import { forwardRef } from "react";
import { ArrowRight } from "lucide-react";
import { roleCardLink, type CareerRole } from "@/content/careers";

export const roleNumber = (number: number | null) => (number === null ? null : String(number).padStart(2, "0"));

export function RoleTags({ tags }: { tags: string[] }) {
  return (
    <ul className="mt-4 flex list-none flex-wrap gap-2 p-0" aria-label="Role details">
      {tags.map((tag) => (
        <li key={tag} className="rounded-full border border-ink/15 px-3 py-1 text-[13px] leading-[1.4] text-ink/75">
          {tag}
        </li>
      ))}
    </ul>
  );
}

// One role on /careers (closed state): number, title, subtitle, tags, the one-line summary and
// "Find out more". The whole card opens the role's pop-out: the title is a real button whose ::after
// covers the card. Hover and keyboard focus give a 2px accent border (a 1px border plus a 1px inset
// shadow, so nothing moves) and a slight lift; the lift is skipped with reduced motion. The li's id
// is the pop-out's hash, so /careers#studio-manager scrolls to the card as the pop-out opens.
const RoleCard = forwardRef<HTMLButtonElement, { role: CareerRole; number: number | null; onOpen: () => void }>(
  function RoleCard({ role, number, onOpen }, ref) {
    return (
      <li
        id={role.id}
        className={[
          "group relative flex scroll-mt-28 cursor-pointer flex-col rounded-xl border border-ink/10 bg-white p-7 md:p-8",
          "transition-[transform,box-shadow,border-color] duration-150 ease-out motion-reduce:transition-none",
          "hover:border-accent hover:shadow-[inset_0_0_0_1px_var(--color-accent),0_10px_28px_rgba(22,33,61,0.10)] motion-safe:hover:-translate-y-0.5",
          "has-[:focus-visible]:border-accent has-[:focus-visible]:shadow-[inset_0_0_0_1px_var(--color-accent),0_10px_28px_rgba(22,33,61,0.10)] motion-safe:has-[:focus-visible]:-translate-y-0.5",
          "has-[:focus-visible]:ring-[3px] has-[:focus-visible]:ring-accent/40 has-[:focus-visible]:ring-offset-2",
        ].join(" ")}
      >
        {number !== null && (
          <p className="text-[14px] font-medium tracking-[0.1em] text-accent" aria-hidden="true">
            {roleNumber(number)}
          </p>
        )}
        <h3 className={`${number !== null ? "mt-3" : ""} text-balance text-[24px] font-light leading-[1.2] text-ink`}>
          <button
            ref={ref}
            type="button"
            aria-haspopup="dialog"
            onClick={onOpen}
            className="cursor-pointer text-left after:absolute after:inset-0 after:rounded-xl after:content-[''] focus-visible:outline-none"
          >
            {role.title}
          </button>
        </h3>
        {role.subtitle && <p className="mt-1 text-[16px] text-ink/65">{role.subtitle}</p>}
        <RoleTags tags={role.tags} />
        <p className="mt-5 text-[16px] leading-[1.6] text-ink/75">{role.summary}</p>
        <p className="mt-auto pt-6" aria-hidden="true">
          <span className="inline-flex items-center gap-1.5 text-[15px] font-medium text-accent">
            {roleCardLink}
            <ArrowRight
              className="h-4 w-4 transition-transform duration-150 group-hover:translate-x-0.5 motion-reduce:transition-none"
              strokeWidth={1.5}
            />
          </span>
        </p>
      </li>
    );
  }
);

export default RoleCard;
