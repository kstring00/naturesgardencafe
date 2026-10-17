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
let gsapPromise: Promise<typeof import("gsap")["gsap"]> | null = null;
export function loadGsap() {
  if (!gsapPromise) {
    gsapPromise = Promise.all([
      import("gsap"),
      import("gsap/ScrollTrigger"),
    ]).then(([{ gsap }, { ScrollTrigger }]) => {
      gsap.registerPlugin(ScrollTrigger);
      return gsap;
    });
  }
  return gsapPromise;
}
