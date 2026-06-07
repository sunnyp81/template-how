# On-Page SEO, Content Quality & E-E-A-T Audit — template.how

**Scope:** 138 built pages in `dist/` — 8 hub/node pages, ~70 seed pages, 54 `/bill-of-sale/<variant>/` jurisdiction variants, plus `/`, `/about`, `/contact`, `/404`.
**Mode:** Read-only. No source edited, nothing rebuilt or committed.
**Date:** 2026-06-07. **Auditor brief:** maximize Google/Bing ranking + AI-answer-engine (AEO) citation.

**Headline verdict:** This is a strong, well-architected content site — clean heading hierarchy, unique source-derived meta descriptions, rich JSON-LD (FAQPage/HowTo/Breadcrumb/SoftwareApplication), genuine 1,800+ word long-form per seed, real per-jurisdiction differentiation in variants, and a real named author with `sameAs`. The gaps that hold back ranking and AI citation are concentrated and fixable: (1) **no Article/TechArticle schema with `dateModified`/`author`**, so the visible "Verified" date is not machine-readable as freshness — the single highest-leverage AEO miss; (2) **zero in-body contextual internal links** (all seed↔seed linking is trapped in the footer "Related" card grid with weak title-case anchors); (3) **inconsistent YMYL disclaimers** — present on 4 legal pages, absent on ~6 other legal pages, all tax/financial pages, and all 54 jurisdiction variants; (4) a handful of genuine **cannibalization / mis-categorization** cases (reference-letter ↔ letter-of-recommendation foremost).

---

## 1. Title & meta description quality

**Overall: strong.** Titles follow a consistent, CTR-friendly pattern: `[Keyword] Template — Free [modifier] (US + UK) | Template.how`. Primary keyword is front-loaded in every title and H1. US/UK duality is signalled in-title ("US + UK", "US Estimate / UK Quote", "UK Fit Note + US Medical Leave"). Meta descriptions are auto-derived from `definitionalLede` and are **100% unique across all pages** (verified: no duplicate description strings in `dist/`).

- **[P2] A few titles risk truncation (>60 chars / ~575px).** e.g. `ATS-Friendly Resume Template — Free (Beat the Bots, Land Interviews) | Template.how` and `Avery Label Template — Free (5160, 5163, L7160 + Mail Merge Guide) | Template.how` will clip in SERPs.
  - *Fix:* Keep the keyword + "Free" + brand within ~60 chars; move parenthetical detail to the meta description. e.g. `ATS-Friendly Resume Template — Free (US + UK) | Template.how`.
- **[P2] Meta descriptions are definitions, not CTAs.** Because they reuse `definitionalLede`, they read like dictionary entries (good for AI extraction, weaker for human CTR). They rarely contain "free", "download", "PDF/DOCX", or an action verb that earns the click.
  - *Evidence:* `bill-of-sale` description = "A bill of sale is a legal document that records the transfer of ownership of personal property from a seller to a buyer." — no "free", no format, no CTA, and notably **shorter than every other** description (a thin outlier worth expanding).
  - *Fix:* Append a short benefit/CTA clause to the description field (or a dedicated `metaDescription`), e.g. "...Free PDF & DOCX, fillable in your browser, US + UK." Keep the lede pristine for in-body/AI use.
- **[P3] Hub/node titles are generic.** `Resumes & careers templates | Template.how`, `Resumes & careers` reads as an internal label rather than a search target.
  - *Fix:* Target the head term: `Resume & CV Templates (US + UK) — Free | Template.how`.

## 2. Heading hierarchy

**Overall: excellent.** Sampled across all page types (seed, static-only, variant, hub, about, index): **exactly one `<h1>` per page** in every sample. Logical H2 flow; HowTo steps render as H3 under an H2; FAQ is an H2. Many H2s are question/utility-shaped ("What a Harvard resume actually is", "When to use this template", "Common mistakes") — strong for PAA.

- **[P3] Footer/author UI elements emit H2s** ("Sunny Patel", "Categories", "Site", and the builder section headings "Contact"/"Education"/"Experience"). These compete with content H2s in the outline. The author "Reviewed by → Sunny Patel" as an `<h2>` is defensible; the footer nav "Categories"/"Site" as H2 is not ideal.
  - *Fix:* Demote footer-nav group labels to `<p>`/`<span>` or `role="heading"`-free elements; keep the document outline content-only.

