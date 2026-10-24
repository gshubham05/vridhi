/**
 * Consent-aware analytics hook.
 *
 * No analytics script is bundled. This helper only pushes events to a
 * `dataLayer` (Google Tag Manager, GA4, etc.) if the owner later adds one AND
 * the visitor has granted analytics consent. Until a consent banner exists,
 * nothing is ever sent.
 *
 * To grant consent from a future banner:
 *   localStorage.setItem("vridhi-consent-analytics", "granted")
 */
const CONSENT_KEY = "vridhi-consent-analytics";
export function trackEvent(event, params = {}) {
  if (typeof window === "undefined") return;
  try {
    if (window.localStorage.getItem(CONSENT_KEY) !== "granted") return;
    window.dataLayer = window.dataLayer ?? [];
    window.dataLayer.push({ event, ...params });
  } catch {
    // Storage can be unavailable (private mode, blocked cookies). Fail silently.
  }
}
