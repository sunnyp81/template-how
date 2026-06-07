# AEO / GEO Audit — Answer Engine / Generative Engine Optimization

**Site:** template.how (Astro 5 static, 138 pages in `dist/`)
**Scope:** How well the site is retrieved, understood, and CITED by AI answer engines (ChatGPT / OAI-SearchBot, Perplexity, Google AI Overviews / Gemini, Bing Copilot, Claude).
**Mode:** READ-ONLY audit of source + freshly-built `dist/`. No edits made.
**Date:** 2026-06-07 · **Auditor:** AEO/GEO agent

---

## Verdict (TL;DR)

**AI-Citation-Readiness Score: 8.2 / 10 — Strong.**

template.how is built almost exactly the way 2026 GEO research says to build for citation: a direct definitional answer in the first sentence after every H1, question-shaped FAQ headings, dense factual tables, primary-source citations to statutes, and rich JSON-LD (FAQPage, HowTo, BreadcrumbList). The 54-page bill-of-sale jurisdiction matrix is a textbook "requirements by state" asset that AI Overviews love. Crawler access is correctly opened to every major AI agent.

The score is held back from ~9.5 by two structural gaps that are pure upside:
1. **No `Article`/`WebPage` JSON-LD with `author` + `dateModified`.** A `Person` (Sunny Patel) schema exists but floats unconnected — machines can't bind the author credential or a machine-readable freshness date to the page content. This is the single biggest E-E-A-T/freshness miss.
2. **The jurisdiction model is used on exactly one seed (bill-of-sale).** Six-plus other jurisdiction-sensitive legal templates (lease, NDA, eviction notice, will, POA, promissory note) ship as single pages, leaving the highest-leverage long-tail AEO surface unbuilt.

---

## Findings

### 1. AI crawler access — **P3 (healthy, minor note)**

**Evidence.** `public/robots.txt` explicitly `Allow: /` for the full roster of answer-engine agents: GPTBot, ChatGPT-User, OAI-SearchBot, ClaudeBot, Claude-Web, anthropic-ai, Google-Extended, PerplexityBot, Perplexity-User, Applebot-Extended, CCBot, meta-externalagent, Bytespider, Amazonbot, cohere-ai, DuckAssistBot, MistralAI-User, YouBot. Sitemap declared (`sitemap-index.xml` present in `dist/`, `/sitemap.xml` 301s to it via `_redirects`). The `Content-Signal: search=yes,ai-input=yes,ai-train=yes` line is syntactically valid per Cloudflare's spec (comma-delimited `key=value` with `yes/no`; whitespace after commas is optional, so the no-space form is fine).

