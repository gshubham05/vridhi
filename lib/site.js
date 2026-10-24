/**
 * Central, typed site configuration.
 *
 * Verified business details are read from environment variables so they can be
 * set at deploy time without a code change (see .env.example). Nothing here is
 * invented: anything not configured is `undefined`, and the UI degrades
 * gracefully (a missing phone number falls back to the contact page instead of
 * a broken `tel:` link, a missing address is simply not shown).
 *
 * NOTE: `process.env.NEXT_PUBLIC_*` must be referenced literally so Next.js can
 * inline the values into client bundles. Do not refactor these into a loop.
 * Only public, non-secret values belong here. Private credentials (email API
 * keys, webhook URLs) are read server-side in lib/enquiry-delivery.ts.
 */
const clean = (value) => {
  const trimmed = value?.trim();
  return trimmed ? trimmed : undefined;
};
const list = (value, separator) =>
  (clean(value) ?? "")
    .split(separator)
    .map((item) => item.trim())
    .filter(Boolean);
const rawPhone = clean(process.env.NEXT_PUBLIC_PHONE_E164);
const rawWhatsapp = clean(process.env.NEXT_PUBLIC_WHATSAPP_NUMBER)?.replace(/\D/g, "");
/** E.164 with leading +, e.g. +919876543210 */
const phoneE164 = rawPhone && /^\+\d{10,15}$/.test(rawPhone) ? rawPhone : undefined;
/** International format digits only, no + (as required by wa.me), e.g. 919876543210 */
const whatsapp = rawWhatsapp && /^\d{10,15}$/.test(rawWhatsapp) ? rawWhatsapp : undefined;
const primaryCity = clean(process.env.NEXT_PUBLIC_PRIMARY_CITY) ?? "Dehradun";
const region = clean(process.env.NEXT_PUBLIC_REGION) ?? "Uttarakhand";
export const site = {
  name: "Vridhi Construction",
  url: (clean(process.env.NEXT_PUBLIC_SITE_URL) ?? "http://localhost:3000").replace(/\/$/, ""),
  locale: "en_IN",
  tagline: "Spaces That Inspire. Structures That Last.",
  description:
    "Vridhi Construction brings architecture, construction, interior design, renovation and turnkey delivery together, so your home or workplace is shaped by one considered team.",
  /** Primary local market. Confirm against the firm's real operating locations. */
  primaryCity,
  region,
  /** Only cities with genuine service coverage. Empty until confirmed. */
  serviceAreas: list(process.env.NEXT_PUBLIC_SERVICE_AREAS, ","),
  contact: {
    phoneE164,
    phoneDisplay: clean(process.env.NEXT_PUBLIC_PHONE_DISPLAY) ?? phoneE164,
    whatsapp,
    email: clean(process.env.NEXT_PUBLIC_EMAIL),
  },
  address: {
    street: clean(process.env.NEXT_PUBLIC_ADDRESS_STREET),
    locality: primaryCity,
    region,
    postalCode: clean(process.env.NEXT_PUBLIC_ADDRESS_POSTAL),
    country: "IN",
  },
  /** One line per entry, e.g. "Monday to Saturday, 10:00 – 18:00". */
  hours: list(process.env.NEXT_PUBLIC_BUSINESS_HOURS, ";"),
  links: {
    googleBusiness: clean(process.env.NEXT_PUBLIC_GOOGLE_BUSINESS_URL),
    googleReviews: clean(process.env.NEXT_PUBLIC_GOOGLE_REVIEWS_URL),
    googleMaps: clean(process.env.NEXT_PUBLIC_GOOGLE_MAPS_URL),
    instagram: clean(process.env.NEXT_PUBLIC_INSTAGRAM_URL),
    instagramHandle: clean(process.env.NEXT_PUBLIC_INSTAGRAM_HANDLE),
  },
  /** Founders as supplied by the client. Titles and bios live in data/leadership.ts. */
  founders: ["Abhinav Nautiyal", "Sanjay Kothari"],
};
export const defaultWhatsappMessage =
  "Hello Vridhi Construction, I would like to discuss my construction or interior design project. Please contact me.";
/** `tel:` link, or undefined when no verified number is configured. */
export const telHref = site.contact.phoneE164 ? `tel:${site.contact.phoneE164}` : undefined;
export function whatsappHref(message = defaultWhatsappMessage) {
  if (!site.contact.whatsapp) return undefined;
  return `https://wa.me/${site.contact.whatsapp}?text=${encodeURIComponent(message)}`;
}
/** Postal address as display lines (only verified parts). */
export function addressLines() {
  const { street, locality, region: state, postalCode } = site.address;
  const cityLine = [locality, state, postalCode].filter(Boolean).join(", ");
  return [street, cityLine].filter(Boolean);
}
/** True only when a real street address has been configured. */
export const hasVerifiedAddress = Boolean(site.address.street);
