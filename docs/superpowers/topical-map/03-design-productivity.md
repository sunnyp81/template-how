---
doc: Topical map — Design & Productivity hubs
hubs: [design-templates, productivity-templates]
strategy_locked: 2026-06-06
markets: [us, uk]
kd_ceiling: 20
renderer_enum: [legal-document, resume, invoice, letter, list-plan, static-only]
page_types: [builder, spec, gallery, list-plan]
status_legend: EXISTING = already a live seed (do not duplicate) · NEW = to build
metrics_note: All vol/KD are ESTIMATES pending Ahrefs verification unless drawn from the Jun-6 pull (flagged). See §8.
author_context: Built against config.ts zod contract (seeds need ≥4 related, ≥1 crossCluster, ≥8 FAQ, howTo, ≥1 source). Every NEW page must clear ≥3 incoming internal links (linkGraph.ts).
---

# Topical Map 03 — Design & Creative + Productivity

This map goes WIDE at the specific-document / asset level and deliberately skips brand-locked head terms ("powerpoint templates" KD81, "canva templates", "google docs templates"). The central intellectual move for these two hubs is **page-type classification**: many of the highest-value terms here are NOT document-builder pages. They are platform SPEC references, copy-paste GALLERY generators, or lightweight LIST-PLAN builders. Misclassifying a gallery term as a PDF/DOCX builder is the single most common way to lose these SERPs, because the SERP is occupied by spec/gallery/generator results and a legal-style builder reads as off-intent.

**Four page types used throughout:**

- **(a) builder** — full interactive TemplateBuilder doc rendered via an existing renderer (`legal-document` | `resume` | `invoice` | `letter`), exports PDF/DOCX/print. Used when the win is a fillable document.
- **(b) spec** — a dimensions / format reference page. `renderer: static-only`. No form; the value is correct numbers + downloadable blank canvas + do/don't. Cheapest to ship.
- **(c) gallery** — copy-paste text or image-asset gallery / light generator. `renderer: static-only` (today) — these often need a small client-side generator (symbol/emoji picker, HTML output, PNG canvas) that is a **builder gap** (see §5).
- **(d) list-plan** — the `list-plan` renderer (same family as `to-do-list`, `weekly-schedule`). Task/grid/tracker docs. Export gap: many want XLSX / Google Sheets, not PDF (see §5).

---

## HUB 1 — design-templates (Design & creative)

### 1. Hub thesis

The design hub serves two audiences: **content creators** (CapCut/TikTok, Roblox, Twitch/YouTube, Discord) who need platform-correct specs and copy-paste assets, and **people who need a specific visual format** (certificate, invitation, flyer, org chart, mood board) where the format conventions are the product. For creators, platform rules and exact pixel dimensions matter more than a fillable form — so most creator terms resolve to **spec** or **gallery** pages, not builders. The visual-format terms split: structured diagrams (org chart, flowchart, gantt, mind map) lean toward a light list-plan/diagram builder; print-design terms (certificate, invitation, flyer, business card) lean toward spec + curated downloads because the SERP is Canva-gallery-shaped and a DOCX builder under-delivers.

### 2. Document table — design-templates

