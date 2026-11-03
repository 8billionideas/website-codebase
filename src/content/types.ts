export interface PageContent {
  title: string;
  description: string;
}

export interface CtaLink {
  label: string;
  href: string;
}

export interface NamedItem {
  name: string;
  description: string;
}

export interface Testimonial {
  quote: string;
  excerpt?: string;
  name: string;
  role: string;
  sourceUrl?: string | null;
  // The school or organisation, from the attribution (shown in the /about carousel's tile when
  // there's no logo).
  school?: string;
  // The school's logo for the /about carousel tile (width and height: the file's size).
  logo?: { src: string; alt: string; width: number; height: number } | null;
}
