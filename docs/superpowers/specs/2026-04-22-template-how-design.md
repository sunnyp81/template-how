# template.how — Design Spec

**Date:** 2026-04-22
**Author:** Sunny Patel
**Status:** Draft for review
**Domain:** template.how
**Repo (planned):** `sunnyp81/template-how`

---

## 1. Goal

Build a genuinely helpful template resource site at `template.how` that ranks in Google and is cited by LLMs (ChatGPT, Perplexity, Google AI Overviews, Claude, Copilot) for template-related queries. Dual-market US + UK as baseline audience, with per-state / per-country variants for all legal, tax, and compliance templates.

Revenue target: path to £500/mo within 6 months via affiliate-first, ads at scale, digital-bundle upsell.

Keyword pool: 6,000 keywords from Ahrefs (`C:\Users\sunny\Downloads\top_6000_template_keywords_filtered.csv`), total monthly search volume ~5M, 176 "sweet-spot" (DR ≤25, volume ≥3k) keywords.

---

## 2. Non-Goals

- No subscriptions (users grab a template and leave — trap for cold-start).
- No user accounts / login walls (kills SEO and LLM citation).
- No AI-only pages (Mar 2026 Core Update demoted templated AI content — see `calculator.place` incident).
- No blog at launch.
- No mobile app.
- No team / multi-user features.
- No hreflang complexity (variant-per-URL is cleaner).

---

## 3. Content Strategy

### 3.1 Page types (hybrid delivery per earlier decision)

- **Top ~50 SEED pages (money pages):** full treatment — interactive builder + pre-made download + guide + unique data.
- **Long-tail SEEDs (hundreds):** static template + DOCX/PDF download + guide (no builder).

### 3.2 Sourcing strategy — **Hybrid with structured data differentiation**

- AI drafts + **mandatory human edit pass** on every page before deploy.
- Every SEED must carry **per-jurisdiction / per-industry / per-tradition structured data** no competitor has (the moat).
- Every page passes `/semantic-audit` ≥85 + voice-fingerprint check (sentence variance, vocabulary entropy).
- Mar 2026 Core Update demotes templated H2s across pages — **H2 wording is written per page**, not generated from a shared template.

### 3.3 Unique-data moat by vertical (US + UK baseline)

| Vertical | Unique data layer |
|---|---|
| Legal | Per-US-state statute references (50) + UK/Scotland/Wales/NI variants |
| Resume | Per-industry ATS keyword banks pulled from 50+ live job postings; per-country format differences (US/UK/EU/DE/JP) |
| Invoice | Per-country tax rules (UK VAT, US state sales tax, EU reverse charge, AU GST) |
| Obituary | Per-religion/tradition structure (Christian/Jewish/Muslim/Hindu/secular) |
| Lesson plan | Per-curriculum (UK NC, US Common Core, IB, GCSE, AQA/OCR/Edexcel) |
| Birth plan | UK NHS vs. US hospital variants |
| Cover letter | Per-industry opener/framing banks |

---

## 4. Site Architecture — Semantic SEO Hub & Spoke (Koray ROOT/NODE/SEED)

### 4.1 ROOT (1)

`/` — homepage as canonical "templates" entity. Central search intent: *a place to find, customise, and download ready-made document templates*. All downstream pages semantically bound to this.

### 4.2 NODES (8 category hubs)

Each NODE is the definitive topical hub for its cluster, not a tag archive. Each carries its own central search intent, entity attribute block, contextual bridges to all sibling NODEs, and embedded `ItemList` schema for its SEEDs.

- `/legal-document-templates/`
- `/resume-templates/`
- `/business-templates/`
- `/life-event-templates/`
- `/planning-templates/`
- `/design-templates/`
- `/education-templates/`
- `/productivity-templates/`

### 4.3 SEEDs (main template pages) + sub-SEEDs (variants)

- SEED: short, singular URL matching the head term (`/bill-of-sale/`, `/resume/`, `/invoice/`).
- Sub-SEED: variant extension (`/bill-of-sale/california/`, `/resume/harvard/`, `/invoice/uk-vat/`).

### 4.4 Contextual bridges (internal linking — zero orphans)

