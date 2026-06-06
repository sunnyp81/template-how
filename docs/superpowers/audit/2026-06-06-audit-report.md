# template.how — QA / Audit Report

**Date:** 2026-06-06
**Auditor:** QA / audit lead (adversarial review)
**Branch:** `claude/affectionate-mccarthy-yVSvQ`
**Surface:** Mobile-first design system (b3bd5f1, b98fb56, c65f61e) + 40 wave-1 SEED pages (6ad3f37)

---

## Final gate status (after fixes)

| Gate | Status | Key line |
| --- | --- | --- |
| `npm run build` (+ postbuild `validate:links`) | 🟢 GREEN | `[link-graph] OK — 137 pages, all have ≥3 incoming links.` / `[build] 138 page(s) built` — no `SKIP_LINK_GRAPH` |
| `npm run typecheck` | 🟢 GREEN | `0 errors, 0 warnings, 11 hints` (hints are pre-existing `is:inline`/deprecated-zod, non-fatal) |
| `npm test` | 🟢 GREEN | `Test Files 11 passed (11)` / `Tests 38 passed (38)` |
| `npm run lint` | 🟢 GREEN | exit 0, no output |

OG images: **138 generated, 0 skipped.** Sitemap includes new URLs (spot-checked google-docs-resume, operating-agreement, two-weeks-notice, youtube-banner-size). Page count: 138 (98 + 40), one route is the `bill-of-sale/[variant]` sub-page so `index.html` count is 137 + variant.

**Issues fixed: ~30 files. Issues flagged (not fixed): see §G.**

---

## A. Gates
All four pass green after fixes (table above). Re-run twice — once after content/link fixes, once after the font + a11y code changes. No regressions introduced.

## B. Content schema & integrity (40 new pages + 8 nodes)

Validated all 40 new seeds with a YAML-parsing audit script (not regex) against `config.ts`:

- **faq 8–15:** all pass. (Earlier "faq count 0" reports were a regex-parser bug, not real — confirmed via YAML parse.)
- **howTo.steps ≥3:** all pass.
- **related ≥4 / crossCluster ≥1 / sources ≥1 / audience valid / renderer enum valid:** all pass.
- **crossCluster genuinely different hub:** FIXED 2 violations + 1 imperfection (see below).
- **no tab characters / no stray non-schema keys:** all clean.
- **updated/accessed = 2026-06-06:** all 40 new pages correct. (One pre-existing page, `family-tree`, carries `2026-04-23` — flagged, see §G.)
- **Word count:** spot-checked 6 pages by body-prose word count: google-docs-resume 1978, operating-agreement 1874, power-of-attorney 2113, eulogy 2122, meal-planner 2006, twitch-banner-size 2106. All clear the 1800 floor with genuine prose (google-docs-resume read in full — substantive, not padding).

### Dangling hub→seed references (the big production defect)

`NodeLayout.astro` (line 37-39) and `SeedLayout.astro` (related/crossCluster, lines 80-85) render **every** slug as a raw `<a href="/slug/">` with **no existence filtering**. Any slug in a node `seeds:` array or any page's `related`/`crossCluster` that lacks a seed file therefore renders as a **live dead link (404)** in production. This affected both the new pages and the pre-existing backlog.

**FIXED — repointed to canonical existing seeds:**

| Dangling slug | Repointed to |
| --- | --- |
| recommendation-letter | letter-of-recommendation |
| cover-letter | cover-letter-google-docs |
| ats-resume, resume | ats-friendly-resume |
| roblox | roblox-shirt |
| agenda | meeting-agenda |
| banner | twitch-banner-size |
| avery-5160 | avery-label |
| funeral-programme | funeral-program |
| death-notice | death-announcement |
| weekly-calendar, weekly-planner | weekly-schedule |
| daily-schedule | daily-planner |

**FIXED — removed (no canonical target exists; arrays backfilled from same-hub real seeds to keep `related` ≥4):**
graduation-invitation, thank-you-card, christmas-card, birthday-invite, birth-plan, project-proposal, executive-summary, marketing-plan, letterhead, memo, meeting-notes, seo-report, timesheet, project-planner, chore-chart, sign-up-sheet, sign-in-sheet, cv, federal-resume, canva-resume, newspaper, graphic-organizer, jeopardy, soap-note, all-about-me, flashcards, worksheet, linkedin-summary, leave-of-absence, reference-list, flyer.

**REMAINING DANGLING LIST: NONE.** A full YAML-parse re-scan reports **0 dangling references** across all node `seeds:`, all `related`, and all `crossCluster` arrays. Node `seeds:` arrays were also de-duplicated and stripped of any slug without a file. (28 content files touched.)

### crossCluster same-hub fixes
- `packing-list` & `road-trip-itinerary`: crossCluster was ONLY `travel-itinerary` (same hub = planning). **FIXED** — moved travel-itinerary into `related`, set crossCluster to `checklist` (productivity hub).
- `habit-tracker`: crossCluster had same-hub `vision-board` alongside valid cross-hub `capcut`. **FIXED** (cleanup) — moved vision-board to `related`, kept `capcut`.

