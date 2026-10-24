"use client";
import Link from "next/link";
import { Phone } from "lucide-react";
import { WhatsAppIcon } from "@/components/ui/icons";
import { trackEvent } from "@/lib/analytics";
import { telHref, whatsappHref } from "@/lib/site";
import { cn } from "@/lib/utils";
/** Real tel:/wa.me links when configured; otherwise the on-site enquiry form. */
const FALLBACK = "/contact#enquiry";
function DockLink({ href, label, event, className, children }) {
  const onClick = () => trackEvent(event, { location: "contact_dock" });
  if (href.startsWith("/")) {
    return (
      <Link href={href} aria-label={label} onClick={onClick} className={className}>
        {children}
      </Link>
    );
  }
  return (
    <a
      href={href}
      aria-label={label}
      onClick={onClick}
      className={className}
      {...(href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {children}
    </a>
  );
}
/**
 * Mobile: a fixed bottom bar with two equal, comfortable touch targets
 * (Call, WhatsApp), safe-area aware. Desktop: one discreet WhatsApp shortcut.
 * The page footer reserves matching space so nothing is ever hidden.
 */
export function ContactDock() {
  const call = telHref ?? FALLBACK;
  const chat = whatsappHref() ?? FALLBACK;
  return (
    <>
      <div
        data-contact-bar
        className="pb-safe fixed inset-x-0 bottom-0 z-40 border-t border-stone bg-ivory shadow-[0_-10px_28px_-16px_rgba(34,37,34,0.28)] lg:hidden"
      >
        <div className="mx-auto grid max-w-xl grid-cols-2 gap-3 px-4 py-3">
          <DockLink
            href={call}
            label="Call Vridhi Construction"
            event="call_click"
            className="flex min-h-[3.25rem] items-center justify-center gap-3 bg-charcoal px-3 text-ivory transition-colors active:bg-charcoal/90"
          >
            <Phone aria-hidden="true" className="size-5 shrink-0" />
            <span className="flex flex-col text-left leading-tight">
              <span className="text-[0.625rem] font-medium uppercase tracking-[0.18em] text-ivory/70">
                Call Now
              </span>
              <span className="text-[0.9375rem] font-medium">Call Our Team</span>
            </span>
          </DockLink>
          <DockLink
            href={chat}
            label="Chat with Vridhi Construction on WhatsApp"
            event="whatsapp_click"
            className="flex min-h-[3.25rem] items-center justify-center gap-3 bg-whatsapp px-3 text-white transition-colors active:bg-whatsapp/90"
          >
            <WhatsAppIcon className="size-5 shrink-0" />
            <span className="flex flex-col text-left leading-tight">
              <span className="text-[0.625rem] font-medium uppercase tracking-[0.18em] text-white/75">
                WhatsApp
              </span>
              <span className="text-[0.9375rem] font-medium">Chat With Us</span>
            </span>
          </DockLink>
        </div>
      </div>

      {whatsappHref() && (
        <a
          href={whatsappHref()}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat with Vridhi Construction on WhatsApp"
          onClick={() => trackEvent("whatsapp_click", { location: "desktop_shortcut" })}
          className={cn(
            "group fixed bottom-6 right-6 z-40 hidden items-center gap-2.5 border border-stone bg-ivory px-4 py-2.5 text-[0.8125rem] font-medium text-charcoal shadow-[0_12px_32px_-16px_rgba(34,37,34,0.4)] transition-colors duration-500 hover:border-whatsapp hover:bg-whatsapp hover:text-white lg:flex",
          )}
        >
          <WhatsAppIcon className="size-4 text-whatsapp transition-colors group-hover:text-white" />
          Chat with us
        </a>
      )}
    </>
  );
}
