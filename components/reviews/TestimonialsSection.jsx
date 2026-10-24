import { Quote } from "lucide-react";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/motion";
import { SampleBadge } from "@/components/ui/SampleBadge";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getTestimonials } from "@/lib/content";
/**
 * Independently collected, permission-based client testimonials. Deliberately
 * styled apart from Google reviews (dark panel, own heading and label) so the
 * two are never confused. Items without recorded consent never reach here.
 */
export function TestimonialsSection() {
  const testimonials = getTestimonials();
  if (testimonials.length === 0) return null;
  return (
    <section aria-labelledby="testimonials-heading" className="section on-dark bg-charcoal text-ivory">
      <div className="container-lux">
        <Reveal>
          <SectionHeading
            dark
            eyebrow="Client Testimonials"
            title={<span id="testimonials-heading">Shared with permission</span>}
            lead="Words from clients who agreed to be quoted, collected directly by our team."
          />
        </Reveal>
        <Stagger className="mt-14 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial) => (
            <StaggerItem key={testimonial.id}>
              <figure className="relative h-full border border-ivory/15 p-8">
                {testimonial.sample && (
                  <SampleBadge className="absolute right-0 top-0" label="Sample, not a real testimonial" />
                )}
                <Quote aria-hidden="true" className="size-8 text-gold" />
                <blockquote className="mt-6 font-serif text-[1.375rem] leading-snug">
                  {testimonial.quote}
                </blockquote>
                <figcaption className="mt-8 text-[0.875rem] text-ivory/70">
                  <span className="font-medium text-ivory">{testimonial.name}</span>
                  {testimonial.projectLabel && <span>{`, ${testimonial.projectLabel}`}</span>}
                </figcaption>
              </figure>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
