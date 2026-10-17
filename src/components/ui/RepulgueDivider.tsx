/**
 * The repulgue divider: the crimped edge of an empanada as a wave line that
 * sketches itself across the page on scroll (see MotionProvider, data-draw-path).
 * It is fully visible without JS; motion only enhances.
 */
export function RepulgueDivider({
  tone = "dorado",
  flip = false,
}: {
  tone?: "dorado" | "oliva" | "cielo";
  flip?: boolean;
}) {
  const w = 1200;
  const step = 40;
  const amp = 14;
  const parts: string[] = [`M 0 20`];
  for (let x = 0; x < w; x += step) {
    const mid = x + step / 2;
    parts.push(`Q ${mid} ${20 - amp} ${x + step} 20`);
  }
  const d = parts.join(" ");
  const color =
    tone === "dorado"
      ? "var(--color-dorado)"
      : tone === "oliva"
        ? "var(--color-hoja)"
        : "var(--color-cielo)";

  return (
    <div aria-hidden="true" className="relative mx-auto w-full max-w-7xl px-5 py-2 sm:px-8">
      <svg
        viewBox={`0 0 ${w} 40`}
        preserveAspectRatio="none"
        className={`block h-6 w-full ${flip ? "scale-y-[-1]" : ""}`}
      >
        <path
          d={d}
          data-draw-path
          fill="none"
          stroke={color}
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
    </div>
  );
}
