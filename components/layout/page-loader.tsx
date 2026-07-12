"use client";

import Image from "next/image";
import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import { gsap, ScrollTrigger, ensureGsapPlugins } from "@/lib/gsap";
import { useReducedMotion } from "@/lib/use-reduced-motion";

const LoaderReadyContext = createContext(false);

/** Sections (namely Hero) read this to know when to start their load-in timeline. */
export function useLoaderReady() {
  return useContext(LoaderReadyContext);
}

export function PageLoader({ children }: { children: ReactNode }) {
  const reducedMotion = useReducedMotion();
  const [ready, setReady] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.body.style.overflow = ready ? "" : "hidden";
  }, [ready]);

  useEffect(() => {
    if (reducedMotion) {
      setReady(true);
      return;
    }

    ensureGsapPlugins();

    const tl = gsap.timeline({
      onComplete: () => {
        setReady(true);
        ScrollTrigger.refresh();
      },
    });

    tl.fromTo(
      logoRef.current,
      { opacity: 0, y: 14 },
      { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" },
    )
      .to(logoRef.current, { opacity: 0, duration: 0.35, ease: "power2.in" }, "+=0.45")
      .to(overlayRef.current, { yPercent: -100, duration: 0.9, ease: "expo.inOut" }, "<")
      .set(overlayRef.current, { display: "none" });

    return () => {
      tl.kill();
    };
  }, [reducedMotion]);

  return (
    <>
      <div
        ref={overlayRef}
        aria-hidden
        className="fixed inset-0 z-[100] flex items-center justify-center bg-black"
        style={reducedMotion ? { display: "none" } : undefined}
      >
        <div ref={logoRef} className="relative h-14 w-14">
          <Image
            src="/images/jcm-logo.jpg"
            alt=""
            width={112}
            height={112}
            className="h-full w-full rounded-full object-cover"
            priority
          />
        </div>
      </div>
      <LoaderReadyContext.Provider value={ready}>{children}</LoaderReadyContext.Provider>
    </>
  );
}
