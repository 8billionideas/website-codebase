"use client";

import { useId, useRef } from "react";
import { ArrowRight, Presentation, ShieldCheck, UserRound, type LucideIcon } from "lucide-react";
import ModalShell from "@/components/layout/ModalShell";
import { ADMIN_LOGIN_URL, STUDENT_LOGIN_URL, TEACHER_LOGIN_URL } from "@/lib/config";
import { trackEvent } from "@/lib/analytics";

const OPTIONS: { label: string; href: string; icon: LucideIcon }[] = [
  { label: "Student", href: STUDENT_LOGIN_URL, icon: UserRound },
  { label: "Teacher", href: TEACHER_LOGIN_URL, icon: Presentation },
  { label: "Admin", href: ADMIN_LOGIN_URL, icon: ShieldCheck },
];

export default function LoginModal({
  open,
  onClose,
  returnFocusTo,
}: {
  open: boolean;
  onClose: () => void;
  returnFocusTo: () => HTMLElement | null;
}) {
  const headingId = useId();
  const firstOptionRef = useRef<HTMLAnchorElement>(null);

  return (
    <ModalShell
      open={open}
      onClose={onClose}
      labelledBy={headingId}
      initialFocus={() => firstOptionRef.current}
      returnFocusTo={returnFocusTo}
      panelClassName="max-w-[480px] bg-paper p-7 md:p-10"
    >
      <h2 id={headingId} className="text-[32px] font-light leading-[1.15] text-ink">
        Log in
      </h2>
      <p className="mt-2 text-[16px] text-ink/65">Choose how you&apos;d like to sign in.</p>

      <ul className="mt-6 flex list-none flex-col gap-3 p-0">
        {OPTIONS.map((option, i) => (
          <li key={option.label}>
            <a
              ref={i === 0 ? firstOptionRef : undefined}
              href={option.href}
              // Beacon, so the event still reaches GA as the page unloads.
              onClick={() => trackEvent("login_click", { role: option.label.toLowerCase(), transport_type: "beacon" })}
              className="group flex w-full items-center gap-4 rounded-xl border border-ink/12 p-5 transition-colors hover:border-accent hover:bg-accent/[0.06] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2 focus-visible:ring-offset-paper"
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-accent/15">
                <option.icon className="h-[22px] w-[22px] text-ink" strokeWidth={1.5} aria-hidden="true" />
              </span>
              <span className="flex-1 text-[18px] font-normal text-ink">{option.label}</span>
              <ArrowRight
                className="h-5 w-5 shrink-0 text-ink transition-transform group-hover:translate-x-1 motion-reduce:transition-none"
                strokeWidth={1.5}
                aria-hidden="true"
              />
            </a>
          </li>
        ))}
      </ul>
    </ModalShell>
  );
}
