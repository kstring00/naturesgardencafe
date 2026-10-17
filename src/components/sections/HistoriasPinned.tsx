"use client";

import { useEffect, useRef, useState } from "react";
import { BASE_LINE, INNER_PATH, WINDOW_PATH, crimpPoints, fillingLook, lerpPoints, toPath, type FillingKey } from "@/lib/empanada";
import { loadGsap, motionAllowed } from "@/lib/motion";

interface Chapter {
  key: FillingKey;
  story: string;
  detail: string;
}

/** One empanada drawn in layers: crust, crimp line, filling window, and a gold repulgue line that redraws per chapter. */
function EmpanadaSvg({ pathD, look, drawKey, className = "" }: { pathD: string; look: { fill: string; window: string }; drawKey: string; className?: string }) {
  return (
    <svg viewBox="0 0 400 300" className={className} aria-hidden="true">
      {/* crust with the crimped edge */}
      <path d={pathD} fill={look.fill} stroke="var(--color-tinta)" strokeWidth="2.5" strokeLinejoin="round" />
      {/* inner crust shading */}
      <path d={INNER_PATH} fill="none" stroke="var(--color-trigo-deep)" strokeWidth="2" opacity="0.55" />
      {/* the filling, seen through a cut */}
      <path d={WINDOW_PATH} fill={look.window} stroke="var(--color-tinta)" strokeWidth="2" strokeLinejoin="round" />
      <path d={BASE_LINE} stroke="var(--color-tinta)" strokeWidth="2.5" strokeLinecap="round" />
      {/* gold repulgue line, redrawn for each filling */}
      <path key={drawKey} d={pathD} fill="none" stroke="var(--color-trigo-deep)" strokeWidth="3" pathLength={1} className="repulgue-draw" />
    </svg>
  );
}

export function HistoriasPinned({ chapters }: { chapters: Chapter[] }) {
  const [active, setActive] = useState(0);
  const [pathD, setPathD] = useState(() => toPath(crimpPoints(chapters[0]?.key ?? "beef")));
  const current = useRef(crimpPoints(chapters[0]?.key ?? "beef"));
  const root = useRef<HTMLDivElement>(null);

  // Desktop: ScrollTrigger per chapter sets the active index.
  useEffect(() => {
    const el = root.current;
    if (!el || window.innerWidth < 1024) return;
    let kill: (() => void) | undefined;
    let cancelled = false;
    (async () => {
      const gsap = await loadGsap();
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      if (cancelled) return;
      const triggers = Array.from(el.querySelectorAll<HTMLElement>("[data-chapter]")).map((ch, i) =>
        ScrollTrigger.create({ trigger: ch, start: "top 55%", end: "bottom 55%", onEnter: () => setActive(i), onEnterBack: () => setActive(i) }),
      );
      void gsap;
      kill = () => triggers.forEach((t) => t.kill());
    })();
    return () => {
      cancelled = true;
      kill?.();
    };
  }, []);

  // Morph the crimp when the active chapter changes.
  useEffect(() => {
    const target = crimpPoints(chapters[active]?.key ?? "beef");
    if (!motionAllowed()) {
      current.current = target;
      setPathD(toPath(target));
      return;
    }
    const from = current.current;
    let raf = 0;
    const t0 = performance.now();
    const dur = 800;
    const step = (now: number) => {
      const u = Math.min(1, (now - t0) / dur);
      const e = 1 - Math.pow(1 - u, 3);
      const pts = lerpPoints(from, target, e);
      setPathD(toPath(pts));
      if (u < 1) raf = requestAnimationFrame(step);
      else current.current = target;
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [active, chapters]);

  const activeKey = chapters[active]?.key ?? "beef";

  return (
    <div ref={root} className="mx-auto mt-10 max-w-7xl px-5 sm:px-8">
      {/* Desktop: pinned empanada left (5/12), chapters scroll right (7/12). */}
      <div className="hidden lg:grid lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-5">
          <div className="sticky top-[calc(50vh-9rem)]">
            <EmpanadaSvg pathD={pathD} look={fillingLook[activeKey]} drawKey={activeKey} className="w-full" />
          </div>
        </div>
        <div className="lg:col-span-7">
          {chapters.map((c, i) => (
            <article key={c.key} data-chapter className="flex min-h-[100vh] flex-col justify-center" aria-current={i === active ? "true" : undefined}>
              <h3 className="display text-chapter">
                {fillingLook[c.key].name}
                {c.key === "beef" && <span className="display-italic text-tinta-70"> the classic</span>}
              </h3>
              <p className="mt-6 max-w-[62ch] text-xl leading-relaxed">{c.story}</p>
              {c.detail && <p className="mt-4 text-base text-verde">{c.detail}</p>}
            </article>
          ))}
        </div>
      </div>

      {/* Phone and tablet: three stacked chapters, each with its own static state. */}
      <div className="space-y-16 lg:hidden">
        {chapters.map((c) => (
          <article key={c.key} className="grid gap-6 sm:grid-cols-[2fr_3fr] sm:items-center">
            <EmpanadaSvg pathD={toPath(crimpPoints(c.key))} look={fillingLook[c.key]} drawKey={`m-${c.key}`} className="w-full max-w-xs" />
            <div>
              <h3 className="display text-chapter">
                {fillingLook[c.key].name}
                {c.key === "beef" && <span className="display-italic text-tinta-70"> the classic</span>}
              </h3>
              <p className="mt-4 text-lg leading-relaxed">{c.story}</p>
              {c.detail && <p className="mt-3 text-base text-verde">{c.detail}</p>}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
