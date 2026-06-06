# template.how — Design System & Mobile-First Refresh

**Date:** 2026-06-06
**Author:** Design lead (review doc)
**Scope:** Visual system, mobile/tablet layout, typography & color, touch usability, performance (Core Web Vitals), accessibility, and a prioritized implementation plan.
**Constraint:** Astro 5 static site, live in production, React islands for the builder only. Lighthouse budget targets 95+ (aspiration 100s), LCP < 2000ms, CLS < 0.05, TBT warn at 100ms (`lighthouserc.json`).

Goals, in priority order: **(1) easy on the eyes, (2) easy to use, (3) loads fast.** A large share of traffic is mobile/tablet, so every decision below is made mobile-first.

> This is a specification document. No source files were modified. All snippets are ready to paste into the named files.

---

## 0. Executive summary

The current design is a solid, tasteful foundation (warm paper, navy, amber; Fraunces + Inter). The identity is good and should be kept. The weaknesses are concentrated in exactly the places that hurt mobile users and Core Web Vitals:

1. **The builder is a hard 2-column grid that just collapses to 1 column at 900px** (`builder.css:13`). On mobile this means the preview is pushed far below the form, with no way to flip between editing and previewing — the core UX problem of the product is unsolved on small screens.
2. **Fonts are loaded from the Google Fonts CDN at runtime** (`BaseLayout.astro:51-56`) even though `public/fonts/` already contains Inter files. This is render-path latency and a CLS risk the site doesn't need — and there is **no fixed line-height/size-adjust fallback**, so the Fraunces swap will shift the LCP heading.
3. **The mobile Nav hides all navigation** (`Nav.astro:47-49` sets `.nav-links { display: none }` under 860px with **no hamburger**) — mobile users can only navigate via the footer.
4. **The export bundle (jspdf + docx) is statically imported** into the builder island (`BuilderExports.tsx:2-3`), inflating the island's JS and TBT on the one interactive page type.
5. **The fixed type scale has a huge top end** (`--fs-4xl: 3.75rem` = 60px) used for `h1` on phones (`global.css:30`), which overflows narrow viewports and wastes vertical space. No fluid type.
6. **Contrast / dark-mode gaps:** amber `--accent` (#D97706) on paper fails AA for the `*` required marker and small UI text; dark mode never restyles the builder preview (which hardcodes `color:#111` on a light `--paper-50`, so it stays light in dark mode — acceptable as "paper" but the export bar and currency chip use light-mode tokens).

The five highest-impact fixes are: **self-host + size-adjust fonts**, **a stacked builder with a sticky Edit/Preview segmented toggle**, **a real mobile nav (hamburger drawer)**, **fluid `clamp()` type**, and **lazy/dynamic-import the export libraries**. Details and paste-ready CSS follow.

---

## 1. Audit of the current design

### 1.1 What's good (keep it)
- **Token architecture** (`tokens.css`) is clean: semantic layer (`--bg`, `--fg`, `--accent`, `--link`) on top of a raw palette, with dark-mode and reduced-motion already wired. This is the right structure; we extend it, not replace it.
- **Paper/navy/amber identity** is distinctive and appropriate for a "documents" brand. Fraunces (display serif) + Inter (UI) is a strong, legible pairing.
- **Semantics are largely correct:** real `<nav aria-label>`, `<main id="main">`, a skip link (`BaseLayout.astro:63`), breadcrumb as an ordered list with `aria-current="page"` (`Breadcrumb.astro`), table with `<caption class="sr-only">`, `scope` on `th`, and `aria-live="polite"` on the preview (`BuilderPreview.tsx:6`). Good baseline a11y.
- **Reasonable reading measure:** `--content-max: 72ch` with `p { max-width: var(--content-max) }`.
- **Sensible perf posture already:** `client:visible` on the builder (`SeedLayout.astro:51`), fonts loaded non-render-blocking via the `media="print"` swap trick, OG images pre-generated at build (satori). The intent is right; the execution has gaps.

### 1.2 Typography rhythm — weak spots
- **No fluid type.** The scale is fixed rem (`tokens.css:38-45`). `h1` = `--fs-4xl` = **3.75rem / 60px** (`global.css:30`). On a 360px phone that is ~16 characters per line and forces 3–4 line headings, eating the first screen. `--fs-3xl` (44px) is used for seed/node `h1` — still large for phones.
- **Body size 17px** (`--fs-base: 1.0625rem`) is good for reading, but inputs inherit `--fs-base` (`builder.css:44`) — fine — yet there is no guarantee against iOS zoom because some controls (date/select) can still be sub-16px after UA styling; explicit 16px floor is safer.
- **Line-height** `--lh-body: 1.65` is good for prose but applied to the whole `body` (`global.css:17`), so it also inflates dense UI like nav and table cells. Tighten in components.
- **Letter-spacing** `-0.01em` global on headings plus `-0.02em` on h1 is fine; no change needed.

### 1.3 Color & contrast — weak spots
- **Amber `--accent` = `#D97706` on paper `#FAF7F2`** ≈ **3.6:1**. That **fails WCAG AA (4.5:1) for normal text.** It is used for the required-field asterisk (`builder.css:33`) and `--link-hover`. Asterisk is small text → fails. Use the darker `--amber-600 #B45309` (≈ 4.9:1 on paper) for text-on-paper uses; keep bright amber for borders/large accents only.
- **`--fg-muted: --paper-700 (#4B463E)` on paper** ≈ 8.9:1 — fine.
- **Dark mode** (`tokens.css:77-87`) restyles only the page chrome. The **builder preview** (`.b-doc { color:#111 }`, `.b-preview { background: --paper-50 }`, `builder.css:60,67`) intentionally stays "paper" — acceptable, it mimics printed output — **but** `.b-currency-sym { background: --paper-200 }` and `.b-exports { background: --bg-elev }` will look right only because `--bg-elev` flips; the currency chip stays light-on-light in dark mode (hardcoded `--paper-200`). Minor, fix in §3.
- **Footer hardcodes hex** (`Footer.astro:49,53,55-59`, e.g. `#0F1B3D`, `#4B463E`) instead of tokens, so it **does not adapt to dark mode** and is locked to the paper background it sets. It works because the footer forces `background: --paper-200`, but in dark mode that's a jarring light slab. Should use tokens.

### 1.4 Spacing scale
- The 4px-based scale (`tokens.css:50-59`) is fine and complete. The issue is **mobile density**: section paddings use desktop values unconditionally — e.g. hero `padding: var(--sp-24) 0` = **96px top/bottom on phones** (`index.astro:55`), `.seed-hero` `--sp-8`, footer `--sp-24` top margin + `--sp-16` padding. On a phone this is a lot of dead scroll. Need a mobile step-down.

### 1.5 Nav — weak spots (highest-severity mobile bug)
- `@media (max-width: 860px) { .nav-links { display: none } }` (`Nav.astro:47-49`). **There is no hamburger, no drawer, no alternative.** Below 860px the only nav is the wordmark (home) and the footer. For a site whose value is cross-linking ("no orphans"), this is a real loss of discoverability and a likely engagement/bounce problem on the majority of traffic.
- Nav is `position: sticky` with `backdrop-filter: blur(8px)` (`Nav.astro:19-22`). Backdrop-filter is a known minor perf/jank cost on low-end Android during scroll; acceptable but worth a `will-change`-free, reduced-blur fallback.

### 1.6 Builder form UX — weak spots
- **Layout:** `.b-shell` is `grid-template-columns: 1fr 1fr` collapsing to `1fr` at 900px (`builder.css:3-15`). On mobile the user fills a long form, then must scroll past all of it to see the preview, with no quick toggle. **This is the central unsolved UX problem.** (§2.2 fixes it.)
- **Tap targets:** `.b-input` padding is `--sp-2 --sp-3` = 8px/12px → input height ≈ **34–36px**, below the 44px minimum. `.b-checkbox` is **18×18px** (`builder.css:57`) — far below 44px touch target and the label sits above it (FieldShell renders label as block, then control), so there's no large clickable label row for checkboxes.
- **Buttons:** `.b-btn` padding `--sp-3 --sp-4` ≈ 40px tall — close but under 44px; on mobile they should be ≥48px and the export row should not wrap awkwardly.
- **Inputs lack mobile affordances:** `TextField` is always `type="text"` with no `inputMode`/`autoComplete`. Fields like email, phone, ZIP, names, addresses should set `type`, `inputmode`, and `autocomplete` to summon the right keyboard and enable autofill. Currency field correctly uses `inputMode="decimal"` (good — `CurrencyField.tsx:21`).
- **Select placeholder** uses a `disabled` option only when required (`SelectField.tsx:38`) — fine.
- **No validation feedback / no error states** in tokens or CSS. Required is only a visual asterisk; on submit-less builders that's okay, but export should hint when required fields are empty.
- **`aria-live="polite"` on the entire preview** (`BuilderPreview.tsx:6`) re-announces the whole document on every keystroke — screen-reader noise. Should be off or scoped.

### 1.7 Form + preview layout — weak spots
Covered above: no mobile toggle, preview `max-height: 600px` with internal scroll (`builder.css:65`) creates a scroll-within-scroll trap on touch. On desktop the two panes don't share a sticky context, so the preview scrolls away.

### 1.8 Reflow / CLS risks
- **Font swap CLS:** Fraunces and Inter load late (CDN, `display=swap`) with **no `size-adjust`/`ascent-override` fallback metrics**. The LCP `h1` renders in Georgia/system then reflows to Fraunces → layout shift on the largest element. This is the single biggest CLS risk.
- **Builder island hydration:** `client:visible` mounts the React tree with **no reserved space** (`SeedLayout.astro:51`). When it hydrates, `.b-shell` appears and pushes content — CLS if it enters the viewport during load. Needs a reserved min-height placeholder.
- **Images:** `img { height: auto }` globally (`global.css:50`) with no width/height attributes pattern documented → any future content image risks CLS. OG images are off-DOM (meta only), so not a CLS source.
- **Sticky export bar** (`.b-exports { position: sticky; bottom: 0 }`, `builder.css:76-80`) is inside the scrollable pane, not the viewport, so on mobile it's not actually pinned to the screen.

---

## 2. Mobile/tablet layout system

### 2.1 Breakpoints & strategy
Adopt a small, named, mobile-first set. Define as a comment block in `tokens.css` (CSS custom media isn't broadly supported without a build step, so document them and use raw `min-width` queries — mobile-first, `min-width` only).

```
/* Breakpoints (mobile-first, min-width):
   sm  ≥ 480px   large phones / small tablets portrait
   md  ≥ 768px   tablet portrait  → 2-col grids start
   lg  ≥ 960px   tablet landscape / small laptop → builder goes side-by-side
   xl  ≥ 1200px  desktop, page max-width reached
*/
```

Rationale for **960px as the builder split point** (up from the current 900px): at 768–959px (tablet portrait) a 2-up form+preview is too cramped to be usable; keep it stacked-with-toggle until 960px. Everything else uses `auto-fill, minmax()` grids which are already fluid and need no breakpoints.

### 2.2 The builder — the core problem

**Pattern: stacked single column with a sticky segmented Edit / Preview toggle, plus a persistent sticky export bar at the bottom of the viewport.** This beats a bottom sheet for this product because the form is long and structured (multiple `fieldset`s) and users iterate field→preview→field; a segmented toggle is a single, predictable, accessible control with no gesture affordance to discover. (Bottom sheets shine for transient contextual content; our preview is a primary, full-document artifact — see NN/g guidance, §8.) On `lg` and up, render both panes side-by-side and hide the toggle.

**Mechanics**
- The React tree already renders both `.b-pane-form` and `.b-pane-preview` (`TemplateBuilder.tsx:18-24`). We do **not** need to conditionally unmount — we toggle visibility with a CSS class + `aria-hidden`, so state and the live region survive switching. Add a small piece of state (or a CSS `:has`/radio approach) for the toggle.
- The toggle is a **segmented control implemented as radio inputs** (keyboard-accessible, works without JS-driven ARIA), sticky under the nav. The export bar is `position: fixed` to the viewport bottom on mobile (not sticky-in-pane), thumb-reachable.
- Preview pane drops its `max-height` scroll trap on mobile (let the page scroll); keep the capped, independently-scrolling pane only on `lg+`.

**Markup change (TemplateBuilder.tsx)** — add the toggle + a state hook. Conceptual diff:

```tsx
// TemplateBuilder.tsx
const [view, setView] = useState<'edit' | 'preview'>('edit');
return (
  <div className="b-shell" data-view={view} role="region" aria-label={`${schema.title} builder`}>
    <div className="b-toggle" role="tablist" aria-label="Builder view">
      <button role="tab" aria-selected={view==='edit'}    className="b-toggle-btn"
              onClick={() => setView('edit')}>Edit</button>
      <button role="tab" aria-selected={view==='preview'} className="b-toggle-btn"
              onClick={() => setView('preview')}>Preview</button>
    </div>
    <div className="b-pane b-pane-form"    aria-hidden={view==='preview' ? true : undefined}>
      <BuilderForm schema={schema} state={state} onChange={set} />
    </div>
    <div className="b-pane b-pane-preview" aria-hidden={view==='edit' ? true : undefined}>
      <BuilderPreview tree={tree} />
    </div>
    <BuilderExports tree={tree} filenameStem={filenameStem ?? schema.slug} />
  </div>
);
```
(Move `<BuilderExports>` out of the preview pane so the export bar is always available regardless of toggle state.)

**CSS (builder.css)** — replace the `.b-shell` block:

```css
/* --- Mobile-first: single column, toggle visible --- */
.b-shell {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--sp-4);
  margin: var(--sp-6) 0;
  background: var(--bg-elev);
  border: 1px solid var(--border);
  border-radius: var(--r-lg);
  padding: var(--sp-4);
  /* reserve space so hydration doesn't shift layout (see §5) */
  min-height: 60svh;
}

.b-toggle {
  position: sticky;
  top: var(--nav-h, 56px);           /* sit under the sticky nav */
  z-index: 5;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2px;
  padding: 4px;
  background: var(--paper-200);
  border-radius: var(--r-md);
  margin-bottom: var(--sp-2);
}
.b-toggle-btn {
  appearance: none; border: 0; cursor: pointer;
  min-height: 44px; font: inherit; font-weight: 600;
  border-radius: calc(var(--r-md) - 2px);
  background: transparent; color: var(--fg-muted);
}
.b-toggle-btn[aria-selected="true"] {
  background: var(--bg-elev); color: var(--fg);
  box-shadow: var(--shadow-sm);
}

/* toggle controls which pane shows on mobile */
.b-shell[data-view="edit"]    .b-pane-preview { display: none; }
.b-shell[data-view="preview"] .b-pane-form    { display: none; }

.b-preview { max-height: none; overflow: visible; }  /* let the page scroll on mobile */

/* --- lg: real two-column, no toggle --- */
@media (min-width: 960px) {
  .b-shell {
    grid-template-columns: 1fr 1fr;
    gap: var(--sp-6);
    padding: var(--sp-6);
    min-height: 0;
    align-items: start;
  }
  .b-toggle { display: none; }
  .b-shell[data-view] .b-pane-form,
  .b-shell[data-view] .b-pane-preview { display: block; }  /* override mobile hiding */
  .b-pane-preview { position: sticky; top: calc(var(--nav-h, 64px) + var(--sp-4)); }
  .b-preview { max-height: 70vh; overflow: auto; }
}
```

> `--nav-h` should be set once in `tokens.css` (e.g. `--nav-h: 56px;` mobile, raised at `lg`) and consumed by the nav, the toggle, and the sticky preview so they stay in sync.

### 2.3 Sticky export bar (mobile)
Pin the export actions to the viewport bottom so PDF/DOCX/Print are always a thumb away, with safe-area inset for notched phones.

```css
/* builder.css — replace .b-exports block */
.b-exports {
  display: flex; gap: var(--sp-2); flex-wrap: nowrap;
  overflow-x: auto;                      /* horizontal scroll if 4 buttons overflow */
  position: fixed; left: 0; right: 0; bottom: 0; z-index: 8;
  padding: var(--sp-3) var(--sp-4);
  padding-bottom: calc(var(--sp-3) + env(safe-area-inset-bottom));
  background: color-mix(in srgb, var(--bg-elev) 94%, transparent);
  backdrop-filter: blur(6px);
  border-top: 1px solid var(--border);
}
.b-btn { min-height: 48px; padding: 0 var(--sp-4); white-space: nowrap; }
.b-btn-primary { flex: 1 0 auto; }       /* primary action gets priority width */

@media (min-width: 960px) {
  .b-exports {
    position: static; backdrop-filter: none; border-top: 0;
    padding: var(--sp-3) 0; margin-top: var(--sp-4); flex-wrap: wrap;
  }
}
```
Add bottom padding to the builder section on mobile so the fixed bar never covers the last form field: `.builder-section { padding-bottom: 88px; } @media (min-width:960px){ .builder-section{ padding-bottom:0 } }`.

### 2.4 Nav — mobile drawer
Replace the "hide everything" rule with a real disclosure drawer. Keep it CSS-first with a `<details>` element so it works without shipping JS (Astro is static; nav is not an island).

**Markup (Nav.astro)** — wrap links in `<details>`:

```astro
<nav aria-label="Primary" class="site-nav">
  <div class="container nav-inner">
    <a href="/" class="wordmark" aria-label="Template.how home">
      <strong>Template</strong><span class="dot">.</span><span class="tld">how</span>
    </a>
    <details class="nav-disclosure">
      <summary class="nav-toggle" aria-label="Menu">
        <span class="nav-toggle-bars" aria-hidden="true"></span>
        <span class="sr-only">Menu</span>
      </summary>
      <ul class="nav-links">
        {NODE_SLUGS.map((slug) => (
          <li><a href={`/${slug}/`}>{NODE_LABELS[slug]}</a></li>
        ))}
      </ul>
    </details>
  </div>
</nav>
```

```css
/* Nav.astro <style> */
.nav-toggle {
  display: inline-flex; align-items: center; justify-content: center;
  width: 48px; height: 48px; cursor: pointer; list-style: none;
  border-radius: var(--r-sm);
}
.nav-toggle::-webkit-details-marker { display: none; }
.nav-toggle-bars, .nav-toggle-bars::before, .nav-toggle-bars::after {
  content: ""; display: block; width: 22px; height: 2px;
  background: var(--fg); position: relative;
}
.nav-toggle-bars::before { position: absolute; top: -7px; }
.nav-toggle-bars::after  { position: absolute; top:  7px; }

/* Mobile: drawer */
.nav-disclosure[open] .nav-links {
  position: absolute; left: 0; right: 0; top: 100%;
  display: flex; flex-direction: column; gap: 0;
  background: var(--bg-elev); border-bottom: 1px solid var(--border);
  box-shadow: var(--shadow-md); padding: var(--sp-2) 0;
}
.nav-disclosure[open] .nav-links a {
  display: block; padding: var(--sp-4) var(--sp-6); min-height: 48px;
  font-size: var(--fs-base);
}

/* Desktop: inline links, hide toggle */
@media (min-width: 768px) {
  .nav-toggle { display: none; }
  .nav-links {
    display: flex !important; position: static !important;
    flex-direction: row; gap: var(--sp-6);
    background: none; box-shadow: none; border: 0; padding: 0;
  }
  .nav-links a { padding: 0; min-height: 0; font-size: var(--fs-sm); }
}
```
This removes the `display:none` dead-end at `Nav.astro:47-49` and adds a 48px hamburger. (Optional progressive enhancement: a tiny inline script to close the drawer on outside-click / Escape; not required for function.)

### 2.5 Breadcrumbs, related grid, footer
- **Breadcrumb** (`Breadcrumb.astro`): already wraps with `flex-wrap` and `gap` — fine on mobile. Add `min-height: 44px` to the links' tap area is overkill for inline text; instead ensure adequate vertical padding only on the linked crumbs: `.crumb a{ padding-block:6px }`. Consider truncating the middle crumb on very narrow screens isn't necessary given only 3 levels.
- **Related grid** (`SeedLayout.astro:116-127`) uses `minmax(220px, 1fr)` → on a 360px phone with `var(--sp-8)` gutters this is one column, fine. Bump tap target: `.related-grid a { min-height: 48px; display: flex; align-items: center; }`.
- **Footer** (`Footer.astro`): 3-col → 1-col at 720px (good). Two fixes: (a) replace hardcoded hex with tokens so dark mode works; (b) the single-column stack should keep generous tap spacing on the link lists (`.footer-grid li a { display:inline-block; padding-block:8px }`). Reduce the huge `margin-top: var(--sp-24)` on mobile to `--sp-12`.

### 2.6 JurisdictionTable on narrow screens
A 5-column table (`JurisdictionTable.astro`) does not fit 360px. Two viable patterns; recommend **(A)** for least code and best a11y:

**(A) Responsive "stacked card" via CSS only** — on mobile, each `<tr>` becomes a card and each `<td>` shows its column label via a `data-label`. Requires adding `data-label` attributes in the markup (the header text) and this CSS:

```css
/* JurisdictionTable <style> */
@media (max-width: 767px) {
  .jt thead { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0 0 0 0); }
  .jt, .jt tbody, .jt tr, .jt th, .jt td { display: block; width: 100%; }
  .jt tr {
    border: 1px solid var(--border); border-radius: var(--r-md);
    padding: var(--sp-2) var(--sp-3); margin-bottom: var(--sp-3);
  }
  .jt tbody th { font-size: var(--fs-base); padding: var(--sp-1) 0; }
  .jt td {
    display: flex; justify-content: space-between; gap: var(--sp-4);
    padding: var(--sp-1) 0; border: 0; text-align: right;
  }
  .jt td::before {
    content: attr(data-label); font-weight: 600;
    color: var(--fg-muted); text-align: left;
  }
}
```
Add `data-label="Notary"` etc. to each `<td>` in the markup. The `<caption class="sr-only">` and `scope` attributes remain, so screen-reader semantics are preserved.

**(B) Horizontal scroll fallback** (if you don't want to touch markup): wrap the table in `<div class="table-scroll" role="region" aria-label="..." tabindex="0">` with `overflow-x:auto` and a shadow hint. Quicker, but worse for thumb scanning. Use (A).

### 2.7 Overall reading column
`--content-max: 72ch` is good for desktop prose. On mobile the container already uses `width: min(100% - var(--sp-8), var(--page-max))` (`global.css:53`) so the measure is viewport-bound. No change to `72ch`, but reduce the gutter on small phones from `--sp-8` (32px total) to `--sp-6` to reclaim width:

```css
@media (max-width: 479px) {
  .container { width: min(100% - var(--sp-6), var(--page-max)); }
}
```

---

## 3. Typography & color — concrete token changes

### 3.1 Fluid type with `clamp()`
Replace the fixed upper scale steps so headings shrink gracefully on phones and grow on desktop. Keep the lower steps fixed (UI text shouldn't fluidly resize). Paste into `tokens.css` replacing the `/* Type scale */` block:

```css
/* Type scale — fluid at the top, fixed for UI */
--fs-xs: 0.8125rem;     /* 13px */
--fs-sm: 0.9375rem;     /* 15px */
--fs-base: 1.0625rem;   /* 17px — reading body */
--fs-lg:  clamp(1.125rem, 1.05rem + 0.4vw, 1.25rem);    /* 18 → 20 */
--fs-xl:  clamp(1.3rem,  1.15rem + 0.8vw, 1.5rem);      /* ~21 → 24 */
--fs-2xl: clamp(1.6rem,  1.35rem + 1.3vw, 2rem);        /* ~26 → 32 */
--fs-3xl: clamp(1.95rem, 1.5rem + 2.2vw, 2.75rem);      /* ~31 → 44 */
--fs-4xl: clamp(2.25rem, 1.6rem + 3.2vw, 3.75rem);      /* 36 → 60 */

--lh-tight: 1.15;
--lh-snug:  1.3;        /* new: for large display headings */
--lh-body:  1.65;
```
The `min` values are chosen so the homepage `h1` (`--fs-4xl`) is **36px on a 360px phone** (fits ~14–16ch comfortably), the seed `h1` (`--fs-3xl`) is ~31px, and all reach today's desktop sizes at ≥1200px. No `h1` overflow; less wasted vertical space.

Also set body line-height where it belongs instead of globally inflating UI:
```css
/* global.css */
body { line-height: var(--lh-body); }           /* keep for prose */
h1,h2,h3,h4 { line-height: var(--lh-tight); }    /* already set */
.site-nav, .b-form, .b-exports, .jt, .crumb { line-height: var(--lh-snug); }
```

### 3.2 Contrast fixes (WCAG AA)
Introduce a dedicated **text-accent** token that passes AA, and reserve bright amber for borders/large UI:

```css
/* tokens.css :root */
--accent:      #B45309;   /* amber-600: 4.9:1 on paper-100 → AA for text */
--accent-bold: #D97706;   /* amber-500: borders, focus rings, large accents only */
--accent-fg:   #FFFFFF;   /* on navy/amber-600 fills: verify ≥4.5:1 (amber-600 ~3.0 → use navy fills for text buttons) */
--link:        #0F1B3D;   /* navy-700, ~13:1 on paper */
--link-hover:  #B45309;   /* AA */
```
- Required asterisk `.b-req { color: var(--accent) }` now passes.
- Keep focus ring bright: `:focus-visible { outline-color: var(--accent-bold) }` (decorative, contrast rule is relaxed but ours still clears 3:1).
- **Do not** put body-size white text on amber fills (amber-600 on white is ~3.0:1). Primary buttons already use **navy fill + paper text** (`.b-btn-primary`, `.dl-btn`) which is ~13:1 — keep that; amber stays an accent, not a button color.

### 3.3 Dark-mode review
Extend the dark block so component-level hardcodes adapt. Add to the `@media (prefers-color-scheme: dark)` block in `tokens.css`:

```css
@media (prefers-color-scheme: dark) {
  :root {
    --bg: var(--navy-900);
    --bg-elev: var(--navy-700);
    --fg: var(--paper-100);
    --fg-muted: var(--paper-300);
    --border: #2A3A6B;            /* lighter than navy-500 for visible 1px borders on navy-900 */
    --link: var(--amber-400);
    --link-hover: var(--amber-500);
    --accent: var(--amber-400);   /* amber-400 on navy passes AA */
    --accent-bold: var(--amber-400);
  }
}
```
Then:
- **Builder preview stays "paper"** by design (it's a document mockup). Make that explicit and self-contained so it never inherits dark text on dark: scope hardcoded paper colors to the `.b-doc`/`.b-preview` and set `--paper-50`/`#111` literally (already done). Add a subtle frame so the white sheet reads as intentional on a dark page: `.b-preview { box-shadow: var(--shadow-md); }`.
- **Currency chip:** change `.b-currency-sym { background: var(--paper-200) }` → `background: color-mix(in srgb, var(--fg) 8%, transparent); color: var(--fg-muted);` so it adapts.
- **Footer:** swap every hardcoded hex for tokens (`#0F1B3D`→`var(--link)`, `#4B463E`→`var(--fg-muted)`, `#1F1C17`→`var(--fg)`, `#B45309`→`var(--accent)`) and change `.site-footer { background: var(--paper-200) }` → `background: var(--bg-elev)` so it's not a light slab in dark mode.

---

## 4. Touch & usability

### 4.1 Tap targets (44–48px)
- **Inputs:** bump padding so height ≥ 44px and font ≥ 16px to prevent iOS zoom:
```css
/* builder.css .b-input */
.b-input {
  width: 100%; min-height: 44px;
  padding: var(--sp-3);                 /* 12px → ~44px tall */
  font-size: max(16px, var(--fs-sm));   /* never below 16px → no iOS zoom */
  border: 1px solid var(--border); border-radius: var(--r-md);
  background: var(--bg); color: var(--fg); font-family: inherit;
}
@media (min-width: 768px){ .b-input { font-size: var(--fs-base); } }
```
- **Checkbox:** make the whole label row tappable and enlarge the control. Recommend changing `CheckboxField` to render the control **inline before an inline label** (not via the block FieldShell) so it reads naturally and the hit area is the row:
```css
.b-checkbox-row { display: flex; align-items: center; gap: var(--sp-3); min-height: 44px; }
.b-checkbox { width: 24px; height: 24px; flex: none; accent-color: var(--accent-bold); }
.b-checkbox-row label { font-size: var(--fs-base); }
```
- **Buttons & links:** `.b-btn { min-height: 48px }`, `.related-grid a / .seed-list a / .cats a { min-height: 48px; display: flex; align-items: center }`. Nav drawer links already 48px above.

### 4.2 Input modes, keyboards, autocomplete
Extend the field components to accept and pass through `type`, `inputMode`, and `autoComplete`, driven by a field "kind" in the builder schema (or inferred from `id`). Concrete mapping to implement in `TextField` (and wire via schema):

| Field meaning | `type` | `inputmode` | `autocomplete` |
|---|---|---|---|
| Full name | text | — | `name` |
| Email | `email` | `email` | `email` |
| Phone | `tel` | `tel` | `tel` |
| Street address | text | — | `street-address` |
| City | text | — | `address-level2` |
| State/region | (select) | — | `address-level1` |
| Postal/ZIP | text | `numeric` | `postal-code` |
| Money | number | `decimal` | `off` (done) |
| Plain number/qty | number | `numeric` | `off` |
| Date | `date` | — | `off` |

Minimal change to `TextField` props: add optional `type`, `inputMode`, `autoComplete` and spread them onto the `<input>`. Then enrich the builder schema (or a small inference helper keyed on `id`/`label`) so name/email/phone/address fields get the right keyboard. This is a meaningful mobile-typing win for forms users fill on the go.

### 4.3 Focus-visible & motion
- `:focus-visible` is already defined globally (`global.css:44-48`) and on inputs — keep, but switch the ring color to `--accent-bold` (§3.2) and ensure the sticky toggle/drawer/buttons all show it (they will via the global rule once they're real `<button>`/`<a>`).
- `prefers-reduced-motion` is handled globally (`tokens.css:89-94`). Add the tile hover transform and nav blur to the reduced set explicitly is unnecessary (the global rule already nukes transitions/animations), but **the `translateY(-2px)` tile hover is a transform, not a transition target on its own** — it's applied via `transition: transform`, so the reduced-motion rule already disables the animation. Good. Just confirm no `scroll-behavior: smooth` jank for reduced-motion users:
```css
@media (prefers-reduced-motion: reduce) { html { scroll-behavior: auto; } }
```

### 4.4 Live region noise
Change `BuilderPreview` `aria-live="polite"` → remove it or move it to a tiny status node ("Preview updated") that updates on blur/debounce, not on every keystroke, to avoid SR spam. Recommended: drop `aria-live` on the document; the preview is visible and the user is the one typing.

---

## 5. Performance — Core Web Vitals plan

The biggest wins are **font loading** (LCP + CLS) and **builder JS** (TBT/INP). The static pages are already lean.

### 5.1 Font strategy — self-host + fallback metrics
Today fonts come from Google's CDN (`BaseLayout.astro:51-56`) with two preconnects, a preloaded stylesheet, and the print-swap trick — and **no fallback metric override**, so the LCP heading reflows when Fraunces arrives. The `public/fonts/` Inter files exist but are used **only by satori for OG images** (`og-image.ts:35-36`), not the site.

Recommended plan (the industry consensus: self-host woff2, subset, `font-display: swap`, fallback metrics, preload only above-the-fold faces — see web.dev/Erwin Hofman/corewebvitals.io in §8):

1. **Self-host woff2** for the exact weights in use. Today's CDN URL requests **Fraunces 400 + 500** and **Inter 400/500/600**. That's 2 Fraunces + 3 Inter = 5 faces. Trim to what's actually rendered:
   - Fraunces is used for `h1–h4`, wordmark, legends, doc title, lede (italic). Headings use `font-weight: 500` (`global.css:23`); the lede uses `font-style: italic` (`DefinitionalLede.astro:12`). So you need **Fraunces 500 normal** and **Fraunces 500 italic** (or 400 italic). Drop Fraunces 400 normal if nothing uses it (verify; body never uses display serif at 400). Fraunces is a **variable display serif** — ship the variable woff2 with a constrained `opsz`/`wght` axis range, or two static instances; do **not** ship many static weights.
   - Inter: body/UI at 400, medium 500, semibold 600 → keep 400 + 600, and map the few 500 usages to 600 or 400 to drop a face (or ship Inter variable woff2, one file, covering 400–600).
2. **Subset to Latin** (`unicode-range: U+0000–00FF, …`) with `fonttools`/`glyphhanger`. US/UK content is Latin; this cuts Fraunces dramatically.
3. **`@font-face` with `font-display: swap` and metric overrides** so the fallback occupies the same space (kills the swap CLS). Add to `tokens.css` (or a new `fonts.css` imported first):

```css
@font-face {
  font-family: 'Inter';
  src: url('/fonts/Inter-roman.var.woff2') format('woff2-variations');
  font-weight: 400 600; font-style: normal; font-display: swap;
  unicode-range: U+0000-00FF, U+2000-206F, U+2122, U+2212;
}
@font-face {
  font-family: 'Fraunces';
  src: url('/fonts/Fraunces.var.woff2') format('woff2-variations');
  font-weight: 500; font-style: normal; font-display: swap;
}
@font-face {
  font-family: 'Fraunces';
  src: url('/fonts/Fraunces-Italic.var.woff2') format('woff2-variations');
  font-weight: 400 500; font-style: italic; font-display: swap;
}

/* Fallback faces sized to match → no reflow on swap.
   (Generate exact values with the Fontaine/fallback tools; these are starting points.) */
@font-face {
  font-family: 'Inter Fallback';
  src: local('Segoe UI'), local('Roboto'), local('Helvetica Neue'), local('Arial');
  ascent-override: 90%; descent-override: 22%; line-gap-override: 0%; size-adjust: 107%;
}
@font-face {
  font-family: 'Fraunces Fallback';
  src: local('Georgia'), local('Times New Roman');
  ascent-override: 92%; descent-override: 24%; line-gap-override: 0%; size-adjust: 112%;
}
```
Then update the stacks in `tokens.css`:
```css
--font-display: 'Fraunces', 'Fraunces Fallback', Georgia, 'Times New Roman', serif;
--font-body:    'Inter', 'Inter Fallback', system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif;
```
4. **Preload only the two above-the-fold faces** (Fraunces 500 for the `h1` LCP, Inter roman for the lede) in `BaseLayout.astro` head; drop the Google preconnects/stylesheet entirely:
```html
<link rel="preload" href="/fonts/Fraunces.var.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="/fonts/Inter-roman.var.woff2" as="font" type="font/woff2" crossorigin>
```
   Remove `BaseLayout.astro:51-56` Google Fonts lines and both `preconnect`s — they become dead weight once self-hosted. (Cloudflare Pages serves with HTTP/2 + CDN + far-future cache headers for `/fonts/*`, satisfying the self-host prerequisites noted in §8.)

Net effect: removes 2 third-party connections off the critical path, removes render-blocking external CSS, and eliminates the LCP-heading swap shift via metric overrides.

### 5.2 CLS prevention from builder hydration
- **Reserve space:** `.b-shell { min-height: 60svh }` on mobile (in the §2.2 snippet) so the `client:visible` mount doesn't push content. On `lg` it's `min-height: 0` (panes have intrinsic height).
- Better still, render a **static placeholder skeleton** in the Astro markup that the island replaces, sized to the same min-height, so even pre-hydration the box exists. Minimal version: wrap `<TemplateBuilder>` in a `<div class="b-shell-reserve">` with the min-height; the island fills it.
- Keep the fixed export bar's space accounted for with the `padding-bottom` on `.builder-section` (§2.3) so nothing is occluded (occlusion isn't CLS but is a usability bug).

### 5.3 JS budget — lazy the export libraries
`BuilderExports.tsx` statically imports `jspdf` and `docx` (`BuilderExports.tsx:2-3`) — both heavy. They ship in the builder island's initial chunk even though a user may never export. **Dynamic-import on click:**

```tsx
const onPdf = async () => {
  const { documentToPdfBlob } = await import('@/lib/export/pdf');   // jspdf pulled here, on demand
  downloadBlob(await documentToPdfBlob(tree), `${filenameStem}.pdf`);
};
const onDocx = async () => {
  const { documentToDocxBlob } = await import('@/lib/export/docx'); // docx pulled here, on demand
  downloadBlob(await documentToDocxBlob(tree), `${filenameStem}.docx`);
};
```
This moves jspdf/docx out of the hydration path into separate chunks fetched only when the user clicks Download — large TBT/INP win on the builder page, no UX change (first click has a tiny fetch delay; add a pressed/disabled state on the button while loading).

### 5.4 Keep islands minimal
- The builder is the only island (`client:visible`) — good. Don't add more. The nav drawer is `<details>` (zero JS). The FAQ uses native `<details>` (zero JS). Keep it that way.
- Consider `client:idle` vs `client:visible`: `client:visible` is correct here (defer until scrolled into view). Keep.

### 5.5 Critical CSS
Astro inlines/links component styles already. The global token + base CSS is small. Action: ensure `fonts.css`/`tokens.css` is the first import so `@font-face` and color tokens are available before paint; the rest can stay as-is. Avoid adding a CSS framework.

### 5.6 Images / OG
- OG images are pre-generated at build (satori → resvg) and referenced only in `<meta>` — no runtime cost, no CLS. Keep.
- For any future in-content images, mandate explicit `width`/`height` (or `aspect-ratio`) attributes to preserve the CLS budget; `global.css:50` already sets `height:auto` which **requires** an intrinsic width/height attr pair to avoid shift. Document this rule.

### 5.7 Lighthouse budget
With the above, expected: LCP improves (self-host + preload + no third-party blocking), CLS held < 0.05 (metric overrides + reserved space), TBT drops (lazy exports). The `lighthouserc.json` asserts performance ≥ 0.95 against `/` and `/legal-document-templates/` — neither hydrates the builder, so they're already safe; the changes protect the builder/seed pages which aren't in the LH URL list (consider **adding a seed URL like `/bill-of-sale/` to the LH `url` array** so the builder page's perf is actually measured — current budget doesn't test it).

---

## 6. Accessibility

- **Contrast:** §3.2 brings amber text uses to AA; verify with a checker after applying. Navy links/buttons already exceed AAA.
- **Landmarks:** `header`/`nav`/`main`/`footer`/`aside` present. The seed page has multiple `<section aria-label>` — good. Ensure the new builder toggle uses `role="tablist"`/`role="tab"` with `aria-selected` (snippet in §2.2) **or**, simpler and more robust, a `<fieldset>` of two radio inputs labeled "Edit"/"Preview" — radios are natively keyboard-operable and announce state without custom ARIA. Prefer radios if you want zero ARIA risk.
- **Form labels:** every field uses `FieldShell` with `<label htmlFor>` — correct. Required is conveyed by an `aria-hidden` asterisk only; add `aria-required="true"` (or rely on the native `required` already passed) and consider a visible "(required)" text alternative for the first field as a legend hint.
- **Keyboard nav through builder:** with both panes in the DOM and toggled by CSS `display:none`, hidden-pane controls are correctly removed from tab order (display:none is not focusable) — good; just ensure `aria-hidden` mirrors `display` (the snippet does). The fixed export bar is reachable by tab. Test tab order: nav → toggle → form fields → export bar.
- **Skip link** exists (`BaseLayout.astro:63`) but is `class="sr-only"` with no focus reveal — it's invisible even when focused, so keyboard users can't see it. Add a focus-visible style:
```css
.skip-link { position:absolute; left:-9999px; }
.skip-link:focus { left: var(--sp-4); top: var(--sp-2); z-index: 50;
  background: var(--bg-elev); color: var(--fg); padding: var(--sp-2) var(--sp-4);
  border:1px solid var(--border); border-radius: var(--r-sm); width:auto; height:auto; clip:auto; }
```
(Change `class="sr-only"` → `class="skip-link"` on the link in `BaseLayout.astro:63`.)
- **Reduced motion:** handled globally; add `scroll-behavior:auto` override (§4.3).
- **Live region:** remove the noisy `aria-live` (§4.4).
- **Table:** keeps caption + scopes in the stacked layout (§2.6) — verified compatible.

---

## 7. Concrete next steps — prioritized, file-by-file

Priority key: **P0** = ship first (biggest UX/perf/correctness), **P1** = high value, **P2** = polish.

| # | Pri | File | Change | Expected impact |
|---|-----|------|--------|-----------------|
| 1 | P0 | `src/components/ui/Nav.astro` | Replace `display:none` mobile rule with `<details>` hamburger drawer (§2.4). Add `--nav-h` usage. | Restores mobile navigation (currently broken below 860px). Major engagement/discoverability fix. |
| 2 | P0 | `src/components/builders/TemplateBuilder.tsx` + `src/styles/builder.css` | Add Edit/Preview segmented toggle, stacked-on-mobile layout, sticky toggle, two-up at ≥960px (§2.2). Move `<BuilderExports>` out of preview pane. | Solves the core mobile UX problem (form ↔ preview). |
| 3 | P0 | `src/layouts/BaseLayout.astro` + new `src/styles/fonts.css` + `public/fonts/` | Self-host subset woff2 for Fraunces/Inter, `@font-face` + fallback metric overrides, preload 2 faces, **remove Google Fonts CDN lines** (`:51-56`) (§5.1). | Removes 2 third-party connections + render-blocking CSS; eliminates LCP-heading swap CLS. LCP/CLS win. |
| 4 | P0 | `src/components/builders/BuilderExports.tsx` | Dynamic-`import()` jspdf/docx on click (§5.3). Add button loading state. | Cuts builder island JS / TBT / INP; libs load only on demand. |
| 5 | P1 | `src/styles/tokens.css` | Fluid `clamp()` type scale; `--lh-snug`; contrast tokens (`--accent`=amber-600, `--accent-bold`, fixed links); extended dark-mode block; `--nav-h` (§3). | No `h1` overflow on phones; WCAG AA; coherent dark mode. |
| 6 | P1 | `src/styles/builder.css` | `.b-input min-height:44px` + 16px font; sticky fixed export bar (§2.3); currency chip token; preview frame; checkbox row 24px/44px (§4.1). | iOS no-zoom inputs, 44–48px targets, thumb-reachable exports. |
| 7 | P1 | `src/components/builders/fields/TextField.tsx` (+ `CheckboxField.tsx`) + schema | Pass `type`/`inputMode`/`autoComplete`; inline checkbox row (§4.2). | Correct mobile keyboards + autofill; usable checkboxes. |
| 8 | P1 | `src/components/content/JurisdictionTable.astro` | Stacked-card responsive table with `data-label` (§2.6). | 5-col table becomes legible on 360px; a11y preserved. |
| 9 | P1 | `src/layouts/BaseLayout.astro` | Skip-link focus-reveal styles + class swap (§6). | Keyboard users can see/use skip link. |
| 10 | P1 | `src/components/ui/Footer.astro` | Replace hardcoded hex with tokens; `background:var(--bg-elev)`; mobile spacing + 8px link padding (§2.5, §3.3). | Dark-mode-correct footer; better mobile tap spacing. |
| 11 | P2 | `src/components/builders/BuilderPreview.tsx` | Remove `aria-live="polite"` (or scope to a status node) (§4.4). | Stops screen-reader spam on every keystroke. |
| 12 | P2 | `src/layouts/SeedLayout.astro` + `src/pages/index.astro` | Mobile spacing step-down (hero `--sp-24`→`--sp-12` under `md`); `min-height` reserve on builder wrapper; related/cat tiles `min-height:48px` (§1.4, §5.2, §2.5). | Less dead scroll on phones; CLS reserve; bigger tap targets. |
| 13 | P2 | `src/styles/global.css` | `body{line-height:var(--lh-body)}` scoping; `scroll-behavior:auto` for reduced-motion; small-phone gutter reduction (§3.1, §4.3, §2.7). | Tighter UI rhythm; motion-safe; more width on small phones. |
| 14 | P2 | `lighthouserc.json` | Add a builder/seed URL (e.g. `/bill-of-sale/index.html`) to `collect.url` (§5.7). | Actually measures the interactive page's CWV in CI. |
| 15 | P2 | `src/styles/print.css` | Hide the new fixed export bar + toggle in print (`.b-exports,.b-toggle{display:none!important}`). | Clean printed output (current rule only hides `nav,footer,.no-print`). |

### Suggested sequencing
Ship **P0 (1–4)** as the first PR — they fix the broken mobile nav, the core builder UX, and the two largest CWV risks. Then **P1 (5–10)** as a "polish + a11y" PR. **P2** as cleanup.

---

## 8. References (current best practices)

- Web.dev — *Best practices for fonts* (self-host, `font-display`, subset, preload above-the-fold only): https://web.dev/articles/font-best-practices
- corewebvitals.io — *Self host Google fonts for better Core Web Vitals* (median LCP ~180ms improvement; preload at most two faces): https://www.corewebvitals.io/pagespeed/self-host-google-fonts
- Tune The Web — *Should you self-host Google Fonts?* (nuance: requires CDN + HTTP/2 to win): https://www.tunetheweb.com/blog/should-you-self-host-google-fonts/
- Erwin Hofman — *PageSpeed best practices for custom/Google fonts* (`font-display`, subsetting, fallback metrics): https://www.erwinhofman.com/blog/pagespeed-best-practices-guide-custom-google-fonts/
- Nielsen Norman Group — *Bottom Sheets: Definition and UX Guidelines* (when bottom sheets fit vs. primary persistent content): https://www.nngroup.com/articles/bottom-sheet/
- Material Design 3 — *Bottom sheets guidelines* (snap points, thumb reach): https://m3.material.io/components/bottom-sheets/guidelines

(WCAG 2.2 AA 4.5:1 normal text / 3:1 large text and the 24px–44px target-size guidance are applied throughout §3–§6; the 16px-input rule prevents iOS Safari auto-zoom on focus.)
