# Vridhi Construction: Website

Marketing website for Vridhi Construction (architecture, construction, interior design, renovation and turnkey delivery, Dehradun). Built with Next.js 16 (App Router, Cache Components), Tailwind CSS v4, Motion, Lucide, React Hook Form and Zod.

## Run it

```bash
npm install
cp .env.example .env.local   # then fill in verified details
npm run dev                  # http://localhost:3000
npm run build && npm start   # production build
```

## Honest content by design

Nothing on the site is invented. Until real details exist:

- Metrics, ratings and review counts are `null` and are **not rendered**.
- Contact details come only from environment variables. Missing values hide the related UI (the mobile call/WhatsApp bar falls back to the enquiry form).
- Placeholder images are clearly synthetic SVGs in `public/images/placeholders/`.
- Sample projects, articles, reviews, testimonials and Instagram items carry `sample: true`. They show only when `SHOW_SAMPLE_CONTENT=true` (set in `.env.local` for development), are labelled "Sample", are `noindex`, and are excluded from the sitemap. **Leave this unset in production.**
- No `Review` / `AggregateRating` structured data is emitted.

## Where content lives

All content is plain JavaScript data in `data/` and read through `lib/content.js`:

| What | File |
| --- | --- |
| Services (copy, FAQs, SEO) | `data/services.js` |
| Projects | `data/projects.js` |
| Journal articles | `data/posts.js` |
| Process steps and "Why Vridhi" pillars | `data/process.js` |
| Co-founders (portraits, bios, quotes when approved) | `data/leadership.js` |
| Metrics, Google review snapshots, testimonials, Instagram | `data/social-proof.js` |

To publish an item, add it with `status: "published"` and no `sample` flag, then rebuild and redeploy. There is **no admin panel yet**: the content layer is deliberately isolated so a headless CMS can replace `lib/content.js` without touching pages.

Google reviews and Instagram posts are manually curated snapshots with links to the originals, not live feeds.

## Enquiry form

`POST /api/enquiry` validates with the same Zod schema as the browser, rejects cross-origin posts, applies a best-effort per-instance rate limit and a honeypot, then delivers via **Resend** (`RESEND_API_KEY`, `ENQUIRY_TO_EMAIL`, `ENQUIRY_FROM_EMAIL`) or a **webhook** (`ENQUIRY_WEBHOOK_URL`). With neither configured it returns 503 and the form tells the visitor plainly. It never shows false success.

## Known limitations

- With Cache Components, an unknown dynamic slug (for example `/services/nope`) renders the not-found page with HTTP 200 and `noindex`, rather than a true 404 status.
- The in-memory rate limiter is per server instance; add an edge or WAF limit for real abuse protection.
- Privacy Policy and Terms are drafts describing current behaviour and need legal review.

See `PLACEHOLDERS.md` for the owner's launch checklist.
