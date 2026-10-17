"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { LeafWreath } from "@/components/brand/LeafWreath";
import { motionAllowed } from "@/lib/motion";

const WreathScene = dynamic(() => import("./WreathScene").then((m) => m.WreathScene), { ssr: false });

function webglAvailable() {
  try {
    const c = document.createElement("canvas");
    return Boolean(c.getContext("webgl2") || c.getContext("webgl"));
  } catch {
    return false;
  }
}

/**
 * Decides between the WebGL wreath and the static SVG. The Three bundle is only
 * fetched when the section is near the viewport, and the canvas is unmounted
 * (disposed) when it scrolls away. Once assembled, it comes back assembled.
 */
export function WreathCanvas() {
  const ref = useRef<HTMLDivElement>(null);
  const [mode, setMode] = useState<"pending" | "static" | "gl">("pending");
  const [near, setNear] = useState(false);
  const assembled = useRef(false);

  useEffect(() => {
    setMode(motionAllowed() && webglAvailable() ? "gl" : "static");
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el || mode !== "gl") return;
    const io = new IntersectionObserver(([e]) => setNear(Boolean(e?.isIntersecting)), { rootMargin: "25% 0px" });
    io.observe(el);
    return () => io.disconnect();
  }, [mode]);

  return (
    <div ref={ref} className="absolute inset-0">
      {mode === "gl" && near ? (
        <WreathScene assembledRef={assembled} />
      ) : mode === "static" ? (
        <div className="flex h-full items-center justify-center">
          <LeafWreath className="h-[80%] w-auto text-verde" title="" />
        </div>
      ) : null}
    </div>
  );
}
