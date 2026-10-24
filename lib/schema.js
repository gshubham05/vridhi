import { absoluteUrl } from "@/lib/seo";
import { hasVerifiedAddress, site } from "@/lib/site";
/**
 * JSON-LD builders. Rules followed throughout:
 *  - only verified, configured values are emitted (no invented details);
 *  - no Review or AggregateRating markup, ever (reviews are shown for
 *    people, and self-serving review markup breaches Google's guidelines);
 *  - every node has a stable @id so nodes can reference each other.
 */
const ctx = "https://schema.org";
export const ids = {
  organization: `${site.url}/#organization`,
  business: `${site.url}/#business`,
  website: `${site.url}/#website`,
};
const sameAs = () => [site.links.instagram, site.links.googleBusiness].filter(Boolean);
export function organizationSchema() {
  return {
    "@context": ctx,
    "@type": "Organization",
    "@id": ids.organization,
    name: site.name,
    url: site.url,
    logo: absoluteUrl("/icon.svg"),
    description: site.description,
    founder: site.founders.map((name) => ({ "@type": "Person", name })),
    ...(sameAs().length ? { sameAs: sameAs() } : {}),
  };
}
export function localBusinessSchema() {
  const { street, locality, region, postalCode, country } = site.address;
  return {
    "@context": ctx,
    "@type": "GeneralContractor",
    "@id": ids.business,
    name: site.name,
    url: site.url,
    image: absoluteUrl("/og"),
    parentOrganization: { "@id": ids.organization },
    ...(site.contact.phoneE164 ? { telephone: site.contact.phoneE164 } : {}),
    ...(site.contact.email ? { email: site.contact.email } : {}),
    // Address is only published once a real street address is configured.
    ...(hasVerifiedAddress
      ? {
          address: {
            "@type": "PostalAddress",
            streetAddress: street,
            addressLocality: locality,
            addressRegion: region,
            ...(postalCode ? { postalCode } : {}),
            addressCountry: country,
          },
        }
      : {}),
    ...(site.serviceAreas.length
      ? { areaServed: site.serviceAreas.map((name) => ({ "@type": "City", name })) }
      : {}),
    ...(sameAs().length ? { sameAs: sameAs() } : {}),
  };
}
export function websiteSchema() {
  return {
    "@context": ctx,
    "@type": "WebSite",
    "@id": ids.website,
    url: site.url,
    name: site.name,
    publisher: { "@id": ids.organization },
  };
}
export function breadcrumbSchema(items) {
  return {
    "@context": ctx,
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}
export function serviceSchema(service) {
  return {
    "@context": ctx,
    "@type": "Service",
    name: service.title,
    description: service.seo.description,
    url: absoluteUrl(`/services/${service.slug}`),
    provider: { "@id": ids.business },
    ...(site.serviceAreas.length
      ? { areaServed: site.serviceAreas.map((name) => ({ "@type": "City", name })) }
      : {}),
  };
}
export function blogPostingSchema(post) {
  return {
    "@context": ctx,
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt ?? post.publishedAt,
    mainEntityOfPage: absoluteUrl(`/blog/${post.slug}`),
    image: absoluteUrl(post.cover.src),
    author: { "@type": "Person", name: post.author.name },
    publisher: { "@id": ids.organization },
  };
}
export function personSchema(leader) {
  return {
    "@context": ctx,
    "@type": "Person",
    name: leader.name,
    jobTitle: leader.role,
    worksFor: { "@id": ids.organization },
    ...(leader.linkedin ? { sameAs: [leader.linkedin] } : {}),
  };
}
export function faqSchema(faqs) {
  return {
    "@context": ctx,
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: { "@type": "Answer", text: faq.a },
    })),
  };
}
