---
node: legal-document-templates
title: "Doctor's Note Template (UK Fit Note + US Medical Leave) — Free"
h1: "Doctor's Note Template"
definitionalLede: "A doctor's note template is a formal letter from a licensed medical practitioner confirming that a patient has been assessed and is either unfit for work or requires adjustments — used by employers, schools, insurers, and government bodies to authorise absence or accommodations."
primaryKeyword: "doctors note template"
searchVolume: 9500
difficulty: 1
renderer: letter
related:
  - bill-of-sale
  - letter-of-recommendation
  - nda
  - leave-of-absence
crossCluster:
  - meeting-minutes
  - lesson-plan
audience: [us, uk]
wordCountFloor: 1800
sources:
  - title: 'NHS — Fit notes (sick notes): overview'
    url: 'https://www.gov.uk/government/publications/fit-note-guidance-for-patients-and-employees'
    accessed: '2026-04-23'
  - title: 'US Department of Labor — Family and Medical Leave Act (FMLA) Employer Guide'
    url: 'https://www.dol.gov/agencies/whd/fmla'
    accessed: '2026-04-23'
updated: '2026-04-23'
howTo:
  name: "How to complete a doctor's note template"
  steps:
    - name: 'Enter practice and practitioner details'
      text: "At the top, write the practice name, full address, telephone number, and the prescribing doctor's GMC number (UK) or state medical licence number (US). This establishes the document's authenticity."
    - name: 'Fill in patient information'
      text: "Record the patient's full legal name and date of birth. Do not include NHS number or Social Security number on a document handed to an employer — that level of detail is unnecessary and creates a data protection risk."
    - name: 'State the assessment date and clinical findings'
      text: 'Note the date the patient was seen, the presenting complaint, and the diagnosis in plain language. Avoid diagnostic codes unless required — plain English is what employers need.'
    - name: 'Specify absence or restriction dates'
      text: 'For a UK fit note, state whether the patient is "not fit for work" or "may be fit for work" with adjustments. Record the start and end dates clearly. For a US note, state the dates of required leave and any return-to-work restrictions.'
    - name: 'Sign and authenticate'
      text: 'The doctor signs and dates the note. For UK fit notes, this is done digitally via NHS systems — a printed fit note bears a unique reference number. For US notes, a wet-ink signature on practice letterhead is standard.'
faq:
  - q: "What is the difference between a UK fit note and a sick note?"
    a: "The sick note (Med 3 form) was replaced in 2010 by the fit note. Unlike the old sick note, which simply said a patient was unfit for work, the fit note allows a doctor to say the patient 'may be fit for work' with adjustments — phased return, altered hours, amended duties, or workplace adaptations. This nuance is important for employers managing long-term absence."
  - q: "Who can sign a doctor's note in the UK?"
    a: "A registered doctor (GP or hospital doctor), nurse practitioner, pharmacist, physiotherapist, occupational therapist, or podiatrist can issue a fit note in the UK following the 2022 expansion. The prescriber must be registered with their relevant regulatory body."
  - q: "Who can sign a medical leave note in the US?"
    a: "For FMLA certification, the form must be completed by a 'health care provider' as defined under FMLA regulations — typically a doctor of medicine or osteopathy, but also dentists, podiatrists, optometrists, chiropractors, and advanced practice nurses, depending on state law."
  - q: "Does an employer have to accept a doctor's note?"
    a: "In the UK, employers are legally required to accept fit notes issued by an authorised prescriber. They cannot demand proof of the diagnosis beyond what is on the note. In the US under FMLA, an employer can request certification from the employee's health care provider but cannot demand to speak to the provider directly."
  - q: "Can an employer verify a doctor's note?"
    a: "UK employers can contact the practice to confirm the note's reference number is genuine but cannot access any medical details. US employers under HIPAA cannot contact the treating provider without written patient authorisation. Some employers use occupational health referrals as an alternative route."
  - q: "Is it illegal to falsify a doctor's note?"
    a: "Yes, in both jurisdictions. In the UK, forging a medical document can constitute fraud under the Fraud Act 2006 and deception of an employer under employment law. In the US it can constitute fraud, and in many states is a criminal offence. For the doctor, issuing a false certificate risks GMC or state medical board sanction, including loss of licence."
  - q: "What happens if my absence extends beyond the fit note period?"
    a: "The doctor issues a new fit note covering the extended period. There is no legal requirement in the UK for a new note if absence is under 7 calendar days — employees self-certify for the first 7 days using an SC2 form. In the US, FMLA leave can be taken intermittently and the employer can request recertification periodically."
  - q: "Do I need a doctor's note for a return-to-work meeting?"
    a: "In the UK, a fit note can include a 'return to work' date, after which the employer can invite the employee to a return-to-work discussion without requiring another note. In the US, some employers require a fitness-for-duty certificate before the employee returns from FMLA leave — this must be job-related and consistent with business necessity."
