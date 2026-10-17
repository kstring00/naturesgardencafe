import Link from "next/link";
import { LeafMark } from "@/components/brand/LeafMark";
import { TrackedLink } from "@/components/ui/TrackedLink";
import { site, telHref } from "@/content/site";
import { isShown } from "@/content/types";

export function SiteFooter() {
  const hours = site.hours;
  return (
    <footer className="border-t border-tinta/10 bg-crema-deep/60 pb-28 md:pb-10">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 pt-14 sm:px-8 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-3">
            <LeafMark className="h-9 w-9 text-oliva" />
            <p className="font-display-plain text-2xl">{site.name}</p>
          </div>
          <p className="mt-3 max-w-sm text-tinta-soft">
            {site.cuisine}. {site.taglines.organic}, {site.taglines.fresh.toLowerCase()}. Inside{" "}
            {site.market.name}, {site.address.city}.
          </p>
        </div>

        <div>
          <p className="eyebrow">Visit</p>
          <address className="mt-3 not-italic leading-relaxed">
            {site.address.line1}
            <br />
            {site.address.city}, {site.address.state} {site.address.zip}
          </address>
          <TrackedLink
            href={site.address.mapsUrl}
            event="map"
            source="footer"
            className="mt-2 inline-block underline decoration-dorado decoration-2 underline-offset-4 hover:text-oliva"
            external
          >
            Open in Maps
          </TrackedLink>
        </div>

        <div>
          <p className="eyebrow">Call</p>
          <a href={telHref} className="font-display-plain mt-3 block text-2xl hover:text-oliva">
            {site.phone.display}
          </a>
          {isShown(hours) && (
            <dl className="mt-4 space-y-1 text-sm">
              {hours.value.map((h) => (
                <div key={h.days} className="flex justify-between gap-4">
                  <dt className="text-tinta-soft">{h.days}</dt>
                  <dd>
                    {h.open} – {h.close}
                  </dd>
                </div>
              ))}
            </dl>
          )}
        </div>
      </div>

      <div className="mx-auto mt-12 flex max-w-7xl flex-col gap-3 border-t border-tinta/10 px-5 py-6 text-sm text-tinta-soft sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <p>
          &copy; {site.year} {site.name}. All rights reserved.
        </p>
        <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
          <Link href="/privacy" className="hover:text-tinta">
            Privacy policy
          </Link>
          {site.demo && (
            <span className="rounded-full border border-tinta/20 px-3 py-1 text-xs">
              Demo preview · illustrations stand in for photos; ordering connects at launch
            </span>
          )}
        </div>
      </div>
    </footer>
  );
}
