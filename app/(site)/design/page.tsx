import type { Metadata } from "next";
import { AvatarDividerSection } from "./_components/AvatarDividerSection";
import { BreakpointSection } from "./_components/BreakpointSection";
import { ButtonSection } from "./_components/ButtonSection";
import { ChapterDivider } from "./_components/ChapterDivider";
import { ColorSection } from "./_components/ColorSection";
import { EyebrowTagPillSection } from "./_components/EyebrowTagPillSection";
import { FormSection } from "./_components/FormSection";
import { IconGridSection } from "./_components/IconGridSection";
import { MobileSection } from "./_components/MobileSection";
import { MotifSection } from "./_components/MotifSection";
import { MotionLabSection } from "./_components/MotionLabSection";
import { ProgressBarSection } from "./_components/ProgressBarSection";
import { ShadowSection } from "./_components/ShadowSection";
import { ShapeSection } from "./_components/ShapeSection";
import { SpacingSection } from "./_components/SpacingSection";
import { TypographySection } from "./_components/TypographySection";

export const metadata: Metadata = {
  title: "Design System",
  description: "Internal design system reference. Not indexed.",
  robots: { index: false, follow: false, nocache: true },
};

export default function DesignPage() {
  return (
    <div>
      <header className="pb-16">
        <p className="flex flex-wrap items-baseline gap-2 font-mono text-meta uppercase tracking-[0.12em] text-ink-2">
          <span>Bridging Generations</span>
          <span aria-hidden="true" className="text-hairline">
            /
          </span>
          <span>Design System</span>
          <span aria-hidden="true" className="text-hairline">
            /
          </span>
          <span>v1.0 · April 2026</span>
        </p>
        <h1 className="mt-8 text-display-1 leading-[0.95] text-ink">
          Design
          <br />
          System
        </h1>
        <p className="mt-8 max-w-2xl text-body-lg text-ink-2">
          Every token, primitive, and surface the site ships with. Internal reference, not indexed.
          Warm, editorial, confident. Sharp corners; warmth from color and type.
        </p>
        <ul className="mt-8 flex flex-wrap items-baseline gap-3 font-mono text-meta uppercase text-ink-2">
          <li>14 sections</li>
          <li aria-hidden="true" className="text-hairline">
            /
          </li>
          <li>
            <span>5 chapters</span>
          </li>
          <li aria-hidden="true" className="text-hairline">
            /
          </li>
          <li>wcag 2.2 aa</li>
          <li aria-hidden="true" className="text-hairline">
            /
          </li>
          <li>reduced-motion safe</li>
        </ul>
      </header>

      <ChapterDivider index="I" label="Foundations" />
      <ColorSection />
      <TypographySection />
      <SpacingSection />
      <ShapeSection />
      <ShadowSection />

      <ChapterDivider index="II" label="Primitives" />
      <ButtonSection />
      <EyebrowTagPillSection />
      <ProgressBarSection />
      <AvatarDividerSection />

      <ChapterDivider index="III" label="Surfaces" />
      <FormSection />
      <IconGridSection />

      <ChapterDivider index="IV" label="System" />
      <MotionLabSection />
      <BreakpointSection />

      <ChapterDivider index="V" label="Motifs" />
      <MotifSection />

      <MobileSection />
    </div>
  );
}
