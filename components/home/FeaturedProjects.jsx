import { ProjectsBrowser } from "@/components/projects/ProjectsBrowser";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getProjects } from "@/lib/content";
/** Home-page portfolio. Hidden entirely until at least one project is published. */
export function FeaturedProjects() {
  const all = getProjects();
  if (all.length === 0) return null;
  const projects = all.slice(0, 6);
  return (
    <section aria-labelledby="portfolio-heading" className="section bg-paper">
      <div className="container-lux">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <Reveal>
            <SectionHeading
              eyebrow="The Portfolio"
              title={<span id="portfolio-heading">Selected commissions</span>}
              lead="A curated view of completed work: residences, workplaces, interiors and renovations."
            />
          </Reveal>
          {all.length > projects.length && (
            <Reveal delay={0.1}>
              <ButtonLink href="/projects" variant="link">
                View the full portfolio
              </ButtonLink>
            </Reveal>
          )}
        </div>
        <div className="mt-14">
          <ProjectsBrowser projects={projects} pageSize={6} />
        </div>
      </div>
    </section>
  );
}
