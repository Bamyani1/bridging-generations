export type FooterLink = { label: string; href: string };
export type FooterColumn = { heading: string; links: FooterLink[] };

export const footerContent = {
  brand: {
    name: "Bridging Generations",
    tagline: "Sponsoring 156 students across the Chittagong Hill Tracts.",
  },
  columns: [
    {
      heading: "Explore",
      links: [
        { label: "About", href: "/about" },
        { label: "Projects", href: "/projects" },
        { label: "Students", href: "/students" },
        { label: "Donors", href: "/donors" },
        { label: "Success Stories", href: "/success-stories" },
      ],
    },
    {
      heading: "Resources",
      links: [
        { label: "Blog", href: "/blog" },
        { label: "Gallery", href: "/gallery" },
        { label: "Recent Activities", href: "/activities" },
        { label: "Testimonials", href: "/testimonials" },
      ],
    },
    {
      heading: "Contact",
      links: [
        { label: "Email us", href: "mailto:info@bridginggenerations.org" },
        { label: "Send a message", href: "/contact" },
      ],
    },
  ] satisfies FooterColumn[],
  copyrightNote: "Bridging Generations is a registered 501(c)(3) nonprofit.",
  legalLinks: [{ label: "Terms", href: "/terms" }] satisfies FooterLink[],
};
