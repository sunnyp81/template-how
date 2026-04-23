# Plan 3 — Content Tranche 1 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development to implement this plan task-by-task.

**Goal:** Ship the 8 NODE category hubs + the highest-volume SEED page from each vertical (9 pages × 1 SEED = 8 SEEDs; total 16 new content pieces), verify the 49-jurisdiction data backlog, and activate the link-graph orphan validator in production (no more `SKIP_LINK_GRAPH=1` bypass).

**Architecture:** Content is the only new moving part. All infrastructure — layouts, builders, schemas — already exists from Plan 2. Each new SEED follows the verbatim pattern of `src/content/seeds/bill-of-sale.md`: frontmatter with `builderSchema`, 8-12 FAQ, HowTo, sources, and ≥1,800-word body. Each NODE hub is an MDX file in `src/content/nodes/` with ≥2,500-word body that cross-links all its SEEDs and all 7 sibling NODEs.

**Content rules (invariants):**
- Every page ≥ minimum word count (spec §11.3): SEED 1,800, NODE 2,500
- First paragraph is the definitional lede, single declarative sentence
- No AI slop: banned opener/word list from `feedback_pre_completion_validation.md`: "delve", "unlock", "game-changer", "seamlessly", "robust", "leverage", "tapestry", "journey", "in today's fast-paced world", "navigating the complexities of"
- Each SEED must include: real worked example with realistic names/figures, one gotcha with cited source, one data point (statute/stat/rule), one `<aside class="tip">` expert tip boxout
- Every page passes `/semantic-audit` ≥ 85 (spec §11.5)
- Per spec §4.4: each SEED links up to its NODE + laterally to 4-6 sibling SEEDs + across to 2 cross-NODE; each NODE links to all its SEEDs + all 7 sibling NODEs

**Tranche 1 launch targets (highest volume per NODE from the 80-SEED launch list):**

| NODE | SEED | Vol | DR |
|---|---|---|---|
| legal-document-templates | `bill-of-sale` ✅ Plan 2 | 40k | 7 |
| resume-templates | `harvard-resume` | 17k | 5 |
| business-templates | `profit-and-loss-statement` | 11k | 10 |
| life-event-templates | `obituary` | 22k | 4 |
| planning-templates | `lesson-plan` | 18k | 4 |
| design-templates | `capcut` | 37k | 1 |
| education-templates | `venn-diagram` | 12k | 5 |
| productivity-templates | `to-do-list` | 14k | 11 |

**Reference documents:**
- Spec: `docs/superpowers/specs/2026-04-22-template-how-design.md`
- Launch list: `docs/superpowers/specs/2026-04-22-launch-seed-list.md`
- Plan 2 (builder + first SEED): `docs/superpowers/plans/2026-04-23-plan-2-builder-data-layer.md`
- Data backlog: `docs/superpowers/plans/2026-04-23-plan-2-data-backlog.md`
- The canonical SEED example: `src/content/seeds/bill-of-sale.md` — **every new SEED copies this structure**

---

## File Structure

```
src/content/
├── nodes/
│   ├── legal-document-templates.md       (MODIFY — already exists from Plan 1)
│   ├── resume-templates.md                (NEW)
│   ├── business-templates.md              (NEW)
│   ├── life-event-templates.md            (NEW)
│   ├── planning-templates.md              (NEW)
│   ├── design-templates.md                (NEW)
│   ├── education-templates.md             (NEW)
│   └── productivity-templates.md          (NEW)
└── seeds/
    ├── bill-of-sale.md                    (exists — Plan 2)
    ├── harvard-resume.md                  (NEW)
    ├── profit-and-loss-statement.md       (NEW)
    ├── obituary.md                        (NEW)
    ├── lesson-plan.md                     (NEW)
    ├── capcut.md                          (NEW)
    ├── venn-diagram.md                    (NEW)
    └── to-do-list.md                      (NEW)

src/data/legal/
└── bill-of-sale-state-rules.json          (MODIFY — fill 49 pending entries)

src/pages/
└── index.astro                             (MODIFY — update featured tiles)
```

