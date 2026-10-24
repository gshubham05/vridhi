import Link from "next/link";
import { JsonLd } from "@/components/ui/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";
/** Visible breadcrumb trail plus matching BreadcrumbList structured data. */
export function Breadcrumbs({ items }) {
  const trail = [{ name: "Home", path: "/" }, ...items];
  return (
    <>
      <nav aria-label="Breadcrumb">
        <ol className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[0.8125rem] text-ivory/70">
          {trail.map((crumb, index) => {
            const last = index === trail.length - 1;
            return (
              <li key={crumb.path} className="flex items-center gap-3">
                {last ? (
                  <span aria-current="page" className="text-ivory">
                    {crumb.name}
                  </span>
                ) : (
                  <Link href={crumb.path} className="link-underline hover:text-ivory">
                    {crumb.name}
                  </Link>
                )}
                {!last && <span aria-hidden="true" className="h-px w-3 bg-gold" />}
              </li>
            );
          })}
        </ol>
      </nav>
      <JsonLd data={breadcrumbSchema(trail)} />
    </>
  );
}
