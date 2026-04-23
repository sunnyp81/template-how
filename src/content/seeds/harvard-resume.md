---
node: resume-templates
title: 'Harvard Resume Template — Free Download (US + UK)'
h1: 'Harvard Resume Template'
definitionalLede: 'A Harvard resume template is a single-page, reverse-chronological CV format developed by the Harvard Office of Career Services, using consistent formatting, tight margins, and no graphics or photos.'
primaryKeyword: 'harvard resume template'
searchVolume: 17000
difficulty: 5
renderer: resume
related:
  - cover-letter
  - reference-list
  - resignation-letter
  - letter-of-recommendation
crossCluster:
  - bill-of-sale
  - lesson-plan
audience: [us, uk]
wordCountFloor: 1800
sources:
  - title: 'Harvard Office of Career Services — Resume & CV Guide'
    url: 'https://ocs.fas.harvard.edu/files/ocs/files/hes-resume-cover-letter-guide.pdf'
    accessed: '2026-04-23'
  - title: 'US DOL CareerOneStop — Resume Writing'
    url: 'https://www.careeronestop.org/JobSearch/Resumes/rewrite-your-resume.aspx'
    accessed: '2026-04-23'
updated: '2026-04-23'
howTo:
  name: 'How to fill out a Harvard resume template'
  steps:
    - name: 'Add your contact block'
      text: 'Place your full name in a larger font at the top, then your email, phone, city/state, and LinkedIn URL on one or two lines. Leave out your full postal address unless the role is local — it wastes space and is not expected.'
    - name: 'Write a targeted summary'
      text: 'Two to three sentences maximum. State who you are, your strongest qualification, and what you are looking for. Do not use "I" — write in the third person implied: "Finance graduate with two internships at bulge-bracket banks, seeking a full-time analyst role in equity research."'
    - name: 'Fill in Education first'
      text: 'On a Harvard resume, Education comes before Experience if you are a student or recent graduate. List your institution, degree, graduation date, and GPA if it is 3.5 or above. Include honours (cum laude, magna cum laude, summa cum laude). List relevant coursework only if the role specifically calls for technical knowledge and you lack work experience in that area.'
    - name: 'List Experience in reverse chronological order'
      text: 'Most recent role first. For each role: job title, company, dates (month and year), and location. Under each role, write three to five bullet points beginning with an action verb. Quantify wherever possible: not "helped improve a process" but "reduced reconciliation time by 40% by automating data import with a Python script."'
    - name: 'Add Skills, Publications, and Languages'
      text: 'Skills: list technical skills (programming languages, software, tools) and any professional certifications. Publications: include peer-reviewed papers or significant publications with full citation. Languages: list with proficiency level (professional working proficiency, native, conversational). Keep optional sections short — they add credibility but should not pad.'
faq:
  - q: 'How long should a Harvard resume be?'
    a: 'One page strictly for students and candidates with under ten years of experience. Two pages are acceptable for senior candidates with a long track record. The Harvard OCS is explicit about the one-page standard for early-career applicants. When in doubt, cut.'
  - q: 'Should I include a photo on a Harvard resume?'
    a: 'No — for US applications. Photos on US resumes are not expected and can create unconscious bias liability for employers, which is why most US recruiters actively do not want them. For UK applications, photos are equally uncommon and generally not recommended. In continental Europe, photos are standard but this template is optimised for US and UK use.'
  - q: 'What date format should I use?'
    a: 'Month and year: "September 2023 – May 2024" or "Sep 2023 – May 2024". Do not use just years — that conceals the length of employment and flags you as someone who may be hiding a gap.'
  - q: 'Should I include my GPA?'
    a: 'Include it if it is 3.5 or above on a 4.0 scale (US), or First Class / Upper Second Class (2:1) in the UK. Below that threshold, leave it off — it draws attention to a number that does not help you.'
  - q: 'What margins should a Harvard resume have?'
    a: 'Between 0.5 and 1 inch (1.27–2.54 cm) on all sides. The Harvard OCS recommends 0.75 inches as a sensible middle ground. Tighter than 0.5 inches looks cramped; looser than 1 inch wastes space.'
  - q: 'What font size should I use?'
    a: 'Body text: 10–12pt. Your name: 14–18pt. Font: a clean serif (Garamond, Times New Roman) or sans-serif (Calibri, Arial) with high ATS readability. Avoid decorative fonts entirely.'
  - q: 'What is the difference between a Harvard resume and a CV?'
    a: 'In the US, a CV (curriculum vitae) is a long-form academic document covering all publications, presentations, grants, and academic positions — used for academic and research roles. A resume is a targeted, condensed document for industry roles. The Harvard template is a resume, not a full CV. In the UK, "CV" and "resume" are used interchangeably for the standard one-to-two-page job application document.'
  - q: 'How do I pass ATS screening with a Harvard resume?'
    a: 'Mirror the job description language exactly — if the posting says "financial modelling" use those exact words, not "financial modeling" (if applying in the UK) or "financial analysis" (a vague alternative). Keep formatting simple: no tables, no text boxes, no columns. Save as .docx or PDF depending on what the employer requests.'
  - q: 'Do I need a cover letter with a Harvard resume?'
    a: 'Yes, for most professional applications. The resume lists the facts; the cover letter explains the narrative — why this role, at this organisation, now. Harvard OCS explicitly recommends pairing the two for any competitive application.'
  - q: 'Can I use the Harvard resume template for non-US jobs?'
    a: 'Yes. The format is highly regarded globally because of its clarity and structure. For UK roles, simply adapt the date format and spell-check for British English. For roles in continental Europe, check whether local conventions require different sections — some markets expect a "personal profile" photo and date of birth, which you should add only if the employer explicitly asks.'