Each new SEED uses `renderer: legal-document` if structurally a document (like obituary) or uses `renderer: list-plan` for list-style templates (to-do, lesson plan). Design-category SEEDs (capcut) use `renderer: static-only` — they have a guide page + download links but NO interactive builder. Education (venn-diagram) also `static-only` at this tranche; builder comes later.

---

## Task 1: Data backlog — verify 49 jurisdictions

**Files:**
- Modify: `src/data/legal/bill-of-sale-state-rules.json`

The 49 pending entries need real primary-source data. For each: statute citation, statute_url, notary requirement, witness requirement, DMV/equivalent form reference, one-sentence distinguishing note. NEVER fabricate — if a source cannot be verified, leave null and note.

- [ ] **Step 1: Research US states (47 pending)**

For each state (alphabetical): search `leginfo.legislature.<state>.gov`, Cornell LII (`https://www.law.cornell.edu/states/`), state DMV/DOT site. Target statute: state vehicle code or commercial code section governing bill of sale / title transfer. If a state requires DMV Form X for vehicles, include it.

Priority order (do these first if time-constrained — they are the highest-population US states): IL, OH, GA, NC, MI, PA, WA, AZ, MA, VA, NJ, TN, IN, MD, MO, WI, MN, CO.

- [ ] **Step 2: Research UK nations (3 pending)**

- `uk-sco` (Scotland): Sale of Goods Act 1979 applies, but Scottish conveyancing has Scottish-specific Registers of Scotland considerations for certain assets. Confirm.
- `uk-wal` (Wales): Sale of Goods Act 1979 applies as in England. Confirm no Wales-specific vehicle transfer rules.
- `uk-nir` (Northern Ireland): Sale of Goods Act 1979 applies with the Sale of Goods (Northern Ireland) Order 1979 — primary legislation slightly different. Confirm.

- [ ] **Step 3: Update each entry**

Replace null `governing_statute`, `statute_url`, `notary_required`, `witness_required`, `vehicle_dmv_form`, `vehicle_dmv_url`, and `notes` fields with verified values. Set `last_verified: "2026-04-23"` on every updated entry. If a field remains unverifiable after reasonable research, leave it null and update `notes` to reflect what IS known.

- [ ] **Step 4: Run data integrity test**

Run: `cd /c/Users/sunny/repos/template-how && npm test -- tests/unit/data/`
Expected: 3 tests still pass. (The schema allows null, so the tests pass regardless of verified/unverified; this just confirms shape integrity.)

- [ ] **Step 5: Count verified entries**

Run: `cd /c/Users/sunny/repos/template-how && cat src/data/legal/bill-of-sale-state-rules.json | jq '[.. | objects | select(.governing_statute != null)] | length'`

Target: ≥ 40 of 54 verified. Report the number in the commit message.

- [ ] **Step 6: Delete or update the backlog plan**

If ≥ 40 verified (acceptable threshold for Plan 3 shipping), delete `docs/superpowers/plans/2026-04-23-plan-2-data-backlog.md`. Otherwise, update it to list only the still-pending entries.

- [ ] **Step 7: Commit**

```bash
cd /c/Users/sunny/repos/template-how
git add src/data/legal/bill-of-sale-state-rules.json docs/superpowers/plans/
git commit -m "data: verify <N> of 54 bill-of-sale jurisdictions from primary sources"
```

---

## Tasks 2-8: Author 8 NODE hub pages

Each task creates one NODE hub MDX. The file shape is an extension of the existing `legal-document-templates.md` (Plan 1, now needs its body expanded to ≥2,500 words) and 7 siblings.

**Shared frontmatter per NODE (template):**

```yaml
---
slug: <node-slug>
label: <short label from NODE_LABELS>
headline: <topically distinctive sentence, not keyword stuffing>
lede: <one sentence definitional grounding for the cluster>
seeds:
  - <every SEED slug in this cluster from the launch list>
updated: '2026-04-23'
---
```

