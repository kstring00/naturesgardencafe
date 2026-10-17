"use client";

import { useEffect, useRef } from "react";
import { loadGsap, motionAllowed } from "@/lib/motion";

/** The vertical celeste ribbon. Draws itself once when it enters the viewport. */
export function RibbonDraw() {
  const path = useRef<SVGPathElement>(null);

  useEffect(() => {
    const el = path.current;
    if (!el || !motionAllowed()) return;
    const length = el.getTotalLength() + 4;
    el.style.strokeDasharray = `${length}`;
    el.style.strokeDashoffset = `${length}`;
    let kill: (() => void) | undefined;
    let cancelled = false;
    (async () => {
      const gsap = await loadGsap();
      if (cancelled) return;
      const tween = gsap.to(el, {
        strokeDashoffset: 0,
        duration: 1.4,
        ease: "power2.inOut",
        scrollTrigger: { trigger: el, start: "top 80%", once: true },
      });
      kill = () => tween.scrollTrigger?.kill();
    })();
    return () => {
      cancelled = true;
      kill?.();
    };
  }, []);

  return (
    <svg aria-hidden="true" viewBox="0 0 60 600" preserveAspectRatio="none" className="absolute top-0 bottom-0 left-2 h-full w-10 sm:left-4">
      {/* gold edges */}
      <path d="M 20 0 C 40 150, 0 300, 20 450 S 40 580, 30 600" fill="none" stroke="var(--color-trigo)" strokeWidth="16" vectorEffect="non-scaling-stroke" opacity="0.9" />
      {/* celeste body, drawn on scroll */}
      <path ref={path} d="M 20 0 C 40 150, 0 300, 20 450 S 40 580, 30 600" fill="none" stroke="var(--color-celeste)" strokeWidth="12" vectorEffect="non-scaling-stroke" />
    </svg>
  );
}
