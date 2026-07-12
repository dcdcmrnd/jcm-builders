"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger, ensureGsapPlugins } from "@/lib/gsap";
import { useReducedMotion } from "@/lib/use-reduced-motion";

export function AnimatedCounter({
  value,
  suffix = "",
  duration = 1.6,
}: {
  value: number;
  suffix?: string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (!ref.current) return;

    if (reducedMotion) {
      ref.current.textContent = `${value}${suffix}`;
      return;
    }

    ensureGsapPlugins();
    const proxy = { val: 0 };

    const trigger = ScrollTrigger.create({
      trigger: ref.current,
      start: "top 85%",
      once: true,
      onEnter: () => {
        gsap.to(proxy, {
          val: value,
          duration,
          ease: "power2.out",
          onUpdate: () => {
            if (ref.current) {
              ref.current.textContent = `${Math.round(proxy.val)}${suffix}`;
            }
          },
        });
      },
    });

    return () => trigger.kill();
  }, [value, suffix, duration, reducedMotion]);

  return (
    <span ref={ref}>
      0{suffix}
    </span>
  );
}
