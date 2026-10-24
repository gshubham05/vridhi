import { CountUp } from "@/components/ui/motion";
import { getMetrics } from "@/lib/content";
/**
 * Verified figures only. A metric with no verified value is filtered out by
 * getMetrics(), and if none remain the whole band disappears.
 */
export function MetricsBand() {
  const metrics = getMetrics();
  if (metrics.length === 0) return null;
  return (
    <section aria-label="The firm in numbers" className="border-b border-stone bg-paper">
      <dl className="container-lux grid grid-cols-2 gap-x-6 gap-y-10 py-14 lg:flex lg:justify-between lg:py-16">
        {metrics.map((metric) => (
          <div
            key={metric.key}
            className="lg:flex-1 lg:border-l lg:border-stone lg:pl-8 lg:first:border-l-0 lg:first:pl-0"
          >
            <dd className="display-md text-charcoal">
              <CountUp
                value={metric.value}
                decimals={metric.decimals}
                prefix={metric.prefix}
                suffix={metric.suffix}
              />
            </dd>
            <dt className="mt-2 text-[0.6875rem] font-medium uppercase tracking-[0.2em] text-olive-deep">
              {metric.label}
            </dt>
          </div>
        ))}
      </dl>
    </section>
  );
}
