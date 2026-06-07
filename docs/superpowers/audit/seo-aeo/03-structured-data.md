# Structured Data / JSON-LD Audit — template.how

**Scope:** Built `dist/` output (138 pages, Astro 5 static). READ-ONLY audit — no source edits.
**Date:** 2026-06-07
**Method:** Parsed every `<script type="application/ld+json">` block from built HTML across 7 representative page types, plus sitewide grep counts across all 138 pages. Current Google guidance confirmed via web search (June 2026).

---

## 1. What renders, per page type (extracted from `dist/`)

| Page type | URL | LD+JSON blocks present |
|---|---|---|
| Home | `/` | Organization |
| Hub | `/legal-document-templates/` | Organization, BreadcrumbList |
| Builder seed | `/bill-of-sale/` | Organization, BreadcrumbList, HowTo, FAQPage, SoftwareApplication, Person |
| Letter seed | `/resignation-letter/` | Organization, BreadcrumbList, HowTo, FAQPage, SoftwareApplication, Person |
| Static seed | `/twitch-banner-size/` | Organization, BreadcrumbList, HowTo, FAQPage, SoftwareApplication, Person |
| Variant | `/bill-of-sale/california/` | Organization, BreadcrumbList, HowTo, FAQPage, Person *(no SoftwareApplication)* |
| About | `/about/` | Organization, BreadcrumbList, Person |

**Sitewide counts (all 138 pages):** Organization 138 · Person 138 · BreadcrumbList 136 (absent only on `/` and `/404.html` — correct) · HowTo 126 · FAQPage 126 · SoftwareApplication 72.

Every block is standalone (`@context: https://schema.org` per block). **No `@graph`, no `@id`, on any page.** No `WebSite`, `Article`, `WebPage`, `Product`, `CreativeWork`, `SearchAction`, `datePublished`, or `dateModified` anywhere in `dist/`.

---

## 2. Matrix — page type × schema (present / valid / missing)

Legend: ✅ present & valid · ⚠️ present but flawed · ❌ missing (opportunity) · — N/A

| Schema | Home | Hub | Builder | Letter | Static | Variant | About |
|---|---|---|---|---|---|---|---|
| **Organization** | ⚠️¹ | ⚠️¹ | ⚠️¹ | ⚠️¹ | ⚠️¹ | ⚠️¹ | ⚠️¹ |
| **BreadcrumbList** | — ² | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| **HowTo** | — | — | ✅³ | ✅³ | ✅³ | ✅³ | — |
| **FAQPage** | — | — | ✅⁴ | ✅⁴ | ✅⁴ | ✅⁴ | — |
| **SoftwareApplication** | — | — | ⚠️⁵ | ⚠️⁵ | ❌⁶ misuse | — | — |
| **Person (author)** | — | — | ⚠️⁷ | ⚠️⁷ | ⚠️⁷ | ⚠️⁷ | ✅ |
| **WebSite + SearchAction** | ❌ P1 | — | — | — | — | — | — |
| **Article / WebPage + dates** | ❌ | ❌ | ❌ P1 | ❌ P1 | ❌ P1 | ❌ P1 | ❌ |
| **@id entity graph** | ❌ P1 | ❌ | ❌ P1 | ❌ P1 | ❌ P1 | ❌ P1 | ❌ |

¹ Organization `logo` points to `https://template.how/logo.svg` which **404s** (asset absent from `dist/`; only `favicon.svg` exists). Also no `@id`, no `sameAs`.
² Home correctly omits breadcrumb (it is the root). Flagged only as the place a `WebSite` node should live.
³ HowTo valid per schema.org but **Google deprecated HowTo rich results (Sept 2023)** — retain for AI/entity value only.
⁴ FAQPage valid, but **Google dropped FAQ rich results (May 7 2026)** — retain for AI value; ensure it stays only on genuine Q&A pages (it does).
⁵ SoftwareApplication is thin (no `aggregateRating` by design — good) but conceptually weak for a template (see Finding F4).
⁶ SoftwareApplication on a static information page (`/twitch-banner-size/`) describing pixel dimensions is **schema-to-content mismatch / misuse risk** (see F5).
⁷ Person rendered standalone, **not linked as `author` of any Article/WebPage** — Google cannot attribute authorship (see F6).

---

## 3. Findings (severity · evidence · fix)

### F1 — Organization `logo` URL is a 404 [P0]
Every one of the 138 pages emits:
```json
{ "@type": "Organization", "name": "Template.how", "url": "https://template.how",
  "logo": "https://template.how/logo.svg", "founder": { "@type": "Person", ... } }
```
`dist/logo.svg` **does not exist** (only `dist/favicon.svg`). Google requires `logo` to resolve to a fetchable image to be eligible for the organization logo / knowledge-panel treatment; a broken URL invalidates the property and wastes the strongest brand-entity signal you emit sitewide.
**Fix:** Ship a real `logo.svg` (or PNG ≥112×112, on a square-ish canvas per Google) to the site root, or point `logo` at an existing asset. Add `@id` (e.g. `https://template.how/#organization`) so other nodes can reference it.

