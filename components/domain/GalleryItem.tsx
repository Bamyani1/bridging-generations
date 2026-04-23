import Image from "next/image";
import type { GalleryImage } from "@/lib/content/galleryImages";

type GalleryItemProps = {
  item: GalleryImage;
  priority?: boolean;
};

export function GalleryItem({ item, priority = false }: GalleryItemProps) {
  const { image, width, height, caption, location } = item;
  return (
    <a
      href={image.src ?? undefined}
      target="_blank"
      rel="noopener noreferrer"
      className="card-hover group relative mb-4 block break-inside-avoid overflow-hidden focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-accent"
    >
      <Image
        src={image.src ?? ""}
        alt={image.alt || caption}
        width={width}
        height={height}
        sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
        priority={priority}
        className="h-auto w-full object-cover"
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/70 via-ink/30 to-transparent p-4 opacity-0 transition-opacity duration-[220ms] ease-[cubic-bezier(0.16,1,0.3,1)] motion-safe:group-hover:opacity-100 motion-safe:group-focus-visible:opacity-100"
      >
        <span className="block text-body-sm text-white">{caption}</span>
        {location ? (
          <span className="mt-1 block text-meta uppercase tracking-[0.1em] text-white/80">
            {location}
          </span>
        ) : null}
      </span>
    </a>
  );
}
