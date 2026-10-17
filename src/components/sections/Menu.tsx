import Image from "next/image";
import { CrimpIcon } from "@/components/ui/CrimpIcon";
import { OrderDeliveryButton, PhoneLink } from "@/components/ui/OrderActions";
import { empanadas, menuNotes, sandwiches } from "@/content/menu";
import { site } from "@/content/site";
import { isShown } from "@/content/types";
import { formatPrice } from "@/lib/format";
import { getPhoto } from "@/lib/photos";
import { MenuList } from "./MenuList";

function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-hoja/50 bg-hoja/10 px-2.5 py-0.5 text-xs font-semibold text-oliva">
      {children}
    </span>
  );
}

export function Menu() {
  const sandwichPhoto = getPhoto("sandwiches");
  const empanadaPhoto = getPhoto("empanadas");

  return (
    <section id="menu" className="scroll-mt-24 py-20 sm:py-28" aria-labelledby="menu-title">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)] lg:gap-16">
          {/* Intro */}
          <div className="lg:sticky lg:top-28 lg:self-start">
            <p className="eyebrow">La carta</p>
            <h2 id="menu-title" className="font-display mt-3 text-h2 leading-[0.95]">
              Argentine classics, made the home-style way.
            </h2>
            <p className="mt-5 max-w-md text-lg leading-relaxed text-tinta-soft">
              Lomito, milanesa, chorizo and empanadas: the dishes every Argentine grows up on.
            </p>
            <p className="mt-4 inline-flex items-center gap-2 rounded-full border border-hoja/50 bg-hoja/10 px-4 py-2 text-sm font-semibold text-oliva">
              <span aria-hidden="true">🌿</span>
              {site.taglines.organic} ingredients · {site.taglines.fresh.toLowerCase()}
            </p>
            <p className="mt-5 max-w-md text-base leading-relaxed text-tinta-soft">
              {menuNotes.partial}
            </p>
            {isShown(site.glutenFree) && (
              <p className="mt-3 max-w-md text-base text-tinta-soft">{site.glutenFree.value}</p>
            )}
            {isShown(site.story) && (
              <p className="mt-6 max-w-md text-base leading-relaxed text-tinta-soft">{site.story.value}</p>
            )}
          </div>

          <div>
            {/* Sandwiches */}
            <div className="flex items-end justify-between gap-6">
              <h3 className="font-display-plain text-sm font-semibold uppercase tracking-[0.2em] text-oliva">
                Sandwiches
              </h3>
            </div>
            {sandwichPhoto && (
              <figure className="photo-card mt-5 lg:hidden">
                <Image
                  src={sandwichPhoto.src}
                  alt={sandwichPhoto.alt}
                  width={sandwichPhoto.width}
                  height={sandwichPhoto.height}
                  sizes="(min-width: 640px) 36rem, 92vw"
                  className="aspect-[670/460] w-full object-cover"
                />
              </figure>
            )}
            <MenuList items={sandwiches} photo={sandwichPhoto} />

            {/* Empanadas */}
            <div className="mt-16">
              <div className="flex flex-wrap items-baseline justify-between gap-3">
                <h3 className="font-display-plain text-sm font-semibold uppercase tracking-[0.2em] text-oliva">
                  Empanadas
                </h3>
                <p className="price text-2xl">{formatPrice(empanadas.priceEachCents)} each</p>
              </div>
              <p className="mt-3 max-w-lg text-base text-tinta-soft">{empanadas.intro}</p>

              {empanadaPhoto && (
                <figure className="photo-card mt-6">
                  <Image
                    src={empanadaPhoto.src}
                    alt={empanadaPhoto.alt}
                    width={empanadaPhoto.width}
                    height={empanadaPhoto.height}
                    sizes="(min-width: 1024px) 44rem, 92vw"
                    className="aspect-[960/380] w-full object-cover"
                  />
                </figure>
              )}

              <ul className="mt-6 grid gap-4 sm:grid-cols-3">
                {empanadas.fillings.map((f) => (
                  <li
                    key={f.filling}
                    className="flex items-center gap-4 rounded-2xl border border-regla bg-crema-deep/50 p-4"
                  >
                    <CrimpIcon filling={f.filling} className="h-12 w-12 shrink-0" />
                    <div>
                      <p className="font-display text-xl">{f.name}</p>
                      <p className="text-sm text-tinta-soft">{f.description}</p>
                      {f.tags?.includes("vegetarian") && (
                        <div className="mt-1">
                          <Tag>Vegetarian</Tag>
                        </div>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
              <p className="mt-3 text-xs text-tinta-soft">
                In Argentina each filling gets its own crimp, so you can tell them apart. Ours too.
              </p>
            </div>

            {/* Menu CTA */}
            <div className="mt-14 flex flex-col gap-5 rounded-3xl border border-regla bg-crema-deep/40 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
              <div>
                <p className="font-display text-2xl">Ready when you are.</p>
                <p className="mt-1 text-tinta-soft">
                  <PhoneLink source="menu" /> for today&rsquo;s soups and salads.
                </p>
              </div>
              <OrderDeliveryButton source="menu" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