### F2 — No `WebSite` node + no `SearchAction` (sitelinks search box) [P1]
Zero `WebSite` blocks sitewide; zero `SearchAction`. The homepage is the canonical place for:
```json
{ "@type": "WebSite", "@id": "https://template.how/#website",
  "url": "https://template.how/", "name": "Template.how",
  "publisher": { "@id": "https://template.how/#organization" },
  "potentialAction": { "@type": "SearchAction",
    "target": { "@type": "EntryPoint", "urlTemplate": "https://template.how/search?q={query}" },
    "query-input": "required name=query" } }
```
WebSite is also the anchor AI engines use to understand "what is this site." (Only add `SearchAction` if an on-site search endpoint actually exists — otherwise emit `WebSite` without it.)
**Fix:** Add a `WebSite` node on `/` and reference Organization as `publisher` via `@id`.

### F3 — No Article/WebPage with dates/author/publisher on content pages [P1]
No `datePublished` / `dateModified` / `author` / `publisher` exist anywhere in `dist/`. Content pages (seeds, variants, hubs) have no page-level entity and **no freshness signal**. This is the single biggest miss for AI answer engines, which lean heavily on `dateModified` + explicit `author`/`publisher` to decide what to cite and how current it is.
**Fix:** Add an `Article` (or `WebPage` for non-article hubs) per content page:
```json
{ "@type": "Article", "@id": ".../bill-of-sale/#article",
  "headline": "Bill of Sale Template (US + UK)", "datePublished": "...", "dateModified": "...",
  "author": { "@id": "https://template.how/#person-sunny" },
  "publisher": { "@id": "https://template.how/#organization" },
  "mainEntityOfPage": ".../bill-of-sale/" }
```

### F4 — SoftwareApplication is a stretch for downloadable templates [P2]
```json
{ "@type": "SoftwareApplication", "name": "Bill of Sale Template (US + UK) — Free PDF & DOCX",
  "applicationCategory": "UtilitiesApplication", "operatingSystem": "Any",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" } }
```
A downloadable PDF/DOCX template is a `CreativeWork` / `DigitalDocument`, not an application a user runs. `operatingSystem: "Any"` and `applicationCategory: UtilitiesApplication` are weak/borderline. It is *not* eligible for app rich results without `aggregateRating` (correctly omitted, avoiding fake-review risk). Net: low upside, some misclassification risk.
**Fix:** Replace with `CreativeWork`/`DigitalDocument` (`name`, `about`, `encodingFormat: ["application/pdf","application/vnd.openxmlformats-officedocument.wordprocessingml.document"]`, `isAccessibleForFree: true`, `license`, `author`/`publisher` via `@id`). This is a more honest, AI-legible representation of "a free template you can download."

### F5 — SoftwareApplication on a static info page = content mismatch / manual-action risk [P1]
`/twitch-banner-size/` is an informational page about pixel dimensions. It still emits:
```json
{ "@type": "SoftwareApplication", "name": "Twitch Banner Size — Exact 2026 Dimensions ...",
  "applicationCategory": "UtilitiesApplication", "operatingSystem": "Any",
  "offers": { "price": "0", "priceCurrency": "USD" } }
```
The "application" does not exist on the page — there is no app, and arguably no downloadable template either. Google's March 2026 guidance narrowed rich-result eligibility to schema that describes the page's **primary content**; marking up a non-existent app is exactly the misuse pattern that risks a structured-data manual action.
**Fix:** Suppress SoftwareApplication on static/info seeds (those without a real downloadable artifact). Use `Article`/`WebPage` (F3) instead. 72 pages carry SoftwareApplication today — audit which genuinely offer a template download vs. pure-info pages and gate accordingly.

### F6 — Person (author) is orphaned, never linked as `author` [P1]
`Person` (Sunny Patel) renders as a standalone block on 138 pages but is never referenced as the `author` of any Article/WebPage, and has no `@id`. Google/AI cannot attribute authorship or build the Article→author→publisher chain that powers E-E-A-T and citation. The Organization's nested `founder` Person and the standalone `Person` are **two un-linked copies** of the same entity (dedup problem).
**Fix:** Give Person a single `@id` (`https://template.how/#person-sunny`); reference it from `Article.author` and from `Organization.founder` via `@id` instead of re-inlining.

### F7 — No `@id` / `@graph` → fragmented entity graph [P1]
No node anywhere uses `@id`. Organization, Person, Breadcrumb, HowTo, FAQ, SoftwareApplication are six disconnected islands per page. Google and AI engines reconcile entities by `@id`; without it they must guess that the three different "Sunny Patel" / "Template.how" mentions are the same entity.
**Fix:** Wrap each page's blocks in a single `@graph` with stable `@id`s and cross-references (`publisher`, `author`, `isPartOf`, `mainEntityOfPage`). One graph per page, deduplicated.

