import { GroupOrderLink, PhoneLink } from "@/components/ui/OrderActions";
import { empanadas } from "@/content/menu";
import { formatPrice } from "@/lib/format";

export function GroupOrders() {
  return (
    <section id="dozen" className="scroll-mt-24 py-12 sm:py-16" aria-labelledby="dozen-title">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid gap-6 border-y border-trigo py-10 md:grid-cols-12 md:items-center md:gap-12">
          <div className="md:col-span-7">
            <h2 id="dozen-title" className="display text-title">
              Empanadas by the dozen
            </h2>
            <p className="mt-3 max-w-xl text-lg text-tinta-70">
              Office lunch, game day, Sunday dinner. Beef, chicken or spinach,{" "}
              <span className="price">{formatPrice(empanadas.priceEachCents)}</span> each. Text us how many and when.
            </p>
          </div>
          <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:gap-6 md:col-span-5 md:justify-end">
            <GroupOrderLink source="dozen" />
            <p>
              or <PhoneLink source="dozen" label="call" />
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
