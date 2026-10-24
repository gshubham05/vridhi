import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/motion";
import { SmartImage } from "@/components/ui/SmartImage";
import { placeholder } from "@/data/images";
import { telHref } from "@/lib/site";
const image = placeholder("cta", "Architectural elevation of a residence glowing at dusk");
export function ClosingCta() {
  return (
    <section
      aria-labelledby="cta-heading"
      className="on-dark relative isolate overflow-hidden bg-charcoal text-ivory"
    >
      <SmartImage asset={image} fill sizes="100vw" className="-z-20 object-cover object-[70%_center]" />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-r from-charcoal via-charcoal/75 to-charcoal/20"
      />
      <div className="container-lux py-28 lg:py-40">
        <Reveal>
          <p className="eyebrow">Begin a Conversation</p>
          <h2 id="cta-heading" className="display-xl mt-6 max-w-3xl">
            Let’s build something <span className="italic text-gold">remarkable.</span>
          </h2>
          <p className="lead mt-8 max-w-xl text-ivory/80">
            Tell us about your plot, your home or your workplace. We will listen first, then show you what is
            possible.
          </p>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <ButtonLink href="/contact#enquiry" variant="gold">
              Schedule a Private Consultation
            </ButtonLink>
            <ButtonLink href={telHref ?? "/contact#enquiry"} variant="outline-light">
              Call Our Team
            </ButtonLink>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
