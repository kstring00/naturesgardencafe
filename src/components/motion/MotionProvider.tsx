"use client";

import { useEffect, type ReactNode } from "react";
import { isTouchDevice, loadGsap, motionAllowed } from "@/lib/motion";

/**
 * Smooth scroll on desktop pointer devices, wired to ScrollTrigger.
 * Each of the four motions lives in its own section component; nothing is animated here.
 */
export function MotionProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    if (!motionAllowed() || isTouchDevice() || window.innerWidth < 1024) return;
    let cancelled = false;
    let cleanup: (() => void) | undefined;

    (async () => {
      const gsap = await loadGsap();
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      const { default: Lenis } = await import("lenis");
      if (cancelled) return;
      const lenis = new Lenis({ lerp: 0.1, smoothWheel: true });
      lenis.on("scroll", ScrollTrigger.update);
      const tick = (time: number) => lenis.raf(time * 1000);
      gsap.ticker.add(tick);
      gsap.ticker.lagSmoothing(0);
      cleanup = () => {
        gsap.ticker.remove(tick);
        lenis.destroy();
      };
    })();

    return () => {
      cancelled = true;
      cleanup?.();
    };
  }, []);

  return <>{children}</>;
}
