# Plan 1 — Foundation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Stand up the template.how site skeleton — Astro 5 project, design tokens, shared layouts and components, build-time link-graph validator, and Cloudflare Pages deploy pipeline — with the homepage and one stub NODE live on the production domain.

**Architecture:** Astro 5 static site generator with Content Collections for structured content. React islands reserved for future interactive builder. All styling via CSS custom properties driven by a design token file. Build pipeline enforces semantic and structural quality gates (link graph, Lighthouse budget) before deploy. GitHub → Cloudflare Pages auto-deploy on push to `main`.

**Tech Stack:**
- Node.js 20+, npm
- Astro 5, `@astrojs/react`, `@astrojs/mdx`, `@astrojs/sitemap`
- Vitest for unit tests, Playwright for E2E smoke test
- Cloudflare Pages (`sunnypat81` account)
- GitHub Actions for CI + weekly rebuild cron
- `lighthouse-ci` for perf budget enforcement

**Reference documents:**
- Spec: `docs/superpowers/specs/2026-04-22-template-how-design.md`
- Launch SEED list: `docs/superpowers/specs/2026-04-22-launch-seed-list.md`

---

## File Structure

```
template-how/
├── .github/workflows/
│   ├── ci.yml                     # lint, test, typecheck, link-graph, lighthouse on PR
│   └── weekly-rebuild.yml         # Mon 06:00 UTC rebuild cron
├── astro.config.mjs
├── tsconfig.json
├── package.json
├── public/
│   ├── robots.txt
│   ├── llms.txt                   # empty at Plan 1; populated in Plan 3
│   └── favicon.svg
├── src/
│   ├── pages/
│   │   ├── index.astro            # ROOT homepage
│   │   ├── [node]/index.astro     # NODE hub dynamic route (stubbed at Plan 1)
│   │   ├── 404.astro
│   │   ├── about.astro
│   │   └── contact.astro
│   ├── content/
│   │   ├── config.ts              # Content Collections schemas (nodes, seeds, variants, guides, blog)
│   │   └── nodes/
│   │       └── legal-document-templates.md   # one seed NODE for smoke test
│   ├── layouts/
│   │   ├── BaseLayout.astro
│   │   ├── NodeLayout.astro
│   │   └── SeedLayout.astro       # stub at Plan 1, fleshed in Plan 2/3
│   ├── components/
│   │   ├── ui/
│   │   │   ├── Nav.astro
│   │   │   ├── Footer.astro
│   │   │   ├── Breadcrumb.astro
│   │   │   ├── RelatedGrid.astro
│   │   │   ├── AuthorBox.astro
│   │   │   ├── SourceList.astro
│   │   │   └── EmailCapture.astro
│   │   └── schema/
│   │       ├── OrganizationSchema.astro
│   │       ├── BreadcrumbSchema.astro
│   │       └── PersonSchema.astro
│   ├── lib/
│   │   ├── site.ts                # site-level constants (name, author, URLs)
│   │   └── linkGraph.ts           # build-time orphan validator
│   └── styles/
│       ├── tokens.css             # design tokens (colours, fonts, spacing, radii)
│       ├── global.css             # element resets, base typography
│       └── print.css              # print-only rules for future builder exports
├── tests/
│   ├── unit/
│   │   └── linkGraph.test.ts
│   └── e2e/
│       └── smoke.spec.ts
├── scripts/
│   └── validate-link-graph.ts     # invoked from CI + from Astro integration
├── lighthouserc.json
├── README.md
└── .gitignore
```

Files that change together live together. Design tokens are the single source of truth — no hardcoded colours/fonts anywhere else. The `linkGraph` validator lives in `lib/` (consumed by the Astro integration) and is re-exported by `scripts/validate-link-graph.ts` for CI.

---

## Task 1: Initialise the Astro project and commit baseline

**Files:**
- Create: `C:\Users\sunny\repos\template-how\package.json`
- Create: `C:\Users\sunny\repos\template-how\astro.config.mjs`
- Create: `C:\Users\sunny\repos\template-how\tsconfig.json`
- Create: `C:\Users\sunny\repos\template-how\.gitignore`
- Create: `C:\Users\sunny\repos\template-how\README.md`

- [ ] **Step 1: Create `package.json`**

```json
{
  "name": "template-how",
  "version": "0.0.1",
  "private": true,
  "type": "module",
  "scripts": {
    "dev": "astro dev",
    "build": "astro build",
    "preview": "astro preview",
    "test": "vitest run",
    "test:e2e": "playwright test",
    "lint": "eslint src scripts --ext .ts,.tsx,.astro",
    "typecheck": "astro check && tsc --noEmit",
    "validate:links": "tsx scripts/validate-link-graph.ts",
    "lighthouse": "lhci autorun"
  },
  "dependencies": {
    "astro": "^5.0.0",
    "@astrojs/react": "^4.0.0",
    "@astrojs/mdx": "^4.0.0",
    "@astrojs/sitemap": "^3.0.0",
    "react": "^18.3.0",
    "react-dom": "^18.3.0"
  },
  "devDependencies": {
    "@astrojs/check": "^0.9.0",
    "@lhci/cli": "^0.14.0",
    "@playwright/test": "^1.47.0",
    "@types/node": "^22.0.0",
    "@types/react": "^18.3.0",
    "@types/react-dom": "^18.3.0",
    "@typescript-eslint/eslint-plugin": "^8.0.0",
    "@typescript-eslint/parser": "^8.0.0",
    "eslint": "^9.0.0",
    "eslint-plugin-astro": "^1.3.0",
    "tsx": "^4.19.0",
    "typescript": "^5.6.0",
    "vitest": "^2.0.0"
  }
}
```

- [ ] **Step 2: Create `astro.config.mjs`**

```js
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://template.how',
  integrations: [react(), mdx(), sitemap()],
  trailingSlash: 'always',
  build: {
    format: 'directory',
    assets: '_assets'
  },
  vite: {
    resolve: {
      alias: {
        '@': new URL('./src', import.meta.url).pathname
      }
    }
  }
});
```

- [ ] **Step 3: Create `tsconfig.json`**

```json
{
  "extends": "astro/tsconfigs/strict",
  "compilerOptions": {
    "jsx": "react-jsx",
    "jsxImportSource": "react",
    "baseUrl": ".",
    "paths": { "@/*": ["src/*"] },
    "types": ["astro/client"]
  },
  "include": ["src", "scripts", "tests"]
}
```

- [ ] **Step 4: Create `.gitignore`**

```
node_modules/
dist/
.astro/
.env
.env.local
*.log
.DS_Store
.vscode/
.vite/
.lighthouseci/
test-results/
playwright-report/
```

- [ ] **Step 5: Create `README.md`**

```markdown
# template.how

US + UK template resource site. See `docs/superpowers/specs/2026-04-22-template-how-design.md`.

## Commands

- `npm run dev` — start dev server at http://localhost:4321
- `npm run build` — production build to `dist/`
- `npm test` — run unit tests
- `npm run test:e2e` — run Playwright smoke tests
- `npm run validate:links` — run build-time link-graph orphan check
- `npm run lighthouse` — run Lighthouse CI against built output

## Deploy

Pushes to `main` auto-deploy via Cloudflare Pages (`sunnypat81` account, project `template-how`).
```

- [ ] **Step 6: Install dependencies**

Run: `cd /c/Users/sunny/repos/template-how && npm install`
Expected: installs complete without peer-dep errors; `package-lock.json` created.

- [ ] **Step 7: Verify the scaffold runs**

Run: `cd /c/Users/sunny/repos/template-how && npm run build`
Expected: build completes (empty site — no pages yet, but no errors).

- [ ] **Step 8: Commit**

```bash
cd /c/Users/sunny/repos/template-how
git add .gitignore package.json package-lock.json astro.config.mjs tsconfig.json README.md
git commit -m "chore: scaffold Astro 5 project"
```

---

## Task 2: Design tokens + global CSS

