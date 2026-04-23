import { CTAFooterPanel } from "@/components/domain/CTAFooterPanel";

export function HomeCTAFooter() {
  return (
    <CTAFooterPanel
      headline="Join us. Sponsor a child."
      body="$30 a month covers tuition, books, daily meals, and materials for one student — and it takes less than a minute to set up."
      ctaLabel="Donate now"
      ctaHref="/donate"
      tone="cream"
      titleId="home-cta-footer-title"
    />
  );
}
