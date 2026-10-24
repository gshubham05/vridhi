import { PostCard } from "@/components/blog/PostCard";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getPosts } from "@/lib/content";
export function JournalSection() {
  const posts = getPosts().slice(0, 3);
  if (posts.length === 0) return null;
  return (
    <section aria-labelledby="journal-heading" className="section bg-paper">
      <div className="container-lux">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <Reveal>
            <SectionHeading
              eyebrow="The Journal"
              title={<span id="journal-heading">Considered thinking on building well</span>}
              lead="Practical guidance on planning, designing and building a home or workplace."
            />
          </Reveal>
          <Reveal delay={0.1}>
            <ButtonLink href="/blog" variant="link">
              Read the Journal
            </ButtonLink>
          </Reveal>
        </div>
        <Stagger className="mt-14 grid gap-x-8 gap-y-14 md:grid-cols-3">
          {posts.map((post) => (
            <StaggerItem key={post.slug}>
              <PostCard post={post} />
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