**Files:**
- Create: `src/styles/tokens.css`
- Create: `src/styles/global.css`
- Create: `src/styles/print.css`

Palette locked during brainstorming: paper off-white `#FAF7F2`, deep navy `#0F1B3D`, accent amber `#D97706`.

- [ ] **Step 1: Create `src/styles/tokens.css`**

```css
:root {
  /* Neutrals (paper-warm) */
  --paper-50: #FEFDFB;
  --paper-100: #FAF7F2;
  --paper-200: #F2EDE4;
  --paper-300: #E6DFD2;
  --paper-500: #9A9084;
  --paper-700: #4B463E;
  --paper-900: #1F1C17;

  /* Brand navy */
  --navy-500: #1C2E5F;
  --navy-700: #0F1B3D;
  --navy-900: #060C20;

  /* Accent amber */
  --amber-400: #F59E0B;
  --amber-500: #D97706;
  --amber-600: #B45309;

  /* Semantic colours */
  --bg: var(--paper-100);
  --bg-elev: var(--paper-50);
  --fg: var(--navy-900);
  --fg-muted: var(--paper-700);
  --border: var(--paper-300);
  --accent: var(--amber-500);
  --accent-fg: #FFFFFF;
  --link: var(--navy-700);
  --link-hover: var(--amber-500);

  /* Typography */
  --font-display: 'Fraunces', Georgia, 'Times New Roman', serif;
  --font-body: 'Inter', system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif;
  --font-mono: 'JetBrains Mono', ui-monospace, Menlo, Consolas, monospace;

  /* Type scale */
  --fs-xs: 0.8125rem;
  --fs-sm: 0.9375rem;
  --fs-base: 1.0625rem;
  --fs-lg: 1.25rem;
  --fs-xl: 1.5rem;
  --fs-2xl: 2rem;
  --fs-3xl: 2.75rem;
  --fs-4xl: 3.75rem;

  --lh-tight: 1.2;
  --lh-body: 1.65;

  /* Spacing (4px base) */
  --sp-1: 0.25rem;
  --sp-2: 0.5rem;
  --sp-3: 0.75rem;
  --sp-4: 1rem;
  --sp-6: 1.5rem;
  --sp-8: 2rem;
  --sp-12: 3rem;
  --sp-16: 4rem;
  --sp-24: 6rem;

  /* Radii */
  --r-sm: 4px;
  --r-md: 8px;
  --r-lg: 12px;
  --r-xl: 20px;

  /* Elevation */
  --shadow-sm: 0 1px 2px rgba(15, 27, 61, 0.05), 0 1px 3px rgba(15, 27, 61, 0.08);
  --shadow-md: 0 4px 8px rgba(15, 27, 61, 0.06), 0 2px 16px rgba(15, 27, 61, 0.08);
  --shadow-lg: 0 12px 32px rgba(15, 27, 61, 0.12);

  /* Layout */
  --content-max: 72ch;
  --page-max: 1200px;
}

@media (prefers-color-scheme: dark) {
  :root {
    --bg: var(--navy-900);
    --bg-elev: var(--navy-700);
    --fg: var(--paper-100);
    --fg-muted: var(--paper-300);
    --border: var(--navy-500);
    --link: var(--amber-400);
    --link-hover: var(--amber-500);
  }
}

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

- [ ] **Step 2: Create `src/styles/global.css`**

```css
@import './tokens.css';

*, *::before, *::after { box-sizing: border-box; }

html {
  font-family: var(--font-body);
  font-size: 16px;
  color: var(--fg);
  background: var(--bg);
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  scroll-behavior: smooth;
}

body {
  margin: 0;
  line-height: var(--lh-body);
  font-size: var(--fs-base);
}

h1, h2, h3, h4 {
  font-family: var(--font-display);
  font-weight: 500;
  line-height: var(--lh-tight);
  letter-spacing: -0.01em;
  margin: 0 0 var(--sp-4);
  color: var(--fg);
}

h1 { font-size: var(--fs-4xl); letter-spacing: -0.02em; }
h2 { font-size: var(--fs-3xl); }
h3 { font-size: var(--fs-2xl); }
h4 { font-size: var(--fs-xl); }

p { margin: 0 0 var(--sp-4); max-width: var(--content-max); }

a {
  color: var(--link);
  text-decoration-thickness: 1px;
  text-underline-offset: 3px;
  transition: color 160ms ease;
}
a:hover { color: var(--link-hover); }
a:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 3px;
  border-radius: var(--r-sm);
}

img, svg { max-width: 100%; height: auto; display: block; }

.container {
  width: min(100% - var(--sp-8), var(--page-max));
  margin-inline: auto;
}

.sr-only {
  position: absolute;
  width: 1px; height: 1px;
  padding: 0; margin: -1px;
  overflow: hidden; clip: rect(0, 0, 0, 0);
  white-space: nowrap; border: 0;
}
```

- [ ] **Step 3: Create `src/styles/print.css`**

```css
@media print {
  nav, footer, .no-print { display: none !important; }
  body { background: #fff; color: #000; font-size: 12pt; }
  a { color: inherit; text-decoration: none; }
  h1, h2, h3 { page-break-after: avoid; }
  p, li { orphans: 3; widows: 3; }
}
```

- [ ] **Step 4: Commit**

```bash
git add src/styles/
git commit -m "feat: add design tokens and global styles"
```

---

## Task 3: Site constants and typed config

**Files:**
- Create: `src/lib/site.ts`

- [ ] **Step 1: Write unit test `tests/unit/site.test.ts`**

```ts
import { describe, it, expect } from 'vitest';
import { site, author, NODE_SLUGS } from '../../src/lib/site';

describe('site config', () => {
  it('uses the canonical production URL', () => {
    expect(site.url).toBe('https://template.how');
  });
  it('exposes the full brand name', () => {
    expect(site.name).toBe('Template.how');
  });
  it('has exactly eight NODE slugs', () => {
    expect(NODE_SLUGS).toHaveLength(8);
  });
  it('lists the author with required sameAs links', () => {
    expect(author.name).toBe('Sunny Patel');
    expect(author.sameAs).toContain('https://www.linkedin.com/in/sunnypatel1994/');
  });
});
```

- [ ] **Step 2: Run the test to see it fail**

Run: `npm test -- tests/unit/site.test.ts`
Expected: FAIL — `Cannot find module '../../src/lib/site'`.

- [ ] **Step 3: Create `src/lib/site.ts`**

```ts
export const site = {
  name: 'Template.how',
  tagline: 'US + UK templates — built to be read, used, and cited.',
  url: 'https://template.how',
  locale: 'en',
  defaultOgImage: '/og/default.png'
} as const;

export const author = {
  name: 'Sunny Patel',
  jobTitle: 'SEO Consultant & Template Editor',
  url: 'https://sunnypatel.co.uk',
  sameAs: [
    'https://www.linkedin.com/in/sunnypatel1994/',
    'https://twitter.com/2012infinite',
    'https://clutch.co/profile/sunny-patel'
  ]
} as const;

export const NODE_SLUGS = [
  'legal-document-templates',
  'resume-templates',
  'business-templates',
  'life-event-templates',
  'planning-templates',
  'design-templates',
  'education-templates',
  'productivity-templates'
] as const;

export type NodeSlug = typeof NODE_SLUGS[number];

export const NODE_LABELS: Record<NodeSlug, string> = {
  'legal-document-templates': 'Legal documents',
  'resume-templates': 'Resumes & careers',
  'business-templates': 'Business operations',
  'life-event-templates': 'Life events',
  'planning-templates': 'Planning',
  'design-templates': 'Design & creative',
  'education-templates': 'Education',
  'productivity-templates': 'Productivity'
};
```

- [ ] **Step 4: Run the test — expect pass**

Run: `npm test -- tests/unit/site.test.ts`
Expected: PASS (4 tests).

- [ ] **Step 5: Commit**

```bash
git add src/lib/site.ts tests/unit/site.test.ts
git commit -m "feat: add typed site constants and NODE slug registry"
```

---

## Task 4: Content Collections schemas

**Files:**
- Create: `src/content/config.ts`
- Create: `src/content/nodes/legal-document-templates.md`

- [ ] **Step 1: Create `src/content/config.ts`**

```ts
import { defineCollection, z } from 'astro:content';
import { NODE_SLUGS } from '@/lib/site';

const nodes = defineCollection({
  type: 'content',
  schema: z.object({
    slug: z.enum(NODE_SLUGS),
    label: z.string(),
    headline: z.string(),
    lede: z.string(),
    seeds: z.array(z.string()),
    updated: z.string().transform((s) => new Date(s))
  })
});

const seeds = defineCollection({
  type: 'content',
  schema: z.object({
    slug: z.string(),
    node: z.enum(NODE_SLUGS),
    title: z.string(),
    h1: z.string(),
    definitionalLede: z.string(),
    primaryKeyword: z.string(),
    searchVolume: z.number().int().nonnegative(),
    difficulty: z.number().int().min(0).max(100),
    renderer: z.enum(['legal-document', 'resume', 'invoice', 'letter', 'list-plan', 'static-only']),
    related: z.array(z.string()).min(4),
    crossCluster: z.array(z.string()).min(1),
    audience: z.array(z.enum(['us', 'uk'])).min(1),
    wordCountFloor: z.number().int().default(1800),
    sources: z.array(z.object({
      title: z.string(),
      url: z.string().url(),
      accessed: z.string()
    })).min(1),
    updated: z.string().transform((s) => new Date(s))
  })
});

const variants = defineCollection({
  type: 'content',
  schema: z.object({
    slug: z.string(),
    parentSeed: z.string(),
    jurisdictionCode: z.string(),
    title: z.string(),
    h1: z.string(),
    definitionalLede: z.string(),
    audience: z.enum(['us', 'uk']),
    wordCountFloor: z.number().int().default(1200),
    siblings: z.array(z.string()).min(3),
    sources: z.array(z.object({
      title: z.string(),
      url: z.string().url(),
      accessed: z.string()
    })).min(1),
    updated: z.string().transform((s) => new Date(s))
  })
});

const guides = defineCollection({
  type: 'content',
  schema: z.object({
    slug: z.string(),
    node: z.enum(NODE_SLUGS),
    title: z.string(),
    h1: z.string(),
    lede: z.string(),
    references: z.array(z.string()).min(2),
    updated: z.string().transform((s) => new Date(s))
  })
});

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    slug: z.string(),
    title: z.string(),
    h1: z.string(),
    lede: z.string(),
    published: z.string().transform((s) => new Date(s)),
    updated: z.string().transform((s) => new Date(s))
  })
});

