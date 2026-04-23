type ThankYouTileSize = "sm" | "md" | "lg";

type ThankYouTileProps = {
  message: string;
  year?: number | null;
  size?: ThankYouTileSize;
  variant?: "cream" | "light";
};

const sizeClass: Record<ThankYouTileSize, string> = {
  sm: "text-body",
  md: "text-body-lg",
  lg: "text-heading-5",
};

const variantClass: Record<"cream" | "light", string> = {
  cream: "bg-ground-3",
  light: "bg-ground-2",
};

export function ThankYouTile({ message, year, size = "md", variant = "cream" }: ThankYouTileProps) {
  return (
    <article
      className={`mb-4 flex break-inside-avoid flex-col gap-4 p-6 shadow-card transition duration-[220ms] ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-0.5 hover:shadow-card-hover lg:p-8 ${variantClass[variant]}`}
    >
      <p className={`text-balance text-ink ${sizeClass[size]}`}>{message}</p>
      {year ? (
        <span className="text-meta uppercase tracking-[0.1em] text-ink-2">{year}</span>
      ) : null}
    </article>
  );
}

export function pickTileSize(messageLength: number): ThankYouTileSize {
  if (messageLength <= 60) return "sm";
  if (messageLength <= 140) return "md";
  return "lg";
}
