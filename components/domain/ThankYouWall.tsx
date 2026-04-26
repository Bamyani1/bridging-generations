import { pickTileSize, ThankYouTile } from "./ThankYouTile";

type ThankYouMessage = {
  message: string;
  year?: number | null;
};

type ThankYouWallProps = {
  messages: readonly ThankYouMessage[];
};

// Tiles render developed at first paint instead of being wrapped in
// <Reveal>: the IntersectionObserver target gets fragmented across CSS
// multi-column boxes, so per-tile reveal never fires inside a `columns-*`
// container. The decorative cascade isn't worth the wall going invisible.
export function ThankYouWall({ messages }: ThankYouWallProps) {
  return (
    <div className="columns-1 gap-4 md:columns-2 lg:columns-3">
      {messages.map((item, index) => {
        const variant = index % 2 === 0 ? "cream" : "light";
        const size = pickTileSize(item.message.length);
        return (
          <ThankYouTile
            key={item.message}
            message={item.message}
            year={item.year}
            size={size}
            variant={variant}
          />
        );
      })}
    </div>
  );
}
