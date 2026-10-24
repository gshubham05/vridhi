import { ServiceCard } from "@/components/services/ServiceCard";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getServices } from "@/lib/content";
export function ServicesSection() {
  const services = getServices();
  if (services.length === 0) return null;
  return (
    <section aria-labelledby="services-heading" className="section">
      <div className="container-lux">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <Reveal>
            <SectionHeading
              eyebrow="What We Do"
              title={<span id="services-heading">Six disciplines. One considered team.</span>}
              lead="From the first sketch to the final detail, every service is designed to work with the others."
            />
          </Reveal>
          <Reveal delay={0.1}>
            <ButtonLink href="/services" variant="link">
              View all services
            </ButtonLink>
          </Reveal>
        </div>

        <Stagger className="mt-16 grid gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-10">
          {services.map((service, index) => (
            <StaggerItem
              key={service.slug}
              // Editorial rhythm: the middle column sits lower on wide screens.
              className={index % 3 === 1 ? "lg:mt-16" : undefined}
            >
              <ServiceCard service={service} index={index} />
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
