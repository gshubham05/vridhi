import { leadership, founderNote } from "@/data/leadership";
import { pillars, processSteps } from "@/data/process";
import { posts } from "@/data/posts";
import { projects } from "@/data/projects";
import { services } from "@/data/services";
import { googleSummary, instagramPosts, metrics, reviewSnapshots, testimonials } from "@/data/social-proof";
/**
 * THE content layer. Every page reads content through these functions only.
 *
 * Today the data lives in typed files under /data. To move to a headless CMS
 * or database later, re-implement these functions (keeping the same return
 * types) and nothing else in the app has to change.
 *
 * Visibility rules:
 *  - only `status: "published"` items are public;
 *  - `sample: true` items are layout placeholders. They are hidden unless
 *    SHOW_SAMPLE_CONTENT=true, and even then they are noindexed and kept out
 *    of the sitemap (see `isIndexable`).
 */
export const showSampleContent = process.env.SHOW_SAMPLE_CONTENT === "true";
const isVisible = (item) => item.status === "published" && (!item.sample || showSampleContent);
/** Real, published content only: eligible for the sitemap and indexing. */
export const isIndexable = (item) => item.status === "published" && !item.sample;
/**
 * With Cache Components, a dynamic route must prerender at least one param.
 * When a collection is still empty (a new site with no published projects or
 * articles) we return an inert placeholder param. The page then calls
 * notFound() for it, so no real URL is created.
 */
export const PLACEHOLDER_SLUG = "__none__";
export const slugParams = (slugs) => (slugs.length ? slugs : [PLACEHOLDER_SLUG]).map((slug) => ({ slug }));
/* Services ---------------------------------------------------------- */
export const getServices = () => services.filter((s) => s.enabled && isVisible(s));
export const getService = (slug) => getServices().find((s) => s.slug === slug);
/* Projects ---------------------------------------------------------- */
export const getProjects = (category) =>
  projects
    .filter(isVisible)
    .filter((p) => !category || p.category === category)
    .sort(
      (a, b) => Number(Boolean(b.featured)) - Number(Boolean(a.featured)) || (b.year ?? 0) - (a.year ?? 0),
    );
export const getFeaturedProjects = (limit = 6) => {
  const all = getProjects();
  const featured = all.filter((p) => p.featured);
  return (featured.length ? featured : all).slice(0, limit);
};
export const getProject = (slug) => getProjects().find((p) => p.slug === slug);
export const getRelatedProjects = (project, limit = 3) => {
  const others = getProjects().filter((p) => p.slug !== project.slug);
  const same = others.filter((p) => p.category === project.category);
  const rest = others.filter((p) => p.category !== project.category);
  return [...same, ...rest].slice(0, limit);
};
/* Journal ----------------------------------------------------------- */
export const getPosts = () =>
  posts.filter(isVisible).sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
export const getPost = (slug) => getPosts().find((p) => p.slug === slug);
export const getRelatedPosts = (post, limit = 3) => {
  const others = getPosts().filter((p) => p.slug !== post.slug);
  const shared = (p) => p.tags.filter((t) => post.tags.includes(t)).length;
  return others.sort((a, b) => shared(b) - shared(a)).slice(0, limit);
};
/* Social proof ------------------------------------------------------ */
/** Metrics without a verified value are never rendered. */
export const getMetrics = () => metrics.filter((m) => m.value !== null);
export const getReviews = () => reviewSnapshots.filter(isVisible);
/** Only returned when both the rating and review count have been verified. */
export const getGoogleSummary = () =>
  googleSummary.rating !== null && googleSummary.count !== null
    ? { rating: googleSummary.rating, count: googleSummary.count, checkedOn: googleSummary.checkedOn }
    : undefined;
/** Testimonials without recorded consent are never rendered. */
export const getTestimonials = () => testimonials.filter((t) => isVisible(t) && t.consent);
export const getInstagramPosts = () => instagramPosts.filter(isVisible);
/* People & process --------------------------------------------------- */
export const getLeaders = () => leadership;
export const getFounderNote = () => founderNote;
export const getProcessSteps = () => processSteps;
export const getPillars = () => pillars;
