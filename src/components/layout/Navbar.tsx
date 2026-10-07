"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight, Menu, X } from "lucide-react";
import { navItems, type NavItem } from "@/content/nav";
import LoginModal from "@/components/layout/LoginModal";
import DemoTrigger from "@/components/demo/DemoTrigger";

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
      className={`text-accent transition-transform duration-200 ${
        open ? "rotate-180" : ""
      }`}
    >
      <path
        d="M3 6l5 5 5-5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function isItemActive(item: NavItem, pathname: string) {
  if (item.href) return pathname === item.href || pathname.startsWith(`${item.href}/`);
  if (item.activeOn) return item.activeOn.includes(pathname);
  return false;
}

function navLinkClass(active: boolean) {
  return `font-normal transition-colors hover:text-brand ${
    active ? "text-brand" : "text-muted"
  }`;
}

function DemoButton({
  className = "",
  onBeforeOpen,
  returnFocusTo,
}: {
  className?: string;
  onBeforeOpen?: () => void;
  returnFocusTo?: () => HTMLElement | null;
}) {
  return (
    <DemoTrigger
      onBeforeOpen={onBeforeOpen}
      returnFocusTo={returnFocusTo}
      className={`inline-flex items-center justify-center gap-2 rounded-full bg-accent px-6 py-3 text-body font-medium text-ink transition-colors hover:bg-ink hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2 ${className}`}
    >
      Request a demo
      <ArrowRight className="h-4 w-4" aria-hidden="true" />
    </DemoTrigger>
  );
}

