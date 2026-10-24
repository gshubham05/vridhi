import { Reveal } from "@/components/ui/motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SmartImage } from "@/components/ui/SmartImage";
import { getFounderNote, getLeaders } from "@/lib/content";
import { cn } from "@/lib/utils";
const initials = (name) =>
  name
    .split(/\s+/)
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
/**
 * One leadership profile. Only what has been supplied and approved is shown:
 * with just a name and title you get a monogram; a portrait, biography, quote
 * and LinkedIn link appear only once they exist in data/leadership.ts.
 */
function FounderCard({ leader, dark, offset }) {
  return (
    <article className={cn(offset && "lg:mt-24")}>
      <div className="relative aspect-[4/5] overflow-hidden bg-charcoal">
        {leader.portrait ? (
          <SmartImage
            asset={leader.portrait}
            fill
            sizes="(min-width: 1024px) 40vw, 92vw"
            className="object-cover"
          />
        ) : (
          <div
            role="img"
            aria-label={`${leader.name}, ${leader.role}`}
            className="on-dark plan-grid absolute inset-0 flex items-center justify-center"
          >
            <span className="absolute inset-5 border border-gold/50" aria-hidden="true" />
            <span className="font-serif text-[clamp(4rem,10vw,7rem)] tracking-[0.1em] text-ivory">
              {initials(leader.name)}
            </span>
          </div>
        )}
      </div>
      <div className="mt-7">
        <p className="eyebrow">{leader.role}</p>
        <h3 className="display-md mt-3">{leader.name}</h3>
        {leader.bio?.map((paragraph) => (
          <p
            key={paragraph}
            className={cn("mt-5 max-w-lg leading-relaxed", dark ? "text-ivory/75" : "text-charcoal/75")}
          >
            {paragraph}
          </p>
        ))}
        {leader.quote && (
          <blockquote className="mt-6 max-w-lg border-l border-gold pl-5 font-serif text-[1.25rem] italic leading-snug">
            {leader.quote}
          </blockquote>
        )}
        {leader.linkedin && (
          <a
            href={leader.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="link-underline mt-6 inline-block text-[0.875rem] hover:text-gold-deep"
          >
            LinkedIn profile
          </a>
        )}
      </div>
    </article>
  );
}
export function LeadershipSection({ dark = false, headingLevel = "h2" }) {
  const leaders = getLeaders();
  const note = getFounderNote();
  if (leaders.length === 0) return null;
  return (
    <section
      aria-labelledby="leadership-heading"
      className={cn("section", dark ? "on-dark bg-charcoal text-ivory" : "bg-ivory")}
    >
      <div className="container-lux">
        <Reveal>
          <SectionHeading
            as={headingLevel}
            dark={dark}
            eyebrow="Leadership"
            title={<span id="leadership-heading">The people behind Vridhi</span>}
            lead="Vridhi Construction is led by its co-founders."
          />
        </Reveal>

        <div className="mt-16 grid gap-16 sm:grid-cols-2 lg:gap-24">
          {leaders.map((leader, index) => (
            <Reveal key={leader.id} delay={index * 0.12}>
              <FounderCard leader={leader} dark={dark} offset={index % 2 === 1} />
            </Reveal>
          ))}
        </div>

        {note && (
          <Reveal>
            <figure className="mx-auto mt-24 max-w-3xl border-t border-gold/50 pt-10 text-center">
              {note.text.map((paragraph) => (
                <p key={paragraph} className="display-sm mt-4 first:mt-0">
                  {paragraph}
                </p>
              ))}
              {note.signoff && (
                <figcaption className="mt-6 text-[0.75rem] uppercase tracking-[0.2em] text-gold-deep">
                  {note.signoff}
                </figcaption>
              )}
            </figure>
          </Reveal>
        )}
      </div>
    </section>
  );
}
