# Technical SEO / Crawlability / Indexability Audit — template.how

**Scope:** Astro 5 static site, freshly built to `dist/` (138 HTML pages). Audited both `src/` and rendered `dist/` HTML (what crawlers see). Read-only.
**Goal:** Maximize traditional search ranking (Google, Bing) AND AI answer-engine citation (ChatGPT, Perplexity, Google AI Overviews, Gemini, Copilot).
**Date:** 2026-06-07 · **Auditor pass:** technical/crawlability (file 01 of series)

**Page inventory (dist):** 138 HTML files = 1 home + 8 hub + ~70 seed + 54 `/bill-of-sale/<variant>/` + `/about`, `/contact`, `/404`.
**Build config:** `astro.config.mjs` → `site: 'https://template.how'`, `trailingSlash: 'always'`, `build.format: 'directory'`. Sitemap via `@astrojs/sitemap`. OG images via custom Satori integration.

---

## Overall verdict

**Technically excellent and crawl-ready — among the cleanest static builds you'll audit.** Canonicals, titles, descriptions, OG images, robots, and sitemap-to-page parity are all essentially flawless (138/138 unique titles & descriptions, 138/138 canonicals, 138/138 OG images). The only material gaps are **AEO/discovery enhancers, not blockers**: no `lastmod` in the sitemap (the one tag Google actually uses), no `WebSite`/`SearchAction` or per-page article schema beyond Organization, and a **content-quality leak where all 50 US-state variants carry British spelling**. Fix the handful of P1s and this is a textbook crawlable site.

---

## 1. Canonical tags — PASS (P3 nit only)

**Evidence:** `src/layouts/BaseLayout.astro:27,41` derives `canonical = new URL(Astro.url.pathname, site.url)` and emits `<link rel="canonical" href={canonical}>`. Rendered spot-checks:

| Page type | Sample | Canonical |
|---|---|---|
| Home | `index.html` | `https://template.how/` |
| Hub | `legal-document-templates/` | `https://template.how/legal-document-templates/` |
| Seed | `nda/` | `https://template.how/nda/` |
| Variant | `bill-of-sale/california/` | `https://template.how/bill-of-sale/california/` |
| About | `about/` | `https://template.how/about/` |
| 404 | `404.html` | `https://template.how/404/` |

- **138/138 pages have a canonical** (`grep -rL 'rel="canonical"'` → 0 misses).
- All **self-referential, absolute, https, trailing-slash-consistent** with `trailingSlash: 'always'`. No duplicate/conflicting canonicals.
- `og:url` matches canonical on every page sampled. Excellent.

**P3 nit:** The 404 page emits a self-canonical to `https://template.how/404/`. It's correctly `noindex`, so this is harmless, but a canonical on a noindex utility page is slightly odd. **Fix (optional):** drop the canonical on the 404, or leave as-is (no SEO impact since noindex wins).

---

## 2. Indexability — PASS

**Evidence:**
- Only **one** page carries `noindex`: `404.html` → `<meta name="robots" content="noindex,follow">` (correct — `src/layouts/BaseLayout.astro:42`, `noindex` prop wired through). No accidental `noindex`/`nofollow` anywhere else (`grep -rl noindex` → only `404.html`).
- No `nofollow`, no `X-Robots-Tag` in source (static host; verify CDN headers separately — out of scope for dist).

**Thin/duplicate-risk assessment of the 54 variants — LOW RISK (P2 watch):**
- Each variant renders ~450–560 words of body text. CA vs TX comparison: 223 shared unique tokens but **37 CA-only / 40 TX-only tokens** plus jurisdiction-specific statute, H1 (`California Bill of Sale Template`), title, and description. This is genuine per-jurisdiction differentiation, not boilerplate stamping — **they should stay indexable.**
- **Watch item (P2):** the meta descriptions are near-templated ("A bill of sale for personal property in {State} records the transfer of ownership from seller to buyer. {State}'s rules differ from neighbouring jurisdictions in specific, sometimes consequential ways."). 54 descriptions differing only by state name is a mild duplicate-description signal. Not harmful today, but adding one state-specific clause per description would strengthen them. See also Finding 9.

---

## 3. Sitemap — PASS on coverage, P1 on metadata

