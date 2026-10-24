import { getPosts, getProjects, getServices, isIndexable } from "@/lib/content";
import { absoluteUrl } from "@/lib/seo";
// Static dates only: new Date() is not allowed during prerender.
const STATIC_LASTMOD = "2026-10-01";
export default function sitemap() {
  const fixed = [
    "/",
    "/about",
    "/services",
    "/projects",
    "/process",
    "/blog",
    "/contact",
    "/privacy-policy",
    "/terms-and-conditions",
  ];
  return [
    ...fixed.map((p) => ({
      url: absoluteUrl(p),
      lastModified: STATIC_LASTMOD,
      priority: p === "/" ? 1 : 0.7,
    })),
    ...getServices()
      .filter(isIndexable)
      .map((s) => ({ url: absoluteUrl(`/services/${s.slug}`), lastModified: STATIC_LASTMOD, priority: 0.8 })),
    ...getProjects()
      .filter(isIndexable)
      .map((p) => ({ url: absoluteUrl(`/projects/${p.slug}`), lastModified: STATIC_LASTMOD, priority: 0.6 })),
    ...getPosts()
      .filter(isIndexable)
      .map((p) => ({
        url: absoluteUrl(`/blog/${p.slug}`),
        lastModified: p.updatedAt ?? p.publishedAt,
        priority: 0.6,
      })),
  ];
}
