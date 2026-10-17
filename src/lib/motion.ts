/** Shared motion helpers. GSAP itself is imported lazily where it is used. */

export const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export const isTouchDevice = () =>
  typeof window !== "undefined" &&
  (window.matchMedia("(hover: none)").matches || navigator.maxTouchPoints > 0);

/** Should rich motion run at all on this visit? */
export const motionAllowed = () => !prefersReducedMotion();

/** Load GSAP + ScrollTrigger after first paint. Cached after the first call. */
const idle = () =>
  new Promise<void>((resolve) => {
    if (typeof window === "undefined") return resolve();
    const w = window as Window & { requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number };
    if (typeof w.requestIdleCallback === "function") w.requestIdleCallback(() => resolve(), { timeout: 1500 });
    else setTimeout(resolve, 300);
  });

let gsapPromise: Promise<typeof import("gsap")["gsap"]> | null = null;
export function loadGsap() {
  if (!gsapPromise) {
    gsapPromise = idle()
      .then(() => Promise.all([import("gsap"), import("gsap/ScrollTrigger")]))
      .then(([{ gsap }, { ScrollTrigger }]) => {
        gsap.registerPlugin(ScrollTrigger);
        return gsap;
      });
  }
  return gsapPromise;
}