**Evidence:** `dist/sitemap-index.xml` → references `https://template.how/sitemap-0.xml` (correct host). `dist/sitemap-0.xml` contains **137 `<loc>` entries**.

- **Cross-check (exact):** 137 dist `index.html` pages ↔ 137 sitemap URLs, **zero diff in either direction** (`comm` set comparison clean). The only page excluded is `404.html` — **correct**, since it's noindex and shouldn't be in a sitemap. So the sitemap contains **all and only canonical, indexable URLs.** This is the ideal state for coverage.
- All `<loc>` use `https://template.how` (single host, trailing slashes consistent with canonicals). No non-canonical or parameterized URLs.

**P1 — No `<lastmod>` (and no `changefreq`/`priority`):** `grep -oc '<lastmod>'` → **0**. Per current (2026) Google guidance, Google **ignores `changefreq` and `priority` but actively uses `<lastmod>`** to schedule re-crawls when the date is accurate and trustworthy. The seed content already has an `updated`/`modifiedTime` date (it's emitted as `article:modified_time` in the head), so the data exists — it's just not flowing into the sitemap.
**Fix (P1):** Configure `@astrojs/sitemap` with a `serialize`/`lastmod` hook (or pass per-page `lastmod` from the same `data.updated` already used for `article:modified_time`) so every URL gets an honest `<lastmod>`. Omit `changefreq`/`priority` (Google ignores them) or add light values for Bing/other crawlers — `lastmod` is the high-value one. **Critical:** only set dates that reflect real content changes, or Google will discount them.

---

## 4. robots.txt — PASS (well above average)

**Evidence:** `public/robots.txt` (copied to `dist/robots.txt`).
- `User-agent: * / Allow: /` — nothing important blocked; Googlebot & Bingbot covered by `*`.
- Explicit `Allow: /` for the full modern AI-bot roster: GPTBot, ChatGPT-User, OAI-SearchBot, ClaudeBot, Claude-Web, anthropic-ai, Google-Extended, PerplexityBot, Perplexity-User, Applebot-Extended, CCBot, meta-externalagent, Bytespider, Amazonbot, cohere-ai, DuckAssistBot, MistralAI-User, YouBot. This is a strong, deliberate AEO posture.
- `Sitemap: https://template.how/sitemap-index.xml` — correct (points at the index, which is right).
- `Content-Signal: search=yes,ai-input=yes,ai-train=yes` under `User-agent: *` — this is the IETF/Cloudflare AI-preferences signal, used here to **override Cloudflare's default `ai-train=no` injection**. Sensible given the explicit goal of being trained-on/cited. It's a non-standard directive that compliant bots honor and others ignore — harmless to non-supporting crawlers.

**P3 nits:**
- `Bytespider` (ByteDance) and `CCBot` are allowed — intentional per the "maximize citation/training" goal, but flag for the owner's awareness (these are aggressive crawlers; allow only if the training exposure is desired). No action needed if intentional.
- Consider adding `Bingbot`/`msnbot` explicitly is **not** necessary — `*` covers them and Bing honors it.

---

## 5. US/UK targeting — P1 (content-quality leak)

**Evidence:**
- `<html lang="en">` on every page (`src/lib/site.ts` `locale: 'en'`). **No hreflang anywhere** (`grep -rl hreflang` → 0). No `en-GB`/`en-US` split.

**Assessment:** Single-URL dual-market (one page serving both US + UK) is a **defensible strategy** here — most pages are genuinely shared and hreflang would require maintaining parallel URLs the site doesn't have. `lang="en"` (generic, not `en-US`/`en-GB`) is the correct neutral choice for shared pages. **hreflang is NOT warranted** given there are no separate localized URLs. This is fine.

**P1 problem — spelling consistency, not targeting mechanism:** US-jurisdiction pages serve **British spelling**. Confirmed across **all 50 US-state bill-of-sale variants**: every one contains "neighbouring" (e.g. `bill-of-sale/texas/` description: *"Texas's rules differ from **neighbouring** jurisdictions..."*). Sampled alabama, alaska, arizona, california, texas, florida, new-york, ohio, iowa — all = 2 occurrences each. Site-wide, 42 files use `-ise/-our` British forms vs 22 American. For a page explicitly targeting *Texas / California* (US legal context, US searchers, US AI-answer queries), British orthography is an authority/relevance ding and reads as non-native to a US audience.
**Fix (P1):** Localize spelling per jurisdiction — US-state variants and US-context seed copy should use American spelling (neighboring, organize, license, color); UK-nation variants (England/Scotland/Wales/Northern Ireland) keep British. At minimum, fix the templated US-state description string. This is the single most impactful relevance fix in this audit for the US market.

---

## 6. URL structure — PASS

**Evidence:** All URLs are lowercase, hyphenated, no params, no file extensions, trailing-slash consistent (`/nda/`, `/bill-of-sale/california/`). Depth is shallow: home → hub (1) → seed (1) → variant (2 for bill-of-sale children). Hub slugs are descriptive (`legal-document-templates`). No issues.

---

## 7. Status codes / redirects — PASS (P2 verify on host)

**Evidence:**
- `public/_redirects` → `/sitemap.xml /sitemap-index.xml 301` (Cloudflare Pages format; copied to `dist/_redirects`). Correct — bots requesting the conventional `/sitemap.xml` get 301'd to the real index. Note the file has a leading BOM/zero-width char before the rule; Cloudflare tolerates it, but worth stripping.
- `404.html` is a **genuinely helpful** 404: has `<main>`, ~47 internal links (categories + popular templates), `noindex,follow`, and a useful description. No soft-404 risk on real content pages (every page has substantive unique content).
- `trailingSlash: 'always'` + directory format means the host should 301 non-slash → slash. **P2 (verify on live host, not in dist):** confirm Cloudflare Pages serves `404.html` with an actual **HTTP 404 status** (not 200) and that `/nda` (no slash) 301s to `/nda/`. Static `dist` can't prove status codes — verify post-deploy.

---

## 8. OG / social / favicons — PASS (two P2/P3 nits)

**Evidence:**
- Every page has `og:type`, `og:title`, `og:description`, `og:url`, `og:image` + `twitter:card=summary_large_image` (`BaseLayout.astro:43-48`).
- **138 OG PNGs generated** in `dist/og/` (Satori), one per page, correctly referenced as absolute URLs. Per-page derivation works: `bill-of-sale/california/` → `og/bill-of-sale_california.png` (exists). `default.png` and `index.png` both present. **Only one missing image: `og/404.png`** referenced by `404.html` — harmless (noindex page) but a broken ref. **P3 fix:** generate a 404 OG image or suppress the tag on 404.
- Favicon: `public/favicon.svg` present and linked (`<link rel="icon" type="image/svg+xml">`). **P3:** SVG-only favicon — fine for modern browsers, but add a fallback `favicon.ico` and an `apple-touch-icon.png` for older clients/iOS bookmarks.

**P2 — Twitter tags incomplete:** `twitter:card` is on all 138 pages, but **`twitter:title`, `twitter:description`, `twitter:image` are on 0 pages.** Twitter/X falls back to the OG tags, so cards still render — but explicit `twitter:image`/`twitter:title` is the documented best practice and removes ambiguity. **Fix (P2):** add `twitter:title`/`twitter:description`/`twitter:image` mirroring OG in `BaseLayout`. Low effort, one-time.

**P3 — `og:type` on home should be `website`:** Home (`index.html`) emits `og:type="article"` because `BaseLayout` hardcodes `article` (`BaseLayout.astro:43`). Hub/home are not articles. **Fix:** make `og:type` a prop (`website` for home/hub/about/contact, `article` for seeds/variants).

---

## 9. Meta titles & descriptions at scale — PASS with P2 length watch

**Evidence (all 138 pages scanned):**
- **Titles:** 138/138 non-empty, **138/138 unique** (zero duplicates). Variant titles are well-differentiated (`Bill of Sale Template — California (CA)`, `— Texas (TX)`, `— England (ENG)`).
- **Descriptions:** 138/138 present, non-empty, **0 exact duplicates**.

**P2 — Title length:** **70 of 138 titles exceed 60 chars** (and 65 exceed 65) once the ` | Template.how` suffix (~15 chars) is appended. Longest examples: *"Itinerary Template — Free (Business Trip, Conference, Wedding, Relocation) | Template.how"* (91 chars), *"YouTube Banner Size — 2560 × 1440 & the 1546 × 423 Safe Area (2026) | Template.how"* (90). Google truncates around ~580px (~60 chars); the parenthetical keyword lists will be cut off in SERPs. The keywords still help relevance, but the visible/clickable portion is truncated. **Fix (P2):** trim the longest titles' parentheticals, or shorten the brand suffix (e.g. drop ` | Template.how` on the longest, or use `· Template.how`). Prioritize the ~65 longest.

**P2 — Description length:** **132 of 138 descriptions exceed 160 chars**; several exceed 180–195 (e.g. the to-do-list page at 192, the bill-of-sale state descriptions at 195). Google truncates ~155–160 chars on desktop / ~680px, so the tail of most descriptions won't show. They're well-written, just long. **Fix (P2):** tighten to ≤155 chars so the full snippet renders. The 54 templated state descriptions (Finding 2) are the highest-volume offenders — fix the template once.

**Net:** No correctness failures (uniqueness/presence are perfect) — purely a SERP-display optimization. Hence P2, not P0/P1.

---

## 10. Mobile/viewport, charset, head hygiene — PASS

**Evidence (per rendered head):**
- `<meta charset="utf-8">` and `<meta name="viewport" content="width=device-width, initial-scale=1">` on every page (`BaseLayout.astro:37-38`).
- **Render path is clean:** only **2 stylesheet links** in head (`index.*.css`, `_seed_.*.css`), no Google Fonts CDN, no render-blocking third-party CSS. GA `gtag` loads **`async`** (non-blocking) — good.
- **Fonts self-hosted and correctly gated:** `src/lib/fonts.ts` only emits `@font-face` + `<link rel="preload">` when the woff2 files exist on disk. The four woff2 files ARE present (`public/fonts/`), so the rendered head correctly preloads `Fraunces.var.woff2` + `Inter-roman.var.woff2` with `crossorigin` and `as="font"` — **correct preload syntax, no 404 risk, no CLS** (metric-matched fallbacks in `fonts.css`). This is best-practice font handling.
- No `preconnect`/`dns-prefetch` needed (no third-party render-path origins except GA, which is async). Fine.

**P3 nit:** GA `gtag` is the only third-party request; it's async and below the fold of the critical head. No action needed, but if Core Web Vitals matter, consider a consent-gated / deferred load.

---

## 11. llms.txt — PASS, with llms-full.txt opportunity (P2)

**Evidence:** `public/llms.txt` (→ `dist/llms.txt`) is present and well-formed: H1 title, a clear positioning paragraph (US+UK, per-state/per-nation variants, governing statute + last-verified date — exactly the differentiators AI engines should cite), a `## Categories` list linking all 8 hubs by path, and a `## Authorship` block (Sunny Patel + URL). Clean, valid markdown, points to the key hub pages. Good.

**P2 opportunities:**
- **No `llms-full.txt`.** The format convention is `llms.txt` = concise index, `llms-full.txt` = the full corpus concatenated for ingestion. Given the explicit AEO goal, generating an `llms-full.txt` that concatenates the seed + variant content (or at least the definitional ledes, how-to steps, FAQs, and jurisdiction tables) would give answer engines a single high-signal document to cite. **Recommend generating it at build time.**
- **llms.txt lists only the 8 hubs, not seeds/variants.** Consider adding a `## Key pages` section linking the highest-value seeds (bill-of-sale and its jurisdiction index) so crawlers that read llms.txt discover the depth.
- Neither `llms.txt` nor `llms-full.txt` is referenced from `robots.txt` or HTML `<head>`. There's no formal discovery standard yet, but a `<link rel="llms" href="/llms.txt">` or a comment in robots.txt is a cheap discoverability bet.

---

## Schema / structured data (cross-cutting AEO note) — P1

Not in the original 11 but materially affects AI citation and rich results, so flagged:
- **Present:** `Organization` + `Person` (author) schema on home (`OrganizationSchema` in BaseLayout). Seeds wire `BreadcrumbSchema`, `HowToSchema`, `FAQPageSchema`, `SoftwareApplicationSchema` (`SeedLayout.astro:66-69`). Strong per-seed coverage.
- **P1 gaps:**
  - **No `WebSite` schema with `potentialAction`/`SearchAction`** anywhere (`grep '"WebSite"'` → 0). Adding `WebSite` schema on the home page is a standard sitelinks-searchbox / entity-establishment signal.
  - **Verify variants** (`/bill-of-sale/<state>/`) carry the same `HowTo`/`FAQ`/`Breadcrumb` schema as seeds — if they render through a different path than `SeedLayout`, confirm they're not schema-bare. (Sampled variant has rich body content but schema presence per-variant should be confirmed in the schema-specific audit.)
  - **No `dateModified`/`Article` schema** tying the visible "last verified" date into structured data — the dates exist as `article:modified_time` meta but aren't in JSON-LD. High value for freshness signals to AI engines.

---

## Prioritized fix list

### P0 — Critical (none)
No crawlability/indexability blockers. Site is fully indexable and correctly served.

### P1 — High
1. **Add `<lastmod>` to the sitemap** (Finding 3). Wire `@astrojs/sitemap` to the existing `data.updated`/`modifiedTime` so Google can schedule re-crawls. Use only honest dates. Omit/keep `changefreq`/`priority` (Google ignores them).
2. **Fix US/UK spelling localization** (Finding 5). All 50 US-state bill-of-sale variants (and US-context seed copy) use British spelling ("neighbouring", etc.). Switch US pages to American spelling; keep British for England/Scotland/Wales/NI variants. Start with the templated state description string.
3. **Add `WebSite`+`SearchAction` schema on home and `dateModified`/Article JSON-LD on seeds/variants; confirm variants aren't schema-bare** (Schema note). Entity + freshness signals for AI citation.

### P2 — Medium
4. **Trim ~65 over-length titles** (>60–90 chars) so the clickable SERP portion isn't truncated (Finding 9).
5. **Tighten 132 over-length meta descriptions** to ≤155 chars; fix the 54 templated state descriptions once (Findings 2, 9).
6. **Add `twitter:title`/`twitter:description`/`twitter:image`** mirroring OG (Finding 8).
7. **Generate `llms-full.txt`** and expand `llms.txt` with key seed pages (Finding 11).
8. **Verify on live host:** 404 returns HTTP 404 (not soft-200); non-slash URLs 301 → trailing slash (Finding 7).
9. **Differentiate the 54 templated state meta descriptions** with one state-specific clause each (Finding 2).

### P3 — Low
10. Set home/hub/about `og:type="website"` (currently hardcoded `article`) (Finding 8).
11. Generate `og/404.png` or drop the OG tag on 404 (Finding 8).
12. Add `favicon.ico` + `apple-touch-icon.png` fallbacks (Finding 8).
13. Strip the BOM/leading char in `public/_redirects` (Finding 7).
14. Drop the self-canonical on the noindex `404.html` (Finding 1).
15. Reconfirm `Bytespider`/`CCBot` allowance in robots.txt is intentional (Finding 4).

---

## Counts at a glance
| Metric | Result |
|---|---|
| HTML pages | 138 |
| Pages with canonical | 138 / 138 ✅ |
| Unique non-empty titles | 138 / 138 ✅ |
| Present non-empty descriptions | 138 / 138 ✅ (0 dupes) |
| Pages with `noindex` | 1 (404 only) ✅ |
| OG images generated | 138 / 138 ✅ (only `404.png` missing) |
| Sitemap URLs | 137 (= all indexable pages, 404 excluded) ✅ |
| Sitemap URLs missing from dist / vice-versa | 0 / 0 ✅ |
| Sitemap `<lastmod>` present | 0 / 137 ❌ (P1) |
| hreflang | 0 (acceptable — single-URL dual-market) |
| Titles > 60 chars | 70 / 138 (P2) |
| Descriptions > 160 chars | 132 / 138 (P2) |
| `twitter:image`/`twitter:title` | 0 / 138 (P2) |
| US-state variants with British spelling | 50 / 50 ❌ (P1) |

**Sources (best-practice confirmation):** [Google: Build and Submit a Sitemap](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap) · [Sitemap tags: what Google actually uses (Linkbot)](https://library.linkbot.com/how-should-the-loc-lastmod-changefreq-and-priority-tags-be-optimally-used-within-a-sitemap-xml-file/) — Google uses `lastmod`, ignores `changefreq`/`priority`.
