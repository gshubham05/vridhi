import { notFound } from "next/navigation";
import { ClosingCta } from "@/components/home/ClosingCta";
import { EnquiryForm } from "@/components/contact/EnquiryForm";
import { BeforeAfter } from "@/components/projects/BeforeAfter";
import { Gallery } from "@/components/projects/Gallery";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { ButtonLink } from "@/components/ui/Button";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/motion";
import { SampleBadge } from "@/components/ui/SampleBadge";
import { SectionHeading } from "@/components/ui/SectionHeading";
import {
  PLACEHOLDER_SLUG,
  getProject,
  getProjects,
  getRelatedProjects,
  isIndexable,
  slugParams,
} from "@/lib/content";
import { buildMetadata } from "@/lib/seo";
import { categoryLabels } from "@/lib/utils";
export function generateStaticParams() {
  return slugParams(getProjects().map((p) => p.slug));
}
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return buildMetadata({
    title: project.seo?.title ?? `${project.name}: ${categoryLabels[project.category]} in ${project.city}`,
    description: project.seo?.description ?? project.summary,
    path: `/projects/${project.slug}`,
    kicker: categoryLabels[project.category],
    noindex: !isIndexable(project),
  });
}
export default async function ProjectPage({ params }) {
  const { slug } = await params;
  if (slug === PLACEHOLDER_SLUG) notFound();
  const project = getProject(slug);
  if (!project) notFound();
  const related = getRelatedProjects(project);
  const place = [project.locality, project.city].filter(Boolean).join(", ");
  return (
    <>
      <PageHero
        eyebrow={categoryLabels[project.category]}
        title={project.name}
        lead={project.summary}
        image={project.cover}
        crumbs={[
          { name: "Projects", path: "/projects" },
          { name: project.name, path: `/projects/${project.slug}` },
        ]}
      >
        {project.sample && <SampleBadge label="Sample project, not a real commission" />}
      </PageHero>

      <section className="section">
        <div className="container-lux grid gap-14 lg:grid-cols-12 lg:gap-20">
          <Reveal className="lg:col-span-4">
            <dl className="space-y-6 border-t border-gold/60 pt-6 text-[0.9375rem]">
              <div>
                <dt className="eyebrow">Category</dt>
                <dd className="mt-1">{categoryLabels[project.category]}</dd>
              </div>
              <div>
                <dt className="eyebrow">Location</dt>
                <dd className="mt-1">{place}</dd>
              </div>
              {project.year && (
                <div>
                  <dt className="eyebrow">Year</dt>
                  <dd className="mt-1">{project.year}</dd>
                </div>
              )}
              {project.mapUrl && (
                <div>
                  <dt className="eyebrow">Map</dt>
                  <dd className="mt-1">
                    <a
                      href={project.mapUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="link-underline hover:text-gold-deep"
                    >
                      View on Google Maps
                    </a>
                  </dd>
                </div>
              )}
            </dl>
          </Reveal>
          <Reveal className="lg:col-span-8" delay={0.1}>
            <div className="prose-lux">
              {project.overview.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
            {project.scope.length > 0 && (
              <>
                <h2 className="display-sm mt-12">Scope of work</h2>
                <ul className="mt-4 list-disc space-y-2 pl-5 text-charcoal/80">
                  {project.scope.map((s) => (
                    <li key={s}>{s}</li>
                  ))}
                </ul>
              </>
            )}
            {project.concept && (
              <>
                <h2 className="display-sm mt-12">Design concept</h2>
                <p className="mt-4 leading-relaxed text-charcoal/80">{project.concept}</p>
              </>
            )}
            {project.materials && project.materials.length > 0 && (
              <>
                <h2 className="display-sm mt-12">Materials and finishes</h2>
                <ul className="mt-4 list-disc space-y-2 pl-5 text-charcoal/80">
                  {project.materials.map((m) => (
                    <li key={m}>{m}</li>
                  ))}
                </ul>
              </>
            )}
          </Reveal>
        </div>
      </section>

      {project.challenges && project.challenges.length > 0 && (
        <section className="section bg-paper" aria-labelledby="challenge-heading">
          <div className="container-lux">
            <SectionHeading
              eyebrow="On Site"
              title={<span id="challenge-heading">Challenges and solutions</span>}
            />
            <ul className="mt-12 grid gap-8 md:grid-cols-2">
              {project.challenges.map((c) => (
                <li key={c.challenge} className="border-t border-stone pt-6">
                  <h3 className="font-serif text-[1.25rem]">{c.challenge}</h3>
                  <p className="mt-3 leading-relaxed text-charcoal/75">{c.solution}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {project.beforeAfter && (
        <section className="section" aria-labelledby="ba-heading">
          <div className="container-lux">
            <SectionHeading eyebrow="Transformation" title={<span id="ba-heading">Before and after</span>} />
            <div className="mt-12">
              <BeforeAfter before={project.beforeAfter.before} after={project.beforeAfter.after} />
            </div>
          </div>
        </section>
      )}

      {project.gallery.length > 0 && (
        <section className="section bg-paper" aria-labelledby="gallery-heading">
          <div className="container-lux">
            <SectionHeading
              eyebrow="Gallery"
              title={<span id="gallery-heading">The project in detail</span>}
            />
            <div className="mt-12">
              <Gallery images={project.gallery} />
            </div>
          </div>
        </section>
      )}

      <section className="section" aria-labelledby="project-enquiry-heading" id="enquiry">
        <div className="container-lux grid gap-14 lg:grid-cols-12 lg:gap-20">
          <div className="lg:col-span-4">
            <SectionHeading
              eyebrow="Your Project"
              title={<span id="project-enquiry-heading">Planning something similar?</span>}
              lead="Tell us about your plans and we will respond personally."
            />
          </div>
          <div className="lg:col-span-8">
            <EnquiryForm projectRef={project.name} />
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="section bg-paper" aria-labelledby="more-heading">
          <div className="container-lux">
            <SectionHeading eyebrow="More Work" title={<span id="more-heading">Related projects</span>} />
            <ul className="mt-12 grid gap-x-8 gap-y-14 md:grid-cols-3">
              {related.map((p) => (
                <li key={p.slug}>
                  <ProjectCard project={p} />
                </li>
              ))}
            </ul>
            <div className="mt-12">
              <ButtonLink href="/projects" variant="link">
                View the full portfolio
              </ButtonLink>
            </div>
          </div>
        </section>
      )}
      <ClosingCta />
    </>
  );
}
