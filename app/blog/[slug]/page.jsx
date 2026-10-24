import { notFound } from "next/navigation";
import { PostCard } from "@/components/blog/PostCard";
import { ClosingCta } from "@/components/home/ClosingCta";
import { JsonLd } from "@/components/ui/JsonLd";
import { PageHero } from "@/components/ui/PageHero";
import { SampleBadge } from "@/components/ui/SampleBadge";
import { PLACEHOLDER_SLUG, getPost, getPosts, getRelatedPosts, isIndexable, slugParams } from "@/lib/content";
import { blogPostingSchema } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";
import { formatDate, readingMinutes } from "@/lib/utils";
export function generateStaticParams() {
  return slugParams(getPosts().map((p) => p.slug));
}
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return buildMetadata({
    title: post.seo?.title ?? post.title,
    description: post.seo?.description ?? post.excerpt,
    path: `/blog/${post.slug}`,
    kicker: post.category,
    type: "article",
    publishedTime: post.publishedAt,
    modifiedTime: post.updatedAt ?? post.publishedAt,
    noindex: !isIndexable(post),
  });
}
export default async function PostPage({ params }) {
  const { slug } = await params;
  if (slug === PLACEHOLDER_SLUG) notFound();
  const post = getPost(slug);
  if (!post) notFound();
  const related = getRelatedPosts(post);
  return (
    <>
      <JsonLd data={blogPostingSchema(post)} />
      <PageHero
        eyebrow={post.category}
        title={post.title}
        lead={post.excerpt}
        crumbs={[
          { name: "Journal", path: "/blog" },
          { name: post.title, path: `/blog/${post.slug}` },
        ]}
      >
        <p className="text-[0.875rem] text-ivory/70">
          {post.author.name} · <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time> ·{" "}
          {readingMinutes(post)} min read
        </p>
        {post.sample && <SampleBadge label="Sample draft, not published content" />}
      </PageHero>

      <article className="section">
        <div className="container-lux max-w-3xl">
          <div className="prose-lux">
            {post.body.map((block, i) => {
              switch (block.type) {
                case "h2":
                  return <h2 key={i}>{block.text}</h2>;
                case "h3":
                  return <h3 key={i}>{block.text}</h3>;
                case "p":
                  return <p key={i}>{block.text}</p>;
                case "ul":
                  return (
                    <ul key={i}>
                      {block.items.map((t) => (
                        <li key={t}>{t}</li>
                      ))}
                    </ul>
                  );
                case "ol":
                  return (
                    <ol key={i}>
                      {block.items.map((t) => (
                        <li key={t}>{t}</li>
                      ))}
                    </ol>
                  );
              }
            })}
          </div>
        </div>
      </article>

      {related.length > 0 && (
        <section className="section bg-paper" aria-labelledby="more-posts">
          <div className="container-lux">
            <h2 id="more-posts" className="display-md">
              Continue reading
            </h2>
            <ul className="mt-12 grid gap-x-8 gap-y-14 md:grid-cols-3">
              {related.map((p) => (
                <li key={p.slug}>
                  <PostCard post={p} />
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}
      <ClosingCta />
    </>
  );
}
