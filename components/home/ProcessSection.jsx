import { ProcessTimeline } from "@/components/home/ProcessTimeline";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
export function ProcessSection() {
  return (
    <section aria-labelledby="process-heading" className="section on-dark bg-charcoal text-ivory">
      <div className="container-lux">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <Reveal>
            <SectionHeading
              dark
              eyebrow="Our Process"
              title={<span id="process-heading">A clear path from first conversation to handover</span>}
              lead="Six considered stages, so you always know where your project stands and what comes next."
            />
          </Reveal>
          <Reveal delay={0.1}>
            <ButtonLink href="/process" variant="outline-light">
              Explore the process
            </ButtonLink>
          </Reveal>
        </div>
        <div className="mt-16">
          <ProcessTimeline dark />
        </div>
      </div>
    </section>
  );
}