| slug | primaryKeyword | US vol | GB vol | KD | PAGE TYPE | renderer | audience | search intent | status | consolidation notes |
|---|---|---|---|---|---|---|---|---|---|---|
| capcut | capcut template | 37000* | 15000* | 1* | spec/gallery | static-only | us,uk | how to use/create CapCut template; trend discovery | **EXISTING** | Canonical for capcut template / templates / new trend / ical capcut. Add on-page "new trend" + ical-link section, do NOT spin separate pages |
| roblox-shirt | roblox shirt template | 35000 | — | 13 | spec | static-only | us,uk | 585×559 PNG spec + UGC rules | **EXISTING** | Canonical for shirt; roblox pants/t-shirt fold in as on-page sections or sibling |
| tier-list | tier list template | 9000 | — | 8 | gallery/builder | static-only | us,uk | make/export ranked grid | **EXISTING** | — |
| venn-diagram | venn diagram template | 9000 | 2000 | 10 | builder | static-only | us,uk | 2–3 circle diagram maker | **EXISTING** | Diagram-family anchor; link from flowchart/mind-map |
| vision-board | vision board template | 12000 | 3000 | 12 | gallery | static-only | us,uk | goal collage layout | **EXISTING** | Cross-listed productivity; keep design-side framing |
| wanted-poster | wanted poster template | 14000 | 4000 | 9 | builder | static-only | us,uk | novelty/print poster | **EXISTING** | — |
| discord-bio | discord bio template | 11000* | 1500* | 6* | **gallery** | static-only | us,uk | copy-paste aesthetic bios (190-char), symbol/emoji | **EXISTING (in node, needs seed)** | In design-templates node `seeds` list but no seed file yet — build seed. Canonical for discord bio / aesthetic bio / symbols. Folds: discord server template (separate, below) |
| storyboard | storyboard template | 8000 | 2500 | 10 | builder | static-only | us,uk | panel grid for pre-production | **EXISTING (in node, needs seed)** | In node `seeds`; build seed. Anchor pre-production trio with capcut + shot-list |
| email-signature | email signature template | 8300* | 800* | 17* | **gallery/generator** | static-only | us,uk | copy-paste HTML signature blocks | **NEW** | High-value Jun-6 pull. NOT a PDF builder — HTML output. Builder gap: HTML/clipboard export (§5). Folds: email signature generator, gmail/outlook signature |
| discord-server-template | discord server template | 6000 | 1000 | 9 | spec/gallery | static-only | us,uk | server-clone link templates + channel layout | **NEW** | Distinct from discord-bio (profile). Gallery of layouts + how-to apply server template link |
| twitch-banner-size | twitch banner size | 9000 | 2500 | 8 | **spec** | static-only | us,uk | exact px (1200×480 / 1920×480 player / panels 320w) | **NEW** | Canonical for twitch banner/panel/offline sizes. Cheap spec page |
| youtube-banner-size | youtube banner size | 14000 | 4000 | 10 | **spec** | static-only | us,uk | 2560×1440, 1546×423 safe area | **NEW** | Canonical for youtube channel art / banner / thumbnail size. Spec page |
| instagram-story-template | instagram story template | 12000 | 3500 | 14 | spec/gallery | static-only | us,uk | 1080×1920 + layout ideas | **NEW** | Spec + light gallery. Folds IG post/reel size mentions |
| social-media-size-guide | social media image sizes | 6000 | 1800 | 13 | spec | static-only | us,uk | master dimensions reference (all platforms) | **NEW** | Hub spec page; links out to twitch/youtube/ig spec pages |
| business-card-template | business card template | 22000 | 6000 | 18 | builder/spec | static-only | us,uk | print-ready card (3.5×2in / 85×55mm) | **NEW** | Spec-forward (bleed/safe) + light builder. Watch KD; wave 2 |
| flyer-template | flyer template | 18000 | 5000 | 17 | spec/gallery | static-only | us,uk | print flyer A4/Letter | **NEW** | Canva-shaped SERP; spec + downloads, not heavy builder |
| poster-template | poster template | 13000 | 4000 | 16 | spec/gallery | static-only | us,uk | print poster sizes A2/A3/24×36 | **NEW** | Spec + sizes; links wanted-poster, flyer |
| certificate-template | certificate template | 27000 | 7000 | 17 | builder | letter | us,uk | fillable award/completion cert | **NEW** | One of few true builders here (name/date/signature fields) — letter renderer fits. High vol |
| invitation-template | invitation template | 20000 | 6000 | 16 | builder/gallery | letter | us,uk | party/event invite | **NEW** | Light builder; folds birthday/party invitation as on-page |
| greeting-card-template | greeting card template | 6000 | 2000 | 13 | spec/gallery | static-only | us,uk | foldable card layout | **NEW** | Spec (half/quarter-fold) + samples |
| name-tag-template | name tag template | 9000 | 1500 | 12 | builder | static-only | us,uk | badge sheet (Avery-adjacent) | **NEW** | Links avery-label; light list-plan/sheet builder |
| seating-chart-template | seating chart template | 8000 | 2000 | 14 | list-plan | list-plan | us,uk | event table/seat assignment | **NEW** | list-plan builder (tables × seats). Cross to wedding/life-event |
| logo-design-brief | logo design brief template | 3000 | 1200 | 11 | builder | letter | us,uk | client brief questionnaire | **NEW** | Letter/list-plan brief doc; cross to business cluster |
| brand-style-guide | brand style guide template | 5000 | 1500 | 15 | builder | letter | us,uk | brand book (colours/fonts/logo use) | **NEW** | Structured doc builder; cross to business |
| mood-board-template | mood board template | 6000 | 2000 | 13 | gallery | static-only | us,uk | visual reference collage | **NEW** | Gallery/layout; sibling to vision-board (design-side) |
| infographic-template | infographic template | 11000 | 3000 | 18 | spec/gallery | static-only | us,uk | data-viz layout | **NEW** | Spec + layout ideas; KD watch, wave 3 |
| org-chart-template | org chart template | 14000 | 4000 | 16 | builder | static-only | us,uk | hierarchy diagram | **NEW** | Diagram-family; light builder. Cross to business |
| flowchart-template | flowchart template | 16000 | 4500 | 17 | builder | static-only | us,uk | process diagram | **NEW** | Diagram-family anchor; links venn, mind-map, org-chart |
| mind-map-template | mind map template | 13000 | 3500 | 15 | builder | static-only | us,uk | radial idea map | **NEW** | Diagram-family; cross to education/cornell-notes |
| gantt-chart-template | gantt chart template | 18000 | 5000 | 18 | list-plan | list-plan | us,uk | project timeline bars | **NEW** | **Shared with productivity** — canonical here, cross-link. XLSX export gap (§5). Wave 2 (KD) |
| storyboard (shot-list) | shot list template | 4000 | 1200 | 9 | builder | static-only | us,uk | per-shot production list | fold into storyboard | Consolidate: on-page section of storyboard, not separate seed |

