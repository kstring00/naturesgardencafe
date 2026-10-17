/**
 * Leaf mark drawn in SVG, standing in for the café logo until the real file arrives.
 * Each path has pathLength="1" so the CSS self-draw animation needs no measuring.
 * Colors come from currentColor so it works on any background.
 */
export function LeafMark({
  className = "",
  draw = false,
  title = "Nature's Garden leaf mark",
}: {
  className?: string;
  draw?: boolean;
  title?: string;
}) {
  const leaves = [
    // stem
    "M32 60 C 32 44, 33 30, 36 8",
    // left leaves
    "M31 48 C 20 48, 12 40, 10 30 C 20 30, 29 36, 31 48 Z",
    "M33 34 C 24 32, 18 24, 18 14 C 27 16, 33 24, 33 34 Z",
    // right leaves
    "M33 44 C 44 44, 52 36, 54 26 C 44 26, 35 32, 33 44 Z",
    "M35 30 C 44 28, 50 20, 50 10 C 41 12, 35 20, 35 30 Z",
  ];
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`${draw ? "draw-self" : ""} ${className}`}
      role="img"
      aria-label={title}
    >
      {leaves.map((d, i) => (
        <path key={d} d={d} pathLength={1} style={{ ["--i" as string]: i }} />
      ))}
    </svg>
  );
}
