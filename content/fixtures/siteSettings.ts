export type SiteSettings = {
  orgName: string;
  ein: string;
  missionShort: string;
  missionFull: string;
  foundingYear: number;
  mailingAddress: string;
  contactEmail: string;
};

export const siteSettings: SiteSettings = {
  orgName: "Bridging Generations",
  ein: "00-0000000",
  missionShort: "Sponsoring 156 students across the Chittagong Hill Tracts.",
  missionFull:
    "Bridging Generations empowers underprivileged children in the Chittagong Hill Tracts through education sponsorship — tuition, books, meals, and the structural support that keeps students in the classroom instead of the workforce.",
  foundingYear: 2010,
  mailingAddress: "[CONFIRM: mailing address]",
  contactEmail: "info@bridginggenerations.org",
};
