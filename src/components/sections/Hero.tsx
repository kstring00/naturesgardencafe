import Image from "next/image";
import { EmpanadaIllustration } from "@/components/brand/EmpanadaIllustration";
import { LeafCorner } from "@/components/brand/LeafCorner";
import { OrderDeliveryButton, OrderPickupButton, PhoneLink } from "@/components/ui/OrderActions";
import { site } from "@/content/site";
import { getPhoto } from "@/lib/photos";

const headline = ["Argentinian food,", "organic & natural,", "in Friendswood."];

export function Hero() {
  const photo = getPhoto("empanadas");
  return (
    <section className="relative overflow-hidden pt-28 sm:pt-36" aria-labelledby="hero-title">
      <LeafCorner className="pointer-events-none absolute -top-4 -left-6 hidden h-48 w-48 text-hoja/60 sm:block lg:h-56 lg:w-56" />
      <LeafCorner flip className="pointer-events-none absolute -top-4 -right-6 hidden h-56 w-56 text-hoja/60 lg:block" />

      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <p className="eyebrow fade-up" style={{ ["--d" as string]: "0.1s" }}>
          {site.cuisine} · inside {site.market.name}
        </p>

        <h1
          id="hero-title"
          aria-label={headline.join(" ")}
          className="font-display mt-4 text-hero leading-[0.92]"
        >
          {headline.map((line, i) => (
            <span key={line} className="reveal-line" aria-hidden="true">
              <span style={{ ["--i" as string]: i }}>{line} </span>
            </span>
          ))}
        </h1>

        <div className="mt-10 grid items-end gap-10 lg:grid-cols-[1.25fr_minmax(18rem,30rem)] lg:gap-12">
          <div className="fade-up" style={{ ["--d" as string]: "0.45s" }}>
            <p className="max-w-xl text-xl leading-relaxed text-tinta-soft sm:text-2xl">
              Lomito, milanesa and fresh-baked empanadas, delivered or ready for pickup, from the
              café inside {site.market.name}.
            </p>

            <div id="hero-actions" className="mt-8 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
              <OrderDeliveryButton source="hero" />
              <OrderPickupButton source="hero" />
            </div>

            <p className="mt-5 text-sm font-medium text-tinta-soft">
              {site.delivery.headline} · <PhoneLink source="hero" />
            </p>
          </div>

          <div className="relative mx-auto w-full max-w-[30rem] lg:-mt-12">
            <div data-parallax="36" className="blob-mask relative aspect-[600/480] w-full bg-oliva/15">
              {photo ? (
                <>
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    priority
                    sizes="(min-width: 1024px) 30rem, 92vw"
                    className="object-cover"
                  />
                  <span aria-hidden="true" className="grain absolute inset-0" />
                </>
              ) : (
                <EmpanadaIllustration className="absolute inset-0 h-full w-full p-6 sm:p-10" />
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
