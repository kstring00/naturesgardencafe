"use client";

import useEmblaCarousel from "embla-carousel-react";
import { useCallback } from "react";
import { reviews } from "@/content/reviews";

function Arrow({ dir }: { dir: "prev" | "next" }) {
  return (
    <svg viewBox="0 0 32 20" className={`h-5 w-8 ${dir === "prev" ? "scale-x-[-1]" : ""}`} fill="none" stroke="var(--color-trigo-deep)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M2 10h26M20 3l8 7-8 7" />
    </svg>
  );
}

/** A guest book: pages of different widths, peeking on both sides. Drag or use the arrows. */
export function GuestBook() {
  const [ref, api] = useEmblaCarousel({ loop: true, align: "center", skipSnaps: false });
  const prev = useCallback(() => api?.scrollPrev(), [api]);
  const next = useCallback(() => api?.scrollNext(), [api]);

  return (
    <section id="guest-book" className="py-16 sm:py-24" aria-labelledby="guest-book-title">
      <div className="mx-auto flex max-w-7xl items-end justify-between px-5 sm:px-8">
        <h2 id="guest-book-title" className="display text-title">
          What people say
        </h2>
        <div className="flex gap-2">
          <button type="button" onClick={prev} aria-label="Previous page" className="flex h-11 w-11 items-center justify-center rounded-full border border-trigo hover:bg-trigo/15">
            <Arrow dir="prev" />
          </button>
          <button type="button" onClick={next} aria-label="Next page" className="flex h-11 w-11 items-center justify-center rounded-full border border-trigo hover:bg-trigo/15">
            <Arrow dir="next" />
          </button>
        </div>
      </div>

      <div ref={ref} className="embla mt-8">
        <div className="embla__container gap-5 px-5 sm:px-8">
          {reviews.map((r) => {
            const width = Math.min(560, 280 + r.quote.length * 2.4);
            return (
              <figure
                key={r.name}
                className="paper ruled relative flex shrink-0 flex-col rounded-sm border border-sombra px-6 pt-[1.9rem] pb-[1.9rem] shadow-[0_1px_0_0_var(--color-sombra),0_12px_30px_-22px_rgba(31,27,20,0.5)]"
                style={{ flex: `0 0 min(86vw, ${width}px)` }}
              >
                <blockquote className="flex-1">
                  <p className="display text-[1.25rem] leading-[1.9rem]">{r.quote}</p>
                </blockquote>
                <figcaption className="mt-[1.9rem] flex h-[1.9rem] items-center justify-between gap-4">
                  <span className="display-italic inline-block origin-left -rotate-[1.5deg] text-lg">{r.name}</span>
                  <span className="rounded-full border border-sombra px-2.5 py-0.5 text-xs text-tinta-70">{r.source}</span>
                </figcaption>
              </figure>
            );
          })}
        </div>
      </div>
    </section>
  );
}
