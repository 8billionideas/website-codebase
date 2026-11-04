import type { MetadataRoute } from "next";
import { caseStudies } from "@/lib/case-studies";
import { SITE_URL } from "@/lib/site-config";

// Indexable pages only: not the noindex partner pages (/minerva, /money-masters, /gec-academy) or
// the unlinked placeholder routes (/courses, /critical-curriculum, /delivery-support,
// /find-out-more).
const PATHS = [
  "/",
  "/curriculum-mapping",
  "/gcse",
  "/pricing",
  "/case-studies",
  ...caseStudies.map((study) => `/case-studies/${study.slug}`),
  "/about",
  "/resources",
  "/contact",
  "/roar",
  "/cv-workshop",
  "/privacy-policy",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return PATHS.map((path) => ({ url: path === "/" ? SITE_URL : `${SITE_URL}${path}` }));
}
