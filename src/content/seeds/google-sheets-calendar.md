---
node: productivity-templates
title: 'Google Sheets Calendar Template — Free & Editable (2026)'
h1: 'Google Sheets Calendar Template'
definitionalLede: 'A Google Sheets calendar template is a month or year grid built inside a Google Sheets spreadsheet, so you can edit dates and events in the cells, colour-code with conditional formatting, share it with collaborators, and print it — all without leaving your browser.'
primaryKeyword: 'google sheets calendar template'
searchVolume: 7300
difficulty: 0
renderer: list-plan
related:
  - daily-planner
  - habit-tracker
  - checklist
  - meeting-agenda
  - weekly-schedule
crossCluster:
  - itinerary
  - capcut
audience: [us, uk]
wordCountFloor: 1800
sources:
  - title: 'Google — Google Sheets Help'
    url: 'https://support.google.com/docs/topic/9054603'
    accessed: '2026-06-06'
  - title: 'Google — Use conditional formatting rules in Google Sheets'
    url: 'https://support.google.com/docs/answer/78413'
    accessed: '2026-06-06'
updated: '2026-06-06'
howTo:
  name: 'How to make a calendar in Google Sheets'
  steps:
    - name: 'Start from a template or a blank sheet'
      text: 'Open Google Sheets, click Template gallery, and look under the Personal or Work sections for the built-in "Annual calendar" or "Schedule" templates — Google ships several. Or start a blank sheet and build the grid yourself: seven columns for the days of the week, with rows beneath for the weeks of the month.'
    - name: 'Lay out the month grid'
      text: 'Put the day names (Sun–Sat or Mon–Sun depending on your week start) across the top row. Below, create blocks of cells for each week — typically a tall row per week so there is room to type events into each day''s cell. Merge cells or use a header row for the month name and year.'
    - name: 'Use a date formula so the dates fill themselves'
      text: 'Rather than typing every date by hand, put the first date in the top-left day cell and use a formula (for example =previous_cell+1) across and down so the calendar fills automatically. This means next month you change one start date and the whole grid updates — the single biggest advantage of a spreadsheet calendar over a static printout.'
    - name: 'Colour-code with conditional formatting'
      text: 'Use Format → Conditional formatting to colour cells by rule — for example, highlight weekends, flag deadlines in red, or shade a category of event a consistent colour. This is what a spreadsheet calendar does that a paper one cannot: the formatting updates automatically as you edit, so your colour-coding never goes stale.'
    - name: 'Share, edit, and print'
      text: 'Click Share to give specific people view or edit access, or set a link. Everyone edits the same live calendar — no emailing versions back and forth. To print, use File → Print, set the layout to Landscape, fit to one page wide, and adjust margins so a clean month grid prints on a single sheet.'
