"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { loadGsap, motionAllowed } from "@/lib/motion";

/** Scrubs the fold angle (CSS --fold) as the pamphlet enters, settling with a paper-like overshoot. */
export function PamphletFold({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || !motionAllowed() || window.innerWidth < 768) {
      el?.style.setProperty("--fold", "0deg");
      return;
    }
    let kill: (() => void) | undefined;
    let cancelled = false;
    (async () => {
      const gsap = await loadGsap();
      if (cancelled) return;
      const proxy = { fold: -170 };
      const tween = gsap.to(proxy, {
        fold: 0,
        ease: "back.out(1.3)",
        onUpdate: () => el.style.setProperty("--fold", `${proxy.fold}deg`),
        scrollTrigger: { trigger: el, start: "top 85%", end: "top 25%", scrub: 0.4 },
      });
      kill = () => tween.scrollTrigger?.kill();
    })();
    return () => {
      cancelled = true;
      kill?.();
    };
  }, []);

  return (
    <div ref={ref} style={{ ["--fold" as string]: "-170deg" }}>
      {children}
    </div>
  );
}

/** "1 / 3" for the phone carousel. Hidden on desktop where the pamphlet is open. */
export function PanelCounter() {
  const [index, setIndex] = useState(1);

  useEffect(() => {
    const el = document.querySelector<HTMLElement>(".pamphlet");
    if (!el) return;
    const onScroll = () => {
      const first = el.firstElementChild as HTMLElement | null;
      const w = first ? first.offsetWidth + 12 : el.clientWidth;
      setIndex(Math.min(3, Math.round(el.scrollLeft / w) + 1));
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <p className="text-sm text-tinta-70 md:hidden" aria-live="polite">
      {index} / 3
    </p>
  );
}
