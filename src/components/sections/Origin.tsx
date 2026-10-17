import { CornerRibbon } from "@/components/brand/Ribbon";
import { MarketLink } from "@/components/ui/OrderActions";
import { Photo } from "@/components/ui/Photo";
import { site } from "@/content/site";
import { getPhoto } from "@/lib/photos";
import { has, story } from "@/lib/story";

/** The origin story, in Marina's words. Hidden until story.origin has text. */
export function Origin() {
  if (!has(story.origin)) return null;
  const photo = getPhoto("marina") ?? getPhoto("counter");
  return (
    <section id="origin" className="scroll-mt-24 py-16 sm:py-24" aria-labelledby="origin-title">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid gap-10 md:grid-cols-12 md:gap-12">
          <div className="md:col-span-7">
            <h2 id="origin-title" className="display text-title">
              Inside Nature&rsquo;s Garden
            </h2>
            <p className="display mt-6 max-w-[62ch] text-xl leading-relaxed sm:text-2xl">{story.origin}</p>
            {has(story.whyArgentine) && <p className="mt-5 max-w-[62ch] text-lg leading-relaxed text-tinta-70">{story.whyArgentine}</p>}
            <p className="mt-6">
              <MarketLink source="origin" />
            </p>
          </div>
          {photo && (
            <div className="relative md:col-span-5">
              <div className="border border-trigo p-1.5">
                <Photo photo={photo} sizes="(min-width: 768px) 40vw, 92vw" className="aspect-[4/5]" fill />
              </div>
              <CornerRibbon className="absolute -top-3 -left-3 text-base">since {site.market.since}</CornerRibbon>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
