---
node: resume-templates
title: 'Cover Letter Template Google Docs — Free & Editable'
h1: 'Cover Letter Template for Google Docs'
definitionalLede: 'A cover letter is a one-page document submitted alongside a CV or resume that explains why you are applying for a specific role and what makes you the right candidate — going beyond the career history on your resume to address the employer''s actual question.'
primaryKeyword: 'cover letter template google docs'
searchVolume: 9900
difficulty: 1
renderer: letter
related:
  - harvard-resume
  - cover-letter-google-docs
  - ats-resume
  - google-docs-resume
  - two-weeks-notice
crossCluster:
  - letter-of-recommendation
audience: [us, uk]
wordCountFloor: 1800
sources:
  - title: 'US DOL CareerOneStop — Cover Letter Guide'
    url: 'https://www.careeronestop.org/JobSearch/Plan-Your-Job-Search/cover-letters.aspx'
    accessed: '2026-04-23'
  - title: 'UK National Careers Service — Writing a Covering Letter'
    url: 'https://nationalcareers.service.gov.uk/careers-advice/covering-letter'
    accessed: '2026-04-23'
updated: '2026-04-23'
howTo:
  name: 'How to write a cover letter in Google Docs'
  steps:
    - name: 'Open the template and set up your contact header'
      text: 'Replace the placeholder name, address, email, and phone with your own details. Add a professional email address — a Gmail or Outlook address is fine; a university email or custom domain is better. Include a LinkedIn URL if your profile is complete.'
    - name: 'Address the hiring manager by name'
      text: 'Look up the hiring manager''s name on LinkedIn, the company website, or by calling reception. "Dear Mr. Thompson" outperforms "Dear Hiring Manager" in opening impression. If you genuinely cannot find a name, "Dear [Job Title] Hiring Team" is more specific than "To Whom It May Concern."'
    - name: 'Write an opening that earns attention'
      text: 'Do not open with "I am writing to apply for..." — it wastes the first sentence. Open with something specific about the company or role that shows you have done your research, then connect it to your reason for applying.'
    - name: 'Write two or three paragraphs matching your experience to the role'
      text: 'Each paragraph should address one specific requirement from the job description with a concrete example from your career. Use numbers wherever possible: revenue generated, team size managed, percentage improvements achieved.'
    - name: 'Close with a direct call to action'
      text: 'Request an interview or a conversation. State your availability. Confirm you have attached your CV. Sign off formally: "Yours sincerely" (UK, when you know the name) or "Sincerely" (US).'
faq:
  - q: 'How long should a cover letter be?'
    a: 'One page. Not one page of dense text — a comfortably readable page with margins and white space. Typically three to five paragraphs. In both the US and UK, the convention is single page; anything longer signals that the writer does not know how to edit themselves, which is itself informative.'
  - q: 'Should I submit as a Google Doc, a PDF, or a DOCX?'
    a: 'Export as PDF for most submissions. A PDF looks the same on every device and cannot be accidentally edited. Export as DOCX only if the application specifically requests it — some ATS systems parse DOCX slightly more reliably than PDF, though for cover letters this rarely matters. Google Docs exports both from File → Download. Do not share the Google Doc link itself unless specifically requested.'
  - q: 'Does the cover letter need to match the CV formatting?'
    a: 'Yes — use the same fonts, header style, and margins as your CV. A mismatched set looks like they came from different applications. If your CV is in Calibri 11pt with 2.5cm margins, your cover letter should match.'
  - q: 'How do I address the letter when I do not know the hiring manager''s name?'
    a: '"Dear Hiring Manager" is acceptable. "Dear [Job Title] Hiring Team" is slightly better. "To Whom It May Concern" reads as generic and low-effort. In the UK, "Dear Sir or Madam" is an old convention still occasionally seen; it is not wrong, but it sounds dated. Five minutes on LinkedIn will usually yield a name — it is worth the effort.'
  - q: 'Should I repeat what is on my CV in the cover letter?'
    a: 'No. The cover letter and the CV are two different documents with two different functions. The CV is a record of your career. The cover letter is an argument for why you are the right person for this specific role. Choose one or two items from your CV and expand on them with context and narrative. Everything else on your CV can speak for itself.'
  - q: 'What do I do if the job listing has no description?'
    a: 'Research the company to understand what the role likely involves. Check the company''s LinkedIn page for similar roles. If it is a small company, look at their product or service and think about what skills their stage of growth requires. Mention what drew you to the company specifically — their mission, their product, their market position. A cover letter for a role with no description is mostly about demonstrating genuine interest and cultural fit rather than ticking specific skill boxes.'
  - q: 'Is a cover letter necessary when applying through an online portal?'
    a: 'It depends on the company. Many online applications have a cover letter field that is technically optional; leaving it blank is increasingly common. Filling it in is still the better choice for roles you genuinely want — it distinguishes you from the significant majority who skip it. For large-volume graduate recruitment at major firms, a strong cover letter can be the difference between interview and rejection when two candidates are otherwise equal.'
  - q: 'What is the correct follow-up etiquette after submitting?'
    a: 'Wait at least five to seven business days after the stated deadline before following up. A brief, polite email confirming receipt and reiterating your interest is appropriate. More than one follow-up without a response is not. UK hiring norms tend toward slightly less aggressive follow-up than US norms; adjust accordingly.'