faq:
  - q: 'Does Google Sheets have a built-in calendar template?'
    a: 'Yes. Open Google Sheets, click the Template gallery at the top, and you will find calendar and schedule templates under the Personal and Work sections — including an Annual calendar. They are free and editable. If the built-in options do not fit your needs, you can build your own month grid from a blank sheet, which gives you full control over layout, formulas, and colour-coding.'
  - q: 'Why use Google Sheets for a calendar instead of Google Calendar?'
    a: 'Google Calendar is an event-and-reminder app — it is best for scheduling appointments with times, notifications, and invites. A Google Sheets calendar is a flat grid you can customise freely: colour-code by project, add columns of notes, build a content calendar or editorial schedule, total things up with formulas, and print a clean month grid. Use Calendar for time-based reminders; use Sheets when you want a customisable, printable, formula-driven planning grid that you control completely.'
  - q: 'How do I make the dates fill in automatically?'
    a: 'Put your first date in the top-left day cell, then use a formula in the next cell that adds one day — for example, if the first date is in B3, put =B3+1 in C3 and drag it across the week, then continue the pattern down the weeks. Format the cells as dates (Format → Number → Date) and you can show just the day number. The payoff: to roll the calendar to a new month or year, you change one start date and the entire grid recalculates.'
  - q: 'How do I colour-code events in a Google Sheets calendar?'
    a: 'Use conditional formatting (Format → Conditional formatting). Set rules like "if the cell contains the word DEADLINE, fill it red" or "if the date is a Saturday or Sunday, shade it grey". You can also colour cells manually with the fill-colour button for one-off highlights. Conditional formatting is the better approach for anything recurring, because the colours update automatically as you edit — your scheme never goes out of date.'
  - q: 'Can I share a Google Sheets calendar with my team?'
    a: 'Yes — sharing is one of the main reasons to use Sheets. Click Share, add specific people with view or edit permission, or generate a shareable link. Everyone works on the same live calendar in real time, so there is no emailing versions around or reconciling conflicting copies. You can also leave comments on specific cells (right-click → Comment) to discuss a particular date or event without altering the calendar itself.'
  - q: 'How do I print a calendar from Google Sheets?'
    a: 'Go to File → Print. Set the orientation to Landscape (a month grid is wider than it is tall), choose "Fit to width" so the whole week fits on one page, and adjust margins and scale until a clean month prints on a single sheet. Use Print → Set custom page breaks if you want each month on its own page in a multi-month workbook. Hide gridlines and any helper columns before printing for a tidy result.'
  - q: 'Can I make a content calendar or editorial calendar in Google Sheets?'
    a: 'Yes — this is one of the most popular uses. Build a month grid and type planned posts into each day''s cell, colour-coded by platform or content type with conditional formatting. Or use a list-style layout: one row per piece of content with columns for date, platform, title, status, and owner, which is easier to sort and filter than a grid. Many social and marketing teams run their entire publishing schedule in a shared Google Sheet for exactly this flexibility.'
  - q: 'What is the difference between a Google Sheets calendar and a printable PDF calendar?'
    a: 'A printable PDF is fixed — you print it and write on paper. A Google Sheets calendar is live: dates fill by formula, colours update by rule, multiple people can edit it at once, and you can still print it when you want a paper copy. The trade-off is that Sheets requires a browser and a Google account, while a PDF works anywhere and needs nothing. Many people use both: the Sheet as the editable master, printed to paper for the fridge or desk.'
  - q: 'Do I need a Google account to use a Google Sheets calendar?'
    a: 'To create or edit one, yes — you need a free Google account, which gives you Google Sheets at no cost. To merely view a calendar someone has shared with a public link, you may not need to sign in, depending on how it was shared. If you do not want a Google account, you can download a Google Sheets calendar as an Excel (.xlsx) file and open it in Microsoft Excel or LibreOffice Calc instead.'
  - q: 'Can I open a Google Sheets calendar in Excel?'
    a: 'Yes. In Google Sheets, go to File → Download → Microsoft Excel (.xlsx), and the calendar — including formulas and most formatting — downloads as an Excel file you can open in Excel or LibreOffice Calc. Some advanced Google-specific functions may not translate perfectly, but a standard calendar grid with date formulas and conditional formatting converts cleanly. This is useful if your workplace uses Excel rather than Sheets.'
  - q: 'How do I highlight weekends or holidays automatically?'
    a: 'For weekends, use a conditional-formatting custom formula like =WEEKDAY(cell,2)>5 to shade Saturdays and Sundays. For holidays, keep a small list of holiday dates in a hidden column and use a conditional-formatting rule (or a MATCH/COUNTIF formula) that highlights any calendar cell whose date appears in that list. Because these are rules, they apply automatically every time the calendar rolls to a new month — no manual re-highlighting.'
  - q: 'Can I export this template as an editable spreadsheet?'
    a: 'Honest answer: the builder on template.how currently exports PDF, DOCX, and print — it does not yet produce a ready-made .xlsx or a copyable Google Sheet link. Since the whole point of this page is an editable spreadsheet, that export is a known gap we are working on. In the meantime, this page walks you through building the calendar in Google Sheets yourself (or using Google''s built-in template gallery), which is the genuine deliverable; the printable PDF here serves the paper sub-use while the live-Sheet export catches up.'
