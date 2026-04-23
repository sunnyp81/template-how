---
node: business-templates
title: 'Meeting Minutes Template — Free (Formal + Informal Formats)'
h1: 'Meeting Minutes Template'
definitionalLede: 'A meeting minutes template is a structured document that records decisions made, actions assigned, and discussions had during a formal or informal meeting — creating the official record that participants and absent stakeholders rely on.'
primaryKeyword: 'meeting minutes template'
searchVolume: 9100
difficulty: 13
renderer: list-plan
related:
  - profit-and-loss-statement
  - invoice-google-docs
  - project-proposal
  - agenda
crossCluster:
  - doctors-note
  - ats-friendly-resume
audience: [us, uk]
wordCountFloor: 1800
sources:
  - title: 'UK Companies Act 2006 §248 — Minutes of directors meetings'
    url: 'https://www.legislation.gov.uk/ukpga/2006/46/section/248'
    accessed: '2026-04-23'
  - title: "Robert's Rules of Order — Standard Code of Parliamentary Procedure"
    url: 'https://robertsrules.com'
    accessed: '2026-04-23'
updated: '2026-04-23'
howTo:
  name: 'How to take and write up meeting minutes'
  steps:
    - name: 'Prepare before the meeting'
      text: 'Get the agenda in advance. Understand who will be attending and what decisions are expected. If you are an unfamiliar minute-taker, brief yourself on the technical vocabulary of the meeting subject so you can record accurately in real time.'
    - name: 'Record decisions and actions, not every word'
      text: 'Minutes are not a verbatim transcript. Capture decisions (what was agreed), actions (who does what by when), and any formal votes or objections. Skip the back-and-forth — summarise the substance of discussions in one or two sentences per agenda item.'
    - name: 'Complete the draft within 24 hours'
      text: 'Memory degrades quickly. Write up the notes while the meeting is fresh. A circulated draft within 24 hours is best practice; waiting until the next meeting to circulate creates confusion about what was actually agreed.'
    - name: 'Circulate for review and approval'
      text: 'Send the draft to the chair and attendees for correction. Allow a reasonable deadline (48–72 hours). Incorporate factual corrections but not rewrites of what was decided. Minutes are approved — usually at the following meeting — and the approved version becomes the official record.'
    - name: 'File and retain per legal requirements'
      text: 'For UK companies, board minutes must be kept for at least 10 years under Companies Act 2006. Committee minutes: at least 10 years. For US corporations, state law and bylaws govern retention, but 7 years is a common minimum. Store in a secure, indexed location.'
faq:
  - q: 'How long must meeting minutes be kept in the UK?'
    a: 'Under Companies Act 2006 §248, board and general meeting minutes must be kept for at least 10 years from the date of the meeting. This applies to limited companies. For partnerships, charities, and other entities, retention requirements depend on the applicable law or governing documents.'
  - q: 'What is the difference between actions and decisions in minutes?'
    a: 'A decision is what was agreed (e.g., "The board approved the Q1 budget as presented"). An action is a specific task assigned to a named person with a deadline (e.g., "Priya Ramanathan to circulate revised supplier contracts by 1 May 2026"). Both need to be captured; conflating them creates confusion during follow-up.'
  - q: 'Do meeting minutes need to be signed?'
    a: 'For UK board meetings, Companies Act 2006 requires minutes to be signed by the chair of the meeting or the chair of the following meeting. For other formal meetings (AGMs, committee meetings), the signed minutes are the authoritative record. Informal team meeting notes typically do not require signatures but should be approved via email confirmation.'
  - q: 'Can meeting minutes be kept confidential?'
    a: 'Yes. Board minutes are not public documents. Under UK law, shareholders can inspect minutes of general meetings but not board meetings, unless the articles of association provide otherwise. For team meetings containing commercially sensitive decisions or HR matters, access should be restricted to relevant parties.'
  - q: 'Should voting records be included in minutes?'
    a: 'Yes, always for formal meetings. Record the motion, the proposer, the seconder, and the vote count (e.g., "7 in favour, 1 against, 1 abstention"). For a unanimous vote, "passed unanimously" is sufficient. If a director objects to a decision, they can request that their dissent be recorded — this is important for limiting their personal liability.'
  - q: 'Can meeting minutes be amended after they are approved?'
    a: 'Approved minutes can only be amended by resolution at a subsequent meeting. The amendment itself becomes part of the record. You cannot simply edit and re-issue approved minutes — this would undermine their function as a fixed historical record.'
  - q: 'What should not go in meeting minutes?'
    a: 'Opinions, speculation, personal commentary, and off-the-record remarks. If the chair says something that was clearly informal, it should not appear in the minutes. Also avoid verbatim arguments — summarise outcomes. Minutes that read like a transcript create legal risk because off-the-cuff remarks take on the weight of official record.'
  - q: 'How are meeting minutes different from meeting notes?'
    a: 'Meeting notes are informal — a personal or shared summary of what was discussed, without formal approval or legal significance. Minutes are a formal record that, once approved, represent the official account of what occurred. In a legal dispute, approved minutes carry evidential weight; informal notes do not.'
  - q: 'Who is responsible for taking minutes?'
    a: 'For board meetings, a company secretary traditionally takes minutes. For committee or project meetings, it is usually a designated minute-taker (often a junior team member or the meeting coordinator). The minute-taker should not also be the chair — recording while facilitating leads to gaps in both roles.'
