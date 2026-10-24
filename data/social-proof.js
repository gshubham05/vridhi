import { placeholder } from "@/data/images";
/**
 * VERIFIED METRICS
 * Never estimate or round up. A metric with `value: null` is not rendered.
 * Populate only with figures the firm can substantiate.
 */
export const metrics = [
  { key: "projects", label: "Projects Completed", value: null, suffix: "+" },
  { key: "experience", label: "Years of Experience", value: null, suffix: "+" },
  { key: "clients", label: "Clients Served", value: null, suffix: "+" },
  { key: "rating", label: "Customer Rating", value: null, decimals: 1, suffix: "/5" },
];
/**
 * MANUALLY CURATED GOOGLE REVIEW SNAPSHOTS
 * Copy genuine reviews from the verified Google Business Profile, with the
 * reviewer's public display name and the date posted. These are snapshots,
 * NOT live data, and the UI labels them that way. Never edit review text,
 * and never add rating markup to structured data.
 * The entries below are SAMPLE layout content only.
 */
export const reviewSnapshots = [
  {
    id: "sample-review-1",
    status: "published",
    sample: true,
    author: "Sample Reviewer",
    text: "Sample review text for layout preview only. Replace with a genuine review copied from your Google Business Profile.",
    rating: 5,
    date: "2026-09-01",
  },
  {
    id: "sample-review-2",
    status: "published",
    sample: true,
    author: "Sample Reviewer",
    text: "Second sample review, for layout preview only. This is not a real customer's words.",
    rating: 5,
    date: "2026-09-15",
  },
  {
    id: "sample-review-3",
    status: "published",
    sample: true,
    author: "Sample Reviewer",
    text: "Third sample review, for layout preview only. Remove these and add genuine reviews.",
    rating: 5,
    date: "2026-10-02",
  },
];
/**
 * INDEPENDENT TESTIMONIALS
 * Only with the client's written permission (`consent: true`). The name and
 * project details are hidden unless consent is recorded.
 */
export const testimonials = [
  {
    id: "sample-testimonial-1",
    status: "published",
    sample: true,
    quote:
      "Sample testimonial for layout preview only. Replace with a genuine, permission-based client testimonial.",
    name: "Sample Client",
    projectLabel: "Project type",
    consent: true,
  },
];
/**
 * INSTAGRAM GALLERY (manually managed)
 * Link each image to the original post. Live synchronisation needs the
 * official Instagram Graph API plus a backend and credentials, which are not
 * part of this release, so nothing here claims to be automatic.
 */
export const instagramPosts = [
  {
    id: "sample-ig-1",
    status: "published",
    sample: true,
    kind: "photo",
    url: "https://www.instagram.com/",
    image: placeholder("project-residential-cover", "Placeholder for an Instagram project photograph"),
  },
  {
    id: "sample-ig-2",
    status: "published",
    sample: true,
    kind: "photo",
    url: "https://www.instagram.com/",
    image: placeholder("project-interior-cover", "Placeholder for an Instagram interior photograph"),
  },
  {
    id: "sample-ig-3",
    status: "published",
    sample: true,
    kind: "reel",
    url: "https://www.instagram.com/",
    image: placeholder("project-commercial-cover", "Placeholder for an Instagram site-progress reel"),
  },
  {
    id: "sample-ig-4",
    status: "published",
    sample: true,
    kind: "photo",
    url: "https://www.instagram.com/",
    image: placeholder("project-renovation-cover", "Placeholder for an Instagram renovation photograph"),
  },
  {
    id: "sample-ig-5",
    status: "published",
    sample: true,
    kind: "photo",
    url: "https://www.instagram.com/",
    image: placeholder("project-residential-3", "Placeholder for an Instagram project photograph"),
  },
  {
    id: "sample-ig-6",
    status: "published",
    sample: true,
    kind: "photo",
    url: "https://www.instagram.com/",
    image: placeholder("project-commercial-2", "Placeholder for an Instagram project photograph"),
  },
];
/**
 * GOOGLE BUSINESS PROFILE SUMMARY
 * Copy the current rating and total review count from the verified profile and
 * record the date you checked. Leave null until verified: when either value is
 * null the summary is not shown. This is a manual snapshot, not live data.
 */
export const googleSummary = {
  rating: null,
  count: null,
  checkedOn: null,
};
