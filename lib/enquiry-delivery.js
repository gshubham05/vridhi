const esc = (value) =>
  value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const rows = (data) => [
  ["Name", data.name],
  ["Phone", data.phone],
  ["Email", data.email || "Not provided"],
  ["Project type", data.projectType],
  ["Location", data.location],
  ["Budget", data.budget || "Not provided"],
  ["Start", data.startTimeframe || "Not provided"],
  ["Enquiry about", data.projectRef || "General enquiry"],
  ["Message", data.message],
];
async function viaResend(data) {
  const key = process.env.RESEND_API_KEY;
  const to = process.env.ENQUIRY_TO_EMAIL;
  const from = process.env.ENQUIRY_FROM_EMAIL;
  if (!key || !to || !from) return null;
  const html = `<table cellpadding="8" style="font-family:sans-serif;font-size:14px">${rows(data)
    .map(([k, v]) => `<tr><td><strong>${esc(k)}</strong></td><td>${esc(v).replace(/\n/g, "<br>")}</td></tr>`)
    .join("")}</table>`;
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from,
        to: to.split(",").map((s) => s.trim()),
        subject: `New website enquiry: ${data.projectType}`,
        reply_to: data.email || undefined,
        html,
      }),
      signal: AbortSignal.timeout(10_000),
    });
    return res.ok ? { ok: true } : { ok: false, reason: "failed" };
  } catch {
    return { ok: false, reason: "failed" };
  }
}
async function viaWebhook(data) {
  const url = process.env.ENQUIRY_WEBHOOK_URL;
  if (!url) return null;
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ source: "vridhi-website", ...data, website: undefined }),
      signal: AbortSignal.timeout(10_000),
    });
    return res.ok ? { ok: true } : { ok: false, reason: "failed" };
  } catch {
    return { ok: false, reason: "failed" };
  }
}
/** Resend first, then webhook. Never reports success unless a provider accepted it. */
export async function deliverEnquiry(data) {
  const attempts = [viaResend, viaWebhook];
  let configured = false;
  for (const attempt of attempts) {
    const result = await attempt(data);
    if (result === null) continue;
    configured = true;
    if (result.ok) return result;
  }
  return { ok: false, reason: configured ? "failed" : "not_configured" };
}
