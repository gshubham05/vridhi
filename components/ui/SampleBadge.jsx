import { cn } from "@/lib/utils";
/** Labels illustrative layout content so it can never be mistaken for real work. */
export function SampleBadge({ className, label = "Sample" }) {
  return (
    <span
      className={cn(
        "inline-flex items-center bg-gold px-2.5 py-1 text-[0.625rem] font-semibold uppercase tracking-[0.18em] text-charcoal",
        className,
      )}
    >
      {label}
    </span>
  );
}
