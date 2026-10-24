"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { ChevronDown, Menu, Phone, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Logo } from "@/components/ui/Logo";
import { trackEvent } from "@/lib/analytics";
import { primaryNav } from "@/lib/navigation";
import { site, telHref } from "@/lib/site";
import { cn } from "@/lib/utils";
const underline =
  "relative after:absolute after:-bottom-1.5 after:left-0 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-gold after:transition-transform after:duration-500 after:ease-[var(--ease-lux)] hover:after:scale-x-100 focus-visible:after:scale-x-100";
export function SiteHeader({ services }) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  // Open state is keyed to the pathname it was opened on, so navigating away
  // closes the menu and dropdown without any effect-driven state resets.
  const [menuPath, setMenuPath] = useState(null);
  const [servicesPath, setServicesPath] = useState(null);
  const menuOpen = menuPath === pathname;
  const servicesOpen = servicesPath === pathname;
  const menuButton = useRef(null);
  const closeButton = useRef(null);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  // Lock page scroll, close on Escape and manage focus while the mobile menu is open.
  useEffect(() => {
    if (!menuOpen) return;
    const trigger = menuButton.current;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButton.current?.focus();
    const onKey = (event) => {
      if (event.key === "Escape") setMenuPath(null);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKey);
      trigger?.focus();
    };
  }, [menuOpen]);
  const solid = scrolled || servicesOpen;
  const isActive = (href) => (href === "/" ? pathname === "/" : pathname.startsWith(href));
  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 h-[var(--header-h)] transition-[background-color,color,border-color] duration-500 ease-[var(--ease-lux)]",
          solid
            ? "border-b border-stone bg-ivory text-charcoal"
            : "on-dark border-b border-transparent bg-transparent text-ivory",
        )}
      >
        <div className="container-lux flex h-full items-center justify-between gap-6">
          <Link href="/" aria-label={`${site.name}, home`} className="shrink-0">
            <Logo />
          </Link>

          <nav aria-label="Primary" className="hidden lg:block">
            <ul className="flex items-center gap-6 text-[0.875rem] xl:gap-8">
              {primaryNav.map((item) =>
                item.hasServices ? (
                  <li
                    key={item.href}
                    className="relative"
                    onMouseEnter={() => setServicesPath(pathname)}
                    onMouseLeave={() => setServicesPath(null)}
                    onBlur={(event) => {
                      if (!event.currentTarget.contains(event.relatedTarget)) setServicesPath(null);
                    }}
                    onKeyDown={(event) => {
                      if (event.key === "Escape") setServicesPath(null);
                    }}
                  >
                    <div className="flex items-center gap-1">
                      <Link
                        href={item.href}
                        aria-current={isActive(item.href) ? "page" : undefined}
                        className={cn(underline, isActive(item.href) && "after:scale-x-100")}
                      >
                        {item.label}
                      </Link>
                      <button
                        type="button"
                        aria-expanded={servicesOpen}
                        aria-controls="services-menu"
                        aria-label="Show service pages"
                        onClick={() => setServicesPath(servicesOpen ? null : pathname)}
                        className="-mr-1 p-1"
                      >
                        <ChevronDown
                          aria-hidden="true"
                          className={cn(
                            "size-4 transition-transform duration-300",
                            servicesOpen && "rotate-180",
                          )}
                        />
                      </button>
                    </div>
                    <AnimatePresence>
                      {servicesOpen && (
                        <motion.div
                          id="services-menu"
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 6 }}
                          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                          className="absolute left-1/2 top-full w-80 -translate-x-1/2 pt-4"
                        >
                          <ul className="border border-stone bg-ivory p-3 text-charcoal shadow-[0_24px_48px_-24px_rgba(34,37,34,0.35)]">
                            {services.map((service) => (
                              <li key={service.slug}>
                                <Link
                                  href={`/services/${service.slug}`}
                                  className="flex items-center justify-between px-4 py-3 text-[0.9375rem] transition-colors hover:bg-stone/60"
                                >
                                  {service.title}
                                  <span aria-hidden="true" className="h-px w-4 bg-gold" />
                                </Link>
                              </li>
                            ))}
                            <li className="mt-1 border-t border-stone pt-1">
                              <Link
                                href="/services"
                                className="block px-4 py-3 text-[0.8125rem] font-medium uppercase tracking-[0.14em] text-gold-deep hover:bg-stone/60"
                              >
                                All services
                              </Link>
                            </li>
                          </ul>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </li>
                ) : (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={isActive(item.href) ? "page" : undefined}
                      className={cn(underline, isActive(item.href) && "after:scale-x-100")}
                    >
                      {item.label}
                    </Link>
                  </li>
                ),
              )}
            </ul>
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href="/contact#enquiry"
              className={cn(
                "hidden min-h-11 items-center bg-gold px-5 text-[0.75rem] font-medium uppercase tracking-[0.14em] text-charcoal transition-colors duration-500 hover:bg-charcoal hover:text-ivory lg:inline-flex",
                solid && "hover:bg-charcoal",
              )}
            >
              <span className="xl:hidden">Consultation</span>
              <span className="hidden xl:inline">Request a Private Consultation</span>
            </Link>
            <button
              ref={menuButton}
              type="button"
              aria-label="Open menu"
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              onClick={() => setMenuPath(pathname)}
              className="-mr-2 flex size-11 items-center justify-center lg:hidden"
            >
              <Menu aria-hidden="true" className="size-6" />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="on-dark fixed inset-0 z-[70] flex flex-col overflow-y-auto bg-charcoal text-ivory lg:hidden"
          >
            <div className="plan-grid pointer-events-none absolute inset-0 opacity-50" aria-hidden="true" />
            <div className="container-lux relative flex h-[var(--header-h)] shrink-0 items-center justify-between">
              <Link href="/" onClick={() => setMenuPath(null)} aria-label={`${site.name}, home`}>
                <Logo />
              </Link>
              <button
                ref={closeButton}
                type="button"
                aria-label="Close menu"
                onClick={() => setMenuPath(null)}
                className="-mr-2 flex size-11 items-center justify-center"
              >
                <X aria-hidden="true" className="size-6" />
              </button>
            </div>

            <nav aria-label="Mobile" className="container-lux relative flex-1 pb-8 pt-6">
              <ul>
                {primaryNav.map((item, index) => (
                  <motion.li
                    key={item.href}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.08 + index * 0.05, ease: [0.22, 1, 0.36, 1] }}
                    className="border-b border-ivory/10"
                  >
                    <Link
                      href={item.href}
                      onClick={() => setMenuPath(null)}
                      aria-current={isActive(item.href) ? "page" : undefined}
                      className={cn(
                        "flex min-h-14 items-center justify-between font-serif text-[1.75rem]",
                        isActive(item.href) && "text-gold",
                      )}
                    >
                      {item.label}
                      <span aria-hidden="true" className="h-px w-6 bg-gold" />
                    </Link>
                    {item.hasServices && (
                      <ul className="pb-4 pl-1">
                        {services.map((service) => (
                          <li key={service.slug}>
                            <Link
                              href={`/services/${service.slug}`}
                              onClick={() => setMenuPath(null)}
                              className="flex min-h-11 items-center text-[0.9375rem] text-ivory/70 hover:text-ivory"
                            >
                              {service.title}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </motion.li>
                ))}
              </ul>
            </nav>

            <div className="container-lux relative space-y-3 pb-[calc(2rem+env(safe-area-inset-bottom))]">
              <Link
                href="/contact#enquiry"
                onClick={() => setMenuPath(null)}
                className="flex min-h-14 items-center justify-center bg-gold text-[0.8125rem] font-medium uppercase tracking-[0.14em] text-charcoal"
              >
                Request a Private Consultation
              </Link>
              {telHref && (
                <a
                  href={telHref}
                  onClick={() => trackEvent("call_click", { location: "mobile_menu" })}
                  className="flex min-h-12 items-center justify-center gap-3 border border-ivory/30 text-[0.9375rem]"
                >
                  <Phone aria-hidden="true" className="size-4" />
                  {site.contact.phoneDisplay}
                </a>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
