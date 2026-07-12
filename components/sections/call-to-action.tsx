"use client";

import { useRef } from "react";
import { gsap } from "@/lib/gsap";
import { useGsapMatchMedia } from "@/lib/use-gsap-context";
import { BREAKPOINT_DESKTOP, BREAKPOINT_MOBILE } from "@/lib/constants";
import { MagneticButton } from "@/components/layout/magnetic-button";

export function CallToAction() {
  const headlineRef = useRef<HTMLHeadingElement>(null);

  useGsapMatchMedia((mm) => {
    const reveal = () => {
      if (!headlineRef.current) return;
      gsap.set(headlineRef.current, { clipPath: "inset(0 100% 0 0)" });
      gsap.to(headlineRef.current, {
        clipPath: "inset(0 0% 0 0)",
        duration: 1.1,
        ease: "expo.inOut",
        scrollTrigger: { trigger: headlineRef.current, start: "top 80%" },
      });
    };
    mm.add(BREAKPOINT_DESKTOP, reveal);
    mm.add(BREAKPOINT_MOBILE, reveal);
  }, []);

  return (
    <section
      id="cta"
      className="relative flex min-h-[80vh] flex-col items-center justify-center overflow-hidden bg-burnt px-6 text-center text-black md:px-12"
    >
      <p className="mb-6 font-mono text-xs uppercase tracking-[0.3em] text-black/60">
        — Let&rsquo;s Build Something Exceptional
      </p>
      <h2
        ref={headlineRef}
        className="max-w-4xl font-display text-5xl font-bold uppercase leading-[0.95] tracking-tight md:text-8xl"
      >
        We Build It Right
      </h2>
      <p className="mt-8 max-w-md text-black/70">
        Tell us about your project. We&rsquo;ll respond within one business day.
      </p>
      <div className="mt-10">
        <MagneticButton cursorVariant="view">
          <a
            href="#contact"
            className="inline-flex items-center rounded-full bg-black px-10 py-5 font-mono text-xs uppercase tracking-[0.15em] text-white transition-colors hover:bg-white hover:text-black"
          >
            Start a Project
          </a>
        </MagneticButton>
      </div>
    </section>
  );
}
