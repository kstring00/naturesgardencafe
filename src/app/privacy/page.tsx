import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: `Privacy Policy | ${site.name}`,
  description: `How ${site.name} handles visitor information on this website.`,
  robots: { index: false },
};

export default function PrivacyPage() {
  return (
    <main className="mx-auto max-w-2xl px-5 py-16 sm:py-24">
      <Link href="/" className="text-sm font-semibold text-verde hover:text-tinta">
        &larr; Back to the menu
      </Link>
      <h1 className="display mt-4 text-title">Privacy Policy</h1>
      <p className="mt-3 text-sm text-tinta-70">Last updated: October {site.year}</p>

      <div className="prose-cafe mt-8 space-y-5 text-lg leading-relaxed text-tinta">
        <p>
          This website belongs to {site.name}, {site.address.line1}, {site.address.city},{" "}
          {site.address.state} {site.address.zip}. We keep things simple and collect as little as
          possible.
        </p>
        <h2 className="display text-2xl">What we collect</h2>
        <p>
          We use privacy-friendly, aggregate analytics (Vercel Analytics) to count page views and
          taps on the order and call buttons. It does not use cookies and does not identify you
          personally.
        </p>
        <p>
          When you call or text us, your phone carrier handles that message. We only see what you
          choose to tell us.
        </p>
        <h2 className="display text-2xl">Ordering</h2>
        <p>
          Online orders are handled by our ordering provider under its own privacy policy, which
          will be linked from the ordering page once ordering goes live.
        </p>
        <h2 className="display text-2xl">Questions</h2>
        <p>
          Call the café at{" "}
          <a className="underline decoration-trigo underline-offset-4" href={`tel:${site.phone.e164}`}>
            {site.phone.display}
          </a>
          .
        </p>
      </div>
    </main>
  );
}
