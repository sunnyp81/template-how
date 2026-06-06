---
name: "Topical Map 01 — Legal documents + Business/finance hubs"
description: "Research + architecture for the legal-document-templates and business-templates hubs on template.how. Specific-document long-tail strategy (KD≤20), builder-backed, US+UK. Volumes/KD are estimates unless tagged from the Jun 6 2026 Ahrefs pull; flagged in Data gaps."
date: "2026-06-06"
author: "Sunny Patel (research pass)"
strategyLocked: "2026-06-06 — go wide at specific-document level, skip brand/head terms, target KD≤20"
status: "DRAFT topical map — not finished pages. Do not author SEED markdown from this until wave priorities confirmed."
---

# Topical map: Legal & Finance clusters

This document maps the full realistic specific-document universe for two hubs:

1. **`legal-document-templates`** — binding agreements, notices, contracts, IP, estate, employment paperwork.
2. **`business-templates`** — financial statements, invoicing/billing, formation, operations, comms.

Every page is builder-backed: crawlable static explanation + live React TemplateBuilder + PDF/DOCX (XLSX where the doc is a spreadsheet) export + finished-doc preview + sources/legal notes + examples + common mistakes + jurisdiction variants where intent diverges.

**Renderer enum:** `legal-document | resume | invoice | letter | list-plan | static-only`
**Audience enum:** `us`, `uk`

