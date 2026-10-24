import { LeadershipSection } from "@/components/about/LeadershipSection";
import { ClosingCta } from "@/components/home/ClosingCta";
import { FeaturedProjects } from "@/components/home/FeaturedProjects";
import { Hero } from "@/components/home/Hero";
import { InstagramSection } from "@/components/home/InstagramSection";
import { JournalSection } from "@/components/home/JournalSection";
import { MetricsBand } from "@/components/home/MetricsBand";
import { ProcessSection } from "@/components/home/ProcessSection";
import { ServicesSection } from "@/components/home/ServicesSection";
import { WhySection } from "@/components/home/WhySection";
import { ReviewsSection } from "@/components/reviews/ReviewsSection";
import { TestimonialsSection } from "@/components/reviews/TestimonialsSection";
import { JsonLd } from "@/components/ui/JsonLd";
import { localBusinessSchema, organizationSchema, websiteSchema } from "@/lib/schema";
export const metadata = {
  title: { absolute: "Vridhi Construction | Construction Company in Dehradun" },
  description:
    "Vridhi Construction is a Dehradun construction, architecture and interior firm delivering residential and commercial projects, from design to handover.",
  alternates: { canonical: "/" },
};
export default function HomePage() {
  return (
    <>
      <JsonLd data={[organizationSchema(), localBusinessSchema(), websiteSchema()]} />
      <Hero />
      <MetricsBand />
      <ServicesSection />
      <FeaturedProjects />
      <ProcessSection />
      <LeadershipSection />
      <WhySection />
      <ReviewsSection />
      <TestimonialsSection />
      <InstagramSection />
      <JournalSection />
      <ClosingCta />
    </>
  );
}