builderSchema:
  slug: meeting-minutes
  title: 'Meeting Minutes'
  renderer: list-plan
  sections:
    - id: meeting_info
      heading: 'Meeting information'
      fields:
        - { id: meeting_title, label: 'Meeting title', type: text, required: true }
        - { id: meeting_date, label: 'Date', type: date, required: true }
        - { id: start_time, label: 'Start time', type: text, required: true }
        - { id: end_time, label: 'End time', type: text }
        - { id: location, label: 'Location / platform', type: text, required: true }
        - { id: chair, label: 'Chair', type: text, required: true }
        - { id: minute_taker, label: 'Minute-taker', type: text, required: true }
    - id: attendees
      heading: 'Attendees'
      fields:
        - { id: attendees_list, label: 'Present (name, role — one per line)', type: textarea, required: true }
        - { id: apologies, label: 'Apologies received', type: textarea }
    - id: agenda_items
      heading: 'Agenda items'
      repeatable: true
      fields:
        - { id: item_number, label: 'Item number', type: text, required: true }
        - { id: item_topic, label: 'Topic', type: text, required: true }
        - { id: discussion_summary, label: 'Discussion summary', type: textarea, required: true }
        - { id: decision, label: 'Decision(s)', type: textarea }
        - { id: actions, label: 'Actions (owner + deadline, one per line)', type: textarea }
    - id: aob
      heading: 'Any other business'
      fields:
        - { id: aob_notes, label: 'AOB items', type: textarea }
    - id: next_meeting
      heading: 'Next meeting'
      fields:
        - { id: next_date, label: 'Date', type: date }
        - { id: next_time, label: 'Time', type: text }
        - { id: next_location, label: 'Location / platform', type: text }
---

## What meeting minutes actually are — and what they are not

Meeting minutes are the official written record of a meeting's proceedings. They are not a transcript. They are not a summary of opinions. They are a concise, factual account of: who was present, what was discussed (in brief), what was decided, and who is doing what by when.

That last category — actions — is the most practically important part of the whole document. Decisions without assigned owners and deadlines are wishful thinking. A well-written set of minutes turns a meeting's conclusions into a follow-up mechanism.

The legal dimension adds another layer of significance. For UK limited companies, minutes of board meetings are required by law under the Companies Act 2006. They must be kept for at least 10 years. They are signed by the chair. They form part of the company's official records, which can be inspected by regulators and used as evidence in legal proceedings. Treating them as an afterthought is a governance failure.

For most team, project, and committee meetings, the legal requirements are less onerous — but the operational ones are just as real. A meeting where no one records what was decided is a meeting that will need to be repeated.

## When to use minutes versus informal notes

