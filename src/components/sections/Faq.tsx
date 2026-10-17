"use client";

import { useEffect, useRef } from "react";

export interface FaqItem {
  question: string;
  answer: string;
}

/**
 * Accordion built on <details>, so every answer is in the HTML for readers and search.
 * Closed on mobile, opened on desktop after mount.
 */
export function Faq({ items, label }: { items: FaqItem[]; label: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    if (window.matchMedia("(min-width: 768px)").matches) {
      root.querySelectorAll("details").forEach((d) => (d.open = true));
    }
  }, []);

  return (
    <div ref={ref} role="group" aria-label={label} className="divide-y divide-regla border-y border-regla">
      {items.map((item) => (
        <details key={item.question} className="faq group py-4">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-1 text-left [&::-webkit-details-marker]:hidden">
            <span className="font-display text-xl leading-snug sm:text-2xl">{item.question}</span>
            <span
              aria-hidden="true"
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-tinta/30 text-tinta transition-transform duration-300 group-open:rotate-45"
            >
              +
            </span>
          </summary>
          <p className="max-w-2xl pt-2 pb-2 text-base leading-relaxed text-tinta-soft sm:text-lg">{item.answer}</p>
        </details>
      ))}
    </div>
  );
}
