"use client";

import { motion, useMotionValue, useSpring } from "motion/react";
import { useEffect, useRef, useState, type ReactNode, type MouseEvent } from "react";

export function MagneticButton({
  children,
  className,
  cursorVariant = "link",
}: {
  children: ReactNode;
  className?: string;
  cursorVariant?: "link" | "view";
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 220, damping: 16, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 220, damping: 16, mass: 0.4 });

  useEffect(() => {
    setEnabled(window.matchMedia("(pointer: fine)").matches);
  }, []);

  const handleMove = (event: MouseEvent<HTMLDivElement>) => {
    if (!enabled || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((event.clientX - (rect.left + rect.width / 2)) * 0.35);
    y.set((event.clientY - (rect.top + rect.height / 2)) * 0.35);
  };

  const handleLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ x: springX, y: springY }}
      className={className}
      data-cursor={cursorVariant}
    >
      {children}
    </motion.div>
  );
}
