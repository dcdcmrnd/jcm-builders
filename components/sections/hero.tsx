"use client";

import { useEffect, useRef } from "react";
import { gsap, SplitText, ensureGsapPlugins } from "@/lib/gsap";
import { useReducedMotion } from "@/lib/use-reduced-motion";
import { useLoaderReady } from "@/components/layout/page-loader";
import { MagneticButton } from "@/components/layout/magnetic-button";

export function Hero() {
  const reducedMotion = useReducedMotion();
  const ready = useLoaderReady();

  const videoRef = useRef<HTMLVideoElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const eyebrowRef = useRef<HTMLParagraphElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!ready || hasAnimated.current) return;
    hasAnimated.current = true;

    const introTargets = [eyebrowRef.current, subRef.current, ctaRef.current];

    if (reducedMotion) {
      gsap.set(introTargets, { opacity: 1, y: 0 });
      return;
    }

    ensureGsapPlugins();

    const split = new SplitText(headlineRef.current, {
      type: "words",
      mask: "words",
    });
    gsap.set(split.words, { yPercent: 110 });

    const tl = gsap.timeline({ defaults: { ease: "expo.out" } });
    tl.to(eyebrowRef.current, { opacity: 1, y: 0, duration: 0.6 })
      .to(split.words, { yPercent: 0, duration: 1.1, stagger: 0.06 }, "-=0.2")
      .to(subRef.current, { opacity: 1, y: 0, duration: 0.7 }, "-=0.5")
      .to(ctaRef.current, { opacity: 1, y: 0, duration: 0.6 }, "-=0.4");

    if (videoRef.current) {
      gsap.to(videoRef.current, {
        scale: 1.12,
        duration: 22,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });
    }

    if (gridRef.current) {
      gsap.to(gridRef.current, {
        backgroundPosition: "80px 80px",
        duration: 14,
        ease: "none",
        repeat: -1,
      });
    }

    return () => {
      split.revert();
      tl.kill();
    };
  }, [ready, reducedMotion]);

  return (
    <section
      id="hero"
      className="relative flex h-[100svh] items-end overflow-hidden bg-black text-white md:items-center"
    >
      <video
        ref={videoRef}
        className="absolute inset-0 h-full w-full origin-center object-cover blur-md will-change-transform"
        src="/videos/jcm.mp4"
        autoPlay={!reducedMotion}
        loop={!reducedMotion}
        muted
        playsInline
        preload="metadata"
      />

      {/* The source video has its own baked-in text/logo overlay — blur (above)
          plus a heavier scrim (below) keeps it as ambient motion without
          competing with our own headline/logo. */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/55 to-black/75" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/65 via-black/25 to-black/10" />

      <div
        ref={gridRef}
        aria-hidden
        className="absolute inset-0 opacity-[0.12]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(245,243,238,0.4) 1px, transparent 1px), linear-gradient(to bottom, rgba(245,243,238,0.4) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      <div className="relative z-10 mx-auto w-full max-w-6xl px-6 pb-20 md:px-12 md:pb-0">
        <p
          ref={eyebrowRef}
          className="mb-6 translate-y-3 font-mono text-xs uppercase tracking-[0.3em] text-burnt opacity-0 md:text-sm"
        >
          — JCM Home Builders
        </p>

        <h1
          ref={headlineRef}
          className="font-display text-[13vw] font-bold uppercase leading-[0.92] tracking-tight md:text-[7.5vw]"
        >
          We Build
          <br />
          It <span className="text-red">Right</span>
        </h1>

        <p
          ref={subRef}
          className="mt-8 max-w-md translate-y-3 text-pretty font-body text-base text-white/70 opacity-0 md:text-lg"
        >
          Visionary spaces, built to last. High-end residential and
          commercial construction crafted with precision, integrity, and an
          obsession with detail.
        </p>

        <div ref={ctaRef} className="mt-10 flex translate-y-3 items-center gap-6 opacity-0">
          <MagneticButton cursorVariant="view">
            <a
              href="#projects"
              className="inline-flex items-center rounded-full bg-white px-8 py-4 font-mono text-xs uppercase tracking-[0.15em] text-black transition-colors hover:bg-red hover:text-white"
            >
              View Our Work
            </a>
          </MagneticButton>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 text-white/60 md:flex">
        <span className="font-mono text-[10px] uppercase tracking-[0.3em]">Scroll</span>
        <span className="h-10 w-px bg-white/30" />
      </div>
    </section>
  );
}