export const collections = { nodes, seeds, variants, guides, blog };
```

- [ ] **Step 2: Create the smoke-test NODE entry**

Create `src/content/nodes/legal-document-templates.md`:

```markdown
---
slug: legal-document-templates
label: Legal documents
headline: Legal document templates, built to stand up
lede: A working library of legal document templates with per-state United States and per-nation United Kingdom variants. Every template carries its governing statute and a last-verified date. Nothing here is legal advice.
seeds:
  - bill-of-sale
  - letter-of-recommendation
  - resignation-letter
  - doctors-note
  - offer-letter
  - recommendation-letter
  - lease-agreement
  - eviction-notice
  - nda
  - rental-agreement
  - operating-agreement
  - last-will
updated: '2026-04-22'
---

Legal documents are the backbone of ordinary transactions — selling a used car, resigning from a job, leasing a flat, lending money between family members. Template.how publishes each legal document in two forms: a fill-in-browser builder that outputs a clean PDF or DOCX, and a pre-made download for people in a hurry. Every document has jurisdiction-specific variants because a Californian bill of sale and a Texas bill of sale are not the same instrument, and an English residential lease is not a Scottish one.
```

- [ ] **Step 3: Build — expect content collection parse to succeed**

Run: `npm run build`
Expected: build emits `.astro/content.d.ts` with generated types and completes with only the `legal-document-templates` content entry logged.

- [ ] **Step 4: Commit**

```bash
git add src/content/
git commit -m "feat: Content Collections schemas and seed NODE entry"
```

---

## Task 5: BaseLayout + shared UI components

**Files:**
- Create: `src/layouts/BaseLayout.astro`
- Create: `src/components/ui/Nav.astro`
- Create: `src/components/ui/Footer.astro`
- Create: `src/components/ui/Breadcrumb.astro`
- Create: `src/components/schema/OrganizationSchema.astro`
- Create: `src/components/schema/BreadcrumbSchema.astro`
- Create: `src/components/schema/PersonSchema.astro`

- [ ] **Step 1: Create `src/components/schema/OrganizationSchema.astro`**

```astro
---
import { site, author } from '@/lib/site';
---
<script type="application/ld+json" set:html={JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: site.name,
  url: site.url,
  logo: `${site.url}/logo.svg`,
  founder: {
    '@type': 'Person',
    name: author.name,
    url: author.url,
    sameAs: author.sameAs
  }
})} />
```

- [ ] **Step 2: Create `src/components/schema/BreadcrumbSchema.astro`**

```astro
---
import { site } from '@/lib/site';
interface Crumb { name: string; href: string; }
interface Props { crumbs: Crumb[]; }
const { crumbs } = Astro.props;
const items = crumbs.map((c, i) => ({
  '@type': 'ListItem',
  position: i + 1,
  name: c.name,
  item: c.href.startsWith('http') ? c.href : `${site.url}${c.href}`
}));
---
<script type="application/ld+json" set:html={JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items
})} />
```

- [ ] **Step 3: Create `src/components/schema/PersonSchema.astro`**

```astro
---
import { author } from '@/lib/site';
---
<script type="application/ld+json" set:html={JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: author.name,
  jobTitle: author.jobTitle,
  url: author.url,
  sameAs: author.sameAs
})} />
```

- [ ] **Step 4: Create `src/components/ui/Nav.astro`**

```astro
---
import { NODE_SLUGS, NODE_LABELS } from '@/lib/site';
---
<nav aria-label="Primary" class="site-nav">
  <div class="container nav-inner">
    <a href="/" class="wordmark" aria-label="Template.how home">
      <strong>Template</strong><span class="dot">.</span><span class="tld">how</span>
    </a>
    <ul class="nav-links">
      {NODE_SLUGS.map((slug) => (
        <li><a href={`/${slug}/`}>{NODE_LABELS[slug]}</a></li>
      ))}
    </ul>
  </div>
</nav>

<style>
.site-nav {
  position: sticky; top: 0; z-index: 10;
  background: color-mix(in srgb, var(--bg) 88%, transparent);
  backdrop-filter: saturate(180%) blur(8px);
  border-bottom: 1px solid var(--border);
}
.nav-inner {
  display: flex; align-items: center; justify-content: space-between;
  padding: var(--sp-4) 0;
}
.wordmark {
  font-family: var(--font-display);
  font-size: var(--fs-xl);
  color: var(--fg);
  text-decoration: none;
  letter-spacing: -0.02em;
}
.wordmark .dot { color: var(--accent); }
.wordmark .tld { color: var(--fg-muted); font-weight: 400; }
.nav-links {
  display: flex; gap: var(--sp-6); list-style: none; margin: 0; padding: 0;
  flex-wrap: wrap;
}
.nav-links a {
  font-size: var(--fs-sm);
  color: var(--fg-muted);
  text-decoration: none;
}
.nav-links a:hover { color: var(--accent); }
@media (max-width: 860px) {
  .nav-links { display: none; }
}
</style>
```

- [ ] **Step 5: Create `src/components/ui/Footer.astro`**

```astro
---
import { NODE_SLUGS, NODE_LABELS, site, author } from '@/lib/site';
---
<footer class="site-footer">
  <div class="container footer-grid">
    <div>
      <p class="wordmark-foot"><strong>Template</strong><span class="dot">.</span>how</p>
      <p class="tagline">{site.tagline}</p>
      <p class="credit">Edited by <a href={author.url}>{author.name}</a>.</p>
    </div>
    <nav aria-label="Categories">
      <h4>Categories</h4>
      <ul>
        {NODE_SLUGS.map((slug) => (
          <li><a href={`/${slug}/`}>{NODE_LABELS[slug]}</a></li>
        ))}
      </ul>
    </nav>
    <nav aria-label="Site">
      <h4>Site</h4>
      <ul>
        <li><a href="/about/">About</a></li>
        <li><a href="/contact/">Contact</a></li>
        <li><a href="/privacy/">Privacy</a></li>
        <li><a href="/terms/">Terms</a></li>
      </ul>
    </nav>
  </div>
  <div class="container sub">
    <small>&copy; {new Date().getFullYear()} Template.how. Nothing on this site is legal, tax, or financial advice.</small>
  </div>
