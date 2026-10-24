import { ArrowUpRight, Play } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import { InstagramIcon } from "@/components/ui/icons";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/motion";
import { SampleBadge } from "@/components/ui/SampleBadge";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SmartImage } from "@/components/ui/SmartImage";
import { getInstagramPosts } from "@/lib/content";
import { site } from "@/lib/site";
/**
 * A manually managed gallery of selected posts, each linking to the original
 * on Instagram. It does not load Instagram's embed script, and it makes no
 * claim of automatic synchronisation.
 */
export function InstagramSection() {
  const posts = getInstagramPosts();
  const profile = site.links.instagram;
  if (posts.length === 0 && !profile) return null;
  return (
    <section aria-labelledby="instagram-heading" className="section">
      <div className="container-lux">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <Reveal>
            <SectionHeading
              eyebrow="Instagram"
              title={<span id="instagram-heading">From the studio and the site</span>}
              lead="Project photographs, interior transformations and progress from site."
            />
          </Reveal>
          {profile && (
            <Reveal delay={0.1}>
              <ButtonLink href={profile} variant="outline">
                <span className="inline-flex items-center gap-2">
                  <InstagramIcon className="size-4" />
                  Follow Us on Instagram
                </span>
              </ButtonLink>
            </Reveal>
          )}
        </div>

        {site.links.instagramHandle && (
          <p className="mt-6 text-[0.9375rem] text-charcoal/70">
            {profile ? (
              <a
                href={profile}
                target="_blank"
                rel="noopener noreferrer"
                className="link-underline hover:text-gold-deep"
              >
                {site.links.instagramHandle.startsWith("@")
                  ? site.links.instagramHandle
                  : `@${site.links.instagramHandle}`}
              </a>
            ) : (
              site.links.instagramHandle
            )}
          </p>
        )}

        {posts.length > 0 && (
          <Stagger className="mt-12 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6">
            {posts.slice(0, 6).map((post) => (
              <StaggerItem key={post.id}>
                <a
                  href={post.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${post.kind === "reel" ? "Watch reel" : "View post"} on Instagram: ${post.image.alt}`}
                  className="group relative block aspect-square overflow-hidden bg-stone"
                >
                  <SmartImage
                    asset={post.image}
                    fill
                    sizes="(min-width: 1024px) 16vw, (min-width: 768px) 32vw, 48vw"
                    className="object-cover transition-transform duration-[1400ms] ease-[var(--ease-lux)] group-hover:scale-[1.06]"
                  />
                  <span
                    aria-hidden="true"
                    className="absolute inset-0 flex items-center justify-center bg-charcoal/0 text-ivory opacity-0 transition-[background-color,opacity] duration-500 group-hover:bg-charcoal/40 group-hover:opacity-100"
                  >
                    <ArrowUpRight className="size-6" />
                  </span>
                  {post.kind === "reel" && (
                    <span
                      aria-hidden="true"
                      className="absolute right-2 top-2 flex size-7 items-center justify-center bg-charcoal/80 text-ivory"
                    >
                      <Play className="size-3.5" fill="currentColor" />
                    </span>
                  )}
                  {post.sample && <SampleBadge className="absolute bottom-0 left-0" />}
                </a>
              </StaggerItem>
            ))}
          </Stagger>
        )}
      </div>
    </section>
  );
}
