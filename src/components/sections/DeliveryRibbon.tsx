import { OrderDeliveryButton } from "@/components/ui/OrderActions";
import { has, story } from "@/lib/story";
import { RibbonDraw } from "./RibbonDraw";

const steps = [
  { title: "Order", text: "Pick your sandwiches and empanadas and check out in a minute." },
  { title: "We cook it fresh", text: "Your order goes straight to the kitchen inside Nature's Garden." },
  { title: "To your door", text: "Empanadas travel well and arrive ready to eat." },
];

/** Motion 2 of 4: one celeste ribbon draws down the section; the steps hang off it like tags. */
export function DeliveryRibbon() {
  const d = story.delivery;
  const rings = d.rings.filter((r) => r.miles > 0);
  const farthest = rings.length ? Math.max(...rings.map((r) => r.miles)) : 0;

  const faq: { q: string; a: string }[] = [];
  if (farthest) {
    faq.push({
      q: "How far do you deliver?",
      a: `About ${farthest} miles from the café. The rings on the map below show the three zones${rings.some((r) => has(r.label)) ? ", with typical times" : ""}.`,
    });
  }
  if (has(d.time)) faq.push({ q: "How long does it take?", a: d.time });
  if (has(d.fee) || has(d.minimum)) {
    faq.push({ q: "Is there a minimum or a fee?", a: [d.minimum, d.fee].filter(has).join(" ") });
  }
  faq.push({ q: "Can I order ahead for pickup?", a: "Yes. Call and we'll have it ready." });

  return (
    <section id="delivery" className="scroll-mt-24 py-16 sm:py-24" aria-labelledby="delivery-title">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <h2 id="delivery-title" className="display text-title">
          From our oven to your door
        </h2>

        <div className="relative mt-10 grid gap-10 md:grid-cols-12 md:gap-12">
          <div className="relative md:col-span-7">
            <RibbonDraw />
            <ol className="relative space-y-10 pl-16 sm:pl-20">
              {steps.map((s, i) => (
                <li key={s.title} className="relative">
                  {/* the string that ties the tag to the ribbon */}
                  <span aria-hidden="true" className="absolute top-5 -left-8 h-px w-8 bg-trigo sm:-left-12 sm:w-12" />
                  <div className="paper inline-block max-w-md rounded-sm border border-trigo px-5 py-4">
                    <h3 className="display text-2xl">
                      <span className="sr-only">Step {i + 1}: </span>
                      {s.title}
                    </h3>
                    <p className="mt-1 text-base text-tinta-70">{s.text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          <div className="md:col-span-5">
            <dl className="divide-y divide-sombra border-y border-sombra">
              {faq.map((f) => (
                <div key={f.q} className="py-5">
                  <dt className="display text-xl">{f.q}</dt>
                  <dd className="mt-1 text-base leading-relaxed text-tinta-70">{f.a}</dd>
                </div>
              ))}
            </dl>
            <div className="mt-8">
              <OrderDeliveryButton source="delivery" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