## 3. Keyword targeting & CANNIBALIZATION

Primary keywords are largely distinct head terms with their own intent, so most "families" are differentiated rather than cannibalizing. The real risks:

- **[P1] `reference-letter` vs `letter-of-recommendation` — true synonym overlap.** In US usage a "letter of recommendation" *is* a "reference letter". Ledes confirm near-identical scope (employment/character endorsement). Worse, they are split across **two different nodes** (reference-letter → resume-templates; letter-of-recommendation → legal-document-templates) and the back-link is **asymmetric** (reference-letter lists letter-of-recommendation in `related`, but letter-of-recommendation does *not* list reference-letter back). Google will struggle to pick a canonical; the two pages will trade positions.
- **[P2] `letter-of-recommendation` is mis-categorized** under `legal-document-templates` (it is a career/reference document, not a legal instrument). This also weakens its `crossCluster`/related wiring (it relates to bill-of-sale, nda, last-will — irrelevant).
- **[P2] Resume family (harvard / ats-friendly / google-docs / chronological / simple)** — *not* cannibalizing on the head term, but all five compete for generic "resume template" long-tail and share large overlapping bodies. Each owns a distinct primary keyword (format-named or platform-named), which is the correct strategy, but they need an explicit canonical-owner + hub to avoid diluting "[free] resume template".
- **[P3] Invoice / resignation / itinerary families** are sufficiently differentiated (distinct keywords, distinct intent) and are low risk.

### Cannibalization table

| Cluster | Pages (primaryKeyword, est. SV) | Risk | Recommended canonical / action |
|---|---|---|---|
| **Reference vs recommendation** | `reference-letter` ("reference letter template"), `letter-of-recommendation` ("letter of recommendation template") | **High (synonyms)** | Pick **letter-of-recommendation** as canonical (broader intent: job/university/award/immigration). Re-scope `reference-letter` narrowly to **employment/tenancy reference** (UK "reference") and link both ways. Move `letter-of-recommendation` into `resume-templates`. Make back-links symmetric. If traffic stays split after re-scoping, 301 reference-letter → letter-of-recommendation. |
| **Character reference** | `character-reference-letter` ("character reference letter template") | Low | Distinct intent (court/rental/immigration). Keep; ensure it links to both above as the "character" specialisation. |
| **Resume formats** | `harvard-resume` (17k), `ats-friendly-resume` (8.4k), `chronological-resume` (6.5k), `simple-resume` (9k) | Medium (shared body, shared long-tail) | Designate **`ats-friendly-resume`** (or the resume-templates hub) as canonical owner of generic "resume template"; differentiate each page's lede/H1 to its distinguishing axis (named-format / bot-passing / format-type / minimal). Cross-link all five as a named "resume formats" set. |
| **Google Docs resume** | `google-docs-resume` ("google docs resume template", 35k) | Low | Platform intent — keep separate, it's the highest-volume term in the family. Link to format pages for "which format". |
| **Cover letter** | `cover-letter-google-docs` ("cover letter template google docs") | Low–Med | Platform-qualified term; safe. *Gap:* there is **no generic `cover-letter`** page — consider one as canonical owner, with the Google-Docs page as a platform variant linking up. |
| **Resignation** | `resignation-letter` (12k), `two-weeks-notice` (4.1k) | Low | Genuinely distinct (formal letter vs US at-will 2-week notice). Keep; cross-link (already related). |
| **Invoice / quote / PO** | `invoice-google-docs`, `estimate`, `purchase-order` | Low | Distinct documents. Keep. |
| **Itinerary** | `itinerary`, `travel-itinerary`, `road-trip-itinerary` | Low–Med | Three itinerary pages share a stem; ensure `itinerary` is the hub/canonical and the other two are clearly sub-intents (travel vs road-trip), heavily cross-linked, to avoid diluting "itinerary template". |
| **Funeral** | `funeral-program`, `funeral-order-of-service`, `eulogy`, `obituary`, `death-announcement` | Low | Distinct documents within a tight topical cluster — good for topical authority. Keep. |

## 4. Content depth & uniqueness

**Overall: genuinely strong.** Seed pages render ~3,600–5,200 words (including chrome; body comfortably clears the 1,800-word floor). The `definitionalLede` → long-form pattern is consistent and high-quality: every seed has a 40–60-word extractable definition, a "what it is / when to use / what to include / variants / step-by-step / common mistakes / worked example" spine, an author `<aside class="tip">` of first-person experiential commentary (real Experience signal), 8–15 FAQs, and a HowTo. This is well above commodity template-site depth.