- Homepage → all 8 NODEs + top 12 SEEDs.
- Each NODE → all its SEEDs + all 7 sibling NODEs + 2 adjacent guides.
- Each SEED → its NODE (up), all its sub-SEEDs (down), 4-6 sibling SEEDs in same cluster, 2 cross-cluster SEEDs with genuine entity relationships (e.g., `/resume` ↔ `/cover-letter`, `/invoice` ↔ `/receipt`).
- Each sub-SEED → parent SEED, NODE, 3 sibling sub-SEEDs, 1 cross-parent related sub-SEED.
- Each guide → NODE it belongs to + SEEDs it references.

**Enforcement:** build script walks Content Collection graph; build fails if any page has <3 incoming internal links. Hard gate.

### 4.5 Anchor text

Varied, descriptive, entity-consistent. Generated from the target page's primary entity + attribute. No "click here".

### 4.6 Breadcrumbs + sitemap

`BreadcrumbList` schema + visible nav on every page. Sitemap split by NODE. `llms.txt` at root groups all pages by NODE with one-line descriptions.

---

## 5. SEED Page Model

Every SEED follows the same semantic skeleton. This is where LLM citation and Google rankings are won.

**Above the fold:**
1. H1 — exact primary keyword.
2. Definitional lede — one sentence grounding the entity (Koray first-paragraph entity binding).
3. Interactive builder (React island) — form + live preview + export bar (PDF / DOCX / Copy HTML / Open in Google Docs).
4. Pre-made static download block — instant DOCX + PDF + Google Docs link for skimmers.
5. Breadcrumb — ROOT › NODE › SEED.

**Guide body (what LLMs cite):**
6. What is a [template]? — expanded definition, entity attributes.
7. When to use a [template]? — 6-10 real use cases.
8. What a [template] must include — required fields explained with reasoning.
9. [Template] variants — links to all sub-SEEDs, 1-line description of when each applies (moat).
10. Step-by-step: how to fill out — HowTo schema.
11. Common mistakes / legal gotchas.
12. Worked example — realistic filled-out example (not Lorem Ipsum, not John Doe).
13. FAQ — 8-12 questions, FAQPage schema (sourced from GSC + PAA + Reddit/forum scrape).
14. Related templates — hand-curated (frontmatter `related:`), not algorithmic.
15. Sources & references — real citations with URLs (gov.uk, IRS, state legislature, Cornell LII, EU europa.eu, AU ATO).
16. Author box — SunnyPatel entity with `sameAs` (LinkedIn, Twitter, Clutch, Wikidata).
17. Last-updated date + update log.

**Minimum word counts (hard floor):**
- SEED main: 1,800 words
- Sub-SEED variant: 1,200 words
- NODE hub: 2,500 words
- Guide: 2,500 words

**Schema stack per page:** `Article`, `HowTo`, `FAQPage`, `SoftwareApplication`, `BreadcrumbList`, `Person`, `Organization`. `ItemList` added on NODE pages.

**Sub-SEED difference:** same skeleton, but "What it must include" is variant-specific (California law vs. UK law vs. Harvard format vs. ATS format). Canonical points to self. Internal-links up + laterally (see §4.4).

---

## 6. Interactive Builder Component

One reusable React island `<TemplateBuilder>` driven by JSON schema. No per-template custom code — all logic in the schema.

### 6.1 Schema example

```json
{
  "slug": "bill-of-sale",
  "title": "Bill of Sale Template",
  "sections": [
    {
      "id": "parties",
      "heading": "Parties",
      "fields": [
        { "id": "seller_name", "label": "Seller full name", "type": "text", "required": true },
        { "id": "buyer_name", "label": "Buyer full name", "type": "text", "required": true },
        { "id": "state", "label": "State/Country", "type": "select", "options": "us_states+uk", "drivesVariant": true }
      ]
    },
    {
      "id": "item",
      "heading": "Item being sold",
      "fields": [
        { "id": "description", "type": "textarea", "required": true },
        { "id": "vin", "type": "text", "showIf": "item_type == 'vehicle'" },
        { "id": "price", "type": "currency", "required": true }
      ]
    }
  ],
  "renderer": "legal-document",
  "governingData": { "lookupBy": "state", "source": "data/legal/bill-of-sale-state-rules.json" }
}
```

### 6.2 Component tree

```
<TemplateBuilder schema={schema}>
  <BuilderForm />       // sections, fields, progress bar, left pane
  <BuilderPreview />    // live rendered document, right pane
  <BuilderExports />    // PDF, DOCX, Copy HTML, Google Docs, Print — sticky bottom on mobile
</TemplateBuilder>
```

