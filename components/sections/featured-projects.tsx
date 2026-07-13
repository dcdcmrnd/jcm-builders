"use client";

import { useRef } from "react";
import Image from "next/image";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useGsapMatchMedia } from "@/lib/use-gsap-context";
import { BREAKPOINT_DESKTOP, BREAKPOINT_MOBILE } from "@/lib/constants";
import { featuredProjects } from "@/data/projects";

export function FeaturedProjects() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useGsapMatchMedia((mm) => {
    mm.add(BREAKPOINT_DESKTOP, () => {
      const track = trackRef.current;
      const section = sectionRef.current;
      if (!track || !section) return;

      const getScrollDistance = () => track.scrollWidth - window.innerWidth;

      // Native horizontal scroll is the reduced-motion/no-JS fallback (see
      // className below); once GSAP drives the track via pin + translate,
      // switch off the native scrollbar so the two mechanisms don't fight.
      gsap.set(track, { overflow: "hidden" });

      const tween = gsap.to(track, {
        x: () => -getScrollDistance(),
        ease: "none",
      });

      const trigger = ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: () => `+=${getScrollDistance()}`,
        pin: true,
        scrub: 1,
        animation: tween,
        invalidateOnRefresh: true,
      });

      return () => trigger.kill();
    });

    mm.add(BREAKPOINT_MOBILE, () => {
      if (!trackRef.current) return;
      gsap.set(trackRef.current, { clearProps: "x" });
    });
  }, []);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative overflow-hidden bg-black py-24 md:h-screen md:overflow-hidden md:py-0"
    >
      <div className="pointer-events-none absolute left-6 top-10 z-10 md:left-12 md:top-12">
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-burnt">
          — 002 / Selected Work
        </p>
        <h2 className="mt-4 max-w-sm font-display text-4xl font-semibold uppercase leading-[0.95] tracking-tight md:text-5xl">
          Featured
          <br />
          Projects
        </h2>
      </div>

      <div
        ref={trackRef}
        data-lenis-prevent
        className="flex h-full snap-x snap-mandatory gap-6 overflow-x-auto px-6 pt-64 pb-6 will-change-transform md:items-center md:px-12 md:pt-0 md:pb-0"
      >
        {featuredProjects.map((project, index) => (
          <div
            key={project.slug}
            data-cursor="view"
            className="group relative w-[82vw] shrink-0 snap-start overflow-hidden rounded-sm md:w-[34vw]"
          >
            <div className="relative aspect-[4/5] w-full overflow-hidden bg-charcoal">
              <Image
                src={project.images[0]}
                alt={project.title}
                fill
                sizes="(min-width: 768px) 34vw, 82vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
            </div>
            <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-6">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/60">
                  {String(index + 1).padStart(2, "0")} — {project.category}
                </p>
                <h3 className="mt-2 font-display text-xl font-semibold uppercase tracking-tight md:text-2xl">
                  {project.title}
                </h3>
                <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.15em] text-white/50">
                  {project.location} / {project.year}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