Not every meeting needs formal minutes. The question is: what level of accountability does this meeting require?

**Use formal minutes for:** Board meetings, AGMs, committee meetings with governance responsibility, meetings where decisions have legal or financial consequences, client-facing meetings where a record of commitments is needed.

**Use informal notes for:** Team standups, brainstorming sessions, one-to-ones, working sessions without formal decisions. These can be circulated but do not need approval or archiving in the same way.

The distinction matters because the formality of minutes — circulated draft, approval at next meeting, signed record — creates overhead. Apply it where the accountability and legal record are worth the cost. For a weekly team standup, a shared Notion page is fine.

## What a good set of minutes must include

1. **Meeting header.** Title, date, start and end time, location or platform, name of chair, name of minute-taker.

2. **Attendees and apologies.** Full names and roles for everyone present. Names of those who sent apologies. This matters for quorum calculations (if applicable) and for understanding who is bound by decisions made.

3. **Previous minutes.** Confirmation that the previous meeting's minutes were reviewed and approved (or with amendments). This creates a chain of record.

4. **Agenda item summaries.** One to three sentences per item. Not the full argument — the substance. Focus on what was concluded, not how the discussion unfolded.

5. **Decisions.** Clear, unambiguous statements of what was agreed. "The board approved the revised Q1 budget of £420,000" is a decision. "We talked about the budget" is not.

6. **Actions.** Owner, description, deadline. Three fields, always. An action without an owner is nobody's responsibility. An action without a deadline is open-ended. An action without a description is ambiguous. All three must be present.

7. **Any other business.** Brief note of anything raised outside the agenda.

8. **Next meeting.** Date, time, location. This should be confirmed at the close of every meeting, not arranged by email chain afterwards.

9. **Signature.** The chair (or the chair of the next meeting) signs the approved minutes. For digital records, an email confirmation of approval from the chair constitutes sufficient approval in most contexts.

## Variants you will encounter

**Board minutes.** The most formal type. Must comply with company law requirements. Typically prepared by the company secretary and approved at the following board meeting. Resolutions and voting records are essential.

**Committee minutes.** Sub-committees (audit, remuneration, nominations) maintain their own minute books. These feed into board-level reporting but are separate records.

**AGM / EGM minutes.** General meeting minutes include the business passed by shareholders. These are publicly accessible by shareholders and, in some jurisdictions, filed at Companies House or equivalent.

**Project meeting minutes.** Less formal but should still capture decisions and actions with owners and dates. Used extensively in project management and client services.

**Client meeting minutes.** Record commitments made to a client. These are occasionally used as evidence in commercial disputes. Keep them factual and specific — "client agreed to provide creative assets by 30 April" is more useful than "client will send stuff soon."

## Step-by-step: taking and writing up minutes

**Step 1 — Prepare the template before the meeting.** Fill in the header information in advance: meeting title, date, time, location, names of expected attendees. Having the template ready means you can focus on listening, not formatting.

**Step 2 — Take brief notes during the meeting.** Use shorthand. Focus on decisions and actions as they emerge. If someone volunteers to do something, note their name, the task, and the deadline immediately.

**Step 3 — Write up within 24 hours.** Transform shorthand into complete sentences. Keep the language neutral and factual. Do not include personal commentary on anyone's contributions.

**Step 4 — Review the action log.** Check that every action has a named owner and a specific deadline. If you recorded "someone to look into the supplier issue," find out who during the meeting — do not let ambiguity persist into the minutes.

**Step 5 — Circulate the draft.** Send to the chair first, then to all attendees. Use a clear subject line: "DRAFT MINUTES — [Meeting Name] — [Date]". Set a review deadline of 48–72 hours.

**Step 6 — Incorporate corrections and finalise.** Accept factual corrections. Resist rewrites that change the meaning of what was agreed — if a participant wants the record changed to reflect a different decision, that requires a new decision at the next meeting, not an edit to these minutes.

**Step 7 — Approve and file.** At the next meeting, table the minutes as an agenda item. Record that they were approved (or approved with amendments). The chair signs. File in the appropriate location.