## C. Source-URL validity (high priority)

Collected all 169 `sources[].url` (101 from new pages, 91 unique). Direct fetch (curl + WebFetch) is uniformly blocked by the sandbox proxy (every host returns 403, including google.com), so verification was done via **WebSearch** (confirms a URL is real, indexed, and live).

**Verified valid (sample of obscure/high-risk URLs):**
- `legislation.gov.uk/ukpga/Vict/45-46/61` = Bills of Exchange Act 1882 (correct for promissory-note). ✓
- `legislation.gov.uk/ukpga/1979/54` = Sale of Goods Act 1979 (correct for bill-of-sale family). ✓
- `leginfo.legislature.ca.gov/...sectionNum=1946` = CA Civil Code 1946, 30-day tenancy notice (correct for lease/rental). ✓
- `onlinelibrary.wiley.com/doi/abs/10.1002/ejsp.674` = Lally et al. 2010 "How are habits formed", EJSP 40:998 (correct DOI + citation for habit-tracker). ✓
- `studentprivacy.ed.gov/faq/what-ferpa` (permission-slip) ✓; `robertsrules.com` (meeting-agenda) ✓; `localfuneral.co.uk/...death-notice` (obituary) ✓.
- Twitch dimensions (1200×480 banner, 1920×1080 offline, 320px panels) and YouTube dimensions (2560×1440, 1546×423 safe area, 2048×1152 min) — factually correct against current platform docs.
- gov.uk / IRS / ACAS / SBA / CDC / support.google.com / support.microsoft.com paths are canonical, well-formed authoritative URLs.

**BROKEN / FABRICATED URLs found — 4, all SHRM (FIXED):** these were plausible-looking but non-existent SHRM paths (`/tools/hr-forms/...`, `/hr-answers/...`, `/employee-relations/how-to-write-...`). Repointed to WebSearch-confirmed live SHRM articles:

| Page | Old (broken) | New (verified) |
| --- | --- | --- |
| offer-letter | `/tools/hr-forms/offer-letter` | `/news/talent-acquisition/14-things-job-offer-letter-must-to-effective` |
| reference-letter | `/tools/hr-answers/how-to-write-letter-reference-employment` | `/news/organizational-employee-development/ask-hr-how-to-write-letter-of-recommendation` |
| resignation-letter | `/news/employee-relations/how-to-write-resignation-letter` | `/employment-law-compliance/next-steps-employee-gives-notice-quitting` |
| two-weeks-notice | `/news/employee-relations/how-to-resign-professionally` | `/news/organizational-employee-development/ask-hr-how-can-rescind-resignation` |

SHRM is a *secondary* US source on each of these pages (each also cites gov.uk/ACAS/CareerOneStop/Indeed for the core claims), so the repoint preserves authority. The resignation/two-weeks SHRM targets are slightly broader than the original intent but are verified-live and topically adjacent.

## D. SEO / cannibalization / schema

- **Resume family — NO cannibalization.** google-docs-resume / harvard-resume / ats-friendly-resume / chronological-resume / simple-resume each target a **distinct** primaryKeyword and a distinct search intent. No duplicate titles or keywords anywhere across the 40 new pages.
- **Meta titles:** 11 new pages exceed ~60 chars (61–71). Flagged, not changed (see §G) — rewriting risks shifting keyword targeting and the `— … (US + UK)` pattern is intentional branding.
- **definitionalLede / meta description:** present on all 40 pages.
- **JSON-LD (rendered dist HTML, spot-checked 4 new pages):** FAQPage (Question/Answer count matches faq), HowTo (HowToStep), BreadcrumbList (ListItem), SoftwareApplication, Organization — all present and well-formed.

## E. Accessibility & mobile (design system)

