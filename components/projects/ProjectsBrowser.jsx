"use client";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { cn, categoryLabels } from "@/lib/utils";
const order = ["residential", "commercial", "interior-design", "renovation"];
/**
 * Filterable portfolio grid. Filters are real buttons (keyboard operable,
 * aria-pressed). Only categories that contain projects are offered, results
 * fade in once per change, and large collections load progressively.
 */
export function ProjectsBrowser({ projects, pageSize = 9 }) {
  const [filter, setFilter] = useState("all");
  const [shown, setShown] = useState(pageSize);
  const available = order.filter((category) => projects.some((p) => p.category === category));
  const filtered = filter === "all" ? projects : projects.filter((p) => p.category === filter);
  const visible = filtered.slice(0, shown);
  const choose = (next) => {
    setFilter(next);
    setShown(pageSize);
  };
  const chip = (active) =>
    cn(
      "min-h-11 border px-5 text-[0.8125rem] font-medium uppercase tracking-[0.14em] transition-colors duration-500",
      active
        ? "border-charcoal bg-charcoal text-ivory"
        : "border-charcoal/25 text-charcoal hover:border-charcoal",
    );
  return (
    <div>
      {available.length > 1 && (
        <div role="group" aria-label="Filter projects by category" className="flex flex-wrap gap-3">
          <button
            type="button"
            aria-pressed={filter === "all"}
            onClick={() => choose("all")}
            className={chip(filter === "all")}
          >
            All Projects
          </button>
          {available.map((category) => (
            <button
              key={category}
              type="button"
              aria-pressed={filter === category}
              onClick={() => choose(category)}
              className={chip(filter === category)}
            >
              {categoryLabels[category]}
            </button>
          ))}
        </div>
      )}

      <p className="sr-only" role="status" aria-live="polite">
        Showing {visible.length} of {filtered.length} projects
      </p>

      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={filter}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="mt-12 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3"
        >
          {visible.map((project, index) => (
            <ProjectCard key={project.slug} project={project} priority={index < 2} />
          ))}
        </motion.div>
      </AnimatePresence>

      {visible.length < filtered.length && (
        <div className="mt-14 flex justify-center">
          <button
            type="button"
            onClick={() => setShown((count) => count + pageSize)}
            className="min-h-12 border border-charcoal/40 px-8 text-[0.8125rem] font-medium uppercase tracking-[0.14em] transition-colors duration-500 hover:bg-charcoal hover:text-ivory"
          >
            Load more projects
          </button>
        </div>
      )}
    </div>
  );
}