builderSchema:
  slug: cover-letter-google-docs
  title: 'Cover Letter'
  renderer: letter
  sections:
    - id: sender
      heading: 'Your details'
      fields:
        - { id: sender_name, label: 'Your full name', type: text, required: true }
        - { id: sender_address, label: 'Your address', type: textarea, required: true }
        - { id: sender_email, label: 'Email address', type: text, required: true }
        - { id: sender_phone, label: 'Phone number', type: text, required: true }
        - { id: sender_linkedin, label: 'LinkedIn URL (optional)', type: text, required: false }
        - { id: letter_date, label: 'Date', type: date, required: true }
    - id: recipient
      heading: 'Recipient details'
      fields:
        - { id: manager_name, label: 'Hiring manager name', type: text, required: false }
        - { id: company_name, label: 'Company name', type: text, required: true }
        - { id: company_address, label: 'Company address', type: textarea, required: false }
        - { id: role_title, label: 'Role you are applying for', type: text, required: true }
    - id: opening
      heading: 'Opening paragraph'
      fields:
        - { id: hook, label: 'Opening hook (specific detail about company or role)', type: textarea, required: true }
    - id: middle
      heading: 'Middle section'
      fields:
        - { id: paragraph_one, label: 'First body paragraph (key match to role requirement)', type: textarea, required: true }
        - { id: paragraph_two, label: 'Second body paragraph (second strength or example)', type: textarea, required: true }
        - { id: paragraph_three, label: 'Third body paragraph (optional)', type: textarea, required: false }
    - id: closing
      heading: 'Closing'
      fields:
        - { id: cta, label: 'Call to action and availability', type: textarea, required: true }
        - { id: signature_style, label: 'Sign-off', type: select, required: true, options: [{ value: sincerely, label: 'Yours sincerely (UK — named recipient)' }, { value: faithfully, label: 'Yours faithfully (UK — unnamed recipient)' }, { value: sincerely_us, label: 'Sincerely (US)' }] }
---

## What a cover letter is actually for

A cover letter has one function: to explain why you, specifically, are the right person for this role, at this company, at this moment. It is not a retelling of your CV. It is not a list of your strengths. It is not a generic statement of interest. It is an argument, and like all arguments, it needs a claim, evidence, and a conclusion.

The most important word in that sentence is "argument." Not "summary." Not "introduction." An argument takes a position and supports it. The position your cover letter takes is: "I am the right hire." The evidence is specific, verifiable examples from your career. The conclusion is a request for an interview.

Most cover letters fail because they make no argument at all. They describe what the candidate has done without ever connecting it to what the employer needs. Reading the job description and matching your experience to it, point by point, is the minimum. The best cover letters go further: they demonstrate that the candidate understands the company's situation, not just the job's requirements.

## Why Google Docs works well for cover letters

