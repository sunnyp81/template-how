---
node: planning-templates
title: 'Itinerary Template — Free (Business Trip, Conference, Wedding, Relocation)'
h1: 'Itinerary Template'
definitionalLede: 'An itinerary template is a time-blocked schedule document that organises the logistics of any multi-day event or trip — covering transport, accommodation, meetings, activities, and contacts — so every participant knows exactly where to be and when.'
primaryKeyword: 'itinerary template'
searchVolume: 16000
difficulty: 8
renderer: list-plan
related:
  - travel-itinerary
  - lesson-plan
  - meeting-minutes
  - project-proposal
  - weekly-schedule
crossCluster:
  - one-pager
  - grocery-list
audience: [us, uk]
wordCountFloor: 1800
sources:
  - title: 'HMRC — Travel: distance and subsistence rules for employees'
    url: 'https://www.gov.uk/guidance/travel-mileage-and-subsistence-rules'
    accessed: '2026-04-23'
  - title: 'IRS Publication 463 — Travel, Gift, and Car Expenses'
    url: 'https://www.irs.gov/publications/p463'
    accessed: '2026-04-23'
updated: '2026-04-23'
howTo:
  name: 'How to build an itinerary template'
  steps:
    - name: 'Define the purpose and traveller information'
      text: 'State the event or trip name, the traveller''s name, their role, and the overall date range. This context is essential if the itinerary is being reviewed by an approver, expense team, or travel coordinator.'
    - name: 'Build a day-by-day time block structure'
      text: 'For each day, create time blocks from the first required activity to the last. Assign each block an activity (flight, meeting, session, transfer, hotel check-in), a location or address, and an estimated cost. Leave buffer time between blocks — 30 minutes between a client meeting and a train departure is not enough.'
    - name: 'Add a contacts section'
      text: 'List every person or organisation the traveller may need to reach: the hotel (with booking reference), the conference organiser, client contacts, the travel booking platform emergency line, and the company travel manager. Name, role, phone, email. This section is the one people need most urgently when something goes wrong.'
    - name: 'Include a budget summary'
      text: 'Add a simple table with budget categories (transport, accommodation, meals, registration, incidentals), estimated costs, and a column for actual spend. This speeds up expense claims and provides the data for future trip planning.'
    - name: 'Share in a format everyone can access'
      text: 'A PDF attached to a calendar invite is reliable. A shared Google Doc or Notion page allows real-time updates if plans change. For group itineraries, consider a single shared document rather than emailing individual copies — change management is significantly easier.'
faq:
  - q: 'What is the difference between a travel itinerary and a general itinerary?'
    a: 'A travel itinerary focuses specifically on leisure or holiday trips — flights, hotels, tourist activities. A general itinerary covers any multi-day scheduled event: a business trip, a conference schedule, a wedding weekend timeline, a relocation plan, or a sports tournament. The structure is similar; the content and purpose differ significantly.'
  - q: 'What are UK per diem rates for business travel?'
    a: 'HMRC sets benchmark rates for subsistence: £5 for a round trip over 5 hours (if no meal provided), £10 over 10 hours, £25 over 15 hours. Employers can pay above these amounts if they have agreed rates with HMRC, or reimburse actual costs against receipts. As of 2026, check HMRC''s current benchmark rates — they are updated periodically.'
  - q: 'What are US per diem rates for business travel?'
    a: 'The GSA sets per diem rates for domestic US federal travel. Rates vary by city — New York, San Francisco, and Washington DC have higher rates than smaller cities. As of FY2026, the standard CONUS rate is $110/day (M&IE). Employers following IRS Publication 463 can reimburse per diem up to the federal rate without requiring receipts.'
  - q: 'How much buffer time should I build between activities?'
    a: 'Minimum 30 minutes between any two activities in the same city. For transfers involving transport (train, taxi, airport shuttle), allow at least 45–60 minutes. For international travel, build in 3 hours before departure and 2 hours for customs/immigration on arrival. If you are scheduling a first visit to an unfamiliar venue, add 20 minutes for navigation.'
  - q: 'Should expense receipts be attached to the itinerary?'
    a: 'Not to the itinerary itself — that document is for logistics, not finance. But aligning receipts against the itinerary''s cost column during reconciliation is efficient. Many corporate expense platforms (Concur, Expensify) allow you to import itinerary data and match receipts to trip dates automatically.'
  - q: 'How do I handle time zones in an itinerary?'
    a: 'Always express times in local time for the destination, with the time zone abbreviation noted. For international trips crossing multiple zones, include a conversion note (e.g., "Depart LHR 09:15 BST — Arrive JFK 12:30 EDT, same day"). Where events span midnight UTC, double-check whether "tomorrow" is truly tomorrow in local time.'
  - q: 'Can an itinerary be used for a wedding weekend?'
    a: 'Absolutely — this is one of the most common uses. A wedding weekend itinerary covers: rehearsal dinner logistics and timings, hotel check-in/check-out information for out-of-town guests, the ceremony day schedule (hair/makeup, transportation to venue, ceremony, photographs, reception), and day-after brunch or activity. Distribute it to the wedding party and key family members at least two weeks before the event.'
  - q: 'What should a conference itinerary include that a travel itinerary does not?'
    a: 'A conference itinerary should include: session titles and room numbers, speaker names for sessions you plan to attend, networking events with dress codes and locations, registration desk hours, onsite catering vs external restaurant options, and the conference app or Wi-Fi login details. These are specific to the event rather than the travel logistics.'
  - q: 'How do I handle bleisure trips (business plus leisure) on an itinerary?'
    a: 'Keep business and leisure days clearly separated in the document. For expense purposes, only the business-purpose days and directly associated costs are reimbursable. HMRC and the IRS both require that personal extensions to business trips be clearly distinguishable — if in doubt, mark leisure days explicitly and do not include personal expenses in the business cost column.'
