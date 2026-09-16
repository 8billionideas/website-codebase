"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { navItems } from "@/content/nav";

export default function Navbar() {
  const pathname = usePathname();

  return (
    <header className="border-b border-surface bg-paper">
      <nav className="mx-auto flex max-w-[75rem] items-center justify-between px-6 py-4 md:px-12">
        <Link href="/" className="text-h3 text-ink">
          8billionideas
        </Link>
        <ul className="flex items-center gap-6 text-body">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={
                    isActive
                      ? "font-medium text-brand"
                      : "font-medium text-muted transition-colors hover:text-brand"
                  }
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
}
