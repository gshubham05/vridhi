import { Star } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/motion";
import { SampleBadge } from "@/components/ui/SampleBadge";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getGoogleSummary, getReviews } from "@/lib/content";
import { site } from "@/lib/site";
import { formatDate } from "@/lib/utils";
function Stars({ rating }) {
  return (
    <span role="img" aria-label={`${rating} out of 5 stars`} className="flex gap-0.5 text-gold">
      {Array.from({ length: 5 }, (_, i) => (
        <Star key={i} aria-hidden="true" className="size-4" fill={i < rating ? "currentColor" : "none"} />
      ))}
    </span>
  );
}
/**
 * Google review snapshots. These are manually curated, genuine reviews with
 * attribution, shown as a dated snapshot, never as live data, and never
 * marked up with review or rating structured data.
 */
export function ReviewsSection() {
  const reviews = getReviews();
  const summary = getGoogleSummary();
  const profileUrl = site.links.googleReviews ?? site.links.googleBusiness;
  if (reviews.length === 0 && !summary && !profileUrl) return null;
  const [lead, ...rest] = reviews;
  return (
    <section aria-labelledby="reviews-heading" className="section bg-paper">
      <div className="container-lux">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-20">
          <Reveal className="lg:col-span-4">
            <SectionHeading
              eyebrow="Google Reviews"
              title={<span id="reviews-heading">In our clients’ words</span>}
              lead="A curated selection of reviews from our Google Business Profile."
            />
            {summary && (
              <div className="mt-10 border-t border-stone pt-8">
                <p className="display-lg">{summary.rating.toFixed(1)}</p>
                <div className="mt-2">
                  <Stars rating={Math.round(summary.rating)} />
                </div>
                <p className="mt-3 text-[0.875rem] text-charcoal/70">
                  Based on {summary.count.toLocaleString("en-IN")} Google reviews
                  {summary.checkedOn ? `, as of ${formatDate(summary.checkedOn)}` : ""}.
                </p>
              </div>
            )}
            {profileUrl && (
              <div className="mt-10">
                <ButtonLink href={profileUrl} variant="outline">
                  Read All Google Reviews
                </ButtonLink>
              </div>
            )}
          </Reveal>

          {lead && (
            <div className="lg:col-span-8">
              <Reveal>
                <figure className="relative border border-stone p-8 sm:p-12">
                  {lead.sample && (
                    <SampleBadge className="absolute right-0 top-0" label="Sample, not a real review" />
                  )}
                  {lead.rating && <Stars rating={lead.rating} />}
                  <blockquote className="display-sm mt-6 !leading-[1.35]">{lead.text}</blockquote>
                  <figcaption className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-1 text-[0.875rem] text-charcoal/70">
                    <span className="font-medium text-charcoal">{lead.author}</span>
                    <span aria-hidden="true" className="h-px w-4 bg-gold" />
                    <time dateTime={lead.date}>{formatDate(lead.date)}</time>
                    <span aria-hidden="true" className="h-px w-4 bg-gold" />
                    <span>Google review</span>
                  </figcaption>
                </figure>
              </Reveal>

              {rest.length > 0 && (
                <ul className="mt-6 grid gap-6 sm:grid-cols-2">
                  {rest.map((review, index) => (
                    <li key={review.id}>
                      <Reveal delay={index * 0.1} className="h-full">
                        <figure className="relative h-full border border-stone p-7">
                          {review.sample && (
                            <SampleBadge
                              className="absolute right-0 top-0"
                              label="Sample, not a real review"
                            />
                          )}
                          {review.rating && <Stars rating={review.rating} />}
                          <blockquote className="mt-4 leading-relaxed text-charcoal/80">
                            {review.text}
                          </blockquote>
                          <figcaption className="mt-5 text-[0.8125rem] text-charcoal/70">
                            <span className="font-medium text-charcoal">{review.author}</span>
                            {" · "}
                            <time dateTime={review.date}>{formatDate(review.date)}</time>
                            {" · Google review"}
                          </figcaption>
                        </figure>
                      </Reveal>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
