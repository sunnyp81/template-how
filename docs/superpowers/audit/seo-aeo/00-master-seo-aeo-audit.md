---
name: template.how — master SEO + AEO audit
description: Synthesis of the 5-dimension audit (technical, on-page/E-E-A-T, structured data, AEO, performance). Prioritized P0→P3 fix list to maximize ranking on search engines AND citation by AI answer engines.
date: 2026-06-07
type: audit
---

# template.how — master SEO + AEO audit (2026-06-07)

Five parallel audits against the freshly-built `dist/` (138 pages), post-redesign.

| Dimension | Report | Verdict |
|---|---|---|
| Technical SEO & crawlability | [01](./01-technical-crawlability.md) | **A−** — "one of the cleanest static builds you'll see." No P0. |
| On-page SEO, content & E-E-A-T | [02](./02-onpage-content-eeat.md) | **B+** — strong content; concentrated, fixable gaps. |
| Structured data / schema | [03](./03-structured-data.md) | **C+** — valid but disconnected islands; 1 broken asset, 1 misuse. |
| AEO / AI answer engines | [04](./04-aeo-ai-answer-engines.md) | **8.2/10** — cite-ready today. No P0. |
| Performance / Core Web Vitals | [05](./05-performance-cwv.md) | **A** — Perf 95–100, CLS ~0, TBT 0. 2 fixable dings. |

**Headline:** The site is already technically excellent, fast, deeply written, and correctly open to every major AI crawler — it is genuinely cite-ready. What holds back ranking and AI-citation share is a tight, high-leverage cluster of fixes, dominated by **one recurring theme flagged independently by four of the five audits: there is no machine-readable freshness or authorship** (no `Article`/`author`/`dateModified` schema, no `@id` entity graph). Fixing that, plus a handful of quick wins, is the highest-ROI work available.

---

## The #1 cross-cutting win (4 audits agree)
**Add a linked `Article`/`TechArticle` JSON-LD node to every content page**, carrying `author` (→ the existing Person, Sunny Patel), `publisher` (→ Organization), `datePublished` + `dateModified` (from the frontmatter `updated` field, already present), and an `@id`/`@graph` that unifies Article → author(Person) → publisher(Organization). Today the visible "Verified 23 Apr 2026" date and the named author are **human-readable only** — invisible to Google's freshness/E-E-A-T signals and to AI engines that weight recency and authorship heavily (Perplexity especially). The data already exists in frontmatter; this is wiring, not new content. **Biggest single lever for both SEO and AEO.**

---

## Prioritized fix list

### P0 — fix immediately (broken / risk)
1. **Organization `logo` 404 sitewide.** Every page emits `"logo":"https://template.how/logo.svg"` but no such file ships (`dist/` has only `favicon.svg`). Add a real `public/logo.svg` (or point the schema at an existing asset). One file fixes the strongest brand-entity signal on all 138 pages. _[03]_

### P1 — high impact, mostly low effort
2. **Add `Article` + `author` + `dateModified` + `@id` graph** to content pages (the #1 win above). _[03][04][02][01]_
3. **Add `WebSite` + `SearchAction` JSON-LD** to the homepage (sitelinks search box; entity anchor). _[03][01]_
4. **Gate `SoftwareApplication` schema** to pages with a real downloadable builder; remove it from static info pages (e.g. `/twitch-banner-size/`) — marking up non-existent app content is a March-2026 manual-action risk. 72 pages carry it. _[03]_
5. **Re-home the `Content-Signal` directive to an HTTP header** (`public/_headers`) and drop it from `robots.txt`. Lighthouse flags it "unknown directive" → **SEO 0.92 sitewide and a red CI Lighthouse gate**; a header preserves the AI-signal intent and restores SEO to 100. _[05]_
6. **Add `<lastmod>` to the sitemap** (the one sitemap tag Google actually uses to schedule recrawls). Data exists (`updated`); wire it into `@astrojs/sitemap`. _[01]_
7. **American spelling on the 50 US bill-of-sale variants** ("neighboring", not "neighbouring"); keep British for England/Scotland/Wales/NI. Direct US-relevance/authority signal on 50 pages. _[01]_
8. **Add in-body contextual internal links** (3–6 per seed) from natural anchor phrases to sibling pages — today all seed↔seed linking is trapped in the footer card grid. Highest-ROI internal-linking change; helps both PageRank flow and AI traversal. _[02]_
9. **Fix the `reference-letter` ↔ `letter-of-recommendation` cannibalization**: pick letter-of-recommendation as canonical, re-scope reference-letter to employment/tenancy references, move letter-of-recommendation into `resume-templates` (it's mis-filed under legal), make `related` links symmetric. _[02]_
10. **Consistent YMYL disclaimers** ("not legal/tax advice") on ALL legal/tax/financial pages and the 54 variants — currently on only ~4 of ~10 legal pages and no variants. Trust + compliance. _[02]_

### P2 — worthwhile
11. **Descriptive Related-card anchors** — use the page `h1` (e.g. "ATS-Friendly Resume Template") not the title-cased slug ("Ats friendly resume"). _[02]_
12. **Thicken the 54 variant pages** (~340 unique words today) with 150–300 words of genuinely state-specific content (statute cite, DMV/title steps, sales-tax, smog/emissions, county recording). _[02]_
13. **Meta descriptions: add a benefit/CTA clause** (keep the pristine lede for body/AI). Several titles >60 chars truncate — trim to keyword+Free+brand. _[02]_
14. **Mobile LCP** on builder/static pages (2.55–2.70 s) — inline critical hero CSS / ensure H1 paints on fallback; or align the CI LCP budget to Google's 2.5 s. _[05]_
15. **Hub `<dl>` accessibility** (wrap dt/dd pairs in `<div>`) — A11y 95 → 100. _[05]_
16. **Expand `llms.txt`** beyond the 8 category hubs to list high-value seeds + the jurisdiction asset; consider an `llms-full.txt`. _[04][01]_
17. **Twitter card tags** (`twitter:title`/`twitter:image`) — currently only OG fallback. Demote footer-nav `<h2>`s to non-headings. _[01][02]_

### P3 — growth play (content production, not a defect)
18. **Replicate the 54-page jurisdiction matrix to more jurisdiction-sensitive legal seeds** — lease, NDA, eviction-notice, will, power-of-attorney, promissory-note, operating-agreement. The `variants` collection, `[variant].astro`, and `data/jurisdictions.ts` machinery already exist; each new seed unlocks ~54 long-tail "requirements by state/nation" answer pages — a textbook AI-Overviews asset. _[04]_

---

## Suggested execution order
- **Wave A (quick wins, ~half a day, all P0/P1 schema + technical):** logo.svg, Article/author/dateModified + @id graph, WebSite/SearchAction, gate SoftwareApplication, Content-Signal→headers, sitemap lastmod. Mostly edits to `BaseLayout`, the schema components, `site.ts`, `astro.config.mjs`, and a `_headers` file — high impact, low risk, all verifiable by re-running the build + Lighthouse + a schema validator.
- **Wave B (content/relevance):** US spelling on variants, in-body contextual links, reference-letter re-scope, YMYL disclaimers, anchor text, meta CTAs.
- **Wave C (growth):** thicken variants, expand llms.txt, then the jurisdiction-matrix expansion.

All of Wave A keeps the four gates green and is independently verifiable; recommend doing it first and re-running the performance/schema checks to confirm SEO returns to 100 and CI goes green.
