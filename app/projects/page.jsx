import { ClosingCta } from "@/components/home/ClosingCta";
import { ProjectsBrowser } from "@/components/projects/ProjectsBrowser";
import { ButtonLink } from "@/components/ui/Button";
import { PageHero } from "@/components/ui/PageHero";
import { getProjects } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";
export const metadata = buildMetadata({
  title: "Our Projects: Residential, Commercial & Interiors",
  description:
    "Browse residential, commercial, interior design and renovation projects by Vridhi Construction in Dehradun.",
  path: "/projects",
  kicker: "Portfolio",
});
export default function ProjectsPage() {
  const projects = getProjects();
  return (
    <>
      <PageHero
        eyebrow="The Portfolio"
        title="Selected commissions"
        lead="Residences, workplaces, interiors and renovations, each shaped around the people who use them."
        crumbs={[{ name: "Projects", path: "/projects" }]}
      />
      <section className="section">
        <div className="container-lux">
          {projects.length > 0 ? (
            <ProjectsBrowser projects={projects} pageSize={9} />
          ) : (
            <div className="mx-auto max-w-xl border border-stone p-12 text-center">
              <h2 className="display-sm">Our portfolio is being prepared</h2>
              <p className="mt-4 text-charcoal/75">
                We are curating completed projects, with our clients’ permission. Please get in touch to
                discuss your project and see relevant work in person.
              </p>
              <div className="mt-8 flex justify-center">
                <ButtonLink href="/contact#enquiry">Speak to Our Team</ButtonLink>
              </div>
            </div>
          )}
        </div>
      </section>
      <ClosingCta />
    </>
  );
}