### 6.3 Five renderer variants

1. `legal-document` — formal, serif, numbered clauses, signature block.
2. `resume` — Harvard / modern ATS-safe switchable.
3. `invoice` — branded, line items table, totals, tax.
4. `letter` — formal layout, sender/recipient/date blocks.
5. `list-plan` — for lesson plans, itineraries, budgets, checklists.

### 6.4 Field types

`text`, `textarea`, `number`, `currency`, `date`, `select`, `multi-select`, `checkbox`, `file` (logo upload), `signature` (canvas draw), `repeater` (line items).

### 6.5 Conditional logic

`showIf` / `requiredIf` expressions against form state via a lightweight expression parser (not `eval`).

### 6.6 Export pipeline (client-side only)

- PDF — `jspdf` + `jspdf-autotable` (structured, not rasterised).
- DOCX — `docx` npm library.
- HTML copy — Clipboard API, styled HTML preserves formatting in Word / Google Docs.
- Google Docs — maintained master docs in Drive; `https://docs.google.com/document/d/{ID}/copy?title={userInput}` URL scheme.
- Print — `window.print()` + print-only CSS.

### 6.7 UX

- Form state in `localStorage` — progress preserved across visits.
- URL query string sync for key fields (shareable filled-in templates = viral loop).
- No account required.
- Email capture modal on first export click: "Email me a copy too?" — StaticForms → list.
- Bundle: builder code dynamically imported (`client:visible`) — zero impact on initial LCP.
- WCAG 2.1 AA: keyboard nav, ARIA labels, live region for preview updates, reduced-motion.

---

## 7. Data Layer

### 7.1 Structure

```
src/data/
├── legal/
│   ├── bill-of-sale-state-rules.json           # 50 US states + UK/Scot/Wales/NI
│   ├── bill-of-sale-fields-required.json
│   ├── lor-conventions.json
│   ├── resignation-letter-notice-periods.json
│   └── doctors-note-legal-by-country.json
├── resume/
│   ├── ats-keywords-by-industry.json           # 25 industries × top 30 keywords
│   ├── format-rules-by-country.json
│   ├── harvard-format.json
│   └── industry-action-verbs.json
├── invoice/
│   ├── tax-rules-by-country.json
│   ├── required-fields-by-jurisdiction.json
│   └── late-payment-interest-rates.json
├── obituary/
│   ├── tradition-structure.json
│   └── newspaper-pricing-uk-us.json
├── lesson-plan/
│   ├── uk-national-curriculum.json
│   ├── us-common-core.json
│   ├── ib-programme.json
│   └── gcse-spec.json
├── birth-plan/
│   ├── uk-nhs-structure.json
│   └── us-hospital-structure.json
├── countries.json, us-states.json, uk-regions.json
└── sources.json                                # master citation registry
```

### 7.2 Shape example

```json
{
  "ca": {
    "state": "California",
    "slug": "california",
    "notary_required": false,
    "witness_required": false,
    "required_fields": ["date", "seller", "buyer", "item", "price", "vin_if_vehicle"],
    "governing_statute": "CA Commercial Code § 2401",
    "statute_url": "https://leginfo.legislature.ca.gov/...",
    "vehicle_dmv_form": "REG 135",
    "last_verified": "2026-04-22",
    "notes": "Odometer disclosure required for vehicles <10 years old."
  }
}
```

### 7.3 Feeds pages

- `/bill-of-sale/california/` — entire page generated from `ca` key. No templated filler. Every variant page demonstrably different.
- `/bill-of-sale/` main SEED auto-generates a 54-row comparison table from the same file — featured-snippet magnet.
- Data also drives builder conditional logic (`if state == 'ca' and item_type == 'vehicle', require odometer field`).

### 7.4 Freshness protocol

- Each entry has `last_verified` date rendered on the page.
- Monthly GitHub Actions cron runs link-check on all source URLs. Broken links → GitHub issue.
- Yearly full re-verification pass on all legal/tax data (calendar reminder).

---

## 8. Monetisation (phased, milestone-gated)

### Phase 1 — Launch → month 3: affiliate + email capture