**Volume/KD provenance:** rows tagged `[A]` use the Jun 6 2026 Ahrefs US+GB pull supplied in the brief. All other numbers are **estimates** (`[est]`) from SERP inspection + analogous-term reasoning — see [Data gaps](#7-data-gaps) before building. No precise metric here should be treated as Ahrefs-verified unless tagged `[A]`.

The line between the two hubs: **legal-document-templates owns the binding instrument** (contract, deed, notice, will); **business-templates owns the operational/financial artefact** (invoice, statement, plan, report). Where a document straddles (e.g. independent contractor agreement vs. an invoice for the same engagement), it lives in legal and cross-links to business.

---

## HUB 1 — `legal-document-templates`

### 1.1 Hub thesis

This cluster owns the **binding-instrument long-tail**: the specific named documents a US or UK person searches when they need a legally operative form right now — bill of sale, lease, NDA, will, power of attorney, promissory note, cease and desist. Each document is its own SERP with template-download intent and low-to-mid KD because the incumbents are generic form-mills (eForms, LawDepot, legaltemplates.net) that publish thin, US-only, non-builder pages. We win by being genuinely dual-jurisdiction (US state + UK nation), builder-backed, and statute-cited. We go wide at the document level and deep (variant child pages) only where local law materially diverges (vehicle bills of sale, leases, evictions, wills, POAs).

### 1.2 Document table

> `status` EXISTING = already a live seed (extend, do not duplicate). NEW = build. Volumes are combined-intent estimates for the canonical term unless `[A]`.

| slug | primaryKeyword | est US vol | est GB vol | est KD | renderer | audience | search intent | status | consolidation notes |
|---|---|---|---|---|---|---|---|---|---|
| bill-of-sale | bill of sale template | 40000 `[A]` | 300 `[A]` | 4–7 `[A]` | legal-document | us, uk | template/download | **EXISTING** | already has 54 jurisdiction variants; canonical for "free bill of sale", "car/vehicle/boat/firearm bill of sale" sub-intents as on-page sections + item-type builder field |
| lease-agreement | lease agreement template | 19000 `[A]` | 300 `[A]` | 12 `[A]` | legal-document | us, uk | template/download | **EXISTING** | canonical for "residential lease", "apartment lease", "free lease"; rental-agreement is a SEPARATE intent (month-to-month) — see below |
| rental-agreement | rental agreement template | 4800 `[A]` | 400 `[A]` | 16 `[A]` | legal-document | us, uk | template/download | **NEW** | distinct short-term/month-to-month intent; collapse "month to month rental agreement", "room rental agreement", "free rental agreement". Cross-links lease-agreement; do NOT merge (different SERP) |
| eviction-notice | eviction notice template | 9000 `[est]` | 1200 `[est]` | 14 `[est]` | legal-document | us, uk | template/download | **EXISTING** | canonical for "notice to quit", "3-day notice", "pay or quit", UK "section 21 / section 8 notice" as variant sections |
| nda | nda template | 4800 `[A]` | 700 `[A]` | 7 `[A]` | legal-document | us, uk | template/download | **EXISTING** | canonical for "non-disclosure agreement", "mutual NDA", "confidentiality agreement"; mutual vs one-way as builder toggle |
| last-will | last will and testament template | 5400 `[A]` | 500 `[A]` | 16 `[A]` | legal-document | us, uk | template/download | **EXISTING** | canonical for "will template", "free will" (4.6k/1.8k KD20 `[A]`); UK Wills Act vs US state holographic rules as variant sections |
| letter-of-recommendation | letter of recommendation template | 34000 `[A]` | — | 8 `[A]` | letter | us, uk | template/sample | **EXISTING** | canonical for "reference letter", "recommendation letter" |
| doctors-note | doctors note template | — | — | — | letter | us, uk | template | **EXISTING** | UK "fit note" vs US "doctor's note" as sections |
| promissory-note | promissory note template | 7100 `[A]` | 200 `[A]` | 14 `[A]` | legal-document | us, uk | template/download | **NEW** | collapse "free promissory note", "loan promissory note", "demand/installment promissory note" (builder term-type toggle); cross-link loan-agreement |
| loan-agreement | loan agreement template | 4400 `[est]` | 1600 `[est]` | 15 `[est]` | legal-document | us, uk | template/download | **NEW** | collapse "personal loan agreement", "family loan agreement", "money lending agreement". Distinct from promissory-note (bilateral contract vs unilateral IOU) — cross-link, don't merge |
| power-of-attorney | power of attorney template | 12000 `[est]` | 4000 `[est]` | 18 `[est]` | legal-document | us, uk | template/download | **NEW** | high-value, jurisdiction-heavy. Collapse "general/durable/medical POA"; UK "lasting power of attorney (LPA)" is a near-separate intent — handle as prominent UK section + consider its own page later (see jurisdiction strategy) |
| independent-contractor-agreement | independent contractor agreement template | 6000 `[est]` | 1500 `[est]` | 16 `[est]` | legal-document | us, uk | template/download | **NEW** | SERP confirmed strong template intent (Wise/Deel/Lawdistrict). Collapse "freelance contract", "contractor agreement", "consultant agreement"; cross-link nda + invoice |
| employment-contract | employment contract template | 5000 `[est]` | 6000 `[est]` | 18 `[est]` | legal-document | us, uk | template/download | **NEW** | UK-skewed (statutory written statement of particulars, Employment Rights Act 1996). Collapse "contract of employment", "job contract"; US at-will offer-letter sits adjacent |
| offer-letter | job offer letter template | 4000 `[est]` | 1200 `[est]` | 14 `[est]` | letter | us, uk | template/sample | **NEW** | listed in node seeds but no seed file yet → BUILD. Collapse "employment offer letter", "job offer email"; cross-link employment-contract |
| resignation-letter | resignation letter template | 12000 `[est]` | 9000 `[est]` | 15 `[est]` | letter | us, uk | template/sample | **NEW** | listed in node seeds, no file → BUILD. Collapse "two weeks notice letter", "notice letter", "immediate resignation letter" |
| cease-and-desist-letter | cease and desist letter template | 6000 `[est]` | 700 `[est]` | 12 `[est]` | letter | us, uk | template/download | **NEW** | SERP confirmed (eForms/Docusign/LawDepot). Distinct from demand-letter (stop behaviour vs request payment) — cross-link, separate pages |
| demand-letter | demand letter template | 5000 `[est]` | 400 `[est]` | 13 `[est]` | letter | us, uk | template/download | **NEW** | "letter before action / letter before claim" is the UK equivalent intent — handle as UK section. Collapse "demand for payment letter" |
| operating-agreement | LLC operating agreement template | 9000 `[est]` | — | 12 `[est]` | legal-document | us | template/download | **NEW** | listed in node seeds, no file → BUILD. US-only (LLC concept). Collapse "single-member / multi-member operating agreement"; UK equivalent = articles of association (own row in business hub or here) |
| llc-operating-agreement-single-member | single member llc operating agreement | 3000 `[est]` | — | 10 `[est]` | legal-document | us | template/download | **NEW** | judgment call: could be a builder toggle on operating-agreement. Recommend MERGE into operating-agreement as member-count field unless data shows distinct SERP — flag in data gaps |
| quitclaim-deed | quitclaim deed template | 8000 `[est]` | — | 16 `[est]` | legal-document | us | template/download | **NEW** | US-only (deed concept; UK uses TR1/Land Registry). State-recording rules → strong variant candidate |
| affidavit | affidavit template | 7000 `[est]` | 1000 `[est]` | 17 `[est]` | legal-document | us, uk | template/download | **NEW** | collapse "general affidavit", "sworn statement", "affidavit of identity"; UK "statement of truth / witness statement" as section |
| power-of-attorney-revocation | revocation of power of attorney template | 800 `[est]` | 300 `[est]` | 6 `[est]` | legal-document | us, uk | template | **NEW** | thin-ish but real and clean builder-fit; cross-link power-of-attorney. Low priority |
| codicil | codicil to will template | 1500 `[est]` | 600 `[est]` | 8 `[est]` | legal-document | us, uk | template | **NEW** | will-amendment; cross-link last-will; UK execution rules mirror Wills Act |
| living-will | living will template | 6000 `[est]` | 800 `[est]` | 16 `[est]` | legal-document | us, uk | template/download | **NEW** | advance directive. US "living will / advance directive" vs UK "advance decision / living will" — both real, handle as sections. Cross-link last-will |
| prenuptial-agreement | prenuptial agreement template | 5000 `[est]` | 1500 `[est]` | 18 `[est]` | legal-document | us, uk | template/download | **NEW** | collapse "prenup template"; UK "pre-nuptial / pre-nup" (Radmacher) as section. Higher KD — wave 3 |
| separation-agreement | separation agreement template | 4000 `[est]` | 2500 `[est]` | 17 `[est]` | legal-document | us, uk | template/download | **NEW** | UK-skewed. Collapse "marital separation agreement"; distinct from divorce forms (signpost, don't build court forms) |
| child-travel-consent | child travel consent form template | 3000 `[est]` | 1500 `[est]` | 9 `[est]` | legal-document | us, uk | template/download | **NEW** | "parental consent to travel", "minor travel consent letter". Clean builder-fit, low KD, evergreen. Cross-link travel-itinerary (planning) |
| photo-release-form | photo release form template | 4000 `[est]` | 600 `[est]` | 11 `[est]` | legal-document | us, uk | template/download | **NEW** | "model release form", "photography release". Collapse model/photo release; cross-link design hub |
| liability-waiver | liability waiver template | 5000 `[est]` | 700 `[est]` | 13 `[est]` | legal-document | us, uk | template/download | **NEW** | "release of liability", "hold harmless agreement", "waiver form". Collapse all three onto canonical with type toggle |
| hold-harmless-agreement | hold harmless agreement template | 2500 `[est]` | 200 `[est]` | 12 `[est]` | legal-document | us, uk | template | **NEW** | judgment: candidate to MERGE into liability-waiver. Recommend section on liability-waiver unless SERP distinct — flag |
| partnership-agreement | partnership agreement template | 4500 `[est]` | 2000 `[est]` | 16 `[est]` | legal-document | us, uk | template/download | **NEW** | "business partnership agreement", "general partnership agreement". UK Partnership Act 1890 vs US RUPA as sections; cross-link operating-agreement |
| service-agreement | service agreement template | 4000 `[est]` | 2500 `[est]` | 17 `[est]` | legal-document | us, uk | template/download | **NEW** | "services contract", "master service agreement / MSA". Collapse; cross-link independent-contractor-agreement + invoice |
| sublease-agreement | sublease agreement template | 5000 `[est]` | 800 `[est]` | 14 `[est]` | legal-document | us, uk | template/download | **NEW** | "sublet agreement". Cross-link lease-agreement; US state + UK consent-to-sublet sections |
| roommate-agreement | roommate agreement template | 4000 `[est]` | 1500 `[est]` | 8 `[est]` | legal-document | us, uk | template | **NEW** | UK "house share / tenancy agreement between flatmates", "lodger agreement". Low KD, builder-fit; cross-link lease-agreement |
| lodger-agreement | lodger agreement template | 200 `[est]` | 2500 `[est]` | 9 `[est]` | legal-document | uk | template/download | **NEW** | UK-specific (excluded occupier / Rent a Room). Distinct from roommate-agreement (UK rent-a-room intent) — keep separate, cross-link |
| eviction-notice would already cover notice-to-quit | — | — | — | — | — | — | — | — | (covered by eviction-notice row above; no separate page) |
| guarantor-agreement | guarantor agreement template | 800 `[est]` | 2000 `[est]` | 11 `[est]` | legal-document | us, uk | template | **NEW** | UK rental-guarantor heavy; cross-link lease-agreement. Wave 3 |
| deed-of-gift | deed of gift template | 600 `[est]` | 1500 `[est]` | 10 `[est]` | legal-document | uk, us | template | **NEW** | UK-skewed (gifting assets, IHT context). Cross-link last-will |
| change-of-name-deed | deed poll template | 500 `[est]` | 6000 `[est]` | 12 `[est]` | legal-document | uk | template/download | **NEW** | UK "deed poll" is huge GB intent (name change). US equivalent is court petition — keep UK-primary, US signpost. Strong low-competition GB play |
| codicil covered above | — | — | — | — | — | — | — | — | (dedupe) |

**Document count (Hub 1):** 35 distinct canonical rows after dedupe → **11 EXISTING/seed-listed, 24 NEW** (counting offer-letter, resignation-letter, operating-agreement as NEW builds since no seed file exists yet; single-member-operating-agreement and hold-harmless flagged as probable merges).

### 1.3 Consolidation rules (Hub 1)

General rules applied to every row:

1. **`free X` + `X` + `X template` + `X form` + `printable X` → ONE canonical page.** Never a separate "free" page. The word "free" is a modifier, not an intent.
2. **`google docs / word / pdf` format modifiers → on-page export buttons + a "formats" section, never separate pages.** (Exception: where a *brand* term has its own established SERP, e.g. invoice-google-docs in Hub 2 — already EXISTING.)
3. **`uk` modifier → UK section + jurisdiction toggle on the canonical, not a separate page**, UNLESS the UK document is a legally distinct instrument (deed poll, lodger agreement, LPA) where the UK term is the primary intent — then UK gets the canonical and US is signposted.
4. **Document sub-types that are builder toggles, not pages:** mutual vs one-way (nda), durable vs general (power-of-attorney), demand vs installment (promissory-note), single- vs multi-member (operating-agreement), residential vs commercial (lease).
5. **Near-synonyms that share a SERP collapse to one page:** reference letter → letter-of-recommendation; sworn statement → affidavit; release of liability + hold harmless → liability-waiver; model release → photo-release-form; deed poll + change of name → change-of-name-deed.
6. **Near-synonyms that have DISTINCT SERPs stay separate (cross-linked):** lease vs rental-agreement; promissory-note vs loan-agreement; cease-and-desist vs demand-letter; roommate vs lodger; partnership-agreement vs operating-agreement.

### 1.4 Jurisdiction / variant strategy (Hub 1)

Variant child pages (the `variants` collection, like bill-of-sale's 54) are expensive and only justified where **local statute materially changes the document's required content or execution**, AND the per-jurisdiction term has its own search demand. Apply this test:

| Parent seed | Variant strategy | Rationale |
|---|---|---|
| bill-of-sale | **EXISTING — 54 US + UK nations.** Keep. | Notarisation/witness rules diverge per state (FL §319.22 etc.); per-state vehicle bill-of-sale searches are real. |
| lease-agreement | **US states (10–15 highest-pop) + 4 UK nations.** | CA/NY/TX tenant protections, deposit rules, England AST vs Scotland PRT vs Wales/NI diverge sharply; per-state lease searches exist. |
| eviction-notice | **US states (notice periods 3–60 days) + UK section 8 / section 21 / Scotland / NI.** | Notice period + grounds are statutory and per-jurisdiction; high variant search demand. |
| power-of-attorney | **US states + UK LPA (split England/Wales vs Scotland vs NI).** | POA execution + registration (UK LPA via OPG) is jurisdiction-defining. Strong variant case; possibly the next "bill-of-sale-scale" variant build. |
| last-will | **US states (holographic validity, witness count) + UK nations.** | Wills Act 1837 (E&W) vs Scotland vs NI; ~half of US states allow holographic. Variant-worthy. |
| quitclaim-deed | **US states (recording + transfer tax).** US-only. | Deed recording is county/state-specific; strong per-state intent. |
| living-will / advance-directive | **US states + UK advance decision.** | Statutory forms vary per US state (some mandate a specific form). |
| change-of-name-deed | **UK nations only.** | UK deed poll; US is a court process (signpost, no variants). |
| rental-agreement, sublease, prenup, separation, partnership, service-agreement | **No variant pages initially — jurisdiction handled as on-page US/UK sections.** | Demand for per-state variants is thin; revisit if Ahrefs shows per-jurisdiction volume. |

**Recommendation:** after bill-of-sale, the highest-ROI variant builds are **power-of-attorney** and **lease-agreement**, because per-jurisdiction divergence is large AND per-jurisdiction search demand is demonstrable.

### 1.5 Internal linking plan (Hub 1)

Contract: every seed needs `related` ≥4 (same hub) + `crossCluster` ≥1 (other hub); every page must receive ≥3 incoming internal links (validated by `linkGraph.ts`). Wiring:

- **Hub → seed:** the `legal-document-templates` node lists seeds in frontmatter; every NEW seed must be added to that node's `seeds:` array so the hub links down (1 guaranteed incoming link each). Update node `seeds` list when each wave ships.
- **Seed → seed:** each NEW page links to 4+ topically-adjacent legal seeds (below). Reciprocity ensures ≥3 incoming for all.
- **Cross-cluster:** each links to ≥1 business-templates slug (invoice-google-docs, profit-and-loss-statement, operating-agreement-as-business, balance-sheet) so the two hubs interlink.

Per-NEW-page link sets (`related` then `crossCluster`):

| NEW page | related (same hub) | crossCluster (Hub 2) |
|---|---|---|
| rental-agreement | lease-agreement, eviction-notice, sublease-agreement, roommate-agreement | invoice-google-docs |
| promissory-note | loan-agreement, bill-of-sale, nda, demand-letter | invoice-google-docs |
| loan-agreement | promissory-note, nda, bill-of-sale, guarantor-agreement | balance-sheet |
| power-of-attorney | last-will, living-will, codicil, affidavit | meeting-minutes |
| independent-contractor-agreement | nda, service-agreement, employment-contract, offer-letter | invoice-google-docs |
| employment-contract | offer-letter, independent-contractor-agreement, resignation-letter, nda | meeting-minutes |
| offer-letter | employment-contract, resignation-letter, letter-of-recommendation, nda | meeting-minutes |
| resignation-letter | offer-letter, employment-contract, letter-of-recommendation, doctors-note | meeting-minutes |
| cease-and-desist-letter | demand-letter, nda, affidavit, photo-release-form | press-release |
| demand-letter | cease-and-desist-letter, promissory-note, loan-agreement, affidavit | invoice-google-docs |
| operating-agreement | partnership-agreement, nda, service-agreement, independent-contractor-agreement | balance-sheet |
| quitclaim-deed | bill-of-sale, deed-of-gift, affidavit, power-of-attorney | profit-and-loss-statement |
| affidavit | power-of-attorney, last-will, demand-letter, child-travel-consent | meeting-minutes |
| codicil | last-will, living-will, power-of-attorney, affidavit | profit-and-loss-statement |
| living-will | last-will, power-of-attorney, codicil, affidavit | meeting-minutes |
| prenuptial-agreement | separation-agreement, last-will, loan-agreement, affidavit | balance-sheet |
| separation-agreement | prenuptial-agreement, last-will, child-travel-consent, affidavit | balance-sheet |
| child-travel-consent | affidavit, power-of-attorney, separation-agreement, photo-release-form | invoice-google-docs |
| photo-release-form | liability-waiver, nda, cease-and-desist-letter, child-travel-consent | press-release |
| liability-waiver | hold-harmless-agreement, photo-release-form, service-agreement, nda | invoice-google-docs |
| partnership-agreement | operating-agreement, nda, service-agreement, loan-agreement | balance-sheet |
| service-agreement | independent-contractor-agreement, nda, partnership-agreement, liability-waiver | invoice-google-docs |
| sublease-agreement | lease-agreement, rental-agreement, roommate-agreement, eviction-notice | invoice-google-docs |
| roommate-agreement | lease-agreement, rental-agreement, sublease-agreement, lodger-agreement | invoice-google-docs |
| lodger-agreement | roommate-agreement, lease-agreement, rental-agreement, sublease-agreement | invoice-google-docs |
| guarantor-agreement | lease-agreement, loan-agreement, rental-agreement, promissory-note | balance-sheet |
| deed-of-gift | last-will, codicil, quitclaim-deed, power-of-attorney | balance-sheet |
| change-of-name-deed | affidavit, last-will, power-of-attorney, separation-agreement | letterhead |
| power-of-attorney-revocation | power-of-attorney, affidavit, last-will, codicil | meeting-minutes |

All EXISTING seeds (bill-of-sale, nda, lease-agreement, etc.) should have a few of their `related` arrays extended to point at the new pages so incoming-link counts stay ≥3 — note this as an edit pass when each wave ships (do NOT rewrite their bodies).

### 1.6 Build priority (Hub 1)

Ranked by (volume × builder-fit ÷ KD), and "fills an obvious gap in an EXISTING node seed list":

- **Wave 1 (build first — high vol, low KD, clean builder-fit, node-seed gaps):** resignation-letter, offer-letter, operating-agreement (all three are already in node `seeds` but have no file — fix the orphan first), promissory-note `[A]`, rental-agreement `[A]`, power-of-attorney.
- **Wave 2:** independent-contractor-agreement, loan-agreement, cease-and-desist-letter, demand-letter, quitclaim-deed, affidavit, child-travel-consent, liability-waiver, living-will.
- **Wave 3:** employment-contract, partnership-agreement, service-agreement, sublease-agreement, roommate-agreement, prenuptial-agreement, separation-agreement, photo-release-form, change-of-name-deed (UK play), codicil.
- **Wave 4 (thin / niche — only after data confirms):** lodger-agreement, guarantor-agreement, deed-of-gift, power-of-attorney-revocation, single-member-operating-agreement (likely merge), hold-harmless-agreement (likely merge).

---

## HUB 2 — `business-templates`

### 2.1 Hub thesis

This cluster owns the **operational + financial artefact long-tail**: the documents a small business, sole trader, freelancer, or LLC produces to get paid, report numbers, run formally, and communicate. The wins are invoicing/billing variants (receipt, purchase order, estimate, quote, credit note), the financial statements (P&L, balance sheet, cash flow), and formation/ops paperwork. KD is low because incumbents are spreadsheet-mill and accounting-SaaS landing pages, US-only and rarely builder-backed with real export. We differentiate with dual-market tax framing (HMRC VAT / MTD vs IRS Schedule C), genuine XLSX/PDF export, and statute-grounded explanations.

### 2.2 Document table

| slug | primaryKeyword | est US vol | est GB vol | est KD | renderer | audience | search intent | status | consolidation notes |
|---|---|---|---|---|---|---|---|---|---|
| invoice-google-docs | invoice template google docs | 7900 `[A]` | 900 `[A]` | 3 `[A]` | invoice | us, uk | template/download | **EXISTING** | brand-format SERP (kept deliberately). Canonical for the google-docs invoice intent |
| invoice | invoice template | (head) | (head) | ~48 `[A]` borderline | invoice | us, uk | template/download | **NEW (cautious)** | head term KD48 borderline per strategy. Build only as the canonical that absorbs format variants below; lead with low-KD long-tails. Flag: validate KD before committing |
| invoice-word | invoice template word | 4300 `[A]` | 2900 `[A]` | 7 `[A]` | invoice | us, uk | template/download | **NEW** | strong GB volume, low KD. Format-specific SERP like google-docs. Cross-link invoice-google-docs |
| invoice-uk | invoice template uk | 250 `[A]` | 4800 `[A]` | 12 `[A]` | invoice | uk | template/download | **NEW** | UK-primary intent (VAT invoice fields, HMRC 700/12). Distinct GB SERP — keep separate from US canonical |
| receipt | receipt template | 15000 `[A]` | 2300 `[A]` | 16 `[A]` | invoice | us, uk | template/download | **NEW** | high vol. Collapse "free receipt", "cash receipt", "rent receipt", "payment receipt" (builder type toggle). Cross-link invoice |
| rent-receipt | rent receipt template | 5000 `[est]` | 1200 `[est]` | 9 `[est]` | invoice | us, uk | template/download | **NEW** | judgment: distinct rental SERP. Keep separate from generic receipt, cross-link both receipt + lease-agreement |
| purchase-order | purchase order template | 6600 `[A]` | 1500 `[A]` | 1 `[A]` | invoice | us, uk | template/download | **NEW** | KD1 — top priority. Collapse "PO template", "free purchase order"; cross-link invoice + estimate |
| estimate | estimate template | 3200 `[A]` | 250 `[A]` | 1 `[A]` | invoice | us, uk | template/download | **NEW** | KD1. Collapse "free estimate", "job estimate", "work estimate". Distinct from quote? US uses "estimate", UK uses "quote" — see quote row |
| quote | quotation template | 2000 `[est]` | 6000 `[est]` | 10 `[est]` | invoice | us, uk | template/download | **NEW** | UK-primary ("quote/quotation"). Largely the same artefact as estimate; recommend ONE builder, TWO canonical pages (estimate=US-primary, quote=UK-primary) cross-linked — flag for SERP check |
| credit-note | credit note template | 1500 `[est]` | 3000 `[est]` | 8 `[est]` | invoice | uk, us | template/download | **NEW** | UK-skewed (VAT credit note). Collapse "credit memo" (US term). Cross-link invoice |
| profit-and-loss-statement | profit and loss statement template | 11000 `[A]` | 400 `[A]` | 5 `[A]` | static-only | us, uk | template/download | **EXISTING** | canonical for "P&L", "income statement". XLSX export |
| balance-sheet | balance sheet template | 5600 `[A]` | 700 `[A]` | 0 `[A]` | static-only | us, uk | template/download | **EXISTING** | KD0. Canonical for "balance sheet", micro-entity format |
| cash-flow-statement | cash flow statement template | 6000 `[est]` | 1500 `[est]` | 12 `[est]` | static-only | us, uk | template/download | **NEW** | completes the 3-statement set. Collapse "cash flow forecast/projection" as a builder mode. Cross-link P&L + balance-sheet |
| income-statement | (→ P&L) | — | — | — | — | — | — | **MERGE** | synonym of profit-and-loss-statement; on-page section + redirect intent, no page |
| expense-report | expense report template | 8000 `[est]` | 1500 `[est]` | 9 `[est]` | static-only | us, uk | template/download | **NEW** | high vol, low KD, XLSX-fit. Collapse "expense sheet", "business expense template". Cross-link P&L |
| mileage-log | mileage log template | 4000 `[est]` | 1200 `[est]` | 8 `[est]` | static-only | us, uk | template/download | **NEW** | IRS mileage / HMRC approved rates. Clean XLSX builder. Cross-link expense-report |
| budget-template | business budget template | 6000 `[est]` | 1500 `[est]` | 14 `[est]` | static-only | us, uk | template/download | **NEW** | collapse "small business budget", "startup budget". Distinct from personal budget (could be planning hub) — scope to business |
| pay-stub | pay stub template | 12000 `[est]` | — | 16 `[est]` | invoice | us | template/download | **NEW** | US "pay stub / paystub / check stub". UK equivalent = payslip (separate row). Cross-link expense-report |
| payslip | payslip template | 300 `[est]` | 9000 `[est]` | 12 `[est]` | invoice | uk | template/download | **NEW** | UK-primary (huge GB intent). Statutory itemised pay statement (Employment Rights Act 1996 s.8). Keep separate from US pay-stub, cross-link |
| timesheet | timesheet template | 14000 `[est]` | 4000 `[est]` | 11 `[est]` | static-only | us, uk | template/download | **NEW** | high vol. Note: brief lists timesheet as a productivity-hub concept — confirm hub ownership; recommend business hub for the *billing* timesheet, cross-link productivity. Collapse "weekly/biweekly/monthly timesheet" as builder period toggle. **Flag hub-ownership** |
| meeting-minutes | meeting minutes template | — | — | — | static-only | us, uk | template | **EXISTING** | keep; canonical for "minutes of meeting", "board minutes" |
| meeting-notes | meeting notes template | 6000 `[est]` | 1500 `[est]` | 9 `[est]` | static-only | us, uk | template | **NEW** | in node seeds, no file → BUILD. Distinct from minutes (informal). Cross-link meeting-minutes |
| memo | memo template | 9000 `[est]` | 1200 `[est]` | 13 `[est]` | letter | us, uk | template | **NEW** | in node seeds, no file → BUILD. Collapse "business memo", "memorandum" |
| letterhead | letterhead template | 14000 `[est]` | 2500 `[est]` | 17 `[est]` | static-only | us, uk | template/download | **NEW** | in node seeds, no file → BUILD. Companies Act 2006 required fields (UK). Cross-link memo |
| press-release | press release template | 7200 `[A]` | 800 `[A]` | 5 `[A]` | static-only | us, uk | template/format | **NEW** | in node seeds, no file → BUILD. Low KD, good vol. Collapse "press release format/example" |
| business-plan | business plan template | 30000 `[est]` | 8000 `[est]` | 22 `[est]` | static-only | us, uk | template/download | **NEW** | high vol but KD ~22 (just over the ≤20 line). Build cautiously, lead with long-tails ("simple/one-page business plan"). Flag KD |
| executive-summary | executive summary template | 5000 `[est]` | 1500 `[est]` | 13 `[est]` | static-only | us, uk | template/example | **NEW** | in node seeds, no file → BUILD. Cross-link business-plan + project-proposal |
| project-proposal | project proposal template | 6000 `[est]` | 1800 `[est]` | 15 `[est]` | static-only | us, uk | template/download | **NEW** | in node seeds, no file → BUILD. Collapse "business proposal" (overlapping SERP — flag) |
| business-proposal | business proposal template | 9000 `[est]` | 2500 `[est]` | 17 `[est]` | static-only | us, uk | template/download | **NEW** | judgment: overlapping with project-proposal. Recommend keep separate (sales-doc vs scope-doc intent) but cross-link heavily — flag SERP overlap |
| marketing-plan | marketing plan template | 8000 `[est]` | 2000 `[est]` | 18 `[est]` | static-only | us, uk | template/download | **NEW** | in node seeds, no file → BUILD. Collapse "marketing strategy template" |
| seo-report | seo report template | 1500 `[est]` | 600 `[est]` | 10 `[est]` | static-only | us, uk | template | **NEW** | in node seeds, no file → BUILD. Niche but builder-fit + author-relevant (Sunny is SEO consultant) |
| one-page-business-plan | one page business plan template | 4000 `[est]` | 1000 `[est]` | 12 `[est]` | static-only | us, uk | template/download | **NEW** | lower-KD entry into the business-plan SERP; cross-link business-plan |
| swot-analysis | swot analysis template | 18000 `[est]` | 4000 `[est]` | 16 `[est]` | static-only | us, uk | template/download | **NEW** | high vol, strong builder-fit (2×2 grid). Collapse "swot template", "swot matrix". Cross-link marketing-plan + business-plan |
| gantt-chart | gantt chart template | 14000 `[est]` | 3000 `[est]` | 18 `[est]` | list-plan | us, uk | template/download | **NEW** | high vol but planning-hub adjacent — **flag hub ownership** (project mgmt). Builder-heavy. Possibly defer to planning hub |
| org-chart | org chart template | 12000 `[est]` | 2500 `[est]` | 18 `[est]` | static-only | us, uk | template/download | **NEW** | "organizational chart". Builder-fit. Cross-link business-plan |
| articles-of-association | articles of association template | 200 `[est]` | 3000 `[est]` | 11 `[est]` | legal-document | uk | template/download | **NEW** | UK Ltd formation (model articles). UK-primary; the UK counterpart to US operating-agreement. Cross-link operating-agreement (legal hub) |
| invoice-receipt covered | — | — | — | — | — | — | — | — | (covered by receipt) |
| nondisclosure → legal hub | — | — | — | — | — | — | — | — | (lives in legal-document-templates) |

**Document count (Hub 2):** 36 rows after dedupe/merges → **5 EXISTING (invoice-google-docs, profit-and-loss-statement, balance-sheet, meeting-minutes — plus partial credit for node-seed-listed shells), 28 NEW** distinct pages (income-statement merges into P&L; invoice head term flagged cautious).

### 2.3 Consolidation rules (Hub 2)

1. **Same `free X` / format / `printable` rules as Hub 1.**
2. **Financial-statement synonyms merge:** income statement → profit-and-loss-statement; credit memo → credit-note; check stub → pay-stub.
3. **Format-brand SERPs stay separate** only where Ahrefs shows a real distinct SERP: invoice-google-docs (`[A]` exists), invoice-word (`[A]`), invoice-uk (`[A]`). All other invoice format modifiers (excel, pdf, blank) → export buttons on the canonical `invoice` page.
4. **Period modifiers are builder toggles, not pages:** weekly/biweekly/monthly timesheet; monthly/annual budget; cash flow forecast vs statement.
5. **US/UK terminology pairs that are the same artefact but different primary markets get TWO cross-linked canonicals** (because each term owns its national SERP): estimate (US) / quote (UK); pay-stub (US) / payslip (UK); expense report (shared); operating-agreement (US, legal hub) / articles-of-association (UK, here).
6. **Type sub-intents collapse with a builder toggle:** receipt (cash/rent/payment/sales) — but rent-receipt kept separate due to distinct rental SERP volume.

### 2.4 Jurisdiction / variant strategy (Hub 2)

Business/finance documents are governed by **two tax regimes (HMRC vs IRS), not 50+ states**, so this hub uses **on-page US/UK sections, NOT `variants` child pages**. Rationale: a balance sheet's format differs by IRS vs Companies House, but there is no meaningful per-US-state divergence and no per-state search demand. The dual-market split is handled by:

- a jurisdiction toggle in the builder (currency, VAT vs sales-tax fields, date format), and
- US/UK explanatory sections (e.g. invoice: HMRC 700/12 VAT fields vs US state sales-tax disclosure).

**No variant child pages recommended for Hub 2.** The only quasi-jurisdictional pages are the deliberately separate UK-primary canonicals (invoice-uk, payslip, credit-note, quote, articles-of-association) which are their own seeds, not variants.

### 2.5 Internal linking plan (Hub 2)

Same contract: `related` ≥4 (Hub 2), `crossCluster` ≥1 (Hub 1 legal), ≥3 incoming each. Add every NEW seed to the `business-templates` node `seeds:` array (1 guaranteed incoming).

| NEW page | related (same hub) | crossCluster (Hub 1) |
|---|---|---|
| invoice | invoice-google-docs, invoice-word, receipt, estimate | independent-contractor-agreement |
| invoice-word | invoice, invoice-google-docs, invoice-uk, receipt | service-agreement |
| invoice-uk | invoice, invoice-word, credit-note, payslip | service-agreement |
| receipt | invoice, rent-receipt, purchase-order, expense-report | bill-of-sale |
| rent-receipt | receipt, invoice, expense-report, balance-sheet | lease-agreement |
| purchase-order | invoice, estimate, receipt, quote | service-agreement |
| estimate | quote, invoice, purchase-order, project-proposal | independent-contractor-agreement |
| quote | estimate, invoice, purchase-order, project-proposal | service-agreement |
| credit-note | invoice, invoice-uk, receipt, balance-sheet | demand-letter |
| cash-flow-statement | profit-and-loss-statement, balance-sheet, budget-template, expense-report | loan-agreement |
| expense-report | mileage-log, profit-and-loss-statement, budget-template, receipt | independent-contractor-agreement |
| mileage-log | expense-report, profit-and-loss-statement, timesheet, budget-template | independent-contractor-agreement |
| budget-template | profit-and-loss-statement, cash-flow-statement, business-plan, balance-sheet | loan-agreement |
| pay-stub | timesheet, expense-report, payslip, balance-sheet | employment-contract |
| payslip | pay-stub, timesheet, expense-report, invoice-uk | employment-contract |
| timesheet | pay-stub, payslip, expense-report, meeting-notes | independent-contractor-agreement |
| meeting-notes | meeting-minutes, memo, project-proposal, executive-summary | nda |
| memo | meeting-notes, letterhead, press-release, meeting-minutes | offer-letter |
| letterhead | memo, press-release, invoice, business-plan | nda |
| press-release | letterhead, marketing-plan, executive-summary, business-plan | cease-and-desist-letter |
| business-plan | one-page-business-plan, executive-summary, marketing-plan, swot-analysis | operating-agreement |
| executive-summary | business-plan, project-proposal, marketing-plan, press-release | partnership-agreement |
| project-proposal | business-proposal, executive-summary, estimate, marketing-plan | service-agreement |
| business-proposal | project-proposal, executive-summary, estimate, marketing-plan | service-agreement |
| marketing-plan | business-plan, swot-analysis, executive-summary, seo-report | nda |
| seo-report | marketing-plan, project-proposal, executive-summary, meeting-notes | service-agreement |
| one-page-business-plan | business-plan, executive-summary, swot-analysis, marketing-plan | operating-agreement |
| swot-analysis | business-plan, marketing-plan, org-chart, one-page-business-plan | partnership-agreement |
| gantt-chart | org-chart, project-proposal, business-plan, marketing-plan | service-agreement |
| org-chart | swot-analysis, business-plan, gantt-chart, meeting-notes | operating-agreement |
| articles-of-association | balance-sheet, letterhead, meeting-minutes, business-plan | operating-agreement |

EXISTING seeds (invoice-google-docs, P&L, balance-sheet, meeting-minutes) get `related` extended toward new pages when each wave ships (edit frontmatter only).

### 2.6 Build priority (Hub 2)

- **Wave 1 (KD0–5, high vol, builder-fit, node-seed gaps):** purchase-order `[A]` (KD1), estimate `[A]` (KD1), press-release `[A]` (KD5), receipt `[A]`, invoice-word `[A]`, expense-report. Plus fill node-seed orphans: meeting-notes, memo, letterhead, executive-summary, project-proposal, marketing-plan, seo-report (already in node `seeds`, no files).
- **Wave 2:** cash-flow-statement, swot-analysis, invoice-uk `[A]`, quote, rent-receipt, mileage-log, budget-template, one-page-business-plan.
- **Wave 3:** timesheet (resolve hub ownership first), pay-stub, payslip, credit-note, org-chart, business-proposal, articles-of-association.
- **Wave 4 (KD-flagged / hub-contested):** invoice (head KD48 — only if data supports), business-plan (KD~22), gantt-chart (likely planning hub).

---

## Cross-hub wiring summary

- **legal → business** anchor links: independent-contractor-agreement/service-agreement → invoice + estimate; operating-agreement/partnership-agreement → balance-sheet + business-plan; loan-agreement/promissory-note → cash-flow-statement; demand-letter → invoice/credit-note.
- **business → legal** anchor links: invoice/estimate → independent-contractor-agreement + service-agreement; rent-receipt → lease-agreement; pay-stub/payslip → employment-contract; articles-of-association → operating-agreement; press-release → cease-and-desist-letter.
- The two node pages already cross-reference each other in their "Related categories" sections — keep that.

---

## 7. Data gaps

Rows/decisions where real Ahrefs/SERP data should be pulled **before building**. Everything not tagged `[A]` is an estimate.

**Volume/KD estimates needing verification (all `[est]` rows):** power-of-attorney, loan-agreement, independent-contractor-agreement, employment-contract, offer-letter, resignation-letter, cease-and-desist-letter, demand-letter, operating-agreement, quitclaim-deed, affidavit, living-will, prenuptial-agreement, separation-agreement, child-travel-consent, photo-release-form, liability-waiver, partnership-agreement, service-agreement, sublease-agreement, roommate-agreement, lodger-agreement, guarantor-agreement, deed-of-gift, change-of-name-deed (Hub 1); and in Hub 2: rent-receipt, quote, credit-note, cash-flow-statement, expense-report, mileage-log, budget-template, pay-stub, payslip, timesheet, meeting-notes, memo, letterhead, business-plan, executive-summary, project-proposal, business-proposal, marketing-plan, seo-report, one-page-business-plan, swot-analysis, gantt-chart, org-chart, articles-of-association.

**Specific decisions blocked on data:**
1. **invoice head term** — confirm KD (brief says ~48 borderline). If genuinely ≥45, do NOT build as a primary target; rely on invoice-google-docs/word/uk long-tails. Decision gate.
2. **business-plan KD ~22** — just over the ≤20 ceiling. Verify; if >25, lead exclusively with one-page-business-plan and other long-tails.
3. **estimate vs quote** — confirm these are two national SERPs (US estimate / UK quotation) vs one. If overlap is high, merge to one canonical with a UK section.
4. **project-proposal vs business-proposal** — confirm distinct SERPs before building both; otherwise merge.
5. **single-member-llc-operating-agreement** and **hold-harmless-agreement** — likely merges into operating-agreement and liability-waiver respectively; confirm there is no standalone SERP before spending a page on each.
6. **Hub-ownership conflicts:** timesheet and gantt-chart overlap the planning/productivity hubs (the brief lists timesheets/sign-in sheets as productivity-cluster). Resolve ownership before building so we don't create competing internal pages. Recommendation: billing/payroll-framed timesheet → business hub; project-schedule gantt → planning hub.
7. **power-of-attorney variant scale** — if per-state/LPA search volume is confirmed strong, this is the next bill-of-sale-scale variant build; pull per-jurisdiction data first.
8. **doctors-note / eviction-notice** existing seeds had no volume tagged in the brief — pull current numbers when extending.
