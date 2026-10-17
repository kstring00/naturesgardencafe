"use client";

import { useEffect, type ReactNode } from "react";
import { isTouchDevice, loadGsap, motionAllowed } from "@/lib/motion";

/**
 * One place for every scroll-driven effect. Components stay server-rendered and
 * opt in with data attributes:
 *   data-draw-path     SVG path that sketches itself on scroll
 *   data-draw-trigger  optional ancestor that controls when the drawing runs
 *   data-parallax="40" element that drifts up to N px over its scroll range
 *   data-route         container whose .route-step children light up in order
 *
 * GSAP and Lenis load after first paint. Everything is visible without them.
 */
export function MotionProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    // Reduced motion: final state, immediately.
    if (!motionAllowed()) {
      document.querySelectorAll(".route-step").forEach((s) => s.classList.add("is-lit"));
      return;
    }

    let cancelled = false;
    let cleanup: (() => void) | undefined;

    const start = async () => {
      const gsap = await loadGsap();
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      if (cancelled) return;

      const killers: (() => void)[] = [];

      // Smooth scroll on desktop pointer devices only.
      if (!isTouchDevice() && window.innerWidth >= 1024) {
        const { default: Lenis } = await import("lenis");
        if (cancelled) return;
        const lenis = new Lenis({ lerp: 0.1, smoothWheel: true });
        lenis.on("scroll", ScrollTrigger.update);
        const tick = (time: number) => lenis.raf(time * 1000);
        gsap.ticker.add(tick);
        gsap.ticker.lagSmoothing(0);
        killers.push(() => {
          gsap.ticker.remove(tick);
          lenis.destroy();
        });
      }

      // Self-drawing paths.
      document.querySelectorAll<SVGPathElement>("[data-draw-path]").forEach((path) => {
        const length = path.getTotalLength();
        if (!length) return;
        // A little longer than the path so round caps never leave a dot at the start.
        const dash = length + 4;
        gsap.set(path, { strokeDasharray: dash, strokeDashoffset: dash });
        const trigger = path.closest<HTMLElement>("[data-draw-trigger]") ?? path.closest("svg") ?? path;
        const tween = gsap.to(path, {
          strokeDashoffset: 0,
          ease: "none",
          scrollTrigger: { trigger, start: "top 88%", end: "bottom 45%", scrub: 0.5 },
        });
        killers.push(() => tween.scrollTrigger?.kill());
      });

      // Slow parallax drift.
      document.querySelectorAll<HTMLElement>("[data-parallax]").forEach((el) => {
        const distance = Number(el.dataset.parallax ?? 40);
        const tween = gsap.fromTo(
          el,
          { y: distance * 0.5 },
          {
            y: -distance,
            ease: "none",
            scrollTrigger: {
              trigger: el.parentElement ?? el,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          },
        );
        killers.push(() => tween.scrollTrigger?.kill());
      });

      // Delivery route: steps light up as the path reaches them.
      document.querySelectorAll<HTMLElement>("[data-route]").forEach((container) => {
        const steps = Array.from(container.querySelectorAll<HTMLElement>(".route-step"));
        if (!steps.length) return;
        container.setAttribute("data-route-ready", "");
        const st = ScrollTrigger.create({
          trigger: container,
          start: "top 80%",
          end: "bottom 50%",
          onUpdate: (self) => {
            steps.forEach((step, i) => {
              step.classList.toggle("is-lit", self.progress >= (i + 0.35) / steps.length);
            });
          },
        });
        killers.push(() => st.kill());
      });

      ScrollTrigger.refresh();
      cleanup = () => killers.forEach((k) => k());
    };

    // Defer until after first paint and hydration settle.
    const id = window.requestIdleCallback
      ? window.requestIdleCallback(() => void start(), { timeout: 1200 })
      : window.setTimeout(() => void start(), 300);

    return () => {
      cancelled = true;
      if (window.cancelIdleCallback && typeof id === "number") window.cancelIdleCallback(id);
      else clearTimeout(id);
      cleanup?.();
    };
  }, []);

  return <>{children}</>;
}