- Contextual affiliate blocks **per NODE** (not per SEED — less spammy, fewer disclosures).
  - Legal → Rocket Lawyer, LegalZoom, DocuSign (US) + Farillio, LawBite (UK).
  - Resumes → Teal, Kickresume, Zety, Enhancv, LinkedIn Premium.
  - Business → FreshBooks, Wave, QuickBooks, Xero, Zoho Invoice.
  - Planning/Productivity → Notion, ClickUp, Todoist, Monday.com.
  - Design → Canva Pro, Adobe Express, CapCut Pro.
  - Education → Teachers Pay Teachers, Twinkl, Planbook.
  - Life events → Legacy.com partner, Ancestry, MyHeritage.
- Placement: one "Need something more advanced?" block below builder + one honest comparison table in guide. No inline affiliate links in body copy.
- FTC disclosure at top of any affiliate section (16 CFR Part 255).
- Email capture via StaticForms modal on first export — incentive: "Email me this + the top 10 most-used templates pack".

### Phase 2 — Month 3+, at ~20k sessions/mo: ads

- Apply AdSense → Ezoic once approved.
- Placement: one sidebar + one in-content between guide sections + one below FAQ. Not on builder pane. Not on homepage initially.
- Skip Mediavine until 50k sessions/mo.

### Phase 3 — Month 6+, ~1k email subs: digital products

- "Small Business Bundle: 30 templates" £19 one-time.
- Industry packs: "Freelancer Starter Pack" £14, "UK Landlord Pack" £19, "US Realtor Pack" £24.
- Delivered via LemonSqueezy (ClearNote stack).
- 2-3% list conversion at £19.

### Phase 4 — Month 9+: custom draft service

- "Custom legal document drafted £49, 48h" — forwarded to Rocket Lawyer / LegalZoom affiliate or manual fulfilment.

### Tracking

- Every affiliate link UTM-tagged and wrapped in `/go/{partner}` internal redirect for click tracking + link swap without content edits.
- GA4 events: `builder_started`, `field_filled`, `export_clicked` (type), `affiliate_click`, `email_captured`, `bundle_purchased`.

### Anti-patterns (explicit)

- No login walls.
- No dark patterns (fake urgency, forced email before export).
- No subscriptions.

---

## 9. Tech Stack

- **Astro 5** static build, React islands for builder only.
- **Cloudflare Pages** on `sunnypat81` account, project `template-how`.
- **GitHub auto-deploy** from `sunnyp81/template-how`, `main` → prod, `preview` → staging.
- **Build:** `npm run build`, output `dist`.
- **Content Collections** for templates / variants / nodes / guides / blog.
- **Client-side generators:** `docx` (DOCX), `jspdf` + `jspdf-autotable` (PDF), Clipboard API, `window.print()`.
- **OG image generation:** Satori at build time per page.
- **Analytics:** GA4 via BaseLayout with cookie consent (`process_ga4_astro_sites` pattern).
- **IndexNow** push on deploy.
- **StaticForms** key `sf_9e906eb6c00416b9d3354749` for email capture.
- **Env vars in CF:** `STATICFORMS_KEY`, `GA4_ID`, `INDEXNOW_KEY`.
- **Weekly rebuild:** GitHub Actions cron Mon 06:00 UTC — refreshes dates, runs link-check, regenerates sitemap.

### Directory layout

```
src/
├── content/
│   ├── templates/        # one JSON per SEED
│   ├── variants/         # sub-SEED data per state/country/industry
│   ├── nodes/            # NODE hub metadata
│   ├── guides/           # editorial MDX
│   └── blog/             # MDX
├── components/
│   ├── builders/         # React islands per renderer family
│   ├── layouts/          # BaseLayout, NodeLayout, SeedLayout, VariantLayout, GuideLayout
│   ├── content/          # TemplateBlock, CopyButton, DocxDownload, PdfDownload, GoogleDocsCopy
│   ├── schema/           # JSON-LD components
│   └── ui/               # Nav, Footer, Breadcrumb, RelatedTemplates, EmailCapture, AuthorBox, SourceList
├── data/                 # per-state laws, per-country rules, ATS keywords, etc.
├── lib/                  # docx gen, pdf gen, clipboard helpers, expression parser, link-graph validator
└── styles/
    └── tokens.css        # design tokens (colours, fonts, spacing, radii)
```

---

## 10. Brand & Design System

### 10.1 Identity