builderSchema:
  slug: google-sheets-calendar
  title: 'Calendar Planner'
  renderer: list-plan
  sections:
    - id: calendar_info
      heading: 'Calendar details'
      fields:
        - { id: cal_title, label: 'Calendar title (e.g. Content Calendar, Family Schedule)', type: text, required: true }
        - { id: month_year, label: 'Month and year', type: text, required: false }
        - { id: week_start, label: 'Week starts on', type: select, required: false, options: [ { value: monday, label: 'Monday' }, { value: sunday, label: 'Sunday' } ] }
        - { id: owner, label: 'Owner / team', type: text, required: false }
    - id: key_dates
      heading: 'Key dates & events'
      fields:
        - { id: date_1, label: 'Date 1', type: date, required: false }
        - { id: event_1, label: 'Event / note 1', type: text, required: false }
        - { id: date_2, label: 'Date 2', type: date, required: false }
        - { id: event_2, label: 'Event / note 2', type: text, required: false }
        - { id: date_3, label: 'Date 3', type: date, required: false }
        - { id: event_3, label: 'Event / note 3', type: text, required: false }
        - { id: date_4, label: 'Date 4', type: date, required: false }
        - { id: event_4, label: 'Event / note 4', type: text, required: false }
        - { id: date_5, label: 'Date 5', type: date, required: false }
        - { id: event_5, label: 'Event / note 5', type: text, required: false }
        - { id: date_6, label: 'Date 6', type: date, required: false }
        - { id: event_6, label: 'Event / note 6', type: text, required: false }
        - { id: date_7, label: 'Date 7', type: date, required: false }
        - { id: event_7, label: 'Event / note 7', type: text, required: false }
        - { id: date_8, label: 'Date 8', type: date, required: false }
        - { id: event_8, label: 'Event / note 8', type: text, required: false }
    - id: color_key
      heading: 'Colour key (for conditional formatting)'
      fields:
        - { id: key_1, label: 'Category 1 (e.g. Deadlines = red)', type: text, required: false }
        - { id: key_2, label: 'Category 2 (e.g. Meetings = blue)', type: text, required: false }
        - { id: key_3, label: 'Category 3 (e.g. Personal = green)', type: text, required: false }
        - { id: notes, label: 'Notes', type: textarea, required: false }
---

## What a Google Sheets calendar template is

A Google Sheets calendar is a month or year grid built inside a spreadsheet rather than a calendar app. You type events straight into the day cells, fill the dates with a formula so they update themselves, colour-code with conditional-formatting rules, share the live sheet with anyone, and print a clean grid when you want paper. It sits in a useful middle ground between Google Calendar (great for timed reminders, rigid as a planning surface) and a static printable PDF (works anywhere, edits nowhere).

The reason this term has near-zero keyword difficulty and real search demand is that the intent is specific and underserved: people do not want *a* calendar, they want one **inside Google Sheets**, because they need a customisable, shareable, formula-driven grid they fully control. This page shows you how to build exactly that — and is honest about the export situation, since the genuine deliverable is a live spreadsheet.

## Why a spreadsheet calendar instead of Google Calendar

Both are Google products; they solve different problems.

**Google Calendar** is an event engine: appointments with start and end times, notifications, invites, recurring events, and time-zone handling. If your need is "remind me of a meeting at 2pm with three guests", Calendar wins.

**A Google Sheets calendar** is a planning surface: a flat, fully customisable grid where you can

- colour-code by project, platform, or person with rules that update automatically;
- add extra columns of notes, status, or owner;
- build a content calendar, editorial schedule, shift roster, or family planner;
- total or count things with formulas (how many posts this month? how many shifts each person?);
- print a clean month grid for the wall or desk.

The mental model: **Calendar for time-based reminders, Sheets for a customisable, printable, formula-driven planning grid.** Many people run both — Calendar for appointments, a Sheet for the bigger planning picture. The same grid logic adapts into other planning tools too: a [habit tracker](/habit-tracker/) with one column per habit, or a meeting schedule you circulate before each [meeting agenda](/meeting-agenda/).

## Building it from scratch

You can start from Google's built-in templates (Template gallery → "Annual calendar" or "Schedule"), but building your own takes minutes and teaches you the moves that make a spreadsheet calendar powerful.

**1. The grid.** Day names across the top row (choose Monday-start for UK/business or Sunday-start for US-personal). Below, a block of cells per week — a tall row per week gives room to type events into each day.

