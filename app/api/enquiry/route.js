import { NextResponse } from "next/server";
import { deliverEnquiry } from "@/lib/enquiry-delivery";
import { enquirySchema } from "@/lib/validations";
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const MAX_BODY = 16 * 1024;
/** Best-effort, per-instance limiter. Use an edge/WAF limit for real abuse protection. */
const hits = new Map();
function limited(ip) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) for (const [k, v] of hits) if (!v.some((t) => now - t < WINDOW_MS)) hits.delete(k);
  return recent.length > MAX_PER_WINDOW;
}
export async function POST(request) {
  // Same-origin only (browsers send Origin on POST).
  const origin = request.headers.get("origin");
  if (origin && new URL(origin).host !== request.headers.get("host")) {
    return NextResponse.json({ ok: false, error: "forbidden" }, { status: 403 });
  }
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (limited(ip)) {
    return NextResponse.json({ ok: false, error: "rate_limited" }, { status: 429 });
  }
  const raw = await request.text();
  if (raw.length > MAX_BODY) {
    return NextResponse.json({ ok: false, error: "too_large" }, { status: 413 });
  }
  let json;
  try {
    json = JSON.parse(raw);
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }
  // Honeypot: pretend success so bots learn nothing, deliver nothing.
  if (typeof json === "object" && json && "website" in json && json.website) {
    return NextResponse.json({ ok: true });
  }
  const parsed = enquirySchema.safeParse(json);
  if (!parsed.success) {
    const fields = {};
    for (const issue of parsed.error.issues) {
      const key = String(issue.path[0] ?? "form");
      fields[key] ??= issue.message;
    }
    return NextResponse.json({ ok: false, error: "validation", fields }, { status: 422 });
  }
  const result = await deliverEnquiry(parsed.data);
  if (!result.ok) {
    console.error(`[enquiry] delivery ${result.reason}`);
    return NextResponse.json(
      { ok: false, error: result.reason },
      { status: result.reason === "not_configured" ? 503 : 502 },
    );
  }
  return NextResponse.json({ ok: true });
}
