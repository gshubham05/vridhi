import { ClosingCta } from "@/components/home/ClosingCta";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/motion";
import { getProcessSteps } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";
export const metadata = buildMetadata({
  title: "Our Process: From Consultation to Handover",
  description:
    "How Vridhi Construction takes a project from first consultation through design, approvals, construction and handover, in six clear stages.",
  path: "/process",
  kicker: "Process",
});
export default function ProcessPage() {
  const steps = getProcessSteps();
  return (
    <>
      <PageHero
        eyebrow="Our Process"
        title="Six stages. No surprises."
        lead="A structured path that keeps you informed, and in control of the decisions that matter."
        crumbs={[{ name: "Process", path: "/process" }]}
      />
      <section className="section">
        <div className="container-lux">
          <ol className="divide-y divide-stone border-y border-stone">
            {steps.map((step, i) => (
              <li key={step.title}>
                <Reveal>
                  <div className="grid gap-6 py-12 lg:grid-cols-12 lg:gap-12">
                    <span
                      aria-hidden="true"
                      className="font-serif text-[3rem] leading-none text-gold-deep lg:col-span-2"
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div className="lg:col-span-4">
                      <h2 className="display-md">{step.title}</h2>
                      <p className="mt-3 text-charcoal/70">{step.summary}</p>
                    </div>
                    <p className="leading-relaxed text-charcoal/80 lg:col-span-6">{step.detail}</p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </section>
      <ClosingCta />
    </>
  );
}