Google Docs is the right tool for cover letters for several practical reasons. It is free, it saves automatically, it exports cleanly to both PDF and DOCX, and it is accessible from any device. The collaborative editing feature means you can share a draft with a trusted reviewer without emailing attachments.

The practical workflow: write and edit in Google Docs, export as PDF when ready to submit. File → Download → PDF Document. The PDF preserves your formatting exactly, regardless of what device or operating system the recipient uses. A DOCX file can shift formatting when opened in a different version of Word or on a different operating system. A PDF does not.

One technical note: Google Docs uses Roboto or Google Fonts variants by default in newer documents. If you want fonts that match standard professional documents — Calibri, Georgia, Times New Roman — you will need to select them manually. For cover letters, Georgia (serif, professional) and Calibri (sans-serif, clean) are both appropriate. Avoid decorative fonts entirely.

## When you need one

**Any application where a cover letter is requested.** This sounds obvious, but roughly 40% of candidates skip cover letters when they are marked "optional." Optional means the employer would like one but does not want to exclude candidates who do not include one. It does not mean the letter is irrelevant.

**Applications to smaller companies and direct applications.** At companies that do not use ATS software (typically under 50 employees), a human reads every application. A strong cover letter here has a materially higher impact than it does in a large-volume application process where the ATS filters first.

**Career changes.** If your CV does not directly match the job description — because you are moving industry, function, or level — a cover letter is where you explain the logic of the transition. Without one, the gap between your experience and the role's requirements is unexplained. With one, it is addressed directly.

**Applications to prestigious or competitive programmes.** Management consulting, investment banking, law, and other competitive graduate employers read cover letters carefully. For these applications, the cover letter is not supplementary — it is part of the evidence. The format they expect is specific: three to four short paragraphs, no fluff, evidence-led.

## What it must include

**A specific opening.** The first sentence is the most important sentence in the letter. Do not waste it. The worst possible first sentence is "I am writing to apply for the position of [X] as advertised on [Y]." Every other candidate opened the same way. An opening that references something specific — a recent company announcement, a product you use, a challenge the company has been discussing publicly — immediately signals that this letter was not written for a hundred applications.

**Your contact details at the top.** Name, address (or just city/region), email, phone. In the UK, adding the date is standard. In the US, the date goes above the recipient's address. Match the header style to your CV.

**The recipient's details.** Company name, hiring manager's name (if known), their role, and the company's address. In the UK, this is standard business letter format. In the US, particularly for email applications, the recipient details are sometimes omitted.

**Two to three focused body paragraphs.** Each paragraph should do one thing: match a requirement from the job description with evidence from your career. Keep each paragraph to three to five sentences. White space is good; dense paragraphs are not.

**A direct closing.** Request an interview. State your availability. Mention that your CV is attached. Use a formal sign-off. In the UK: "Yours sincerely" when you know the name, "Yours faithfully" when you do not. In the US: "Sincerely" or "Best regards."

## Variants

**Email cover letter.** A shorter version sent in the body of an email rather than as an attachment. Same structure, shorter execution — typically three paragraphs. Subject line: "Application: [Role Title] — [Your Name]." Attach the CV and, if required, a separate cover letter document.

**Academic cover letter.** For research, teaching, or academic professional roles. Different in focus: emphasises research agenda, teaching philosophy, and publication record. Typically two pages. Different from a standard professional cover letter in both length and register.

**Cold application cover letter.** Written when there is no open position advertised. Opens by explaining why you are writing speculatively, demonstrates knowledge of the company, identifies the gap you could fill, and asks for a conversation rather than an interview. Harder to write, but occasionally more effective than responding to an advertised role because you have less competition.

**Internal application letter.** For roles within your current employer. Shorter, less explanatory about context the reader already knows, and more directly focused on why the specific role is the right next step.

## Step-by-step: filling in the Google Docs template

**Step 1 — Replace the header.** Fill in your name, address, contact details, and the date. Then add the recipient's details below, following the standard business letter format. Use the same font and size throughout.

