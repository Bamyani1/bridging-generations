type StudentPlaceholderProps = {
  /**
   * Alt is intentionally privacy-preserving — the label should not identify a specific
   * student. Caller passes `siteSettings.copy.placeholderAlt` once that key lands in
   * Phase 5 Keystatic.
   */
  label?: string;
  className?: string;
};

export function StudentPlaceholder({
  label = "Portrait not shown to protect the student's privacy",
  className,
}: StudentPlaceholderProps) {
  return (
    <div
      role="img"
      aria-label={label}
      className={`relative h-full w-full overflow-hidden bg-ground-3 ${className ?? ""}`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 400 500"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
        className="h-full w-full"
      >
        <rect width="400" height="500" fill="var(--color-ground-3)" />
        <g stroke="var(--color-hairline)" strokeWidth="1" fill="none">
          <circle cx="200" cy="200" r="70" />
          <circle cx="200" cy="200" r="130" />
          <circle cx="200" cy="200" r="200" />
        </g>
        <line x1="0" y1="380" x2="400" y2="380" stroke="var(--color-hairline)" strokeWidth="1" />
        <line x1="0" y1="420" x2="400" y2="420" stroke="var(--color-hairline)" strokeWidth="1" />
      </svg>
    </div>
  );
}
