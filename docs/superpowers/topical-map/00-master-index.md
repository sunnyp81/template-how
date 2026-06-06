---
name: template.how — master topical map & build roadmap
description: Synthesis of the four hub topical maps + the design system spec (Jun 6 2026). Single source of truth for what to build, in what order, and the cross-cutting fixes that unblock it.
date: 2026-06-06
type: project
---

# template.how — master topical map (Jun 6 2026)

This index stitches together the four per-cluster topical maps and the design
spec produced on Jun 6. Strategy of record: **go wide at the specific-document
level, low-KD (≤20) long-tail, builder-backed, source-verified, US + UK**
(see `[[template-how-strategy-jun6]]`). Head terms are navigation only, never
acquisition targets.

## The maps
| # | File | Hubs | Documents | New |
|---|------|------|-----------|-----|
| 1 | [01-legal-finance.md](./01-legal-finance.md) | legal-document-templates · business-templates | 71 | ~52 |
| 2 | [02-career-education.md](./02-career-education.md) | resume-templates · education-templates | 80 | ~74 |
| 3 | [03-design-productivity.md](./03-design-productivity.md) | design-templates · productivity-templates | 63 | ~41 |
| 4 | [04-life-planning.md](./04-life-planning.md) | life-event-templates · planning-templates | 74 | ~68 |
| — | [../design/2026-06-06-design-system.md](../design/2026-06-06-design-system.md) | site-wide design system | — | — |

**~288 documents mapped across all 8 hubs**, ~32 live today. Every NEW row
carries: slug, primary keyword, est US/GB volume, est KD, renderer, audience,
intent, and a 4+ `related` / 1+ `crossCluster` linking plan satisfying the
≥3-incoming-link rule (`src/lib/linkGraph.ts`).

> **All volume/KD figures are estimates** except the Jun 6 Ahrefs US+GB pull
> (tagged in each map). Before building at scale, verify against the real CSVs.
> KD-near-ceiling terms (cv-template-uk, curriculum-vitae, apa/mla-format,
> mind-map, timeline, business/marketing-plan) may demote to on-page sections.

---

## Cross-cutting fix #1 — 51 dangling hub→seed links (do this first)

