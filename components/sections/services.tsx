"use client";

import { useRef, useState, type MouseEvent } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useMotionValue, useSpring } from "motion/react";
import { services } from "@/data/services";

export function Services() {
  const [active, setActive] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 200, damping: 24, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 200, damping: 24, mass: 0.4 });

  const handleMouseMove = (event: MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    x.set(event.clientX - rect.left);
    y.set(event.clientY - rect.top);
  };

  return (
    <section
      id="services"
      className="relative bg-white px-6 py-24 text-black md:px-12 md:py-40"
    >
      <p className="mb-6 font-mono text-xs uppercase tracking-[0.3em] text-burnt">
        — 003 / Capabilities
      </p>
      <h2 className="mb-16 max-w-xl font-display text-4xl font-semibold uppercase leading-[0.95] tracking-tight md:text-6xl">
        What We Build
      </h2>

      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => setActive(null)}
        className="relative border-t border-black/10"
      >
        {services.map((service, index) => (
          <div
            key={service.title}
            onMouseEnter={() => setActive(index)}
            className="group flex flex-col gap-3 border-b border-black/10 py-8 transition-colors md:flex-row md:items-center md:justify-between md:py-10"
          >
            <div className="flex items-baseline gap-6 md:gap-10">
              <span className="font-mono text-xs text-black/40">{service.index}</span>
              <h3 className="font-display text-3xl font-semibold uppercase tracking-tight transition-colors md:text-5xl group-hover:text-burnt">
                {service.title}
              </h3>
            </div>
            <p className="max-w-xs text-sm text-black/60 md:text-right">
              {service.description}
            </p>
          </div>
        ))}

        <motion.div
          className="pointer-events-none absolute left-0 top-0 z-20 hidden h-56 w-72 overflow-hidden rounded-sm shadow-2xl md:block"
          style={{ x: springX, y: springY, translateX: "-50%", translateY: "-110%" }}
          animate={{ opacity: active !== null ? 1 : 0, scale: active !== null ? 1 : 0.9 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          <AnimatePresence mode="wait">
            {active !== null && (
              <motion.div
                key={services[active].title}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="relative h-full w-full"
              >
                <Image
                  src={services[active].image}
                  alt={services[active].title}
                  fill
                  sizes="288px"
                  className="object-cover"
                />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
