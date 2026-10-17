import { LeafWreath } from "@/components/brand/LeafWreath";
import { CallLink, OrderDeliveryButton } from "@/components/ui/OrderActions";
import { Photo } from "@/components/ui/Photo";
import { empanadas, sandwiches } from "@/content/menu";
import { formatPrice } from "@/lib/format";
import { getPhoto } from "@/lib/photos";
import { empanadaChapters, has, story } from "@/lib/story";
import { PamphletFold, PanelCounter } from "./PamphletFold";

const panelFace = "paper relative flex h-full flex-col border border-trigo/80 p-5 sm:p-6";

function Back() {
  return (
    <div aria-hidden="true" className="panel-back paper absolute inset-0 flex items-center justify-center border border-trigo/80">
      <LeafWreath className="h-24 w-24 text-trigo" title="" />
    </div>
  );
}

/** La carta as a tri-fold pamphlet: it opens as it enters the viewport; on phones it swipes. */
export function Pamphlet() {
  const lomito = getPhoto("lomito") ?? getPhoto("milanesa");
  const tray = getPhoto("tray");
  const board = getPhoto("board");
  const showBoard = has(story.dailyBoard) && board;
  const hasStories = empanadaChapters().length > 0;

  return (
    <section id="carta" className="scroll-mt-24 py-16 sm:py-24" aria-labelledby="carta-title">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex items-end justify-between gap-6">
          <h2 id="carta-title" className="display text-title">
            La carta
          </h2>
          <PanelCounter />
        </div>
      </div>

      <PamphletFold>
        <div className="pamphlet-stage mx-auto mt-8 max-w-6xl px-5 sm:px-8 md:px-8">
          <div className="pamphlet snap-x-carousel flex gap-3 overflow-x-auto pr-[14vw] md:grid md:grid-cols-3 md:gap-0 md:overflow-visible md:pr-0">
            {/* Left: sandwiches */}
            <article className="panel pamphlet-left relative w-[82vw] shrink-0 md:w-auto" aria-label="Sandwiches">
              <div className={panelFace}>
                {lomito && <Photo photo={lomito} sizes="(min-width: 768px) 30vw, 82vw" className="aspect-[4/3] rounded-sm" fill />}
                <h3 className="display mt-5 text-2xl">Sandwiches</h3>
                <ul className="mt-3 flex-1 space-y-4">
                  {sandwiches.map((s) => (
                    <li key={s.slug}>
                      <div className="flex items-baseline">
                        <p className="display text-lg leading-tight">{s.name}</p>
                        <span className="leader" aria-hidden="true" />
                        <p className="price shrink-0 text-lg">{formatPrice(s.priceCents)}</p>
                      </div>
                      <p className="mt-1 text-sm text-tinta-70">{s.description}</p>
                    </li>
                  ))}
                </ul>
              </div>
              <Back />
            </article>

            {/* Center: empanadas */}
            <article className="panel relative w-[82vw] shrink-0 md:w-auto" aria-label="Empanadas">
              <div className={panelFace}>
                <div className="flex items-baseline justify-between">
                  <h3 className="display text-2xl">Empanadas</h3>
                  <p className="price text-lg">{formatPrice(empanadas.priceEachCents)} each</p>
                </div>
                {tray && <Photo photo={tray} sizes="(min-width: 768px) 30vw, 82vw" className="mt-4 aspect-[4/3] rounded-sm" fill />}
                <ul className="mt-5 space-y-2">
                  {empanadas.fillings.map((f) => (
                    <li key={f.key} className="flex items-baseline justify-between border-b border-sombra pb-2">
                      <p className="display text-lg">{f.name}</p>
                      {f.vegetarian && <p className="text-xs font-semibold text-verde">Vegetarian</p>}
                    </li>
                  ))}
                </ul>
                <p className="display-italic mt-4 text-base text-tinta">Each filling gets its own crimp so you can tell them apart.</p>
                {hasStories && (
                  <a href="#historias" className="mt-2 inline-block text-sm font-semibold underline decoration-trigo decoration-2 underline-offset-4 hover:text-verde">
                    Read their stories
                  </a>
                )}
              </div>
            </article>

            {/* Right: today's board */}
            <article className="panel pamphlet-right relative w-[82vw] shrink-0 md:w-auto" aria-label="Today's board">
              <div className={panelFace}>
                <h3 className="display text-2xl">Today&rsquo;s board</h3>
                {showBoard ? (
                  <>
                    <Photo photo={board} sizes="(min-width: 768px) 30vw, 82vw" className="mt-4 aspect-[4/3] rounded-sm" fill />
                    <p className="mt-4 text-base leading-relaxed text-tinta-70">{story.dailyBoard}</p>
                  </>
                ) : (
                  <p className="mt-4 text-lg leading-relaxed">
                    Soups and salads change daily. <CallLink source="carta" variant="quiet" size="md" className="!min-h-0 !p-0 !text-lg" label="Call for today's board" />.
                  </p>
                )}
                <div className="mt-auto pt-8">
                  <OrderDeliveryButton source="carta" className="w-full" />
                </div>
              </div>
              <Back />
            </article>
          </div>
        </div>
      </PamphletFold>
    </section>
  );
}