builderSchema:
  slug: itinerary
  title: 'Itinerary'
  renderer: list-plan
  sections:
    - id: trip_info
      heading: 'Trip information'
      fields:
        - { id: trip_name, label: 'Trip / event name', type: text, required: true }
        - { id: traveller_name, label: 'Traveller name', type: text, required: true }
        - { id: traveller_role, label: 'Role / company', type: text }
        - { id: start_date, label: 'Start date', type: date, required: true }
        - { id: end_date, label: 'End date', type: date, required: true }
    - id: days
      heading: 'Day-by-day schedule'
      repeatable: true
      fields:
        - { id: day_date, label: 'Date', type: date, required: true }
        - { id: time_blocks, label: 'Time blocks (time | activity | location | cost — one per line)', type: textarea, required: true }
        - { id: day_notes, label: 'Day notes (optional)', type: textarea }
    - id: contacts
      heading: 'Key contacts'
      repeatable: true
      fields:
        - { id: contact_name, label: 'Name', type: text, required: true }
        - { id: contact_role, label: 'Role / organisation', type: text, required: true }
        - { id: contact_phone, label: 'Phone', type: text }
        - { id: contact_email, label: 'Email', type: email }
    - id: budget
      heading: 'Budget summary'
      fields:
        - { id: budget_table, label: 'Category | Estimated | Actual (one per line)', type: textarea }
        - { id: total_budget, label: 'Total approved budget', type: currency }
---

## What an itinerary actually is — and what it is not

The word "itinerary" is used loosely. A travel itinerary for a family holiday in Tuscany and a business conference schedule are both itineraries, but they serve different masters, contain different information, and are used in different contexts.

This template covers the broader category — any structured, multi-day, time-blocked plan where multiple parties need to know where to be and when. That includes business trips, conference schedules, wedding weekend timelines, relocation plans, sporting tournament programmes, and group travel for corporate away days.

What an itinerary is not: a packing list, a booking confirmation, or a wish list. It is an operational document. The distinction matters because an operational document must be precise about times, places, costs, and contacts. Ambiguity in an itinerary is not charming or flexible — it causes missed trains, wrong hotel lobbies, and conference talks attended by half the intended audience.

## How this template differs from a travel itinerary

The travel itinerary template on this site focuses on holiday and leisure travel: outbound flights, accommodation check-ins, day-by-day tourist activities, restaurant bookings, airport transfers. It is a personal planning tool, usually used by the traveller alone.

This itinerary template is designed for the broader category:

**Business trips.** The focus is on meetings, client visits, conference sessions, and transport connections. The budget section includes expense categorisation for reimbursement. The contacts section includes client names and the travel manager's emergency line.

