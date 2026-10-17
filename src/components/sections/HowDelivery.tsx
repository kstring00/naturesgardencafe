import { OrderDeliveryButton } from "@/components/ui/OrderActions";
import { site } from "@/content/site";
import { isShown } from "@/content/types";
import { Faq, type FaqItem } from "./Faq";

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
    text: "Empanadas travel well and arrive ready to eat.",
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

const iconProps = {
  viewBox: "0 0 32 32",
  className: "h-7 w-7",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

function CafeIcon() {
  return (
    <svg {...iconProps}>
      <path d="M4 12h24l-2-6H6z" />
      <path d="M6 12v14h20V12" />
      <path d="M13 26v-7h6v7" />
      <path d="M4 12c0 2 2 3 4 3s4-1 4-3c0 2 2 3 4 3s4-1 4-3c0 2 2 3 4 3s4-1 4-3" />
    </svg>
  );
}

function OvenIcon() {
  return (
    <svg {...iconProps}>
      <rect x="5" y="6" width="22" height="20" rx="2" />
      <path d="M5 12h22" />
      <rect x="9" y="15" width="14" height="7" rx="1" />
      <path d="M9 9h2M14 9h2M19 9h2" />
    </svg>
  );
}

function DoorIcon() {
  return (
    <svg {...iconProps}>
      <path d="M9 28V6a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v22" />
      <path d="M5 28h22" />
      <circle cx="18.5" cy="17" r="1.2" fill="currentColor" />
    </svg>
  );
}

const icons = [CafeIcon, OvenIcon, DoorIcon];

export function HowDelivery() {
  const { delivery } = site;

  // Only confirmed answers render. Unconfirmed questions are left out entirely.
  const faq: FaqItem[] = [];
  if (isShown(delivery.typicalAreas)) {
    faq.push({
      question: "How far do you deliver?",
      answer: `Around Friendswood. Typical area: ${delivery.typicalAreas.value.join(", ")}. Not sure about your street? Call and ask.`,
    });
  }
  if (isShown(delivery.timing)) faq.push({ question: "How long does it take?", answer: delivery.timing.value });
  if (isShown(delivery.minimumAndFee)) {
    faq.push({ question: "Is there a minimum or a fee?", answer: delivery.minimumAndFee.value });
  }
  if (isShown(delivery.pickupAhead)) {
    faq.push({ question: "Can I order ahead for pickup?", answer: delivery.pickupAhead.value });
  }

  return (
    <section id="delivery" className="scroll-mt-24 py-20 sm:py-28" aria-labelledby="delivery-title">
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
            {steps.map((step, i) => {
              const Icon = icons[i] ?? DoorIcon;
              return (
                <li key={step.title} className="route-step relative">
                  <span className="route-dot flex h-14 w-14 items-center justify-center rounded-full bg-crema-deep text-tinta ring-4 ring-crema">
                    <Icon />
                  </span>
                  <h3 className="font-display mt-4 text-2xl leading-tight">
                    <span className="sr-only">Step {i + 1}: </span>
                    {step.title}
                  </h3>
                  <p className="mt-2 max-w-xs text-base leading-relaxed text-tinta-soft">{step.text}</p>
                  {i === 2 && isShown(delivery.packaging) && (
                    <p className="mt-1 max-w-xs text-sm text-tinta-soft">{delivery.packaging.value}</p>
                  )}
                </li>
              );
            })}
          </ol>
        </div>

        <div className="mt-16 grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
          <div>
            <h3 className="font-display-plain text-sm font-semibold uppercase tracking-[0.2em] text-oliva">
              Questions about delivery
            </h3>
            <p className="mt-3 max-w-sm text-tinta-soft">
              The short answers. Anything else, the café picks up the phone.
            </p>
          </div>
          <Faq items={faq} label="Delivery questions" />
        </div>

        <div className="mt-14 flex flex-col gap-5 rounded-3xl bg-cielo/15 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
          <div>
            <p className="font-display text-2xl">{delivery.headline}</p>
            {isShown(delivery.typicalAreas) && (
              <p className="mt-1 text-tinta-soft">
                Typical area: {delivery.typicalAreas.value.join(" · ")}
              </p>
            )}
          </div>
          <OrderDeliveryButton source="delivery_section" />
        </div>
      </div>
    </section>
  );
}