**Step 2 — Write the opening line first, not the header.** The most common block when writing cover letters is staring at the blank body paragraph. Skip the formalities and write the opening sentence first. Something like: "Stripe's 2024 engineering blog post on API latency optimisation is the reason this application exists" — if that is true. If you have a genuine reason for applying, start with it.

**Step 3 — Copy the job description into a separate tab or document.** Underline or highlight the key requirements. These become the skeleton of your body paragraphs. Each key requirement gets a paragraph that acknowledges it and provides your evidence.

**Step 4 — Write each body paragraph as a mini-argument.** Structure: state the skill or quality → provide the specific example → quantify the outcome where possible. "At Barclays, I reduced the time-to-deploy for our core analytics pipeline from 14 days to 3, cutting rollback incidents by 60%" is a mini-argument. It names the company, describes the action, and quantifies the result.

**Step 5 — Close clearly.** Do not tail off. "I would welcome the opportunity to discuss this further at your convenience" is weak. "I am available for a 20-minute call any time between Monday and Thursday next week — please do let me know a time that suits" is a close that makes the next step easy for the reader.

**Step 6 — Export as PDF.** File → Download → PDF Document. Name the file: "FirstnameLastname_CoverLetter_CompanyName.pdf." Attach alongside your CV when submitting.

<aside class="tip">
**Expert tip:** The most common cover letter problem is not bad writing — it is writing that could apply to any job. Read your cover letter with the company name removed. If it could have been written by someone applying to ten other companies without changing a word, it is not a good cover letter. The test of a strong cover letter is specificity: it names the company's situation, references something specific about the role or the team, and connects your experience to exactly that. Five minutes of research — reading a recent company blog post, finding the hiring manager on LinkedIn, looking at a recent press release — gives you enough material to make a letter specific. Most candidates do not do this. The ones who do are immediately identifiable.
</aside>

## Common mistakes

**Mistake 1: "I" as the first word.** Starting with "I am writing to apply for..." is the most common opening line in cover letters. It is also the weakest. Starting with the company, the role, or a specific observation demonstrates that your first thought was about them, not about you.

**Mistake 2: A list of skills rather than an argument.** "I have excellent communication skills, strong attention to detail, and experience with project management" tells the reader nothing they have not read a hundred times today. Replace each claim with a piece of evidence. Skills without evidence are assertions, and assertions are discounted.

**Mistake 3: The wrong file format.** Submitting a Google Docs link (rather than exporting to PDF or DOCX) is a surprisingly common error. The reader may not have Google access, may receive a permission error, or may see your document in an incomplete state. Always export before submitting.

**Mistake 4: Not proofreading before sending.** Cover letters with the wrong company name — because they were adapted from a previous application — are rejected immediately and create a negative impression that contaminates the CV that follows. Read the letter aloud before submitting. Use "Ctrl+H" to search for the previous company's name.

**Mistake 5: Identical letters for every application.** A cover letter that was written for one application and resubmitted to ten others is a generic letter. It will read as one. The minimum customisation for each application: the opening paragraph, the specific role name, and the company name throughout. The full body should be tailored if the roles differ significantly.

## Worked example

Alex Chen is applying to Stripe for a senior backend engineer role. The job description emphasises API reliability, distributed systems experience, and ownership culture.

Alex's letter opens with a specific reference: Stripe's 2024 engineering blog post on their API uptime SLA commitments drew Alex to look deeper at the team. Alex then connects it to their application — "This commitment to reliability engineering is what I want to spend the next chapter of my career on."

The first body paragraph addresses distributed systems: at their previous role at a payments startup, Alex led the migration of a monolithic authentication service to a distributed architecture, reducing p99 latency from 420ms to 55ms across 12 million daily requests.

The second body paragraph addresses ownership: Alex describes shipping a critical bugfix at 2am during a payment outage without waiting for management approval, then presenting the post-mortem at the next all-hands — "the ownership culture you describe in your engineering handbook is not aspirational for me; it is how I already work."

The closing requests a 20-minute call, states availability for the following week, and thanks the team for considering the application.

The letter is three paragraphs of body content, just over half a page, with a specific opening and a direct close. It does not use the words "passionate" or "team player" once.