- **Static-only pages are deep enough.** `twitch-banner-size` (~1,800w floor, exact 2026 dims, safe-zone guidance, 3 authoritative sources), `capcut`, `discord-bio`, `wanted-poster`, `tier-list` all carry real substance and original framing, not thin specs. No critical content is locked in images (zero inline `<img>` — see §8).
- **[P2] The 54 bill-of-sale variants are differentiated but thin.** Per-jurisdiction facts are real and correct (FL requires notarisation; CA/TX/NY do not — verified in rendered HowTo/FAQ schema), so they are NOT duplicate. But the unique per-variant body is only **~340 words** (total rendered ~700w incl. shared chrome), versus a stated `wordCountFloor: 1200` that is clearly measuring chrome, not unique content. At ~340 unique words, some long-tail variants risk being judged thin/templated.
  - *Fix:* Add 150–300 words of genuinely state-specific content per variant: the actual statute/citation, DMV/title-transfer step specifics, sales-tax treatment, whether a smog/emissions cert is required, county recording nuances. Raise the *unique-content* floor and measure it (strip shared shell before counting).
- **[P3] `audience: [us]`-only page** (one seed) and `[uk, us]` ordering inconsistency (one seed) — cosmetic; confirm the US-only page genuinely has no UK angle.

## 5. Internal linking

**Overall: the weakest on-page area.** The link graph enforces ≥3 incoming links and the footer "Related templates" grid wires seed↔seed + crossCluster — but the implementation has real SEO cost:

- **[P1] Zero in-body contextual internal links.** On `harvard-resume`, every seed→seed link (`/ats-friendly-resume/`, `/cover-letter-google-docs/`, `/resignation-letter/`, `/letter-of-recommendation/`) appears **only** in the footer Related card grid. The 2,000+ words of body content contain **no contextual links** to sibling pages — even where the prose explicitly names them ("ATS systems", "cover letter", "the European CV"). Contextual links carry far more ranking and AI-traversal weight than a footer card grid, and their absence wastes the site's best asset (deep prose).
  - *Fix:* Add 3–6 in-context links per seed from natural anchor phrases in the body to the most relevant siblings (e.g. link "cover letter" → cover-letter page, "ATS" → ats-friendly-resume). This is the highest-ROI internal-linking change.
- **[P1] Generic / mis-cased Related anchor text.** Cards render the slug title-cased: "Cover letter google docs", "Ats friendly resume", "Letter of recommendation". "Ats" and "google docs" are wrong-cased, and none use the descriptive keyword anchor ("ATS-friendly resume template").
  - *Fix:* Use the page's `h1`/`title` (or a dedicated `anchor` field) as the card label, e.g. "ATS-Friendly Resume Template".
- **[P2] Asymmetric `related` wiring.** reference-letter → letter-of-recommendation exists, but not the reverse (see §3). Audit all `related` arrays for reciprocity where semantically warranted.
- **[P3] Click depth is shallow and healthy** (home → hub → seed = 2 clicks; variants 3). Link-equity flows fine structurally; the issue is anchor quality and body-link absence, not topology.

## 6. E-E-A-T / trust

**Overall: above average for a template site, with one structural schema gap.**

- **Author identity: good.** Named author **Sunny Patel** with real `jobTitle`, external `url` (sunnypatel.co.uk), and three `sameAs` (LinkedIn, Twitter/X, Clutch). `Person` JSON-LD is emitted on every seed AND inside the visible AuthorBox ("Reviewed by → Sunny Patel"). First-person `tip` asides provide genuine **Experience** signal ("the resumes I review for clients...").
- **Organization identity: good.** `Organization` schema with `founder` → Person on home/about; About page carries it plus BreadcrumbList.
- **Sources: good authority.** SourceList cites primary/authoritative sources (Harvard OCS, US DOL CareerOneStop, Twitch Help, statute references on legal pages) with `accessed` dates, rendered as a visible "References / Sources" `<ol>`.
- **Visible freshness: present.** Pages show "Verified [date]" via `<time datetime="2026-…">`.

