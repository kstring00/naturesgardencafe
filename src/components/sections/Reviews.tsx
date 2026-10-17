import { reviews } from "@/content/reviews";

function QuoteMark() {
  return (
    <svg viewBox="0 0 32 24" className="h-6 w-8 text-dorado" fill="currentColor" aria-hidden="true">
      <path d="M13 0v10H7c0 3 2 5 6 5v5C6 20 2 16 2 10V0h11Zm17 0v10h-6c0 3 2 5 6 5v5c-7 0-11-4-11-10V0h11Z" />
    </svg>
  );
}

/** Proof strip: three real reviews from the market's existing About page. */
export function Reviews() {
  return (
    <section id="reviews" className="py-16 sm:py-20" aria-labelledby="reviews-title">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="eyebrow">What people say</p>
            <h2 id="reviews-title" className="font-display mt-3 text-h2 leading-[0.95]">
              Regulars, in their own words.
            </h2>
          </div>
        </div>
        <ul className="mt-10 grid gap-5 md:grid-cols-3">
          {reviews.map((r) => (
            <li key={r.name} className="flex flex-col rounded-3xl border border-regla bg-crema-deep/40 p-6 sm:p-7">
              <QuoteMark />
              <blockquote className="mt-4 flex-1">
                <p className="font-display-plain text-xl leading-snug sm:text-2xl">{r.quote}</p>
              </blockquote>
              <figcaption className="mt-5 flex items-center justify-between gap-3 text-sm">
                <span className="font-semibold">{r.name}</span>
                <span className="rounded-full border border-regla px-2.5 py-0.5 text-xs text-tinta-soft">
                  {r.source}
                </span>
              </figcaption>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
