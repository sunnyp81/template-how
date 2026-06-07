# template.how — Redesign Design Language & Primitive Kit

**Date:** 2026-06-06
**Author:** Design-systems lead (foundation pass — runs first, alone)
**Status:** Implemented. Build/typecheck/test/lint all green.
**Scope of this doc:** the shared visual language (tokens, base styles) and the
reusable primitive kit under `src/components/ui/*`. Four surface agents build on
this next (home, hubs, seed/builder, content). This is their reference — use the
primitives below instead of hand-rolling markup/CSS.

> Files this foundation OWNS and changed: `src/styles/tokens.css`,
> `src/styles/global.css`, new `src/components/ui/{Container,Section,Grid,Button,
> Card,Badge,Callout,Stat,Prose,Eyebrow}.astro`, and this doc.
> It did **NOT** touch `Nav.astro`, `Footer.astro`, `Breadcrumb.astro`,
> `SeedLayout.astro`, `NodeLayout.astro`, any page, or any content component —
> those belong to the surface agents.

---

## 0. What changed in five lines

1. **Palette enriched, brand intact** — fuller paper/navy/amber ramps (new 400/600/800 steps), a 3-tier surface system (`--bg` < `--surface` < `--surface-raised`), functional success/danger/info hues, signature gradients, and a considered AA dark mode where the primary fill flips navy→amber.
2. **Type** — fluid `clamp()` scale kept and extended with `--fs-5xl`; formal weight tokens; `text-wrap: balance/pretty`; the same Fraunces + Inter pairing.
3. **Space** — fuller 4px scale (added 0/5/10/20/32) plus fluid `--space-section` rhythm so phones shed desktop whitespace automatically.
4. **Elevation & motion** — navy-tinted shadow ladder (`xs…xl` + focus glow) and a real motion system (5 durations, 4 easings, prebuilt transitions) all under `prefers-reduced-motion`.
5. **Primitives** — 10 zero-JS, prop-driven, accessible components (`Button, Card, Badge, Callout, Stat, Section, Container, Grid, Prose, Eyebrow`) ready to compose.

**Backward-compatibility contract:** every token NAME that existed before still
exists (values may have shifted). Existing pages render coherently with no edits.

---

## 1. Color

### Raw ramps (never use directly in components — use the semantic layer)
- **Paper (warm neutral):** `--paper-50 … --paper-900` (added 400/600/800).
- **Navy (brand):** `--navy-300 … --navy-900` (added 300/400/600/800).
- **Amber (accent):** `--amber-300 … --amber-700` (added 300/700).
- **Functional:** `--green-600/-50`, `--red-600/-50`, `--blue-600/-50`.

### Semantic layer — THIS is what you consume
| Token | Light value | Use |
|---|---|---|
| `--bg` | paper-100 | page background |
| `--bg-elev` / `--surface` | paper-50 | default elevated surface (cards, nav) |
| `--surface-2` | paper-200 | sunken fills / chips / wells |
| `--surface-raised` | #FFFFFF | highest cards, popovers |
| `--fg` | navy-900 | primary text (~16:1 on paper) |
| `--fg-muted` | paper-700 | secondary text (~8.9:1) |
| `--fg-subtle` | paper-600 | captions/meta (~5.9:1, still AA) |
| `--fg-on-accent` / `--accent-fg` | #FFFFFF | text on navy / amber-600 fills |
| `--border` | paper-300 | hairlines |
| `--border-strong` | paper-400 | emphasised dividers |
| `--accent` | amber-600 | **accent TEXT** (4.9:1 on paper → AA) |
| `--accent-strong` | amber-700 | amber text needing extra margin (~6.5:1) |
| `--accent-bold` | amber-500 | **borders / focus rings / large decoration only** (fails AA for small text) |
| `--accent-tint` | amber wash | washes, selection, badge backgrounds |
| `--brand` | navy-700 | primary button / strong CTA fill |
| `--brand-hover` | navy-600 | primary hover |
| `--brand-fg` | paper-50 | text on brand fill |
| `--link` | navy-700 | links (~13:1) |
| `--link-hover` | amber-600 | link hover (AA) |
| `--success/-bg`, `--danger/-bg`, `--info/-bg` | green/red/blue | states |
| `--focus-ring` | amber-500 | canonical focus outline color |

### Gradients (decorative only — never the sole carrier of meaning)
`--gradient-brand` (navy), `--gradient-accent` (amber), `--gradient-paper`.

