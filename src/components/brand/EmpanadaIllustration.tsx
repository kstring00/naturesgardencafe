/**
 * Line-art empanada, used in the hero until a real photo is dropped in.
 * Half-moon with a crimped (repulgue) edge and three curls of steam.
 */
export function EmpanadaIllustration({ className = "" }: { className?: string }) {
  // Crimp: 14 small arcs along the top curve.
  const crimps: string[] = [];
  const cx = 300;
  const cy = 300;
  const r = 210;
  const n = 14;
  for (let i = 0; i < n; i++) {
    const a0 = Math.PI + (i / n) * Math.PI;
    const a1 = Math.PI + ((i + 1) / n) * Math.PI;
    const am = (a0 + a1) / 2;
    const x0 = cx + r * Math.cos(a0);
    const y0 = cy + r * Math.sin(a0);
    const x1 = cx + r * Math.cos(a1);
    const y1 = cy + r * Math.sin(a1);
    const bx = cx + (r + 26) * Math.cos(am);
    const by = cy + (r + 26) * Math.sin(am);
    crimps.push(`M ${x0.toFixed(1)} ${y0.toFixed(1)} Q ${bx.toFixed(1)} ${by.toFixed(1)} ${x1.toFixed(1)} ${y1.toFixed(1)}`);
  }
  return (
    <svg
      viewBox="0 0 600 460"
      className={className}
      role="img"
      aria-label="Illustration of a crimped empanada with steam rising"
    >
      {/* body */}
      <path
        d={`M ${cx - r} ${cy} A ${r} ${r} 0 0 1 ${cx + r} ${cy} Z`}
        fill="var(--color-dorado)"
        stroke="var(--color-tinta)"
        strokeWidth="5"
        strokeLinejoin="round"
      />
      {/* shading */}
      <path
        d={`M ${cx - r + 40} ${cy - 10} A ${r - 40} ${r - 40} 0 0 1 ${cx + r - 40} ${cy - 10}`}
        fill="none"
        stroke="var(--color-dorado-deep)"
        strokeWidth="14"
        strokeLinecap="round"
        opacity="0.5"
      />
      {/* crimped edge */}
      <path
        d={crimps.join(" ")}
        fill="var(--color-dorado)"
        stroke="var(--color-tinta)"
        strokeWidth="5"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      {/* fork marks */}
      <g stroke="var(--color-tinta)" strokeWidth="4" strokeLinecap="round" opacity="0.6">
        <path d="M 250 230 l 18 -10" />
        <path d="M 300 212 l 0 -20" />
        <path d="M 350 230 l -18 -10" />
      </g>
      {/* steam */}
      <g fill="none" stroke="var(--color-tinta)" strokeWidth="4" strokeLinecap="round" opacity="0.55">
        <path d="M 250 40 c -14 18 14 36 0 56" />
        <path d="M 300 20 c -16 22 16 44 0 66" />
        <path d="M 350 40 c -14 18 14 36 0 56" />
      </g>
    </svg>
  );
}
