import { Eyebrow } from "@/components/ui/Eyebrow";
import { isPlaceholder } from "@/lib/content/isPlaceholder";

type ContactInfoCardProps = {
  mailingAddress: string;
  contactEmail: string;
  responseNote: string;
};

export function ContactInfoCard({
  mailingAddress,
  contactEmail,
  responseNote,
}: ContactInfoCardProps) {
  return (
    <aside
      aria-label="Direct contact details"
      className="flex flex-col gap-6 bg-ground-2 p-8 lg:p-10"
    >
      <div className="flex flex-col gap-2">
        <Eyebrow>Mail us directly</Eyebrow>
        <a
          href={`mailto:${contactEmail}`}
          className="break-words text-heading-5 text-ink transition hover:text-accent"
        >
          {contactEmail}
        </a>
      </div>
      {!isPlaceholder(mailingAddress) ? (
        <div className="flex flex-col gap-2">
          <Eyebrow>Mailing address</Eyebrow>
          <address className="whitespace-pre-line break-words not-italic text-body text-ink-2">
            {mailingAddress}
          </address>
        </div>
      ) : null}
      <div className="flex flex-col gap-2">
        <Eyebrow>Response time</Eyebrow>
        <p className="text-body text-ink-2">{responseNote}</p>
      </div>
    </aside>
  );
}
