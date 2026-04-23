import type { ReactNode } from "react";
import { BreakpointIndicator } from "@/components/dev/BreakpointIndicator";

const sections = [
  { id: "color", label: "Color" },
  { id: "typography", label: "Typography" },
  { id: "spacing", label: "Spacing" },
  { id: "radius", label: "Radius" },
  { id: "shadow", label: "Shadow" },
  { id: "buttons", label: "Buttons" },
  { id: "eyebrow-tagpill", label: "Eyebrow & TagPill" },
  { id: "progressbar", label: "Progress Bar" },
  { id: "avatar-divider", label: "Avatar & Divider" },
  { id: "forms", label: "Forms" },
  { id: "icons", label: "Icons" },
  { id: "motion", label: "Motion" },
  { id: "breakpoint", label: "Breakpoint" },
];

export default function DesignLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-[calc(100vh-4rem)]">
      <aside className="sticky top-16 hidden h-[calc(100vh-4rem)] w-64 shrink-0 overflow-y-auto border-r border-hairline p-8 lg:block">
        <nav aria-label="Design system sections">
          <p className="text-eyebrow uppercase text-accent">Design</p>
          <ul className="mt-4 space-y-2 text-body-sm">
            {sections.map((section) => (
              <li key={section.id}>
                <a className="hover:text-accent" href={`#${section.id}`}>
                  {section.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
      <div className="min-w-0 flex-1 p-8 lg:p-12">{children}</div>
      <BreakpointIndicator />
    </div>
  );
}
