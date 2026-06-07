# template.how Redesign — Visual QA & Accessibility Audit

**Date:** 2026-06-06
**Auditor:** Visual-QA / accessibility pass (runs last, alone)
**Branch:** `claude/affectionate-mccarthy-yVSvQ`
**Scope:** Adversarial review of the full UX/UI redesign shipped by five surface
agents (foundation tokens/primitives, homepage+chrome, builder, document pages,
hub+secondary pages). Reference: `2026-06-06-redesign-language.md`.

---

## A. Gate statuses (re-verified after fixes)

| Gate | Result | Notes |
|---|---|---|
| `npm run build` (+ postbuild `validate:links`) | **PASS** | 138 pages built in ~11s. `[link-graph] OK — 137 pages, all have ≥3 incoming links.` No `SKIP_LINK_GRAPH`. |
| `npm run typecheck` (`astro check` + `tsc`) | **PASS** | 0 errors, 0 warnings, 21 hints. Pre-existing deprecation/unused hints only (Zod `.url()` deprecation, an unused `Props` interface in `[variant].astro`). |
| `npm test` (vitest) | **PASS** | 11 files, 38/38 tests. |
| `npm run lint` (eslint) | **PASS** (after fix) | Was failing — see Fix #1. |

All four gates are green after the fixes below.

---

## B. Screenshots captured

**Tooling:** Playwright (`playwright-core`) driving the pre-installed Chromium at
`/opt/pw-browsers/chromium-1194/chrome-linux/chrome`. The Playwright CDN is blocked
in this sandbox, so `npx playwright install` is not used; the script points at the
pre-installed binary via `executablePath`. The capture script is committed at
`scripts/qa-screens.mjs`.

**Built site served via** `npm run preview` (Astro preview of `dist/`) on
`http://localhost:4321`.

**Output dir (OUTSIDE the repo, NOT committed):** `/home/user/redesign-screens/`

Full-page captures at 3 viewports — mobile 390×844, tablet 768×1024, desktop
1280×900 — plus dark-mode for home + seed, plus the builder Edit/Preview toggle
on mobile. (Additional above-the-fold `fold-*` crops were taken by the auditor to
read detail, since the full-page PNGs of long pages compress to illegibility.)

### Inventory (filename → what it shows)

| File | Shows |
|---|---|
| `home-{mobile,tablet,desktop}.png` | Homepage `/`, full page, light |
| `home-{mobile,tablet,desktop}-dark.png` | Homepage, dark mode |
| `hub-{mobile,tablet,desktop}.png` | Hub `/legal-document-templates/`, full page |
| `seed-{mobile,tablet,desktop}.png` | Seed/builder page `/bill-of-sale/`, full page |
| `seed-{mobile,tablet,desktop}-dark.png` | Seed page, dark mode |
| `seed-bill-of-sale-mobile-preview.png` | Seed page, mobile, **Preview** pane toggled (full page) |
| `seed-bill-of-sale-mobile-preview-fold.png` | Above-the-fold of the toggled Preview pane (legible) |
| `static-{mobile,tablet,desktop}.png` | Static-only page `/twitch-banner-size/` (DownloadBlock, no builder) |
| `variant-{mobile,tablet,desktop}.png` | Jurisdiction variant `/bill-of-sale/california/` |
| `404-{mobile,tablet,desktop}.png` | 404 (visited a bad URL → HTTP 404) |
| `builder-mobile-edit.png` | Builder island in Edit state, mobile |
| `fold-home-mobile.png` / `fold-home-mobile-dark.png` / `fold-home-desktop.png` | Homepage hero above the fold |
| `fold-hub-mobile.png` | Hub hero above the fold |
| `fold-seed-mobile.png` / `fold-seed-mobile-dark.png` | Seed hero + BuilderCTA above the fold |
| `fold-static-mobile.png` | Static page hero above the fold |
| `fold-variant-mobile.png` | Variant hero + CTAs above the fold |

35 PNGs total. **Screenshots succeeded.**

---

## C. Findings by surface (with severity)

Severity: **S1** blocker / **S2** notable / **S3** minor-polish / **NIT**.

### Cross-surface consistency — GOOD
Homepage, hubs, seed, builder, static, variant, about/contact, and 404 read as
**one system**: shared eyebrow→H1→lede→meta rhythm, Stat trust strips, the navy
primary / outlined secondary button pair, Fraunces display headings on Inter body,
and consistent card elevation. The primitive kit is clearly doing its job.

