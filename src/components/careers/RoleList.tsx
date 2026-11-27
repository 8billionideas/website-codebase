"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import { Download } from "lucide-react";
import ModalShell from "@/components/layout/ModalShell";
import Button from "@/components/ui/Button";
import RoleCard, { RoleTags, roleNumber } from "@/components/careers/RoleCard";
import { CAREERS_EMAIL, rolePdfLink, type CareerRole } from "@/content/careers";

// A list of role cards on /careers and the pop-out they open. Opening a card sets the URL hash to the
// role's id (#studio-manager) and closing clears it, both without adding history entries; loading
// /careers with a matching hash (or changing to one) opens that role. The pop-out is a centred dialog
// from 640px and a nearly full-height bottom sheet below, via ModalShell (focus trap, Escape, scroll
// lock, focus back to the card).
export default function RoleList({
  roles,
  numbered,
  className,
}: {
  roles: CareerRole[];
  numbered: boolean;
  className: string;
}) {
  const [openId, setOpenId] = useState<string | null>(null);
  // The role shown in the pop-out; kept while it animates out.
  const [shownId, setShownId] = useState<string | null>(null);
  const triggers = useRef<Record<string, HTMLButtonElement | null>>({});
  const headingRef = useRef<HTMLHeadingElement>(null);
  const titleId = useId();

  const open = useCallback((id: string) => {
    setOpenId(id);
    setShownId(id);
  }, []);

  // Follow the hash: on load, and when it changes (e.g. a shared link or the address bar).
  useEffect(() => {
    const ids = roles.map((role) => role.id);
    const syncWithHash = () => {
      const hash = window.location.hash.slice(1);
      if (ids.includes(hash)) open(hash);
      else setOpenId((current) => (current && !hash ? null : current));
    };
    syncWithHash();
    window.addEventListener("hashchange", syncWithHash);
    return () => window.removeEventListener("hashchange", syncWithHash);
  }, [roles, open]);

  function openRole(id: string) {
    open(id);
    window.history.replaceState(window.history.state, "", `#${id}`);
  }

  function close() {
    setOpenId(null);
    const { pathname, search } = window.location;
    window.history.replaceState(window.history.state, "", `${pathname}${search}`);
  }

  const index = roles.findIndex((role) => role.id === shownId);
  const role = index >= 0 ? roles[index] : null;
  const number = numbered && role ? index + 1 : null;

  return (
    <>
      <ol className={`list-none p-0 ${className}`}>
        {roles.map((item, i) => (
          <RoleCard
            key={item.id}
            ref={(el) => {
              triggers.current[item.id] = el;
            }}
            role={item}
            number={numbered ? i + 1 : null}
            onOpen={() => openRole(item.id)}
          />
        ))}
      </ol>

      <ModalShell
        open={openId !== null}
        onClose={close}
        labelledBy={titleId}
        initialFocus={() => headingRef.current}
        returnFocusTo={() => (shownId ? triggers.current[shownId] ?? null : null)}
        panelClassName="bg-white sm:max-w-[640px]"
        variant="scroll-sheet"
        overlayOpacity={0.5}
        exitMs={200}
      >
        {role && (
          <div className="min-h-0 overflow-y-auto overscroll-contain px-6 pt-8 pb-8 sm:px-10 sm:pt-10 sm:pb-10">
            <div className="pr-10">
              {number !== null && (
                <p className="text-[14px] font-medium tracking-[0.1em] text-accent" aria-hidden="true">
                  {roleNumber(number)}
                </p>
              )}
              <h2
                ref={headingRef}
                id={titleId}
                tabIndex={-1}
                className={`${number !== null ? "mt-3" : ""} text-balance text-[28px] font-light leading-[1.15] text-ink outline-none md:text-[32px]`}
              >
                {role.title}
              </h2>
              {role.subtitle && <p className="mt-1 text-[16px] text-ink/65">{role.subtitle}</p>}
            </div>
            <RoleTags tags={role.tags} />
            <p className="mt-6 text-[17px] leading-[1.65] text-ink/80">{role.description}</p>
            <div className="mt-7 border-t border-ink/10 pt-6">
              <p className="text-[14px] leading-[1.6] text-ink/65">
                {role.applyLead}, email your CV to{" "}
                <span className="font-medium break-words text-ink/80">{CAREERS_EMAIL}</span> with “{role.emailSubject}” in
                the subject line.
              </p>
              <div className="mt-5">
                <Button
                  href={role.pdf}
                  variant="outline"
                  size="small"
                  target="_blank"
                  rel="noopener"
                  download={role.pdf.split("/").pop()}
                >
                  <Download className="h-4 w-4 shrink-0" strokeWidth={1.5} aria-hidden="true" />
                  {rolePdfLink}
                </Button>
              </div>
            </div>
          </div>
        )}
      </ModalShell>
    </>
  );
}
