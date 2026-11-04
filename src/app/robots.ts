import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site-config";

// Crawlable; pages that shouldn't be indexed (/minerva, /money-masters, /gec-academy) set noindex
// in their own metadata.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
