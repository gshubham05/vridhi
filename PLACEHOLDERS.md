# Owner checklist before launch

Replace or confirm each item. Nothing below has been invented; it is simply missing.

**Contact and identity**
- [ ] Verified phone (`NEXT_PUBLIC_PHONE_E164`), WhatsApp number, email, display phone
- [ ] Registered office address, postal code, business hours
- [ ] Production site URL (`NEXT_PUBLIC_SITE_URL`): canonicals, sitemap and OG depend on it
- [ ] Official logo (current mark in `components/ui/Logo.jsx` and `app/icon.svg` is a stand-in)
- [ ] Service areas beyond Dehradun, if any (`NEXT_PUBLIC_SERVICE_AREAS`)

**Google and social**
- [ ] Google Business Profile, Reviews and Maps URLs
- [ ] Instagram URL and handle
- [ ] Genuine Google review snapshots (with date and author), and the verified rating and review count if you want them shown

**People**
- [ ] Portraits and approved bios for Abhinav Nautiyal and Sanjay Kothari, titles confirmed
- [ ] Optional founder note
- [ ] Confirm whether any other leader should appear

**Work and proof**
- [ ] Real project photography replacing SVG placeholders; client approval for each project
- [ ] Verified metrics (years, projects, etc.) in `data/social-proof.js`
- [ ] Client testimonials recorded with consent
- [ ] Review the six service pages, FAQs and the Journal drafts for accuracy before publishing

**Delivery and legal**
- [ ] Enquiry delivery: Resend keys or webhook URL
- [ ] Legal review of Privacy Policy and Terms
- [ ] Ensure `SHOW_SAMPLE_CONTENT` is unset in production
