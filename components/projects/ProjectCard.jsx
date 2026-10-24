import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { SampleBadge } from "@/components/ui/SampleBadge";
import { SmartImage } from "@/components/ui/SmartImage";
import { categoryLabels } from "@/lib/utils";
export function ProjectCard({ project, priority = false }) {
  const place = [project.locality, project.city].filter(Boolean).join(", ");
  const meta = [categoryLabels[project.category], place, project.year].filter(Boolean).join("  ·  ");
  return (
    <article className="group relative">
      <div className="relative aspect-[4/3] overflow-hidden bg-stone">
        <SmartImage
          asset={project.cover}
          fill
          priority={priority}
          sizes="(min-width: 1024px) 30vw, (min-width: 640px) 46vw, 92vw"
          className="object-cover transition-transform duration-[1600ms] ease-[var(--ease-lux)] group-hover:scale-[1.05]"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-charcoal/55 via-charcoal/0 to-transparent opacity-0 transition-opacity duration-700 group-hover:opacity-100"
        />
        <span
          aria-hidden="true"
          className="absolute bottom-5 left-5 flex translate-y-3 items-center gap-2 text-[0.75rem] font-medium uppercase tracking-[0.18em] text-ivory opacity-0 transition-[opacity,transform] duration-700 ease-[var(--ease-lux)] group-hover:translate-y-0 group-hover:opacity-100"
        >
          View Project <ArrowUpRight className="size-4" />
        </span>
        {project.sample && <SampleBadge className="absolute right-4 top-4" />}
      </div>
      <div className="mt-5">
        <p className="text-[0.6875rem] font-medium uppercase tracking-[0.2em] text-olive-deep">{meta}</p>
        <h3 className="display-sm mt-2.5">
          <Link href={`/projects/${project.slug}`} className="after:absolute after:inset-0">
            {project.name}
          </Link>
        </h3>
        <p className="mt-2.5 line-clamp-2 max-w-md text-[0.9375rem] leading-relaxed text-charcoal/70">
          {project.summary}
        </p>
        <span className="mt-4 inline-flex items-center gap-2 text-[0.8125rem] font-medium uppercase tracking-[0.14em] text-charcoal">
          <span className="relative pb-1 after:absolute after:bottom-0 after:left-0 after:h-px after:w-full after:origin-left after:scale-x-[0.35] after:bg-gold after:transition-transform after:duration-700 after:ease-[var(--ease-lux)] group-hover:after:scale-x-100">
            View Project
          </span>
        </span>
      </div>
    </article>
  );
}
