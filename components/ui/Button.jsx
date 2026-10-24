import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
const base =
  "group inline-flex items-center justify-center gap-3 text-[0.8125rem] font-medium uppercase tracking-[0.14em] transition-[background-color,color,border-color,transform] duration-500 ease-[var(--ease-lux)] active:scale-[0.985]";
const variants = {
  primary: "min-h-12 bg-charcoal px-7 text-ivory hover:bg-gold hover:text-charcoal",
  gold: "min-h-12 bg-gold px-7 text-charcoal hover:bg-ivory",
  outline:
    "min-h-12 border border-charcoal/40 px-7 text-charcoal hover:border-charcoal hover:bg-charcoal hover:text-ivory",
  "outline-light":
    "min-h-12 border border-ivory/50 px-7 text-ivory hover:border-ivory hover:bg-ivory hover:text-charcoal",
  link: "min-h-11 px-0 normal-case tracking-normal text-[0.9375rem] text-charcoal hover:text-gold-deep",
};
/**
 * One link-styled-as-button for the whole site. Internal paths use next/link
 * (prefetching, client navigation); tel:, mailto: and https: use a plain anchor.
 */
export function ButtonLink({ href, variant = "primary", arrow = true, className, children, ...rest }) {
  const classes = cn(base, variants[variant], className);
  const content = (
    <>
      <span>{children}</span>
      {arrow && (
        <ArrowRight
          aria-hidden="true"
          className="size-4 shrink-0 transition-transform duration-500 ease-[var(--ease-lux)] group-hover:translate-x-1"
        />
      )}
    </>
  );
  if (href.startsWith("/") || href.startsWith("#")) {
    return (
      <Link href={href} className={classes} {...rest}>
        {content}
      </Link>
    );
  }
  const external = href.startsWith("http");
  return (
    <a
      href={href}
      className={classes}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      {...rest}
    >
      {content}
    </a>
  );
}
