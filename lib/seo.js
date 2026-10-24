import { site } from "@/lib/site";
export function absoluteUrl(path = "/") {
  return `${site.url}${path.startsWith("/") ? path : `/${path}`}`;
}
/** Branded social card, rendered by app/og/route.tsx. */
export function ogImageUrl(title, kicker) {
  const params = new URLSearchParams();
  if (title) params.set("title", title.slice(0, 110));
  if (kicker) params.set("kicker", kicker.slice(0, 40));
  const query = params.toString();
  return `/og${query ? `?${query}` : ""}`;
}
/**
 * One place to build page metadata so every indexable page gets a unique
 * title, description, canonical URL, Open Graph and Twitter card.
 */
export function buildMetadata({
  title,
  description,
  path,
  image,
  kicker,
  type = "website",
  noindex,
  publishedTime,
  modifiedTime,
}) {
  const imageUrl = image ?? ogImageUrl(title, kicker);
  const fullTitle = `${title} | ${site.name}`;
  return {
    title,
    description,
    alternates: { canonical: path },
    robots: noindex ? { index: false, follow: false } : undefined,
    openGraph: {
      type,
      locale: site.locale,
      siteName: site.name,
      title: fullTitle,
      description,
      url: path,
      images: [{ url: imageUrl, width: 1200, height: 630, alt: title }],
      ...(type === "article" ? { publishedTime, modifiedTime } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [imageUrl],
    },
  };
}