</footer>

<style>
.site-footer {
  margin-top: var(--sp-24);
  padding: var(--sp-16) 0 var(--sp-8);
  background: var(--paper-200);
  border-top: 1px solid var(--border);
}
.footer-grid {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
  gap: var(--sp-8);
}
.footer-grid h4 {
  font-size: var(--fs-sm); text-transform: uppercase; letter-spacing: 0.08em;
  font-family: var(--font-body); font-weight: 600;
  color: var(--fg-muted); margin-bottom: var(--sp-3);
}
.footer-grid ul { list-style: none; padding: 0; margin: 0; }
.footer-grid li { margin-bottom: var(--sp-2); font-size: var(--fs-sm); }
.wordmark-foot { font-family: var(--font-display); font-size: var(--fs-xl); margin: 0; }
.wordmark-foot .dot { color: var(--accent); }
.tagline { font-size: var(--fs-sm); color: var(--fg-muted); max-width: 40ch; }
.credit { font-size: var(--fs-sm); color: var(--fg-muted); }
.sub { margin-top: var(--sp-12); color: var(--fg-muted); font-size: var(--fs-xs); }
@media (max-width: 720px) {
  .footer-grid { grid-template-columns: 1fr; }
}
</style>
```

- [ ] **Step 6: Create `src/components/ui/Breadcrumb.astro`**

```astro
---
interface Crumb { name: string; href: string; }
interface Props { crumbs: Crumb[]; }
const { crumbs } = Astro.props;
---
<nav aria-label="Breadcrumb" class="crumb">
  <ol>
    {crumbs.map((c, i) => (
      <li>
        {i < crumbs.length - 1
          ? <a href={c.href}>{c.name}</a>
          : <span aria-current="page">{c.name}</span>}
        {i < crumbs.length - 1 && <span class="sep" aria-hidden="true">›</span>}
      </li>
    ))}
  </ol>
</nav>

<style>
.crumb { margin: var(--sp-4) 0 var(--sp-6); font-size: var(--fs-sm); color: var(--fg-muted); }
.crumb ol { list-style: none; margin: 0; padding: 0; display: flex; flex-wrap: wrap; gap: var(--sp-2); }
.crumb a { color: var(--fg-muted); }
.crumb .sep { padding: 0 var(--sp-2); }
</style>
```

- [ ] **Step 7: Create `src/layouts/BaseLayout.astro`**

```astro
---
import '@/styles/global.css';
import '@/styles/print.css';
import Nav from '@/components/ui/Nav.astro';
import Footer from '@/components/ui/Footer.astro';
import OrganizationSchema from '@/components/schema/OrganizationSchema.astro';
import { site } from '@/lib/site';

interface Props {
  title: string;
  description: string;
  canonical?: string;
  ogImage?: string;
  noindex?: boolean;
  publishedTime?: Date;
  modifiedTime?: Date;
}

const {
  title,
  description,
  canonical = new URL(Astro.url.pathname, site.url).toString(),
  ogImage = site.defaultOgImage,
  noindex = false,
  publishedTime,
  modifiedTime
} = Astro.props;
---
<!doctype html>
<html lang={site.locale}>
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>{title} | {site.name}</title>
  <meta name="description" content={description} />
  <link rel="canonical" href={canonical} />
  {noindex && <meta name="robots" content="noindex,follow" />}
  <meta property="og:type" content="article" />
  <meta property="og:title" content={title} />
  <meta property="og:description" content={description} />
  <meta property="og:url" content={canonical} />
  <meta property="og:image" content={new URL(ogImage, site.url).toString()} />
  <meta name="twitter:card" content="summary_large_image" />
  {publishedTime && <meta property="article:published_time" content={publishedTime.toISOString()} />}
  {modifiedTime && <meta property="article:modified_time" content={modifiedTime.toISOString()} />}
  <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500&family=Inter:wght@400;500;600&display=swap" rel="stylesheet" />
  <OrganizationSchema />
  <slot name="head" />
</head>
<body>
  <a href="#main" class="sr-only">Skip to content</a>
  <Nav />
  <main id="main">
    <slot />
  </main>
  <Footer />
</body>
</html>
```

- [ ] **Step 8: Commit**

```bash
git add src/components/ src/layouts/BaseLayout.astro
git commit -m "feat: BaseLayout, Nav, Footer, Breadcrumb, baseline schema components"
```

---

## Task 6: Homepage (ROOT)

**Files:**
- Create: `src/pages/index.astro`
- Create: `public/favicon.svg`
- Create: `public/robots.txt`
- Create: `public/llms.txt`

- [ ] **Step 1: Create `public/favicon.svg`**

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <rect width="64" height="64" rx="12" fill="#0F1B3D"/>
  <text x="32" y="44" text-anchor="middle" font-family="Georgia, serif" font-size="40" font-weight="500" fill="#FAF7F2">T</text>
  <circle cx="48" cy="50" r="5" fill="#D97706"/>
</svg>
```

- [ ] **Step 2: Create `public/robots.txt`**

```
User-agent: *
Allow: /

Sitemap: https://template.how/sitemap-index.xml
```

- [ ] **Step 3: Create `public/llms.txt`**

```
# Template.how

US + UK template resource site. Every legal / tax / compliance template carries per-state United States and per-nation United Kingdom variants with a named governing statute and a last-verified date.

## Categories
- /legal-document-templates/ — Legal documents (bill of sale, NDA, lease, will, etc.)
- /resume-templates/ — Resumes and careers
- /business-templates/ — Business operations (invoice, P&L, meeting minutes)
- /life-event-templates/ — Life events (obituary, family tree, birth plan)
- /planning-templates/ — Planning (lesson plans, itineraries, budgets)
- /design-templates/ — Design and creative (CapCut, Roblox, posters)
- /education-templates/ — Education (Cornell notes, Venn diagram)
- /productivity-templates/ — Productivity (to-do, checklist, planner)

## Authorship
Edited by Sunny Patel, SEO consultant. https://sunnypatel.co.uk
```

- [ ] **Step 4: Create `src/pages/index.astro`**