builderSchema:
  slug: harvard-resume
  title: 'Harvard Resume'
  renderer: resume
  sections:
    - id: contact
      heading: 'Contact'
      fields:
        - { id: full_name, label: 'Full name', type: text, required: true }
        - { id: email, label: 'Email address', type: text, required: true }
        - { id: phone, label: 'Phone number', type: text, required: true }
        - { id: location, label: 'City, State / City, Country', type: text, required: true }
        - { id: linkedin, label: 'LinkedIn URL (optional)', type: text, required: false }
    - id: summary
      heading: 'Professional Summary'
      fields:
        - { id: summary_text, label: 'Summary (2–3 sentences)', type: textarea, required: false }
    - id: education
      heading: 'Education'
      fields:
        - { id: degree, label: 'Degree (e.g. AB Economics)', type: text, required: true }
        - { id: institution, label: 'Institution', type: text, required: true }
        - { id: edu_start, label: 'Start date (Month Year)', type: text, required: true }
        - { id: edu_end, label: 'End / expected date (Month Year)', type: text, required: true }
        - { id: honours, label: 'Honours / GPA (optional)', type: text, required: false }
        - { id: relevant_courses, label: 'Relevant coursework (optional, comma-separated)', type: textarea, required: false }
    - id: experience
      heading: 'Experience'
      fields:
        - { id: job_title, label: 'Job title', type: text, required: true }
        - { id: company, label: 'Company / organisation', type: text, required: true }
        - { id: exp_start, label: 'Start date (Month Year)', type: text, required: true }
        - { id: exp_end, label: 'End date (Month Year or "Present")', type: text, required: true }
        - { id: exp_location, label: 'Location', type: text, required: false }
        - { id: bullets, label: 'Bullet points (one per line, start each with a verb)', type: textarea, required: true }
    - id: skills
      heading: 'Skills'
      fields:
        - { id: technical_skills, label: 'Technical skills (comma-separated)', type: textarea, required: false }
        - { id: certifications, label: 'Certifications (optional)', type: textarea, required: false }
    - id: publications
      heading: 'Publications (optional)'
      fields:
        - { id: publications_list, label: 'Publications (one per line, full citation)', type: textarea, required: false }
    - id: languages
      heading: 'Languages (optional)'
      fields:
        - { id: languages_list, label: 'Languages and proficiency levels (one per line)', type: textarea, required: false }
---

## What a Harvard resume actually is

The Harvard resume is not a marketing document. It is an accounting document. It lists, in reverse chronological order, what you have done, where, and when — formatted to a standard that is legible to human readers in under six seconds and to ATS systems in under zero seconds. That is the entire point.

The format was developed and refined by the Harvard Office of Career Services and is distributed to students and alumni applying for competitive graduate schemes, consulting roles, investment banking analyst programmes, law firm positions, and any role where hundreds of applications land on the same desk. Its conventions are not arbitrary — they exist because they survived contact with the reality of busy recruiters.

The core rules: one page for early-career candidates, reverse chronological order, no graphics or photos, consistent formatting throughout, and bullet points that quantify rather than describe. "Led a team" tells a recruiter nothing. "Led a four-person team that delivered a market entry report for a FTSE 250 client, three days ahead of deadline" tells them something.

The Harvard resume format is distinct from the European CV (longer, more comprehensive) and from the designed or creative resume (which uses colour, columns, and visual elements). Neither of those formats is appropriate for competitive professional applications in the US — applicant tracking systems reject PDFs with text boxes and multi-column layouts at a significant rate. The Harvard format, sent as a clean single-column document, does not have this problem.

