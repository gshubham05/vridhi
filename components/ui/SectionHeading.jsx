import { cn } from "@/lib/utils";
export function SectionHeading({ eyebrow, title, lead, align = "left", dark, as: Tag = "h2", className }) {
  return (
    <div
      className={cn(align === "center" && "mx-auto text-center", dark && "on-dark", "max-w-3xl", className)}
    >
      <p className={cn("eyebrow", align === "center" && "justify-center")}>{eyebrow}</p>
      <Tag className="display-lg mt-5">{title}</Tag>
      {lead && <p className={cn("lead mt-6", dark ? "text-ivory/75" : "text-charcoal/75")}>{lead}</p>}
    </div>
  );
}
