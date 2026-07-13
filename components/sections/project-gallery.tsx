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

function GalleryTile({
  project,
  onOpen,
}: {
  project: Project;
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
      layout
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      onMouseMove={handleMove}
      onMouseEnter={() => scale.set(1.03)}
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
      className="group relative aspect-[4/5] cursor-pointer overflow-hidden rounded-sm bg-charcoal focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
    >
      <Image
        src={project.images[0]}
        alt={project.title}
        fill
        sizes="(min-width: 768px) 33vw, 100vw"
        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent" />
      <div className="absolute bottom-0 left-0 p-6">
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-burnt">
          {project.category}
          {project.images.length > 1 ? ` — ${project.images.length} photos` : ""}
        </p>
        <h3 className="mt-2 font-display text-2xl font-semibold uppercase tracking-tight">
          {project.title}
        </h3>
      </div>
    </motion.div>
  );
}

const categoryOrder: Project["category"][] = [
  "Residential",
  "Commercial",
  "Renovation",
  "Development",
];

export function ProjectGallery() {
  const [openSlug, setOpenSlug] = useState<string | null>(null);
  const [slideIndex, setSlideIndex] = useState(0);
  const [activeFilter, setActiveFilter] = useState<"All" | Project["category"]>("All");
  const openProject = projects.find((project) => project.slug === openSlug);

  const filters: ("All" | Project["category"])[] = [
    "All",
    ...categoryOrder.filter((category) => projects.some((project) => project.category === category)),
  ];
  const filteredProjects =
    activeFilter === "All" ? projects : projects.filter((project) => project.category === activeFilter);

  const goNext = () => {
    setSlideIndex((i) => (openProject ? (i + 1) % openProject.images.length : i));
  };
  const goPrev = () => {
    setSlideIndex((i) =>
      openProject ? (i - 1 + openProject.images.length) % openProject.images.length : i,
    );
  };

  useEffect(() => {
    if (!openSlug) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpenSlug(null);
      if (event.key === "ArrowRight") goNext();
      if (event.key === "ArrowLeft") goPrev();
    };
    window.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openSlug, openProject]);

  const openProjectAt = (slug: string) => {
    setOpenSlug(slug);
    setSlideIndex(0);
  };

  return (
    <section id="gallery" className="relative bg-black px-6 py-24 md:px-12 md:py-40">
      <p className="mb-6 font-mono text-xs uppercase tracking-[0.3em] text-burnt">
        — 006 / Gallery
      </p>
      <h2 className="mb-10 max-w-2xl font-display text-4xl font-semibold uppercase leading-[0.95] tracking-tight md:text-6xl">
        A Closer Look
      </h2>

      <div className="mb-12 flex flex-wrap gap-3">
        {filters.map((filter) => (
          <button
            key={filter}
            type="button"
            onClick={() => setActiveFilter(filter)}
            data-cursor="link"
            aria-pressed={activeFilter === filter}
            className={`rounded-full border px-4 py-2 font-mono text-[11px] uppercase tracking-[0.2em] transition-colors ${
              activeFilter === filter
                ? "border-burnt bg-burnt text-black"
                : "border-white/20 text-white/60 hover:border-white/50 hover:text-white"
            }`}
          >
            {filter}
            {filter !== "All"
              ? ` — ${projects.filter((project) => project.category === filter).length}`
              : ` — ${projects.length}`}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project) => (
            <GalleryTile
              key={project.slug}
              project={project}
              onOpen={() => openProjectAt(project.slug)}
            />
          ))}
        </AnimatePresence>
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
              onClick={(event) => event.stopPropagation()}
              className="relative h-full max-h-[85vh] w-full max-w-4xl overflow-hidden rounded-sm"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={slideIndex}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-0"
                >
                  <Image
                    src={openProject.images[slideIndex]}
                    alt={`${openProject.title} — photo ${slideIndex + 1}`}
                    fill
                    sizes="80vw"
                    className="object-cover"
                    priority
                  />
                </motion.div>
              </AnimatePresence>

              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent" />

              {openProject.images.length > 1 && (
                <>
                  <button
                    type="button"
                    aria-label="Previous photo"
                    onClick={(event) => {
                      event.stopPropagation();
                      goPrev();
                    }}
                    className="absolute left-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 text-xl text-white transition-colors hover:border-white hover:bg-black/40 md:left-6"
                  >
                    ‹
                  </button>
                  <button
                    type="button"
                    aria-label="Next photo"
                    onClick={(event) => {
                      event.stopPropagation();
                      goNext();
                    }}
                    className="absolute right-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 text-xl text-white transition-colors hover:border-white hover:bg-black/40 md:right-6"
                  >
                    ›
                  </button>
                </>
              )}

              <div className="absolute bottom-0 left-0 flex w-full items-end justify-between gap-6 p-8">
                <div>
                  <p className="font-mono text-xs uppercase tracking-[0.2em] text-white/70">
                    {openProject.category} / {openProject.location}
                  </p>
                  <h3 className="mt-2 font-display text-3xl font-semibold uppercase tracking-tight md:text-5xl">
                    {openProject.title}
                  </h3>
                  {openProject.description && (
                    <p className="mt-3 max-w-lg text-pretty text-sm text-white/70">
                      {openProject.description}
                    </p>
                  )}
                </div>
                {openProject.images.length > 1 && (
                  <p className="shrink-0 font-mono text-xs text-white/60">
                    {slideIndex + 1} / {openProject.images.length}
                  </p>
                )}
              </div>
            </motion.div>
            <button
              type="button"
              aria-label="Close"
              onClick={() => setOpenSlug(null)}
              className="absolute right-6 top-6 flex h-10 w-10 items-center justify-center rounded-full border border-white/30 text-white md:right-12 md:top-12"
            >
              ✕
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