- **[P1] No Article/TechArticle schema → "Verified" date is NOT machine-readable as `dateModified`.** Schema audit of seed pages shows: FAQPage, HowTo, BreadcrumbList, SoftwareApplication, Organization, Person, Offer — but **no Article/TechArticle/WebPage** wrapper, therefore **no `dateModified`, no `datePublished`, no article-level `author`**. 2026 AEO guidance is explicit: AI engines weight `dateModified` heavily as a freshness signal and use Article+author to build the "this source says X" citation; a visible date that isn't in schema gives little citation lift. This is the single highest-leverage E-E-A-T/AEO fix.
  - *Fix:* Wrap each seed/variant in `Article` (or `TechArticle`) JSON-LD with `author` (the Person), `publisher` (Organization), `datePublished`, `dateModified` (= `updated`), `headline`, and `mainEntityOfPage`. Mirror the visible "Verified" date into `dateModified`.
- **[P0] Inconsistent YMYL "not legal/financial advice" disclaimers.** Disclaimers are hardcoded per-page in body markdown (only `bill-of-sale`, `lease-agreement`, `nda`, `last-will`) — there is **no global disclaimer component**. Confirmed **MISSING** on YMYL legal pages: `power-of-attorney`, `operating-agreement`, `promissory-note`, `eviction-notice`, `doctors-note`, `obituary`; on **all** tax/financial pages: `invoice-google-docs`, `balance-sheet`, `profit-and-loss-statement`, `expense-report`; and on **all 54 bill-of-sale jurisdiction variants** (the parent has it, the variants don't). For a Quality Rater, an LLC operating agreement or power-of-attorney template with no "not legal advice / consult a solicitor" notice is a YMYL trust failure.
  - *Fix:* Add a global, renderer-aware disclaimer component: legal renderers → "Not legal advice; consult a qualified solicitor/attorney"; invoice/financial → "Not tax or accounting advice"; inject automatically on every legal-document/letter(legal)/invoice page and every variant.
- **[P2] About (505w) and Contact (330w) are thin for a trust hub.** About states the editorial process briefly but lacks depth on credentials, editorial standards, correction policy, and funding/independence — all things raters and AI weigh for site-level trust.
  - *Fix:* Expand About with Sunny Patel's verifiable credentials, an editorial/review/correction policy, and how sources are chosen. Add a physical/contact basis and response commitment to Contact.
- **[P2] AuthorBox bio is generic** ("SEO Consultant & Template Editor. Every template on this site is checked against primary...") — same string on every page; no per-cluster expertise statement.
  - *Fix:* Keep the byline but link "Reviewed by Sunny Patel" to an author page with full bio/credentials (a dedicated `/author/sunny-patel/` entity page strengthens entity disambiguation, which 2026 AEO guidance flags as the highest-leverage citation lever).

## 7. Freshness

- **[P2] Staleness clustering.** 32 seeds dated `2026-04-23`, 40 dated `2026-06-06`. The `2026-04-23` cohort includes flagship/high-volume pages (`harvard-resume` 17k, `bill-of-sale` 40k, `cover-letter-google-docs`, `last-will`, `nda`). With AI engines weighting `dateModified` heavily, a flat ~6-week-old date on the money pages is a missed freshness signal — compounded because (per §6) the date isn't even in schema yet.
  - *Fix:* (1) Land the Article `dateModified` fix first. (2) Establish a real refresh cadence on high-SV/YMYL pages (statute checks for legal, spec checks for design/platform pages like banner sizes & CapCut which date fast) and bump `updated` only on genuine change. Add `datePublished` so freshness is a true delta, not a single flat date.

## 8. Images / alt

- **[P1, low-effort] OG images referenced but verify they exist & have descriptive filenames.** Each page sets `og:image` to a per-page PNG (`/og/harvard-resume.png`) — good (unique social card per page). Confirm all 138 referenced OG files actually ship in `public/og/` (broken OG hurts social/AI preview).
- **No inline-image alt problems:** seed, static-only, hub, and home pages contain **zero `<img>` tags** — so no missing-alt issues, and **no critical content locked in images** (specs, dimensions, steps are all in text — ideal for AI extraction).
- **[P3] Consider adding one illustrative, alt-texted preview image per template** (a screenshot of the filled template). Purely text pages convert and engage worse, and an image with descriptive alt adds an extra extraction surface. Optional, not a ranking blocker.

## 9. Featured-snippet / PAA readiness

**Overall: excellent — this is the site's strongest AEO asset.**

- Every seed opens with a **40–60 word `definitionalLede`** that is a textbook position-0 definition answer, and it is also the meta description and (should become) the Article description.
- **FAQPage schema** with 8–15 Q&As per page (10 on harvard-resume), **HowTo schema** with numbered steps, and **BreadcrumbList** all render correctly — directly feeds PAA and AI answer extraction. (2026 guidance: FAQPage has the highest AI-citation potential of any schema type — already implemented.)
- Question-shaped H2s and step structures support snippet capture.
- **[P2] Add comparison tables** where intent is comparative — e.g. resume-format pages ("Harvard vs ATS vs chronological"), `estimate` (estimate vs quote vs invoice), bill-of-sale variants (notary-required-by-state matrix). Tables win a distinct snippet class the site currently under-uses, and are highly AI-extractable.

---

## Prioritized fix list

### P0 — trust/correctness, do first
1. **YMYL disclaimers** (§6): add a global renderer-aware "not legal/financial advice" component; it is missing on ~6 legal seeds, all 4 tax/financial seeds, and all 54 bill-of-sale variants.

### P1 — high ranking/AEO leverage
2. **Article/TechArticle schema with `author` + `datePublished` + `dateModified`** on every seed/variant (§6); mirror the visible "Verified" date. Highest AEO lift.
3. **In-body contextual internal links** — 3–6 per seed from natural anchors in the prose (§5).
4. **Fix Related anchor text** — use real H1/title labels, not title-cased slugs ("Ats friendly" → "ATS-Friendly Resume Template") (§5).
5. **Resolve reference-letter ↔ letter-of-recommendation** cannibalization; re-scope, make links symmetric, recategorize LoR into resume-templates (§3).
6. **Verify all 138 OG images ship** (§8).

### P2 — meaningful improvements
7. Thicken bill-of-sale variants with 150–300 words of true state-specific content + a per-state notary/tax matrix table (§4, §9).
8. Add CTA/benefit clause to meta descriptions; expand the outlier-thin `bill-of-sale` description (§1).
9. Trim over-long titles to ~60 chars (§1).
10. Expand About (credentials, editorial/correction policy) + add `/author/sunny-patel/` entity page (§6).
11. Establish a real refresh cadence + `datePublished`; refresh the 2026-04-23 flagship cohort (§7).
12. Add comparison tables on comparative-intent pages (§9).
13. Recategorize letter-of-recommendation; audit `related` reciprocity (§3, §5).

### P3 — polish
14. Demote footer-nav H2s out of the document outline (§2).
15. Improve generic hub/node titles (§1).
16. Consider a generic `cover-letter` canonical page (§3); confirm itinerary hub canonical (§3).
17. Optional alt-texted preview image per template (§8).

---

## Overall verdict

**Grade: B+ / strong foundation, three concentrated gaps from an A.** The content is genuinely valuable, the heading/meta/schema discipline is better than most commercial template sites, and the FAQ/HowTo/definition pattern is purpose-built for AI citation. Three things are leaving rankings and citations on the table: (1) **YMYL disclaimer gaps** (a P0 trust risk on legal/tax pages), (2) **no Article schema with a machine-readable `dateModified`/`author`** (the biggest AEO miss — the freshness and authorship signals exist visibly but aren't structured), and (3) **internal linking confined to a weak-anchor footer grid** with no in-body contextual links. Fix those three and the site is positioned to both rank and be cited.

### Sources (2026 best-practice references)
- [Schema Markup for AEO 2026: 5 Types That Matter — LoudFace](https://www.loudface.co/blog/schema-markup-for-aeo-2026)
- [Answer Engine Optimization: Complete AEO Guide 2026 — Frase](https://www.frase.io/blog/what-is-answer-engine-optimization-the-complete-guide-to-getting-cited-by-ai)
- [Structured Data for AI Search: Schema Markup Guide 2026 — Stackmatix](https://www.stackmatix.com/blog/structured-data-ai-search)
- [Schema Markup After March 2026 — Digital Applied](https://www.digitalapplied.com/blog/schema-markup-after-march-2026-structured-data-strategies)
- [Keyword Cannibalization 2026: AI Citations at Risk — SEO Engico](https://seoengico.com/blog/keyword-cannibalization-ai-overviews-2026)
- [Keyword Cannibalization: Find, Fix, Prevent — Semrush](https://www.semrush.com/blog/keyword-cannibalization-guide/)
- [Keyword Cannibalization — Ahrefs](https://ahrefs.com/blog/keyword-cannibalization/)
