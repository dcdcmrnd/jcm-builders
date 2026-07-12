"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger, ensureGsapPlugins } from "@/lib/gsap";
import { useReducedMotion } from "@/lib/use-reduced-motion";
import { AnimatedCounter } from "@/components/ui/animated-counter";
import { stats } from "@/data/stats";

const RADIUS = 42;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

export function Statistics() {
  const ringRefs = useRef<Array<SVGCircleElement | null>>([]);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const rings = ringRefs.current.filter((ring): ring is SVGCircleElement => ring !== null);

    if (reducedMotion) {
      gsap.set(rings, { strokeDashoffset: 0 });
      return;
    }

    ensureGsapPlugins();
    gsap.set(rings, { strokeDashoffset: CIRCUMFERENCE });

    const triggers = rings.map((ring) =>
      ScrollTrigger.create({
        trigger: ring,
        start: "top 85%",
        once: true,
        onEnter: () => {
          gsap.to(ring, { strokeDashoffset: 0, duration: 1.6, ease: "power2.out" });
        },
      }),
    );

    return () => triggers.forEach((trigger) => trigger.kill());
  }, [reducedMotion]);

  return (
    <section id="stats" className="relative bg-charcoal px-6 py-24 md:px-12 md:py-32">
      <div className="grid grid-cols-2 gap-y-12 md:grid-cols-4 md:gap-6">
        {stats.map((stat, index) => (
          <div key={stat.label} className="flex flex-col items-center text-center">
            <div className="relative flex h-28 w-28 items-center justify-center md:h-32 md:w-32">
              <svg viewBox="0 0 100 100" className="absolute inset-0 -rotate-90">
                <circle
                  cx="50"
                  cy="50"
                  r={RADIUS}
                  fill="none"
                  stroke="rgba(245,243,238,0.1)"
                  strokeWidth={4}
                />
                <circle
                  ref={(el) => {
                    ringRefs.current[index] = el;
                  }}
                  cx="50"
                  cy="50"
                  r={RADIUS}
                  fill="none"
                  stroke="#cf5b28"
                  strokeWidth={4}
                  strokeDasharray={CIRCUMFERENCE}
                  strokeLinecap="round"
                />
              </svg>
              <span className="font-display text-2xl font-semibold md:text-3xl">
                <AnimatedCounter value={stat.value} suffix={stat.suffix} />
              </span>
            </div>
            <p className="mt-4 max-w-[10rem] font-mono text-[10px] uppercase tracking-[0.2em] text-white/60">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