**Conference schedules.** Session-by-session planning for multi-track events. Which sessions to attend, in which rooms, at which times, with enough buffer to travel between rooms and grab coffee.

**Wedding weekends.** Multi-party coordination across 2–3 days — rehearsal dinner logistics, ceremony day timeline, photographer slots, transportation between venues, hotel block information for out-of-town guests.

**Relocation plans.** Day-by-day logistics of moving: removal van arrival time, utility company switchover appointments, school enrolment dates, driving licence address update deadlines.

The structure is the same for all of these. The content is specific to the use case.

## What every itinerary must include

1. **Clear identification.** Who is this itinerary for, what is the event or trip, and what are the overall dates? If this document is separated from its email chain and found in a hotel lost property, these fields tell someone how to return it.

2. **Day-by-day time blocks.** Each block needs: a start time (not just "morning"), an activity description, a location (full address, not just "the conference centre"), and a cost estimate if relevant.

3. **Buffer time.** Built into the schedule, not as an afterthought. A realistic itinerary includes travel time between locations. An optimistic one does not — and the optimistic one fails.

4. **Contacts section.** Hotel name, address, booking reference. Client name and mobile number. Conference registration desk phone. Corporate travel emergency line. These are the numbers people need when plans go wrong — which they do.

5. **Budget section.** Estimated costs by category. For business trips, this doubles as the baseline for expense reporting. For personal events, it helps prevent budget overrun.

6. **Reference numbers.** Flight numbers, booking references, hotel confirmation codes. Keep them in one place so they can be retrieved from one document rather than five email threads.

## When each use case changes the template

**Business trip itinerary.** Add a "purpose" line for each meeting (client relationship, contract renewal, technical scoping — this matters for expense reimbursability). Include HMRC or IRS per diem benchmarks in the budget notes so the approver can cross-reference easily.

**Conference itinerary.** Add a session-level breakdown for each day (session title, speaker, room, time). Include the conference app download link and Wi-Fi details. Note networking events separately from formal sessions.

**Wedding weekend itinerary.** Include a wedding party contact list with roles (MOH, best man, wedding coordinator). Include dress code for each event. Include transportation logistics for each group (bridal party, immediate family, guests). Include the photographer's timeline as a separate embedded section.

**Relocation itinerary.** Include service provider names and reference numbers (removal company, energy suppliers, council tax office). Build in contingency days for delays. Include a checklist of administrative tasks by date (DVLA address update: within 28 days of moving; electoral roll: as soon as possible; GP registration: first week).

## Step-by-step: building the itinerary

**Step 1 — Anchor the fixed commitments first.** Start with the unmoveable items: flight departure and arrival times, conference session start times, wedding ceremony time. Everything else is scheduled around these.

**Step 2 — Calculate travel time realistically.** For every gap between fixed commitments, research the actual travel time. Google Maps travel-time estimates are reliable for UK train and road travel; build in 15% buffer for real-world conditions (delays, queues, navigation).

