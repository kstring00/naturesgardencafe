import { DirectionsLink, PhoneLink } from "@/components/ui/OrderActions";
import { site } from "@/content/site";
import { hoursList, story } from "@/lib/story";
import { DeliveryMap } from "./DeliveryMap";

/** Motion 3 of 4 lives in the map: the service rings draw outward once. */
export function FindUs() {
  const hours = hoursList();
  return (
    <section id="find-us" className="scroll-mt-24 py-16 sm:py-24" aria-labelledby="find-us-title">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid gap-10 md:grid-cols-12 md:gap-12">
          <div className="md:col-span-5">
            <h2 id="find-us-title" className="display text-title">
              Find us
            </h2>
            <p className="mt-5 text-lg leading-relaxed">
              Inside {site.market.name}
              <br />
              <span className="display text-2xl">{site.address.line1}</span>
              <br />
              {site.address.city}, {site.address.state} {site.address.zip}
            </p>
            <p className="mt-3 text-tinta-70">Look for the café counter inside the market.</p>

            {hours.length > 0 && (
              <dl className="mt-6 max-w-xs">
                {hours.map(([d, h]) => (
                  <div key={d} className="flex justify-between gap-4 border-b border-sombra py-1.5">
                    <dt className="text-tinta-70">{d}</dt>
                    <dd className="price text-base">{h}</dd>
                  </div>
                ))}
              </dl>
            )}

            <div className="mt-8 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:gap-6">
              <DirectionsLink source="find_us" />
              <p>
                <PhoneLink source="find_us" />
              </p>
            </div>
          </div>

          <div className="md:col-span-7">
            <DeliveryMap center={story.location} rings={story.delivery.rings} />
            <p className="mt-3 text-sm text-tinta-70">
              Delivery area set by availability. Your address at checkout has the final say.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
