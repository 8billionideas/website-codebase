"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { navItems, type NavItem } from "@/content/nav";
import LoginModal from "@/components/layout/LoginModal";
import DemoTrigger from "@/components/demo/DemoTrigger";
import Logo from "@/components/layout/Logo";

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

// How long the dropdown waits after the pointer leaves before closing, so a
// slightly wandering mouse doesn't snap it shut.
const CLOSE_DELAY_MS = 150;

function DesktopDropdown({
  item,
  open,
  active,
  onOpenChange,
}: {
  item: NavItem;
  open: boolean;
  active: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLUListElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  // A hover-opened menu stays open on the first click, so a mouse user who
  // hovers then clicks "About" doesn't close the menu they just saw appear.
  const openedByHover = useRef(false);

  const cancelClose = useCallback(() => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  }, []);

  useEffect(() => cancelClose, [cancelClose]);

  function links() {
    return Array.from(panelRef.current?.querySelectorAll<HTMLAnchorElement>("a") ?? []);
  }

  function focusItem(index: number) {
    const all = links();
    if (all.length) all[(index + all.length) % all.length].focus();
  }

  function openAndFocus(index: number) {
    openedByHover.current = false;
    onOpenChange(true);
    // The panel mounts on the next render.
    requestAnimationFrame(() => focusItem(index));
  }

  return (
    <li
      className="relative"
      onPointerEnter={(event) => {
        if (event.pointerType !== "mouse") return;
        cancelClose();
        if (!open) {
          openedByHover.current = true;
          onOpenChange(true);
        }
      }}
      onPointerLeave={(event) => {
        if (event.pointerType !== "mouse") return;
        cancelClose();
        closeTimer.current = setTimeout(() => onOpenChange(false), CLOSE_DELAY_MS);
      }}
      onBlur={(event) => {
        // Tabbing out of the trigger and its links closes the menu.
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) onOpenChange(false);
      }}
      onKeyDown={(event) => {
        if (event.key === "Escape" && open) {
          event.preventDefault();
          onOpenChange(false);
          triggerRef.current?.focus();
        }
      }}
    >
      <button
        ref={triggerRef}
        type="button"
        onClick={() => {
          cancelClose();
          if (open && openedByHover.current) {
            openedByHover.current = false;
            return;
          }
          openedByHover.current = false;
          onOpenChange(!open);
        }}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            openedByHover.current = false;
            onOpenChange(!open);
          } else if (event.key === "ArrowDown") {
            event.preventDefault();
            openAndFocus(0);
          } else if (event.key === "ArrowUp") {
            event.preventDefault();
            openAndFocus(-1);
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
        // Sits flush under the trigger (no dead gap), above all page content.
        <div className="absolute left-0 top-full z-50">
          <ul
            ref={panelRef}
            className="w-48 rounded-lg border border-ink/10 bg-paper py-2 shadow-lg"
            onKeyDown={(event) => {
              const all = links();
              const index = all.indexOf(document.activeElement as HTMLAnchorElement);
              if (event.key === "ArrowDown") {
                event.preventDefault();
                focusItem(index + 1);
              } else if (event.key === "ArrowUp") {
                event.preventDefault();
                focusItem(index - 1);
              } else if (event.key === "Home") {
                event.preventDefault();
                focusItem(0);
              } else if (event.key === "End") {
                event.preventDefault();
                focusItem(-1);
              }
            }}
          >
            {item.items?.map((sub) => (
              <li key={sub.href}>
                <Link
                  href={sub.href}
                  onClick={() => onOpenChange(false)}
                  className="flex min-h-11 w-full items-center px-4 font-normal text-muted transition-colors hover:text-brand"
                >
                  {sub.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </li>
  );
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
    <DemoTrigger appearance="button" onBeforeOpen={onBeforeOpen} returnFocusTo={returnFocusTo} className={className}>
      Request a demo
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
    // Own stacking context above page content (hero layers use z-10), below modals (z-50).
    <header className="relative z-40 border-b border-surface bg-paper">
      <nav className="mx-auto flex max-w-[75rem] items-center justify-between px-6 py-5 md:px-12">
        <Link href="/" className="shrink-0" onClick={closeMobile}>
          {/* The nav is always solid paper, so it always uses the light-background logo. */}
          <Logo className="h-9 w-auto md:h-[52px]" />
        </Link>

        {/* Desktop nav — hidden below xl, where it's replaced by the mobile menu. */}
        <div ref={desktopNavRef} className="hidden xl:flex xl:items-center xl:gap-8">
          <ul className="flex items-center gap-6 text-body">
            {navItems.map((item) => {
              if (item.items) {
                return (
                  <DesktopDropdown
                    key={item.label}
                    item={item}
                    open={openDropdown === item.label}
                    active={isItemActive(item, pathname)}
                    onOpenChange={(next) =>
                      setOpenDropdown((current) =>
                        next ? item.label : current === item.label ? null : current
                      )
                    }
                  />
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
                      <ul className="ml-4 flex flex-col border-l border-ink/10">
                        {item.items.map((sub) => (
                          <li key={sub.href}>
                            <Link
                              href={sub.href}
                              onClick={closeMobile}
                              className="flex min-h-11 w-full items-center pl-4 font-normal text-muted transition-colors hover:text-brand"
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
