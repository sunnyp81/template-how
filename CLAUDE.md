# template-how — Project Brain

Per-repo brain, migrated from central claude-memory 2026-06-20. Canonical project memory now lives here.

## Current state

template.how — source-verified, builder-backed template library. Astro 5 + React islands + MDX + Tailwind, TypeScript strict. **97 unique pages live** at https://template.how (since Apr 24 2026), auto-deploys from `main` to Cloudflare Pages (`sunnypat81` account, project `template-how`). Repo `sunnyp81/template-how` (public). Revenue £0 (pre-monetisation).

**Strategy (locked Jun 6 2026):** go wide at the *specific-document* level, not category head terms (those are brand/university-locked and unwinnable — "resume templates" KD72, "invoice template" KD48). Each document page = crawlable static explanation + live React `<TemplateBuilder>` island + PDF/DOCX/XLSX export + finished-doc preview + source/legal notes + examples + jurisdiction/platform variants. The builder island is the moat (ranking pages are fillable tools, not prose). **Do NOT rebuild** — extend the existing 97-page foundation.

**Active plan:** 40-page builder-first proof set across 3 clusters (legal/finance, career documents, platform/spec), drawn from Ahrefs US+GB CSVs (`C:\Users\sunny\Downloads\google_{us,gb}_all-keywords_2026-06-06_*.csv`, UTF-16 TSV). 470,530 combined US+GB volume. Career-document specs (5 canonical pages: letter-of-recommendation, reference-letter, cover-letter, resignation-letter, two-weeks-notice) are written and ready to build (see History / build-queue). Legal/finance + platform/spec specs NOT yet written. Validation gate: ship 40 → wait 21-28d → instrument "builder opened"+"export clicked" events → only scale clusters showing GSC impressions AND builder starts.

- Build: `cross-env SKIP_LINK_GRAPH=1 npm run build` (CF) — link-graph validator now passes, bypass no longer needed but harmless. Output `dist`, NODE_VERSION=20.
- Spec/plans of record: `docs/superpowers/specs/` + `docs/superpowers/plans/`.
- First end-to-end SEED pattern: `src/content/seeds/bill-of-sale.md` — copy its frontmatter verbatim for new pages.

## Key facts & warnings

- 🔴 **Blocker still open (Jun 6): sitemap was NEVER submitted to GSC** (confirmed zero sitemaps on sunnypat81) — site is live but invisible. Sunny owns: add template.how to GSC in both `gsc-sunnypat81` + `gsc-2012infinite` (Cloudflare DNS TXT verify), add to Bing (BingSiteAuth.xml in `public/`), then run `npm run indexnow` to push all URLs. Step-by-step: `scripts/gsc-bing-instructions.md`.
- No em/en dashes in any output (global rule).
- Legal/tax/financial/medical-adjacent pages REQUIRE citations, disclaimers, last-verified dates, clear scope. YMYL caution on will/last-will pages.
- No thin programmatic pages; every SEED ≥1,800 words and ≥3 incoming internal links (link-graph validator enforces). NODE hubs ≥2,500 words.
- Open data backlog: per-jurisdiction sub-SEED variants (`/bill-of-sale/california/` etc.) unblocked by 54/54 jurisdiction verification but not yet built. DMV URLs for smaller US states were inferred — re-verify when sub-SEEDs ship (statute citation is the load-bearing accuracy item).
- Static-only SEEDs (capcut, venn-diagram, family-tree, wanted-poster, etc.) have guide content + DownloadBlock only — no interactive builder yet, and `/downloads/*.{pdf,docx}` URLs currently 404 (placeholders).
- IndexNow key file: `https://template.how/213653cd3ddb06b15bf4e47b11e2bc3a.txt`. OG images auto-generated via Satori at build (`src/lib/og-template.ts`). Brand: paper #FAF7F2 + navy #0F1B3D + amber #D97706.
- Astro 5 nuance: `slug` is auto-derived from filename and stripped before zod validation — schemas must NOT include `slug`, routes use `entry.slug`. Empty collections type as `never` — cast `entry as unknown as CollectionEntry<...>`. `builderSchema` is `z.any()` in seeds collection (validated at use site).
- `evolve-site` skill applies once template.how has 14d of GSC data: `bash scripts/init-site.sh <repo> <gsc-property>` then `/evolve-site`.

## History

- 2026-04-22/23 — Plan 1 (foundation) built + verified locally: Astro 5 + React + MDX + sitemap, design tokens, BaseLayout/Nav/Footer/Breadcrumb + Org/Person/Breadcrumb JSON-LD, content-collection schemas, build-time link-graph orphan validator (TDD), Playwright smoke tests, Lighthouse CI 100/100/100/100, GitHub Actions CI + weekly rebuild.
- 2026-04-23 — Plan 2 (builder + data layer) shipped: `/bill-of-sale/` end-to-end live. Builder primitives (`lib/builder/`), export pipeline (PDF jsPDF / DOCX / print / XSS-safe HTML), field + content + schema components, jurisdictions data layer. 38 unit + 10 e2e tests.
- 2026-04-23 — Plan 3 (content tranche 1) shipped: 8 NODE hubs (all ≥2,500w) + 8 SEEDs, all 54/54 jurisdictions verified, link-graph validator activated (19 pages, all ≥3 incoming links).
- 2026-04-24 — Final tranche + launch-SEO infra: reached 97 unique pages (32 SEEDs + 54 bill-of-sale jurisdiction variants + 8 NODEs + utility), IndexNow, Satori OG auto-gen, llms.txt, sitemap, GSC/Bing instructions.
- 2026-06-06 — Strategy locked (wide-at-document-level) + 40-page proof-set build queue generated from Ahrefs CSVs; career-doc specs written, legal/finance + platform/spec specs pending. Sparked by first selflandlord template-pack sale (£9).
