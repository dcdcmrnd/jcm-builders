"use client";

import { useEffect, type DependencyList } from "react";
import { gsap, ensureGsapPlugins } from "./gsap";
import { useReducedMotion } from "./use-reduced-motion";

type MatchMediaInstance = ReturnType<typeof gsap.matchMedia>;
type MatchMediaSetup = (mm: MatchMediaInstance) => void;

/**
 * Shared scroll-animation wiring for every section: registers GSAP plugins once,
 * skips setup entirely under prefers-reduced-motion (leaving static DOM state),
 * and reverts all GSAP/ScrollTrigger instances created inside `setup` on unmount.
 */
export function useGsapMatchMedia(setup: MatchMediaSetup, deps: DependencyList = []) {
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;
    ensureGsapPlugins();

    const mm = gsap.matchMedia();
    setup(mm);

    return () => mm.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reducedMotion, ...deps]);
}
