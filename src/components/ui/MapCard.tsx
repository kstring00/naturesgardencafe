import { site } from "@/content/site";

/** Embedded Google Map in a rounded card with an olive border and a gold pin. Lazy-loaded. */
export function MapCard() {
  return (
    <div className="relative">
      <span className="eyebrow absolute -top-3 left-6 z-10 rounded-full bg-crema px-3 py-1">
        You&rsquo;ll find us here
      </span>
      <svg
        viewBox="0 0 48 60"
        aria-hidden="true"
        className="absolute -top-7 -left-4 z-10 h-16 w-12 drop-shadow-[0_8px_12px_rgba(42,36,24,0.25)]"
      >
        <path
          d="M24 58 C 12 40, 4 32, 4 20 A 20 20 0 0 1 44 20 C 44 32, 36 40, 24 58 Z"
          fill="var(--color-dorado)"
          stroke="var(--color-tinta)"
          strokeWidth="2.5"
          strokeLinejoin="round"
        />
        <circle cx="24" cy="21" r="7" fill="var(--color-crema)" stroke="var(--color-tinta)" strokeWidth="2.5" />
      </svg>
      <div className="overflow-hidden rounded-[2rem] border-2 border-oliva/70 bg-crema-deep p-1.5 shadow-[0_24px_50px_-30px_rgba(42,36,24,0.5)]">
        <iframe
          src={site.address.embedUrl}
          title="Map to Nature's Garden Cafe"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
          className="block aspect-[4/3] w-full rounded-[1.6rem] border-0 bg-crema-deep sm:aspect-[5/4]"
        />
      </div>
    </div>
  );
}