In the UK, the same document would typically be called a CV, and the one-to-two-page format is the expected standard for most roles. The Harvard template works for UK applications with minor adjustments — British English spelling, UK date format conventions, and the omission of GPA (which UK employers do not typically request or understand).

## When to use this template

**Competitive graduate applications.** Investment banking, management consulting, law, medicine — any field where a large number of equally qualified candidates compete for a small number of positions. In these markets, a non-standard resume format is a red flag, not a creative advantage. Recruiters at Goldman Sachs, McKinsey, and Magic Circle law firms have specific expectations about what a resume looks like, and the Harvard format meets those expectations.

**US college and graduate students.** The Harvard template is the default for Harvard, Yale, Princeton, MIT, and most other top US universities' career offices. If you are applying for on-campus recruiting or any role where your school's career office is involved, using the format they recommend avoids any administrative friction.

**UK university students targeting competitive graduate schemes.** The big four accounting firms, Teach First, the Civil Service Fast Stream, investment banking graduate intakes — these use the same criteria as their US counterparts. A clean, quantified, reverse-chronological CV in the Harvard style translates directly.

**Career changers with a clear narrative.** If you are moving between industries or roles, the Harvard format's mandatory summary section is where the narrative lives. The format forces you to articulate who you are and why you are a credible candidate for the target role — which is the central challenge in any career change application.

**Academic positions where a full CV is premature.** A PhD student applying for a first industry role, or a postdoc moving into consulting, does not need a fifteen-page academic CV. A Harvard-format resume that highlights the transferable elements of academic training — research design, data analysis, project management, writing — is usually more effective.

## What it must include

A Harvard resume that leaves out key sections will not pass the six-second scan. Here is what recruiters look for, in the order they look for it:

**Name and contact information.** Full name in a slightly larger font than the body text. Email address that is professional (first.last@gmail.com, not partytime2019@hotmail.com). Phone number. LinkedIn URL if your profile is complete and professional. City and state/country — not full postal address, which wastes space. No date of birth, no marital status, no National Insurance number in the header.

**Education section.** For students and recent graduates, this comes before experience. Degree, institution, graduation date (or expected graduation date), GPA if 3.5+. For UK graduates: degree class (First / 2:1 / 2:2) rather than a numerical GPA. Relevant coursework is optional and should only appear if you lack work experience in the relevant area. Academic prizes and distinctions belong here: Dean's List, scholarship awards, elected positions in academic societies.

**Experience section.** Each role needs: job title (bold), company, dates (month and year), location. Three to five bullet points per role, each starting with a past-tense action verb for completed roles, present-tense for current. Every bullet should answer either "what did you do?" or "so what?" — ideally both in the same sentence. Quantify wherever possible: percentages, dollar or pound amounts, team sizes, deadlines hit.

**Skills section.** Technical skills: programming languages, data tools, design software, spoken languages. Professional certifications: CFA Level 1, AWS Certified, Six Sigma — include if genuinely held. Do not pad this section with basic skills that imply you cannot do basic things (e.g., "Microsoft Word proficiency" is not a differentiating skill in 2026).

**Optional sections.** Publications (essential for academic applicants, optional for others). Languages (always include if you have professional-level fluency in a second language — it is a genuine differentiator). Leadership and activities (for students with limited work experience, this section shows initiative and character — include if the activities are substantive).

## Variants you will encounter

**Harvard Business School resume format.** Slightly different from the undergraduate OCS format: less emphasis on GPA, more emphasis on quantified impact in the experience bullets. HBS distributes its own template to MBA students; the underlying logic is the same but the expectations about experience depth are much higher.

**Consulting resume (McKinsey / BCG / Bain standard).** Essentially the Harvard format with an extremely high bar for quantification. Every bullet is expected to have a number, a context, and an implication. "Analysed" alone is not acceptable — "Analysed a 12-variable pricing model across three product lines, identifying a £340,000 revenue leakage that was subsequently recovered" is.

**Law firm CV (Magic Circle / BigLaw standard).** One page. No publications unless academic law review. The summary section is less common — law firm recruiters prefer to read the experience section directly. Academic results are listed with more detail: specific module grades, moot court, law review membership.

**UK graduate scheme format.** Very close to the Harvard standard. The key differences are: no GPA (degree class instead), UK English throughout, and the skills section may include key competencies phrased to mirror the employer's graduate scheme criteria.

## Step-by-step: completing the template

**Step 1 — Build the contact block.** Name at the top. Below it on one line, separated by vertical bars or bullet points: email, phone, city/country, LinkedIn. Keep this to two lines maximum or the header eats into your page.

