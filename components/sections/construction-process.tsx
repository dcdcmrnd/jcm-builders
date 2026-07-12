"use client";

import { useRef } from "react";
import { gsap } from "@/lib/gsap";
import { useGsapMatchMedia } from "@/lib/use-gsap-context";
import { BREAKPOINT_DESKTOP, BREAKPOINT_MOBILE } from "@/lib/constants";
import { processSteps } from "@/data/process-steps";

const STEP_HEIGHT = 220;
const LINE_LENGTH = processSteps.length * STEP_HEIGHT;

export function ConstructionProcess() {
  const sectionRef = useRef<HTMLElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const stepRefs = useRef<Array<HTMLDivElement | null>>([]);

  useGsapMatchMedia((mm) => {
    const drawLine = (start: string, end: string) => {
      if (!pathRef.current) return;
      const length = pathRef.current.getTotalLength();
      gsap.set(pathRef.current, { strokeDasharray: length, strokeDashoffset: length });
      gsap.to(pathRef.current, {
        strokeDashoffset: 0,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start,
          end,
          scrub: 0.5,
        },
      });
    };

    const revealSteps = (start: string) => {
      stepRefs.current.forEach((el) => {
        if (!el) return;
        gsap.set(el, { opacity: 0.25, y: 16 });
        gsap.to(el, {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start },
        });
      });
    };

    mm.add(BREAKPOINT_DESKTOP, () => {
      drawLine("top 20%", "bottom 80%");
      revealSteps("top 75%");
    });

    mm.add(BREAKPOINT_MOBILE, () => {
      drawLine("top 80%", "bottom bottom");
      revealSteps("top 85%");
    });
  }, []);

  return (
    <section
      id="process"
      ref={sectionRef}
      className="relative bg-charcoal px-6 py-24 md:px-12 md:py-40"
    >
      <p className="mb-6 font-mono text-xs uppercase tracking-[0.3em] text-burnt">
        — 004 / How We Work
      </p>
      <h2 className="mb-20 max-w-xl font-display text-4xl font-semibold uppercase leading-[0.95] tracking-tight md:text-6xl">
        Our Process
      </h2>

      <div className="relative mx-auto max-w-3xl">
        <svg
          className="absolute left-0 top-0 h-full w-8"
          viewBox={`0 0 32 ${LINE_LENGTH}`}
          preserveAspectRatio="none"
          aria-hidden
        >
          <path
            d={`M16 0 L16 ${LINE_LENGTH}`}
            fill="none"
            stroke="rgba(245,243,238,0.12)"
            strokeWidth={2}
          />
          <path
            ref={pathRef}
            d={`M16 0 L16 ${LINE_LENGTH}`}
            fill="none"
            stroke="#cf5b28"
            strokeWidth={2}
          />
        </svg>

        <div className="flex flex-col">
          {processSteps.map((step, index) => (
            <div
              key={step.index}
              ref={(el) => {
                stepRefs.current[index] = el;
              }}
              className="relative flex min-h-[220px] flex-col justify-center gap-2 pl-16 md:pl-24"
            >
              <span className="absolute left-[10px] top-1/2 h-3 w-3 -translate-y-1/2 rounded-full bg-burnt" />
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-white/40">
                {step.index}
              </span>
              <h3 className="font-display text-2xl font-semibold uppercase tracking-tight md:text-4xl">
                {step.title}
              </h3>
              <p className="max-w-md text-sm text-white/60 md:text-base">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
