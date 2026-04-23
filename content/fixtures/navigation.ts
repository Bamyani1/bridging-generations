export type NavItem = {
  href: string;
  label: string;
};

export const primaryNav: NavItem[] = [
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/students", label: "Students" },
  { href: "/donors", label: "Donors" },
  { href: "/blog", label: "Blog" },
  { href: "/gallery", label: "Gallery" },
];

export const donateCta = {
  href: "/donate",
  label: "Donate",
};