**Shared body structure (≥2,500 words):**

1. **Intro (≥200 words):** what this category covers, who uses these templates, why jurisdiction/market matters
2. **How these templates fit together (≥600 words):** the relationships — e.g., for legal-document-templates: "a bill of sale records transfer; a lease governs ongoing use; an NDA binds pre-contract disclosure…"
3. **Choosing the right template (≥600 words):** decision aid with worked examples
4. **Common mistakes in this category (≥500 words):** real patterns, not boilerplate
5. **Related categories (≥300 words with links to all 7 sibling NODEs):** entity-consistent anchor text. Genuine connections, not "you might also like"
6. **Author box + sources**

**MUST include (E-E-A-T):**
- At least 2 statutory or governmental citations per NODE (primary sources)
- Real sector-specific numbers where they exist (e.g., 2.4M car sales/year in UK → bill of sale relevance)
- No banned filler words

### Task 2: `resume-templates` hub

- [ ] **Step 1:** Create `src/content/nodes/resume-templates.md` with frontmatter and ≥2,500-word body per above. SEEDs list: `harvard-resume, resume, cv, cover-letter, ats-resume, ats-friendly-resume, google-docs-resume, cover-letter-google-docs, simple-resume, federal-resume, canva-resume, two-weeks-notice, two-week-notice`
- [ ] **Step 2:** Build verification: `SKIP_LINK_GRAPH=1 npm run build` — page emits at `/resume-templates/`
- [ ] **Step 3:** Commit `feat(nodes): resume-templates hub`

### Task 3: `business-templates` hub

- [ ] **Step 1:** Create `src/content/nodes/business-templates.md`. SEEDs: `profit-and-loss-statement, invoice-google-docs, meeting-minutes, meeting-notes, letterhead, memo, balance-sheet, press-release, marketing-plan, seo-report, executive-summary, project-proposal`
- [ ] **Step 2:** Build verify.
- [ ] **Step 3:** Commit `feat(nodes): business-templates hub`

### Task 4: `life-event-templates` hub

- [ ] **Step 1:** Create `src/content/nodes/life-event-templates.md`. SEEDs: `obituary, family-tree, funeral-program, baby-announcement, graduation-invitation, thank-you-card, christmas-card, birthday-invite`
- [ ] **Step 2:** Build verify.
- [ ] **Step 3:** Commit `feat(nodes): life-event-templates hub`

### Task 5: `planning-templates` hub

- [ ] **Step 1:** Create `src/content/nodes/planning-templates.md`. SEEDs: `lesson-plan, travel-itinerary, itinerary, birth-plan, weekly-schedule, daily-schedule, weekly-calendar, weekly-planner, meal-plan, meal-planning`
- [ ] **Step 2:** Build verify.
- [ ] **Step 3:** Commit `feat(nodes): planning-templates hub`

### Task 6: `design-templates` hub

- [ ] **Step 1:** Create `src/content/nodes/design-templates.md`. SEEDs: `capcut, roblox-shirt, roblox, wanted-poster, newspaper, storyboard, discord-bio, tier-list`
- [ ] **Step 2:** Build verify.
- [ ] **Step 3:** Commit `feat(nodes): design-templates hub`

### Task 7: `education-templates` hub

- [ ] **Step 1:** Create `src/content/nodes/education-templates.md`. SEEDs: `cornell-notes, venn-diagram, graphic-organizer, jeopardy, avery-5160, avery-label, soap-note, all-about-me`
- [ ] **Step 2:** Build verify.
- [ ] **Step 3:** Commit `feat(nodes): education-templates hub`

### Task 8: `productivity-templates` hub

- [ ] **Step 1:** Create `src/content/nodes/productivity-templates.md`. SEEDs: `to-do-list, grocery-list, checklist, one-pager, timesheet, time-sheet, daily-planner, project-planner, vision-board, chore-chart, sign-up-sheet, sign-in-sheet`
- [ ] **Step 2:** Build verify.
- [ ] **Step 3:** Commit `feat(nodes): productivity-templates hub`

