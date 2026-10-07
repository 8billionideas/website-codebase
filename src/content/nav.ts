export interface NavLink {
  label: string;
  href: string;
}

export interface NavItem {
  label: string;
  // Plain link when set; omit in favor of `items` for a dropdown.
  href?: string;
  // Dropdown sub-links when set; the parent label itself is not a link.
  items?: NavLink[];
  // Explicit active-state paths for a dropdown, decoupled from `items`.
  activeOn?: string[];
}

export const navItems: NavItem[] = [
  { label: "Our Curriculum", href: "/curriculum-mapping" },
  { label: "Qualifications", href: "/gcse" },
  { label: "Case Studies", href: "/case-studies" },
  { label: "Pricing", href: "/pricing" },
  {
    label: "About",
    items: [
      { label: "About Us", href: "/about" },
      { label: "Resources", href: "/resources" },
      { label: "Contact us", href: "/contact" },
    ],
    activeOn: ["/about", "/resources", "/contact"],
  },
];