- **Mobile nav drawer** (`Nav.astro`): native `<details>`/`<summary>` — keyboard-operable with zero custom ARIA, `.sr-only` "Menu" label, 48px tap target, `:focus-visible` ring, Escape-closes-and-returns-focus, outside-click close, desktop inline override. ✓
- **Edit/Preview segmented toggle** (`TemplateBuilder.tsx`): native radio group, `role="radiogroup"` + `aria-label`, arrow-key operable. ✓
- **FIXED a11y defect (WCAG 4.1.2):** the inactive builder pane was given `aria-hidden` tied to `view` state. On desktop (≥960px) BOTH panes are visually shown (CSS overrides the mobile `display:none`), so the off-`view` pane (the preview by default) was `aria-hidden=true` while visible — hiding visible content from assistive tech. Removed the state-driven `aria-hidden`; mobile hiding via `display:none` already removes the inactive pane from the a11y tree correctly.
- **Form fields** (`FieldShell`/`TextField`): `<label htmlFor>` correctly associated; inputs `font-size: max(16px, …)` (no iOS zoom); 44px min-height tap targets; `:focus-visible` outlines; inferred inputmode/autocomplete hints. ✓
- **Skip-link** (`BaseLayout` → `#main`): off-screen, reveals on focus. ✓
- **reduced-motion:** honored in tokens.css. **focus-visible:** present in global.css + builder.css. ✓
- **AA contrast tokens:** fg navy-900 on paper-100 ≈18:1; fg-muted paper-700 ≈8.5:1; accent amber-600 (#B45309) ≈4.9:1 — all pass AA. Dark-mode tokens documented as AA. ✓

### Font self-hosting gating — FIXED (latent 404)

The preload was correctly gated on file existence (no `<link rel=preload as=font>` emitted, confirmed). **However** the self-hosted `@font-face { src: url(...woff2) }` rules lived in the always-bundled `fonts.css`, and the token font stacks list `'Inter'`/`'Fraunces'` first — so the browser **would** request `/fonts/*.woff2` and 404 (the woff2 files are not committed; none exist in `public/fonts/` or `dist/`). Non-blocking (`font-display: swap` → fallback renders), but a real wasted-request/console-404 contradicting the design intent.

**Fix:** moved the three web-font `@font-face src` rules out of `fonts.css` into a gated inline `<style>` (`SELF_HOSTED_FONT_FACE_CSS` in `src/lib/fonts.ts`), injected from `BaseLayout` only when `selfHostedFontsAvailable`. Verified in rebuilt `dist`: **no `.var.woff2` reference anywhere, no font preload, no Google Fonts request.** The page now renders entirely from metric-matched fallbacks with zero font fetches; dropping the real woff2 files into `public/fonts/` re-activates both the preload and the `@font-face` automatically.

## F. Build artifacts sanity
- 138 pages built. ✓
- 138 OG images generated, 0 skipped. ✓
- Sitemap includes new URLs. ✓
- No Google Fonts / no broken font preload / no font 404. ✓

---

## G. Flagged (NOT fixed — out of scope or judgment call)

| # | Item | Severity | Note |
| --- | --- | --- | --- |
| 1 | 11 new-page meta titles 61–71 chars (character-reference-letter 71, harvard-resume OK) | Low | Will truncate in SERP ~600px. Left as-is — rewriting risks keyword/brand targeting. Recommend a copy pass. |
| 2 | `family-tree.md` updated/accessed = `2026-04-23` (pre-existing page, touched by wave commit) | Low | Stale date on a live page. Pre-existing, not in the 40 — left untouched to avoid scope creep. |
| 3 | 32 pre-existing seed pages carry `2026-04-23` dates | Low | Not schema violations (schema accepts any date string); a freshness/consistency question for the pre-existing set. |
| 4 | Builder field `help` text not linked via `aria-describedby` | Low | Help is visually adjacent and inputs are labelled; minor enhancement, not a failure. |
| 5 | `NodeLayout`/`SeedLayout` render `related`/`seeds` with no existence guard | Medium (latent) | Root cause of dangling links. Fixed the *data* this pass; recommend a *render-time* filter (drop links to non-existent seeds) so future authoring mistakes can't ship dead links. |

---

## Top 3 follow-up recommendations
1. **Add a render-time existence guard** in `NodeLayout.astro` and `SeedLayout.astro`: filter `seeds`/`related`/`crossCluster` against the actual seeds collection before rendering links. This makes dangling references structurally impossible rather than relying on manual data hygiene — the link-graph validator only catches orphans/under-linking, not links to non-existent targets.
2. **Add a content-lint CI step** (the YAML-parse audit used here can be productionized): enforce faq 8–15, steps ≥3, related ≥4, crossCluster ≥1-in-different-hub, dates = build date, and zero dangling refs, failing the build on violation. This would have caught all of this pass's issues pre-merge.
3. **Drop the real subsetted woff2 files** into `public/fonts/` (Fraunces.var, Fraunces-Italic.var, Inter-roman.var) to actually realize the self-hosted-font performance/CLS win — the gating is now correct and will activate them with no code change. Until then the site ships fallback-only (which is fine, just not the intended typography).

## Honesty / limitations
- **URL verification was via WebSearch, not direct fetch** — the sandbox blocks all outbound HTTP (uniform 403). WebSearch confirms a URL is real/indexed/live but cannot prove a *specific deep path* returns 200 today. The 4 SHRM replacements are confirmed-real article slugs from search results; the resignation/two-weeks targets are topically adjacent rather than exact-intent matches.
- I sampled ~14 of 91 unique source URLs (prioritizing obscure/long/risky ones) plus validated all the gov/edu/platform canonical paths by inspection. The remaining standard authoritative URLs (gov.uk, irs.gov, support.google.com, etc.) were not individually fetched but follow correct, canonical path patterns.
- Accessibility was verified by reading components + built HTML, not by running an axe/screen-reader pass. The fixes address concrete code-level WCAG issues; a live AT pass is recommended before relying on full conformance.
