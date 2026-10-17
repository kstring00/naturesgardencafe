import type { Filling } from "@/content/menu";

/**
 * A small empanada icon with a different crimp pattern per filling: a nod to the
 * Argentine tradition of crimping each filling its own way. Decoration only.
 */
export function CrimpIcon({
  filling,
  className = "h-10 w-10",
}: {
  filling: Filling;
  className?: string;
}) {
  const cx = 24;
  const cy = 30;
  const r = 18;
  const body = `M ${cx - r} ${cy} A ${r} ${r} 0 0 1 ${cx + r} ${cy} Z`;

  let edge = "";
  if (filling === "beef") {
    // rope braid: tight zigzag
    const parts: string[] = [];
    const n = 9;
    for (let i = 0; i <= n; i++) {
      const a = Math.PI + (i / n) * Math.PI;
      const rr = i % 2 === 0 ? r + 3 : r - 1;
      parts.push(`${i === 0 ? "M" : "L"} ${(cx + rr * Math.cos(a)).toFixed(1)} ${(cy + rr * Math.sin(a)).toFixed(1)}`);
    }
    edge = parts.join(" ");
  } else if (filling === "chicken") {
    // fork-pressed: short ticks
    const parts: string[] = [];
    const n = 7;
    for (let i = 0; i <= n; i++) {
      const a = Math.PI + (i / n) * Math.PI;
      parts.push(
        `M ${(cx + (r - 4) * Math.cos(a)).toFixed(1)} ${(cy + (r - 4) * Math.sin(a)).toFixed(1)} L ${(cx + (r + 3) * Math.cos(a)).toFixed(1)} ${(cy + (r + 3) * Math.sin(a)).toFixed(1)}`,
      );
    }
    edge = parts.join(" ");
  } else {
    // scalloped: soft arcs
    const parts: string[] = [];
    const n = 6;
    for (let i = 0; i < n; i++) {
      const a0 = Math.PI + (i / n) * Math.PI;
      const a1 = Math.PI + ((i + 1) / n) * Math.PI;
      const am = (a0 + a1) / 2;
      parts.push(
        `M ${(cx + r * Math.cos(a0)).toFixed(1)} ${(cy + r * Math.sin(a0)).toFixed(1)} Q ${(cx + (r + 6) * Math.cos(am)).toFixed(1)} ${(cy + (r + 6) * Math.sin(am)).toFixed(1)} ${(cx + r * Math.cos(a1)).toFixed(1)} ${(cy + r * Math.sin(a1)).toFixed(1)}`,
      );
    }
    edge = parts.join(" ");
  }

  return (
    <svg viewBox="0 0 48 40" className={className} aria-hidden="true" focusable="false">
      <path d={body} fill="var(--color-dorado)" stroke="var(--color-tinta)" strokeWidth="2" strokeLinejoin="round" />
      <path d={edge} fill="none" stroke="var(--color-tinta)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