**Step 3 — Add supporting logistics.** Hotel check-in (confirm the property's earliest check-in time — most UK hotels are 15:00 or later, US hotels 16:00). Restaurant reservations with the address and confirmation number. Conference registration desk with the reference.

**Step 4 — Build the contacts block.** Go through every entity in the itinerary and add a contact: hotel front desk, each client being visited, the conference organiser, car hire company, restaurant. This takes 15 minutes and saves enormous stress when something goes wrong.

**Step 5 — Add the budget table.** List each cost category, the estimated amount, and leave the actual column blank to fill in on return. For UK business trips: transport, accommodation, meals (HMRC benchmark or actuals), registration fees, incidentals. For US: same categories, IRS Publication 463 per diem as reference.

**Step 6 — Share before departure.** Email the completed itinerary to yourself, to your travel manager or assistant, and to anyone who needs to reach you. A PDF attached to the trip's calendar event is reliable. A shared cloud document is better for trips where plans are likely to change.

<aside class="tip">
**Expert tip:** Build your itinerary in a shared document (Google Docs, Notion, Confluence), not a static PDF, for any trip where multiple people need access or where plans are likely to change. A PDF sent by email becomes outdated the moment a meeting is rescheduled or a flight delayed. A shared link stays current. Include a "last updated" timestamp at the top so readers know whether they have the latest version.
</aside>

## Common mistakes

**Mistake 1: Unrealistic travel time between activities.** Scheduling a meeting in Canary Wharf at 11:00 and another in the City at 11:45 in London is not possible by public transport at peak hours, unless you allow for a taxi and traffic. Pad inter-meeting travel time generously.

**Mistake 2: Missing hotel check-in/check-out times.** Arriving at a hotel at 12:00 for a conference that starts at 14:00 and discovering check-in is 15:00 is a common and entirely avoidable problem. Confirm early check-in with the hotel in advance, or add a luggage storage entry to the morning schedule.

**Mistake 3: No emergency contacts.** When a meeting is cancelled at 07:00 or a conference venue changes, you need a phone number. An itinerary that only has email addresses is not useful in a moment of urgency.

**Mistake 4: Forgetting local currency or payment methods.** For international travel, note which venues require local currency, which are card-only, and the nearest ATM to the hotel. Small friction points compound badly when you are tired and running late.

**Mistake 5: Not sharing the itinerary before you leave.** If you need to be reached in an emergency, someone needs to know your schedule. Send the completed document to a colleague or family member before departure.

## Worked example: Helen Ward's London business trip

**Helen Ward | Director of Commodities, Bristol Metals Ltd**  
FT Commodities Global Summit, London | 21–23 May 2026

**Day 1: Wednesday 21 May**
- 07:30 — Depart home, drive to Bristol Temple Meads (allow 40 mins, M32 variable)
- 08:15 — Bristol Temple Meads. LNER advance ticket: 08:40 Bristol–London Paddington. Coach D, seat 34. Ref: LNR7841. Cost: £34.
- 10:45 — Arrive London Paddington. Elizabeth line to Westminster (18 mins). Walk 8 mins to hotel.
- 11:30 — Check in: Park Plaza Westminster Bridge, 200 Westminster Bridge Rd, SE1 7UT. Booking ref: PPW2604. Early check-in pre-confirmed. Tel: 020 7620 7200.
- 13:00 — Lunch with Marcus Tull, Head of Trading, Veritas Commodities. Aqua Shard, Level 31, 31 St Thomas St, SE1 9RY. Booking ref: AS2126. Estimated cost: £65.
- 15:30 — Arrive FT Summit registration, 1 Southbank Place, SE1 9HA. Collect lanyard and materials pack. Conference app: ftlive.app/commodities2026. Wi-Fi: FTSummit_Guest / Pass: CG2026.
- 18:30 — Welcome reception, Terrace Level, same venue. Dress: business casual. End: approx. 20:00.
- 20:15 — Return to hotel. Check restaurant pre-booking or room service.

**Day 2: Thursday 22 May**
- 08:00 — Breakfast (hotel, charged to room — max HMRC benchmark £10)
- 09:00–17:30 — FT Commodities Summit Day 1. Sessions: see conference app. Helen's priority sessions: 09:00 Opening Keynote (Hall A); 11:00 European Energy Transition (Hall B); 14:00 Steel & Critical Minerals (Hall A); 16:30 Networking roundtables.
- 17:30–19:00 — Drinks reception, networking.
- 19:30 — Dinner: client evening with Veritas Commodities team. Oxo Tower Restaurant, Barge House St, SE1 9PH. Booking ref: OXO228. Estimated cost: £90 (to be expensed, client entertainment — confirm approver pre-approval obtained).

**Day 3: Friday 23 May**
- 08:00 — Breakfast, hotel.
- 09:00–13:00 — FT Summit Day 2. Priority: 10:30 Circular Economy panel (Room 4); 12:00 Commodities outlook 2027 (Hall A).
- 12:30 — Check out (luggage stored at concierge).
- 13:30 — Lunch (self-pay, estimated £15).
- 15:00 — London Paddington. LNER: 15:30 to Bristol Temple Meads. Coach C, seat 21. Ref: LNR7842. Cost: £34.
- 17:15 — Arrive Bristol. Drive home.

**Budget summary:**

| Category | Estimated | Actual |
|---|---|---|
| Train (return) | £68 | |
| Hotel (2 nights) | £260 | |
| Meals (3 days) | £120 | |
| Client entertainment | £90 | |
| Incidentals | £20 | |
| **Total** | **£558** | |

Total approved: £600. Final actual: £388 — under budget due to conference lunch provision on Day 2.
