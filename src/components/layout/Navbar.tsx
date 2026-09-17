"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { navItems } from "@/content/nav";

export default function Navbar() {
  const pathname = usePathname();

  return (
    <header className="border-b border-surface bg-paper">
      <nav className="mx-auto flex max-w-[75rem] items-center justify-between px-6 py-5 md:px-12">
        <Link href="/" className="shrink-0">
          <Image
            src="/logo.png"
            alt="8billionideas"
            width={154}
            height={52}
            priority
            className="h-9 w-auto md:h-[52px]"
          />
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
