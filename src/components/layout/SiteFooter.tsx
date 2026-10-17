import Link from "next/link";
import { LeafWreath } from "@/components/brand/LeafWreath";
import { PhoneLink } from "@/components/ui/OrderActions";
import { site } from "@/content/site";

function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden="true">
      <path d="M13.5 22v-8h2.7l.4-3.2h-3.1V8.8c0-.9.3-1.6 1.6-1.6h1.7V4.4c-.3 0-1.3-.1-2.5-.1-2.5 0-4.2 1.5-4.2 4.3v2.2H7.3V14h2.8v8h3.4Z" />
    </svg>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t border-regla bg-crema-deep/60 pb-28 md:pb-10">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 pt-14 sm:px-8 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-3">
            <LeafWreath className="h-10 w-10 text-oliva" />
            <p className="font-display-italic text-2xl">{site.name}</p>
          </div>
          <p className="mt-3 max-w-sm text-tinta-soft">
            {site.cuisine}. {site.taglines.organic}, {site.taglines.fresh.toLowerCase()}. Inside{" "}
            {site.market.name}, {site.address.city}.
          </p>
          {site.social.facebook && (
            <a
              href={site.social.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-oliva hover:text-tinta"
            >
              <FacebookIcon />
              Find us on Facebook
            </a>
          )}
        </div>

        <div>
          <p className="eyebrow">Visit</p>
          <address className="mt-3 not-italic leading-relaxed">
            {site.address.line1}
            <br />
            {site.address.city}, {site.address.state} {site.address.zip}
          </address>
          <p className="mt-1 text-sm text-tinta-soft">Inside {site.market.name}</p>
        </div>

        <div>
          <p className="eyebrow">Call</p>
          <p className="mt-3 text-lg">
            <PhoneLink source="footer" />
          </p>
          <p className="mt-1 text-sm text-tinta-soft">Call for today&rsquo;s hours.</p>
        </div>
      </div>

      <div className="mx-auto mt-12 flex max-w-7xl flex-col gap-3 border-t border-regla px-5 py-6 text-sm text-tinta-soft sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <p>
          &copy; {site.year} {site.name}. All rights reserved.
        </p>
        <Link href="/privacy" className="hover:text-tinta">
          Privacy policy
        </Link>
      </div>
    </footer>
  );
}
