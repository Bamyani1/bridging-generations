import { Eyebrow } from "@/components/ui/Eyebrow";
import { StatusDot } from "@/components/ui/StatusDot";
import { TagPill } from "@/components/ui/TagPill";

export function EyebrowTagPillSection() {
  return (
    <section id="eyebrow-tagpill" className="scroll-mt-8">
      <h2 className="text-heading-2">Eyebrow, TagPill & StatusDot</h2>
      <p className="mt-2 max-w-2xl text-body-sm text-ink-2">
        Three small primitives. Eyebrow sits above headings in accent teal; TagPill tags content in
        default (muted cream) or live (elevated cream with a StatusDot).
      </p>

      <div className="mt-6 space-y-6">
        <div>
          <h3 className="text-heading-5">Eyebrow</h3>
          <div className="mt-2">
            <Eyebrow>Programs</Eyebrow>
            <h4 className="mt-1 text-heading-3">Our programs</h4>
          </div>
        </div>

        <div>
          <h3 className="text-heading-5">TagPill</h3>
          <div className="mt-2 flex flex-wrap items-center gap-3">
            <TagPill>Sponsored</TagPill>
            <TagPill>Community</TagPill>
            <TagPill variant="live">Live update</TagPill>
            <TagPill variant="live" statusVariant="pending">
              Waiting list
            </TagPill>
          </div>
        </div>

        <div>
          <h3 className="text-heading-5">StatusDot</h3>
          <div className="mt-2 flex items-center gap-4">
            <div className="flex items-center gap-2">
              <StatusDot variant="active" label="Active" />
              <span className="text-body-sm text-ink-2">Active (coral)</span>
            </div>
            <div className="flex items-center gap-2">
              <StatusDot variant="pending" label="Pending" />
              <span className="text-body-sm text-ink-2">Pending (outlined)</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
