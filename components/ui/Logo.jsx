import { cn } from "@/lib/utils";
/**
 * Typographic wordmark with a drafting-style monogram. A stand-in until the
 * firm supplies its official logo; replace this component's markup (or swap
 * in an <Image>) and every instance on the site updates.
 */
export function LogoMark({ className }) {
  return (
    <svg viewBox="0 0 40 40" fill="none" aria-hidden="true" className={cn("size-9 shrink-0", className)}>
      <rect x="1" y="1" width="38" height="38" stroke="currentColor" strokeWidth="1.25" />
      <path d="M10.5 11 20 29.5 29.5 11" stroke="currentColor" strokeWidth="1.6" strokeLinecap="square" />
      <path d="M13.5 34h13" stroke="#b18a4a" strokeWidth="1.6" />
    </svg>
  );
}
export function Logo({ className }) {
  return (
    <span className={cn("inline-flex items-center gap-3", className)}>
      <LogoMark />
      <span className="flex flex-col leading-none">
        <span className="font-serif text-[1.25rem] tracking-[0.32em]">VRIDHI</span>
        <span className="mt-1.5 text-[0.5625rem] font-medium tracking-[0.5em]">CONSTRUCTION</span>
      </span>
    </span>
  );
}
