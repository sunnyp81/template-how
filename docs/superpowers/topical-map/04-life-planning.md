---
name: Topical Map — Life Events & Planning hubs
description: Document-level topical map for the life-event-templates and planning-templates NODEs on template.how. Goes wide at the specific-document long-tail level. Includes per-document keyword/volume/KD/renderer/intent tables, consolidation rules, US-vs-UK variant strategy, internal linking plan, build priority waves, and data-gap flags. Architecture document only — not finished SEED pages.
date: 2026-06-06
author: research task (claude/affectionate-mccarthy-yVSvQ)
status: draft for review
---

# Life Events & Planning — Topical Map

> Strategy lock (Jun 6 2026): go **wide at the specific-document level**, target low-KD (≤20) long-tail where each document is its own SERP. Builder-backed where it produces a clean printable; some life-event docs lean emotional/templated but still ship a builder. Markets: US + UK. Renderer enum: `legal-document | resume | invoice | letter | list-plan | static-only`.

**All volume / KD figures below are ESTIMATES.** No Ahrefs was available for this pass. They are directional (informed by SERP inspection, existing seed metrics in-repo, and known head-term magnitudes) and MUST be verified against real Ahrefs/SERP data before a page enters a build wave. See [Data gaps](#7-data-gaps).

Convention used in tables:
- **status**: EXISTING (already a SEED in `src/content/seeds/`) or NEW.
- **renderer**: from the enum. Life-event keepsakes (invitations, cards, programs, announcements) map to `static-only` (crawlable explainer + builder emits a printable PDF/DOCX, no legal/computational logic). Anything that is a fill-in personal record with formal structure (obituary, will-adjacent) can use `legal-document`. Plans/lists/itineraries/checklists/budgets map to `list-plan`. Letters (thank-you, condolence message text) can use `letter`.
- A slug already in NODE frontmatter `seeds:` but with **no file yet** is marked EXISTING-IN-NODE (planned, referenced by the hub, not yet authored) — treat as NEW for authoring but do not re-add to the node seed list.

NODE seed lists currently reference several not-yet-authored slugs:
- life-event-templates node references: `baby-announcement, graduation-invitation, thank-you-card, christmas-card, birthday-invite` (referenced, no file).
- planning-templates node references: `birth-plan, daily-schedule, weekly-calendar, weekly-planner, meal-plan, meal-planning` (referenced, no file).
These referenced-but-unauthored slugs are reconciled in the tables below (renamed to the canonical primary-keyword slug where the node used a loose name — see [Consolidation rules](#3-consolidation-rules)).

---

## HUB 1 — Life events (`life-event-templates`)

### 1.1 Hub thesis

The life-event hub owns the documents people produce once or twice in a lifetime, under emotional pressure, with no prior experience — births, deaths, weddings, religious milestones, and the cards and announcements that surround them. The competitive wedge is the *specific document* (a "funeral order of service template", a "save the date template", a "baptism invitation template"), not the head term "invitation template". Each document is a low-KD long-tail SERP that rewards a crawlable explainer (conventions, what-must-include, US/UK differences, common mistakes, worked example) plus a builder that emits a clean printable. The hub cross-links hard into the legal hub at the death and estate moment (obituary/funeral → last-will) and into planning at the logistics moment (wedding/party → checklists, budgets, guest lists).

### 1.2 Document table — Life events

| slug | primaryKeyword | est US vol | est GB vol | est KD | renderer | audience | intent | status | consolidation notes |
|---|---|---|---|---|---|---|---|---|---|
| obituary | obituary template | 22000 | 3000 | 4 | legal-document | us, uk | template/printable | EXISTING | head of death cluster; cross-link last-will |
| funeral-program | funeral program template | 4700 | 1500 | 12 | static-only | us, uk | template/printable | EXISTING | US label; pairs with funeral-order-of-service (UK variant) |
| funeral-order-of-service | funeral order of service template | 600 | 6500 | 10 | static-only | uk, us | template/printable | NEW | UK-dominant. **Variant page of funeral-program**, not a dupe — see §4. Strong UK-vol term; own page justified |
| eulogy | eulogy template | 9000 | 2400 | 8 | letter | us, uk | how-to-write + template | NEW | referenced by obituary/funeral-program `related` already |
| death-announcement | death announcement template | 2400 | 1200 | 9 | letter | us, uk | template/wording | NEW | merge "death notice template" here; obituary covers long form |
| sympathy-card | sympathy card template | 2900 | 800 | 11 | static-only | us, uk | wording + printable | NEW | merge condolence-card US/UK; "what to write in a sympathy card" wording intent |
| condolence-message | condolence message examples | 5000 | 2600 | 14 | letter | us, uk | wording (no printable) | NEW | text-only wording page; feeds sympathy-card. Consider folding into sympathy-card if thin |
| memorial-card | memorial card template | 1600 | 1900 | 10 | static-only | us, uk | printable keepsake | NEW | UK "memorial card"/"remembrance card"; distinct from sympathy (keepsake vs sent card) |
| in-memoriam | in memoriam template | 1300 | 900 | 12 | static-only | us, uk | announcement/printable | NEW | anniversary-of-death notice; thin — consider folding into death-announcement |
| birth-announcement | birth announcement template | 5400 | 1300 | 10 | static-only | us, uk | printable/card | NEW | reconciles node's `baby-announcement`; rename to birth-announcement (matches primaryKeyword) |
| baby-shower-invitation | baby shower invitation template | 14000 | 1200 | 14 | static-only | us, uk | printable/card | NEW | US-dominant; UK "baby shower" rising. High vol, seasonal-evergreen |
| pregnancy-announcement | pregnancy announcement template | 3200 | 900 | 11 | static-only | us, uk | printable/card | NEW | distinct from birth-announcement (before vs after) |
| wedding-invitation | wedding invitation template | 40000 | 9000 | 18 | static-only | us, uk | printable/card | NEW | head-ish; KD higher. Hub anchor for wedding sub-cluster |
| save-the-date | save the date template | 18000 | 4400 | 13 | static-only | us, uk | printable/card | NEW | term consistent US/UK |
| wedding-rsvp | wedding rsvp card template | 6000 | 1600 | 12 | static-only | us, uk | printable/card | NEW | "rsvp template" generic merges here |
| wedding-program | wedding program template | 8000 | 600 | 13 | static-only | us | printable | NEW | US label; pair with wedding-order-of-service (UK) — see §4 |
| wedding-order-of-service | wedding order of service template | 400 | 5400 | 11 | static-only | uk | printable | NEW | UK label for ceremony booklet; own page (UK vol >> US) |
| wedding-seating-chart | wedding seating chart template | 9000 | 1400 | 14 | static-only | us | planner/printable | NEW | US "seating chart" (by guest); pair with table-plan UK — see §4 |
| wedding-table-plan | wedding table plan template | 300 | 4800 | 12 | static-only | uk | planner/printable | NEW | UK "table plan" (by table). Own page; strong UK vol |
| wedding-menu | wedding menu template | 4400 | 1900 | 12 | static-only | us, uk | printable/card | NEW | reception menu card |
| place-cards | place card template | 5000 | 1600 | 12 | static-only | us, uk | printable | NEW | "name card"/"escort card" merges; UK "place name" |
| wedding-vows | wedding vows template | 12000 | 2600 | 13 | letter | us, uk | how-to-write + examples | NEW | wording intent, no printable strictly; letter renderer |
| wedding-checklist | wedding checklist template | 11000 | 4000 | 16 | list-plan | us, uk | planner/checklist | NEW | **crossCluster anchor to planning hub**; the wedding-planning bridge |
| wedding-budget | wedding budget template | 9000 | 3000 | 15 | list-plan | us, uk | budget/planner | NEW | crossCluster → planning budget cluster |
| wedding-guest-list | wedding guest list template | 4400 | 1600 | 13 | list-plan | us, uk | planner/list | NEW | crossCluster → planning guest-list |
| engagement-invitation | engagement party invitation template | 3000 | 900 | 12 | static-only | us, uk | printable/card | NEW | part of wedding sub-cluster |
| anniversary-invitation | anniversary invitation template | 2400 | 700 | 11 | static-only | us, uk | printable/card | NEW | milestone (25th/50th) variants on-page |
| graduation-invitation | graduation invitation template | 14000 | 600 | 14 | static-only | us | printable/card | NEW | US-dominant (announcements culture); node references `graduation-invitation` |
| graduation-announcement | graduation announcement template | 8000 | 200 | 13 | static-only | us | printable/card | NEW | US-specific; distinct from invitation (sent to non-attendees). Could fold into graduation-invitation if thin |
| retirement-invitation | retirement party invitation template | 3600 | 800 | 11 | static-only | us, uk | printable/card | NEW | low-KD long-tail |
| housewarming-invitation | housewarming invitation template | 3200 | 700 | 11 | static-only | us, uk | printable/card | NEW | low-KD |
| baptism-invitation | baptism invitation template | 6000 | 500 | 12 | static-only | us | printable/card | NEW | US "baptism"; pair w/ christening-invitation UK — see §4 |
| christening-invitation | christening invitation template | 300 | 4400 | 10 | static-only | uk | printable/card | NEW | UK "christening" (same rite). Own page — strong UK vol, distinct term |
| bar-mitzvah-invitation | bar mitzvah invitation template | 4000 | 300 | 12 | static-only | us, uk | printable/card | NEW | cover bar/bat on one page (bat as on-page section) |
| quinceanera-invitation | quinceanera invitation template | 8000 | 100 | 13 | static-only | us | printable/card | NEW | US-Latino dominant; near-zero GB. audience us only |
| party-invitation | party invitation template | 33000 | 8000 | 18 | static-only | us, uk | printable/card | NEW | broad term — KD higher. Risk of cannibalising specific invites; position as fallback/hub for invite sub-cluster |
| birthday-invitation | birthday invitation template | 60000 | 9000 | 19 | static-only | us, uk | printable/card | NEW | reconciles node `birthday-invite`; very high vol, higher KD. Milestone (40th/50th) + kids as on-page sections |
| thank-you-card | thank you card template | 22000 | 5000 | 14 | letter | us, uk | wording + printable | NEW | reconciles node `thank-you-card`; wedding/funeral/baby occasions as sections |
| gift-tags | printable gift tags template | 6000 | 2400 | 12 | static-only | us, uk | printable | NEW | seasonal (Christmas) spike; evergreen base |
| christmas-card | christmas card template | 18000 | 6000 | 15 | static-only | us, uk | printable/card + letter | NEW | reconciles node `christmas-card`; "Christmas letter" as on-page section. Strongly seasonal |
| family-tree | family tree template | 24000 | 6500 | 4 | static-only | us, uk | template/printable | EXISTING | genealogy head; cross-link obituary/last-will |
| time-capsule | time capsule template | 2900 | 700 | 9 | static-only | us, uk | printable/list | NEW | letter-to-future + contents list; low-KD novelty term |
| memorial-service-program | memorial service program template | 1900 | 400 | 11 | static-only | us | printable | NEW | near-dupe of funeral-program (memorial vs funeral). **Fold into funeral-program as section** unless data shows distinct SERP |

**Life-events count: 41 documents — 3 EXISTING (obituary, funeral-program, family-tree) + 38 NEW.** After recommended consolidation (fold memorial-service-program, in-memoriam, condolence-message, graduation-announcement if thin), realistic authored NEW count ≈ 34.

---

## HUB 2 — Planning (`planning-templates`)

### 2.1 Hub thesis

The planning hub owns the documents that turn intentions into structured, shareable, followable time and money: itineraries, checklists, planners, budgets, meal plans, packing/moving lists, and the goal/plan-outline documents. The wedge is again specific — "road trip itinerary", "moving house checklist", "holiday budget", "monthly budget" — each a low-KD list/plan SERP. Renderer is almost entirely `list-plan` (builder emits a structured printable/spreadsheet-style PDF/DOCX). This hub is the cross-cluster sink for the life-event sub-clusters (wedding checklist/budget/guest list bridge both hubs) and shares the existing seeds itinerary, travel-itinerary, weekly-schedule (here) and grocery-list (lives in productivity but cross-links).

### 2.2 Document table — Planning

| slug | primaryKeyword | est US vol | est GB vol | est KD | renderer | audience | intent | status | consolidation notes |
|---|---|---|---|---|---|---|---|---|---|
| itinerary | itinerary template | 16000 | 3600 | 8 | list-plan | us, uk | template/planner | EXISTING | general event/multi-stop; differentiate from travel-itinerary (see §3) |
| travel-itinerary | travel itinerary template | 17000 | 4400 | 3 | list-plan | us, uk | template/planner | EXISTING | trip day-by-day; head of travel sub-cluster |
| trip-itinerary | trip itinerary template | 4400 | 900 | 8 | list-plan | us, uk | planner | NEW | near-dupe of travel-itinerary. **Canonicalise/redirect to travel-itinerary** unless SERP distinct — see §3 |
| road-trip-itinerary | road trip itinerary template | 3600 | 700 | 9 | list-plan | us, uk | planner | NEW | distinct intent (driving legs, fuel stops); own page justified |
| vacation-itinerary | vacation itinerary template | 2900 | 200 | 9 | list-plan | us | planner | NEW | US "vacation" (UK = "holiday"). Pair w/ holiday-itinerary UK — see §4 |
| holiday-itinerary | holiday itinerary template | 200 | 2900 | 8 | list-plan | uk | planner | NEW | UK "holiday"; own page (term split). Beware UK "holiday" = vacation, US "holiday" = Christmas |
| event-itinerary | event itinerary template | 1900 | 500 | 9 | list-plan | us, uk | planner | NEW | conference/run-of-show; overlaps itinerary — fold if thin |
| weekly-schedule | weekly schedule template | 14000 | 2400 | 8 | list-plan | us, uk | planner | EXISTING | time-block week; head of schedule sub-cluster |
| daily-schedule | daily schedule template | 9000 | 1600 | 10 | list-plan | us, uk | planner | NEW | reconciles node `daily-schedule`; granular single day |
| daily-planner | daily planner template | 12000 | 3000 | 12 | list-plan | us, uk | planner | NEW | priorities+notes oriented; differentiate from daily-schedule (see §3) |
| weekly-planner | weekly planner template | 11000 | 2900 | 12 | list-plan | us, uk | planner | NEW | reconciles node `weekly-planner` |
| weekly-calendar | weekly calendar template | 8000 | 1600 | 11 | list-plan | us, uk | calendar/grid | NEW | reconciles node `weekly-calendar`; Mon-first UK / Sun-first US on-page |
| monthly-calendar | monthly calendar template | 14000 | 3600 | 13 | list-plan | us, uk | calendar/grid | NEW | high vol; pairs with weekly-calendar |
| monthly-planner | monthly planner template | 6000 | 1900 | 11 | list-plan | us, uk | planner | NEW | goals/habit oriented month view |
| meal-plan | meal plan template | 9000 | 2900 | 9 | list-plan | us, uk | planner+list | NEW | reconciles node `meal-plan`; links grocery-list |
| meal-planner | meal planner template | 8000 | 3600 | 10 | list-plan | us, uk | planner | NEW | reconciles node `meal-planning`; near-dupe of meal-plan — **canonical pair, differentiate or merge** (see §3) |
| household-budget | household budget template | 9000 | 4400 | 13 | list-plan | us, uk | budget | NEW | head of budget sub-cluster; crossCluster → business balance-sheet |
| monthly-budget | monthly budget template | 14000 | 3600 | 14 | list-plan | us, uk | budget | NEW | high vol; pairs household-budget |
| event-budget | event budget template | 2400 | 800 | 10 | list-plan | us, uk | budget | NEW | feeds wedding-budget/party budgets |
| holiday-budget | holiday budget template | 1300 | 1600 | 9 | list-plan | uk, us | budget | NEW | UK "holiday"=trip budget; US "holiday"=Christmas budget — disambiguate on-page. Lowish vol but low KD |
| travel-budget | travel budget template | 2900 | 900 | 9 | list-plan | us, uk | budget | NEW | trip cost planner; links travel-itinerary |
| packing-list | packing list template | 14000 | 4400 | 12 | list-plan | us, uk | list/printable | NEW | travel-dominant intent. Disambiguate from shipping "packing list" (note + canonical to travel sense) |
| moving-checklist | moving house checklist template | 6000 | 6500 | 12 | list-plan | us, uk | checklist | NEW | **UK term = "moving house checklist"** (verified); US = "moving checklist". One page, lead with US slug, UK H2/variant — see §4 |
| bucket-list | bucket list template | 12000 | 4400 | 11 | list-plan | us, uk | list/printable | NEW | goals/printable; cross-link goal-planner & vision-board (life events/design) |
| goal-planner | goal planner template | 6000 | 2400 | 12 | list-plan | us, uk | planner | NEW | SMART-goal oriented; cross-link vision-board |
| new-year-resolution | new year resolution template | 3600 | 1900 | 10 | list-plan | us, uk | planner | NEW | strongly seasonal (Dec–Jan); low KD |
| birth-plan | birth plan template | 12000 | 9000 | 9 | list-plan | us, uk | planner | NEW | reconciles node `birth-plan`; NHS (UK) vs hospital (US) on-page; crossCluster → life-events birth-announcement |
| project-timeline | project timeline template | 8000 | 2400 | 14 | list-plan | us, uk | planner | NEW | crossCluster → business; Gantt-lite |
| event-timeline | event timeline template | 2900 | 700 | 10 | list-plan | us, uk | planner | NEW | run-of-show for events; links event-itinerary |
| guest-list | guest list template | 6000 | 1900 | 11 | list-plan | us, uk | list | NEW | generic; wedding-guest-list (life events) is the specific sibling |
| party-planning-checklist | party planning checklist template | 4400 | 1200 | 11 | list-plan | us, uk | checklist | NEW | crossCluster → life-events party-invitation |
| business-plan-outline | business plan template | 33000 | 9000 | 22 | list-plan | us, uk | outline | NEW | KD>20 — **defer/flag**; arguably belongs business hub. Keep as outline-only here, monitor |
| marketing-plan-outline | marketing plan template | 18000 | 4400 | 20 | list-plan | us, uk | outline | NEW | borderline KD; consider business hub ownership |

**Planning count: 33 documents — 3 EXISTING (itinerary, travel-itinerary, weekly-schedule) + 30 NEW.** After consolidation (redirect trip-itinerary, merge/differentiate meal-plan↔meal-planner, fold event-itinerary, defer business/marketing-plan), realistic authored NEW count ≈ 26.

> Note: `grocery-list` is an EXISTING seed but lives in the **productivity** node, not planning. It is cross-linked from meal-plan/packing-list but is NOT owned by this hub. Do not move it.

---

## 3. Consolidation rules

Collapse near-dupes so we own one canonical URL per intent and don't cannibalise.

1. **itinerary vs travel-itinerary (both EXISTING).** Keep both — they are distinct SERPs. `travel-itinerary` = day-by-day trip (flights/hotels/activities); `itinerary` = general timed schedule for any event (conference, business trip, multi-stop day, wedding-day run sheet). Differentiate hard on-page: travel-itinerary owns trip/holiday/vacation queries; itinerary owns business-trip/conference/event queries. Already cross-link each other.
2. **trip-itinerary → canonical to travel-itinerary.** Same intent. Author trip-itinerary ONLY if Ahrefs shows a meaningfully distinct SERP; otherwise 301 `trip-itinerary` → `travel-itinerary` and serve the query via an on-page "trip itinerary" H2. Default: **redirect, do not author.**
3. **vacation-itinerary (US) / holiday-itinerary (UK).** Term split, not intent split, but volume sits on opposite sides of the Atlantic and the words differ. Author both as thin variant pages cross-canonicalised to travel-itinerary, OR (preferred) make each a short standalone targeting its locale with a canonical pointing to itself. Decide after volume verification. Watch the UK "holiday" trap: UK holiday-itinerary = vacation; US "holiday" = Christmas. Keep holiday-budget disambiguation aligned.
4. **meal-plan vs meal-planner.** Near-dupe. Recommended: `meal-plan` = the filled weekly grid (output); `meal-planner` = the planning tool/system (recipe research, batch cooking, shopping integration). If SERP overlap is near-total, merge into `meal-plan` and 301 `meal-planner`. Verify first.
5. **daily-schedule vs daily-planner; weekly-schedule vs weekly-planner vs weekly-calendar.** These are genuinely distinct user mental models (schedule = time-blocked, planner = priorities/notes/habits, calendar = date grid). Keep separate but each page must explicitly state the difference and link to its siblings (the node hub already articulates the distinction). Risk of cannibalisation is real — monitor in GSC; merge the weakest if they compete.
6. **funeral-program (US) / funeral-order-of-service (UK); memorial-service-program.** "Order of service" and "funeral program" are the *same artefact* with regional labels (verified). Keep funeral-program (US) and funeral-order-of-service (UK) as a variant pair (§4) because UK search volume on "order of service" is large and the term genuinely differs. `memorial-service-program` is too close — **fold into funeral-program as a section** ("memorial vs funeral program") unless data shows a distinct SERP.
7. **sympathy-card / condolence-message / condolence-card.** "Sympathy card" (US-leaning) and "condolence card/message" (UK-leaning) overlap. Own `sympathy-card` (printable) as canonical; `condolence-message` is a *wording* page (text examples, no printable) — keep only if it pulls distinct "what to write" volume; otherwise fold its wording examples into sympathy-card. Merge "condolence card template" into sympathy-card.
8. **death-announcement / death-notice / in-memoriam.** "Death notice template" merges into `death-announcement`. `in-memoriam` (anniversary remembrance) is distinct in intent but thin — fold into death-announcement as a section unless verified volume justifies a page. Obituary stays separate (long-form biography).
9. **graduation-invitation / graduation-announcement.** US-specific pair (invitation = come to the party; announcement = informing, often gift-soliciting). Keep invitation canonical; author announcement only if SERP distinct, else section within invitation.
10. **"free X" / "X template" merges.** Across BOTH hubs: do NOT create separate `free-*` pages. "free obituary template", "free wedding invitation template", "printable X template" are the SAME SERP as "X template" — fold the "free"/"printable" qualifier into the title tag and H1 of the single canonical page (the obituary seed title already does this: "Obituary Template — Free (US + UK Formats)"). One page per document, qualifier in metadata.
11. **bar/bat mitzvah; baptism/christening; baby shower.** Bar + bat mitzvah on one page (bat as section). Baptism (US) / christening (UK) is a term split → variant pair (§4). Quinceañera is US-only (audience `us`), near-zero GB.
12. **business-plan-outline / marketing-plan-outline.** KD ≥20 and arguably business-hub property. Flag for the business-hub map owner; if kept here, scope as *outline/structure* only (not full financial business plan) and defer to a late wave.

---

## 4. Variant strategy (US vs UK)

Where US and UK use different *words* for the same document AND both carry real volume, ship distinct pages (better exact-match relevance + locale trust) rather than one blended page. Where conventions differ but the term is shared, use a strong on-page section. The `variants` collection (schema in config.ts: `parentSeed`, `jurisdictionCode`, `audience` single-enum, `siblings` ≥3) is the mechanism for jurisdiction children; standalone term-split pages can also be full SEEDs with `audience: [uk]` or `[us]`.

**Distinct page pairs (term differs + both have volume):**

| US page | UK page | Why distinct | Mechanism |
|---|---|---|---|
| funeral-program | funeral-order-of-service | "order of service" is large UK volume; different term | Two SEEDs, cross-link as siblings; or UK as `variant` of funeral-program |
| wedding-program | wedding-order-of-service | same split as funeral | Two SEEDs, cross-linked |
| wedding-seating-chart | wedding-table-plan | US lists by guest, UK lists by table; different term + layout | Two SEEDs; explain both layouts on each |
| baptism-invitation | christening-invitation | same rite, regional term (verified); UK vol on "christening" | Two SEEDs, `audience` weighted |
| graduation-invitation | (UK minimal) | US announcement culture; UK near-zero | One SEED `audience: [us]`; UK note on-page |
| quinceanera-invitation | (n/a) | US-Latino only | `audience: [us]` |
| vacation-itinerary | holiday-itinerary | US "vacation" / UK "holiday" | Two SEEDs OR variants of travel-itinerary |

**Strong on-page section (term shared, convention differs):**
- **moving-checklist:** UK primary keyword is "moving house checklist" (verified); US "moving checklist". Lead the page with the US slug, give the UK term an H2 + the UK-specific tasks (council tax, TV licence, Royal Mail redirection, gas/electric meter readings) vs US (USPS change-of-address, utilities transfer). Title tag carries both.
- **birth-plan:** NHS antenatal pathway + UK options (water birth availability varies by trust, NHS midwife-led units) vs US (OB/hospital, anesthesiologist/epidural norms, insurance). On-page split; one page, `audience: [us, uk]`.
- **weekly-calendar / monthly-calendar:** Monday-first (UK/ISO) vs Sunday-first (US). On-page toggle/section; one page.
- **obituary / family-tree (EXISTING):** already handle US/UK tone and records (GRO vs state vital records) on-page. Keep.
- **wedding-invitation / save-the-date / thank-you-card:** conventions differ (UK "RSVP" wording, US "Mr & Mrs" formality, registry vs "no gifts"). One page each with US/UK wording sections.
- **christmas-card vs US "holiday card":** US increasingly "holiday card" (inclusive); UK "Christmas card". Cover the "holiday card" variant as an H2 within christmas-card; consider a `holiday-card` redirect/section.

---

## 5. Internal linking plan

Contract (config.ts): every SEED needs `related` ≥4 and `crossCluster` ≥1. linkGraph requires **≥3 incoming** internal links per page (orphan/under-linked check, `minIncoming: 3`). Plan below guarantees each NEW page has 4+ same-hub `related` and 1+ `crossCluster`, and earns ≥3 incoming by reciprocal linking within sub-clusters + the NODE hub page listing it in `seeds:`.

**Incoming-link guarantee pattern (per page, ≥3 incoming):**
1. NODE hub page (`life-event-templates.md` / `planning-templates.md`) lists the slug in `seeds:` → 1 incoming from hub.
2. Two+ sibling SEEDs in the same sub-cluster list it in their `related` (reciprocal) → 2+ incoming.
3. Result: ≥3 incoming. Sub-clusters below are sized ≥4 so reciprocity is easy.

**Life-events sub-clusters (related within hub):**
- *Death cluster:* obituary, funeral-program, funeral-order-of-service, eulogy, death-announcement, sympathy-card, memorial-card, condolence-message, in-memoriam, family-tree. crossCluster → **last-will (legal)**, plus letter-of-recommendation/lesson-plan already used as cross anchors on obituary/funeral.
- *Wedding cluster:* wedding-invitation, save-the-date, wedding-rsvp, wedding-program, wedding-order-of-service, wedding-seating-chart, wedding-table-plan, wedding-menu, place-cards, wedding-vows, wedding-checklist, wedding-budget, wedding-guest-list, engagement-invitation, anniversary-invitation, thank-you-card. crossCluster → **planning hub** (wedding-checklist→party-planning-checklist; wedding-budget→event-budget/household-budget; wedding-guest-list→guest-list).
- *Birth/child cluster:* birth-announcement, pregnancy-announcement, baby-shower-invitation, baptism-invitation, christening-invitation, bar-mitzvah-invitation, thank-you-card. crossCluster → **birth-plan (planning)**.
- *Celebration/seasonal cluster:* birthday-invitation, party-invitation, graduation-invitation, graduation-announcement, retirement-invitation, housewarming-invitation, quinceanera-invitation, christmas-card, gift-tags, thank-you-card, time-capsule. crossCluster → **party-planning-checklist (planning)**; christmas-card → gift-tags + holiday-budget.

**Planning sub-clusters (related within hub):**
- *Travel cluster:* travel-itinerary, itinerary, trip-itinerary(if kept), road-trip-itinerary, vacation-itinerary, holiday-itinerary, event-itinerary, packing-list, travel-budget. crossCluster → **grocery-list (productivity)** (already on travel-itinerary), and → life-events.
- *Schedule/calendar cluster:* weekly-schedule, daily-schedule, daily-planner, weekly-planner, weekly-calendar, monthly-calendar, monthly-planner. crossCluster → **to-do-list / productivity**.
- *Budget cluster:* household-budget, monthly-budget, event-budget, holiday-budget, travel-budget, wedding-budget(life events). crossCluster → **balance-sheet / profit-and-loss-statement (business)**.
- *Meal cluster:* meal-plan, meal-planner. related → grocery-list (productivity), weekly-schedule. crossCluster → **grocery-list**.
- *Goals/list cluster:* bucket-list, goal-planner, new-year-resolution, guest-list, packing-list. crossCluster → **vision-board (life events/design)** for bucket-list/goal-planner.
- *Event-ops cluster:* party-planning-checklist, event-timeline, project-timeline, event-budget, guest-list, event-itinerary, moving-checklist. crossCluster → **business hub** (project-timeline) and **life-events** (party-planning-checklist→party-invitation).

**Cross-hub bridges (the load-bearing crossCluster edges):**
- obituary / funeral-program / family-tree → **last-will** (legal) — the death/estate moment.
- wedding-checklist / wedding-budget / wedding-guest-list (life events) ⇄ party-planning-checklist / event-budget / guest-list (planning) — the wedding-planning bridge.
- birth-announcement / pregnancy-announcement (life events) ⇄ birth-plan (planning).
- christmas-card / gift-tags (life events) ⇄ holiday-budget (planning).
- bucket-list / goal-planner (planning) ⇄ vision-board (life events).

All NEW pages: confirm reciprocal `related` so the linkGraph validator reports zero orphans / zero under-linked at `minIncoming: 3`. Run the existing link-graph validation after each wave.

---

## 6. Build priority (waves)

Ranked by **volume × low KD × builder-fit**, with seasonal vs evergreen noted. Evergreen first; seasonal terms timed to publish ~8–10 weeks before their peak. Existing seeds excluded (already live).

**Seasonal/evergreen split:**
- **Seasonal (time to season):** wedding-* (peak engagements Dec–Feb, weddings May–Sep — publish by Feb), christmas-card / gift-tags / holiday-budget (publish by Sep–Oct), new-year-resolution (publish by Nov), graduation-* (publish by Mar–Apr), baby-shower (mild summer skew).
- **Evergreen (publish anytime):** obituary-adjacent death cluster, all planning schedule/budget/itinerary/checklist, birth-plan, bucket-list, family-tree adjacencies, thank-you-card.

**Wave 1 — highest vol × KD ≤12 × clean builder-fit (evergreen, ship first):**
- Life events: eulogy, sympathy-card, birth-announcement, death-announcement, memorial-card, family-tree adjacencies (already have family-tree), time-capsule.
- Planning: travel cluster additions — road-trip-itinerary, packing-list, travel-budget; schedule cluster — daily-schedule, weekly-calendar, monthly-calendar; meal-plan; birth-plan; household-budget, monthly-budget; bucket-list; moving-checklist.
- Funeral-order-of-service (UK variant of existing funeral-program) — high UK vol, KD 10, leverages live funeral-program.

**Wave 2 — strong vol, slightly higher KD or seasonal-evergreen, builder-backed:**
- Life events: thank-you-card, baby-shower-invitation, save-the-date, wedding-rsvp, place-cards, wedding-menu, engagement-invitation, christening-invitation, baptism-invitation, bar-mitzvah-invitation, pregnancy-announcement, retirement-invitation, housewarming-invitation.
- Planning: weekly-planner, daily-planner, monthly-planner, meal-planner (or merge), goal-planner, event-budget, holiday-budget, vacation-itinerary, holiday-itinerary, guest-list, party-planning-checklist, event-timeline, project-timeline, new-year-resolution.

**Wave 3 — high vol but KD 14–19 (need link equity first) + remaining seasonal:**
- Life events: wedding-invitation, wedding-program, wedding-order-of-service, wedding-seating-chart, wedding-table-plan, wedding-vows, wedding-checklist, wedding-budget, wedding-guest-list, birthday-invitation, party-invitation, graduation-invitation, graduation-announcement, christmas-card, gift-tags, anniversary-invitation, quinceanera-invitation.
- Planning: event-itinerary (or fold), trip-itinerary (likely redirect not build).

**Wave 4 / deferred — KD ≥20 or hub-ownership question:**
- business-plan-outline, marketing-plan-outline (verify ownership vs business hub; KD high).

Rationale: Wave 1 banks low-KD evergreen wins that compound link equity; the high-volume wedding & birthday cluster (Wave 3) is KD 14–19 and benefits from internal links already pointing in from Waves 1–2 before we attack it. Seasonal pages are slotted into whichever wave matches their lead time.

---

## 7. Data gaps

Everything below needs real Ahrefs/SERP verification before committing build effort. **All volumes and KDs in this document are estimates.**

1. **All vol/KD figures are estimates** — no Ahrefs this pass. Priority verification targets: the high-volume/borderline-KD set (wedding-invitation, birthday-invitation, party-invitation, christmas-card, business/marketing-plan, monthly-budget) where KD 14–22 estimates decide wave placement and ownership.
2. **US vs GB split accuracy** — the term-split pairs (funeral-order-of-service, christening-invitation, wedding-table-plan, holiday-itinerary, moving house checklist) are placed on the assumption that UK volume materially exceeds US for the UK term. Verify GB-specific volume before authoring the UK page vs. settling for an on-page section.
3. **Cannibalisation risk pairs** needing GSC/SERP confirmation before building both: trip-itinerary vs travel-itinerary; meal-plan vs meal-planner; daily-schedule vs daily-planner; weekly-schedule/planner/calendar; graduation-invitation vs announcement; sympathy-card vs condolence-message; memorial-service-program vs funeral-program; in-memoriam vs death-announcement. Default to consolidation unless data shows distinct SERPs.
4. **Intent verification** — packing-list (travel vs shipping/business "packing list" — confirm dominant SERP intent and disambiguate); holiday-budget / holiday-itinerary (UK "holiday"=trip vs US "holiday"=Christmas — confirm which intent dominates each locale's SERP).
5. **Builder-fit confirmation** — confirm which "card" documents justify a full TemplateBuilder vs a lighter printable export (sympathy-card, gift-tags, place-cards may be export-only). renderer assignments are provisional.
6. **Business/marketing-plan ownership** — confirm with the business-hub topical-map owner whether these belong here at all; KD ≥20 likely deprioritises regardless.
7. **Quinceañera audience** — confirmed US-Latino dominant, near-zero GB; verify whether to localise (es-US) — out of current audience enum scope (`us`/`uk` only).
8. **`variants` vs full-SEED decision** for each term-split pair — schema supports a `variants` child (lighter, `wordCountFloor` 1200) but a full SEED ranks better for a genuinely distinct keyword. Decide per pair after volume verification.

---

### Sources consulted (terminology/intent sanity-check)
- Funeral order of service vs funeral program (US/UK): funeraltemplates.com, simplicity.co.uk, dignityfunerals.co.uk
- Wedding stationery US/UK terms (order of service vs program; seating chart vs table plan; save the date): blushandgold.co.uk, theknot.com, perfecttableplan.com, eeek.co.uk
- Christening (UK) vs baptism (US) same rite: churchofengland.org, utterlyprintable.com
- Moving house checklist (UK term): hoa.org.uk, which.co.uk
- Packing list / bucket list intent: canva.com, gdoc.io
