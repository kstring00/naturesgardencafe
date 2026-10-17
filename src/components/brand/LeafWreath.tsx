/**
 * An open wreath of hand-drawn leaves: two curved stems with leaves, meeting at the bottom.
 * pathLength="1" on every path keeps the CSS self-draw animation simple.
 */
export function LeafWreath({
  className = "",
  draw = false,
  title = "Nature's Garden leaf wreath",
}: {
  className?: string;
  draw?: boolean;
  title?: string;
}) {
  const left = [
    "M32 58 C 18 54, 8 42, 8 26 C 8 18, 11 12, 15 8",
    "M11 44 C 4 42, 2 36, 3 30 C 9 32, 12 38, 11 44 Z",
    "M9 32 C 4 28, 3 22, 6 16 C 11 19, 12 26, 9 32 Z",
    "M18 52 C 11 52, 7 48, 6 42 C 12 42, 17 46, 18 52 Z",
    "M13 20 C 11 14, 13 8, 18 5 C 20 11, 18 17, 13 20 Z",
  ];
  const right = [
    "M32 58 C 46 54, 56 42, 56 26 C 56 18, 53 12, 49 8",
    "M53 44 C 60 42, 62 36, 61 30 C 55 32, 52 38, 53 44 Z",
    "M55 32 C 60 28, 61 22, 58 16 C 53 19, 52 26, 55 32 Z",
    "M46 52 C 53 52, 57 48, 58 42 C 52 42, 47 46, 46 52 Z",
    "M51 20 C 53 14, 51 8, 46 5 C 44 11, 46 17, 51 20 Z",
  ];
  const paths = [...left, ...right];
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`${draw ? "draw-self" : ""} ${className}`}
      role="img"
      aria-label={title}
    >
      {paths.map((d, i) => (
        <path key={d} d={d} pathLength={1} style={{ ["--i" as string]: i % 5 }} />
      ))}
    </svg>
  );
}
