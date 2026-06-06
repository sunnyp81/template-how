---
name: Topical Map — Careers & Education hubs (resume-templates + education-templates)
description: >
  Comprehensive topical map for two template.how hubs: resume-templates (resumes & careers)
  and education-templates. Document-level long-tail strategy, KD<=20, head/brand terms stripped.
  Builder-backed pages with Google-Docs copy-to-Drive export as the cross-page differentiator.
  Metrics are ESTIMATES pending real Ahrefs/SERP verification (see Data gaps).
date: 2026-06-06
author: Sunny Patel / Claude (research agent)
status: map only — no SEED pages authored, no build run
---

# Topical map — Careers & Education

This document maps the realistic document universe for two hubs and ranks NEW pages into build
waves. It does NOT author SEED pages. Every page listed is intended to be builder-backed:
crawlable static explanation + live React `TemplateBuilder` + PDF/DOCX export (+ "Open in Google
Docs" / copy-to-Drive where intent demands it) + finished-doc preview + sources + examples +
common mistakes + variants.

## How to read the status column
- **EXISTING** — a SEED `.md` already exists in `src/content/seeds/`. Do not duplicate; extend on-page sections only.
- **SPEC'D (wave 0)** — already fully spec'd in Google Drive `template-how-build-queue-jun6.md`. Excluded from my new waves. Slugs: `letter-of-recommendation`, `reference-letter`, `cover-letter`, `resignation-letter`, `two-weeks-notice`.
- **NEW** — newly mapped here; ranked into waves 1–4 below.

## Strategy guardrails (locked Jun 6 2026)
- Own specific document TYPES / formats / professions, NOT brand/university-locked heads.
- SKIP as primary targets: `resume templates` (KD72), `cv template` head, `resume template free` head — these are Microsoft/Canva/Harvard/Indeed SERPs. Capture that demand via the specific-document pages and on-page sections, not a head page.
- Target KD<=20 specific-document long-tail. Each document = its own SERP.
- Markets: US + UK. renderer enum: `legal-document | resume | invoice | letter | list-plan | static-only`.
- Consolidate "free X" / "X template" / "google docs X" / "word X" onto ONE canonical with on-page platform-intent sections.

---

# HUB 1 — resume-templates (Resumes & careers)

## Hub thesis
The careers hub owns the *specific career document* a job seeker needs at each moment of the hiring
lifecycle — a particular resume format, a profession-specific resume, a scenario-specific cover or
notice letter — rather than competing for the brand-saturated "resume templates" head term. Each
page is a builder that produces a finished, ATS-safe document exportable to PDF/DOCX and (where the
keyword demands it) Google Docs. The hub spans the full arc: build the document → apply → get
references → accept/negotiate the offer → resign cleanly.

## Document table — careers

Volumes are combined-market ESTIMATES (US / GB). KD estimated. Flagged for verification in Data gaps.

| slug | primaryKeyword | est US vol | est GB vol | est KD | renderer | audience | search intent | status | consolidation notes |
|---|---|---|---|---|---|---|---|---|---|
| harvard-resume | harvard resume template | 17000 | 200 | 5 | resume | us,uk | format-specific resume | EXISTING | canonical for "harvard"; extend with HBS/consulting/law on-page |
| ats-friendly-resume | ats friendly resume template | 8400 | 600 | 10 | resume | us,uk | ATS-safe format | EXISTING | absorb "ats resume template", "ats compliant resume" |
| cover-letter-google-docs | cover letter template google docs | 9900 | 350 | 1 | letter | us,uk | platform cover letter | EXISTING | NOTE overlap with wave-0 /cover-letter/; keep as the Google-Docs-intent landing, canonicalise body intent to /cover-letter/ or merge — see Consolidation |
| letter-of-recommendation | letter of recommendation template | 35000 | 500 | 8 | letter | us,uk | persuasive endorsement | SPEC'D (w0) | lives in legal hub, cross-links here; consolidates "recommendation letter" 8k |
| reference-letter | reference letter template | 5600 | 900 | 5 | letter | us,uk | HR/character verification | SPEC'D (w0) | distinct from LOR (shorter, verification not advocacy) |
| cover-letter | free cover letter template | 6000 | 800 | 8 | letter | us,uk | general cover letter | SPEC'D (w0) | consolidates free + google-docs + free-cover-letter variants |
| resignation-letter | resignation letter template | 17000 | 10000 | 5 | letter | us,uk | quit professionally | SPEC'D (w0) | big GB demand; UK ACAS vs US at-will sections |
| two-weeks-notice | two weeks notice template | 4100 | 200 | 1 | letter | us,uk | short notice letter | SPEC'D (w0) | consolidates "two week" + "two weeks"; route UK → resignation-letter |
| google-docs-resume | google docs resume template | 35000 | 600 | 8 | resume | us,uk | platform resume | NEW | ONE canonical; consolidates 4 Ahrefs dupes (google docs resume / resume google docs / google doc resume template / resume template google docs) |
| chronological-resume | chronological resume template | 6500 | 900 | 9 | resume | us,uk | format-specific resume | NEW | reverse-chron format; pairs with combination + functional |
| functional-resume | functional resume template | 4000 | 700 | 11 | resume | us,uk | skills-based format | NEW | cover recruiter-skepticism honestly; gaps/career-change angle |
| combination-resume | combination resume template | 2200 | 300 | 10 | resume | us,uk | hybrid format | NEW | hybrid of chrono+functional; "chrono-functional" variant on-page |
| simple-resume | simple resume template | 9000 | 1600 | 14 | resume | us,uk | minimalist/basic | NEW | absorbs "basic resume template" + "minimalist resume" |
| entry-level-resume | entry level resume template | 5000 | 700 | 12 | resume | us,uk | no/low experience | NEW | absorbs "first job resume", "no experience resume" |
| student-resume | student resume template | 6000 | 1500 | 13 | resume | us,uk | student/grad | NEW | absorbs "college resume", "high school resume"; UK "student CV" section |
| internship-resume | internship resume template | 3500 | 500 | 10 | resume | us,uk | internship | NEW | close sibling of student/entry-level |
| federal-resume | federal resume template | 7000 | 0 | 12 | resume | us | USAJOBS format | NEW | US-only; USAJOBS field requirements (months, hours/wk, supervisor) |
| nursing-resume | nursing resume template | 5500 | 700 | 14 | resume | us,uk | profession resume | NEW | licences/clinicals section; UK "nurse CV" |
| teacher-resume | teacher resume template | 4500 | 900 | 13 | resume | us,uk | profession resume | NEW | US "teacher resume" / UK "teacher CV"; certifications/QTS |
| customer-service-resume | customer service resume template | 3000 | 500 | 12 | resume | us,uk | profession resume | NEW | high-volume entry profession |
| server-resume | server resume template | 2500 | 200 | 9 | resume | us | profession resume | NEW | US "server"; UK route to hospitality CV section |
| project-manager-resume | project manager resume template | 3000 | 600 | 16 | resume | us,uk | profession resume | NEW | PMP cert; verify KD (may exceed 20) |
| software-engineer-resume | software engineer resume template | 3500 | 700 | 17 | resume | us,uk | profession resume | NEW | tech stack section; verify KD |
| cv-template-uk | cv template uk | 8000 | 9000 | 18 | resume | uk | UK CV format | NEW | UK-primary; personal profile, education-bottom, referees; verify KD (head-ish) |
| academic-cv | academic cv template | 2500 | 2200 | 12 | resume | us,uk | long-form academic | NEW | publications/grants/teaching; UK jobs.ac.uk convention; bridges to education hub |
| graduate-cv | graduate cv template | 800 | 3500 | 13 | resume | uk | UK new-grad CV | NEW | UK-primary; sibling of student-resume (US) — see Variant strategy |
| curriculum-vitae | curriculum vitae template | 5000 | 4000 | 17 | resume | us,uk | CV definition/format | NEW | definitional; disambiguate US-CV (academic) vs UK-CV (=resume); verify KD |
| resume-summary | resume summary examples | 4000 | 600 | 14 | resume | us,uk | component/section | NEW | component page; could be guide not builder — see Data gaps |
| linkedin-summary | linkedin summary examples | 6000 | 1500 | 13 | static-only | us,uk | profile copy | NEW | not a printable doc → static-only generator; absorbs "linkedin headline" sibling |
| professional-bio | professional bio template | 4000 | 800 | 12 | letter | us,uk | bio paragraph | NEW | short/long/third-person variants; cross-links to LinkedIn summary |
| reference-list | reference list / references template | 3000 | 700 | 9 | resume | us,uk | resume companion | NEW | "references for resume"; companion doc to harvard-resume (already in its `related`) |
| resignation-email | resignation email template | 2500 | 1500 | 8 | letter | us,uk | email variant | NEW | email-format sibling of resignation-letter; consider on-page section instead — see Consolidation |
| job-offer-acceptance-letter | job offer acceptance letter template | 2500 | 1200 | 7 | letter | us,uk | accept offer | NEW | absorbs "acceptance letter for job" |
| offer-letter | job offer letter template | 6000 | 1500 | 14 | letter | us,uk | employer→candidate | NEW | employer-side; cross-link to legal hub; verify KD |
| counter-offer-letter | counter offer letter template | 1500 | 400 | 9 | letter | us,uk | salary negotiation | NEW | negotiation scenario |
| salary-negotiation-email | salary negotiation email template | 1800 | 500 | 11 | letter | us,uk | negotiation | NEW | sibling of counter-offer; could merge |
| thank-you-letter-after-interview | thank you letter after interview template | 4000 | 700 | 8 | letter | us,uk | post-interview follow-up | NEW | absorbs "interview thank you email", "follow up email after interview" |
| promotion-request-letter | promotion request letter template | 900 | 300 | 7 | letter | us,uk | internal ask | NEW | low vol; bundle candidate |
| raise-request-letter | salary increase request letter template | 1200 | 400 | 9 | letter | us,uk | internal ask | NEW | sibling of promotion-request; consider merge |
| job-application-form | job application form template | 4500 | 2500 | 16 | legal-document | us,uk | employer form | NEW | employer-side blank form; verify KD; UK demand strong |
| character-reference-letter | character reference letter template | 5000 | 3000 | 9 | letter | us,uk | personal reference | NEW | already referenced in wave-0 link plans; court/landlord/job variants; cross-link legal hub |
| cover-letter-no-experience | cover letter with no experience template | 1800 | 400 | 7 | letter | us,uk | entry cover letter | NEW | scenario variant — likely on-page section of /cover-letter/, not own page (see Consolidation) |

### Careers — total document slugs mapped
40 rows: 3 EXISTING (resume-side) + 5 SPEC'D wave-0 + 32 NEW.
(Note: `letter-of-recommendation` and `reference-letter` are filed in the legal hub `node` but
cross-link into careers; counted once here as wave-0.)

---

# HUB 2 — education-templates (Education & study)

## Hub thesis
The education hub owns the specific study artefact or classroom document, grounded in learning
science where the format IS the intervention (Cornell notes, graphic organisers). It serves two
audiences — students organising their own learning and teachers building classroom materials — and
spans the planning artefacts (syllabus, lesson formats) through delivery (note systems, study
schedules) to assessment and admin (rubric, report card, permission slip, certificate). Lesson
plans currently live in the `planning-templates` node but are the teacher anchor for this hub and
cross-link heavily.

## Document table — education

| slug | primaryKeyword | est US vol | est GB vol | est KD | renderer | audience | search intent | status | consolidation notes |
|---|---|---|---|---|---|---|---|---|---|
| cornell-notes | cornell notes template | 11000 | 600 | 10 | static-only | us,uk | note system | EXISTING | extend with avid/digital/google-docs sections |
| lesson-plan | lesson plan template | 18000 | 2500 | 4 | list-plan | us,uk | teacher planning | EXISTING | lives in planning node; anchor cross-link; extend with subject/format variants on-page |
| venn-diagram | venn diagram template | — | — | — | static-only | us,uk | graphic organiser | EXISTING | design/education overlap; already in education node seeds |
| weekly-lesson-plan | weekly lesson plan template | 4000 | 600 | 8 | list-plan | us,uk | format variant | NEW | format sibling of lesson-plan; on-page candidate vs own page — verify split |
| preschool-lesson-plan | preschool lesson plan template | 3500 | 300 | 9 | list-plan | us,uk | age variant | NEW | strong US demand; EYFS section for UK |
| unit-plan | unit plan template | 2500 | 400 | 10 | list-plan | us,uk | longer-arc planning | NEW | multi-lesson; sits above lesson-plan |
| syllabus | syllabus template | 9000 | 600 | 13 | list-plan | us,uk | course outline | NEW | US-primary (college); UK "scheme of work" sibling section |
| course-syllabus | college syllabus template | 2000 | 100 | 11 | list-plan | us | HE course outline | NEW | likely on-page section of /syllabus/ — see Consolidation |
| study-schedule | study schedule template | 5000 | 1500 | 9 | list-plan | us,uk | revision planning | NEW | absorbs "revision timetable" (UK term) + "study plan template" |
| revision-timetable | revision timetable template | 200 | 4000 | 7 | list-plan | uk | UK revision planning | NEW | UK-primary sibling; consolidation candidate with study-schedule (US/UK split) |
| reading-log | reading log template | 6000 | 1500 | 8 | list-plan | us,uk | reading tracker | NEW | strong K-6 + parent demand; printable |
| rubric | rubric template | 7000 | 800 | 12 | list-plan | us,uk | assessment grid | NEW | analytic/holistic + single-point variants on-page |
| grading-rubric | grading rubric template | 2000 | 100 | 10 | list-plan | us | assessment | NEW | on-page section of /rubric/ candidate — see Consolidation |
| permission-slip | permission slip template | 8000 | 700 | 9 | legal-document | us,uk | field-trip consent | NEW | strong US; UK "trip consent form"; needs signature/consent fields |
| field-trip-permission-slip | field trip permission slip template | 3000 | 200 | 8 | legal-document | us | consent | NEW | likely on-page variant of /permission-slip/ |
| report-card | report card template | 7000 | 900 | 11 | static-only | us,uk | grade report | NEW | US-primary; UK "school report"; homeschool sub-intent |
| homeschool-report-card | homeschool report card template | 2500 | 100 | 9 | static-only | us | homeschool | NEW | on-page section of /report-card/ candidate |
| certificate-of-achievement | certificate of achievement template | 9000 | 2500 | 14 | static-only | us,uk | award certificate | NEW | absorbs "award certificate", "certificate of completion"; verify KD |
| certificate-of-completion | certificate of completion template | 6000 | 1500 | 13 | static-only | us,uk | award certificate | NEW | likely consolidate INTO certificate-of-achievement + on-page block |
| flashcards | flashcard template | 5000 | 1200 | 11 | static-only | us,uk | study tool | NEW | printable + cut-line layout; pairs with cornell-notes |
| hall-pass | hall pass template | 3000 | 100 | 6 | static-only | us | classroom admin | NEW | US-primary classroom artefact; low KD quick win |
| behavior-chart | behavior chart template | 6000 | 800 | 10 | list-plan | us,uk | classroom/home mgmt | NEW | US "behavior" / UK "behaviour" spelling variant; reward-chart sibling |
| reward-chart | reward chart template | 1500 | 3000 | 9 | list-plan | us,uk | home/classroom | NEW | UK-primary spelling/term; consolidation candidate with behavior-chart |
| sticker-chart | sticker chart template | 2500 | 600 | 7 | list-plan | us,uk | reward tracker | NEW | sibling of reward-chart; merge candidate |
| iep | iep template | 4000 | 50 | 13 | static-only | us | special education | NEW | US-specific (IDEA); UK equivalent is EHCP — separate section/page |
| ehcp | ehcp template | 30 | 1500 | 10 | static-only | uk | SEN plan | NEW | UK SEND equivalent of IEP; UK-primary |
| essay-outline | essay outline template | 6000 | 1200 | 10 | list-plan | us,uk | writing planner | NEW | absorbs "essay plan" (UK); 5-paragraph + argumentative variants |
| book-report | book report template | 7000 | 600 | 9 | list-plan | us,uk | assignment | NEW | K-8 strong; absorbs "book review template" sibling |
| lab-report | lab report template | 4500 | 1500 | 11 | list-plan | us,uk | science writeup | NEW | structure: aim/method/results/discussion |
| bibliography | bibliography template | 3500 | 900 | 12 | list-plan | us,uk | citations | NEW | MLA/APA/Harvard referencing; absorbs "works cited template" |
| annotated-bibliography | annotated bibliography template | 4000 | 500 | 11 | list-plan | us,uk | citations | NEW | distinct enough from bibliography (annotations); keep separate |
| mla-format | mla format template | 8000 | 200 | 14 | static-only | us | citation style | NEW | US-primary; paper-format generator; verify KD |
| apa-format | apa format template | 9000 | 1000 | 15 | static-only | us,uk | citation style | NEW | title page + references; verify KD (may exceed 20) |
| note-taking | note taking template | 3000 | 1500 | 10 | static-only | us,uk | method hub | NEW | umbrella; routes to cornell/outline/charting methods |
| outline-template | outline template | 4000 | 800 | 12 | list-plan | us,uk | structure tool | NEW | general outline; disambiguate from essay-outline |
| kwl-chart | kwl chart template | 3500 | 300 | 7 | static-only | us,uk | graphic organiser | NEW | named GO; sibling under graphic-organizer (already a seed slug in node) |
| concept-map | concept map template | 3000 | 700 | 11 | static-only | us,uk | graphic organiser | NEW | GO sibling; mind-map adjacency |
| mind-map | mind map template | 9000 | 4000 | 16 | static-only | us,uk | visual organiser | NEW | high vol; design/education overlap; verify KD |
| timeline | timeline template | 12000 | 2500 | 17 | static-only | us,uk | visual organiser | NEW | education + business overlap; verify KD (likely >20, may demote) |
| multiplication-chart | multiplication chart / times table template | 9000 | 5000 | 12 | static-only | us,uk | printable math aid | NEW | US "multiplication chart" / UK "times table"; strong printable demand |

### Education — total document slugs mapped
40 rows: 3 EXISTING (cornell-notes, lesson-plan, venn-diagram) + 37 NEW.

---

# Consolidation rules

General rule: collapse platform-intent and "free" modifiers onto ONE canonical document page, and
serve the modifier intent with a dedicated on-page H2 section + the matching export button. Never
build separate `free-x` / `x-google-docs` / `x-word` pages.

### Cross-cutting modifier collapses
- `free X template`, `X template free`, `printable X`, `X template download` → canonical `/X/`, served by the page existing at all (free is the default) + an explicit "Download free" CTA.
- `X template google docs`, `google docs X template` → canonical `/X/` + on-page "Open in Google Docs" (copy-to-Drive) section. The Google-Docs copy-to-Drive export is the site-wide differentiator; every letter/resume page ships it.
- `X template word`, `word X template` → canonical `/X/` + DOCX export (already standard) + a one-line "Edit in Word" note.
- `X examples`, `sample X` → on-page Examples section (already a required block), not a separate page.

### Careers-specific
- **google-docs-resume** = ONE canonical absorbing all 4 Ahrefs dupes (`google docs resume template`, `resume template google docs`, `google doc resume template`, `resume google docs`). This is the platform landing for resume intent — body links to `harvard-resume` / `ats-friendly-resume` / `chronological-resume` for format choice.
- **cover-letter (wave 0)** is the canonical cover-letter page. **cover-letter-google-docs (EXISTING)** overlaps directly. RESOLVE: keep `cover-letter-google-docs` as the Google-Docs-intent doorway (it already ranks-targets KD1 `cover letter template google docs`) and make `/cover-letter/` the broad canonical; cross-link bidirectionally and 301/canonical only if cannibalisation appears in GSC. Flag for the build owner — do NOT silently merge an EXISTING page.
- **cover-letter-no-experience** → on-page scenario section of `/cover-letter/` (entry-level variant), NOT a separate page, unless verification shows ≥1.5k discrete volume.
- **resignation-email** → on-page "Email version" section of `/resignation-letter/` AND `/two-weeks-notice/` (both already spec a delivery-method letter/email toggle in the builder). Only spin out if combined email-intent volume justifies it.
- **salary-negotiation-email** → consolidate with `/counter-offer-letter/` (one page, two formats) unless verified discrete demand.
- **raise-request-letter** → consolidate with `/promotion-request-letter/` into one `/raise-request-letter/` (or `/ask-for-raise/`) with promotion as an on-page variant; both are low-vol.
- **curriculum-vitae** is a definitional/disambiguation page; it should route US visitors to academic-cv (US CV = academic) and resume formats, and UK visitors to cv-template-uk. Avoid cannibalising cv-template-uk.

### Education-specific
- **course-syllabus** → on-page HE section of `/syllabus/`.
- **grading-rubric** → on-page section of `/rubric/` (alongside analytic/holistic/single-point).
- **field-trip-permission-slip** → on-page variant of `/permission-slip/`.
- **homeschool-report-card** → on-page section of `/report-card/`.
- **certificate-of-completion** → consolidate INTO `/certificate-of-achievement/` (one builder, selectable certificate type: achievement / completion / participation / award).
- **revision-timetable (UK)** vs **study-schedule (US)** → see Variant strategy; likely one canonical with a strong UK section rather than two pages, given shared builder.
- **reward-chart / sticker-chart / behavior-chart** → one canonical `/behavior-chart/` (US) is risky given UK spelling + "reward chart" being the dominant UK term. Recommend `/reward-chart/` as canonical (covers UK + US home use) with behaviour-chart and sticker-chart as on-page variants, given the shared grid builder. Verify which term wins combined volume.
- **mla-format / apa-format** are citation-style PAPER format generators (title page, headers, spacing), distinct from `/bibliography/` (reference list only). Keep separate; cross-link.

---

# Variant strategy (US vs UK)

The resume/CV divide and spelling/section norms drive most variant decisions. Rule of thumb:
**one builder + strong on-page US/UK sections** when the document body is shared; **distinct pages**
only when the keyword, format, and audience genuinely diverge (different term, different structure,
different market searching).

### Distinct pages justified (US-vs-UK)
- **resume (US) vs CV (UK):** different head terms, different reader expectations. We deliberately avoid the heads, but the divide cascades: `student-resume` (US) and `graduate-cv` (UK) are distinct pages — different keyword, US education-first vs UK personal-profile-first, US "GPA" vs UK "2:1", no photo (both), referees-at-end (UK) vs available-on-request (US). Cross-link as siblings.
- **cv-template-uk** is a UK-primary distinct page (personal profile, education-bottom once experienced, DD/MM/YYYY, referees). It is the UK counterpart to the US resume format pages.
- **federal-resume** is US-only (no UK audience tag) — USAJOBS has no UK analogue.
- **iep (US, IDEA) vs ehcp (UK, SEND)** — legally distinct frameworks, different terms, different audiences. Distinct pages.
- **mla-format / apa-format (US-led)** vs UK **Harvard referencing** — handle Harvard referencing as an on-page section of `/bibliography/` (UK universities mostly use Harvard/footnote styles), keep MLA/APA as US-led distinct pages.

### Strong on-page US/UK sections (one page)
- All profession resume pages (nursing/teacher/etc.): one page, US "resume + license" / UK "CV + QTS/NMC registration" sections. UK readers search "nurse CV" — add that phrase in an H2 + meta to catch it without a second page.
- **resignation-letter** (wave 0): one page, UK ACAS/contractual-notice section vs US at-will courtesy. (Already spec'd this way.)
- **reference-letter** (wave 0): UK "fair & accurate" legal-accuracy section vs US. (Already spec'd.)
- **behaviour vs behavior, organiser vs organizer, programme vs program:** handle as spelling alternates within one page (h2 + body uses one primary spelling per audience context). Do not build spelling-duplicate pages.
- **study-schedule (US) / revision-timetable (UK):** lean toward one canonical builder with a prominent "Revision timetable (UK)" section, because the artefact and builder are identical; only split if the UK term's discrete volume (est 4k GB) proves it deserves its own ranking page — likely it does, so this is the top "verify then maybe split" candidate.
- **report card (US) / school report (UK):** one page, UK terminology section.
- **multiplication chart (US) / times table (UK):** one page, both terms in H2s.

---

# Internal linking plan

Contract reminders (from `config.ts`): every SEED needs `related` ≥4 (same-hub siblings) and
`crossCluster` ≥1. Every page needs ≥3 incoming internal links (`linkGraph.ts` validator). The two
node hubs and the wave-0 spec pages provide a strong existing link substrate.

### Link substrate already present
- `harvard-resume.related` already lists `cover-letter`, `reference-list`, `resignation-letter`, `letter-of-recommendation`, `cover-letter-google-docs`, `ats-friendly-resume` — so reference-list and the wave-0 pages already have ≥1 incoming each from harvard-resume.
- `ats-friendly-resume.related` lists `harvard-resume`, `cover-letter-google-docs`, `linkedin-summary`, `resignation-letter` — so `linkedin-summary` already has 1 incoming.
- `cover-letter-google-docs.related` lists `harvard-resume`, `ats-resume`, `google-docs-resume`, `two-weeks-notice`, `ats-friendly-resume` — so `google-docs-resume` already has 1 incoming. (Note: it references `ats-resume` and `ats-resume` as slugs not yet built — these are dangling and should be repointed to `ats-friendly-resume`, see Data gaps.)
- Node hubs (`resume-templates`, `education-templates`) list seeds in frontmatter that surface as hub links — any NEW slug added to a node's `seeds` array gains a hub incoming link.

### NEW page link plans (4+ related same-hub + 1+ crossCluster)

Careers (each gets a hub link + the listed siblings → ≥3 incoming guaranteed once siblings ship):

| new slug | related (same hub) | crossCluster |
|---|---|---|
| google-docs-resume | harvard-resume, ats-friendly-resume, chronological-resume, simple-resume | cover-letter-google-docs |
| chronological-resume | harvard-resume, functional-resume, combination-resume, ats-friendly-resume | letter-of-recommendation |
| functional-resume | chronological-resume, combination-resume, entry-level-resume, simple-resume | cover-letter |
| combination-resume | chronological-resume, functional-resume, harvard-resume, ats-friendly-resume | cover-letter |
| simple-resume | ats-friendly-resume, chronological-resume, google-docs-resume, entry-level-resume | cornell-notes |
| entry-level-resume | student-resume, internship-resume, simple-resume, functional-resume | cover-letter-no-experience→cover-letter |
| student-resume | graduate-cv, internship-resume, entry-level-resume, simple-resume | letter-of-recommendation |
| internship-resume | student-resume, entry-level-resume, cover-letter, reference-letter | lesson-plan |
| federal-resume | ats-friendly-resume, chronological-resume, resume-summary, simple-resume | cover-letter |
| nursing-resume | teacher-resume, ats-friendly-resume, chronological-resume, reference-list | reference-letter |
| teacher-resume | nursing-resume, cv-template-uk, ats-friendly-resume, cover-letter | lesson-plan |
| customer-service-resume | server-resume, entry-level-resume, simple-resume, cover-letter | reference-letter |
| server-resume | customer-service-resume, entry-level-resume, simple-resume, two-weeks-notice | reference-letter |
| project-manager-resume | software-engineer-resume, ats-friendly-resume, chronological-resume, resume-summary | one-pager |
| software-engineer-resume | project-manager-resume, ats-friendly-resume, google-docs-resume, linkedin-summary | one-pager |
| cv-template-uk | graduate-cv, academic-cv, curriculum-vitae, teacher-resume | reference-letter |
| academic-cv | cv-template-uk, curriculum-vitae, graduate-cv, reference-list | letter-of-recommendation |
| graduate-cv | cv-template-uk, student-resume, academic-cv, cover-letter | letter-of-recommendation |
| curriculum-vitae | cv-template-uk, academic-cv, harvard-resume, graduate-cv | letter-of-recommendation |
| resume-summary | harvard-resume, ats-friendly-resume, professional-bio, linkedin-summary | one-pager |
| linkedin-summary | professional-bio, resume-summary, ats-friendly-resume, harvard-resume | one-pager |
| professional-bio | linkedin-summary, resume-summary, harvard-resume, cover-letter | one-pager |
| reference-list | harvard-resume, ats-friendly-resume, reference-letter, character-reference-letter | letter-of-recommendation |
| job-offer-acceptance-letter | offer-letter, counter-offer-letter, resignation-letter, thank-you-letter-after-interview | letter-of-recommendation |
| offer-letter | job-offer-acceptance-letter, counter-offer-letter, reference-letter, resignation-letter | nda |
| counter-offer-letter | job-offer-acceptance-letter, offer-letter, salary-negotiation-email→merge, thank-you-letter-after-interview | nda |
| thank-you-letter-after-interview | cover-letter, job-offer-acceptance-letter, follow-up→merge, professional-bio | letter-of-recommendation |
| promotion-request-letter | raise-request-letter, professional-bio, resume-summary, thank-you-letter-after-interview | meeting-minutes |
| raise-request-letter | promotion-request-letter, counter-offer-letter, professional-bio, cover-letter | meeting-minutes |
| job-application-form | offer-letter, cover-letter, reference-letter, character-reference-letter | nda |
| character-reference-letter | reference-letter, letter-of-recommendation, reference-list, job-application-form | lease-agreement |

Education (each gets a hub link + the listed siblings):

| new slug | related (same hub) | crossCluster |
|---|---|---|
| weekly-lesson-plan | lesson-plan, unit-plan, preschool-lesson-plan, syllabus | weekly-schedule |
| preschool-lesson-plan | weekly-lesson-plan, lesson-plan, unit-plan, behavior-chart | all-about-me |
| unit-plan | lesson-plan, weekly-lesson-plan, syllabus, rubric | meeting-minutes |
| syllabus | unit-plan, lesson-plan, rubric, study-schedule | meeting-minutes |
| study-schedule | revision-timetable→section, cornell-notes, flashcards, reading-log | weekly-schedule |
| revision-timetable | study-schedule, cornell-notes, flashcards, essay-outline | weekly-schedule |
| reading-log | study-schedule, book-report, reading→flashcards, behavior-chart | to-do-list |
| rubric | unit-plan, syllabus, lesson-plan, report-card | meeting-minutes |
| permission-slip | report-card, field-trip→section, behavior-chart, certificate-of-achievement | lease-agreement |
| report-card | rubric, certificate-of-achievement, permission-slip, reading-log | balance-sheet |
| certificate-of-achievement | report-card, rubric, permission-slip, hall-pass | wanted-poster |
| flashcards | cornell-notes, study-schedule, note-taking, mind-map | to-do-list |
| hall-pass | permission-slip, behavior-chart, certificate-of-achievement, reward-chart | wanted-poster |
| behavior-chart | reward-chart, sticker-chart→section, reading-log, hall-pass | weekly-schedule |
| reward-chart | behavior-chart, sticker-chart, reading-log, certificate-of-achievement | grocery-list |
| iep | ehcp, rubric, report-card, behavior-chart | letter-of-recommendation |
| ehcp | iep, rubric, report-card, behavior-chart | letter-of-recommendation |
| essay-outline | outline-template, bibliography, lab-report, cornell-notes | one-pager |
| book-report | reading-log, essay-outline, rubric, bibliography | venn-diagram |
| lab-report | essay-outline, bibliography, rubric, cornell-notes | one-pager |
| bibliography | annotated-bibliography, mla-format, apa-format, essay-outline | one-pager |
| annotated-bibliography | bibliography, mla-format, apa-format, lab-report | one-pager |
| mla-format | apa-format, bibliography, essay-outline, annotated-bibliography | one-pager |
| apa-format | mla-format, bibliography, lab-report, annotated-bibliography | one-pager |
| note-taking | cornell-notes, flashcards, outline-template, mind-map | meeting-minutes |
| outline-template | essay-outline, note-taking, mind-map, cornell-notes | one-pager |
| kwl-chart | venn-diagram, concept-map, mind-map, graphic-organizer | tier-list |
| concept-map | mind-map, kwl-chart, venn-diagram, note-taking | tier-list |
| mind-map | concept-map, kwl-chart, note-taking, flashcards | vision-board |
| timeline | mind-map, concept-map, venn-diagram, family-tree | family-tree |
| multiplication-chart | flashcards, reading-log, study-schedule, report-card | grocery-list |

Validation note: every NEW slug above has ≥3 prospective incoming links (1 from its node hub via
the `seeds` array + ≥2 from sibling `related` arrays once the wave ships). To stay above the
validator threshold *during* a partial wave, each wave's pages must mutually link AND be added to
the relevant node `seeds` array in the same PR. Dangling targets to clean up: `ats-resume`,
`ats-resume` referenced in existing frontmatter → repoint to `ats-friendly-resume`;
`google-docs-resume`, `linkedin-summary`, `reference-list`, `cover-letter` are referenced by
existing pages but not yet built (currently dangling — prioritise in wave 1).

---

# Build priority — waves

Ranking heuristic: combined volume × low KD × builder-fit (a clean form→document mapping) ×
"unblocks existing dangling links". Wave 0 = the 5 already-spec'd career pages (excluded from my
ranking, listed for completeness).

### Wave 0 (already spec'd — build first per Drive queue)
`letter-of-recommendation`, `reference-letter`, `cover-letter`, `resignation-letter`,
`two-weeks-notice`.

### Wave 1 — highest priority NEW (big volume, KD≤10, strong builder-fit, unblocks dangling links)
1. **google-docs-resume** (35k/600, KD8) — huge volume, consolidates 4 dupes, already referenced (dangling) by cover-letter-google-docs. Resume renderer exists.
2. **chronological-resume** (6.5k/900, KD9) — core format, anchors the format trio, resume renderer.
3. **simple-resume** (9k/1.6k, KD14→verify) — high volume, trivial builder-fit. (If KD verifies >14 keep in w1 anyway on volume.)
4. **character-reference-letter** (5k/3k, KD9) — already named in wave-0 link plans (LOR/reference-letter link to it); letter renderer; strong UK demand.
5. **reading-log** (6k/1.5k, KD8) — top education quick win, list-plan renderer, parent+teacher demand.
6. **rubric** (7k/800, KD12) — teacher anchor, list-plan renderer, consolidates grading-rubric.
7. **permission-slip** (8k/700, KD9) — high volume, legal-document renderer (consent/signature), consolidates field-trip variant.
8. **certificate-of-achievement** (9k/2.5k, KD14→verify) — high volume, consolidates completion/award, static-only.
9. **thank-you-letter-after-interview** (4k/700, KD8) — clean letter builder, high commercial intent.
10. **linkedin-summary** (6k/1.5k, KD13) — already referenced (dangling) by ats-friendly-resume; static-only generator.

### Wave 2 — strong volume, KD≤14, profession & format breadth
chronological-resume's siblings: **functional-resume**, **combination-resume**;
**entry-level-resume**, **student-resume**, **graduate-cv**, **cv-template-uk**;
**federal-resume**; **nursing-resume**, **teacher-resume**;
**study-schedule** (+ revision-timetable decision), **syllabus**, **essay-outline**,
**book-report**, **flashcards**, **behavior-chart / reward-chart** (resolve canonical first),
**hall-pass** (KD6 quick win), **multiplication-chart**.

### Wave 3 — mid volume / mid KD / niche-but-clear-intent
**internship-resume**, **customer-service-resume**, **server-resume**,
**job-offer-acceptance-letter**, **offer-letter**, **counter-offer-letter**,
**resume-summary**, **professional-bio**, **reference-list**, **academic-cv**,
**curriculum-vitae**, **job-application-form**;
**unit-plan**, **weekly-lesson-plan**, **preschool-lesson-plan**, **report-card**,
**lab-report**, **bibliography**, **annotated-bibliography**, **kwl-chart**,
**concept-map**, **note-taking**, **outline-template**.

### Wave 4 — low volume bundles, high-KD-to-verify, or US/UK-niche
**project-manager-resume**, **software-engineer-resume** (KD likely >16),
**promotion-request-letter + raise-request-letter** (merge), **salary-negotiation-email** (merge),
**iep**, **ehcp**, **mla-format**, **apa-format** (KD likely 14–15+),
**mind-map**, **timeline** (KD likely >16 — may demote/drop), **multiplication-chart** if not in w2.

---

# Data gaps — flag for real Ahrefs/SERP verification

All volumes/KD above are ESTIMATES (no Ahrefs access this session). Verify before committing build
order. Specific flags:

1. **All metrics are estimated** except the wave-0 five and the three EXISTING pages (whose numbers
   came from prior Ahrefs pulls baked into frontmatter). Pull real US+GB volume + KD for every NEW slug.
2. **Likely-above-KD20 (verify, may demote/drop):** `cv-template-uk` (head-ish), `curriculum-vitae`,
   `project-manager-resume`, `software-engineer-resume`, `offer-letter`, `job-application-form`,
   `apa-format`, `mla-format`, `mind-map`, `timeline`, `certificate-of-achievement`,
   `certificate-of-completion`. If KD>20 and brand/site-locked SERP, demote to on-page sections.
3. **Consolidation decisions needing volume to finalise:**
   - study-schedule (US) vs revision-timetable (UK): one page + UK section, or two pages? (UK term est 4k — likely split.)
   - behavior-chart vs reward-chart vs sticker-chart: which slug is canonical? (UK "reward chart" may win combined volume.)
   - cover-letter (wave 0) vs cover-letter-google-docs (EXISTING): confirm no cannibalisation in GSC before any merge — do NOT touch the EXISTING page without owner sign-off.
   - certificate-of-completion → into certificate-of-achievement: confirm one builder serves both.
4. **Renderer fit to confirm in builder schema:**
   - `permission-slip` / `job-application-form` use `legal-document` (consent + signature blocks) — confirm the legal-document renderer supports the field set, else fall back to `static-only`.
   - `linkedin-summary`, `professional-bio`, `resume-summary` produce copy not a printable doc → `static-only` (copy-to-clipboard) is the right renderer; `resume-summary` may be better as a `guides` entry than a SEED+builder — decide.
   - `mla-format` / `apa-format` are paper-format generators — confirm a renderer produces title-page + running-head + spacing correctly, or treat as static-only printable.
5. **Dangling slugs in EXISTING frontmatter to repoint/build:** `ats-resume`, `ats-resume` (→ `ats-friendly-resume`); `google-docs-resume`, `linkedin-summary`, `reference-list`, `cover-letter` are referenced but unbuilt (resolve by building in wave 1, or temporarily repoint to avoid validator orphan/under-link failures).
6. **Node `node` field placement:** `letter-of-recommendation`/`reference-letter` carry `node: legal-document-templates` but belong topically to careers — confirm the cross-hub linking (not a node move) is the intended pattern (it is, per existing harvard-resume crossCluster usage). `lesson-plan` carries `node: planning-templates`; education hub links to it cross-cluster — keep as-is.
7. **Profession-resume long-tail depth:** mapped a representative set (nursing/teacher/customer-service/server/PM/SWE). A full profession sweep (accountant, sales, marketing, mechanic, electrician, warehouse, retail, administrative-assistant, graphic-designer, data-analyst) likely yields 15–30 more KD≤15 pages — verify volume per profession before mass-building; treat as a templated wave-5 "profession resume" factory once the format pages prove the path.
