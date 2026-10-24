import Link from "next/link";
import { cacheLife } from "next/cache";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { InstagramIcon, WhatsAppIcon } from "@/components/ui/icons";
import { getFeaturedProjects, getPosts, getServices } from "@/lib/content";
import { legalNav, primaryNav } from "@/lib/navigation";
import { addressLines, site, telHref, whatsappHref } from "@/lib/site";
/** Cached so the current year is resolved once, not on every prerender. */
async function CopyrightYear() {
  "use cache";
  cacheLife("days");
  return <>{new Date().getFullYear()}</>;
}
const heading = "text-[0.6875rem] font-medium uppercase tracking-[0.24em] text-gold";
const linkClass = "link-underline text-[0.9375rem] text-ivory/75 hover:text-ivory";
export function SiteFooter() {
  const services = getServices();
  const projects = getFeaturedProjects(4);
  const posts = getPosts().slice(0, 3);
  const address = addressLines();
  const whatsapp = whatsappHref();
  const nav = primaryNav.filter((item) => !item.hasServices && item.href !== "/");
  return (
    <footer className="on-dark relative bg-charcoal pb-[calc(var(--bar-h)+env(safe-area-inset-bottom))] text-ivory lg:pb-0">
      <div aria-hidden="true" className="rule-gold" />
      <div className="container-lux pt-20 lg:pt-24">
        <div className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Link href="/" aria-label={`${site.name}, home`}>
              <Logo />
            </Link>
            <p className="mt-8 max-w-sm text-[0.9375rem] leading-relaxed text-ivory/70">
              Architecture, construction, interiors, renovation and turnkey delivery, composed with care and
              executed with discipline.
            </p>
            <p className="mt-6 text-[0.8125rem] text-ivory/60">
              Founded by {site.founders[0]} and {site.founders[1]}.
            </p>
            <div className="mt-8 flex items-center gap-3">
              {site.links.instagram && (
                <a
                  href={site.links.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Vridhi Construction on Instagram"
                  className="flex size-11 items-center justify-center border border-ivory/20 transition-colors hover:border-gold hover:text-gold"
                >
                  <InstagramIcon className="size-5" />
                </a>
              )}
              {whatsapp && (
                <a
                  href={whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Chat with Vridhi Construction on WhatsApp"
                  className="flex size-11 items-center justify-center border border-ivory/20 transition-colors hover:border-gold hover:text-gold"
                >
                  <WhatsAppIcon className="size-5" />
                </a>
              )}
              {site.links.googleBusiness && (
                <a
                  href={site.links.googleBusiness}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex min-h-11 items-center border border-ivory/20 px-4 text-[0.8125rem] transition-colors hover:border-gold hover:text-gold"
                >
                  Google Business Profile
                </a>
              )}
            </div>
          </div>

          <div className="grid gap-12 sm:grid-cols-2 lg:col-span-8 lg:grid-cols-3">
            <nav aria-label="Services">
              <h2 className={heading}>Services</h2>
              <ul className="mt-6 space-y-3">
                {services.map((service) => (
                  <li key={service.slug}>
                    <Link href={`/services/${service.slug}`} className={linkClass}>
                      {service.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <nav aria-label="Company">
              <h2 className={heading}>The Firm</h2>
              <ul className="mt-6 space-y-3">
                <li>
                  <Link href="/" className={linkClass}>
                    Home
                  </Link>
                </li>
                {nav.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className={linkClass}>
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
              {(projects.length > 0 || posts.length > 0) && (
                <ul className="mt-8 space-y-3 border-t border-ivory/10 pt-6">
                  {projects.map((project) => (
                    <li key={project.slug}>
                      <Link href={`/projects/${project.slug}`} className={linkClass}>
                        {project.name}
                      </Link>
                    </li>
                  ))}
                  {posts.map((post) => (
                    <li key={post.slug}>
                      <Link href={`/blog/${post.slug}`} className={linkClass}>
                        {post.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </nav>

            <div>
              <h2 className={heading}>Contact</h2>
              <ul className="mt-6 space-y-4 text-[0.9375rem] text-ivory/75">
                {address.length > 0 && (
                  <li className="flex gap-3">
                    <MapPin aria-hidden="true" className="mt-1 size-4 shrink-0 text-gold" />
                    <address className="not-italic">
                      {address.map((line) => (
                        <span key={line} className="block">
                          {line}
                        </span>
                      ))}
                      {site.links.googleMaps && (
                        <a
                          href={site.links.googleMaps}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="link-underline mt-1 inline-block text-ivory"
                        >
                          Open in Google Maps
                        </a>
                      )}
                    </address>
                  </li>
                )}
                {site.hours.length > 0 && (
                  <li className="flex gap-3">
                    <Clock aria-hidden="true" className="mt-1 size-4 shrink-0 text-gold" />
                    <span>
                      {site.hours.map((line) => (
                        <span key={line} className="block">
                          {line}
                        </span>
                      ))}
                    </span>
                  </li>
                )}
                {telHref && (
                  <li className="flex gap-3">
                    <Phone aria-hidden="true" className="mt-1 size-4 shrink-0 text-gold" />
                    <a href={telHref} className="link-underline hover:text-ivory">
                      {site.contact.phoneDisplay}
                    </a>
                  </li>
                )}
                {site.contact.email && (
                  <li className="flex gap-3">
                    <Mail aria-hidden="true" className="mt-1 size-4 shrink-0 text-gold" />
                    <a
                      href={`mailto:${site.contact.email}`}
                      className="link-underline break-all hover:text-ivory"
                    >
                      {site.contact.email}
                    </a>
                  </li>
                )}
                <li>
                  <Link
                    href="/contact#enquiry"
                    className="inline-flex min-h-11 items-center border border-gold px-5 text-[0.75rem] font-medium uppercase tracking-[0.14em] text-gold transition-colors hover:bg-gold hover:text-charcoal"
                  >
                    Private consultation
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-ivory/10 py-8 text-[0.8125rem] text-ivory/60 sm:flex-row sm:items-center sm:justify-between">
          <p>
            &copy; <CopyrightYear /> {site.name}. All rights reserved.
          </p>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {legalNav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="link-underline hover:text-ivory">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
