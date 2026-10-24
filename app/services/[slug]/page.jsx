import Link from "next/link";
import { notFound } from "next/navigation";
import { Check } from "lucide-react";
import { ClosingCta } from "@/components/home/ClosingCta";
import { ProcessTimeline } from "@/components/home/ProcessTimeline";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { ButtonLink } from "@/components/ui/Button";
import { JsonLd } from "@/components/ui/JsonLd";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SmartImage } from "@/components/ui/SmartImage";
import { PLACEHOLDER_SLUG, getProjects, getService, getServices, slugParams } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";
import { faqSchema, serviceSchema } from "@/lib/schema";
export function generateStaticParams() {
  return slugParams(getServices().map((s) => s.slug));
}
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};
  return buildMetadata({
    title: service.seo.title,
    description: service.seo.description,
    path: `/services/${service.slug}`,
    kicker: service.eyebrow,
  });
}
export default async function ServicePage({ params }) {
  const { slug } = await params;
  if (slug === PLACEHOLDER_SLUG) notFound();
  const service = getService(slug);
  if (!service) notFound();
  const related = service.relatedCategory ? getProjects(service.relatedCategory).slice(0, 3) : [];
  const others = getServices().filter((s) => s.slug !== service.slug);
  return (
    <>
      <JsonLd data={[serviceSchema(service), ...(service.faqs.length ? [faqSchema(service.faqs)] : [])]} />
      <PageHero
        eyebrow={service.eyebrow}
        title={service.title}
        lead={service.summary}
        crumbs={[
          { name: "Services", path: "/services" },
          { name: service.title, path: `/services/${service.slug}` },
        ]}
      >
        <ButtonLink href="/contact#enquiry" variant="gold">
          Schedule a Private Consultation
        </ButtonLink>
      </PageHero>

      <section className="section">
        <div className="container-lux grid items-start gap-14 lg:grid-cols-12 lg:gap-20">
          <Reveal className="lg:col-span-7">
            <div className="prose-lux">
              {service.intro.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          </Reveal>
          <Reveal className="lg:col-span-5" delay={0.1}>
            <div className="relative aspect-[4/5] overflow-hidden bg-stone">
              <SmartImage
                asset={service.image}
                fill
                sizes="(min-width: 1024px) 40vw, 92vw"
                className="object-cover"
              />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section bg-paper" aria-labelledby="offer-heading">
        <div className="container-lux">
          <Reveal>
            <SectionHeading
              eyebrow="What We Offer"
              title={<span id="offer-heading">The scope of this service</span>}
            />
          </Reveal>
          <Stagger className="mt-14 grid gap-x-10 gap-y-10 md:grid-cols-2">
            {service.offerings.map((o) => (
              <StaggerItem key={o.title} className="border-t border-stone pt-6">
                <h3 className="display-sm">{o.title}</h3>
                <p className="mt-3 leading-relaxed text-charcoal/70">{o.description}</p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="section" aria-labelledby="benefits-heading">
        <div className="container-lux">
          <Reveal>
            <SectionHeading
              eyebrow="Why It Matters"
              title={<span id="benefits-heading">What you can expect</span>}
            />
          </Reveal>
          <ul className="mt-14 grid gap-8 md:grid-cols-3">
            {service.benefits.map((b) => (
              <li key={b.title} className="flex gap-4">
                <Check aria-hidden="true" className="mt-1 size-5 shrink-0 text-gold-deep" />
                <div>
                  <h3 className="font-serif text-[1.25rem]">{b.title}</h3>
                  <p className="mt-2 leading-relaxed text-charcoal/70">{b.description}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section on-dark bg-charcoal text-ivory" aria-labelledby="svc-process-heading">
        <div className="container-lux">
          <Reveal>
            <SectionHeading
              dark
              eyebrow="How We Work"
              title={<span id="svc-process-heading">A clear path from brief to handover</span>}
            />
          </Reveal>
          <div className="mt-16">
            <ProcessTimeline dark />
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="section" aria-labelledby="related-heading">
          <div className="container-lux">
            <Reveal>
              <SectionHeading
                eyebrow="Related Work"
                title={<span id="related-heading">Projects in this discipline</span>}
              />
            </Reveal>
            <ul className="mt-14 grid gap-x-8 gap-y-14 md:grid-cols-3">
              {related.map((p) => (
                <li key={p.slug}>
                  <ProjectCard project={p} />
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {service.faqs.length > 0 && (
        <section className="section bg-paper" aria-labelledby="faq-heading">
          <div className="container-lux max-w-4xl">
            <Reveal>
              <SectionHeading eyebrow="Questions" title={<span id="faq-heading">Frequently asked</span>} />
            </Reveal>
            <div className="mt-12 divide-y divide-stone border-y border-stone">
              {service.faqs.map((f) => (
                <details key={f.q} className="group py-6">
                  <summary className="flex cursor-pointer list-none items-start justify-between gap-6 font-serif text-[1.25rem]">
                    {f.q}
                    <span
                      aria-hidden="true"
                      className="mt-1 text-gold-deep transition-transform group-open:rotate-45"
                    >
                      +
                    </span>
                  </summary>
                  <p className="mt-4 max-w-3xl leading-relaxed text-charcoal/75">{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="section" aria-label="Other services">
        <div className="container-lux">
          <p className="eyebrow">Explore Further</p>
          <ul className="mt-6 flex flex-wrap gap-x-8 gap-y-3">
            {others.map((s) => (
              <li key={s.slug}>
                <Link href={`/services/${s.slug}`} className="link-underline hover:text-gold-deep">
                  {s.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <ClosingCta />
    </>
  );
}
