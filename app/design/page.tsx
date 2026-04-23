import type { Metadata } from "next";
import { AvatarDividerSection } from "./_components/AvatarDividerSection";
import { BreakpointSection } from "./_components/BreakpointSection";
import { ButtonSection } from "./_components/ButtonSection";
import { ColorSection } from "./_components/ColorSection";
import { EyebrowTagPillSection } from "./_components/EyebrowTagPillSection";
import { FormSection } from "./_components/FormSection";
import { IconGridSection } from "./_components/IconGridSection";
import { MotionLabSection } from "./_components/MotionLabSection";
import { ProgressBarSection } from "./_components/ProgressBarSection";
import { RadiusSection } from "./_components/RadiusSection";
import { ShadowSection } from "./_components/ShadowSection";
import { SpacingSection } from "./_components/SpacingSection";
import { TypographySection } from "./_components/TypographySection";

export const metadata: Metadata = {
  title: "Design System — Bridging Generations",
  description: "Internal design system reference. Not indexed.",
  robots: { index: false, follow: false, nocache: true },
};

const stubSections: Array<{ id: string; title: string; note: string }> = [];

export default function DesignPage() {
  return (
    <div className="space-y-16">
      <header>
        <p className="text-eyebrow uppercase text-accent">Reference</p>
        <h1 className="mt-2 text-display-2">Design System</h1>
        <p className="mt-3 max-w-2xl text-body text-ink-2">
          Every token and primitive the site ships with. Internal reference, not indexed. Sections
          fill in as their PRs land.
        </p>
      </header>
      <ColorSection />
      <TypographySection />
      <SpacingSection />
      <RadiusSection />
      <ShadowSection />
      <ButtonSection />
      <EyebrowTagPillSection />
      <ProgressBarSection />
      <AvatarDividerSection />
      <FormSection />
      <IconGridSection />
      <MotionLabSection />
      <BreakpointSection />
      {stubSections.map((section) => (
        <section key={section.id} id={section.id} className="scroll-mt-8">
          <h2 className="text-heading-2">{section.title}</h2>
          <p className="mt-2 text-body-sm text-ink-2">{section.note}</p>
        </section>
      ))}
    </div>
  );
}