### Task 9: Expand existing `legal-document-templates` hub to ≥2,500 words

- [ ] **Step 1:** The current file has a one-paragraph body. Expand it to ≥2,500 words per the template above.
- [ ] **Step 2:** Build verify — page still emits at `/legal-document-templates/`, now richer.
- [ ] **Step 3:** Commit `feat(nodes): expand legal-document-templates hub to full body`

---

## Tasks 10-17: Author 8 SEED pages (one per NODE)

Each SEED follows `bill-of-sale.md` verbatim structure. Only the content varies. Per SEED, the task = (a) write the MDX file with frontmatter + ≥1,800-word body, (b) build, (c) commit.

**Shared SEED frontmatter shape (copy from bill-of-sale.md, adjust per-SEED):**
- `node`: the correct NODE slug
- `title`, `h1`: SEED-specific (use the keyword from launch list)
- `definitionalLede`: single sentence
- `primaryKeyword`, `searchVolume`, `difficulty`: from launch list
- `renderer`: `legal-document` | `resume` | `invoice` | `letter` | `list-plan` | `static-only`
- `related`: 4-6 sibling SEED slugs (from same NODE's seeds list in the NODE hub)
- `crossCluster`: 1-2 genuinely related SEEDs from other NODEs
- `audience`: `[us, uk]`
- `sources`: at least 2 real URLs
- `howTo` + `faq` + `builderSchema` (if builder applies) as per bill-of-sale

**Shared SEED body (≥1,800 words):**
- Definitional expansion
- When to use
- What it must include
- Variants preview
- Step-by-step
- Common mistakes
- Worked example (realistic names + figures)
- Expert tip boxout
- Sources (rendered by SourceList from frontmatter)

### Task 10: `harvard-resume`

- [ ] **Step 1:** Create `src/content/seeds/harvard-resume.md` with `renderer: resume`, `node: resume-templates`, primary keyword `harvard resume template`, volume `17000`, difficulty `5`. Related: 4-5 other resume SEEDs. Cross-cluster: `cover-letter-google-docs, two-weeks-notice`. BuilderSchema: resume sections (Summary, Education, Experience, Skills, etc.). FAQ covers Harvard-specific questions. Real worked example = a fictional Harvard graduate with concrete experience bullets.
- [ ] **Step 2:** Build; verify `/harvard-resume/` emits.
- [ ] **Step 3:** Verify `/semantic-audit` ≥ 85.
- [ ] **Step 4:** Commit `feat(seed): harvard-resume`

### Task 11: `profit-and-loss-statement`

- [ ] **Step 1:** `src/content/seeds/profit-and-loss-statement.md`. `renderer: invoice` (tabular), `node: business-templates`, keyword `profit and loss statement template`, vol `11000`, DR `10`. BuilderSchema: income rows, expense rows, calculated totals. Worked example = a small coffee shop's quarterly P&L with specific realistic line items. Source citation: IRS Publication 334, HMRC SA103S notes.
- [ ] **Step 2-4:** Build, audit, commit `feat(seed): profit-and-loss-statement`

### Task 12: `obituary`

- [ ] **Step 1:** `src/content/seeds/obituary.md`. `renderer: legal-document` (document structure, not truly legal). `node: life-event-templates`, keyword `obituary template`, vol `22000`, DR `4`. BuilderSchema: life events, survivors, service info, charitable request. This is a high-emotion template — write with care, no stock lines. Cover US + UK newspaper pricing (WSJ ~$500-1000, Telegraph ~£200-400). Include per-tradition notes (Christian, Jewish, Muslim, secular) at guide level.
- [ ] **Step 2-4:** Build, audit, commit `feat(seed): obituary`

### Task 13: `lesson-plan`

- [ ] **Step 1:** `src/content/seeds/lesson-plan.md`. `renderer: list-plan`, `node: planning-templates`, keyword `lesson plan template`, vol `18000`, DR `4`. BuilderSchema: objectives, standards, materials, procedure steps, assessment. Source UK National Curriculum, US Common Core. Worked example = Year 4 maths lesson on fractions with specific learning outcomes.
- [ ] **Step 2-4:** Build, audit, commit `feat(seed): lesson-plan`

### Task 14: `capcut`

- [ ] **Step 1:** `src/content/seeds/capcut.md`. `renderer: static-only` — NO builder at this tranche. `node: design-templates`, keyword `capcut template`, vol `37000`, DR `1`. The "template" here is CapCut's native template system — guide content explains how CapCut templates work, popular trending templates, how to create/use them, how to export. External links to CapCut's official template gallery + related tools. No FAQ schema stretch — genuine questions. Note: because renderer is static-only, the SEED body itself won't show a builder island; the page's JSX is: H1 + lede + guide content + FAQ + sources. Adjust `SeedLayout` handling if needed (see Edge case below).
- [ ] **Step 2-4:** Build, audit, commit `feat(seed): capcut`

**Edge case for static-only SEEDs:** `SeedLayout.astro` currently hard-codes `<TemplateBuilder client:visible schema={data.builderSchema} ... />`. For static-only SEEDs, `builderSchema` will be omitted and the builder must not render. Fix: in `SeedLayout.astro`, wrap the builder-section in `{data.renderer !== 'static-only' && data.builderSchema ? (<section ...>...</section>) : null}`. The implementer of Task 14 MUST make this `SeedLayout` modification as part of the task (one extra commit OK, or roll into the capcut commit).

### Task 15: `venn-diagram`

- [ ] **Step 1:** `src/content/seeds/venn-diagram.md`. `renderer: static-only`. `node: education-templates`, keyword `venn diagram template`, vol `12000`, DR `5`. Guide covers 2-set, 3-set, 4-set Venn diagrams with when-to-use; downloadable templates in .docx/.pdf/.pptx linked from DownloadBlock (use placeholder URLs — same pattern as bill-of-sale `/downloads/*`). Include a brief "Venn vs. Euler diagram" note citing real academic source.
- [ ] **Step 2-4:** Build, audit, commit `feat(seed): venn-diagram`

### Task 16: `to-do-list`

- [ ] **Step 1:** `src/content/seeds/to-do-list.md`. `renderer: list-plan`, `node: productivity-templates`, keyword `to do list template`, vol `14000`, DR `11`. BuilderSchema: task rows with priority, due date, done checkbox. FAQ: Eisenhower matrix, GTD, simple vs. contextual lists. Include a note on UK vs. US spelling ("to-do list" vs. "to do list") and SEO behaviour (people search both).
- [ ] **Step 2-4:** Build, audit, commit `feat(seed): to-do-list`

### Task 17: Update homepage featured tiles

- [ ] **Step 1:** Edit `src/pages/index.astro` — replace the 8 featured-tile slugs with the 8 we now have live: `bill-of-sale`, `harvard-resume`, `profit-and-loss-statement`, `obituary`, `lesson-plan`, `capcut`, `venn-diagram`, `to-do-list`. Currently several point to non-existent pages (e.g., `/resume/`).
- [ ] **Step 2:** Build verify — homepage links all resolve; link-graph gets better.
- [ ] **Step 3:** Commit `feat: update homepage featured tiles to live SEEDs`

---

## Task 18: Activate link-graph validator

**Files:**
- Modify: CF Pages build command (via dashboard — requires Sunny) OR `package.json`
- Possibly modify: affected files with <3 incoming links

With 8 NODEs + 8 SEEDs + homepage + about/contact/404 + legal-document-templates already up = 19 pages, all heavily cross-linked via NODE hubs. Link graph should satisfy ≥3 incoming requirement now.

- [ ] **Step 1: Local test**

Run: `cd /c/Users/sunny/repos/template-how && npm run build` (WITHOUT `SKIP_LINK_GRAPH=1`)

If it passes, proceed to Step 3. If any orphan / under-linked page emerges, add cross-links from appropriate pages (NODE hubs, related SEEDs) to fix, then re-test. Do NOT just weaken the threshold — the fix is to link properly.

- [ ] **Step 2: Update CF Pages build command**

This step is manual; the implementer writes instructions to Sunny rather than making the change. Instructions:

```
Go to CF Pages dashboard → template-how project → Settings → Builds & deployments
→ Change "Build command" from `npm run build` (with SKIP_LINK_GRAPH=1 env var) to just `npm run build`
→ Remove SKIP_LINK_GRAPH environment variable (or leave it, it'll be ignored without the trigger)
→ Save
→ Trigger a rebuild
```

Log this in the report so Sunny can do it after the push.

- [ ] **Step 3: Commit + push to trigger CF rebuild**

```bash
git add -A
git commit -m "ci: activate link-graph orphan validator (site link density sufficient)"
git push origin main
```

Then verify CF build succeeds with the new setting.

---

## Task 19: Final verification + push

- [ ] **Step 1: Full local pipeline**

```bash
cd /c/Users/sunny/repos/template-how
npm run lint
npm run typecheck
npm test
npm run build          # no SKIP env
npm run test:e2e
```

All exit 0.

- [ ] **Step 2: Count pages built**

Run: `ls dist/*/index.html | wc -l`
Expected: ≥ 19 pages (8 NODEs + 8 SEEDs + homepage + about + contact + 404 = 19; more if Plan 2 bill-of-sale and legal-document-templates count separately).

- [ ] **Step 3: Verify production (after push)**

After CF deploys, spot-check:
```bash
for url in https://template.how/ https://template.how/resume-templates/ https://template.how/harvard-resume/ https://template.how/obituary/ https://template.how/capcut/; do
  printf "%-60s " "$url"
  curl -s -o /dev/null -w "HTTP %{http_code}\n" "$url"
done
```
All HTTP 200.

- [ ] **Step 4: Update MEMORY.md**

Add to topic-files index:
```
- [template-how-plan3-apr23.md](template-how-plan3-apr23.md) — Plan 3 SHIPPED Apr 23: 8 NODE hubs + 8 tranche-1 SEEDs live. Link-graph validator ACTIVE. Data backlog: <N>/54 jurisdictions verified. Next: Plan 4 (next 32 SEEDs).
```

And create `template-how-plan3-apr23.md` describing what shipped.

---

## Self-Review

**1. Spec coverage:**

| Spec section | Task(s) |
|---|---|
| §4 ROOT/NODE/SEED architecture | Tasks 2-9 (NODE hubs); Tasks 10-16 (SEEDs) |
| §4.4 Internal linking | Task 18 (link-graph activation) |
| §5 SEED page model | Tasks 10-16 (follow bill-of-sale pattern) |
| §7 Data moat | Task 1 (data backlog) |
| §11.3 Unique micro-details per page | Every content task has required elements listed |

Gaps deferred to Plan 4/5: 63 remaining long-tail SEEDs, sub-SEED jurisdiction variants (need Task 1's verified data), OG image auto-generation, `/downloads/*.pdf` pre-rendered files.

**2. Placeholder scan:** No verbatim content drafted here — tasks 10-16 delegate content authoring to implementers with required-element checklists. This is intentional because 8 × 1,800-word articles cannot be inlined in the plan. The banned-word list + required-element list + the reference SEED (`bill-of-sale.md`) provide sufficient constraint.

**3. Type consistency:** NODE_LABELS / NODE_SLUGS (from `@/lib/site`) used throughout. `renderer` values (`legal-document` / `resume` / `invoice` / `letter` / `list-plan` / `static-only`) consistent with Plan 2's `src/lib/builder/schema.ts`. The new `static-only` renderer value is already listed in the seeds zod schema (`src/content/config.ts`) — verify it's there or add it at start of Task 14.

---

## Execution Handoff

Plan 3 saved to `docs/superpowers/plans/2026-04-23-plan-3-content-tranche-1.md`. Execute via superpowers:subagent-driven-development.