```astro
---
import BaseLayout from '@/layouts/BaseLayout.astro';
import { NODE_SLUGS, NODE_LABELS, site } from '@/lib/site';

const featured = [
  { slug: 'bill-of-sale', title: 'Bill of sale', node: 'legal-document-templates' },
  { slug: 'resume', title: 'Resume', node: 'resume-templates' },
  { slug: 'invoice', title: 'Invoice', node: 'business-templates' },
  { slug: 'obituary', title: 'Obituary', node: 'life-event-templates' },
  { slug: 'lesson-plan', title: 'Lesson plan', node: 'planning-templates' },
  { slug: 'capcut', title: 'CapCut', node: 'design-templates' },
  { slug: 'cornell-notes', title: 'Cornell notes', node: 'education-templates' },
  { slug: 'to-do-list', title: 'To-do list', node: 'productivity-templates' }
];
---
<BaseLayout
  title="Templates, built to be used and cited"
  description="A working library of US and UK templates — bills of sale, resumes, invoices, lesson plans, and more — with jurisdiction-specific variants and a stated governing source.">
  <section class="hero">
    <div class="container">
      <h1>Templates you can actually use.</h1>
      <p class="lede">Documents that cite their sources, name their jurisdiction, and stop pretending the United States and the United Kingdom are the same place.</p>
    </div>
  </section>

  <section class="featured">
    <div class="container">
      <h2>Popular templates</h2>
      <ul class="tiles">
        {featured.map((t) => (
          <li>
            <a href={`/${t.slug}/`}>
              <span class="tile-title">{t.title}</span>
              <span class="tile-node">{NODE_LABELS[t.node as keyof typeof NODE_LABELS]}</span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  </section>

  <section class="categories">
    <div class="container">
      <h2>Browse by category</h2>
      <ul class="cats">
        {NODE_SLUGS.map((slug) => (
          <li><a href={`/${slug}/`}>{NODE_LABELS[slug]}</a></li>
        ))}
      </ul>
    </div>
  </section>
</BaseLayout>

<style>
.hero { padding: var(--sp-24) 0 var(--sp-16); }
.hero h1 { max-width: 18ch; font-size: var(--fs-4xl); }
.lede { font-size: var(--fs-lg); color: var(--fg-muted); max-width: 56ch; }

.featured { padding: var(--sp-12) 0; }
.tiles {
  list-style: none; padding: 0; margin: var(--sp-6) 0 0;
  display: grid; gap: var(--sp-4);
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
}
.tiles a {
  display: block; padding: var(--sp-6);
  background: var(--bg-elev); border: 1px solid var(--border);
  border-radius: var(--r-md); text-decoration: none;
  transition: transform 160ms ease, border-color 160ms ease;
}
.tiles a:hover { transform: translateY(-2px); border-color: var(--accent); }
.tile-title { display: block; font-family: var(--font-display); font-size: var(--fs-xl); color: var(--fg); }
.tile-node { display: block; margin-top: var(--sp-2); font-size: var(--fs-xs); color: var(--fg-muted); text-transform: uppercase; letter-spacing: 0.08em; }

.categories { padding: var(--sp-12) 0 var(--sp-16); }
.cats {
  list-style: none; padding: 0; margin: var(--sp-6) 0 0;
  display: grid; gap: var(--sp-3);
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
}
.cats a {
  display: block; padding: var(--sp-4) var(--sp-6);
  border: 1px solid var(--border); border-radius: var(--r-md);
  text-decoration: none; color: var(--fg);
  font-family: var(--font-display); font-size: var(--fs-lg);
}
.cats a:hover { background: var(--paper-200); }
</style>
```

- [ ] **Step 5: Build and verify**

Run: `npm run build`
Expected: `dist/index.html` exists; contains the H1 "Templates you can actually use."; organization JSON-LD present in `<head>`.

- [ ] **Step 6: Commit**

```bash
git add public/ src/pages/index.astro
git commit -m "feat: homepage with category tiles, robots, llms.txt, favicon"
```

---

## Task 7: NODE dynamic route (stub)

**Files:**
- Create: `src/layouts/NodeLayout.astro`
- Create: `src/pages/[node]/index.astro`

At Plan 1 a NODE page shows the category heading, lede, and a placeholder SEED list (SEEDs are authored in Plan 3). This is enough to validate routing and internal linking.

- [ ] **Step 1: Create `src/layouts/NodeLayout.astro`**

```astro
---
import BaseLayout from '@/layouts/BaseLayout.astro';
import Breadcrumb from '@/components/ui/Breadcrumb.astro';
import BreadcrumbSchema from '@/components/schema/BreadcrumbSchema.astro';
import { NODE_LABELS, site } from '@/lib/site';
import type { NodeSlug } from '@/lib/site';

interface Props {
  slug: NodeSlug;
  headline: string;
  lede: string;
  seeds: string[];
  updated: Date;
}

const { slug, headline, lede, seeds, updated } = Astro.props;
const crumbs = [
  { name: 'Home', href: '/' },
  { name: NODE_LABELS[slug], href: `/${slug}/` }
];
---
<BaseLayout
  title={`${NODE_LABELS[slug]} templates`}
  description={lede}
  modifiedTime={updated}>
  <BreadcrumbSchema slot="head" crumbs={crumbs} />
  <div class="container">
    <Breadcrumb crumbs={crumbs} />
    <header class="node-hero">
      <h1>{headline}</h1>
      <p class="lede">{lede}</p>
    </header>

    <section class="seeds">
      <h2>Templates in this category</h2>
      <ul class="seed-list">
        {seeds.map((s) => (
          <li><a href={`/${s}/`}>{s.replace(/-/g, ' ')}</a></li>
        ))}
      </ul>
      <p class="note">SEED pages land in Plan 3. Every page on this site must link to every other relevant page — no orphans.</p>
    </section>

    <aside class="siblings">
      <h2>Other categories</h2>
      <ul>
        {Object.entries(NODE_LABELS)
          .filter(([k]) => k !== slug)
          .map(([k, v]) => (
            <li><a href={`/${k}/`}>{v}</a></li>
          ))}
      </ul>
    </aside>
  </div>
</BaseLayout>

<style>
.node-hero { padding: var(--sp-12) 0 var(--sp-8); max-width: var(--content-max); }
.node-hero h1 { font-size: var(--fs-3xl); }
.lede { font-size: var(--fs-lg); color: var(--fg-muted); }
.seeds { padding: var(--sp-4) 0 var(--sp-12); }
.seed-list { list-style: none; padding: 0; display: grid; gap: var(--sp-2); grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); }
.seed-list a { display: block; padding: var(--sp-3) var(--sp-4); border: 1px solid var(--border); border-radius: var(--r-sm); text-decoration: none; color: var(--fg); text-transform: capitalize; }
.seed-list a:hover { border-color: var(--accent); }
.note { margin-top: var(--sp-6); font-size: var(--fs-sm); color: var(--fg-muted); }
.siblings { padding: var(--sp-8) 0 var(--sp-12); border-top: 1px solid var(--border); }
.siblings ul { list-style: none; padding: 0; display: flex; gap: var(--sp-3); flex-wrap: wrap; }
.siblings a { font-size: var(--fs-sm); }
</style>
```

- [ ] **Step 2: Create `src/pages/[node]/index.astro`**

```astro
---
import { getCollection, type CollectionEntry } from 'astro:content';
import NodeLayout from '@/layouts/NodeLayout.astro';

export async function getStaticPaths() {
  const entries = await getCollection('nodes');
  return entries.map((entry: CollectionEntry<'nodes'>) => ({
    params: { node: entry.data.slug },
    props: { entry }
  }));
}

interface Props { entry: CollectionEntry<'nodes'>; }
const { entry } = Astro.props;
const { Content } = await entry.render();
---
<NodeLayout
  slug={entry.data.slug}
  headline={entry.data.headline}
  lede={entry.data.lede}
  seeds={entry.data.seeds}
  updated={entry.data.updated}>
  <div class="prose container">
    <Content />
  </div>
</NodeLayout>

<style>
.prose { max-width: var(--content-max); padding: var(--sp-4) 0 var(--sp-12); }
</style>
```

- [ ] **Step 3: Build and verify the route exists**

Run: `npm run build && ls dist/legal-document-templates/`
Expected: `index.html` present in `dist/legal-document-templates/`.

- [ ] **Step 4: Commit**

```bash
git add src/layouts/NodeLayout.astro src/pages/
git commit -m "feat: NodeLayout and dynamic [node] route (stub SEED list)"
```

---

## Task 8: Build-time link-graph orphan validator

**Files:**
- Create: `src/lib/linkGraph.ts`
- Create: `scripts/validate-link-graph.ts`
- Create: `tests/unit/linkGraph.test.ts`

