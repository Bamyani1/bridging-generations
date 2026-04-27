import type { ReactNode } from "react";

type Scale = "lg" | "md" | "sm";

type MuseumWallProps = {
  children: ReactNode;
  className?: string;
  ariaLabel?: string;
};

// Princeton honor-roll model: multi-column type-set list. Tier or year headings
// are typographic monuments; entry size scales by tier weight. CSS columns with
// `break-inside-avoid` so a tier heading and its entries stay together.
function MuseumWallRoot({ children, className, ariaLabel }: MuseumWallProps) {
  const base =
    "columns-1 gap-x-12 md:columns-2 lg:columns-3 [&>*]:break-inside-avoid [&>*]:mb-8 lg:[&>*]:mb-10";
  const merged = `${base} ${className ?? ""}`.trim();
  return (
    <section className={merged} aria-label={ariaLabel}>
      {children}
    </section>
  );
}

type MuseumWallCaptionProps = {
  children: ReactNode;
  position?: "above" | "below";
};

function MuseumWallCaption({ children, position = "above" }: MuseumWallCaptionProps) {
  const spacing = position === "above" ? "mb-10" : "mt-10";
  return (
    <p className={`${spacing} text-meta uppercase tracking-[0.12em] text-ink-2`}>{children}</p>
  );
}

type MuseumWallTierProps = {
  label: string;
  count?: number;
  scale?: Scale;
};

function MuseumWallTier({ label, count, scale = "md" }: MuseumWallTierProps) {
  const sizeClass = scale === "lg" ? "text-heading-5" : "text-meta";
  return (
    <div className="border-t border-hairline pt-3">
      <p className={`${sizeClass} uppercase tracking-[0.16em] text-ink`}>
        {label}
        {typeof count === "number" ? (
          <span className="ml-2 text-meta tracking-[0.08em] text-ink-2">{count}</span>
        ) : null}
      </p>
    </div>
  );
}

type MuseumWallEntryProps = {
  children: ReactNode;
  scale?: Scale;
  caption?: string;
};

function MuseumWallEntry({ children, scale = "md", caption }: MuseumWallEntryProps) {
  const sizeClass =
    scale === "lg" ? "text-heading-3" : scale === "sm" ? "text-body" : "text-heading-5";
  return (
    <div className="mt-4 first:mt-0">
      <p className={`${sizeClass} text-balance text-ink`}>{children}</p>
      {caption ? <p className="mt-1 text-meta text-ink-2">{caption}</p> : null}
    </div>
  );
}

export const MuseumWall = Object.assign(MuseumWallRoot, {
  Caption: MuseumWallCaption,
  Tier: MuseumWallTier,
  Entry: MuseumWallEntry,
});
