import Image from "next/image";
import { EmpanadaIllustration } from "@/components/brand/EmpanadaIllustration";
import { CallLink, OrderDeliveryButton, OrderPickupButton } from "@/components/ui/OrderActions";
import { site } from "@/content/site";
import { isShown } from "@/content/types";

const headline = ["Argentinian food,", "organic & natural,", "in Friendswood."];

export function Hero() {
  const hero = site.heroImage;
  return (
    <section className="relative overflow-hidden pt-28 sm:pt-36" aria-labelledby="hero-title">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <p className="eyebrow fade-up" style={{ ["--d" as string]: "0.1s" }}>
          {site.cuisine} · inside {site.market.name}
        </p>

        <h1 id="hero-title" className="font-display mt-4 text-hero leading-[0.92] text-balance">
          {headline.map((line, i) => (
            <span key={line} className="reveal-line">
              <span style={{ ["--i" as string]: i }}>{line}</span>
            </span>
          ))}
        </h1>

        <div className="mt-10 grid items-end gap-10 lg:grid-cols-[1.25fr_minmax(18rem,32rem)] lg:gap-12">
          <div className="fade-up" style={{ ["--d" as string]: "0.45s" }}>
            <p className="max-w-xl text-xl leading-relaxed text-tinta-soft sm:text-2xl">
              Lomito, milanesa and fresh-baked empanadas, delivered or ready for pickup.
            </p>

            <div id="hero-actions" className="mt-8 flex flex-col items-start gap-4 sm:flex-row sm:flex-wrap sm:items-center">
              <OrderDeliveryButton source="hero" />
              <OrderPickupButton source="hero" />
              <CallLink source="hero" />
            </div>

            <p className="mt-6 text-sm font-medium tracking-wide text-oliva">
              {site.taglines.mood} · {site.taglines.fresh}
            </p>
          </div>

          <div className="relative mx-auto w-full max-w-[32rem] lg:-mt-16" aria-hidden={!isShown(hero)}>
            <div data-parallax="36" className="blob-mask relative aspect-[600/480] w-full bg-oliva/15">
              {isShown(hero) ? (
                <Image
                  src={hero.value.src}
                  alt={hero.value.alt}
                  fill
                  priority
                  sizes="(min-width: 1024px) 36rem, 92vw"
                  className="object-cover"
                />
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
