"use client";

import { useRef } from "react";
import { gsap, SplitText } from "@/lib/gsap";
import { useGsapMatchMedia } from "@/lib/use-gsap-context";
import { BREAKPOINT_DESKTOP, BREAKPOINT_MOBILE } from "@/lib/constants";

export function CompanyOverview() {
  const sectionRef = useRef<HTMLElement>(null);
  const paraRef = useRef<HTMLParagraphElement>(null);

  useGsapMatchMedia((mm) => {
    mm.add(BREAKPOINT_DESKTOP, () => {
      if (!paraRef.current || !sectionRef.current) return;

      const split = new SplitText(paraRef.current, { type: "words" });
      gsap.set(split.words, { opacity: 0.4 });

      gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=125%",
          scrub: 0.6,
          pin: true,
        },
      })
        .to(sectionRef.current, { backgroundColor: "#7d766c" }, 0)
        .to(split.words, { opacity: 1, stagger: 0.1 }, 0);

      return () => split.revert();
    });

    mm.add(BREAKPOINT_MOBILE, () => {
      if (!paraRef.current) return;
      gsap.set(paraRef.current, { opacity: 0, y: 20 });
      gsap.to(paraRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: paraRef.current,
          start: "top 85%",
        },
      });
    });
  }, []);

  return (
    <section
      id="overview"
      ref={sectionRef}
      className="flex min-h-screen items-center bg-charcoal px-6 py-32 md:px-12"
    >
      <div className="mx-auto max-w-5xl">
        <p className="mb-8 font-mono text-xs uppercase tracking-[0.3em] text-burnt">
          — 001 / Studio
        </p>
        <p
          ref={paraRef}
          className="font-display text-3xl font-medium leading-tight tracking-tight md:text-5xl"
        >
          Forward by design, built with purpose. For over a decade, JCM Home
          Builders has delivered uncompromising craftsmanship — from private
          residences to landmark commercial spaces — built on precision,
          integrity, and an obsession with detail that never cuts corners.
        </p>
      </div>
    </section>
  );
}