- **`ai-input=yes`** is the directive that matters for citation — it permits real-time answer use. Correctly set.
- **`ai-train=yes`** is non-default (Cloudflare's managed default injects `ai-train=no`). The comment in the file shows this overrides that default. **Owner-intent note only — not changed.** Worth a one-line confirmation from the owner that training consent is intended; it has no effect on citation either way.
- **Cloudflare block risk:** Content-Signal is a *preference*, not enforcement. If the site sits behind Cloudflare with "Block AI bots" / Bot Fight Mode / managed-robots.txt enabled at the dashboard level, that can override this file and silently 403 AI agents regardless of what robots.txt says. **Cannot be verified from the repo** — verify in the Cloudflare dashboard that AI Scrapers & Crawlers blocking is OFF and no WAF rule challenges these user-agents.

**Fix.** (a) Live-verify each key agent gets 200 (not 403/JS-challenge) by curling `dist` URLs with their UA against production. (b) Confirm Cloudflare bot-management isn't blocking AI crawlers. (c) Confirm `ai-train=yes` is intended.

---

### 2. llms.txt quality — **P2**

**Evidence.** `public/llms.txt` follows the llmstxt.org shape: H1 (`# Template.how`), a one-paragraph site summary, an H2 `## Categories` with 8 annotated category links, and an `## Authorship` line crediting Sunny Patel with URL. It is concise and correctly formatted.

Gaps vs. the convention and vs. the site's actual value:
- **Only 8 links, all category hubs.** None of the high-value *seed* pages (the actual answer targets) are listed — e.g. `/bill-of-sale/`, `/resignation-letter/`, `/last-will/`, `/invoice-google-docs/`, `/nda/`. The convention encourages linking the *most important pages* with one-line descriptions, not just top-level sections.
- The **54 jurisdiction pages** — the site's most distinctive, citation-worthy asset — are entirely invisible in llms.txt.
- The summary paragraph is good but doesn't use a blockquote (`>`), which the canonical format prefers right after the H1.

**Reality check (grounding).** Per 2026 research, no major AI lab has *confirmed* using llms.txt for ranking/citation, and a Semrush controlled study found no measurable lift; however OpenAI and Microsoft crawlers *are* observed fetching `llms.txt`/`llms-full.txt`. Treat it as low-cost, low-but-nonzero upside — worth doing well, not worth over-investing.

**Fix.**
- Add a `## Key pages` (or per-category) section listing the top ~15-25 seed URLs with a one-line description each (definitional lede makes a ready-made description).
- Add one line pointing to the jurisdiction matrix, e.g. `- /bill-of-sale/ — Bill of sale template with per-US-state and per-UK-nation legal requirements (notary, witnesses, governing statute)`.
- Optional: convert the summary line to a `>` blockquote for canonical compliance.
- **`llms-full.txt`:** Worth adding *only if* it can be generated from the same content pipeline (the markdown already exists). A full-content dump of the ~72 seed bodies would give Claude/ChatGPT a single-fetch corpus. Low priority — build it only if cheap to automate; do not hand-maintain.

---

### 3. Content extractability / chunkability — **P3 (excellent)**

**Evidence (rendered `dist/bill-of-sale/index.html`).**
- **Answer-first:** The very first sentence after the H1 is the definitional lede — *"A bill of sale is a legal document that records the transfer of ownership of personal property from a seller to a buyer."* This is the ideal liftable answer pattern and it's enforced for every seed via the `definitionalLede` schema field. The same lede is mirrored into `<meta name="description">`.
- **Question-/answer-shaped headings:** H2s are self-contained and descriptive — "What a bill of sale actually is", "When you need one", "What it must include", "Do I need a notary…". Each section stands alone (good chunk boundaries).
- **Factual density:** statute citations per jurisdiction, a worked example, numbered HowTo steps, "common mistakes" — the concrete, quotable material models reward.
- **Tables/lists:** a 54-row "Requirements by jurisdiction" table (Jurisdiction · Notary · Witnesses · Governing law · Verified date) — exactly the comparison-table format AI Overviews extract.
- Minimal fluff; the answer is never buried below marketing copy.

**Minor note:** the builder widget (interactive form) renders a large block of UI text inline in the HTML. It's after the substantive content and unlikely to confuse extraction, but it does add noise to the raw page text. Not worth changing.

**Fix.** None required. This is a model case. (If anything, keep doing exactly this across all seeds.)

---

### 4. Q&A / FAQ — **P3 (excellent)**

**Evidence.** Generic page carries 8 FAQs phrased as real user prompts ("Do I need a notary for a bill of sale?", "Is a handwritten bill of sale legally valid?", "What is the difference between a bill of sale and a title transfer?"). Schema enforces 8-15 FAQs per seed. Crucially, **jurisdiction FAQs are genuinely localized** — the California page asks "Is a notary required for a California bill of sale?", "What form does California use for vehicle transfer?", "What is the governing law in California?" — not copy-paste. This directly answers long-tail prompts like *"is a bill of sale required in California"*, which is precisely how Perplexity/AI-Overview queries are phrased.

**Fix.** None required. Extend this FAQ discipline to every future jurisdiction set (see Finding 8).

---

### 5. Citations & grounding / trust (E-E-A-T) — **P1**

**Evidence.**
- **Primary sources, well-chosen:** seeds cite legislation.gov.uk, US state statutes (CA Commercial Code, Florida Statutes), each with an `accessed` date. The jurisdiction table names the governing statute per row. This is strong, citation-boosting grounding.
- **Author signal exists but is under-wired:** a `Person` JSON-LD block for Sunny Patel (jobTitle, url, LinkedIn/Twitter/Clutch `sameAs`) and a visible "Reviewed by Sunny Patel" byline are present.
- **Freshness is visible but not machine-bound:** every page shows a "Verified 23 Apr 2026" string, and sources carry `accessed` dates.

**Gaps (the P1):**
- **No `Article`/`WebPage`/`Author` linkage.** The `Person` schema is a free-floating node, not the `author`/`reviewedBy` of an `Article`. Engines therefore can't attribute the content to a credentialed author — the E-E-A-T signal is on the page but not in machine-readable relationship to the content. 2026 research repeatedly flags structured author credentials + schema as a measurable citation-selection factor.
- **No `dateModified`/`datePublished` in any JSON-LD** (confirmed: 0 `dateModified` occurrences in `dist`). The "Verified" date is human-readable text only. Given Perplexity's heavy recency weighting and the ~30% citation lift from explicit year signals, exposing `dateModified` as structured data is high-value.

**Fix (high leverage).** Add an `Article` (or `WebPage` + `mainEntity`) JSON-LD wrapper per seed/jurisdiction page with:
- `headline`, `author` → reference the existing Sunny Patel `Person` node (use `@id`),
- `reviewedBy` / `dateModified` = the `updated` field already in frontmatter,
- `datePublished`, `publisher` → Organization node.
This reuses data the build already has; it's a schema-template change, not new content.

---

### 6. Semantic HTML & structure — **P3 (strong)**

**Evidence (`dist/bill-of-sale/index.html`).** Proper landmark use: `<main>`, `<article>` (×2), `<header>` (×3), `<nav>` (×5), `<section>` (×7), `<aside>` (×5), `<footer>`. Clean H1→H2 hierarchy. Lists and a real `<table>` for the jurisdiction matrix. JSON-LD present and parseable: FAQPage (8 Q/A), HowTo (4 steps), BreadcrumbList, SoftwareApplication+Offer (the builder), Organization, Person. Jurisdiction pages carry the same schema stack including a localized BreadcrumbList.

**Fix.** Structure itself is excellent. Only schema *completeness* needs work (see Finding 5: add Article/author/dateModified). A separate schema-depth agent owns the granular schema review.

---

### 7. Entity clarity — **P3 (strong)**

**Evidence.** WHO publishes is clear (Organization + Person schema, "Reviewed by Sunny Patel", llms.txt authorship). WHAT each page is about is unambiguous from H1 + definitional lede + title. The **US-vs-UK distinction is machine-extractable**: `audience: [us, uk]` in frontmatter, "US / UK" badges in the rendered hero, per-jurisdiction `audience: us|uk` on variants, and the jurisdiction table explicitly labels each row "(US)" / "(UK)" with the matching governing statute. Titles encode it too (`Bill of Sale Template (US + UK)`, `Bill of Sale Template — California (CA)`).

**Fix.** Strengthen marginally by binding entities in schema (`about`/`mentions`, `spatialCoverage` for jurisdiction pages) — nice-to-have, not required.

---

### 8. Comparative / quotable assets — **P1 (asset is strong; coverage is the gap)**

**Evidence.** The bill-of-sale page is exactly the stat-rich, tabular, "requirements by jurisdiction" content AI Overviews surface: a 54-row table (50 US states + England/Scotland/Wales/Northern Ireland), each with notary/witness requirements + named statute + verified date. All 54 jurisdiction pages are real, indexable, internally linked from the parent (confirmed: 54 internal links), each with its own definitional lede, localized FAQ, HowTo, and BreadcrumbList. This is high AEO value — it owns a huge long-tail of "is a bill of sale required in {state}" prompts and provides clean, liftable per-row facts.

**Gap (the P1).** This pattern exists on **only one seed.** The `variants` collection schema is defined but only `bill-of-sale` populates it. Other jurisdiction-sensitive legal templates ship as single pages: `lease-agreement`, `nda`, `eviction-notice`, `last-will`, `power-of-attorney`, `promissory-note`, `operating-agreement` — each was confirmed to render exactly 1 page. These are precisely the templates where "by state/nation" prompts are most common and where AI Overviews most want a requirements table.

**Fix.** Replicate the jurisdiction-variant model to the next 2-4 highest-volume legal seeds (eviction notice, lease/rental agreement, last will, POA are the obvious candidates). The machinery (`[variant].astro`, `data/jurisdictions.ts`, variants schema) already exists — this is content production against a proven template, not new engineering. Each new seed unlocks ~54 long-tail answer pages.

---

### 9. Concrete AEO wins (cross-cutting)

- **Surface `dateModified` as schema** (recency is a top citation factor in 2026; Perplexity citation skews hard to recently-updated pages). Data already exists in `updated`.
- **Wire author into Article schema** so the credential is attributable.
- **Replicate jurisdiction matrices** to more legal seeds — highest content ROI.
- **Expand llms.txt** to list key seed pages + the jurisdiction asset.
- **Keep "2026" / current-year signals** visible in titles/headings where natural — research shows ~30% citation lift from explicit recent-year signals. The "Verified 23 Apr 2026" line already helps; mirror the year into a few high-value titles where honest.
- **Live-verify crawler 200s** behind Cloudflare.

---

## Prioritized AEO Fix List

### P0 — none
No blocking AEO defects. Crawlers are open, content is answer-first, schema parses.

### P1 — high-leverage, do next
1. **Add `Article`/`WebPage` JSON-LD with `author` (→ Sunny Patel `Person` `@id`), `reviewedBy`, `datePublished`, and `dateModified`** on every seed + jurisdiction page. Reuses existing `updated` data. *(Findings 5, 6)*
2. **Expose machine-readable freshness** — `dateModified` specifically — to capture recency-weighted citation in Perplexity/AI Overviews. *(Finding 5)*
3. **Replicate the 54-jurisdiction model** to 2-4 more high-volume legal seeds (eviction notice, lease, will, POA). Machinery already built. *(Finding 8)*

### P2 — meaningful, lower effort
4. **Upgrade llms.txt:** add a key-pages section with top seed URLs + one-line descriptions; surface the jurisdiction asset; optional blockquote summary. *(Finding 2)*
5. **Optionally generate `llms-full.txt`** from existing seed markdown — only if automatable. *(Finding 2)*

### P3 — verify / polish
6. **Live-verify** each major AI user-agent receives HTTP 200 in production; confirm Cloudflare bot-management isn't blocking AI crawlers. *(Finding 1)*
7. **Confirm `ai-train=yes` is the owner's intent** (note only). *(Finding 1)*
8. **Add `spatialCoverage`/`about` entity bindings** to jurisdiction pages. *(Finding 7)*

---

## AI-Citation-Readiness Verdict

**8.2 / 10 — Strong; cite-ready today, with clear headroom.**

The fundamentals that drive AI citation in 2026 are already in place: answer-first definitional ledes, question-shaped self-contained sections, primary-source grounding to statutes, dense comparison tables, localized FAQs, clean semantic HTML, and open crawler access for every major engine. The site is structurally the kind of source ChatGPT, Perplexity, and AI Overviews lift from.

Two changes would move it toward best-in-class: (1) bind author + a machine-readable `dateModified` into `Article` schema so E-E-A-T and freshness are attributable, and (2) replicate the bill-of-sale jurisdiction matrix to the other jurisdiction-sensitive legal templates to multiply the long-tail answer surface. Both reuse data and machinery that already exist.

---

### Sources (2026 GEO/AEO grounding)
- [How ChatGPT, Google AI Overviews, and Perplexity Source Information in 2026 — Leapd](https://www.leapd.ai/blog/ai-visibility/how-chatgpt-google-ai-overviews-and-perplexity-source-information-in-2026)
- [AI Platform Citation Patterns — Profound](https://www.tryprofound.com/blog/ai-platform-citation-patterns)
- [ChatGPT, Claude, Perplexity, Google AI Overviews: How Each Cites — Discovered Labs](https://discoveredlabs.com/blog/chatgpt-claude-perplexity-and-google-ai-overviews-how-each-platform-cites-sources-differently)
- [The State of llms.txt in 2026 — aeo.press](https://www.aeo.press/ai/the-state-of-llms-txt-in-2026)
- [State of llms.txt 2026 — Presenc AI](https://presenc.ai/research/state-of-llms-txt-2026)
- [Giving users choice with Cloudflare's new Content Signals Policy](https://blog.cloudflare.com/content-signals-policy/)
- [contentsignals.org — Content Signals spec](https://contentsignals.org/)
- [AI Crawler Access Control: The 2026 Decision Matrix — Digital Applied](https://www.digitalapplied.com/blog/ai-crawler-access-control-2026-robots-llms-txt-decision-matrix)
