import { Reveal } from "@/components/ui/Reveal";
import type { GalleryImage } from "@/lib/content/galleryImages";
import { GalleryItem } from "./GalleryItem";

type GalleryMasonryProps = {
  items: readonly GalleryImage[];
};

export function GalleryMasonry({ items }: GalleryMasonryProps) {
  if (items.length === 0) {
    return <p className="text-body text-ink-2">No photographs yet.</p>;
  }

  return (
    <div className="columns-2 gap-4 md:columns-3 lg:columns-4">
      {items.map((item, index) => (
        <Reveal key={item.id} delay={(index % 5) * 80}>
          <GalleryItem item={item} priority={index === 0} />
        </Reveal>
      ))}
    </div>
  );
}
