# 05 — Performance & Core Web Vitals audit

_template.how · 2026-06-07 · Lighthouse (pinned Chromium 1194, lhci staticDistDir ./dist). Raw reports in `/home/user/lh-reports/` (uncommitted)._

**Verdict:** Performance is excellent — every page is 95–100, CLS is effectively zero, TBT is 0 ms (the lazy `import()` of jspdf/docx is working). The only real issues are (1) a sitewide **−8 SEO** Lighthouse ding from a non-standard robots.txt directive, which **also red-fails the CI Lighthouse gate**, and (2) mobile **LCP slightly over the self-imposed 2.0 s budget** on the heavier content pages (still within Google's 2.5 s "good" threshold for all but the builder pages).

## Scores (Lighthouse)
| Page | Device | Perf | SEO | A11y | BP | LCP | CLS | TBT |
|---|---|---|---|---|---|---|---|---|
| Home `/` | mobile | 99 | **92** | 100 | 96 | 1.95s | 0 | 0ms |
| Home | desktop | 100 | **92** | 100 | 96 | 0.44s | 0 | 0ms |
| Hub `/legal-document-templates/` | mobile | 99 | **92** | **95** | 96 | 1.95s | 0 | 0ms |
| Hub | desktop | 100 | **92** | **95** | 96 | 0.48s | 0 | 0ms |
| Builder seed `/bill-of-sale/` | mobile | 95 | **92** | 100 | 96 | **2.63s** | 0.019 | 0ms |
| Builder seed | desktop | 100 | **92** | 96 | 96 | 0.56s | 0 | 0ms |
| Static seed `/twitch-banner-size/` | mobile | 96 | **92** | 100 | 96 | **2.55s** | 0.014 | 0ms |
| Static seed | desktop | 100 | **92** | 100 | 96 | 0.55s | 0 | 0ms |

Budget (`lighthouserc.json`): Perf/A11y/BP/SEO ≥ 0.95 (error), LCP ≤ 2000 ms (error), CLS ≤ 0.05 (error), TBT ≤ 100 ms (warn).

## Findings

### P1 — robots.txt "unknown directive" → −8 SEO on every page, and CI Lighthouse fails
Lighthouse `robots-txt` audit scores **0** sitewide:
`line 6: Content-Signal: search=yes,ai-input=yes,ai-train=yes -> Unknown directive`.
This single audit drops the SEO category to **0.92 on all 138 pages**, below the CI `categories:seo ≥ 0.95` **error** assertion — so the `npm run lighthouse` step in `ci.yml` is **currently red on every push to main** (Cloudflare deploys independently, so the site still ships).
The directive is functionally harmless — the robots.txt spec says compliant crawlers ignore unrecognized lines, so real Googlebot/Bingbot/AI bots are unaffected; only Lighthouse's strict parser objects.
**Fix options (pick one):**
1. **Move the content signal to an HTTP response header** via a Cloudflare Pages `public/_headers` file (`Content-Signal: search=yes, ai-input=yes, ai-train=yes`) and drop the line from `robots.txt`. Cleanest — restores SEO to 100, keeps the AI-signal intent, and a header is arguably the more correct delivery mechanism. **Recommended.**
2. Keep the directive and relax the CI assertion (`categories:seo` → `warn`, or add `robots-txt` to the audit ignore list) — documents that the ding is an accepted false-negative.
Do **not** simply delete the signal without re-homing it — preserving AI-train/input intent is deliberate (see robots.txt comment).

### P2 — Mobile LCP over the 2.0 s budget on content pages (CI LCP assertion fails on builder pages)
Mobile LCP: home/hub **1.95 s** (pass), static **2.55 s**, twitch **2.55 s**, builder/bill-of-sale **2.63–2.70 s**. The builder/static pages exceed the **2000 ms** CI error budget; the builder pages also edge past Google's 2.5 s "good" field threshold. CLS (≤0.019) and TBT (0 ms) are well within budget, so this is pure render/load latency on throttled mobile — the LCP element is the large Fraunces display `H1`/hero text.
**Fix:** the fonts are already self-hosted + preloaded; remaining levers are (a) inline the small critical CSS for the hero so first paint isn't gated on the stylesheet, (b) confirm the preloaded woff2 are the only render-blockers, (c) consider a lighter/optional-display treatment for the H1 so text paints on the fallback instantly (it already uses metric-matched fallback + swap — verify the H1 isn't waiting on Fraunces). Alternatively, align the CI budget to Google's real threshold (LCP ≤ 2500 ms) since field "good" is 2.5 s, not 2.0 s.

### P2 — Accessibility 95 on hub pages: `<dl>` structure
`definition-list` audit fails on the hub: a `<dl>` (the hub trust-stat strip) doesn't contain only properly-ordered `<dt>`/`<dd>` (or `<dt>/<dd>` wrapped in `<div>`). Drops hub A11y to 95. **Fix:** wrap each term/description pair in a `<div>`, or use non-`<dl>` markup for the stat strip. (The bill-of-sale variant `.bos-rule__list` already wraps pairs in `<div>` correctly — mirror that.)

### P2 — Best Practices 96: console error is a localhost test artifact (verify in prod)
`errors-in-console` logs `net::ERR_CERT_AUTHORITY_INVALID` — an HTTPS resource failing cert validation during the **local** Lighthouse run (a request resolving to an absolute `https://template.how/...` URL or similar while served from localhost). Almost certainly a **test-harness artifact**, not a production defect. **Action:** re-check Best Practices against the live site after deploy; if it reproduces in prod, trace the offending absolute-URL resource.

## What's already excellent (no action)
- **TBT 0 ms everywhere** — the lazy `import()` of jspdf/docx keeps the builder island off the hydration critical path.
- **CLS ≤ 0.019** — self-hosted fonts + metric-matched fallbacks deliver near-zero layout shift, including on the builder.
- **Perf 95–100** mobile and 100 desktop across all four page archetypes.
- Desktop LCP 0.44–0.56 s across the board.

## Prioritized fix list
1. **P1** — Re-home the `Content-Signal` directive to a `_headers` HTTP header (restores SEO 100, unblocks CI). 
2. **P2** — Bring mobile LCP under budget on builder/static pages (critical-CSS inline / H1 paint), or align CI LCP budget to Google's 2.5 s.
3. **P2** — Fix the hub `<dl>` structure (A11y 95 → 100).
4. **P2** — Verify the console cert error is local-only (Best Practices).
