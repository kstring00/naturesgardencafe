import { OrderDeliveryButton } from "@/components/ui/OrderActions";
import { site } from "@/content/site";
import { isShown } from "@/content/types";

const steps = [
  {
    title: "Order online",
    text: "Pick your sandwiches and empanadas and check out in a minute.",
  },
  {
    title: "We cook it fresh",
    text: "Your order goes straight to the kitchen inside Nature's Garden.",
  },
  {
    title: "A driver brings it to your door",
    text: "Empanadas were made for travel. They arrive ready to eat.",
  },
];

/** Cielo-blue dotted route from the café to a front door. Draws on scroll. */
function RoutePath({ orientation }: { orientation: "horizontal" | "vertical" }) {
  const horizontal = orientation === "horizontal";
  const d = horizontal
    ? "M 60 50 C 200 10, 320 90, 500 50 S 800 10, 940 50"
    : "M 24 40 C 60 120, -10 220, 24 300 S 60 440, 24 560";
  const viewBox = horizontal ? "0 0 1000 100" : "0 0 48 600";
  const id = `route-${orientation}`;
  return (
    <svg
      viewBox={viewBox}
      preserveAspectRatio="none"
      aria-hidden="true"
      className={
        horizontal
          ? "absolute inset-x-0 top-0 hidden h-14 w-full md:block"
          : "absolute top-0 bottom-0 left-0 h-full w-12 md:hidden"
      }
    >
      <defs>
        <mask id={id} maskUnits="userSpaceOnUse">
          <path
            d={d}
            data-draw-path
            fill="none"
            stroke="#fff"
            strokeWidth={horizontal ? 24 : 12}
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
          />
        </mask>
      </defs>
      <path
        d={d}
        fill="none"
        stroke="var(--color-cielo)"
        strokeWidth="3"
        strokeLinecap="round"
        strokeDasharray="1 10"
        vectorEffect="non-scaling-stroke"
        mask={`url(#${id})`}
      />
    </svg>
  );
}

function CafeIcon() {
  return (
    <svg viewBox="0 0 32 32" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M4 12h24l-2-6H6z" />
      <path d="M6 12v14h20V12" />
      <path d="M13 26v-7h6v7" />
      <path d="M4 12c0 2 2 3 4 3s4-1 4-3c0 2 2 3 4 3s4-1 4-3c0 2 2 3 4 3s4-1 4-3" />
    </svg>
  );
}

function DoorIcon() {
  return (
    <svg viewBox="0 0 32 32" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M9 28V6a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v22" />
      <path d="M5 28h22" />
      <circle cx="18.5" cy="17" r="1.2" fill="currentColor" />
    </svg>
  );
}

export function HowDelivery() {
  const { delivery } = site;
  return (
    <section id="delivery" className="scroll-mt-20 py-20 sm:py-28" aria-labelledby="delivery-title">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="max-w-2xl">
          <p className="eyebrow">How delivery works</p>
          <h2 id="delivery-title" className="font-display mt-3 text-h2 leading-[0.95]">
            From our oven to your door.
          </h2>
        </div>

        <div data-route data-draw-trigger className="relative mt-14">
          <RoutePath orientation="horizontal" />
          <RoutePath orientation="vertical" />

          <ol className="relative grid gap-10 pl-14 md:grid-cols-3 md:gap-8 md:pl-0">
            {steps.map((step, i) => (
              <li key={step.title} className="route-step relative">
                <div className="flex items-center gap-3 md:flex-col md:items-start">
                  <span className="route-dot flex h-14 w-14 items-center justify-center rounded-full bg-crema-deep text-tinta ring-4 ring-crema">
                    {i === 0 ? <CafeIcon /> : i === steps.length - 1 ? <DoorIcon /> : <span className="font-display text-xl">2</span>}
                  </span>
                </div>
                <h3 className="font-display mt-4 text-2xl leading-tight">{step.title}</h3>
                <p className="mt-2 max-w-xs text-base leading-relaxed text-tinta-soft">{step.text}</p>
              </li>
            ))}
          </ol>
        </div>

        <div className="mt-14 flex flex-col gap-5 rounded-3xl bg-cielo/15 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
          <div>
            <p className="font-display text-2xl">{delivery.headline}</p>
            {isShown(delivery.areaLine) && (
              <p className="mt-1 text-tinta-soft">{delivery.areaLine.value}</p>
            )}
            {isShown(delivery.packaging) && (
              <p className="mt-1 text-tinta-soft">{delivery.packaging.value}</p>
            )}
          </div>
          <OrderDeliveryButton source="delivery_section" />
        </div>
      </div>
    </section>
  );
}