<aside class="tip">
**Expert tip:** Use a dedicated action tracker alongside your minutes, not instead of them. Minutes are the historical record; the action tracker is the live follow-up tool. Transfer every action from the minutes into a shared project management tool (Asana, Monday, Notion) immediately after the meeting. This way, actions do not get lost in a PDF that no one opens between meetings.
</aside>

## Common mistakes

**Mistake 1: Recording opinions, not decisions.** "There was some disagreement about the proposed vendor" is not a decision. "The team agreed to delay vendor selection until Q3 cost analysis is complete" is. Filter out the discussion noise and record the outcome.

**Mistake 2: Missing the owner on actions.** This is the single most common failure in informal minutes. "Update the website" with no owner assigned means no one does it.

**Mistake 3: Circulating too late.** Minutes circulated a week after the meeting are rarely accurate — people cannot remember what they actually agreed to, and corrections multiply. The 24-hour rule exists for a reason.

**Mistake 4: Verbatim quotes.** Direct quotes create problems. A director quoted saying something in a heated discussion may not want that exact phrasing in the permanent record. Summarise substance; do not transcribe.

**Mistake 5: Not recording apologies and absences.** Quorum (the minimum number of members required for a valid meeting) is calculated against those present. If quorum was not met and the minutes do not record who was absent, the validity of decisions made at that meeting can be challenged.

## Worked example

**Acme Ltd — Quarterly Board Meeting**  
Date: 24 April 2026 | 10:00–11:30 | Zoom  
Chair: Priya Ramanathan (CEO) | Minute-taker: James Okafor (Company Secretary)  
Present: Priya Ramanathan, David Hughes (CFO), Saffron Blake (COO), Marcus Tan (NED), Ruth Ashby (NED)  
Apologies: None

**Item 1: Q1 Financial Results**  
Discussion: David Hughes presented Q1 results. Revenue £1.24M (vs £1.1M forecast, +12.7%). EBITDA margin 18%, up from 15% in Q4 2025. Cash position £380k. Two large invoices (£92k combined) outstanding — both expected to clear by 30 April.  
Decision: Q1 results noted and approved.  
Action: David Hughes to confirm receipt of both outstanding invoices by 30 April 2026.

**Item 2: Q2 Hiring Plan**  
Discussion: Saffron Blake proposed hiring 2 senior engineers and 1 product manager in Q2, total cost circa £220k annualised. Board noted the tight cash position but agreed the hires were critical to Q3 product roadmap.  
Decision: Hiring plan approved in principle, subject to cash position at 30 April.  
Action: Saffron Blake to issue job descriptions to recruitment agencies by 1 May 2026. David Hughes to provide cash flow confirmation by 1 May 2026.

**Item 3: Software Upgrade**  
Discussion: CRM system reaching end-of-life August 2026. Three vendors evaluated. Board discussed Vendor B (£18k setup, £2.4k/mo) vs Vendor C (£8k setup, £3.1k/mo). Marcus Tan raised data portability concerns about Vendor B.  
Decision: Saffron Blake to request data portability SLA from Vendor B before final decision. Decision deferred to next board meeting.  
Action: Saffron Blake to obtain Vendor B data portability terms by 8 May 2026.

**AOB:** None  
**Next meeting:** 26 June 2026, 10:00, Zoom

These minutes are 300 words, capture three substantive decisions, and generate five discrete actions — each with a named owner and a specific deadline. The chair will sign the approved version at the June meeting.

## UK legal requirements at a glance

Under Companies Act 2006, a UK limited company must:
- Keep minutes of all board meetings and general meetings
- Retain them for at least 10 years from the date of the meeting
- Allow shareholders to inspect general meeting minutes (but not board meeting minutes) on request
- Keep minutes at the registered office or a SAIL (single alternative inspection location) notified to Companies House

Failure to maintain minutes is a criminal offence for company officers and can result in a fine.

For US corporations, equivalent requirements exist under state corporate law (Delaware General Corporation Law §142 is widely referenced), though specifics vary. Bylaws typically specify retention periods; seven years is a common minimum in practice.
