/**
 * Three crimp (repulgue) styles as point lists with the SAME point count, so they
 * can be interpolated: beef = rope braid, chicken = fork-pressed, spinach = scalloped.
 * Points are joined with quadratic curves through midpoints so the edge reads as dough.
 */
export type FillingKey = "beef" | "chicken" | "spinach";

const N = 96;
const CX = 200;
const CY = 232;
const R = 150;

export function crimpPoints(style: FillingKey): [number, number][] {
  const pts: [number, number][] = [];
  for (let i = 0; i <= N; i++) {
    const u = i / N;
    const a = Math.PI + u * Math.PI; // left to right over the top
    let off = 0;
    if (style === "beef") off = Math.sin(u * Math.PI * 24) * 7; // rope: tight even wave
    if (style === "chicken") off = i % 6 === 0 ? -9 : 1; // fork: small pressed notches
    if (style === "spinach") off = Math.abs(Math.sin(u * Math.PI * 8)) * 12; // scallops
    const rr = R + off;
    pts.push([CX + rr * Math.cos(a), CY + rr * Math.sin(a)]);
  }
  return pts;
}

/** Smooth path through the points (quadratic curves via midpoints), closed along the flat base. */
export function toPath(pts: [number, number][]) {
  if (pts.length < 2) return "";
  const first = pts[0]!;
  let d = `M ${first[0].toFixed(1)} ${first[1].toFixed(1)}`;
  for (let i = 1; i < pts.length - 1; i++) {
    const p = pts[i]!;
    const n = pts[i + 1]!;
    const mx = (p[0] + n[0]) / 2;
    const my = (p[1] + n[1]) / 2;
    d += ` Q ${p[0].toFixed(1)} ${p[1].toFixed(1)} ${mx.toFixed(1)} ${my.toFixed(1)}`;
  }
  const last = pts[pts.length - 1]!;
  d += ` L ${last[0].toFixed(1)} ${last[1].toFixed(1)} Z`;
  return d;
}

export function lerpPoints(a: [number, number][], b: [number, number][], t: number): [number, number][] {
  return a.map(([x, y], i) => {
    const [bx, by] = b[i] ?? [x, y];
    return [x + (bx - x) * t, y + (by - y) * t];
  });
}

export const fillingLook: Record<FillingKey, { fill: string; window: string; name: string }> = {
  beef: { fill: "#d9a441", window: "#7d4a2b", name: "Beef" },
  chicken: { fill: "#dcab4f", window: "#e6c98d", name: "Chicken" },
  spinach: { fill: "#d6a243", window: "#5f7a3a", name: "Spinach" },
};

/** The inner crust (under the crimp) and the filling window cut into it. */
export const INNER_PATH = `M ${CX - R + 14} ${CY} A ${R - 14} ${R - 14} 0 0 1 ${CX + R - 14} ${CY} Z`;
export const WINDOW_PATH = `M ${CX - 62} ${CY - 46} C ${CX - 40} ${CY - 96}, ${CX + 40} ${CY - 96}, ${CX + 62} ${CY - 46} C ${CX + 72} ${CY - 22}, ${CX - 72} ${CY - 22}, ${CX - 62} ${CY - 46} Z`;
export const BASE_LINE = `M ${CX - R} ${CY} L ${CX + R} ${CY}`;