**2. Self-filling dates.** This is the key trick. Put your first date in the top-left day cell. In the next cell, enter a formula that adds a day — e.g. `=B3+1` — and drag it across the week, then continue down the weeks. Format the cells as dates and show just the day number. Now the entire calendar is driven by one start date: change it, and every cell recalculates. Rolling to next month is a one-cell edit, not a full rebuild.

**3. Headers and structure.** Merge cells across the top for the month name and year. Add a thin "events" area under each day if you want separate space for notes versus the date number.

## Colour-coding with conditional formatting

Conditional formatting is what a spreadsheet calendar does that paper never can: colours that maintain themselves.

Go to **Format → Conditional formatting** and add rules such as:

- **Weekends:** custom formula `=WEEKDAY(A1,2)>5` → shade grey.
- **Deadlines:** "Text contains DEADLINE" → fill red.
- **Categories:** a keyword per category, each its own colour (meetings blue, personal green, travel orange).
- **Holidays:** keep holiday dates in a hidden column and highlight any calendar cell whose date matches.

Because these are rules rather than manual fills, they reapply every time you edit or roll the calendar forward. Your colour scheme never goes stale — the most common failure of a hand-coloured paper planner.

## Sharing and collaboration

Click **Share**, add people with view or edit access, or set a link. Everyone works on the same live calendar in real time — no emailing versions, no reconciling conflicting copies. Right-click a cell → **Comment** to discuss a specific date without changing the grid. For a team content calendar or a family schedule, this single-source-of-truth behaviour is the whole point: there is exactly one calendar, and it is always current for everyone.

## Printing a clean month

When you want paper: **File → Print**, set **Landscape** (a week is wider than it is tall), choose **Fit to width** so the whole row fits on one page, and tune margins and scale until a clean month lands on a single sheet. Hide gridlines and helper columns first. In a multi-month workbook, use custom page breaks to put each month on its own page. The result is a printable calendar that came from a live, editable master — the best of both worlds.

<aside class="tip">
**Expert tip:** Build the calendar so a <strong>single start-date cell drives the whole grid</strong> via date formulas, and you turn a one-month template into an infinite one. Put the month's first date in one clearly labelled cell, reference it from the top-left day cell, and chain every other date off that with +1 formulas. To create next month — or the same calendar for next year — you change that one cell and the entire grid, weekday alignment included, recalculates correctly. People who hard-type every date rebuild the calendar twelve times a year; people who formula-drive it from one cell never rebuild it again. This is the single highest-leverage habit in spreadsheet calendars.
</aside>

## Common mistakes

**Mistake 1: Typing every date by hand.** It is slow and it breaks the moment you need next month. Drive the dates from one start cell with +1 formulas.

**Mistake 2: Manually colouring cells one by one.** Hand-colouring goes stale as you edit. Use conditional-formatting rules so colours maintain themselves.

**Mistake 3: Using a grid when a list would sort better.** For a content calendar you need to filter and sort, a one-row-per-item list (date, platform, title, status, owner) beats a grid. Match the layout to whether you need to sort.

**Mistake 4: Forgetting to set the week start.** A Sunday-start grid confuses a UK team that thinks in Monday-start weeks (and vice versa). Decide and label it.

**Mistake 5: Printing in portrait.** A month grid is landscape. Portrait crops the week. Set Landscape and Fit-to-width before printing.

**Mistake 6: Not sharing with the right permissions.** Giving edit access to people who should only view leads to accidental changes. Use view-only for an audience and edit for collaborators.

## A note on exporting from this site

The straight answer: this page's builder currently exports **PDF, DOCX, and print** — it does **not** yet hand you a ready-made `.xlsx` file or a copyable Google Sheet link. Because the genuine intent behind "google sheets calendar template" is an *editable spreadsheet*, that live-Sheet / XLSX export is a known gap we are working on.

What this page gives you in the meantime is the real method: build the calendar in Google Sheets yourself using the steps above, or start from Google's own Template gallery, which takes only a few minutes and produces exactly the editable, shareable calendar you came for. The builder's PDF/print output serves the paper sub-use — a printable month grid — while the spreadsheet export catches up. (If you build your own and then download it via File → Download → Excel, you also have an `.xlsx` copy.)

## Worked example

The Hartley Bakery wants a shared content calendar for its Instagram, in Google Sheets, that the owner and a part-time marketer can both edit.