builderSchema:
  slug: doctors-note
  title: "Doctor's Note"
  renderer: letter
  sections:
    - id: practice
      heading: 'Practice information'
      fields:
        - { id: practice_name, label: 'Practice name', type: text, required: true }
        - { id: practice_address, label: 'Practice address', type: textarea, required: true }
        - { id: practice_phone, label: 'Telephone', type: text, required: true }
        - { id: licence_number, label: 'GMC / licence number', type: text, required: true }
    - id: patient
      heading: 'Patient information'
      fields:
        - { id: patient_name, label: 'Patient full name', type: text, required: true }
        - { id: patient_dob, label: 'Date of birth', type: date, required: true }
    - id: assessment
      heading: 'Assessment'
      fields:
        - { id: assessment_date, label: 'Date seen', type: date, required: true }
        - { id: presenting_issue, label: 'Presenting complaint', type: text, required: true }
        - { id: diagnosis, label: 'Diagnosis / clinical findings', type: textarea, required: true }
        - { id: absence_from, label: 'Absence from', type: date, required: true }
        - { id: absence_to, label: 'Absence to', type: date, required: true }
    - id: recommendations
      heading: 'Recommendations'
      fields:
        - id: fitness_status
          label: 'Fitness status'
          type: select
          required: true
          options:
            - { value: not_fit, label: 'Not fit for work' }
            - { value: may_be_fit, label: 'May be fit for work with adjustments' }
        - { id: adjustments, label: 'Recommended adjustments (if applicable)', type: textarea }
        - { id: light_duties_from, label: 'Light duties from (optional)', type: date }
        - { id: full_duties_from, label: 'Full duties return date', type: date }
    - id: signature
      heading: 'Signature'
      fields:
        - { id: doctor_name, label: "Doctor's name", type: text, required: true }
        - { id: signature_date, label: 'Date signed', type: date, required: true }
---

## What a doctor's note actually does

A doctor's note is not bureaucratic padding. It is the link between a clinical assessment and the administrative world — employers, schools, insurers, courts, and benefits agencies. Done correctly, it protects the patient's confidentiality while giving the recipient exactly the information they need to act.

The UK and US systems differ significantly in structure, but both serve the same purpose: confirm that a qualified clinician has seen the patient, made an assessment, and that the patient's work situation should be adjusted accordingly.

Understanding those differences before you reach for a template matters. Using an informal letter format when your employer expects a UK fit note — or vice versa — creates unnecessary friction.

## UK fit note versus the old sick note

Before April 2010, a GP issued a Med 3 "sick note" that said, in essence, "this person cannot work." It was binary and not particularly useful to employers trying to manage absences.

The fit note replaced it. The key change is the "may be fit for work" option, which lets the doctor recommend adjustments rather than simply authorising full absence. Those adjustments might be a phased return to work (starting three days a week and building back up), altered hours (avoiding peak commute times), amended duties (no heavy lifting during a musculoskeletal recovery), or workplace adaptations (a different chair, a quieter workspace, working from home).

Employers are not legally obliged to implement the recommended adjustments — but if they cannot or will not, the fit note defaults to "not fit for work" and the absence is authorised. The practical effect is that the fit note opens a conversation between employer and employee that the old sick note never did.

Since July 2022, fit notes can be issued by a wider range of healthcare professionals beyond GPs — nurse practitioners, pharmacists, physiotherapists, occupational therapists, and podiatrists are now authorised. This was a deliberate response to GP appointment backlogs.

