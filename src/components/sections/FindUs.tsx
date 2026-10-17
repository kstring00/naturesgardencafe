import { MapCard } from "@/components/ui/MapCard";
import { DirectionsLink, PhoneLink } from "@/components/ui/OrderActions";
import { site } from "@/content/site";
import { isShown } from "@/content/types";
import { MarketLink } from "./MarketLink";

export function FindUs() {
  const hours = site.hours;
  return (
    <section id="find-us" className="scroll-mt-24 py-20 sm:py-28" aria-labelledby="find-us-title">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:items-center lg:gap-16">
          <div>
            <p className="eyebrow">Find us</p>
            <h2 id="find-us-title" className="font-display mt-3 text-h2 leading-[0.95] text-balance">
              Inside {site.market.name}, {site.address.suite.toLowerCase()}.
            </h2>
            <p className="mt-5 max-w-lg text-lg leading-relaxed text-tinta-soft">
              {site.market.name} has been {site.market.descriptor} since {site.market.since}. The café
              lives inside the market on W Parkwood, so the same care goes into what&rsquo;s on your
              plate. Here for supplements and groceries? Same door.
            </p>
            {isShown(site.story) && (
              <p className="mt-4 max-w-lg text-base leading-relaxed text-tinta-soft">{site.story.value}</p>
            )}

            <address className="mt-8 not-italic">
              <p className="font-display text-2xl">{site.address.line1}</p>
              <p className="text-tinta-soft">
                {site.address.city}, {site.address.state} {site.address.zip}
              </p>
            </address>

            <div className="mt-6 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:gap-6">
              <DirectionsLink source="find_us" />
              <p className="text-tinta-soft">
                <PhoneLink source="find_us" />
              </p>
            </div>

            {isShown(hours) ? (
              <dl className="mt-8 max-w-xs space-y-1">
                <p className="eyebrow mb-2">Hours</p>
                {hours.value.map((h) => (
                  <div key={h.days} className="flex justify-between gap-4 border-b border-regla py-1">
                    <dt className="text-tinta-soft">{h.days}</dt>
                    <dd className="price text-base">
                      {h.open} – {h.close}
                    </dd>
                  </div>
                ))}
              </dl>
            ) : (
              <p className="mt-6 text-sm text-tinta-soft">Call for today&rsquo;s hours.</p>
            )}
          </div>

          <div className="pt-6 lg:pt-0">
            <MapCard />
            <p className="mt-5 text-center text-tinta-soft">
              Look for the café counter inside the market.
            </p>
            <p className="mt-2 text-center">
              <MarketLink />
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
