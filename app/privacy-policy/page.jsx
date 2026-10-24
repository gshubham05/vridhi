import { PageHero } from "@/components/ui/PageHero";
import { buildMetadata } from "@/lib/seo";
import { site } from "@/lib/site";
export const metadata = buildMetadata({
  title: "Privacy Policy",
  description:
    "How Vridhi Construction collects, uses and protects information submitted through this website.",
  path: "/privacy-policy",
});
export default function PrivacyPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Privacy Policy"
        crumbs={[{ name: "Privacy Policy", path: "/privacy-policy" }]}
      />
      <section className="section">
        <div className="container-lux max-w-3xl">
          <div className="prose-lux">
            <p>
              <strong>Draft for legal review.</strong> This policy describes what this website actually does
              today. It should be reviewed by a qualified professional before launch.
            </p>
            <h2>Information we collect</h2>
            <p>
              We collect only what you choose to send us through the enquiry form: your name, phone number,
              email address (optional), project type, project location, budget and planned start (optional),
              and your message. If you reach us by phone or WhatsApp, we receive the details you share in that
              conversation.
            </p>
            <h2>How we use it</h2>
            <p>
              We use this information to respond to your enquiry and to discuss your project. We do not sell
              your information.
            </p>
            <h2>How enquiries are delivered</h2>
            <p>
              Submitted enquiries are sent to our team by email or a connected business tool, through service
              providers that process the message on our behalf. We do not store enquiries in a database on
              this website.
            </p>
            <h2>Cookies and analytics</h2>
            <p>
              This website does not set advertising cookies and does not load analytics scripts. If analytics
              are added in future, they will run only with your consent and this policy will be updated.
            </p>
            <h2>Third-party links</h2>
            <p>
              Links to WhatsApp, Instagram, Google Maps and Google reviews lead to services with their own
              privacy policies.
            </p>
            <h2>Retention and your rights</h2>
            <p>
              We keep enquiry details only as long as needed to handle your enquiry and any resulting work.
              You may ask us to access, correct or delete the information you have sent.
            </p>
            <h2>Contact</h2>
            <p>
              {site.contact.email ? (
                <>
                  Write to us at <a href={`mailto:${site.contact.email}`}>{site.contact.email}</a>.
                </>
              ) : (
                <>
                  Use the <a href="/contact">contact page</a> to reach us about this policy.
                </>
              )}
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
