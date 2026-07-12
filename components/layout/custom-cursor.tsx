"use client";

import { motion, useMotionValue, useSpring } from "motion/react";
import { useEffect, useState } from "react";

type CursorVariant = "default" | "link" | "view";

export function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [variant, setVariant] = useState<CursorVariant>("default");
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { damping: 28, stiffness: 260, mass: 0.5 });
  const ringY = useSpring(y, { damping: 28, stiffness: 260, mass: 0.5 });

  useEffect(() => {
    const mql = window.matchMedia("(pointer: fine)");
    setEnabled(mql.matches);
    const listener = (event: MediaQueryListEvent) => setEnabled(event.matches);
    mql.addEventListener("change", listener);
    return () => mql.removeEventListener("change", listener);
  }, []);

  useEffect(() => {
    if (!enabled) return;

    const move = (event: MouseEvent) => {
      x.set(event.clientX);
      y.set(event.clientY);
      const target = (event.target as HTMLElement | null)?.closest<HTMLElement>("[data-cursor]");
      const next = (target?.dataset.cursor as CursorVariant | undefined) ?? "default";
      setVariant(next);
    };

    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [enabled, x, y]);

  if (!enabled) return null;

  return (
    <>
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[80] h-1.5 w-1.5 rounded-full bg-white mix-blend-difference"
        style={{ x, y, translateX: "-50%", translateY: "-50%" }}
      />
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[80] flex items-center justify-center rounded-full border border-white font-mono text-[10px] uppercase tracking-widest text-white mix-blend-difference"
        style={{ x: ringX, y: ringY, translateX: "-50%", translateY: "-50%" }}
        animate={{
          width: variant === "default" ? 30 : 68,
          height: variant === "default" ? 30 : 68,
          backgroundColor: variant === "view" ? "rgba(255,255,255,0.95)" : "rgba(255,255,255,0)",
          color: variant === "view" ? "#000000" : "#ffffff",
          opacity: variant === "default" ? 0.7 : 1,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 26 }}
      >
        {variant === "view" && "View"}
        {variant === "link" && "•"}
      </motion.div>
    </>
  );
}
