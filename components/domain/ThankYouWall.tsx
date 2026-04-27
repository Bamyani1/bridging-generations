import { Row } from "@/components/ui/editorial";

type ThankYouMessage = {
  message: string;
  year?: number | null;
};

type ThankYouWallProps = {
  messages: readonly ThankYouMessage[];
};

const TRUNCATE_LIMIT = 220;

function truncate(message: string): string {
  if (message.length <= TRUNCATE_LIMIT) return message;
  return `${message.slice(0, TRUNCATE_LIMIT - 1).trimEnd()}…`;
}

/**
 * Chronology axis only — most recent (first in `thankYouMessages`) gets a
 * museum-style oversized opening glyph + heading-2 quote treatment; the
 * remainder render as Row entries on a hairline rail. Long messages truncate
 * at ~220 chars; they don't grow the tile.
 *
 * The lead-message treatment intentionally reuses the FeatureTestimonial
 * silhouette (1fr/11fr glyph + body grid). It signals "this is the most
 * prominent thank-you", not just "another paragraph after the hero." The
 * `pickTileSize`-by-message-length variant is gone — sizing was editorially
 * backwards.
 */
export function ThankYouWall({ messages }: ThankYouWallProps) {
  if (messages.length === 0) {
    return (
      <p className="text-body text-ink-2">No thank-you messages yet — yours could be the first.</p>
    );
  }
  const [feature, ...rest] = messages;
  return (
    <div className="flex flex-col gap-12 lg:gap-16">
      <blockquote className="relative grid grid-cols-1 gap-6 border-t border-hairline pt-12 lg:grid-cols-[1fr_11fr] lg:gap-10 lg:pt-16">
        <span
          aria-hidden="true"
          className="font-display text-[88px] leading-[0.6] text-accent-2-text lg:text-[112px]"
        >
          &ldquo;
        </span>
        <div className="flex flex-col gap-6">
          <p className="text-meta uppercase tracking-[0.08em] text-ink-2">
            Most recent{feature.year ? ` · ${feature.year}` : ""}
          </p>
          <p className="text-balance text-heading-2 text-ink">{truncate(feature.message)}</p>
          <footer className="text-meta uppercase tracking-[0.08em] text-ink-2">Anonymous</footer>
        </div>
      </blockquote>
      {rest.length > 0 ? (
        <ul className="flex flex-col">
          {rest.map((m) => (
            <Row as="li" key={m.message} noImage>
              <Row.Eyebrow>Anonymous{m.year ? ` · ${m.year}` : ""}</Row.Eyebrow>
              <p className="text-balance text-heading-5 text-ink">{truncate(m.message)}</p>
            </Row>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
