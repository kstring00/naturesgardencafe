import { LeafWreath } from "./LeafWreath";

/** Wreath + "Nature's Garden" in Bodoni italic + a small celeste tag for the café. */
export function LogoLockup({ className = "", size = "md", tone = "dark" }: { className?: string; size?: "sm" | "md" | "lg"; tone?: "dark" | "light" }) {
  const wreath = size === "lg" ? "h-16 w-16" : size === "sm" ? "h-9 w-9" : "h-11 w-11";
  const word = size === "lg" ? "text-4xl" : size === "sm" ? "text-lg" : "text-2xl";
  return (
    <span className={`inline-flex items-center gap-3 ${className}`}>
      <LeafWreath className={`${wreath} shrink-0 ${tone === "light" ? "text-blanco" : "text-verde"}`} />
      <span className="flex flex-col leading-none">
        <span className={`display-italic ${word} ${tone === "light" ? "text-blanco" : "text-tinta"}`}>Nature&rsquo;s Garden</span>
        <span className="mt-1 inline-flex w-fit items-center rounded-sm bg-celeste px-1.5 py-0.5 text-[0.68rem] font-semibold text-tinta">
          Cafe &amp; Resto
        </span>
      </span>
    </span>
  );
}
