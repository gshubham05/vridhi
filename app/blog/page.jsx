import { PostCard } from "@/components/blog/PostCard";
import { ClosingCta } from "@/components/home/ClosingCta";
import { PageHero } from "@/components/ui/PageHero";
import { getPosts } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";
export const metadata = buildMetadata({
  title: "The Journal: Building, Design & Renovation Guidance",
  description:
    "Practical articles on planning, designing, building and renovating a home or workplace, from Vridhi Construction in Dehradun.",
  path: "/blog",
  kicker: "Journal",
});
export default function BlogPage() {
  const posts = getPosts();
  return (
    <>
      <PageHero
        eyebrow="The Journal"
        title="Considered thinking on building well"
        lead="Practical guidance on planning, designing and building a home or workplace."
        crumbs={[{ name: "Journal", path: "/blog" }]}
      />
      <section className="section">
        <div className="container-lux">
          {posts.length > 0 ? (
            <ul className="grid gap-x-8 gap-y-16 md:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <li key={post.slug}>
                  <PostCard post={post} />
                </li>
              ))}
            </ul>
          ) : (
            <p className="mx-auto max-w-xl text-center text-charcoal/75">
              Our first articles are being prepared. Please check back soon.
            </p>
          )}
        </div>
      </section>
      <ClosingCta />
    </>
  );
}
