import { CrimpIcon } from "@/components/ui/CrimpIcon";
import { CallLink } from "@/components/ui/OrderActions";
import { empanadas, fullMenu, sandwiches } from "@/content/menu";
import { site } from "@/content/site";
import { isShown } from "@/content/types";
import { formatPrice } from "@/lib/format";
import { MenuList } from "./MenuList";

export function Menu() {
  return (
    <section id="menu" className="scroll-mt-20 py-20 sm:py-28" aria-labelledby="menu-title">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)] lg:gap-16">
          <div className="lg:sticky lg:top-24 lg:self-start">
            <p className="eyebrow">La carta</p>
            <h2 id="menu-title" className="font-display mt-3 text-h2 leading-[0.95]">
              Argentine classics, made the home-style way.
            </h2>
            <p className="mt-5 max-w-md text-lg leading-relaxed text-tinta-soft">
              Lomito, milanesa, chorizo and empanadas, the dishes every Argentine grows up on.
            </p>
            <p className="mt-5 inline-flex items-center gap-2 rounded-full border border-hoja/50 bg-hoja/10 px-4 py-2 text-sm font-semibold text-oliva">
              <span aria-hidden="true">🌿</span>
              {site.taglines.organic} ingredients · {site.taglines.fresh.toLowerCase()}
            </p>
            {isShown(site.story) && (
              <p className="mt-6 max-w-md text-base leading-relaxed text-tinta-soft">{site.story.value}</p>
            )}
          </div>

          <div>
            <h3 className="font-display-plain text-sm font-semibold uppercase tracking-[0.2em] text-oliva">
              Sandwiches
            </h3>
            <MenuList items={sandwiches} />

            <div className="mt-16">
              <div className="flex flex-wrap items-baseline justify-between gap-3">
                <h3 className="font-display-plain text-sm font-semibold uppercase tracking-[0.2em] text-oliva">
                  Empanadas
                </h3>
                <p className="price text-2xl">{formatPrice(empanadas.priceEachCents)} each</p>
              </div>
              <ul className="mt-6 grid gap-4 sm:grid-cols-3">
                {empanadas.fillings.map((f) => (
                  <li
                    key={f.filling}
                    className="flex items-center gap-4 rounded-2xl border border-tinta/10 bg-crema-deep/50 p-4"
                  >
                    <CrimpIcon filling={f.filling} className="h-12 w-12 shrink-0" />
                    <div>
                      <p className="font-display text-xl">{f.name}</p>
                      <p className="text-sm text-tinta-soft">{f.description}</p>
                    </div>
                  </li>
                ))}
              </ul>
              <p className="mt-3 text-xs text-tinta-soft">
                Crimp patterns are a nod to tradition: in Argentina each filling gets its own fold.
              </p>
            </div>

            {!isShown(fullMenu) && (
              <div className="mt-14 flex flex-col gap-4 rounded-3xl border border-dashed border-tinta/20 p-6 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-lg">
                  This is part of the menu. Soups, salads and the rest change with the day.
                </p>
                <CallLink source="menu" variant="secondary" size="md" label="Call for the full menu" />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
