import { CornerRibbon } from "@/components/brand/Ribbon";
import { WreathCanvas } from "@/components/three/WreathCanvas";

/**
 * Motion 4 of 4: nine hundred leaves gather into Marina's wreath.
 * The words are HTML over the canvas, so they are selectable and indexable.
 */
export function WreathMoment() {
  return (
    <section className="relative h-[40vh] min-h-[22rem] w-full overflow-hidden bg-blanco md:h-[60vh]" aria-label="Nature's Garden">
      <WreathCanvas />
      <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center text-center">
        <p className="display-italic text-[clamp(1.6rem,4.6vw,3.6rem)] text-tinta">Nature&rsquo;s Garden</p>
        <CornerRibbon className="mt-2 text-sm sm:text-base">Cafe &amp; Resto</CornerRibbon>
      </div>
    </section>
  );
}
