import localFont from "next/font/local";
import { ContactDock } from "@/components/layout/ContactDock";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { MotionProvider } from "@/components/ui/motion";
import { getServices } from "@/lib/content";
import { site } from "@/lib/site";
import "./globals.css";
// Self-hosted (no request to Google at build or run time), preloaded and swap-displayed.
const dmSans = localFont({
  src: [
    { path: "./fonts/dm-sans-latin-400-normal.woff2", weight: "400", style: "normal" },
    { path: "./fonts/dm-sans-latin-500-normal.woff2", weight: "500", style: "normal" },
    { path: "./fonts/dm-sans-latin-600-normal.woff2", weight: "600", style: "normal" },
  ],
  variable: "--font-dm-sans",
  display: "swap",
});
const dmSerif = localFont({
  src: [
    { path: "./fonts/dm-serif-display-latin-400-normal.woff2", weight: "400", style: "normal" },
    { path: "./fonts/dm-serif-display-latin-400-italic.woff2", weight: "400", style: "italic" },
  ],
  variable: "--font-dm-serif",
  display: "swap",
});
export const metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name}: Architecture, Construction, Interiors`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: site.locale,
    siteName: site.name,
    images: [{ url: "/og", width: 1200, height: 630, alt: site.name }],
  },
  twitter: { card: "summary_large_image", images: ["/og"] },
};
export const viewport = {
  themeColor: "#f7f5f0",
  width: "device-width",
  initialScale: 1,
  // Required for env(safe-area-inset-*) so the mobile contact bar clears the home indicator.
  viewportFit: "cover",
};
export default function RootLayout({ children }) {
  const navServices = getServices().map(({ slug, title }) => ({ slug, title }));
  return (
    <html lang="en-IN" className={`${dmSans.variable} ${dmSerif.variable}`}>
      <body>
        <noscript>
          {/* Without JavaScript, scroll-reveal content must still be visible. */}
          <style>{`[data-reveal]{opacity:1!important;transform:none!important}`}</style>
        </noscript>
        <a
          href="#main"
          className="sr-only z-[100] bg-gold px-5 py-3 text-sm font-medium text-charcoal focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
        >
          Skip to main content
        </a>
        <MotionProvider>
          <SiteHeader services={navServices} />
          <main id="main">{children}</main>
          <SiteFooter />
          <ContactDock />
        </MotionProvider>
      </body>
    </html>
  );
}
