import Image from "next/image";

type StudentPlaceholderProps = {
  /**
   * Alt is intentionally privacy-preserving — the label should not identify a
   * specific student. Per saved feedback memory, the placeholder is a real
   * photograph (textured paper, CC0) rather than an abstract SVG composition.
   */
  label?: string;
  className?: string;
  sizes?: string;
};

export function StudentPlaceholder({
  label = "Portrait not shown to protect the student's privacy",
  className,
  sizes,
}: StudentPlaceholderProps) {
  return (
    <div
      role="img"
      aria-label={label}
      className={`relative h-full w-full overflow-hidden bg-ground-3 ${className ?? ""}`.trim()}
    >
      <Image
        src="/images/student-placeholder.jpg"
        alt=""
        aria-hidden="true"
        fill
        sizes={sizes ?? "(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"}
        className="object-cover"
      />
    </div>
  );
}