\* = from Jun-6 Ahrefs US+GB pull (capcut, discord-bio, email-signature). All other vol/KD ESTIMATED — verify (§8).

---

## HUB 2 — productivity-templates (Productivity & lists)

### 1. Hub thesis

The productivity hub is list-plan-dominant: nearly everything is a task list, planner grid, schedule, or tracker. The `list-plan` renderer already powers the exemplars (to-do-list, weekly-schedule). The strategic tension here is **export format**: a large share of these terms — budget, expense, mileage, calendar, inventory — carry an explicit "Google Sheets" or "Excel" qualifier, signalling XLSX/Sheets-export intent that the current PDF/DOCX builder does not satisfy. We flag these as builder gaps rather than skipping them, because the on-page content + a copyable Sheets link can rank even before XLSX export ships. Go wide across the task-list / planner / schedule / tracker / operational-sheet families; skip generic "planner template" (broad, Canva-shaped) in favour of qualified long-tail.

### 2. Document table — productivity-templates

| slug | primaryKeyword | US vol | GB vol | KD | PAGE TYPE | renderer | audience | search intent | status | consolidation notes |
|---|---|---|---|---|---|---|---|---|---|---|
| to-do-list | to do list template | 14000 | — | 11 | list-plan | list-plan | us,uk | daily/weekly task list | **EXISTING** | Canonical for to-do / to do / task list |
| weekly-schedule | weekly schedule template | 14000 | — | 14 | list-plan | list-plan | us,uk | Mon–Sun time grid | **EXISTING** | (node: planning) cross-linked here |
| grocery-list | grocery list template | 12000 | — | 9 | list-plan | list-plan | us,uk | shopping list by section | **EXISTING** | — |
| meeting-minutes | meeting minutes template | 12000 | — | 12 | list-plan | list-plan | us,uk | minutes record | **EXISTING** | Pairs with NEW meeting-agenda |
| one-pager | one pager template | 6000 | — | 12 | builder | letter | us,uk | single-page summary | **EXISTING** | — |
| checklist | checklist template | 18000 | 5000 | 13 | list-plan | list-plan | us,uk | sequenced verification list | **EXISTING (in node, needs seed)** | In node `seeds`; build seed. Canonical for checklist / printable checklist |
| timesheet | timesheet template | 22000 | 7000 | 15 | list-plan | list-plan | us,uk | hours by day/project | **EXISTING (in node, needs seed)** | In node `seeds` (timesheet + time-sheet). **XLSX gap** — payroll wants Excel (§5) |
| daily-planner | daily planner template | 16000 | 4500 | 14 | list-plan | list-plan | us,uk | time-block day | **EXISTING (in node, needs seed)** | In node `seeds`; build seed |
| project-planner | project planner template | 9000 | 2500 | 14 | list-plan | list-plan | us,uk | milestones/tasks/status | **EXISTING (in node, needs seed)** | In node `seeds`; build seed. Cross to gantt/kanban |
| chore-chart | chore chart template | 11000 | 2000 | 10 | list-plan | list-plan | us,uk | household task allocation | **EXISTING (in node, needs seed)** | In node `seeds`; build seed |
| sign-up-sheet | sign up sheet template | 14000 | 2500 | 11 | list-plan | list-plan | us,uk | advance interest collection | **EXISTING (in node, needs seed)** | In node `seeds`; build seed |
| sign-in-sheet | sign in sheet template | 13000 | 2500 | 11 | list-plan | list-plan | us,uk | attendance record | **EXISTING (in node, needs seed)** | In node `seeds`; build seed. GDPR note (UK) |
| monthly-planner | monthly planner template | 12000 | 3500 | 14 | list-plan | list-plan | us,uk | month grid | **NEW** | Folds: monthly calendar planner. Sibling to daily/weekly |
| meeting-agenda | meeting agenda template | 15000 | 4000 | 13 | list-plan | list-plan | us,uk | agenda items/times | **NEW** | Pairs with meeting-minutes (cross-link both ways) |
| habit-tracker | habit tracker template | 18000 | 5000 | 12 | list-plan | list-plan | us,uk | daily habit grid (don't-break-chain) | **NEW** | High value, low KD. Wave 1 |
| budget-template | budget template google sheets | 8300* | 300* | 18* | list-plan | list-plan | us,uk | monthly budget; **Sheets/XLSX intent** | **NEW** | Jun-6 pull. **XLSX/Sheets gap is core to intent** (§5). Canonical for budget / monthly budget / google sheets budget |
| google-sheets-calendar | google sheets calendar template | 7300* | 400* | 0* | list-plan | list-plan | us,uk | editable Sheets calendar | **NEW** | Jun-6 pull, KD0. **Sheets-copy intent** — ship copyable Sheet link first; XLSX export gap (§5) |
| expense-tracker | expense tracker template | 14000 | 4000 | 15 | list-plan | list-plan | us,uk | log expenses/categories | **NEW** | XLSX gap. Cross to invoice/business |
| mileage-log | mileage log template | 9000 | 2000 | 11 | list-plan | list-plan | us,uk | trip/mileage for tax | **NEW** | XLSX gap (IRS/HMRC rates note). Wave 2 |
| time-tracking-sheet | time tracking template | 10000 | 3000 | 14 | list-plan | list-plan | us,uk | task time log | **NEW** | Distinct-but-adjacent to timesheet; consolidate carefully (see §4) |
| cleaning-schedule | cleaning schedule template | 13000 | 4000 | 11 | list-plan | list-plan | us,uk | room/frequency chart | **NEW** | Folds: house cleaning checklist. Cross to chore-chart |
| meal-plan | meal plan template | 16000 | 4500 | 13 | list-plan | list-plan | us,uk | weekly meals grid | **NEW** | Cross to grocery-list (strong pair). Wave 1 |
| work-schedule | work schedule template | 17000 | 4000 | 15 | list-plan | list-plan | us,uk | staff/shift roster | **NEW** | Folds: employee/shift schedule. Cross to weekly-schedule |
| shift-schedule | shift schedule template | 8000 | 2500 | 13 | list-plan | list-plan | us,uk | rotating shift roster | fold into work-schedule | Consolidate into work-schedule on-page section unless vol verifies independent |
| kanban-board | kanban board template | 7000 | 2000 | 14 | list-plan | list-plan | us,uk | to-do/doing/done columns | **NEW** | Cross to project-planner. Wave 3 |
| gantt-chart-template | gantt chart template | 18000 | 5000 | 18 | list-plan | list-plan | us,uk | project timeline | **NEW (shared w/ design)** | Canonical in design hub; productivity cross-links. XLSX gap |
| okr-template | okr template | 9000 | 2500 | 14 | list-plan | list-plan | us,uk | objectives + key results | **NEW** | Cross to business. Wave 3 |
| goal-setting | goal setting template | 11000 | 3000 | 13 | list-plan | list-plan | us,uk | SMART goals worksheet | **NEW** | Cross to vision-board; wave 2 |
| sop-template | sop template | 12000 | 2500 | 16 | builder | letter | us,uk | standard operating procedure doc | **NEW** | Doc-style (letter renderer) not list-plan; cross to business. Wave 3 |
| contact-list | contact list template | 8000 | 2000 | 12 | list-plan | list-plan | us,uk | names/phones/emails table | **NEW** | XLSX gap. Wave 2 |
| password-log | password log template | 7000 | 2000 | 9 | list-plan | list-plan | us,uk | offline password sheet | **NEW** | Low KD; security caveat on-page. Wave 2 |
| inventory-template | inventory template | 16000 | 4000 | 16 | list-plan | list-plan | us,uk | stock count sheet | **NEW** | XLSX gap (strong). Cross to business. Wave 3 |
| event-checklist | event planning checklist | 9000 | 3000 | 12 | list-plan | list-plan | us,uk | event task checklist | **NEW** | Folds into checklist family but distinct intent; cross to life-event |

\* = Jun-6 Ahrefs pull (budget google sheets, google sheets calendar). All others ESTIMATED — verify (§8).

---

## 3. Page-type classification rationale (the key contribution)

The hard calls, with SERP/intent justification:

- **CapCut template → spec/gallery, NOT builder.** The asset (a CapCut template) lives *inside the CapCut app*; it cannot be generated on our site. The win is a guide page that explains use/creation, surfaces trend categories, and links to ical/app discovery. `static-only` is correct. A PDF builder would be nonsensical for video. (Already EXISTING and correctly classified.)

- **Discord bio → gallery (copy-paste), NOT builder.** Verified SERP: every top result is a copy-and-paste list of 150–300+ Unicode/emoji bio blocks constrained to ~190 chars (Replug, EmojiCombos, Beebom, Alvaro Trigo). Intent is "give me text I can paste," optionally with a symbol picker. There is no document. `static-only` + (ideally) a small client-side symbol/emoji generator with a copy button. Distinct from **discord server template** (server-clone link + channel-layout reference) — different page, also gallery/spec.

- **Banner sizes (twitch/youtube/instagram) → spec, NOT builder.** Verified current specs: Twitch banner 1200×480 (5:2), player/offline 1920×480 & 1920×1080, panels 320w; YouTube channel art 2560×1440 with 1546×423 all-device safe area; IG story 1080×1920. SERP is dominated by dimension-reference pages (Snappa, StreamScheme, Adobe Express, Canva sizes). Intent is "what exact pixels + safe area," not "fill in a form." `static-only` spec page with the numbers, a safe-area diagram, and a downloadable blank canvas at correct dimensions. Cheapest pages to ship; high authority-per-effort. A master **social-media-size-guide** spec page ties them together and captures the umbrella term.

- **Email signature → gallery/generator, NOT builder.** Verified: SERP is HTML-signature generators (HubSpot, MySignature, mail-signatures) outputting copy-paste HTML for Gmail/Outlook/Apple Mail. The deliverable is HTML markup, not a PDF/DOCX. Our PDF/DOCX builder cannot serve this — flagged as a **builder gap** (HTML output + clipboard copy). Until that ships, a curated gallery of code-block signature templates + "how to install in Gmail/Outlook" can rank.

- **Google Sheets calendar / budget google sheets → list-plan, but Sheets/XLSX export intent.** Verified: intent is "open template link → make a copy → edit in Sheets → print." The qualifier "google sheets" is load-bearing — users want a live spreadsheet, not a flat PDF. Classify as `list-plan` (content + structure match) but flag the **XLSX/Sheets-export gap**. Interim: publish a copyable Google Sheet link alongside the on-page builder; the page can rank on content + the Sheet copy before native XLSX export exists. KD0 on the Sheets-calendar term makes this a wave-1 land-grab despite the gap.

- **Diagram family (venn/flowchart/org-chart/mind-map) → light builder, `static-only`.** These are visual structures, not paginated documents; `static-only` with a small client-side diagram/SVG builder (like tier-list/venn) is the right pattern rather than a paginated renderer. Grouped so internal links reinforce the cluster.

- **Print-design family (business card/flyer/poster/certificate/invitation) → mostly spec/gallery; certificate & invitation are the genuine builders.** Business-card/flyer/poster SERPs are Canva-template-gallery-shaped, so spec-forward pages (bleed, safe area, sizes) + curated downloads beat a thin DOCX builder. Certificate and invitation, by contrast, have real fillable-field intent (recipient name, date, signature / event details) → genuine `letter`-renderer builders.

- **SOP → builder (`letter`), not list-plan.** Despite living in productivity, an SOP is a prose procedure document, not a grid; the `letter` renderer (paginated doc) fits better than `list-plan`.

---

## 4. Consolidation rules

Collapse near-duplicates to one canonical with on-page sections; do not spin a seed per query variant.

- **CapCut:** capcut template / capcut templates / capcut new trend / ical capcut → **one canonical (`capcut`)** + on-page "current trends" and "ical / app link" sections. (Strategy-mandated.)
- **Roblox:** roblox shirt / roblox pants / roblox t-shirt template → canonical `roblox-shirt` + on-page panel-type sections (separate `roblox` general-assets seed already exists for icons/thumbnails/group emblems).
- **Discord:** bio / aesthetic bio / discord symbols / discord status → `discord-bio`. Server template / server clone / channel layout → separate `discord-server-template`. Keep profile vs. server split.
- **Banner sizes:** each platform = one spec page; thumbnail/profile/panel sizes fold into that platform's page as sections; **social-media-size-guide** is the umbrella that links them (avoid a page per sub-dimension).
- **Email signature:** signature template / generator / gmail signature / outlook signature → one `email-signature` page with per-client install sections.
- **Work vs shift schedule:** `work-schedule` canonical; `shift-schedule` folds as on-page section unless Ahrefs shows shift-schedule carries independent volume + distinct rotating-roster SERP — then promote to its own seed (flagged §8).
- **Timesheet vs time-tracking:** keep **separate** but cross-linked. `timesheet` = payroll/billing hours record (compliance framing, WTR 1998); `time-tracking-sheet` = task-level productivity logging. Distinct intent; consolidating would dilute both. Add explicit "timesheet vs time tracking" comparison block on each.
- **Calendar terms:** google-sheets-calendar (Sheets-copy intent) stays distinct from monthly-planner (printable grid). Generic "calendar template" is brand/Canva-shaped — skip as a standalone head; capture via monthly-planner + google-sheets-calendar.
- **Storyboard:** storyboard / shot list / shot list template → `storyboard` + on-page shot-list section.
- **Cleaning:** cleaning schedule / cleaning checklist / house cleaning list → `cleaning-schedule` with checklist section; cross-link chore-chart.
- **Meal:** meal plan / meal planner / weekly meal plan → `meal-plan`; strong cross-link to grocery-list.

---

## 5. Export-format strategy

Current builder exports **PDF / DOCX / print**. Three gaps surface in these hubs and should be logged as builder feature requests:

1. **XLSX / Google Sheets export (list-plan trackers).** Needed for: `budget-template`, `google-sheets-calendar`, `expense-tracker`, `mileage-log`, `timesheet`, `time-tracking-sheet`, `contact-list`, `inventory-template`, `gantt-chart-template`. These terms carry explicit spreadsheet intent (formulas, sortable rows, monthly tabs). **Interim mitigation:** publish a copyable Google Sheet link per page; PDF/DOCX still serve the print sub-intent. This is the single highest-leverage builder investment for the productivity hub.

2. **PNG / canvas / SVG export (design assets).** Needed for: banner-size spec pages (blank canvas at exact px), `instagram-story-template`, diagram family (`venn`, `flowchart`, `org-chart`, `mind-map`, `tier-list`), `mood-board`, `name-tag`. Users want an image, not a paginated PDF. tier-list/venn already lean `static-only` with client-side rendering; extend that pattern. **Interim:** downloadable blank canvas at correct dimensions + PNG screenshot guidance.

3. **HTML / clipboard copy (gallery generators).** Needed for: `email-signature` (HTML signature blocks), `discord-bio` and `discord-server-template` (copy-paste Unicode/emoji + server links). The deliverable is text/markup with a copy button — neither PDF nor DOCX. **Interim:** render code blocks with a copy control; no renderer change required, but a reusable "copy to clipboard" component is the dependency.

**PDF/DOCX is sufficient** for: certificate, invitation, one-pager, SOP, logo-brief, brand-style-guide, meeting-agenda/minutes, sign-in/up sheets, checklists, planners (print sub-intent), seating-chart.

---

## 6. Internal linking plan

Contract: each seed needs **≥4 `related`** (in-hub) + **≥1 `crossCluster`**; every page must clear **≥3 incoming** links (linkGraph.ts). The hub NODE page links every seed once (1 guaranteed incoming each), so each NEW seed needs ≥2 more incoming from siblings — easily met by reciprocal `related` arrays within the families below.

**Design — link families (each page lists ≥4 siblings + cross):**

- *Creator-platform:* capcut ↔ discord-bio ↔ discord-server-template ↔ twitch-banner-size ↔ youtube-banner-size ↔ instagram-story-template ↔ social-media-size-guide. crossCluster → to-do-list / project-planner (creator ops).
- *Diagram:* venn-diagram ↔ flowchart ↔ org-chart ↔ mind-map ↔ gantt-chart ↔ tier-list. crossCluster → cornell-notes / project-planner.
- *Print-design:* certificate ↔ invitation ↔ greeting-card ↔ business-card ↔ flyer ↔ poster ↔ wanted-poster ↔ name-tag. crossCluster → avery-label (education) / life-event invitations.
- *Pre-production:* storyboard ↔ capcut ↔ mood-board ↔ vision-board ↔ shot-list(section). crossCluster → weekly-schedule.
- seating-chart, mood-board, logo-brief, brand-style-guide attach to print-design + creator families; crossCluster → business (logo-brief, brand-guide) / life-event (seating-chart).

**Productivity — link families:**

- *Task/list:* to-do-list ↔ checklist ↔ habit-tracker ↔ event-checklist ↔ grocery-list. crossCluster → capcut / lesson-plan.
- *Planner/calendar:* daily-planner ↔ weekly-schedule ↔ monthly-planner ↔ google-sheets-calendar ↔ meal-plan. crossCluster → cornell-notes.
- *Schedule/roster:* work-schedule ↔ shift-schedule(section) ↔ cleaning-schedule ↔ chore-chart ↔ weekly-schedule. crossCluster → lesson-plan.
- *Tracker/finance:* budget-template ↔ expense-tracker ↔ mileage-log ↔ inventory-template ↔ time-tracking-sheet. crossCluster → invoice-google-docs / balance-sheet (business).
- *Project/ops:* project-planner ↔ kanban-board ↔ gantt-chart ↔ okr-template ↔ meeting-agenda ↔ meeting-minutes ↔ sop-template. crossCluster → one-pager / executive-summary.
- *Admin sheets:* sign-in-sheet ↔ sign-up-sheet ↔ contact-list ↔ password-log ↔ timesheet. crossCluster → nda / lease (record-keeping).
- goal-setting ↔ okr-template ↔ habit-tracker ↔ vision-board; crossCluster → vision-board (design).

Every NEW slug above appears in ≥3 sibling `related` arrays + the node page → ≥3 incoming confirmed by construction. Validate with linkGraph.ts after authoring.

---

## 7. Build priority (waves)

Ranked by volume × low-KD × low build-effort. Spec/gallery pages are cheaper than full builders, so several jump the queue.

**Wave 1 — high vol, low KD, cheap (spec/gallery + existing-node seeds):**
- Design: `email-signature` (Jun-6 KD17, HTML gallery), `twitch-banner-size`, `youtube-banner-size`, `social-media-size-guide`, `discord-bio` seed (in node, KD6), `storyboard` seed.
- Productivity: `google-sheets-calendar` (KD0 land-grab), `habit-tracker` (KD12, high vol), `meal-plan`, `checklist` seed, `daily-planner` seed, `chore-chart` seed, `sign-in-sheet` + `sign-up-sheet` seeds, `meeting-agenda`.

**Wave 2 — strong vol, moderate KD or moderate build:**
- Design: `instagram-story-template`, `certificate-template` (builder, high vol), `invitation-template`, `org-chart`, `flowchart`, `mind-map`, `name-tag`, `seating-chart`, `discord-server-template`.
- Productivity: `budget-template` (XLSX gap but KD18 vol8.3k), `expense-tracker`, `monthly-planner`, `work-schedule`, `cleaning-schedule`, `project-planner` seed, `timesheet` seed, `mileage-log`, `goal-setting`, `contact-list`, `password-log`, `event-checklist`.

**Wave 3 — higher KD / heavier build / XLSX-dependent:**
- Design: `business-card`, `flyer`, `poster`, `greeting-card`, `infographic`, `mood-board`, `logo-design-brief`, `brand-style-guide`, `gantt-chart` (shared).
- Productivity: `inventory-template`, `kanban-board`, `okr-template`, `sop-template`, `time-tracking-sheet`. Several of these are best built after XLSX export ships (§5).

---

## 8. Data gaps (verify before commit)

- **Vol/KD estimated for all non-asterisked rows.** Only capcut, discord-bio, email-signature, budget-google-sheets, google-sheets-calendar are from the Jun-6 pull. Pull real Ahrefs US+GB for every NEW slug before sequencing within waves.
- **KD ceiling watch:** business-card (~18), flyer (~17), certificate (~17), invitation (~16), infographic (~18), gantt (~18), inventory (~16), sop (~16) sit near the ≤20 line on estimate — confirm they clear it; demote any that exceed.
- **Consolidation-vs-split flags needing volume data:** shift-schedule (fold vs. standalone), time-tracking-sheet vs timesheet (confirm distinct SERPs), roblox pants/t-shirt (fold confirmed but verify no large standalone term), discord-server-template (confirm vol justifies separate page vs. discord-bio section).
- **Existing-node seeds without files:** discord-bio, storyboard (design node) and checklist, timesheet, daily-planner, project-planner, chore-chart, sign-up-sheet, sign-in-sheet (productivity node) are referenced in node `seeds:` arrays but have **no seed markdown yet** — they are link-graph dangling references until authored. Treat as NEW build work despite "EXISTING (in node)" status.
- **Platform specs drift:** banner/dimension numbers verified Jun 2026 (Twitch 1200×480 / 1920×480; YouTube 2560×1440, 1546×423 safe; IG 1080×1920) — re-verify against official platform docs at author time, as platforms change these.
- **Renderer fit assumption:** diagram + design-asset pages assumed `static-only` with client-side rendering (per tier-list/venn precedent) — confirm the TemplateBuilder/static-only component supports SVG/canvas output before committing PNG/SVG export rows in §5.
