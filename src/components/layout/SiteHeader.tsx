import Link from "next/link";
import { LeafMark } from "@/components/brand/LeafMark";
import { CallLink, OrderDeliveryButton } from "@/components/ui/OrderActions";
import { site } from "@/content/site";

export function SiteHeader() {
  return (
    <header className="absolute inset-x-0 top-0 z-40">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-5 sm:px-8">
        <Link href="/" className="flex items-center gap-3" aria-label={`${site.name} home`}>
          <LeafMark className="h-10 w-10 text-oliva" draw />
          <span className="font-display-plain text-lg leading-tight sm:text-xl">
            Nature&rsquo;s Garden
            <span className="block text-xs font-sans font-semibold uppercase tracking-[0.18em] text-oliva">
              Cafe &amp; Resto
            </span>
          </span>
        </Link>
        <nav className="flex items-center gap-3" aria-label="Quick actions">
          <div className="hidden sm:block">
            <CallLink source="header" size="md" />
          </div>
          <div className="hidden md:block">
            <OrderDeliveryButton source="header" size="md" magnetic={false} />
          </div>
        </nav>
      </div>
    </header>
  );
}
