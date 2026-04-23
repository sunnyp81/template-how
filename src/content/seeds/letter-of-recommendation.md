---
node: legal-document-templates
title: 'Letter of Recommendation Template — Free PDF & DOCX'
h1: 'Letter of Recommendation Template'
definitionalLede: 'A letter of recommendation is a formal written endorsement from someone who can speak to a candidate''s abilities, character, or professional conduct — submitted to support an application for a university place, a job, an award, or immigration status.'
primaryKeyword: 'letter of recommendation template'
searchVolume: 34000
difficulty: 8
renderer: letter
related:
  - bill-of-sale
  - resignation-letter
  - offer-letter
  - nda
  - last-will
  - doctors-note
crossCluster:
  - harvard-resume
audience: [us, uk]
wordCountFloor: 1800
sources:
  - title: 'UCAS Reference Guidance for Teachers'
    url: 'https://www.ucas.com/advisers/references'
    accessed: '2026-04-23'
  - title: 'Harvard Kennedy School Admissions — Letters of Recommendation FAQ'
    url: 'https://www.hks.harvard.edu/educational-programs/masters-programs/mid-career-master-public-administration/applying/letters'
    accessed: '2026-04-23'
updated: '2026-04-23'
howTo:
  name: 'How to write a letter of recommendation'
  steps:
    - name: 'Establish your relationship to the candidate'
      text: 'In the opening paragraph, state your name, your title, your institution or organisation, and exactly how you know the candidate — including how long you have known them and in what capacity. Do not assume the reader will infer this from your signature.'
    - name: 'State the purpose of the letter'
      text: 'Name the programme, role, or opportunity the candidate is applying for. A letter written for "any opportunity" is weaker than one written for a specific application — if the candidate has told you what they are applying for, name it.'
    - name: 'Describe one or two specific examples'
      text: 'Move from general praise to concrete evidence. "She is hardworking" is unconvincing. "She submitted a 12,000-word dissertation a week early, incorporating three rounds of feedback" is evidence. Choose examples that are specific, verifiable, and relevant to the application.'
    - name: 'Make the comparative assessment'
      text: 'Recommenders with experience of many candidates should say where this person stands relative to others. "She is among the top five students I have taught in fifteen years" is a comparative assessment. It is one of the things referees can provide that the candidate cannot.'
    - name: 'Close with a direct recommendation'
      text: 'Do not trail off. End with a clear statement: "I recommend her without reservation" or "I recommend her strongly for this programme." Include your contact details and an offer to discuss further.'
faq:
  - q: 'How long should a letter of recommendation be?'
    a: 'One page for most purposes; two pages for academic applications where the recommender has substantial evidence to present. A letter under half a page reads as minimal effort; a letter over two pages risks not being read in full. Aim for four to six paragraphs.'
  - q: 'What is the difference between a letter of recommendation and a reference letter?'
    a: 'They are often used interchangeably. In US academic contexts, "letter of recommendation" is the standard term. In UK employment contexts, "reference" or "reference letter" is more common. The structure is nearly identical — the main difference is tone, with academic letters tending toward more formal language and greater length.'
  - q: 'Can you write your own letter for the referee to sign?'
    a: 'Yes — many referees will ask candidates to provide a draft, particularly for academic letters. If you are asked to write your own draft, be honest and specific, resist the urge to make claims you know are exaggerated, and write in the first person from your referee''s perspective. Hand it over clearly labelled as a draft for their review and modification. A good referee will edit substantively, not just sign.'
  - q: 'How do you ask a professor for a recommendation letter?'
    a: 'Ask in person or by email, at least four to six weeks before the deadline. Provide: the deadline, the specific programme or role you are applying for, your CV or resume, a list of your key achievements in their course or under their supervision, and any specific points you would like them to highlight if they are comfortable doing so. Do not just forward an automated request link — that is the minimum. The more context you provide, the stronger the letter.'
  - q: 'Should a letter of recommendation be academic or employment-focused?'
    a: 'It depends on the purpose. For university and graduate school applications, an academic referee is typically expected — someone who can speak to intellectual capacity, independent thinking, and research potential. For employment, a line manager or senior colleague who can speak to professional performance and conduct is more relevant. For immigration, the requirements vary by visa category and country; some specifically require professional references, others accept academic ones.'
  - q: 'What if the relationship with the referee was difficult?'
    a: 'If there is genuine doubt about whether the referee will write positively, ask someone else. A lukewarm or ambiguous letter is worse than a strong letter from a more peripheral contact. If you must use a particular referee because they are required by the application, ask them directly: "Would you feel comfortable writing a strong letter for me?" A honest answer at this stage saves embarrassment later.'
  - q: 'Does the letter need to be submitted directly by the referee or can the candidate submit it?'
    a: 'US university applications almost always require the referee to submit directly, either through a portal or by sealed, signed envelope. UK UCAS references are also submitted by the referee through the UCAS system, not by the applicant. For employment references, practices vary — some employers accept unsealed letters, others contact the referee directly. Check the submission requirements before asking the referee to send the letter to you.'
  - q: 'Can a letter of recommendation create legal liability for the writer?'
    a: 'Yes, in two directions. A deliberately false positive letter can expose the writer to claims of negligent misrepresentation if the employer suffers loss as a result of hiring an unsuitable candidate on the basis of the letter. A negative letter that contains false statements of fact can expose the writer to defamation claims. In practice, liability claims against referees are rare but not unheard of. A referee who sticks to factual observations and comparative assessments, and avoids speculation about the candidate''s future behaviour, is well protected.'
