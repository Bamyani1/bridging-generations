import { Avatar } from "@/components/ui/Avatar";
import { Divider } from "@/components/ui/Divider";

export function AvatarDividerSection() {
  return (
    <section id="avatar-divider" className="scroll-mt-8">
      <h2 className="text-heading-2">Avatar & Divider</h2>
      <p className="mt-2 max-w-2xl text-body-sm text-ink-2">
        Avatar renders a rounded portrait when a src is provided, otherwise a warm-cream initials
        tile. Three sizes. Divider is a 1px hairline rule with optional spacing.
      </p>

      <div className="mt-6">
        <h3 className="text-heading-5">Avatar sizes (initials fallback)</h3>
        <div className="mt-3 flex items-end gap-6">
          <div className="flex flex-col items-center gap-2">
            <Avatar name="Amina Begum" size="sm" />
            <span className="text-meta text-ink-2">sm · 32px</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Avatar name="Rahim Chowdhury" size="md" />
            <span className="text-meta text-ink-2">md · 48px</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Avatar name="Ishita" size="lg" />
            <span className="text-meta text-ink-2">lg · 80px</span>
          </div>
        </div>
      </div>

      <Divider spacing="lg" />

      <div>
        <h3 className="text-heading-5">Divider spacings</h3>
        <div className="mt-4">
          <p className="text-body-sm text-ink-2">Above (spacing="sm")</p>
          <Divider spacing="sm" />
          <p className="text-body-sm text-ink-2">Between (spacing="md")</p>
          <Divider spacing="md" />
          <p className="text-body-sm text-ink-2">Under (spacing="lg")</p>
          <Divider spacing="lg" />
          <p className="text-body-sm text-ink-2">End.</p>
        </div>
      </div>
    </section>
  );
}
