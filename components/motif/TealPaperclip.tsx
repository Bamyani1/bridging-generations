type TealPaperclipProps = {
  className?: string;
};

export function TealPaperclip({ className }: TealPaperclipProps) {
  return (
    <svg
      viewBox="0 0 24 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={className}
      style={{ color: "var(--color-accent)" }}
    >
      <path
        d="M 6 4 L 6 28 A 6 6 0 0 0 18 28 L 18 10 A 4 4 0 0 0 10 10 L 10 26"
        stroke="currentColor"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
      />
    </svg>
  );
}
