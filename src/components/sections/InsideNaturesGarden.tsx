import { LeafMark } from "@/components/brand/LeafMark";
import { TrackedLink } from "@/components/ui/TrackedLink";
import { site } from "@/content/site";
import { isShown } from "@/content/types";

export function InsideNaturesGarden() {
  const { market } = site;
  const href = isShown(market.url) ? market.url.value : site.address.mapsUrl;
  return (
    <section id="inside" className="py-20 sm:py-28" aria-labelledby="inside-title">
      <div className="mx-auto flex max-w-3xl flex-col items-center px-5 text-center sm:px-8">
        <LeafMark className="h-14 w-14 text-hoja" />
        <p className="eyebrow mt-6">Inside {market.name}</p>
        <h2 id="inside-title" className="font-display mt-3 text-h2 leading-[0.95] text-balance">
          A café inside {market.descriptor}.
        </h2>
        <p className="mt-5 max-w-xl text-lg leading-relaxed text-tinta-soft">
          {market.name} has served {site.address.city} since {market.since}. The café lives inside
          the market, so the same care goes into what&rsquo;s on your plate. Here for supplements and
          groceries instead? That&rsquo;s the market, right next to us.
        </p>
        <TrackedLink
          href={href}
          event="shop_link"
          source="inside"
          external
          className="mt-6 inline-flex min-h-12 items-center rounded-full border-2 border-tinta/80 px-5 py-3 font-semibold hover:bg-tinta hover:text-crema"
        >
          Visit the market
        </TrackedLink>
      </div>
    </section>
  );
}