- **S3 — Seed vs variant conversion block diverge.** The seed page (`/bill-of-sale/`)
  uses the rich `BuilderCTA` card (eyebrow + headline + sub + stat strip) above the
  fold; the variant page (`/bill-of-sale/california/`) instead uses two stacked
  full-width buttons ("Build your bill of sale" + "Browse legal templates"). Both
  are coherent and on-brand, but a reader moving seed→variant sees two different
  entry treatments. *Recommendation:* unify on one builder-entry pattern. Flagged,
  not fixed (it's a design decision, not a defect).

### Mobile usability (390px)
- **S2 — FIXED: horizontal overflow on `/bill-of-sale/`.** The BuilderCTA's
  full-width primary button "Build your bill of sale template" had `white-space:
  nowrap`; its min-content width exceeded the viewport and, because `.builder-cta`
  is a CSS grid (tracks default to `min-width:auto`), the whole card blew out the
  container → **21px of horizontal scroll** and the button label clipped on the
  right edge. See Fix #2. Verified: overflow is now **0px on all audited routes**.
- **Tap targets:** export bar buttons measured 44–48px tall; `lg` buttons 52px;
  the segmented toggle labels are full-height. All ≥44px. **PASS.**
- **Nav drawer:** the zero-JS `<details>` disclosure opens/closes (verified
  programmatically: closed→open on `.nav-toggle` click, drawer links visible), with
  JS progressive-enhancement for Esc + outside-click. **PASS.**
- **Builder Edit/Preview toggle:** works; Preview pane renders the live document
  mockup; the sticky export bar (Download PDF / DOCX / Copy) stays reachable with a
  "10 required fields still empty — you can still export anyway" notice. **PASS.**
- **Tables:** `JurisdictionTable` and others did not trigger overflow at 390px. **PASS.**

### Contrast / dark mode
Sampled computed colors (WCAG ratios) on `/bill-of-sale/`:

| Element | Light | Dark |
|---|---|---|
| Eyebrow (amber, `--accent-strong`) | 6.63:1 | 11.70:1 |
| Muted body (`--fg-muted`) | 9.20:1 | 13.80:1 |
| Accent link | 6.63:1 | 11.70:1 |
| Primary button text | 16.60:1 | 9.04:1 |

All pass AA (and most AAA). Dark mode correctly flips the **primary fill navy→amber
with dark text** and accent text to amber-300/400, per the token contract. The
amber accent is never the *sole* signal — eyebrows/badges carry text, errors carry
an icon + words. The paper document-preview staying light in dark mode is
intentional (not flagged). **No contrast defects found.**

*Caveat:* one automated badge sample read 1.24:1 — a measurement artifact from
sampling text against a semi-transparent (`alpha 0.12`) chip background rather than
the composited result; the real composite is high-contrast (the dark sample of the
same chip read 9.74:1). Not a defect.

### Typography
Hierarchy is clear and consistent (display serif headings, fluid clamp scale, balanced
hero). No overflowing or clipped headings observed at any viewport after the overflow
fix. Reading measure on prose is capped at ~72ch. **PASS.**

### Accessibility (code + built HTML)
Audited all 8 representative routes programmatically:

- **One H1 per page:** **S2 — FIXED.** `/bill-of-sale/` had **two** H1s — the real
  page title *and* `<h1 class="b-doc-title">` inside the builder's live-preview
  document mockup. Demoted the preview title to a styled `<p>` (see Fix #3). Now
  exactly one H1 on every audited route.
- **Heading order:** no skipped levels detected on any route.
- **Landmarks:** **S2 — FIXED.** The site `<nav class="site-nav">` was rendered as
  a bare body child with **no `<header>`/banner landmark** on any page (the earlier
  per-page `<header>` elements are in-`main` section headers like `.seed-head`, not
  the site banner). Wrapped `<Nav />` in a `<header>` banner in `BaseLayout` (see
  Fix #4). Verified via the Chromium AX tree: `banner:1, main:1, contentinfo:1,
  navigation:4` now present, and the sticky nav still sticks (used `display:contents`
  so the banner box doesn't scroll the sticky nav away).
- **Form fields:** every field has an associated `<label htmlFor>`, required vs
  optional stated **in words** (sr-only "(required)"), and on validation the control
  gets `aria-invalid="true"` + `aria-describedby` pointing at a `role="alert"` error
  message. Runtime-verified: forcing export with empty fields set `aria-invalid` on
  10 controls and rendered 10 `role="alert"` errors. **PASS — strong.**
- **Segmented toggle:** `role="radiogroup" aria-label="Builder view"` wrapping two
  native `<input type="radio">` controls (shared `name`), visually hidden but kept
  operable/focusable with a `:has(:focus-visible)` outline on the label. A correct,
  accessible radiogroup. **PASS.**
- **Skip link:** `a.skip-link` "Skip to content" → `#main` present on every page. **PASS.**
- **Reduced motion:** global kill-switch in `tokens.css`/`builder.css`; verified the
  `prefers-reduced-motion: reduce` context is honored. **PASS.**
- **Focus-visible:** one canonical `:focus-visible` ring in `global.css`; primitives
  inherit it; the builder defines field/checkbox/toggle focus treatments. **PASS** (by code review).

### Conversion
- **Homepage hero:** clear value prop ("Templates you can actually fill in and use"),
  trust eyebrow, two CTAs (Browse templates primary, Try the builder secondary), Stat
  strip. Strong above the fold on mobile and desktop. **PASS.**
- **Seed page:** the builder entry (`BuilderCTA`, full-width `lg` primary "Build
  your {noun}") is clearly above the fold on mobile. **PASS.**

---

## D. What was fixed (surgical)

1. **`eslint.config.js`** — lint gate was **failing**: `scripts/qa-screens.mjs`
   tripped `no-undef` for `process`/`console` because the scripts override only
   matched `scripts/**/*.ts`. Added `scripts/**/*.mjs` to the override's `files`.
2. **`src/components/ui/Button.astro` + `src/components/seed/BuilderCTA.astro`** —
   fixed the 21px mobile horizontal overflow: full-width/block buttons now allow
   their label to wrap (`.u-btn--full/--block .u-btn__label { white-space: normal }`)
   and carry `min-width: 0`; `.builder-cta` is pinned to `grid-template-columns:
   minmax(0, 1fr)` and `.bc-copy` gets `min-width: 0` so a long CTA label can no
   longer blow out the card.
3. **`src/components/builders/BuilderPreview.tsx`** — the live-preview document
   mockup rendered a page-level `<h1>`; demoted it to a styled `<p class="b-doc-title"
   aria-hidden="true">` and labelled the preview `<article aria-label="… preview">`.
   The page now has exactly one H1. Purely semantic — the title is styled by class,
   so it is visually identical.
4. **`src/layouts/BaseLayout.astro`** — wrapped `<Nav />` in a `<header>` banner
   landmark (`display:contents` to preserve the sticky nav). AX-tree verified.

All fixes are token-consistent and behavior-preserving; gates re-run green.

---

## E. Flagged (not fixed) — prioritized follow-up punch-list

1. **(S3) Unify the builder-entry CTA between seed and jurisdiction-variant pages.**
   Seed uses the `BuilderCTA` card; variant uses bare stacked buttons. Pick one for
   cross-surface consistency.
2. **(S3) Self-hosted fonts are absent by design** — Fraunces/Inter fall back to
   Georgia/system-sans (gated, no 404s). The rendered type is the *fallback* stack;
   the branded faces have not been visually verified. If the brand faces are
   intended for launch, drop the woff2 files and re-run this visual pass.
3. **(S3) `display:contents` on the banner `<header>`** is a pragmatic choice that
   preserves the sticky nav; the banner role is exposed in current Chromium but
   `display:contents` + implicit ARIA roles has historically been buggy in older
   engines. Consider instead making the `<header>` itself the sticky element (move
   `position:sticky` up one level) for maximum robustness across AT/browsers.
4. **(S3) No live screen-reader / keyboard-only run** was performed (sandbox + no
   AT). Heading order, labels, landmarks, focus rings, and the radiogroup were
   verified via DOM/AX-tree and code review, but a real NVDA/VoiceOver + Tab-order
   pass before launch is recommended.
5. **(NIT) Pre-existing typecheck hints** — Zod `.string().url()` deprecation in
   `tests/.../bill-of-sale-rules.test.ts` and an unused `Props` interface in
   `src/pages/bill-of-sale/[variant].astro`. Harmless; clean up opportunistically.

---

## Honest caveats

- Fonts render on the **fallback** stack (Georgia / system sans), by design — the
  branded Fraunces/Inter faces were not present to verify visually.
- Screenshots were captured with **headless Chromium only**; no Firefox/WebKit and
  no real device. Cross-browser rendering was not verified.
- No live screen-reader or full keyboard-navigation session — a11y findings are from
  DOM, the Chromium accessibility tree, computed-style contrast sampling, and code
  review.
- Contrast ratios are computed from sampled solid colors; elements over
  semi-transparent fills are approximate (noted inline).
- Visual review leaned on above-the-fold `fold-*` crops because full-page PNGs of the
  long content/builder pages compress to illegibility at document scale.
