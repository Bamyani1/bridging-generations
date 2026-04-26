import type { GalleryImage } from "@/lib/content/galleryImages";
import { GalleryItem } from "./GalleryItem";

type GalleryMasonryProps = {
  items: readonly GalleryImage[];
};

// Items render developed at first paint instead of being wrapped in
// <Reveal>: the IntersectionObserver target gets fragmented across CSS
// multi-column boxes, so per-item reveal never fires inside a `columns-*`
// container. Same shape as ThankYouWall.
export function GalleryMasonry({ items }: GalleryMasonryProps) {
  if (items.length === 0) {
    return <p className="text-body text-ink-2">No photographs yet.</p>;
  }

  return (
    <div className="columns-2 gap-4 md:columns-3 lg:columns-4">
      {items.map((item, index) => (
        <GalleryItem key={item.id} item={item} priority={index === 0} />
      ))}
    </div>
  );
}
