import { LeafWreath } from "./LeafWreath";

/**
 * Logo lockup recreated in vector: leaf wreath + "Nature's Garden" in Fraunces italic
 * + "CAFE & RESTO" in small caps. Replaces the low-res crop from the printed menu.
 */
export function LogoLockup({
  className = "",
  draw = false,
  size = "md",
}: {
  className?: string;
  draw?: boolean;
  size?: "sm" | "md" | "lg";
}) {
  const wreath = size === "lg" ? "h-16 w-16" : size === "sm" ? "h-9 w-9" : "h-11 w-11";
  const word = size === "lg" ? "text-3xl" : size === "sm" ? "text-base" : "text-xl";
  const caps = size === "lg" ? "text-xs" : "text-[0.6rem]";
  return (
    <span className={`inline-flex items-center gap-3 ${className}`}>
      <LeafWreath className={`${wreath} shrink-0 text-oliva`} draw={draw} />
      <span className="flex flex-col leading-none">
        <span className={`font-display-italic ${word} leading-none text-tinta`}>
          Nature&rsquo;s Garden
        </span>
        <span className={`${caps} mt-1 font-sans font-semibold uppercase tracking-[0.22em] text-oliva`}>
          Cafe &amp; Resto
        </span>
      </span>
    </span>
  );
}
