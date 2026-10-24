import { PageHero } from "@/components/ui/PageHero";
import { buildMetadata } from "@/lib/seo";
export const metadata = buildMetadata({
  title: "Terms and Conditions",
  description: "Terms governing the use of the Vridhi Construction website.",
  path: "/terms-and-conditions",
});
export default function TermsPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Terms and Conditions"
        crumbs={[{ name: "Terms and Conditions", path: "/terms-and-conditions" }]}
      />
      <section className="section">
        <div className="container-lux max-w-3xl">
          <div className="prose-lux">
            <p>
              <strong>Draft for legal review.</strong> These terms apply to use of this website only. They
              should be reviewed by a qualified professional before launch.
            </p>
            <h2>Use of this website</h2>
            <p>
              The content here is provided for general information about Vridhi Construction and its services.
              It is not a quotation, offer or contract.
            </p>
            <h2>Projects and engagements</h2>
            <p>
              Any construction, design or renovation work is governed by a separate written agreement between
              you and Vridhi Construction, covering scope, timelines and payment.
            </p>
            <h2>Images and content</h2>
            <p>
              Text, design and images on this website belong to Vridhi Construction or its licensors and may
              not be reproduced without permission. Some images may be illustrative.
            </p>
            <h2>Accuracy</h2>
            <p>
              We take care to keep information accurate but do not guarantee that it is complete or current.
            </p>
            <h2>Third-party links</h2>
            <p>We are not responsible for the content of external websites linked from this site.</p>
            <h2>Changes</h2>
            <p>
              We may update these terms from time to time. Continued use of the website means you accept the
              current version.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
