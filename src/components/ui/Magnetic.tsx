"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { motionAllowed } from "@/lib/motion";

/**
 * Soft magnetic hover for the main button on pointer devices only.
 * Pure transforms, no library. Touch devices get the CSS press state instead.
 */
export function Magnetic({ children, strength = 0.25 }: { children: ReactNode; strength?: number }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || !motionAllowed()) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    let raf = 0;
    let tx = 0;
    let ty = 0;

    const apply = () => {
      el.style.transform = `translate3d(${tx}px, ${ty}px, 0)`;
      raf = 0;
    };
    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      tx = (e.clientX - (r.left + r.width / 2)) * strength;
      ty = (e.clientY - (r.top + r.height / 2)) * strength;
      if (!raf) raf = requestAnimationFrame(apply);
    };
    const onLeave = () => {
      tx = 0;
      ty = 0;
      el.style.transition = "transform 0.45s cubic-bezier(0.22, 1, 0.36, 1)";
      if (!raf) raf = requestAnimationFrame(apply);
      setTimeout(() => (el.style.transition = ""), 450);
    };

    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);
    return () => {
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [strength]);

  return (
    <div ref={ref} className="inline-block will-change-transform">
      {children}
    </div>
  );
}