The marketer opens a blank Sheet and builds a Monday-start month grid. She puts 1 June in the top-left day cell and chains the rest with `=cell+1` formulas, so the whole of June fills automatically and July will be a one-cell change. She types planned posts into each day: "Sourdough reel" on the 3rd, "Behind the scenes" on the 6th, "New menu launch" on the 14th.

She adds conditional formatting: posts containing "reel" shade blue, "launch" shades red, and weekends shade light grey via `=WEEKDAY(A1,2)>5`. A small colour key sits beside the grid. She shares the sheet with the owner as an editor and with the wider team as viewers, so everyone sees the plan but only two people change it.

For the owner, who likes paper, she prints it: File → Print, Landscape, Fit-to-width, gridlines hidden — a clean June grid on one page for the bakery's back-office wall. When July comes, she changes the start-date cell, the grid rolls forward with correct weekday alignment, and the conditional formatting reapplies itself. Total setup: about twenty minutes, reused indefinitely.

## Common layouts beyond the monthly grid

The month grid is the default, but a spreadsheet calendar's flexibility means several other layouts often serve better depending on the job:

**The list / table layout.** Instead of a grid, one row per item with columns for date, title, category, status, and owner. This is far better than a grid whenever you need to **sort and filter** — a content calendar you want to view "all Instagram posts" or "everything not yet drafted", a project schedule you want ordered by deadline. Grids look like calendars; tables are what spreadsheets are actually good at. For many people searching for a "calendar" what they really need is a sortable table of dated items.

**The year-at-a-glance.** Twelve mini month-grids on a single sheet, useful for high-level annual planning — holidays, term dates, quarterly milestones — where you do not need room to write events into each day, just to see the shape of the year. Google's built-in Annual calendar template provides this.

**The weekly / fortnightly layout.** A single week (or two) with tall day columns and hourly rows, closer to a planner than a calendar. Useful for detailed scheduling where a month grid does not give enough room per day. This overlaps with a [weekly schedule](/weekly-schedule/), and for time-blocked weeks a dedicated weekly schedule layout is often the better fit.

**The recurring-tab workbook.** One sheet (tab) per month, all in one workbook, so the whole year lives in a single file you navigate by tab. Combined with formula-driven dates, this is how many people run a personal or team calendar for an entire year without ever rebuilding it.

Choosing the layout is really choosing what you need to *do* with the calendar: write events into days (grid), sort and filter items (table), see the year (annual), or schedule a detailed week (weekly).

## Formulas that make a spreadsheet calendar powerful

The reason people specifically want their calendar *in Sheets* rather than as a static image is the formulas. A few worth knowing turn a passive grid into an active tool:

- **`TODAY()`** — returns the current date, so you can highlight today's cell automatically with a conditional-formatting rule that compares each date to `TODAY()`. The calendar then always shows you where "now" is without manual updating.
- **`WEEKDAY()`** — returns the day-of-week number, used (as shown earlier) to shade weekends automatically regardless of which month you are viewing.
- **`EOMONTH()`** — returns the last day of a month, useful for building grids that adapt to months of different lengths without manual fixing of the 28th/30th/31st boundaries.
- **`COUNTIF()` / `COUNTA()`** — count entries: how many events this month, how many shifts assigned to each person, how many content slots are still empty. This is the kind of summarising a paper calendar simply cannot do.
- **Date arithmetic (`+1`, `+7`)** — the chaining that auto-fills the grid and lets one start-date cell drive everything.

None of these require advanced spreadsheet skill — they are single-function formulas — but together they are exactly what distinguishes a Google Sheets calendar from a printable PDF: it computes, updates, and summarises itself.

## UK and US notes

The one setting that matters across markets is **week start**: UK calendars and most business contexts use Monday-start weeks; US personal calendars typically use Sunday-start. Decide before you build, because it determines your column order and the weekend-shading formula. Date format also differs — UK is DD/MM/YYYY, US is MM/DD/YYYY — and Google Sheets sets this from your account's locale (File → Settings → Locale), so confirm the locale matches your audience to avoid 06/07 being read as the wrong day. Everything else — formulas, conditional formatting, sharing, printing — is identical worldwide.
