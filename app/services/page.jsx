import { ClosingCta } from "@/components/home/ClosingCta";
import { ServiceCard } from "@/components/services/ServiceCard";
import { PageHero } from "@/components/ui/PageHero";
import { Stagger, StaggerItem } from "@/components/ui/motion";
import { getServices } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";
export const metadata = buildMetadata({
  title: "Construction, Architecture & Interior Services in Dehradun",
  description:
    "Residential and commercial construction, architecture and planning, interior design, renovation and turnkey delivery from Vridhi Construction, Dehradun.",
  path: "/services",
  kicker: "Services",
});
export default function ServicesPage() {
  const services = getServices();
  return (
    <>
      <PageHero
        eyebrow="Our Services"
        title="Every discipline your project needs, under one roof"
        lead="Architecture, construction, interiors and renovation, planned together and delivered by one accountable team."
        crumbs={[{ name: "Services", path: "/services" }]}
      />
      <section className="section">
        <div className="container-lux">
          <Stagger className="grid gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-10">
            {services.map((service, index) => (
              <StaggerItem key={service.slug}>
                <ServiceCard service={service} index={index} />
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>
      <ClosingCta />
    </>
  );
}
