import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { SmartImage } from "@/components/ui/SmartImage";
/** Image-led card. The title link is stretched over the card so the whole card is clickable. */
export function ServiceCard({ service, index }) {
  return (
    <article className="group relative">
      <div className="relative aspect-[4/5] overflow-hidden bg-stone">
        <SmartImage
          asset={service.image}
          fill
          sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 92vw"
          className="object-cover transition-transform duration-[1400ms] ease-[var(--ease-lux)] group-hover:scale-[1.05]"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-charcoal/0 transition-colors duration-700 group-hover:bg-charcoal/15"
        />
        <span className="absolute left-5 top-5 font-serif text-[1.25rem] text-charcoal/80">
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>
      <div className="mt-6">
        <p className="eyebrow">{service.eyebrow}</p>
        <h3 className="display-sm mt-3">
          <Link href={`/services/${service.slug}`} className="after:absolute after:inset-0">
            {service.title}
          </Link>
        </h3>
        <p className="mt-3 max-w-sm text-[0.9375rem] leading-relaxed text-charcoal/70">{service.summary}</p>
        <span className="mt-5 inline-flex items-center gap-2 text-[0.8125rem] font-medium uppercase tracking-[0.14em] text-charcoal">
          <span className="relative pb-1 after:absolute after:bottom-0 after:left-0 after:h-px after:w-full after:origin-left after:scale-x-[0.35] after:bg-gold after:transition-transform after:duration-700 after:ease-[var(--ease-lux)] group-hover:after:scale-x-100">
            Explore Service
          </span>
          <ArrowUpRight
            aria-hidden="true"
            className="size-4 transition-transform duration-500 ease-[var(--ease-lux)] group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
          />
        </span>
      </div>
    </article>
  );
}
