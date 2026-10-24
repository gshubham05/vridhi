/** Minimal class-name joiner (avoids a dependency). */
export function cn(...parts) {
  return parts.filter(Boolean).join(" ");
}
/**
 * Deterministic date formatting. Inputs are ISO strings from content data,
 * never "now", so this is safe in prerendered output.
 */
export function formatDate(iso) {
  return new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${iso}T00:00:00Z`));
}
export function readingMinutes(post) {
  const words = post.body
    .map((block) => ("text" in block ? block.text : block.items.join(" ")))
    .join(" ")
    .split(/\s+/)
    .filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}
export const categoryLabels = {
  residential: "Residential",
  commercial: "Commercial",
  "interior-design": "Interior Design",
  renovation: "Renovation",
};
