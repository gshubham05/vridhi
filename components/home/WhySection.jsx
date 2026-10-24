import { Reveal, Stagger, StaggerItem } from "@/components/ui/motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SmartImage } from "@/components/ui/SmartImage";
import { placeholder } from "@/data/images";
import { getPillars } from "@/lib/content";
const image = placeholder("why", "Architectural elevation of a residence in soft daylight");
export function WhySection() {
  const pillars = getPillars();
  return (
    <section aria-labelledby="why-heading" className="section overflow-hidden">
      <div className="container-lux grid items-center gap-16 lg:grid-cols-12 lg:gap-20">
        <Reveal className="lg:col-span-5">
          <div className="relative">
            <div className="relative aspect-[4/5] overflow-hidden bg-stone">
              <SmartImage
                asset={image}
                fill
                sizes="(min-width: 1024px) 40vw, 92vw"
                className="object-cover object-[60%_center]"
              />
            </div>
            {/* Offset hairline frame: a quiet editorial detail */}
            <span
              aria-hidden="true"
              className="absolute -bottom-5 -right-5 -z-10 hidden size-full border border-gold/50 sm:block"
            />
          </div>
        </Reveal>

        <div className="lg:col-span-7">
          <Reveal>
            <SectionHeading
              eyebrow="Why Vridhi"
              title={<span id="why-heading">Quietly rigorous. Carefully made.</span>}
              lead="We hold ourselves to a simple standard: build as though we will be living in it."
            />
          </Reveal>
          <Stagger className="mt-14 grid gap-x-10 gap-y-10 sm:grid-cols-2">
            {pillars.map((pillar, index) => (
              <StaggerItem key={pillar.title} className="border-t border-stone pt-6">
                <span aria-hidden="true" className="font-serif text-[1.125rem] text-gold-deep">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="display-sm mt-2">{pillar.title}</h3>
                <p className="mt-3 text-[0.9375rem] leading-relaxed text-charcoal/70">{pillar.description}</p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </div>
    </section>
  );
}
