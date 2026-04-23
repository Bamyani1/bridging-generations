import { Reveal } from "@/components/ui/Reveal";
import { pickTileSize, ThankYouTile } from "./ThankYouTile";

type ThankYouMessage = {
  message: string;
  year?: number | null;
};

type ThankYouWallProps = {
  messages: readonly ThankYouMessage[];
};

export function ThankYouWall({ messages }: ThankYouWallProps) {
  return (
    <div className="columns-1 gap-4 md:columns-2 lg:columns-3">
      {messages.map((item, index) => {
        const delay = (index * 73) % 400;
        const variant = index % 2 === 0 ? "cream" : "light";
        const size = pickTileSize(item.message.length);
        return (
          <Reveal key={`${index}-${item.message.slice(0, 16)}`} delay={delay}>
            <ThankYouTile message={item.message} year={item.year} size={size} variant={variant} />
          </Reveal>
        );
      })}
    </div>
  );
}
