"use client";

import { useRef } from "react";
import { gsap } from "@/lib/gsap";
import { useGsapMatchMedia } from "@/lib/use-gsap-context";
import { BREAKPOINT_DESKTOP, BREAKPOINT_MOBILE } from "@/lib/constants";
import { differentiators } from "@/data/why-choose-us";

export function WhyChooseUs() {
  const cardRefs = useRef<Array<HTMLDivElement | null>>([]);

  useGsapMatchMedia((mm) => {
    const setup = (rotate: number, y: number) => {
      cardRefs.current.forEach((card, index) => {
        if (!card) return;
        gsap.set(card, {
          opacity: 0,
          rotateX: rotate,
          y,
          transformPerspective: 900,
          transformOrigin: "top center",
        });
        gsap.to(card, {
          opacity: 1,
          rotateX: 0,
          y: 0,
          duration: 0.9,
          ease: "power3.out",
          delay: index * 0.05,
          scrollTrigger: { trigger: card, start: "top 85%" },
        });
      });
    };

    mm.add(BREAKPOINT_DESKTOP, () => setup(-20, 40));
    mm.add(BREAKPOINT_MOBILE, () => setup(-12, 24));
  }, []);

  return (
    <section id="why-us" className="relative bg-black px-6 py-24 md:px-12 md:py-40">
      <p className="mb-6 font-mono text-xs uppercase tracking-[0.3em] text-burnt">
        — 005 / Why JCM
      </p>
      <h2 className="mb-16 max-w-2xl font-display text-4xl font-semibold uppercase leading-[0.95] tracking-tight md:text-6xl">
        Why Choose Us
      </h2>

      <div className="grid grid-cols-1 gap-px overflow-hidden rounded-sm bg-white/10 md:grid-cols-2">
        {differentiators.map((item, index) => (
          <div
            key={item.title}
            ref={(el) => {
              cardRefs.current[index] = el;
            }}
            className="bg-charcoal p-10 md:p-14"
          >
            <span className="font-mono text-xs text-burnt">
              {String(index + 1).padStart(2, "0")}
            </span>
            <h3 className="mt-4 font-display text-3xl font-semibold uppercase tracking-tight md:text-4xl">
              {item.title}
            </h3>
            <p className="mt-4 max-w-sm text-sm text-white/60 md:text-base">
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
