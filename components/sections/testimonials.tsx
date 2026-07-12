"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, animate } from "motion/react";
import { testimonials } from "@/data/testimonials";

export function Testimonials() {
  const containerRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const [active, setActive] = useState(0);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const update = () => setWidth(containerRef.current?.offsetWidth ?? 0);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const goTo = (index: number) => {
    const container = containerRef.current;
    if (!container) return;
    const clamped = Math.max(0, Math.min(index, testimonials.length - 1));
    animate(x, -clamped * container.offsetWidth, {
      type: "spring",
      stiffness: 260,
      damping: 30,
    });
    setActive(clamped);
  };

  return (
    <section
      id="testimonials"
      className="relative overflow-hidden bg-black px-6 py-24 md:px-12 md:py-40"
    >
      <p className="mb-6 font-mono text-xs uppercase tracking-[0.3em] text-burnt">
        — 007 / In Their Words
      </p>
      <h2 className="mb-16 max-w-xl font-display text-4xl font-semibold uppercase leading-[0.95] tracking-tight md:text-6xl">
        Client Stories
      </h2>

      <div ref={containerRef} className="relative overflow-hidden">
        <motion.div
          drag="x"
          style={{ x }}
          dragConstraints={{ left: -(testimonials.length - 1) * width, right: 0 }}
          dragElastic={0.1}
          onDragEnd={() => {
            const container = containerRef.current;
            if (!container) return;
            const index = Math.round(-x.get() / container.offsetWidth);
            goTo(index);
          }}
          className="flex cursor-grab active:cursor-grabbing"
        >
          {testimonials.map((testimonial) => (
            <div key={testimonial.name} className="w-full shrink-0 pr-6">
              <blockquote className="max-w-3xl text-pretty font-display text-2xl font-medium leading-snug tracking-tight md:text-4xl">
                &ldquo;{testimonial.quote}&rdquo;
              </blockquote>
              <div className="mt-8 flex items-center gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-burnt font-mono text-sm">
                  {testimonial.name
                    .split(" ")
                    .filter((part) => /^[A-Za-z]/.test(part))
                    .map((part) => part[0])
                    .slice(0, 2)
                    .join("")}
                </div>
                <div>
                  <p className="font-semibold">{testimonial.name}</p>
                  <p className="text-sm text-white/60">
                    {testimonial.role} — {testimonial.project}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      <div className="mt-10 flex gap-2">
        {testimonials.map((testimonial, index) => (
          <button
            key={testimonial.name}
            type="button"
            aria-label={`Go to testimonial ${index + 1}`}
            onClick={() => goTo(index)}
            className="flex h-6 w-8 items-center justify-center"
          >
            <span
              className={`h-1.5 rounded-full transition-all ${
                index === active ? "w-8 bg-white" : "w-1.5 bg-white/30"
              }`}
            />
          </button>
        ))}
      </div>
    </section>
  );
}
