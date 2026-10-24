import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { SmartImage } from "@/components/ui/SmartImage";
/**
 * Shared dark opening for every inner page. Because every page opens dark,
 * the site header can always start transparent with light text.
 */
export function PageHero({ eyebrow, title, lead, crumbs, image, children }) {
  return (
    <section className="on-dark relative isolate overflow-hidden bg-charcoal text-ivory">
      {image ? (
        <>
          <SmartImage asset={image} fill priority sizes="100vw" className="-z-20 object-cover" />
          <div
            aria-hidden="true"
            className="absolute inset-0 -z-10 bg-gradient-to-t from-charcoal via-charcoal/70 to-charcoal/50"
          />
        </>
      ) : (
        <div aria-hidden="true" className="plan-grid absolute inset-0 -z-10 opacity-70" />
      )}
      <div className="container-lux pb-16 pt-[calc(var(--header-h)+3.5rem)] lg:pb-24 lg:pt-[calc(var(--header-h)+5.5rem)]">
        {crumbs && <Breadcrumbs items={crumbs} />}
        <p className="eyebrow mt-8">{eyebrow}</p>
        <h1 className="display-lg mt-5 max-w-4xl">{title}</h1>
        {lead && <p className="lead mt-6 max-w-2xl text-ivory/75">{lead}</p>}
        {children && <div className="mt-10 flex flex-wrap items-center gap-4">{children}</div>}
      </div>
      <div aria-hidden="true" className="rule-gold absolute inset-x-0 bottom-0" />
    </section>
  );
}