builderSchema:
  slug: letter-of-recommendation
  title: 'Letter of Recommendation'
  renderer: letter
  sections:
    - id: referee
      heading: 'Referee information'
      fields:
        - { id: referee_name, label: 'Referee full name', type: text, required: true }
        - { id: referee_title, label: 'Title and position', type: text, required: true }
        - { id: referee_institution, label: 'Institution or organisation', type: text, required: true }
        - { id: referee_email, label: 'Email address', type: text, required: true }
        - { id: referee_phone, label: 'Phone number (optional)', type: text, required: false }
    - id: candidate
      heading: 'Candidate information'
      fields:
        - { id: candidate_name, label: 'Candidate full name', type: text, required: true }
        - { id: relationship, label: 'Relationship to candidate', type: text, required: true }
        - { id: known_duration, label: 'How long you have known them', type: text, required: true }
    - id: context
      heading: 'Application context'
      fields:
        - id: purpose
          label: 'Purpose of the letter'
          type: select
          required: true
          options:
            - { value: academic, label: 'Academic application (university / graduate school)' }
            - { value: employment, label: 'Employment application' }
            - { value: immigration, label: 'Immigration or visa application' }
            - { value: scholarship, label: 'Scholarship or award' }
            - { value: other, label: 'Other' }
        - { id: programme_or_role, label: 'Name of programme, role, or award', type: text, required: true }
    - id: body
      heading: 'Letter body'
      fields:
        - { id: anecdote, label: 'Key anecdote or achievement', type: textarea, required: true }
        - { id: strengths, label: 'Core strengths to highlight', type: textarea, required: true }
        - { id: specific_example, label: 'Specific example demonstrating those strengths', type: textarea, required: true }
    - id: closing
      heading: 'Closing'
      fields:
        - { id: signature_date, label: 'Date', type: date, required: true }
        - { id: contact_offer, label: 'Offer to discuss further (tick to include)', type: checkbox }
---

## What a letter of recommendation actually does

A letter of recommendation is not a character reference and it is not a performance review. It occupies a specific niche: a third-party account of a candidate's capabilities, written by someone who has observed those capabilities in context. The reader — an admissions committee, a hiring manager, an immigration officer — is trying to answer a question that the candidate cannot answer for themselves: "Is this person as good as they claim?"

The structural problem with applications is that candidates, by necessity, present themselves in the most favourable possible light. A personal statement or CV is the candidate's own narrative. A letter of recommendation is the check on that narrative. If the candidate says they are "an exceptional analytical thinker," the recommendation letter either provides evidence of that or it does not. When it does not, the gap between the candidate's self-assessment and their referee's evidence is itself informative.

This is why weak letters of recommendation — the ones that say "I am happy to recommend X" and nothing else — are more damaging than most candidates realise. They do not read as neutral. They read as a referee who had nothing specific to say.