### When to use which
- **Body / headings:** `--fg`. Secondary: `--fg-muted`. Meta/eyebrows: `--fg-subtle`.
- **Amber is an accent, not a button color.** For amber **text** use `--accent`/`--accent-strong`. For amber **borders/rings/large display** use `--accent-bold`. Do **not** put small white text on amber fills (amber-600 on white is ~3:1 — large/bold text only, which is what `Button variant="accent"` uses).
- **Primary CTA = navy fill + paper text** (`--brand`/`--brand-fg`, ~13:1). This is the conversion default.
- **Surfaces:** page = `--bg`; cards/nav = `--bg-elev`; chips/wells = `--surface-2`; popovers/top cards = `--surface-raised`.

### Dark mode (AA-verified)
Auto via `prefers-color-scheme`. Surfaces map to navy-900/800/700; text to paper; borders to navy-300/400. **Accent text flips to amber-300/400** (AA on navy) and the **primary fill flips navy→amber** with dark text (`--brand-fg` = navy-900) for contrast. Shadows soften to black-based. The builder preview deliberately stays "paper" (it's a document mockup) — leave that.

---

## 2. Typography

- **Faces:** `--font-display` Fraunces (headings, wordmark, ledes-italic, doc titles), `--font-body` Inter (everything else), `--font-mono` JetBrains Mono (code, currency symbol). Self-hosting is **gated** — real woff2 files are absent; the metric-matched fallback stack renders shift-free. **Do not** add Google Fonts links or un-gate the loader.
- **Fluid scale (clamp, min→max):** `--fs-xs`13 · `--fs-sm`15 · `--fs-base`17 (reading body) · `--fs-lg`18→20 · `--fs-xl`21→24 · `--fs-2xl`26→32 · `--fs-3xl`31→44 · `--fs-4xl`36→60 · **`--fs-5xl`44→72 (new — hero display only).**
- **Weights:** `--fw-normal/medium/semibold/bold` (400/500/600/700). Headings use medium; UI labels semibold.
- **Line-height:** `--lh-tight`1.15 (headings) · `--lh-snug`1.3 (dense UI) · `--lh-body`1.65 (prose).
- **Tracking:** `--tracking-tight` (h1), `--tracking-normal` (headings), `--tracking-wide` (uppercase eyebrows).
- Base styles add `text-wrap: balance` to headings and `pretty` to paragraphs; reading measure `--content-max` 72ch (also `--measure-narrow` 56ch, `--measure-wide` 84ch).

**Usage:** h1 = page title (`--fs-4xl`); hero display may go `--fs-5xl` via `Stat`/custom. Section headings h2 `--fs-3xl`/`--fs-2xl`. Ledes use Fraunces italic at `--fs-lg`. Never set body copy in the display serif.

---

## 3. Spacing, layout & breakpoints

- **Scale (4px):** `--sp-0…--sp-32` (added 0/5/10/20/32). Use tokens, not raw px.
- **Section rhythm:** `--space-section` = `clamp(48px, 8vw, 96px)`, `--space-section-sm` = `clamp(32px, 6vw, 64px)`. The `Section` primitive applies these so mobile isn't over-padded.
- **Radii:** `--r-xs`2 · `--r-sm`4 · `--r-md`8 · `--r-lg`12 · `--r-xl`20 · `--r-2xl`28 · `--r-full`. Cards use `--r-lg`, buttons `--r-md`, pills `--r-full`.
- **Measures:** `--content-max`72ch, `--measure-narrow`56ch, `--measure-wide`84ch, `--page-max`1200px.
- **Z-index:** `--z-nav`40, `--z-overlay`60, `--z-popover`70.

### Breakpoints (mobile-first, `min-width` only)
```
sm  >= 480px   large phones / small tablets portrait
md  >= 768px   tablet portrait   -> 2-col grids, inline nav
lg  >= 960px   tablet landscape  -> builder side-by-side
xl  >= 1200px  desktop, page max-width reached
```
Prefer fluid `Grid` (auto-fill `minmax`) over breakpoints; only reach for `md`/`lg` when layout structure must change. `--nav-h` is 56px (64px at `lg`) — pin sticky things to it.

---

## 4. Elevation & motion

- **Shadows (navy-tinted):** `--shadow-xs/sm/md/lg/xl` + `--shadow-focus` (soft glow). Resting cards `sm`/`md`; hover lift `lg`; modals `xl`.
- **Focus ring:** `--ring` = `2px solid var(--focus-ring)`. global.css applies one canonical `:focus-visible` treatment; primitives inherit it. Never remove focus outlines.
- **Motion durations:** `--dur-instant`80 · `--dur-fast`120 · `--dur-base`180 · `--dur-slow`280 · `--dur-slower`420 (ms).
- **Easings:** `--ease-standard`, `--ease-emphasized` (overshoot), `--ease-out`, `--ease-in`.
- **Prebuilt:** `--transition-colors`, `--transition-transform`. Use these for hover/state.
- **All motion is globally disabled under `prefers-reduced-motion: reduce`** (kill-switch in tokens.css). Hover transforms (e.g. card `translateY(-2px)`) are therefore automatically safe.

---

## 5. Conversion guidance (CTAs / builder entry)

The product's value is converting readers into the **builder**. Make that path obvious and consistent:
- **Top action = `Button variant="primary"`** (navy fill, paper text, shadow). One clear primary per view. On mobile use `block` so it's full-width and thumb-reachable; auto-width from `md` up.
- **Secondary paths** (pre-made downloads, "browse category") = `variant="secondary"` (outlined) or `Card href`.
- **`variant="accent"`** (amber gradient) is a *spotlight* — at most ONE per view, for a hero "Build it now" moment. Amber text on its own must use `--accent`/`--accent-strong`.
- Pair CTAs with an `Eyebrow` + concise heading; use `Stat` strips ("138 templates", "0 sign-up", "US + UK") to build trust near the fold.
- Builder lives on seed pages (`SeedLayout`, owned by a surface agent) — entry CTA above the fold, `size="lg"`, `block`.

---

## 6. Primitive catalog

All zero-JS Astro components in `src/components/ui/`. All accept `class` and
spread unknown props (`...rest`) onto the root (so `aria-*`, `data-*`, `id`,
`rel`, `target` pass through). `as` (string tag) overrides the root element
where noted. Import e.g. `import Button from '@/components/ui/Button.astro'`.

### Button — `Button.astro`
The CTA/action primitive. Renders `<a>` when `href` is set, else `<button>`.
| Prop | Values | Default |
|---|---|---|
| `variant` | `primary` \| `secondary` \| `ghost` \| `accent` | `primary` |
| `size` | `sm` \| `md` \| `lg` | `md` |
| `href` | string → anchor | — |
| `type` | `button`\|`submit`\|`reset` (button only) | `button` |
| `fullWidth` | boolean (100% always) | false |
| `block` | boolean (100% on mobile, auto ≥md) | false |
| `download` | boolean\|string (anchors) | — |
| `disabled` | boolean | false |
Slots: default (label), `icon`, `icon-end`. Min target 44px (`lg`=52px).
```astro
<Button href="#builder" variant="primary" size="lg" block>Build your bill of sale</Button>
<Button href="/file.pdf" variant="secondary" download>Download PDF</Button>
<Button variant="ghost" size="sm">Skip</Button>
```

### Card — `Card.astro`
Elevated surface; whole-card link when `href` set (lift + accent border on hover).
| Prop | Values | Default |
|---|---|---|
| `href` | string → whole card is a link | — |
| `variant` | `default`\|`raised`\|`outline`\|`ghost` | `default` |
| `padding` | `sm`\|`md`\|`lg`\|`none` | `md` |
| `interactive` | boolean (hover lift without being a link) | false |
| `as` | tag (non-link) | `div` |
Slots: default (body), `media` (flush top), `header`, `footer`.
```astro
<Card href="/bill-of-sale/" variant="raised">
  <Eyebrow>Legal templates</Eyebrow>
  <h3>Bill of sale</h3>
  <p>US + UK variants with a cited statute.</p>
</Card>
```

### Badge — `Badge.astro`
Compact chip (jurisdiction tags, "Free", counts).
| Prop | Values | Default |
|---|---|---|
| `tone` | `neutral`\|`accent`\|`brand`\|`success`\|`danger`\|`info` | `neutral` |
| `variant` | `soft`\|`solid`\|`outline` | `soft` |
| `size` | `sm`\|`md` | `sm` |
| `pill` | boolean | true |
Slots: default (label), `icon`.
```astro
<Badge tone="brand">US</Badge>
<Badge tone="success" variant="solid">Free</Badge>
```

### Callout — `Callout.astro`
Aside/note block. Tone is reinforced by title/icon text, not color alone.
| Prop | Values | Default |
|---|---|---|
| `tone` | `note`\|`tip`\|`success`\|`warning`\|`info` | `note` |
| `title` | string heading | — |
| `as` | tag | `aside` |
Slots: default (body), `icon`, `title` (rich override).
```astro
<Callout tone="warning" title="Jurisdiction note">
  <p>Notarization is required in some US states. Check your state below.</p>
</Callout>
```

### Stat — `Stat.astro`
A figure + label for trust strips. Compose several in a `Grid`/flex row.
| Prop | Values | Default |
|---|---|---|
| `value` | string\|number (or default slot) | — |
| `label` | string (or `label` slot) | — |
| `align` | `start`\|`center`\|`end` | `center` |
| `tone` | `default`\|`accent`\|`brand` | `default` |
```astro
<Stat value="138" label="templates" />
<Stat value="US + UK" label="jurisdictions" tone="accent" />
```

### Section — `Section.astro`
Vertical-rhythm band with optional tone background + nested `Container`.
| Prop | Values | Default |
|---|---|---|
| `tone` | `default`\|`surface`\|`sunken`\|`brand`\|`accent` | `default` |
| `space` | `default`\|`sm`\|`none` | `default` |
| `container` | `page`\|`content`\|`narrow`\|`wide`\|`false` (bare) | `page` |
| `as` | tag | `section` |
Pass `aria-label`/`aria-labelledby` via rest.
```astro
<Section tone="brand" aria-labelledby="cta-h">
  <h2 id="cta-h">Start building</h2>
  <Button href="#builder" variant="accent" size="lg" block>Build it now</Button>
</Section>
```

### Container — `Container.astro`
Centered max-width gutter wrapper (prop-driven sibling of the `.container` utility).
| Prop | Values | Default |
|---|---|---|
| `size` | `page`(1200)\|`content`(72ch)\|`narrow`(56ch)\|`wide`(84ch) | `page` |
| `as` | tag | `div` |

### Grid — `Grid.astro`
Responsive auto-fill grid (the repeated `minmax` tile pattern).
| Prop | Values | Default |
|---|---|---|
| `min` | min column width | `220px` |
| `gap` | `sm`\|`md`\|`lg` | `md` |
| `cols` | `2`\|`3`\|`4` (fixed count ≥md, 1-col below) | — (auto-fill) |
| `as` | tag; `ul` strips list styling | `div` |
```astro
<Grid as="ul" min="240px" gap="lg">
  {items.map(i => <li><Card href={i.href}>{i.title}</Card></li>)}
</Grid>
```

### Prose — `Prose.astro`
Reading-rhythm wrapper for author content (`<Content/>`, FAQ answers). Applies
flow spacing, heading top-margins, and the reading measure; scoped so it never
leaks into chrome.
| Prop | Values | Default |
|---|---|---|
| `measure` | `content`\|`narrow`\|`wide`\|`full` | `content` |
| `as` | tag | `div` |
```astro
<Prose><Content /></Prose>
```

### Eyebrow — `Eyebrow.astro`
Uppercase kicker above a heading.
| Prop | Values | Default |
|---|---|---|
| `tone` | `accent`\|`muted`\|`brand` | `accent` |
| `as` | tag | `p` |
```astro
<Eyebrow>Step 2</Eyebrow>
```

---

## 7. Notes for the surface agents

- **Don't duplicate** the `minmax` grid, button, or card CSS — compose the primitives. They already encode tokens, touch targets (≥44px), hover/focus, and dark mode.
- Consume **semantic tokens** (`--bg-elev`, `--fg-muted`, `--accent`, `--brand`), never raw ramp hexes, so dark mode/future re-tints work for free.
- The **legacy `.container`, `.sr-only`, `.skip-link`, dense-UI line-height** rules stay in global.css; existing pages still depend on them.
- Existing component CSS (DownloadBlock, AuthorBox, SourceList, tiles, builder) was **not** migrated to primitives — that's surface-agent work. New `--surface-*`, `--brand`, `--space-section`, motion, and functional tokens are available for that migration.
- Builder font gating, lazy export imports, and prior a11y work are untouched — keep them.
- Keep JS minimal: primitives are zero-JS; the builder island stays the only island.
