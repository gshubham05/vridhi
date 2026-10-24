import { EnquiryForm } from "@/components/contact/EnquiryForm";
import { JsonLd } from "@/components/ui/JsonLd";
import { PageHero } from "@/components/ui/PageHero";
import { addressLines, hasVerifiedAddress, site, telHref, whatsappHref } from "@/lib/site";
import { buildMetadata } from "@/lib/seo";
import { localBusinessSchema } from "@/lib/schema";
export const metadata = buildMetadata({
  title: "Contact Vridhi Construction, Dehradun",
  description:
    "Schedule a private consultation with Vridhi Construction in Dehradun for construction, architecture, interior design or renovation.",
  path: "/contact",
  kicker: "Contact",
});
export default function ContactPage() {
  const wa = whatsappHref();
  const { phoneDisplay, email } = site.contact;
  const nothingConfigured = !telHref && !wa && !email && !hasVerifiedAddress;
  return (
    <>
      <JsonLd data={localBusinessSchema()} />
      <PageHero
        eyebrow="Contact"
        title="Begin a conversation"
        lead="Tell us about your project. A member of our team will respond personally."
        crumbs={[{ name: "Contact", path: "/contact" }]}
      />
      <section className="section">
        <div className="container-lux grid gap-16 lg:grid-cols-12 lg:gap-20">
          <div className="lg:col-span-7" id="enquiry">
            <h2 className="display-md">Request a consultation</h2>
            <div className="mt-10">
              <EnquiryForm />
            </div>
          </div>
          <aside className="lg:col-span-5" aria-label="Contact details">
            <h2 className="display-md">Reach us directly</h2>
            <dl className="mt-10 space-y-8 text-[1rem]">
              {telHref && phoneDisplay && (
                <div>
                  <dt className="eyebrow">Phone</dt>
                  <dd className="mt-2">
                    <a href={telHref} className="link-underline hover:text-gold-deep">
                      {phoneDisplay}
                    </a>
                  </dd>
                </div>
              )}
              {wa && (
                <div>
                  <dt className="eyebrow">WhatsApp</dt>
                  <dd className="mt-2">
                    <a
                      href={wa}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="link-underline hover:text-gold-deep"
                    >
                      Message us on WhatsApp
                    </a>
                  </dd>
                </div>
              )}
              {email && (
                <div>
                  <dt className="eyebrow">Email</dt>
                  <dd className="mt-2">
                    <a href={`mailto:${email}`} className="link-underline hover:text-gold-deep">
                      {email}
                    </a>
                  </dd>
                </div>
              )}
              {hasVerifiedAddress && (
                <div>
                  <dt className="eyebrow">Office</dt>
                  <dd className="mt-2">
                    {addressLines().map((l) => (
                      <span key={l} className="block">
                        {l}
                      </span>
                    ))}
                  </dd>
                </div>
              )}
              {site.hours.length > 0 && (
                <div>
                  <dt className="eyebrow">Hours</dt>
                  <dd className="mt-2">
                    {site.hours.map((h) => (
                      <span key={h} className="block">
                        {h}
                      </span>
                    ))}
                  </dd>
                </div>
              )}
              {site.links.googleMaps && (
                <div>
                  <dt className="eyebrow">Directions</dt>
                  <dd className="mt-2">
                    <a
                      href={site.links.googleMaps}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="link-underline hover:text-gold-deep"
                    >
                      Open in Google Maps
                    </a>
                  </dd>
                </div>
              )}
            </dl>
            {nothingConfigured && (
              <p className="mt-6 text-charcoal/75">
                Please use the enquiry form and our team will get back to you.
              </p>
            )}
          </aside>
        </div>
      </section>
    </>
  );
}
