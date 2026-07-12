"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { useScrollDirection } from "@/lib/use-scroll-direction";
import { navLinks } from "@/data/nav";
import { MagneticButton } from "./magnetic-button";

export function Header() {
  const direction = useScrollDirection();

  return (
    <motion.header
      animate={{ y: direction === "down" ? "-110%" : "0%" }}
      transition={{ duration: 0.4, ease: [0.76, 0, 0.24, 1] }}
      className="fixed inset-x-0 top-0 z-50 flex items-center justify-between bg-gradient-to-b from-black/70 via-black/15 to-transparent px-6 py-5 md:px-12"
    >
      <Link href="#hero" className="flex items-center gap-3" data-cursor="link">
        <span className="relative block h-8 w-8 overflow-hidden rounded-full">
          <Image
            src="/images/jcm-logo.jpg"
            alt="JCM Home Builders"
            width={64}
            height={64}
            className="h-full w-full object-cover"
          />
        </span>
        <span className="font-display text-sm font-semibold uppercase tracking-[0.2em]">
          JCM Home Builders
        </span>
      </Link>

      <nav className="hidden items-center gap-8 font-mono text-xs uppercase tracking-[0.15em] text-white/75 md:flex">
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            data-cursor="link"
            className="flex items-center py-2 transition-colors hover:text-white"
          >
            {link.label}
          </Link>
        ))}
      </nav>

      <MagneticButton className="hidden md:block">
        <Link
          href="#contact"
          className="rounded-full border border-white/30 px-5 py-2 font-mono text-xs uppercase tracking-[0.15em] transition-colors hover:border-white"
        >
          Start a Project
        </Link>
      </MagneticButton>
    </motion.header>
  );
}
