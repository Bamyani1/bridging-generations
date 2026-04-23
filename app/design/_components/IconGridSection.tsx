import { Icon } from "@/components/ui/Icon";
import {
  AlertCircle,
  ArrowRight,
  Calendar,
  Check,
  ChevronDown,
  ExternalLink,
  Heart,
  Mail,
  MapPin,
  Menu,
  Phone,
  X,
} from "@/components/ui/icons";

const grid = [
  { name: "ArrowRight", icon: ArrowRight, role: "Tertiary buttons, lists" },
  { name: "ChevronDown", icon: ChevronDown, role: "Select, accordions" },
  { name: "Menu", icon: Menu, role: "Mobile nav hamburger" },
  { name: "X", icon: X, role: "Close, dismiss" },
  { name: "Check", icon: Check, role: "Success state" },
  { name: "AlertCircle", icon: AlertCircle, role: "Errors, warnings" },
  { name: "Mail", icon: Mail, role: "Email contact" },
  { name: "Phone", icon: Phone, role: "Phone contact" },
  { name: "MapPin", icon: MapPin, role: "Address" },
  { name: "Calendar", icon: Calendar, role: "Dates on blog and activities" },
  { name: "Heart", icon: Heart, role: "Donate affinity" },
  { name: "ExternalLink", icon: ExternalLink, role: "Outbound links" },
];

export function IconGridSection() {
  return (
    <section id="icons" className="scroll-mt-8">
      <h2 className="text-heading-2">Icons</h2>
      <p className="mt-2 max-w-2xl text-body-sm text-ink-2">
        Lucide React, default 20px / stroke 1.75. Inherits text color. Decorative icons set
        <code className="font-mono"> aria-hidden</code>; informational icons take a{" "}
        <code className="font-mono">label</code> for the screen reader. Brand marks (Facebook,
        Instagram, etc.) ship inline in the Footer PR — Lucide upstream dropped them.
      </p>
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {grid.map((entry) => (
          <div
            key={entry.name}
            className="flex items-center gap-3 rounded-md border border-hairline bg-ground-2 p-4"
          >
            <Icon icon={entry.icon} label={entry.name} className="text-accent" />
            <div>
              <p className="font-mono text-meta text-ink">{entry.name}</p>
              <p className="text-meta text-ink-2">{entry.role}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