export default function Navbar() {
  const pathname = usePathname();
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const desktopNavRef = useRef<HTMLDivElement>(null);
  const [loginOpen, setLoginOpen] = useState(false);
  const desktopLoginRef = useRef<HTMLButtonElement>(null);
  const menuToggleRef = useRef<HTMLButtonElement>(null);
  // The mobile Login button unmounts with the menu, so focus returns to the menu toggle.
  const loginOpenedFrom = useRef<"desktop" | "mobile">("desktop");
  const loginReturnFocus = useCallback(
    () => (loginOpenedFrom.current === "mobile" ? menuToggleRef.current : desktopLoginRef.current),
    []
  );

  // Closes whichever desktop dropdown is open when a click lands outside
  // the desktop nav group entirely.
  useEffect(() => {
    function handlePointerDown(event: MouseEvent) {
      if (desktopNavRef.current && !desktopNavRef.current.contains(event.target as Node)) {
        setOpenDropdown(null);
      }
    }
    document.addEventListener("mousedown", handlePointerDown);
    return () => document.removeEventListener("mousedown", handlePointerDown);
  }, []);

  function closeMobile() {
    setMobileOpen(false);
    setMobileExpanded(null);
  }

  return (
    <header className="border-b border-surface bg-paper">
      <nav className="mx-auto flex max-w-[75rem] items-center justify-between px-6 py-5 md:px-12">
        <Link href="/" className="shrink-0" onClick={closeMobile}>
          <Image
            src="/logo.png"
            alt="8billionideas"
            width={154}
            height={52}
            priority
            className="h-9 w-auto md:h-[52px]"
          />
        </Link>

        {/* Desktop nav — hidden below xl, where it's replaced by the mobile menu. */}
        <div ref={desktopNavRef} className="hidden xl:flex xl:items-center xl:gap-8">
          <ul className="flex items-center gap-6 text-body">
            {navItems.map((item) => {
              if (item.items) {
                const open = openDropdown === item.label;
                const active = isItemActive(item, pathname);
                return (
                  <li
                    key={item.label}
                    className="relative"
                    onKeyDown={(event) => {
                      if (event.key === "Escape") {
                        setOpenDropdown(null);
                        (event.currentTarget.querySelector("button") as HTMLElement | null)?.focus();
                      }
                    }}
                  >
                    <button
                      type="button"
                      onClick={() => setOpenDropdown(open ? null : item.label)}
                      onKeyDown={(event) => {
                        if (event.key === "Enter" || event.key === " ") {
                          event.preventDefault();
                          setOpenDropdown(open ? null : item.label);
                        }
                      }}
                      aria-expanded={open}
                      aria-haspopup="true"
                      className={`flex items-center gap-1 ${navLinkClass(active)}`}
                    >
                      {item.label}
                      <ChevronIcon open={open} />
                    </button>

                    {open && (
                      <ul className="absolute left-0 top-full z-10 w-48 rounded-lg border border-ink/10 bg-paper py-2 shadow-lg">
                        {item.items.map((sub) => (
                          <li key={sub.href}>
                            <Link
                              href={sub.href}
                              onClick={() => setOpenDropdown(null)}
                              className="block px-4 py-2 font-normal text-muted transition-colors hover:text-brand"
                            >
                              {sub.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                );
              }

              const active = isItemActive(item, pathname);
              return (
                <li key={item.href}>
                  <Link href={item.href as string} className={navLinkClass(active)}>
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-6 text-body">
            <button
              ref={desktopLoginRef}
              type="button"
              aria-haspopup="dialog"
              onClick={() => {
                loginOpenedFrom.current = "desktop";
                setLoginOpen(true);
              }}
              className="font-normal text-muted transition-colors hover:text-brand"
            >
              Login
            </button>
            <DemoButton />
          </div>
        </div>

        {/* Mobile menu toggle — hidden at xl and above. */}
        <button
          ref={menuToggleRef}
          type="button"
          onClick={() => setMobileOpen((value) => !value)}
          aria-expanded={mobileOpen}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          className="flex h-10 w-10 items-center justify-center text-ink xl:hidden"
        >
          {mobileOpen ? (
            <X className="h-6 w-6" aria-hidden="true" />
          ) : (
            <Menu className="h-6 w-6" aria-hidden="true" />
          )}
        </button>
      </nav>

      {/* Mobile menu panel */}
      {mobileOpen && (
        <div className="border-t border-surface bg-paper px-6 py-6 xl:hidden">
          <ul className="flex flex-col text-body">
            {navItems.map((item) => {
              if (item.items) {
                const expanded = mobileExpanded === item.label;
                const active = isItemActive(item, pathname);
                return (
                  <li key={item.label}>
                    <button
                      type="button"
                      onClick={() => setMobileExpanded(expanded ? null : item.label)}
                      onKeyDown={(event) => {
                        if (event.key === "Enter" || event.key === " ") {
                          event.preventDefault();
                          setMobileExpanded(expanded ? null : item.label);
                        }
                      }}
                      aria-expanded={expanded}
                      className={`flex w-full items-center justify-between py-3 ${navLinkClass(active)}`}
                    >
                      {item.label}
                      <ChevronIcon open={expanded} />
                    </button>
                    {expanded && (
                      <ul className="ml-4 flex flex-col border-l border-ink/10 pl-4">
                        {item.items.map((sub) => (
                          <li key={sub.href}>
                            <Link
                              href={sub.href}
                              onClick={closeMobile}
                              className="block py-2 font-normal text-muted transition-colors hover:text-brand"
                            >
                              {sub.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                );
              }

              const active = isItemActive(item, pathname);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href as string}
                    onClick={closeMobile}
                    className={`block py-3 ${navLinkClass(active)}`}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="mt-4 flex flex-col gap-4 border-t border-surface pt-4">
            <button
              type="button"
              aria-haspopup="dialog"
              onClick={() => {
                closeMobile();
                loginOpenedFrom.current = "mobile";
                setLoginOpen(true);
              }}
              className="text-left font-normal text-muted transition-colors hover:text-brand"
            >
              Login
            </button>
            {/* The mobile menu (and this button) closes first, so focus returns to the menu toggle. */}
            <DemoButton className="w-full" onBeforeOpen={closeMobile} returnFocusTo={() => menuToggleRef.current} />
          </div>
        </div>
      )}

      <LoginModal open={loginOpen} onClose={() => setLoginOpen(false)} returnFocusTo={loginReturnFocus} />
    </header>
  );
}