**Step 2 — Write a targeted summary.** Read the job description first. Identify the three things the employer is looking for. Write two to three sentences that say you have those three things, backed by evidence. Rewrite this section for every application where the target role differs meaningfully. A summary that could apply to any job is less useful than no summary at all.

**Step 3 — Education section.** If you graduated in the last three to five years, Education goes first. After five years of work experience, move it below Experience. Include all post-secondary education in reverse chronological order. Do not include secondary school / high school unless you attended a school that is genuinely notable (Eton, Harrow, Phillips Exeter) and you are applying within the last one to two years of graduation.

**Step 4 — Experience bullets.** This is where most resumes fail or succeed. Work backwards from the job description: what verbs do they use? "Manage", "analyse", "develop", "lead" — use those exact verbs. Write each bullet in the form: [action verb] [what you did] [result or scale]. Cut the bullet to the minimum words that preserve the meaning. "Was responsible for the management of a team of four analysts" becomes "Managed four analysts."

**Step 5 — Skills, publications, languages.** Fill in only what is genuinely true. Do not list skills you would struggle to demonstrate in an interview.

<aside class="tip">
One thing I have seen consistently across the resumes I review for clients: the experience bullets read as job descriptions rather than achievements. "Responsible for client communication" is a job description. "Managed weekly communication with eight enterprise clients during a product migration, maintaining a 97% satisfaction score" is an achievement. Before you finalise the template, go through every bullet and ask: would a recruiter find this impressive or just informative? If the answer is just informative, add a number, a scale, or an outcome. The Harvard OCS puts it plainly in their guide: quantify whenever possible. This is the single highest-leverage improvement you can make to any resume in any format.
</aside>

## Common mistakes

**Mistake 1: Objective statement instead of summary.** An objective statement says what you want: "Seeking a challenging role in finance where I can grow." A professional summary says what you offer: "CFA Level 1 candidate with two summers of equity research experience at a US asset manager, specialising in consumer sector coverage." Objective statements are a relic from the 1990s. Replace every instance with a summary.

**Mistake 2: Duties-based bullets.** The most common single error. Writing what your job was rather than what you did in it. The distinction matters enormously to a recruiter: they can read a job description themselves; they cannot read what you specifically achieved. Every bullet should contain an action and either a result or a scale.

**Mistake 3: Inconsistent formatting.** Using bold for some company names but not others. Inconsistent date formats (some "September 2023", some "Sept. 2023"). Different bullet styles in different sections. Inconsistent spacing. This signals inattention to detail, which is a fatal signal for roles in finance, law, and consulting where attention to detail is an explicit requirement.

**Mistake 4: Including references.** "References available upon request" is a four-word phrase that adds nothing and costs a full line of your one-page budget. Employers know you will provide references when asked. Leave it off.

**Mistake 5: Using the same resume for every application.** The Harvard format is a structure, not a fixed document. The summary, the ordering of bullet points, and the emphasis in the skills section should change to reflect each specific application. A resume for a data analyst role and a resume for a marketing manager role should read noticeably differently, even if the underlying experience is the same.

## Worked example

Priya Ramanathan is applying for a full-time analyst role at a London-based investment bank following her Harvard College AB in Economics, graduating in May 2024 cum laude.

Her Education section leads: Harvard College, AB Economics, May 2024, cum laude, GPA 3.87. She lists relevant coursework: Econometrics, Corporate Finance, Empirical Methods in Economics.

Her most significant experience entry is Goldman Sachs Summer Analyst, Securities Division, New York, June–August 2023. Her bullet points read: "Built a Python-based reconciliation tool that reduced daily margin call processing time by 40%, saving an estimated 12 analyst-hours per week." "Prepared daily profit-and-loss attribution reports for a $2.8 billion portfolio across 14 asset classes." "Coordinated with operations team across New York and London time zones to resolve 23 settlement exceptions during the programme."

The summary reads: "Economics graduate (Harvard College, cum laude) with experience in securities operations and financial modelling; seeking full-time analyst role in equities or fixed income at a global investment bank."

Skills section includes Python, Excel (advanced), Bloomberg Terminal, and Mandarin (professional working proficiency). The entire document fits on one page at 0.75-inch margins and 11pt Garamond.

## How long to keep it current

A resume is a living document. Update it within a week of completing a significant project, not six months later when you are applying for your next role and struggling to remember what you did. Most people update their resumes in a panic, which is why most resumes are vague — the details were not recorded when they were fresh. The practical rule: after any significant achievement, project completion, or promotion, open the resume template and add the bullet point immediately.
