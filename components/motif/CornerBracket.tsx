import type { ReactNode } from "react";

type CornerBracketProps = {
  children: ReactNode;
  className?: string;
};

export function CornerBracket({ children, className }: CornerBracketProps) {
  const bracket = (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className="size-4 text-hairline"
    >
      <path
        d="M2 10 L 2 2 L 10 2"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
  return (
    <div className={`relative ${className ?? ""}`}>
      <span className="pointer-events-none absolute left-2 top-2">{bracket}</span>
      <span className="pointer-events-none absolute right-2 top-2 rotate-90">{bracket}</span>
      <span className="pointer-events-none absolute right-2 bottom-2 rotate-180">{bracket}</span>
      <span className="pointer-events-none absolute left-2 bottom-2 -rotate-90">{bracket}</span>
      {children}
    </div>
  );
}