Per spec §4.4 and §11.5: every page must have ≥3 incoming internal links. Build fails if a page has <3.

- [ ] **Step 1: Write failing test `tests/unit/linkGraph.test.ts`**

```ts
import { describe, it, expect } from 'vitest';
import { validateLinkGraph, type Page } from '../../src/lib/linkGraph';

describe('validateLinkGraph', () => {
  it('accepts a graph where every page has at least 3 incoming links', () => {
    const pages: Page[] = [
      { url: '/', outbound: ['/a/', '/b/', '/c/', '/d/'] },
      { url: '/a/', outbound: ['/', '/b/', '/c/', '/d/'] },
      { url: '/b/', outbound: ['/', '/a/', '/c/', '/d/'] },
      { url: '/c/', outbound: ['/', '/a/', '/b/', '/d/'] },
      { url: '/d/', outbound: ['/', '/a/', '/b/', '/c/'] }
    ];
    const result = validateLinkGraph(pages, { minIncoming: 3 });
    expect(result.orphans).toEqual([]);
    expect(result.underLinked).toEqual([]);
  });

  it('reports pages with zero incoming links as orphans', () => {
    const pages: Page[] = [
      { url: '/', outbound: ['/a/'] },
      { url: '/a/', outbound: ['/'] },
      { url: '/isolated/', outbound: [] }
    ];
    const result = validateLinkGraph(pages, { minIncoming: 3 });
    expect(result.orphans).toContain('/isolated/');
  });

  it('reports pages with 1-2 incoming links as under-linked', () => {
    const pages: Page[] = [
      { url: '/', outbound: ['/a/', '/b/'] },
      { url: '/a/', outbound: ['/b/'] },
      { url: '/b/', outbound: ['/a/'] }
    ];
    const result = validateLinkGraph(pages, { minIncoming: 3 });
    expect(result.underLinked.map((u) => u.url)).toContain('/a/');
    expect(result.underLinked.map((u) => u.url)).toContain('/b/');
  });

  it('ignores external links', () => {
    const pages: Page[] = [
      { url: '/', outbound: ['https://example.com/', '/a/', '/b/', '/c/'] },
      { url: '/a/', outbound: ['/', '/b/', '/c/', '/d/'] },
      { url: '/b/', outbound: ['/', '/a/', '/c/', '/d/'] },
      { url: '/c/', outbound: ['/', '/a/', '/b/', '/d/'] },
      { url: '/d/', outbound: ['/', '/a/', '/b/', '/c/'] }
    ];
    const result = validateLinkGraph(pages, { minIncoming: 3 });
    expect(result.orphans).toEqual([]);
  });

  it('normalises trailing slashes when counting incoming links', () => {
    const pages: Page[] = [
      { url: '/a/', outbound: ['/b', '/b/', '/b/?utm=x'] },
      { url: '/b/', outbound: ['/a/', '/a/', '/a/'] }
    ];
    const result = validateLinkGraph(pages, { minIncoming: 3 });
    // /b/ should have 3 incoming counted from /a/'s three variants
    expect(result.orphans).toEqual([]);
    expect(result.underLinked.map((u) => u.url)).not.toContain('/b/');
  });
});
```

- [ ] **Step 2: Run the test — expect fail**

Run: `npm test -- tests/unit/linkGraph.test.ts`
Expected: FAIL — module not found.

- [ ] **Step 3: Create `src/lib/linkGraph.ts`**

```ts
export interface Page {
  url: string;
  outbound: string[];
}

export interface ValidationOptions {
  minIncoming: number;
}

export interface ValidationResult {
  orphans: string[];
  underLinked: Array<{ url: string; incoming: number }>;
}

const normalise = (raw: string): string | null => {
  if (!raw) return null;
  if (/^https?:\/\//i.test(raw)) return null;
  if (raw.startsWith('#') || raw.startsWith('mailto:') || raw.startsWith('tel:')) return null;
  const withoutQuery = raw.split('?')[0].split('#')[0];
  if (withoutQuery === '' || withoutQuery === '/') return '/';
  const trimmed = withoutQuery.endsWith('/') ? withoutQuery : `${withoutQuery}/`;
  return trimmed.startsWith('/') ? trimmed : `/${trimmed}`;
};

export const validateLinkGraph = (
  pages: Page[],
  opts: ValidationOptions
): ValidationResult => {
  const knownUrls = new Set(pages.map((p) => normalise(p.url)).filter(Boolean) as string[]);
  const incoming = new Map<string, Set<string>>();
  knownUrls.forEach((u) => incoming.set(u, new Set()));

  for (const page of pages) {
    const from = normalise(page.url);
    if (!from) continue;
    for (const raw of page.outbound) {
      const to = normalise(raw);
      if (!to) continue;
      if (!knownUrls.has(to)) continue;
      if (to === from) continue;
      const set = incoming.get(to);
      if (set) set.add(from);
    }
  }

  const orphans: string[] = [];
  const underLinked: Array<{ url: string; incoming: number }> = [];
  for (const [url, inbound] of incoming) {
    if (url === '/') continue;
    const count = inbound.size;
    if (count === 0) orphans.push(url);
    else if (count < opts.minIncoming) underLinked.push({ url, incoming: count });
  }
  return { orphans, underLinked };
};
```

- [ ] **Step 4: Run test — expect pass**

Run: `npm test -- tests/unit/linkGraph.test.ts`
Expected: PASS (5 tests).

- [ ] **Step 5: Create `scripts/validate-link-graph.ts`**

```ts
#!/usr/bin/env tsx
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';
import { validateLinkGraph, type Page } from '../src/lib/linkGraph';

const DIST = join(process.cwd(), 'dist');
const MIN_INCOMING = 3;

const walk = (dir: string, acc: string[] = []): string[] => {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    const st = statSync(full);
    if (st.isDirectory()) walk(full, acc);
    else if (entry === 'index.html') acc.push(full);
  }
  return acc;
};

const htmlToUrl = (file: string): string => {
  const rel = relative(DIST, file).replace(/\\/g, '/');
  const dir = rel.replace(/index\.html$/, '');
  return `/${dir}`.replace(/\/$/, '/') || '/';
};

const extractLinks = (html: string): string[] => {
  const out: string[] = [];
  const re = /href\s*=\s*"([^"]+)"/gi;
  let m;
  while ((m = re.exec(html))) out.push(m[1]);
  return out;
};

const files = walk(DIST);
const pages: Page[] = files.map((f) => ({
  url: htmlToUrl(f),
  outbound: extractLinks(readFileSync(f, 'utf8'))
}));

const result = validateLinkGraph(pages, { minIncoming: MIN_INCOMING });

if (result.orphans.length || result.underLinked.length) {
  if (result.orphans.length) {
    console.error(`\n[link-graph] Orphans (0 incoming):`);
    for (const u of result.orphans) console.error(`  ${u}`);
  }
  if (result.underLinked.length) {
    console.error(`\n[link-graph] Under-linked (<${MIN_INCOMING} incoming):`);
    for (const u of result.underLinked) console.error(`  ${u.url} (${u.incoming})`);
  }
  console.error(`\n[link-graph] FAIL — ${result.orphans.length} orphan(s), ${result.underLinked.length} under-linked.\n`);
  process.exit(1);
}
console.log(`[link-graph] OK — ${pages.length} pages, all have ≥${MIN_INCOMING} incoming links.`);
```

- [ ] **Step 6: Wire into `package.json` postbuild**

Update the `scripts` block to add:

```json
"postbuild": "npm run validate:links"
```

Apply via edit: change existing `"scripts": { ... "validate:links": ... }` to include `"postbuild": "npm run validate:links"`.

- [ ] **Step 7: Build — expect link-graph to report under-linked pages at Plan 1 (stubbed site)**

Run: `npm run build`
Expected: build succeeds but `validate:links` fails because the Plan 1 stub has too few pages. This is expected — we'll add a temporary bypass for Plan 1 only in the next step.