Fit notes are issued digitally through NHS systems and carry a unique reference number. A printed version is provided to the patient. The employer sees only the clinical opinion and recommended adjustments — not the underlying medical record.

## US: FMLA, ADA, and informal medical notes

The US does not have a national equivalent of the fit note. Medical documentation for workplace absence falls into three overlapping frameworks:

**FMLA (Family and Medical Leave Act).** Applies to employers with 50 or more employees. Employees who have worked for the company for at least 12 months and 1,250 hours are entitled to up to 12 weeks of unpaid, job-protected leave per year. The employer can require the employee to submit a completed FMLA certification form (WH-380-E for the employee's own condition). A doctor's note is not the same as an FMLA certification — it is less formal and carries less legal weight.

**ADA (Americans with Disabilities Act).** If the condition qualifies as a disability, the ADA requires reasonable accommodations. A doctor's note documenting the functional limitation (not the diagnosis) is typically sufficient to trigger the interactive accommodation process.

**Informal school and workplace notes.** For short absences, schools and many employers simply require a note confirming the patient was seen. These do not require a specific form — a signed letter on practice letterhead stating the patient's name, the dates covered, and a recommendation for absence or light duties is generally sufficient.

## When to use a doctor's note

- **Employer absence policy.** Most UK employers require self-certification (SC2 form) for absences of 7 calendar days or fewer. From day 8, a fit note is required. US policies vary by employer — many require documentation after 3 consecutive days.
- **School absence.** Primary, secondary, and further education institutions accept a doctor's note to excuse extended absence. University mitigating circumstances processes almost always require one.
- **Insurance claims.** Income protection, critical illness, and travel insurance policies may require a doctor's note confirming diagnosis and anticipated recovery period. Check the exact wording of your policy — "written confirmation" sometimes needs to come from a specialist rather than a GP.
- **Legal proceedings.** Courts occasionally require medical evidence to adjourn hearings or explain a defendant's or witness's non-attendance.
- **Benefits applications.** UK Personal Independence Payment (PIP) and Employment and Support Allowance (ESA) applications benefit from supporting letters from a treating clinician. These are separate from fit notes but follow the same documentation principles.

## What the note must include

A doctor's note that omits key fields will be rejected or questioned. These elements are non-negotiable:

1. **Practice name, address, and phone number.** The recipient needs to be able to verify the note's origin.
2. **Prescribing doctor's name and registration number.** GMC number in the UK; state medical licence number in the US.
3. **Patient's full name and date of birth.** This confirms identity without exposing sensitive identifiers like NHS or Social Security numbers.
4. **Date the patient was seen.** Not the date the note was written — the date of the clinical assessment.
5. **Clinical opinion.** In the UK, the specific fit note language: "not fit for work" or "may be fit for work." In the US, a plain-language statement of the limitation.
6. **Absence dates.** Start and end dates, or an open-ended note with a review date.
7. **Doctor's signature and date.** For UK digital fit notes, this is an authenticated electronic signature tied to the NHS reference number.

What a note should not include unless specifically required: full diagnosis, treatment details, medication names, prognosis beyond the immediate period. These are protected medical information and sharing them with an employer creates GDPR (UK) or HIPAA (US) compliance issues.

## Variants you will encounter

**Fit note (Med 3).** The standard UK form, now issued digitally. Contains the fitness assessment and any recommended adjustments.

**Private fit note.** Issued by a private GP or clinician. Equally valid legally, but employers can request verification. Note that NHS fit notes are free; private notes typically cost £20–50.

**FMLA Certification Form WH-380-E.** The formal US federal form for employee's own serious health condition. Must be completed by the health care provider, not the patient.

**School absence letter.** Shorter format confirming the date seen, reason for absence (in general terms), and expected return. Often requested by the school directly rather than via a form.

**Return-to-work clearance letter.** Confirms the patient is medically cleared to return to their duties. Some US employers require this before allowing an employee back from FMLA leave.

## Step-by-step: completing the template

**Step 1 — Practice information.** Enter the practice name, full address, and main telephone number. Add the doctor's GMC or licence number below the signature block.

**Step 2 — Patient details.** Full legal name and date of birth. Double-check the spelling of the name — a mismatch between the note and the employee's HR record causes unnecessary delays.

**Step 3 — Assessment date and findings.** Record the exact date of the consultation. Write the presenting complaint in lay terms ("viral upper respiratory tract infection", "acute lower back strain", "anxiety and low mood") rather than ICD codes. The employer is not clinically trained — plain language is more useful.

**Step 4 — Absence period.** Start date and return date. For an ongoing condition where the return date is uncertain, state a review date and note that a further certificate may be required.

**Step 5 — Fitness assessment and recommendations.** In the UK, select the fit note option. If "may be fit for work," detail the specific adjustments. In the US, describe the functional limitations and any restrictions.

**Step 6 — Sign and date.** Doctor signs. For UK NHS fit notes, the signature is applied via the digital system and a reference number is generated. Print and give to the patient.

<aside class="tip">
**Expert tip:** Patients — particularly those dealing with anxiety or depression — sometimes feel uncomfortable asking their GP for a fit note, worried the doctor will think they are "making it up." GPs are trained not to judge. If you are struggling to work and a clinician has assessed you, you are entitled to documentation of that assessment. The fit note is a clinical tool, not a favour.
</aside>

## Common mistakes

**Mistake 1: Using an informal letter when a fit note is required.** In the UK, an informal letter from a GP is not the same as a fit note and many HR departments will reject it. Always ask for the official Med 3 form.

**Mistake 2: Including the full diagnosis unnecessarily.** Employers need to know the functional impact on work capacity, not the full clinical picture. Sharing more than necessary creates data protection issues and can lead to inadvertent discrimination.

**Mistake 3: Wrong dates.** Absence dates that do not match the payroll or HR records create administrative problems. Always confirm dates before the consultation ends.

**Mistake 4: Relying on a note for FMLA when a certification form is required.** A doctor's note and an FMLA WH-380-E certification are different documents. The employer is entitled to the certification form, not just a note.

**Mistake 5: Back-dating.** A fit note can only cover a period starting from the date of the consultation, with one exception: GPs can certify retrospectively for a period before the date of the consultation in limited circumstances. Notes cannot be issued to cover a period where the clinician has no knowledge of the patient's condition during that time.

## Worked example

**Dr Sarah Khan, Riverside Family Practice, Bristol**  
17 Church Road, Clifton, Bristol BS8 2TT | Tel: 0117 974 0000 | GMC: 7654321

**Patient:** Alex Thompson, DOB 14 March 1991  
**Date seen:** 23 April 2026  
**Presenting complaint:** Viral upper respiratory tract infection  
**Assessment:** Acute onset URI with fever (38.4°C), severe sore throat, and fatigue. No bacterial signs requiring antibiotics.

**Fitness assessment:** NOT FIT FOR WORK  
**From:** 23 April 2026  **To:** 27 April 2026

**Recommendations:**  
Rest and adequate hydration for the period above. From 28 April: light duties only (home-based work or desk duties only, no client-facing work). Full duties: 2 May 2026. Review if symptoms worsen.

**Dr Sarah Khan** — Signed 23 April 2026

Alex works in retail management. The note gives the employer exactly what they need: a five-day certified absence, a light-duties period, and a clear return-to-full-duties date. The employer does not learn that Alex also disclosed a secondary concern about work-related stress during the same consultation — that is protected clinical information.

## UK and US comparison at a glance

| Element | UK fit note | US doctor's note |
|---|---|---|
| Standard form | Med 3 (digital) | No federal standard |
| Issued by | GP / authorised clinician | Any licensed health care provider |
| First 7 days | Self-certification (SC2) | Employer policy varies |
| Employer obligation | Must accept; adjustments optional | Depends on ADA / FMLA status |
| Legal framework | Statutory Sick Pay regulations | FMLA / ADA / state law |
| Cost to patient | Free (NHS) | Varies ($0–$100+) |

## How long to keep a doctor's note

UK employees should retain copies of all fit notes for at least three years — they may be relevant to any future ESA or PIP claims, and they establish a timeline if a dispute about sick pay or dismissal arises. Employers must keep sickness records for at least three years under HMRC's record-keeping requirements. In the US, FMLA records must be maintained by employers for at least three years.