- **Wordmark** logo designed pre-dev (week 0). Single accent colour, neutral scale, display font + text font.
- **Direction:** editorial + utilitarian — Stripe docs + Notion marketing + Vercel templates. Restrained, confident, text-first. The opposite of template.net's cluttered ad-farm look.
- **Type:** display serif (Fraunces or Source Serif) for headlines; geometric sans (Inter or Geist) for body. Line-height 1.6 body, generous whitespace.
- **No stock imagery.** Custom inline SVG illustrations + bold typographic blocks. Minimum 2 SVGs per page (dwell time + featured snippet eligibility).
- **Dark mode** — system-preference aware.
- **Favicon + OG** — designed, not default. OG image template via Satori: display font, branded background, page H1, illustration slot.

### 10.2 Component library

Shared: `Nav`, `Footer`, `Breadcrumb`, `SeedHero`, `BuilderShell`, `GuideSection`, `FAQ`, `RelatedGrid`, `AuthorBox`, `SourceList`, `EmailCapture`, `CTA`. Every page composed from these; no per-page bespoke CSS.

### 10.3 Builder UI

Premium feel: subtle shadows, smooth transitions, monospace field values, real-time preview with doc-paper styling (shadow, margins), export button bar sticky-bottom on mobile.

### 10.4 Performance budget

- LCP < 1.5s
- CLS < 0.05
- INP < 100ms
- Lighthouse green on every page
- Enforced at build time via `lighthouse-ci` on representative sample pages.

### 10.5 Microcopy tone

Helpful, dry, confident, never salesy. *"Download as DOCX"* — not *"Grab your free DOCX now!"* The brand is a quietly competent assistant.

---

## 11. Quality Gates (anti-AI-slop)

### 11.1 Mandatory human edit pass

AI drafts are starting drafts only. Editor rewrites lede, injects voice markers, removes predictable AI tells. **Banned opener/word list:** "In today's fast-paced world", "Navigating the complexities of", "delve", "unlock", "game-changer", "seamlessly", "robust", "leverage", "tapestry", "journey". Voice check is built into `/semantic-audit`.

### 11.2 First-person / named-expert voice

SunnyPatel as named author. Bio box with real credentials, LinkedIn link. First-person where it adds insight ("I've reviewed hundreds of bills of sale — the most common mistake is…"). Algorithmic authorship signal.

### 11.3 Unique micro-details per page (hard minimums)

Each SEED must include at least:
- One realistic worked example (not Lorem / John Doe).
- One specific gotcha with cited source.
- One data point (statute cite, IRS rule, ATS percentage, ONS stat).
- One expert-tip boxout.

These cannot be duplicated across pages.

### 11.4 No templated H2s across pages

H2 structure follows a pattern but wording is written per page. This is the direct lesson from `calculator.place` Mar 2026 Core Update demotion.

### 11.5 Automated gates at build time

- `/semantic-audit` score ≥85 per page — build fails otherwise.
- Voice fingerprint: sentence-length variance, paragraph variance, vocabulary entropy — flags AI-flat rhythm.
- Internal link orphan check: every page ≥3 incoming internal links — build fails otherwise.
- Lighthouse CI green on sample.
- Rich Results Test validates schema on deploy.
- `pre-completion-validation` skill invoked on every deploy (per `feedback_pre_completion_validation`).

---

## 12. Launch Scope (Phase 0 — day 1 to week 4)

**Target: 80 SEED pages + 8 NODE hubs + homepage + core guides.**

Final 80 SEED list pulled from CSV against DR ≤25 & volume ≥3k (176 candidates). Provisional breakdown:

- Legal (12): bill of sale, letter of recommendation, resignation letter, doctors note, eviction notice, promissory note, NDA, power of attorney, lease agreement, employment contract, loan agreement, demand letter.
- Resumes / careers (10): resume, CV, cover letter, harvard resume, ATS resume, google-docs resume, modern resume, simple resume, two-column resume, entry-level resume.
- Business ops (12): invoice, receipt, profit and loss, gantt chart, meeting minutes, business plan, one pager, letterhead, purchase order, quote/estimate, timesheet, expense report.
- Life events (8): obituary, family tree, birth plan, wedding invitation, funeral program, save the date, baby shower invitation, last will.
- Planning (10): lesson plan, travel itinerary, budget, vision board, weekly schedule, daily schedule, monthly calendar, meal plan, wedding planner, event timeline.
- Design / creative (8): storyboard, newspaper, wanted poster, capcut, meme, roblox shirt, tier list, discord bio.
- Education (8): cornell notes, venn diagram, worksheet, syllabus, report card, flashcard, study schedule, reading log.
- Productivity (12): to-do list, checklist, grocery list, habit tracker, kanban board, chore chart, contact list, inventory, reading list, goal tracker, project tracker, daily planner.

