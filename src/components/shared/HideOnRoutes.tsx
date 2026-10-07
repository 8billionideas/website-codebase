"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";

// Lets a layout-level section opt out on specific pages.
export default function HideOnRoutes({ routes, children }: { routes: string[]; children: ReactNode }) {
  const pathname = usePathname();
  return routes.includes(pathname) ? null : <>{children}</>;
}
