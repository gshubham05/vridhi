import { StaggerList, StaggerListItem } from "@/components/ui/motion";
import { getProcessSteps } from "@/lib/content";
import { cn } from "@/lib/utils";
/**
 * Six-step process. Vertical on mobile and tablet, horizontal from `lg`.
 * `detailed` adds the full description (used on /process).
 */
export function ProcessTimeline({ detailed = false, dark = false }) {
  const steps = getProcessSteps();
  return (
    <div className="relative">
      {/* Decorative spine: vertical on small screens, horizontal on large */}
      <span
        aria-hidden="true"
        className="absolute bottom-2 left-[0.45rem] top-2 w-px bg-gold/40 lg:bottom-auto lg:left-0 lg:right-0 lg:top-[0.45rem] lg:h-px lg:w-auto"
      />
      <StaggerList className="relative grid gap-12 lg:grid-cols-6 lg:gap-7">
        {steps.map((step, index) => (
          <StaggerListItem key={step.title} className="relative pl-10 lg:pl-0 lg:pt-12">
            <span
              aria-hidden="true"
              className={cn(
                "absolute left-0 top-1.5 size-[0.9rem] rotate-45 border border-gold lg:top-0",
                dark ? "bg-charcoal" : "bg-ivory",
              )}
            />
            <span
              aria-hidden="true"
              className={cn(
                "font-serif text-[3.25rem] leading-none",
                dark ? "text-ivory/50" : "text-charcoal/50",
              )}
            >
              {String(index + 1).padStart(2, "0")}
            </span>
            <h3 className="display-sm mt-3">{step.title}</h3>
            <p
              className={cn(
                "mt-3 text-[0.9375rem] leading-relaxed",
                dark ? "text-ivory/70" : "text-charcoal/70",
              )}
            >
              {detailed ? step.detail : step.summary}
            </p>
          </StaggerListItem>
        ))}
      </StaggerList>
    </div>
  );
}
