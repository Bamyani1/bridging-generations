import { Feature, Row } from "@/components/ui/editorial";

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
 * Chronology axis only — most recent (first in `thankYouMessages`) gets the
 * Feature scale; the remainder render as Row entries on a hairline rail.
 * Long messages truncate at ~220 chars; they don't grow the tile.
 *
 * The wall is in document order from the YAML (editor-controlled).
 * `pickTileSize`-by-message-length is gone — sizing was editorially
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
      <Feature breakout={false}>
        <Feature.Body>
          <Feature.Eyebrow>Most recent{feature.year ? ` · ${feature.year}` : ""}</Feature.Eyebrow>
          <Feature.Headline as="h3">{truncate(feature.message)}</Feature.Headline>
          <Feature.Stamp>Anonymous</Feature.Stamp>
        </Feature.Body>
      </Feature>
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