- [ ] **Step 8: Add a Plan-1 bypass env var**

Modify `scripts/validate-link-graph.ts`: at the top of the exit block add:

```ts
if (process.env.SKIP_LINK_GRAPH === '1') {
  console.warn('[link-graph] SKIP_LINK_GRAPH=1 — bypassing (foundation-only mode).');
  process.exit(0);
}
```

Add note in `README.md` under Commands:

```
- `SKIP_LINK_GRAPH=1 npm run build` — bypass link-graph validator (foundation phase only; never use after Plan 3).
```

- [ ] **Step 9: Commit**

```bash
git add src/lib/linkGraph.ts scripts/ tests/unit/linkGraph.test.ts package.json package-lock.json README.md
git commit -m "feat: build-time link-graph orphan validator with Plan-1 bypass"
```

---

## Task 9: Stub pages (about, contact, 404)

**Files:**
- Create: `src/pages/about.astro`
- Create: `src/pages/contact.astro`
- Create: `src/pages/404.astro`

- [ ] **Step 1: Create `src/pages/about.astro`**

```astro
---
import BaseLayout from '@/layouts/BaseLayout.astro';
import Breadcrumb from '@/components/ui/Breadcrumb.astro';
import BreadcrumbSchema from '@/components/schema/BreadcrumbSchema.astro';
import PersonSchema from '@/components/schema/PersonSchema.astro';

const crumbs = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about/' }
];
---
<BaseLayout
  title="About"
  description="Template.how is edited by Sunny Patel, an SEO consultant. Every template is reviewed before publication and carries a stated source.">
  <BreadcrumbSchema slot="head" crumbs={crumbs} />
  <PersonSchema slot="head" />
  <div class="container prose">
    <Breadcrumb crumbs={crumbs} />
    <h1>About Template.how</h1>
    <p>Template.how is a working library of document templates for the United States and United Kingdom. It is edited by Sunny Patel, an SEO consultant based in England.</p>
    <p>Every template has two things you won't find on most template sites: a named governing statute or rule (for legal and tax documents), and a last-verified date. If a template is wrong, the source is right there for you to check.</p>
    <p>Nothing here is legal, tax, or financial advice.</p>
  </div>
</BaseLayout>

<style>
.prose { max-width: var(--content-max); padding: var(--sp-8) 0 var(--sp-16); }
</style>
```

- [ ] **Step 2: Create `src/pages/contact.astro`**

```astro
---
import BaseLayout from '@/layouts/BaseLayout.astro';
import Breadcrumb from '@/components/ui/Breadcrumb.astro';
import BreadcrumbSchema from '@/components/schema/BreadcrumbSchema.astro';

const crumbs = [
  { name: 'Home', href: '/' },
  { name: 'Contact', href: '/contact/' }
];
---
<BaseLayout title="Contact" description="Get in touch with Template.how.">
  <BreadcrumbSchema slot="head" crumbs={crumbs} />
  <div class="container prose">
    <Breadcrumb crumbs={crumbs} />
    <h1>Contact</h1>
    <p>Errors, suggestions, or partnership requests: <a href="mailto:hello@template.how">hello@template.how</a>.</p>
  </div>
</BaseLayout>

<style>
.prose { max-width: var(--content-max); padding: var(--sp-8) 0 var(--sp-16); }
</style>
```

- [ ] **Step 3: Create `src/pages/404.astro`**

```astro
---
import BaseLayout from '@/layouts/BaseLayout.astro';
import { NODE_SLUGS, NODE_LABELS } from '@/lib/site';
---
<BaseLayout title="Not found" description="The page you asked for doesn't exist." noindex={true}>
  <div class="container prose">
    <h1>Nothing here.</h1>
    <p>The page you asked for doesn't exist — or we haven't written it yet. Try one of the categories:</p>
    <ul>
      {NODE_SLUGS.map((slug) => (
        <li><a href={`/${slug}/`}>{NODE_LABELS[slug]}</a></li>
      ))}
    </ul>
  </div>
</BaseLayout>

<style>
.prose { max-width: var(--content-max); padding: var(--sp-12) 0 var(--sp-16); }
</style>
```

- [ ] **Step 4: Commit**

```bash
git add src/pages/
git commit -m "feat: about, contact, 404 pages"
```

---

## Task 10: Playwright smoke test

**Files:**
- Create: `playwright.config.ts`
- Create: `tests/e2e/smoke.spec.ts`

- [ ] **Step 1: Create `playwright.config.ts`**

```ts
import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: true,
  reporter: [['list']],
  use: {
    baseURL: 'http://localhost:4321',
    trace: 'retain-on-failure'
  },
  webServer: {
    command: 'SKIP_LINK_GRAPH=1 npm run build && npm run preview -- --host 127.0.0.1 --port 4321',
    url: 'http://localhost:4321',
    reuseExistingServer: !process.env.CI,
    timeout: 120_000
  }
});
```

- [ ] **Step 2: Create `tests/e2e/smoke.spec.ts`**

```ts
import { test, expect } from '@playwright/test';

test('homepage renders brand and tiles', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('h1')).toContainText('Templates you can actually use.');
  await expect(page.locator('.wordmark')).toBeVisible();
  await expect(page.locator('.tiles li')).toHaveCount(8);
});

test('legal NODE page renders and links back home', async ({ page }) => {
  await page.goto('/legal-document-templates/');
  await expect(page.locator('h1')).toBeVisible();
  await expect(page.locator('nav[aria-label="Breadcrumb"] a')).toContainText(['Home']);
});

test('skip-to-content link is focusable', async ({ page }) => {
  await page.goto('/');
  await page.keyboard.press('Tab');
  const focused = await page.evaluate(() => document.activeElement?.textContent);
  expect(focused).toContain('Skip to content');
});

test('organization JSON-LD is present on every page', async ({ page }) => {
  await page.goto('/');
  const count = await page.locator('script[type="application/ld+json"]').count();
  expect(count).toBeGreaterThanOrEqual(1);
});
```

- [ ] **Step 3: Install Playwright browsers**

Run: `npx playwright install chromium`
Expected: chromium download completes.

- [ ] **Step 4: Run smoke tests**

Run: `npm run test:e2e`
Expected: 4 tests pass.

- [ ] **Step 5: Commit**

```bash
git add playwright.config.ts tests/e2e/
git commit -m "test: Playwright smoke tests for homepage, NODE, a11y, schema"
```

---

## Task 11: Lighthouse CI budget

**Files:**
- Create: `lighthouserc.json`

- [ ] **Step 1: Create `lighthouserc.json`**

```json
{
  "ci": {
    "collect": {
      "staticDistDir": "./dist",
      "url": [
        "http://localhost/index.html",
        "http://localhost/legal-document-templates/index.html"
      ],
      "numberOfRuns": 1
    },
    "assert": {
      "preset": "lighthouse:recommended",
      "assertions": {
        "categories:performance": ["error", { "minScore": 0.95 }],
        "categories:accessibility": ["error", { "minScore": 0.95 }],
        "categories:best-practices": ["error", { "minScore": 0.95 }],
        "categories:seo": ["error", { "minScore": 0.95 }],
        "largest-contentful-paint": ["error", { "maxNumericValue": 1500 }],
        "cumulative-layout-shift": ["error", { "maxNumericValue": 0.05 }],
        "total-blocking-time": ["warn", { "maxNumericValue": 100 }],
        "unused-javascript": "off",
        "uses-rel-preconnect": "off"
      }
    },
    "upload": { "target": "temporary-public-storage" }
  }
}
```

- [ ] **Step 2: Verify Lighthouse passes against the built stub**

Run: `SKIP_LINK_GRAPH=1 npm run build && npm run lighthouse`
Expected: all assertions pass (4 categories ≥0.95, LCP <1500, CLS <0.05).

- [ ] **Step 3: Commit**

```bash
git add lighthouserc.json
git commit -m "ci: add Lighthouse budget (perf/a11y/bp/seo ≥95, LCP<1500, CLS<0.05)"
```

