import type { Metadata } from "next";
import { ColorSection } from "./_components/ColorSection";

export const metadata: Metadata = {
  title: "Design System — Bridging Generations",
  description: "Internal design system reference. Not indexed.",
  robots: { index: false, follow: false, nocache: true },
};

const stubSections: Array<{ id: string; title: string; note: string }> = [
  { id: "typography", title: "Typography", note: "Full scale ships in PR 2.3." },
  { id: "spacing", title: "Spacing", note: "Rhythm visualization ships in PR 2.4." },
  { id: "radius", title: "Radius", note: "Samples ship in PR 2.4." },
  { id: "shadow", title: "Shadow", note: "Elevation samples ship in PR 2.4." },
  { id: "buttons", title: "Buttons", note: "Variants + states ship in PR 2.5." },
  {
    id: "eyebrow-tagpill",
    title: "Eyebrow, TagPill & StatusDot",
    note: "Primitives ship in PR 2.6.",
  },
  { id: "progressbar", title: "Progress Bar", note: "Variants ship in PR 2.7." },
  { id: "avatar-divider", title: "Avatar & Divider", note: "Primitives ship in PR 2.8." },
  { id: "forms", title: "Forms", note: "Input, Textarea, Select, Field ship in PR 2.9." },
  { id: "icons", title: "Icons", note: "Lucide grid ships in PR 2.10." },
  { id: "motion", title: "Motion", note: "Scroll reveal + card hover demos ship in PR 2.11." },
  { id: "breakpoint", title: "Breakpoint", note: "Live indicator ships in PR 2.12." },
];

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
      {stubSections.map((section) => (
        <section key={section.id} id={section.id} className="scroll-mt-8">
          <h2 className="text-heading-2">{section.title}</h2>
          <p className="mt-2 text-body-sm text-ink-2">{section.note}</p>
        </section>
      ))}
    </div>
  );
}
