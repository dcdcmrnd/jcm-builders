"use client";

import { useEffect, useRef, useState } from "react";
import { useLenis } from "@/components/providers/smooth-scroll-provider";

/** Returns "up" | "down", used to show/hide the header as the visitor scrolls. */
export function useScrollDirection(threshold = 80) {
  const lenis = useLenis();
  const [direction, setDirection] = useState<"up" | "down">("up");
  const lastScroll = useRef(0);

  useEffect(() => {
    const evaluate = (scroll: number) => {
      const delta = scroll - lastScroll.current;
      if (scroll < threshold) {
        setDirection("up");
      } else if (Math.abs(delta) > 4) {
        setDirection(delta > 0 ? "down" : "up");
      }
      lastScroll.current = scroll;
    };

    if (lenis) {
      const onScroll = ({ scroll }: { scroll: number }) => evaluate(scroll);
      lenis.on("scroll", onScroll);
      return () => {
        lenis.off("scroll", onScroll);
      };
    }

    const onNativeScroll = () => evaluate(window.scrollY);
    window.addEventListener("scroll", onNativeScroll, { passive: true });
    return () => window.removeEventListener("scroll", onNativeScroll);
  }, [lenis, threshold]);

  return direction;
}
