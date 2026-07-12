"use client";

import { useEffect, useRef, useState, type MouseEvent } from "react";
import Image from "next/image";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useTransform,
} from "motion/react";
import { projects, type Project } from "@/data/projects";

const galleryItems = projects.slice(0, 8);

function GalleryTile({
  project,
  tall,
  onOpen,
}: {
  project: Project;
  tall?: boolean;
  onOpen: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);
  const rotateX = useSpring(useTransform(y, [0, 1], [6, -6]), {
    stiffness: 200,
    damping: 20,
  });
  const rotateY = useSpring(useTransform(x, [0, 1], [-6, 6]), {
    stiffness: 200,
    damping: 20,
  });
  const scale = useSpring(1, { stiffness: 200, damping: 20 });

  const handleMove = (event: MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((event.clientX - rect.left) / rect.width);
    y.set((event.clientY - rect.top) / rect.height);
  };

  return (
    <motion.div
      ref={ref}
      layoutId={`gallery-${project.slug}`}
      onMouseMove={handleMove}
      onMouseEnter={() => scale.set(1.04)}
      onMouseLeave={() => scale.set(1)}
      onClick={onOpen}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          onOpen();
        }
      }}
      role="button"
      tabIndex={0}
      aria-label={`View ${project.title} — ${project.category}`}
      data-cursor="view"
      style={{ rotateX, rotateY, scale, transformPerspective: 800 }}
      className={`group relative cursor-pointer overflow-hidden rounded-sm bg-charcoal focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white ${
        tall ? "row-span-2" : ""
      }`}
    >
      <Image
        src={project.image}
        alt={project.title}
        fill
        sizes="(min-width: 768px) 25vw, 50vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/0 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      <div className="absolute bottom-0 left-0 p-4">
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/80 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          {project.category}
        </p>
      </div>
    </motion.div>
  );
}

export function ProjectGallery() {
  const [openSlug, setOpenSlug] = useState<string | null>(null);
  const openProject = galleryItems.find((project) => project.slug === openSlug);

  useEffect(() => {
    if (!openSlug) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpenSlug(null);
    };
    window.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [openSlug]);

  return (
    <section id="gallery" className="relative bg-black px-6 py-24 md:px-12 md:py-40">
      <p className="mb-6 font-mono text-xs uppercase tracking-[0.3em] text-burnt">
        — 006 / Gallery
      </p>
      <h2 className="mb-16 max-w-2xl font-display text-4xl font-semibold uppercase leading-[0.95] tracking-tight md:text-6xl">
        A Closer Look
      </h2>

      <div className="grid auto-rows-[180px] grid-cols-2 gap-3 md:auto-rows-[220px] md:grid-cols-4 md:gap-4">
        {galleryItems.map((project, index) => (
          <GalleryTile
            key={project.slug}
            project={project}
            tall={index % 5 === 0}
            onOpen={() => setOpenSlug(project.slug)}
          />
        ))}
      </div>

      <AnimatePresence>
        {openProject && (
          <motion.div
            className="fixed inset-0 z-[90] flex items-center justify-center bg-black/90 p-6 md:p-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpenSlug(null)}
          >
            <motion.div
              layoutId={`gallery-${openProject.slug}`}
              className="relative h-full max-h-[80vh] w-full max-w-4xl overflow-hidden rounded-sm"
            >
              <Image
                src={openProject.image}
                alt={openProject.title}
                fill
                sizes="80vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 p-8">
                <p className="font-mono text-xs uppercase tracking-[0.2em] text-white/70">
                  {openProject.category} / {openProject.location}
                </p>
                <h3 className="mt-2 font-display text-3xl font-semibold uppercase tracking-tight md:text-5xl">
                  {openProject.title}
                </h3>
              </div>
            </motion.div>
            <button
              type="button"
              aria-label="Close"
              className="absolute right-6 top-6 flex h-10 w-10 items-center justify-center rounded-full border border-white/30 text-white md:right-12 md:top-12"
              onClick={() => setOpenSlug(null)}
            >
              ✕
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
