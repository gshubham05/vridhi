import Link from "next/link";
import { SampleBadge } from "@/components/ui/SampleBadge";
import { SmartImage } from "@/components/ui/SmartImage";
import { formatDate, readingMinutes } from "@/lib/utils";
export function PostCard({ post }) {
  return (
    <article className="group relative flex h-full flex-col">
      <div className="relative aspect-[3/2] overflow-hidden bg-stone">
        <SmartImage
          asset={post.cover}
          fill
          sizes="(min-width: 1024px) 30vw, (min-width: 640px) 46vw, 92vw"
          className="object-cover transition-transform duration-[1400ms] ease-[var(--ease-lux)] group-hover:scale-[1.05]"
        />
        {post.sample && <SampleBadge className="absolute right-4 top-4" label="Sample draft" />}
      </div>
      <div className="mt-6 flex flex-1 flex-col">
        <p className="flex flex-wrap items-center gap-x-3 text-[0.6875rem] font-medium uppercase tracking-[0.2em] text-olive-deep">
          <span>{post.category}</span>
          <span aria-hidden="true" className="h-px w-3 bg-gold" />
          <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
          <span aria-hidden="true" className="h-px w-3 bg-gold" />
          <span>{readingMinutes(post)} min read</span>
        </p>
        <h3 className="display-sm mt-3">
          <Link href={`/blog/${post.slug}`} className="after:absolute after:inset-0">
            {post.title}
          </Link>
        </h3>
        <p className="mt-3 flex-1 text-[0.9375rem] leading-relaxed text-charcoal/70">{post.excerpt}</p>
        <span className="mt-5 inline-flex items-center text-[0.8125rem] font-medium uppercase tracking-[0.14em]">
          <span className="relative pb-1 after:absolute after:bottom-0 after:left-0 after:h-px after:w-full after:origin-left after:scale-x-[0.35] after:bg-gold after:transition-transform after:duration-700 after:ease-[var(--ease-lux)] group-hover:after:scale-x-100">
            Read Article
          </span>
        </span>
      </div>
    </article>
  );
}
