import { ButtonLink } from "@/components/ui/Button";
import { SmartImage } from "@/components/ui/SmartImage";
import { placeholder } from "@/data/images";
const heroImage = placeholder(
  "hero",
  "Architectural elevation of a contemporary two-storey residence with warm glazing at dusk",
);
const delay = (seconds) => ({ "--d": `${seconds}s` });
export function Hero() {
  return (
    <section className="on-dark relative isolate flex min-h-[100svh] items-end overflow-hidden bg-charcoal text-ivory">
      <div className="hero-settle absolute inset-0 -z-20">
        {/* The LCP element: prioritised, never lazy-loaded, no opacity animation. */}
        <SmartImage
          asset={heroImage}
          fill
          priority
          sizes="100vw"
          className="object-cover object-[72%_center] lg:object-center"
        />
      </div>
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-r from-charcoal/90 via-charcoal/55 to-charcoal/10"
      />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 -z-10 h-1/2 bg-gradient-to-t from-charcoal/80 to-transparent"
      />

      <div className="container-lux pb-[calc(var(--bar-h)+3.5rem)] pt-40 lg:pb-28">
        <p className="eyebrow hero-rise">Architecture · Construction · Interiors</p>
        <h1 className="display-xl hero-rise mt-7 max-w-4xl" style={delay(0.12)}>
          Spaces That Inspire.
          <span className="block italic text-gold">Structures That Last.</span>
        </h1>
        <p className="lead hero-rise mt-8 max-w-xl text-ivory/80" style={delay(0.26)}>
          From considered architecture and refined interiors to complete turnkey delivery, we shape homes and
          workplaces built for the way you live.
        </p>
        <div className="hero-rise mt-10 flex flex-col gap-4 sm:flex-row" style={delay(0.4)}>
          <ButtonLink href="/contact#enquiry" variant="gold">
            Request a Private Consultation
          </ButtonLink>
          <ButtonLink href="/projects" variant="outline-light">
            View the Portfolio
          </ButtonLink>
        </div>
        <p
          className="hero-rise mt-12 max-w-2xl border-t border-ivory/15 pt-5 text-[0.6875rem] font-medium uppercase tracking-[0.22em] text-ivory/65"
          style={delay(0.55)}
        >
          Residential <span className="mx-2 text-gold">|</span> Commercial{" "}
          <span className="mx-2 text-gold">|</span> Interior Design <span className="mx-2 text-gold">|</span>{" "}
          Turnkey Solutions
        </p>
      </div>

      <div
        aria-hidden="true"
        className="absolute bottom-10 right-[clamp(1.25rem,4vw,3.5rem)] hidden flex-col items-center gap-3 text-[0.625rem] uppercase tracking-[0.3em] text-ivory/60 lg:flex"
      >
        <span className="[writing-mode:vertical-rl]">Scroll</span>
        <span className="h-14 w-px bg-gradient-to-b from-gold to-transparent" />
      </div>
    </section>
  );
}
