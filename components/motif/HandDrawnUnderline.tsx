type HandDrawnUnderlineProps = {
  className?: string;
};

// Inherits `currentColor` from its text context. `preserveAspectRatio="none"` lets the
// wavy stroke stretch when used as a full-width chapter break; at natural aspect it
// renders cleanly too, so both use cases share the same component.
export function HandDrawnUnderline({ className }: HandDrawnUnderlineProps) {
  return (
    <svg
      viewBox="0 0 200 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      preserveAspectRatio="none"
      className={className}
    >
      <path
        d="M4 7 C 50 3, 100 10, 196 5"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}
