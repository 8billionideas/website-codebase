import { CAREERS_EMAIL, type CareerRole } from "@/content/careers";

// One role on /careers: number, title, subtitle, tags and description, then (below a thin divider)
// how to apply. The email address is plain, selectable text, not a link.
export default function RoleCard({ role, number }: { role: CareerRole; number: number }) {
  return (
    <li className="flex flex-col rounded-xl border border-ink/10 bg-white p-7 md:p-8">
      <p className="text-[14px] font-medium tracking-[0.1em] text-accent" aria-hidden="true">
        {String(number).padStart(2, "0")}
      </p>
      <h3 className="mt-3 text-balance text-[24px] font-light leading-[1.2] text-ink">{role.title}</h3>
      {role.subtitle && <p className="mt-1 text-[16px] text-ink/65">{role.subtitle}</p>}
      <ul className="mt-4 flex list-none flex-wrap gap-2 p-0" aria-label="Role details">
        {role.tags.map((tag) => (
          <li key={tag} className="rounded-full border border-ink/15 px-3 py-1 text-[13px] leading-[1.4] text-ink/75">
            {tag}
          </li>
        ))}
      </ul>
      <p className="mt-5 text-[16px] leading-[1.6] text-ink/75">{role.description}</p>
      <p className="mt-auto pt-6">
        <span className="block border-t border-ink/10 pt-5 text-[14px] leading-[1.6] text-ink/65">
          {role.applyLead}, email your CV to{" "}
          <span className="font-medium break-words text-ink/80">{CAREERS_EMAIL}</span> with “{role.emailSubject}” in the
          subject line.
        </span>
      </p>
    </li>
  );
}
