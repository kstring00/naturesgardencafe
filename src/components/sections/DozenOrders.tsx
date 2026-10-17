import { CrimpIcon } from "@/components/ui/CrimpIcon";
import { GroupOrderLink, PhoneLink } from "@/components/ui/OrderActions";
import { empanadas } from "@/content/menu";
import { isShown } from "@/content/types";
import { formatPrice } from "@/lib/format";

export function DozenOrders() {
  return (
    <section id="dozen" className="scroll-mt-24 py-10 sm:py-16" aria-labelledby="dozen-title">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid gap-10 overflow-hidden rounded-[2.5rem] bg-oliva px-7 py-12 text-crema sm:px-12 sm:py-16 lg:grid-cols-[1.3fr_1fr] lg:items-center">
          <div>
            <p className="eyebrow !text-dorado">For the office and the family table</p>
            <h2 id="dozen-title" className="font-display mt-3 text-h2 leading-[0.95]">
              Empanadas by the dozen.
            </h2>
            <p className="mt-5 max-w-lg text-lg leading-relaxed text-crema/85">
              Office lunch, game day, Sunday dinner. Beef, chicken or spinach,{" "}
              <span className="price !text-dorado">{formatPrice(empanadas.priceEachCents)}</span> each.
              Text us how many and when, and we&rsquo;ll confirm.
            </p>
            {isShown(empanadas.dozenPrice) && (
              <p className="mt-2 text-crema/85">
                A dozen: <span className="price !text-dorado">{formatPrice(empanadas.dozenPrice.value)}</span>
              </p>
            )}
            <div className="mt-8 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:gap-6">
              <GroupOrderLink source="dozen" />
              <p className="text-crema/85">
                or <PhoneLink source="dozen" className="text-crema hover:text-dorado" />
              </p>
            </div>
          </div>

          <ul className="flex items-end justify-center gap-4 sm:gap-6" aria-hidden="true">
            {empanadas.fillings.map((f, i) => (
              <li key={f.filling} className={i === 1 ? "-translate-y-6" : ""}>
                <CrimpIcon
                  filling={f.filling}
                  className="h-24 w-24 drop-shadow-[0_18px_30px_rgba(0,0,0,0.25)] sm:h-32 sm:w-32"
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