### Scope cuts (explicit YAGNI)

- No sub-SEED variants at launch (added month 2-3 once main SEEDs indexing).
- No blog at launch (added month 2).
- 5 builder renderers only (`legal-document`, `resume`, `invoice`, `letter`, `list-plan`). Design / creative templates launch with static download + copy only; builders for those in Phase 2.

### Milestone gates

- **Week 4:** 80 SEEDs + 8 NODEs + homepage live, all `/semantic-audit` ≥85, all in sitemap, submitted to GSC (sunnypat81) + Bing + IndexNow.
- **Month 2:** +80 sub-SEED variants. Blog starts (2 posts/week).
- **Month 3:** traffic check → apply AdSense if ≥20k sessions. First digital bundle live if email list ≥500.
- **Month 6:** 300+ SEEDs across long-tail.

---

## 13. Deployment & Operations

### 13.1 Deployment

- Repo `sunnyp81/template-how`, CF Pages project `template-how` on `sunnypat81`.
- DNS: apex + `www` → CF Pages (CNAME flattening).
- Weekly rebuild cron Mon 06:00 UTC → date refresh, data verification, sitemap regen.
- On deploy: IndexNow push for changed URLs; GSC sitemap ping.

### 13.2 Day-one SEO (per `launch-seo` skill)

- GSC + Bing verify on both `gsc-sunnypat81` (primary) and `gsc-2012infinite` (secondary).
- Portfolio backlinks from SunnyPatel.co.uk + AgenticAI Associates + 2-3 other owned sites.
- Canonical tags, `robots.txt`, `sitemap.xml` (split if >50k URLs), `llms.txt`.
- OG image per SEED auto-generated via Satori.
- Schema validated with Rich Results Test on first deploy.

### 13.3 Weekly operations

- **Mon:** GSC pull → CTR-rewrite candidates (max 20 pages/week, never on >500-page site — `feedback_ctr_rewrite_guard`). Once template.how >500 pages, CTR rewrites scoped to specific queries only.
- **Wed:** data freshness link-check cron; broken source URL → issue.
- **Fri:** new SEED batch deployed (target 20/week post-launch).

---

## 14. Risk Registry

| Risk | Mitigation |
|---|---|
| AI-generated content demotion (Mar 2026 Core Update) | Unique-data moat + mandatory human edit pass + voice-fingerprint check |
| Template.net / Canva outranking | Per-state / per-country / per-industry variants they don't have |
| Legal / tax data going stale | Monthly link-check + yearly full re-verify + `last_verified` rendered on page |
| Affiliate link rot | `/go/{partner}` internal redirect wrapper |
| Builder bundle size (DOCX + PDF libs) | Dynamic import (`client:visible`), loaded only on demand |
| Orphaned pages damaging topical authority | Build-time graph walker fails build if any page has <3 incoming links |
| Thin pages | Minimum word counts enforced at build + `/semantic-audit` ≥85 gate |
| Google Docs master-file rot | Monthly cron checks each master doc is reachable |

---

## 15. Open Questions (to resolve before implementation plan)

1. Brand name confirmation — is "template.how" the display name or does it get a wordmark label (e.g., "Template")?
2. Accent colour direction — neutral-warm (paper/off-white + navy) vs. neutral-cool (white + indigo) vs. high-contrast (black + amber)?
3. Email provider — stay on StaticForms for capture then export to a list tool (Mailchimp / ConvertKit / Resend), or integrate direct?
4. Gmail integration for export-copy-email — is the `gmail.send` scope reauth from `feedback_gmail_email_delivery.md` done, or do we avoid sending from template.how and stick to "email me a copy" = deliverable?
5. Final 80-SEED launch list — I pull and rank against CSV in the plan phase.

---

## 16. Terminal state

Invoke `writing-plans` skill to break this design into phased implementation tasks after user approval of this spec.
