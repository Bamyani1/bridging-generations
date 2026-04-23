export type SiteSettings = {
  orgName: string;
  ein: string;
  missionShort: string;
  foundingYear: number;
  mailingAddress: string;
  contactEmail: string;
};

export const siteSettings: SiteSettings = {
  orgName: "Bridging Generations",
  ein: "00-0000000",
  missionShort: "Sponsoring 156 students across the Chittagong Hill Tracts.",
  foundingYear: 2010,
  mailingAddress: "[CONFIRM: mailing address]",
  contactEmail: "info@bridginggenerations.org",
};