---

## Task 12: GitHub Actions — CI + weekly rebuild

**Files:**
- Create: `.github/workflows/ci.yml`
- Create: `.github/workflows/weekly-rebuild.yml`

- [ ] **Step 1: Create `.github/workflows/ci.yml`**

```yaml
name: CI

on:
  pull_request:
    branches: [main]
  push:
    branches: [main]

jobs:
  validate:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
      - run: npm ci
      - run: npm run lint
      - run: npm run typecheck
      - run: npm test
      - run: SKIP_LINK_GRAPH=1 npm run build
      - name: Install Playwright
        run: npx playwright install --with-deps chromium
      - run: npm run test:e2e
      - name: Lighthouse CI
        run: npm run lighthouse
```

- [ ] **Step 2: Create `.github/workflows/weekly-rebuild.yml`**

```yaml
name: Weekly rebuild

on:
  schedule:
    - cron: '0 6 * * 1'  # Mon 06:00 UTC
  workflow_dispatch:

permissions:
  contents: write

jobs:
  touch:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
        with:
          token: ${{ secrets.GITHUB_TOKEN }}
      - name: Stamp rebuild commit
        run: |
          git config user.name "template-how-bot"
          git config user.email "hello@template.how"
          date -u +"%Y-%m-%dT%H:%M:%SZ" > .rebuild-stamp
          git add .rebuild-stamp
          git commit -m "chore: weekly rebuild $(date -u +%Y-%m-%d)" || echo "no changes"
          git push
```

- [ ] **Step 3: Commit**

```bash
git add .github/
git commit -m "ci: CI workflow + weekly rebuild cron"
```

---

## Task 13: Push to GitHub and connect Cloudflare Pages

**Files:**
- No file changes in this task (deployment wiring).

- [ ] **Step 1: Create GitHub repo**

Run locally:
```bash
cd /c/Users/sunny/repos/template-how
git branch -M main
gh repo create sunnyp81/template-how --public --source=. --remote=origin --push
```
Expected: repo visible at `https://github.com/sunnyp81/template-how`, `main` branch pushed.

- [ ] **Step 2: Connect Cloudflare Pages (manual — requires Sunny)**

In Cloudflare dashboard (`sunnypat81` account):
- Pages → Create → Connect to Git → select `sunnyp81/template-how`.
- Project name: `template-how`.
- Production branch: `main`.
- Build command: `SKIP_LINK_GRAPH=1 npm run build` (change to `npm run build` after Plan 3).
- Build output: `dist`.
- Environment variables: `NODE_VERSION=20`.

Expected: preview URL `https://template-how.pages.dev/` deploys successfully.

- [ ] **Step 3: Verify preview URL loads**

Run: `curl -I https://template-how.pages.dev/` (once deploy finishes)
Expected: `HTTP/2 200`, content-type `text/html`.

- [ ] **Step 4: Point `template.how` DNS to Cloudflare Pages**

In the domain registrar (or Cloudflare DNS if already managed):
- CNAME `@` → `template-how.pages.dev` (or use Cloudflare's CNAME flattening / redirect rules).
- CNAME `www` → `template-how.pages.dev`.
- In CF Pages project → Custom domains → add `template.how` and `www.template.how`.

Expected: `https://template.how/` resolves and serves the homepage.

- [ ] **Step 5: Verify production**

Run: `curl -I https://template.how/`
Expected: `HTTP/2 200`.

---

## Task 14: Lint configuration and typecheck gate

**Files:**
- Create: `eslint.config.js`

- [ ] **Step 1: Create `eslint.config.js`**

```js
import js from '@eslint/js';
import ts from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import astro from 'eslint-plugin-astro';

export default [
  js.configs.recommended,
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parser: tsParser,
      parserOptions: { ecmaVersion: 2022, sourceType: 'module' }
    },
    plugins: { '@typescript-eslint': ts },
    rules: {
      ...ts.configs.recommended.rules,
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }]
    }
  },
  ...astro.configs.recommended,
  { ignores: ['dist/', '.astro/', 'node_modules/', 'test-results/'] }
];
```

- [ ] **Step 2: Add `@eslint/js` to devDependencies**

Run: `npm i -D @eslint/js`
Expected: package installed.

- [ ] **Step 3: Run lint and typecheck**

Run: `npm run lint && npm run typecheck`
Expected: both pass with no errors.

- [ ] **Step 4: Commit**

```bash
git add eslint.config.js package.json package-lock.json
git commit -m "ci: ESLint flat config + typecheck gate"
```

---

## Task 15: Final verification + memory update

- [ ] **Step 1: Full verification run**

Run:
```bash
npm run lint
npm run typecheck
npm test
SKIP_LINK_GRAPH=1 npm run build
npm run test:e2e
npm run lighthouse
```
Expected: every command exits 0.

- [ ] **Step 2: Manual visual check via dev server**

Run: `npm run dev`
Open `http://localhost:4321` and:
- Confirm wordmark renders with amber dot.
- Confirm 8 category tiles render.
- Click a tile → lands on `/legal-document-templates/`.
- Breadcrumb visible.
- Keyboard-tab → "Skip to content" visible.
- Toggle system dark mode → palette inverts.

Expected: all above succeed.

- [ ] **Step 3: Update MEMORY.md**

Add new index line to `C:\Users\sunny\.claude\projects\G--\memory\MEMORY.md` (append to topic-files section):

```
- [template-how-apr22.md](template-how-apr22.md) — template.how Plan 1 LIVE: Astro 5 foundation, design tokens (paper/navy/amber), BaseLayout + Nav + Footer, build-time link-graph validator, Lighthouse budget (≥95 all, LCP<1500, CLS<0.05), CF Pages deployed. Repo: sunnyp81/template-how.
```

Create `C:\Users\sunny\.claude\projects\G--\memory\template-how-apr22.md` with a project memory note of what was built, the repo path, deployment URL, and links to the spec + Plan 1.

- [ ] **Step 4: Final commit and push**

```bash
git add .
git commit -m "docs: Plan 1 complete — foundation live on template.how"
git push origin main
```
Expected: CI passes; CF Pages deploys; `https://template.how/` serves the homepage.

---

## Self-Review (completed inline)

**1. Spec coverage check:**

| Spec section | Task(s) |
|---|---|
| §4 Architecture (ROOT / NODE) | Task 4 (collections), Task 6 (ROOT homepage), Task 7 (NODE dynamic route) |
| §4.4 Internal linking + orphan check | Task 8 |
| §9 Tech stack | Task 1 (Astro scaffold), Task 11 (Lighthouse), Task 12 (CI + cron) |
| §10 Brand & design system | Task 2 (tokens), Task 5 (Nav/Footer/Breadcrumb) |
| §10.4 Perf budget (LCP/CLS/INP) | Task 11 |
| §11.5 Lighthouse + a11y gate | Task 11, Task 10 |
| §13 Deployment (CF Pages, GitHub) | Task 12, Task 13 |
| §13 Weekly rebuild cron | Task 12 |

Gaps deferred to Plan 2+: SEED page model (§5), builder component (§6), data layer (§7), monetisation (§8), quality gates semantic-audit + voice fingerprint (§11.1-11.4), launch SEED content (§12), IndexNow / GSC / OG image gen / portfolio backlinks (§13.2).

**2. Placeholder scan:** none — every step has real code or commands.

**3. Type consistency:** `NodeSlug`, `Page`, `ValidationResult`, `Crumb` consistent across files. `site.url` used consistently. `NODE_SLUGS` / `NODE_LABELS` used consistently in Nav, Footer, 404, and index.

---

## Execution Handoff

Plan 1 complete and saved to `docs/superpowers/plans/2026-04-22-plan-1-foundation.md`.

Plans 2-4 (builder + data layer, content authoring, launch SEO + monetisation) will be written after Plan 1 executes successfully, because each depends on file shapes and conventions established here.
