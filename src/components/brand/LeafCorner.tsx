/**
 * Hand-drawn leaf strokes framing a hero corner. Draws itself in via CSS (stroke-dashoffset).
 * Decorative only.
 */
export function LeafCorner({ className = "", flip = false }: { className?: string; flip?: boolean }) {
  const paths = [
    "M4 196 C 20 120, 60 60, 150 22",
    "M44 128 C 34 112, 36 92, 50 80 C 62 94, 60 114, 44 128 Z",
    "M78 84 C 64 76, 58 60, 64 44 C 78 50, 86 66, 78 84 Z",
    "M112 50 C 110 36, 118 22, 132 16 C 134 30, 126 44, 112 50 Z",
    "M26 160 C 12 158, 4 146, 4 132 C 18 134, 26 146, 26 160 Z",
  ];
  return (
    <svg
      viewBox="0 0 200 200"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={`draw-self ${flip ? "scale-x-[-1]" : ""} ${className}`}
    >
      {paths.map((d, i) => (
        <path key={d} d={d} pathLength={1} style={{ ["--i" as string]: i }} />
      ))}
    </svg>
  );
}
