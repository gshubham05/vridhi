import { ButtonLink } from "@/components/ui/Button";
import { PageHero } from "@/components/ui/PageHero";
export const metadata = {
  title: "Page not found",
  robots: { index: false, follow: false },
};
export default function NotFound() {
  return (
    <PageHero
      eyebrow="Error 404"
      title="This page could not be found."
      lead="The address may have changed, or the page may no longer exist. Let us take you somewhere useful."
    >
      <ButtonLink href="/" variant="gold">
        Return home
      </ButtonLink>
      <ButtonLink href="/projects" variant="outline-light">
        View the portfolio
      </ButtonLink>
    </PageHero>
  );
}
