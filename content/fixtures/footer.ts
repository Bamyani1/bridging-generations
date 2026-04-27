export type FooterLink = { label: string; href: string };

export const footerContent = {
  brand: {
    name: "Bridging Generations",
  },
  explore: [
    { label: "About", href: "/about" },
    { label: "Projects", href: "/projects" },
    { label: "Donors", href: "/donors" },
    { label: "Students", href: "/students" },
    { label: "Success Stories", href: "/success-stories" },
    { label: "Blog", href: "/blog" },
  ] satisfies FooterLink[],
  copyrightNote: "Bridging Generations is a registered 501(c)(3) nonprofit.",
  legalLinks: [{ label: "Terms", href: "/terms" }] satisfies FooterLink[],
};
