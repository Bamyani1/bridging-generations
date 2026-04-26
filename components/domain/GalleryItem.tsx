import Image from "next/image";
import type { GalleryImage } from "@/lib/content/galleryImages";

type GalleryItemProps = {
  item: GalleryImage;
  priority?: boolean;
};

// Plain figure with a visible caption — was wrapped in <a target="_blank">
// to the raw image, presented as a lightbox. That isn't a lightbox; it's a
// new tab with a bare PNG and no caption. R4.8 will build a real lightbox;
// until then a figure is the honest shape.
export function GalleryItem({ item, priority = false }: GalleryItemProps) {
  const { image, width, height, caption, location } = item;
  return (
    <figure className="mb-4 block break-inside-avoid">
      <Image
        src={image.src ?? ""}
        alt={image.alt || caption}
        width={width}
        height={height}
        sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
        priority={priority}
        className="h-auto w-full object-cover"
      />
      <figcaption className="mt-2 flex flex-col gap-1">
        <span className="text-body-sm text-ink-2">{caption}</span>
        {location ? (
          <span className="text-meta uppercase tracking-[0.1em] text-ink-2">{location}</span>
        ) : null}
      </figcaption>
    </figure>
  );
}
