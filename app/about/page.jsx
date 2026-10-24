import { LeadershipSection } from "@/components/about/LeadershipSection";
import { ClosingCta } from "@/components/home/ClosingCta";
import { WhySection } from "@/components/home/WhySection";
import { JsonLd } from "@/components/ui/JsonLd";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getLeaders } from "@/lib/content";
import { personSchema } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";
export const metadata = buildMetadata({
  title: "About Vridhi Construction",
  description:
    "Meet Vridhi Construction, a Dehradun construction, architecture and interior firm led by co-founders Abhinav Nautiyal and Sanjay Kothari.",
  path: "/about",
  kicker: "About",
});
export default function AboutPage() {
  return (
    <>
      <JsonLd data={getLeaders().map(personSchema)} />
      <PageHero
        eyebrow="About Us"
        title="Architecture, construction and interiors, shaped by one team"
        lead="Vridhi Construction brings design and delivery together, so the home or workplace you imagine is the one that gets built."
        crumbs={[{ name: "About", path: "/about" }]}
      />
      <section className="section" aria-labelledby="approach-heading">
        <div className="container-lux grid gap-14 lg:grid-cols-12 lg:gap-20">
          <Reveal className="lg:col-span-5">
            <SectionHeading
              eyebrow="Our Approach"
              title={<span id="approach-heading">Design and delivery, never separated</span>}
            />
          </Reveal>
          <Reveal className="lg:col-span-7" delay={0.1}>
            <div className="prose-lux">
              <p>
                Too many projects lose their intent between the drawing board and the site. Vridhi
                Construction was built around closing that gap: architecture, construction, interior design
                and renovation, planned together and delivered by a single accountable team.
              </p>
              <p>
                We work with homeowners, families and businesses in Dehradun and the surrounding region who
                want a clear process, honest communication and a result that is as well made as it looks.
              </p>
            </div>
          </Reveal>
        </div>
      </section>
      <LeadershipSection dark />
      <WhySection />
      <ClosingCta />
    </>
  );
}