## When you need one

**Graduate and professional school applications.** US graduate programmes (MBA, law school, medical school, master's, PhD) almost universally require two to three letters of recommendation. The quantity reflects the fact that US graduate admissions weigh letters heavily — sometimes as heavily as test scores. UK postgraduate applications through UCAS typically require one or two academic references. For competitive programmes (Oxbridge, Russell Group, Ivy League equivalents), the letter from a known academic in the field carries disproportionate weight.

**Competitive undergraduate programmes.** UK UCAS applications include one reference from a teacher or school counsellor — not optional, not supplementary, but a structural part of the application. US undergraduate applications to selective colleges typically require one teacher recommendation plus one counsellor recommendation, and sometimes allow a third recommendation from an additional teacher.

**Employment — senior and competitive roles.** For graduate-level and professional roles in the UK and US, formal reference letters (as distinct from informal telephone references) are common in academic, public sector, and some professional services contexts. Law firms, investment banks, and consulting firms frequently ask for references before or alongside an offer.

**Scholarships and awards.** Chevening, Rhodes, Gates Cambridge, Fulbright — all require formal letters. The quality of the recommendation letter is often the deciding factor between two otherwise comparable candidates.

**Immigration.** Many visa categories — particularly the UK's Global Talent Visa and the US EB-1A/EB-2 NIW routes — require letters from experts in the field testifying to the applicant's standing. These letters are specifically not from employers or supervisors, but from independent experts who can assess the applicant's contribution to their field.

## What it must include

A letter that leaves out any of these elements is measurably weaker:

**1. The referee's credentials and relationship to the candidate.** The reader needs to know: who is this person, why should their opinion matter, and how well do they actually know the candidate? "I am a tenured professor of applied mathematics at the University of Manchester and have taught and supervised Ms. Chen for three years" establishes both the referee's standing and the depth of knowledge behind the letter.

**2. The specific purpose.** A letter that could apply to any application is a generic letter. Name the programme, the institution, the role. This tells the reader the letter was written for them, not recycled.

**3. Concrete evidence, not general praise.** Adjectives are not evidence. "Brilliant," "exceptional," "outstanding" are adjectives that every referee uses. What is scarce — and therefore valuable — is specific, verifiable evidence. A project outcome, a grade or ranking, a particular piece of work, a moment under pressure.

**4. A comparative assessment.** "In fifteen years of teaching, she is one of the two or three students who has demonstrably changed the direction of my own thinking" is a comparative assessment. It means something. "She would be an asset to any programme" means nothing.

**5. A direct, unambiguous conclusion.** The closing paragraph should state plainly whether the referee recommends the candidate. If the referee is not willing to write "I recommend this person strongly and without reservation," they should tell the candidate that before agreeing to write the letter, not after.

## Variants

**Academic letter (professor to graduate school).** Typically the most detailed type. Discusses the candidate's intellectual qualities, their original contributions to work or research, their capacity for independent thought, and their specific suitability for academic work in the target field. A professor writing a letter for a candidate applying to a PhD programme should address the candidate's research potential specifically, not just their coursework performance.

**Professional letter (manager to employer).** Shorter and more outcome-focused than an academic letter. Emphasises measurable achievements, reliability, and conduct. Avoids effusive language; employers are experienced at discounting it. A concise, factual, specific letter from a credible source is more effective than three paragraphs of superlatives.

**Character reference.** Required in some immigration cases and in some court proceedings. Attests to the person's character, trustworthiness, and standing in their community. The writer does not need to be an employer or academic — a community leader, religious figure, or longstanding family friend can write a character reference. The structure is the same: who you are, how you know them, specific observations, conclusion.

**Immigration letter (field expert).** For Global Talent, EB-1A, or EB-2 NIW applications, the letter must demonstrate that the applicant is exceptional or of national interest. These letters are highly specific: they cite publications, patents, invited presentations, prizes, and the applicant's standing relative to others in the field. They are often three to four pages. Immigration lawyers typically help applicants select and brief their referees for these letters.

## Step-by-step

**Step 1 — Establish your relationship.** Do not assume the reader knows who you are. State your position, institution, and the nature of your relationship with the candidate in the first sentence. Be specific about how long you have known them and in what capacity.

**Step 2 — State the purpose.** Name the application. "I am writing in support of Dr. Aisha Okonkwo's application to the Harvard Kennedy School's Mid-Career MPA programme" is a purpose statement. It tells the reader this letter was written for them.

**Step 3 — Provide one or two specific examples.** This is the most important part of the letter and the part most referees handle weakly. An example should be: specific (a named project, a particular piece of work, an observed moment), concrete (what happened, what she did, what the outcome was), and relevant (connected to what the reader cares about — research potential, leadership, analytical rigour).

**Step 4 — Make the comparative assessment.** Say where this candidate ranks among the comparable group you have access to. You are the only person in the letter who can provide this. Use it.

**Step 5 — Close with a direct recommendation.** A closing that trails off ("I hope you will consider her application favourably") is weaker than a direct statement ("I recommend her strongly for this programme and would welcome any questions"). Add your direct contact information and an offer to speak further — it signals that you stand behind what you have written.

<aside class="tip">
**Expert tip:** The most common request from candidates is to ask a referee to "write whatever you think is best." Do not accept this framing if you are the candidate. The most effective approach is to send the referee a one-page briefing note that includes: the specific programme and why you are applying, the two or three qualities most relevant to the application, and a specific example for each quality that the referee could reference from their own observation. You are not writing the letter for them — you are giving them the raw material to write a good one. Most referees are busy and will welcome the structure. The ones who prefer to write from scratch will ignore it. Nothing is lost, and a significant amount is potentially gained.
</aside>

## Common mistakes

**Mistake 1: Asking too late.** Four to six weeks is the minimum. Many referees will decline or write a rushed letter if asked with less than two weeks' notice. This is one of the most preventable failures in the application process.

**Mistake 2: Asking the wrong person.** Seniority is not the only criterion. A letter from a CEO who met you once is less useful than a letter from a mid-level manager who supervised you for two years. Depth of knowledge beats prestige.

**Mistake 3: Generic letters that were not updated.** A letter written for a previous application and resubmitted without revision is usually obvious. Dates, programme names, and specific examples that do not quite fit the current application stand out. Referees should update letters for each application; candidates should make this easy by providing updated briefing notes.

**Mistake 4: Forgetting the comparative assessment.** Most letters describe the candidate. The rare, effective letter contextualises the candidate. "In my experience, the students who succeed in this programme are the ones who..." followed by a connection to the candidate's specific qualities is far more useful to an admissions committee than a list of positive traits.

**Mistake 5: Submitting without checking the format requirements.** Some programmes require the letter to be on institutional letterhead. Some require it to arrive by a specific date. Some require it to address specific questions. Read the instructions for the specific application before writing the letter.

## Worked example

Professor Helen Ward is writing a letter for Priya Ramanathan, who is applying to Oxford's MSc Economics programme. Professor Ward has been Priya's dissertation supervisor for the past three years.

The letter opens by establishing Professor Ward's position (Associate Professor of Economics, University of Edinburgh) and her relationship with Priya (academic supervisor, three years, approximately 40 hours of one-to-one contact across supervision sessions).

Professor Ward then names the application — Oxford's MSc Economics — and explains why she is writing to support it specifically.

The body of the letter addresses two points. First, Priya's econometric rigour: her senior thesis proposed a novel identification strategy for minimum-wage effects using a geographic discontinuity design near a regional border, a methodology Professor Ward had not seen applied to this question in the UK context. The thesis was accepted for presentation at the undergraduate research conference and has been cited in a working paper co-authored by two of Professor Ward's postdoctoral researchers. Second, Priya's independent research capacity: she identified the identification problem herself, came to her supervisor with a proposed solution, and defended it in seminar without prompting.

Professor Ward's comparative assessment: "In twelve years of supervising undergraduate dissertations, Priya's is the work I would have been proudest to submit as a PhD chapter."

The letter closes with a direct recommendation and an offer to speak with admissions staff by telephone.

This letter is specific, evidence-based, comparative, and conclusive. It does not use the word "exceptional" once, but it demonstrates exceptionality.
