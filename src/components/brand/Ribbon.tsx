import type { ReactNode } from "react";

/**
 * A painted fileteado ribbon: celeste banner with gold edges and curled ends.
 * The SVG is the backdrop; the words are real HTML on top (selectable, indexable).
 */
export function Ribbon({
  children,
  className = "",
  as: Tag = "div",
  id,
  tone = "celeste",
}: {
  children: ReactNode;
  className?: string;
  as?: "div" | "h1" | "h2" | "p" | "span";
  id?: string;
  tone?: "celeste" | "trigo";
}) {
  const fill = tone === "celeste" ? "var(--color-celeste)" : "var(--color-trigo)";
  const fold = tone === "celeste" ? "var(--color-celeste-deep)" : "var(--color-trigo-deep)";
  return (
    <Tag id={id} className={`relative inline-block ${className}`}>
      <svg
        aria-hidden="true"
        viewBox="0 0 400 100"
        preserveAspectRatio="none"
        className="absolute inset-0 h-full w-full"
      >
        {/* curled tails */}
        <path d="M 22 30 L 0 42 L 22 54 L 22 92 L 0 80 L 0 42 Z" fill={fold} />
        <path d="M 378 30 L 400 42 L 378 54 L 378 92 L 400 80 L 400 42 Z" fill={fold} />
        {/* banner */}
        <path
          d="M 22 8 C 120 1, 280 1, 378 8 L 378 92 C 280 85, 120 85, 22 92 Z"
          fill={fill}
          stroke="var(--color-trigo)"
          strokeWidth="2.5"
          vectorEffect="non-scaling-stroke"
        />
        {/* inner gold hairline */}
        <path
          d="M 32 15 C 125 9, 275 9, 368 15 L 368 85 C 275 79, 125 79, 32 85 Z"
          fill="none"
          stroke="var(--color-trigo)"
          strokeWidth="1"
          vectorEffect="non-scaling-stroke"
          opacity="0.8"
        />
      </svg>
      <span className="relative block px-[10%] py-[0.9em]">{children}</span>
    </Tag>
  );
}

/** Small corner ribbon, e.g. "since 2001". */
export function CornerRibbon({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <span className={`relative inline-block ${className}`}>
      <svg aria-hidden="true" viewBox="0 0 200 60" preserveAspectRatio="none" className="absolute inset-0 h-full w-full">
        <path d="M 12 16 L 0 24 L 12 32 L 12 52 L 0 44 L 0 24 Z" fill="var(--color-celeste-deep)" />
        <path d="M 12 8 C 70 4, 130 4, 188 8 L 200 30 L 188 52 C 130 48, 70 48, 12 52 Z" fill="var(--color-celeste)" stroke="var(--color-trigo)" strokeWidth="2" vectorEffect="non-scaling-stroke" />
      </svg>
      <span className="display-italic relative block px-5 py-1.5 text-tinta">{children}</span>
    </span>
  );
}