### F8 — HowTo / FAQ no longer earn rich results (retain for AI only) [P3 / informational]
HowTo rich results deprecated Sept 2023; FAQ rich results dropped May 7 2026 (Search Console support removed through Aug 2026). Both remain **valid schema.org types** and still aid AI answer engines and entity understanding, so keeping them is correct — just do **not** count on Google SERP enhancements. Both are currently scoped correctly (only on pages with genuine steps / Q&A). No action required beyond awareness; do not expand FAQ to pages without real Q&A chasing dead rich results.

### F9 — BreadcrumbList: valid ✅
Positions are sequential (1..n), every `item` is an absolute URL, `name`s match nav. Present on 136/138 (correctly absent on `/` and `/404`). No issues — this is the cleanest type and the one Google still rewards with SERP breadcrumbs.

---

## 4. Entity graph & consistency

- **Name/URL consistency:** `Template.how` + `https://template.how` and `Sunny Patel` + `https://sunnypatel.co.uk` are consistent across all blocks. Good.
- **Duplication:** Person appears twice per page (nested `founder` inside Organization + standalone `Person`) with no `@id` to unify them. Organization repeats in full on all 138 pages (acceptable for static, but should carry `@id`).
- **No graph linking:** Article→author(Person)→publisher(Organization) chain does not exist — the highest-leverage missing structure for both Google E-E-A-T and AI citation.

---

## 5. AI-answer-engine (AEO) priority

What most helps ChatGPT / Perplexity / AI Overviews understand & cite these pages, in order:
1. **Article/WebPage with `dateModified` + linked `author` + `publisher`** (F3, F6) — freshness + attribution are the top citation signals. Currently absent.
2. **A clean `@graph` with `@id`s** (F7) — lets engines resolve "who made this, on what site."
3. **`WebSite` + Organization with working `logo`/`sameAs`** (F1, F2) — brand entity recognition.
4. **FAQPage / HowTo** (F8) — still strong for AI extraction even with zero Google rich-result value; already present and well-formed. Keep.
5. **`CreativeWork`/`DigitalDocument`** describing the template itself (F4) — clearer than SoftwareApplication for "free downloadable template."

---

## 6. Prioritized fix list

**P0 — correctness / risk, do first**
- F1: Ship a real, fetchable `logo.svg` (or repoint `logo`); the current URL 404s on all 138 pages.

**P1 — high-leverage gaps**
- F5: Remove SoftwareApplication from static/info seeds (content-mismatch manual-action risk); gate it to pages with a real downloadable template.
- F3: Add `Article`/`WebPage` with `datePublished`/`dateModified` to content pages (freshness + AI citation).
- F6: Link `Person` as `Article.author`; give it one `@id`; dedup against `Organization.founder`.
- F7: Consolidate per-page blocks into one `@graph` with stable `@id`s and cross-references.
- F2: Add `WebSite` node on `/` (+ `SearchAction` only if a search endpoint exists).

**P2 — refinement**
- F4: Replace SoftwareApplication on template pages with `CreativeWork`/`DigitalDocument` (`encodingFormat`, `isAccessibleForFree`, `license`).

**P3 — awareness, no code change required**
- F8: Keep HowTo/FAQ for AI value; stop expecting Google rich results from them; don't add FAQ to non-Q&A pages.

---

## 7. Verdict

The schema **foundation is technically clean** — BreadcrumbList, HowTo, FAQPage, Organization, and Person all parse, validate against schema.org, and are scoped to sensible page types. But the implementation is **a set of disconnected islands with one broken asset and one misuse pattern**, and it is **missing the modern, AI-era essentials**: a working logo, an entity `@graph` with `@id`s, page-level Article/WebPage nodes with `dateModified`, and linked authorship. It is optimized for the 2021 rich-result era (HowTo/FAQ — both now dead in Google SERPs) rather than the 2026 reality where freshness, authorship, and a coherent entity graph drive both Google E-E-A-T and AI-engine citation.

**Grade: C+.** Fix the 404 logo (P0) and the SoftwareApplication misuse on info pages (P1) immediately; then the single biggest win is adding linked `Article` + `@id` graph + `dateModified` across content pages.

---

### Sources (current Google guidance, June 2026)
- [Google to no longer support FAQ rich results — Search Engine Land](https://searchengineland.com/google-to-no-longer-support-faq-rich-results-476957)
- [Mark Up FAQs with Structured Data — Google Search Central](https://developers.google.com/search/docs/appearance/structured-data/faqpage)
- [Changes to HowTo and FAQ rich results — Google Search Central Blog](https://developers.google.com/search/blog/2023/08/howto-faq-changes)
- [Software App (SoftwareApplication) Schema — Google Search Central](https://developers.google.com/search/docs/appearance/structured-data/software-app)
- [General Structured Data Guidelines (misuse/manual actions) — Google Search Central](https://developers.google.com/search/docs/appearance/structured-data/sd-policies)
- [Schema Markup After March 2026 — DigitalApplied](https://www.digitalapplied.com/blog/schema-markup-after-march-2026-structured-data-strategies)