The 8 NODE hubs already list **51 seed slugs in their `seeds:` arrays that have
no seed page** — dead outbound links from live hubs and the de-facto build
backlog. Most map straight onto wave-1 targets below. Canonical reconciliations
flagged by the agents (build under the canonical slug, don't duplicate):

- `ats-resume` → **ats-friendly-resume** (exists) · `resume` → split into format pages · `two-week-notice`/`two-weeks-notice` → **two-weeks-notice** · `recommendation-letter` → **letter-of-recommendation** (exists) · `cover-letter` → keep **cover-letter-google-docs** as the platform doorway (do **not** silently merge — needs GSC cannibalisation check)
- `baby-announcement` → **birth-announcement** · `birthday-invite` → **birthday-invitation** · `meal-planning`/`meal-plan` → **meal-planner** · `timesheet`/`time-sheet` → **timesheet** · `weekly-planner`/`weekly-calendar` → distinct (planner vs calendar)
- True net-new, no page: resignation-letter, offer-letter, operating-agreement, press-release, executive-summary, letterhead, memo, meeting-notes, marketing-plan, project-proposal, seo-report, rental-agreement, promissory-note, discord-bio, storyboard, checklist, daily-planner, chore-chart, sign-in-sheet, sign-up-sheet, project-planner, birth-plan, federal-resume, simple-resume, google-docs-resume, graphic-organizer, soap-note, and the seasonal set (christmas-card, graduation-invitation, thank-you-card, all-about-me, jeopardy, newspaper, avery-5160, canva-resume).

Full reproducible list: compare `src/content/nodes/*.md` `seeds:` arrays against
`src/content/seeds/*.md`.

## Cross-cutting fix #2 — builder export-format gaps

Current builder exports **PDF / DOCX / print** only. The maps surfaced three
gaps that block ~20 pages from serving their true intent:
1. **XLSX / Google Sheets export** — finance & tracker docs (budgets, P&L sheets, expense/mileage/time trackers, google-sheets-calendar). ~9 terms.
2. **PNG / SVG export** — banner-size makers + the diagram family (venn, flowchart, org-chart, mind-map, gantt, storyboard).
3. **HTML / clipboard export** — email-signature and Discord bio (copy-paste, not a download).

Each map lists an interim mitigation so pages can rank before the gap closes,
but these are the builder's next engineering priorities.

## Cross-cutting fix #3 — design system (mobile-first)

Top 5 from [the design spec](../design/2026-06-06-design-system.md), in impact order:
1. **Self-host + subset fonts** with metric-matched fallbacks — kills the LCP `h1` swap-CLS and drops 2 third-party connections.
2. **Stacked builder + sticky Edit/Preview segmented toggle** (two-up only ≥960px) — solves the core mobile UX problem (form/preview can't sit side-by-side).
3. **Real mobile nav** — `Nav.astro` hides links under 860px with no hamburger; zero-JS `<details>` drawer fixes it.
4. **Fluid `clamp()` type scale** — fixed 60px `h1` overflows phones today.
5. **Lazy-load jspdf/docx** via dynamic `import()` on click — off the hydration path, big INP/TBT win.
Also: `lighthouserc.json` tests only `/` and a node page — **add a seed URL** so the builder's CWV is measured in CI.

---

## Unified build roadmap

### Wave 0 — already spec'd (Google Drive, ready to author)
5 career pages with full builder specs: `/letter-of-recommendation/` (exists),
`/reference-letter/`, `/cover-letter/`, `/resignation-letter/`, `/two-weeks-notice/`
(see `[[template-how-build-queue-jun6]]`).

### Wave 1 — highest volume × lowest KD × builder-fit (combined)
**Legal/finance:** resignation-letter, offer-letter, operating-agreement, promissory-note, rental-agreement, power-of-attorney · purchase-order (KD1), estimate (KD1), press-release (KD5), receipt, invoice-word, expense-report
**Careers/education:** google-docs-resume, chronological-resume, simple-resume, character-reference-letter · reading-log, rubric, permission-slip, certificate-of-achievement, thank-you-letter-after-interview, linkedin-summary
**Design/productivity:** email-signature, twitch-banner-size, youtube-banner-size, social-media-size-guide, discord-bio, storyboard · google-sheets-calendar (KD0), habit-tracker, meal-plan, checklist, daily-planner, chore-chart, sign-in-sheet, sign-up-sheet, meeting-agenda
**Life/planning:** eulogy, sympathy-card, birth-announcement, death-announcement, memorial-card, time-capsule, funeral-order-of-service (UK) · road-trip-itinerary, packing-list, travel-budget, daily-schedule, weekly-calendar, monthly-calendar, meal-plan, birth-plan, household-budget, monthly-budget, bucket-list, moving-checklist

Wave 1 ≈ **50 pages** and clears the bulk of the 51 dangling hub links.

### Sequencing recommendation
1. **Fix the orphans** — build the dangling slugs that are already linked from hubs (instant link-equity, no validator risk).
2. **Ship the cheap spec/gallery pages** (banner sizes, size guides) — fast wins while builders are authored.
3. **Author wave-1 builder docs** cluster by cluster.
4. **Land the design fixes** (fonts + mobile builder + nav) before driving traffic — they gate CWV and conversion on the majority-mobile audience.
5. **Close the export-format gaps** to unlock the finance/diagram/signature pages.
6. **The standing blocker:** submit the sitemap to GSC + Bing and run `npm run indexnow` — the site is live but invisible.

## US/UK variant strategy (consolidated)
- **Variant child pages** (the bill-of-sale 54-variant pattern) only where statute *and* per-jurisdiction demand justify it: lease, eviction, power-of-attorney, last-will, quitclaim-deed, living-will, change-of-name-deed. **Power-of-attorney is the next bill-of-sale-scale variant build.**
- **Two cross-linked national canonicals** where US/UK own separate SERPs: estimate/quote, pay-stub/payslip, operating-agreement/articles-of-association, resume/CV, funeral-program/order-of-service, seating-chart/table-plan, baptism/christening-invitation, vacation/holiday-itinerary.
- **Everything else:** single canonical with on-page US/UK sections + builder toggle.
- Watch the **UK "holiday" = vacation** trap (vs US "holiday" = Christmas).

## Open questions for the owner
- Verify estimated metrics against the real Ahrefs CSVs before scaling past wave 1.
- `cover-letter` vs existing `cover-letter-google-docs`: confirm no cannibalisation before building a second cover-letter page.
- `business-plan` / `marketing-plan` (KD ≥20): keep in the business hub or skip as too competitive?
- Builder export roadmap: which gap (XLSX / PNG / HTML) ships first?
