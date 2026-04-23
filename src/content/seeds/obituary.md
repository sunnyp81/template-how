---
node: life-event-templates
title: 'Obituary Template — Free (US + UK Formats)'
h1: 'Obituary Template'
definitionalLede: 'An obituary template is a structured document for writing a death notice that records a person''s life, family, and service details for publication in print or online.'
primaryKeyword: 'obituary template'
searchVolume: 22000
difficulty: 4
renderer: legal-document
related:
  - eulogy
  - death-notice
  - funeral-programme
  - sympathy-card
crossCluster:
  - bill-of-sale
  - lesson-plan
audience: [us, uk]
wordCountFloor: 1800
sources:
  - title: 'The Guardian — Obituaries Submission Guide'
    url: 'https://www.theguardian.com/news/2001/aug/27/obituaries'
    accessed: '2026-04-23'
  - title: 'NFDA — National Funeral Directors Association Resources'
    url: 'https://www.nfda.org/consumer-resources'
    accessed: '2026-04-23'
updated: '2026-04-23'
howTo:
  name: 'How to write an obituary using this template'
  steps:
    - name: 'Fill in the basic facts'
      text: 'Start with the person''s full name, date of birth, date of death, and place of passing. These are the factual foundation of the obituary and should be stated clearly in the opening sentence or paragraph.'
    - name: 'List immediate family members'
      text: 'State who the person is survived by — spouse, children, grandchildren, siblings — and who preceded them in death if relevant (parents, a spouse). Use the person''s relationship to the deceased, not the other way around. "She is survived by her husband David" not "David survives his wife."'
    - name: 'Write the life narrative'
      text: 'Two to four paragraphs covering career, military service if applicable, community involvement, hobbies, faith, and character. Draw on specific memories, achievements, and qualities rather than generalities. Specific details — the school they taught at, the regiment they served in, the garden they spent forty years tending — make an obituary worth reading.'
    - name: 'Include service details'
      text: 'List the funeral or memorial service date, time, and location. Include the name of the officiant or celebrant if known. Note whether the service is public or private. Include any visitation or wake details.'
    - name: 'Add memorial donation information'
      text: 'If the family has requested donations to a charity in lieu of flowers, name the charity and provide the URL or mailing address. This is standard practice in both UK and US obituaries and ensures donations reach the intended recipient.'
faq:
  - q: 'How long should an obituary be?'
    a: 'Between 200 and 600 words is the standard range for a newspaper obituary. Shorter death notices (50–100 words) focus on basic facts and service details only. Longer tributes (600+ words) are appropriate for public figures, full-page feature obituaries in broadsheets, and online platforms with no space constraints. Most family-written obituaries for local newspapers run 300–400 words.'
  - q: 'What is the difference between an obituary and a death notice?'
    a: 'A death notice is a brief factual announcement — typically 50–100 words — stating that a person has died, listing survivors and service details. An obituary is a fuller account of the person''s life. Death notices are usually placed by the funeral home; obituaries are usually written by the family or, for public figures, by the newspaper''s own writers.'
  - q: 'How much does it cost to publish an obituary?'
    a: 'In the UK, national broadsheets charge between £200 and £400 for a standard family-written obituary (The Times, The Telegraph). Local papers vary widely — some are free, some charge £50–£100. In the US, major metro papers charge $500–$1,500 or more for print publication; online-only obituary platforms such as Legacy.com and Tributes.com offer free listings or premium upgrades. Many funeral homes include online obituary hosting as part of their service.'
  - q: 'Should I include cause of death?'
    a: 'This is a personal decision. Many obituaries omit cause of death entirely, particularly for sudden deaths, mental health circumstances, or where the family prefers privacy. When cause of death is included, it is typically phrased as "passed away after a brief illness" or "died suddenly". Including it directly (e.g., cancer, heart failure) is also common and can help reduce speculation among acquaintances.'
  - q: 'How do obituary conventions differ across religious traditions?'
    a: 'Christian obituaries typically include church affiliation, reference to faith, and church service details. Jewish obituaries may note the Hebrew name, include "of blessed memory" (z''l), and note Shiva sitting hours. Muslim obituaries typically note the faith community, omit detailed biographical narrative in favour of prayers, and note Salah al-Janazah times. Hindu obituaries may note the ceremony location and timing and include reference to the soul''s journey. Secular obituaries focus on life, relationships, and contributions without religious framing. The template accommodates all of these by keeping the religious fields optional.'
  - q: 'Can I write the obituary myself rather than using the funeral home''s template?'
    a: 'Yes, and most families who write their own obituaries produce more personal, readable results than the standard funeral home template. The funeral home''s template tends to produce generic, formulaic text. Writing it yourself, even from a structured template like this one, results in an obituary that captures who the person actually was. The funeral home will typically handle publication if you provide the text.'
  - q: 'Should I include a photo?'
    a: 'Yes, if publishing online. A photograph makes the obituary more personal and more searchable. For print, photos incur additional cost and space. If including a photo, choose one that represents the person well at a age they would recognise — a recent photo or one from a meaningful period of their life. Avoid passport photos.'
  - q: 'How do I handle a digital obituary versus a print obituary?'
    a: 'Digital obituaries have no word limit and can include multiple photos, video tributes, and a comments or condolences section for family and friends to share memories. Print obituaries are constrained by word count and cost. Write the full version first for digital publication, then trim to the newspaper''s word limit for the print version. Many families publish the full obituary on a funeral home or Legacy.com page and run a shorter version in the local paper.'
  - q: 'What should I not include in an obituary?'
    a: 'Do not include information that would embarrass living family members or that the deceased would not have wanted public — estrangements, legal troubles that were private, causes of death the family wishes to keep private. Do not include addresses (for security reasons — funeral announcements can attract burglars). For public figures, do not omit significant aspects of their life simply because they are inconvenient; objectivity is expected for editorial obituaries.'
  - q: 'How soon after death should an obituary be published?'
    a: 'Within a week for a newspaper obituary, ideally within two to three days if there is a service for which you want to draw attendance. Online obituaries can be published within hours of death. If the family needs time, there is no rule against publishing the obituary after the service — many families do so, using it as a tribute rather than a practical service announcement.'
builderSchema:
  slug: obituary
  title: 'Obituary'
  renderer: legal-document
  sections:
    - id: deceased
      heading: 'Deceased Information'
      fields:
        - { id: full_name, label: 'Full name', type: text, required: true }
        - { id: date_of_birth, label: 'Date of birth', type: date, required: true }
        - { id: date_of_death, label: 'Date of death', type: date, required: true }
        - { id: place_of_passing, label: 'Place of passing (city, county/state)', type: text, required: true }
        - { id: age, label: 'Age at death', type: number, required: false }
    - id: family
      heading: 'Family'
      fields:
        - { id: spouse, label: 'Spouse / partner name (if applicable)', type: text, required: false }
        - { id: parents, label: 'Parents (if listing; note if predeceased)', type: textarea, required: false }
        - { id: children, label: 'Children (names; note if predeceased)', type: textarea, required: false }
        - { id: grandchildren, label: 'Grandchildren (number or names)', type: text, required: false }
        - { id: siblings, label: 'Siblings (names; note if predeceased)', type: textarea, required: false }
    - id: life
      heading: 'Life Highlights'
      fields:
        - { id: career, label: 'Career and professional life', type: textarea, required: false }
        - { id: service, label: 'Military or community service', type: textarea, required: false }
        - { id: hobbies, label: 'Hobbies, interests, passions', type: textarea, required: false }
        - { id: faith, label: 'Faith community (optional)', type: text, required: false }
        - { id: character, label: 'Personal qualities and memories', type: textarea, required: false }
    - id: service_details
      heading: 'Service Details'
      fields:
        - { id: service_date, label: 'Service date', type: date, required: false }
        - { id: service_time, label: 'Service time', type: text, required: false }
        - { id: service_location, label: 'Service location (name and address)', type: textarea, required: false }
        - { id: officiant, label: 'Officiant / celebrant name (optional)', type: text, required: false }
        - { id: reception, label: 'Reception / wake details (optional)', type: textarea, required: false }
    - id: donations
      heading: 'Memorial Donations'
      fields:
        - { id: charity_name, label: 'Charity name (optional)', type: text, required: false }
        - { id: charity_url, label: 'Charity website URL (optional)', type: text, required: false }
---

## What an obituary is, and what it is for

An obituary is a permanent record of a life. Not a form to fill in, not a legal notice, not a press release — a record, in words, of who someone was, what they did, and who they leave behind. It is one of the few pieces of writing that will exist in archives and memory long after everything else about the administrative process of dying has been completed and filed.

Templates help when words are the hardest part. In the days after a death, the people best placed to write an obituary — the people who knew the deceased most deeply — are also the people least able to think clearly. A structured template does not replace the writing; it removes the paralysis. It tells you what information you need, in what order, so the words can be about the person rather than about working out what goes where.

The obituary serves three practical purposes beyond its emotional function. It announces the service, giving friends and acquaintances the chance to attend or to send condolences. It provides a historical record — obituaries in newspapers of record are the most commonly cited sources for basic biographical facts in family genealogy research. And it thanks and acknowledges the people and institutions that formed the person's life: their school, their employer, their faith community, their friends.

Both US and UK obituaries follow the same broad structure, though the conventions differ slightly in tone and length. American obituaries tend to be longer and more comprehensive, listing extended family members and community affiliations in detail. British obituaries, particularly those in national broadsheets, tend to be more literary in style — they read as assessed judgements of a life rather than biographical catalogues. This template works for both approaches; the difference is in how you write the life narrative section, not in the template's structure.

## When to use this template

**Family-written newspaper obituary.** The most common use. The funeral home may provide a template, but family-written obituaries using a structured guide produce more personal results. This template provides the structure while leaving the voice entirely to the writer.

**Online memorial obituary.** Platforms like Legacy.com, Funeral Guide (UK), and individual funeral home websites publish online obituaries with no word limit. The digital format allows multiple photos, video messages, and a condolences section. The template's full structure is appropriate for this format without any trimming.

**Funeral programme insert.** A shorter version of the obituary — typically 150 to 250 words — is included in the order of service printed for the funeral or memorial. The template's core fields (name, dates, family, brief life summary, service details) provide the source material for the condensed version.

**Tribute for a parish or community newsletter.** Churches, village halls, sporting clubs, professional associations — many community organisations publish brief tributes for members who have died. The life highlights section of this template is the relevant source material.

**Advance planning.** Some families prepare obituary drafts for elderly relatives with their involvement — gathering accurate dates, family names, and career details while the person can confirm them. An obituary drafted with the person's participation is both more accurate and often more meaningful than one written under the pressure of grief.

## What it must include

The five non-negotiable elements of any obituary:

**Full name and dates.** The person's complete name (including maiden name where relevant, middle name if used), exact date of birth, and date of death. This is the genealogical record. Future researchers — grandchildren, historians, biographers — will rely on these details being accurate.

**Survivors and predeceased family.** Who the person leaves behind. The convention is to list survivors first, in order of closeness: spouse or partner, children (with spouses or partners noted), grandchildren, siblings. People who predeceased are noted separately: "She was predeceased by her parents, Joseph and Helen, and by her brother Michael." Do not include every cousin — limit to the immediate family relationships that the deceased would have considered central to their life.

**Life narrative.** The section that makes the obituary worth reading. Two to four paragraphs covering career (not a full work history — the defining chapters), community involvement, faith if significant, passions and hobbies, and character. Specific details make this section work: the name of the school they taught at for thirty years, the title of the book they published, the charity they co-founded, the hill they climbed every year until the age of eighty. Generalities ("she loved her family and her community") are true of almost everyone; specifics are true only of this person.

**Service information.** Date, time, and location of the funeral or memorial service. Whether it is open to all or private. Any reception or wake details. Without this information, the practical function of the obituary — announcing the service — is unfulfilled.

**Memorial donation information.** If the family has requested charitable donations in lieu of flowers, the charity name and how to donate. This is an increasingly standard element of modern obituaries in both the US and UK, and many families find it a meaningful way to honour the deceased's interests and values.

## Variants you will encounter

**Death notice.** The shortest form — 50 to 100 words — announcing the fact of death and the service details, typically placed by the funeral home. No life narrative, minimal family listing. The template's service details section provides the source for this format.

**Tribute obituary (broadsheet style).** For public figures, newspapers of record — The Times, The Guardian, The New York Times, The Washington Post — publish full editorial obituaries of 600 to 1,200 words written by their own journalists. These are assessed biographical pieces, not family announcements. The template here is for family-written obituaries; broadsheet-style tribute writing follows journalistic rather than template conventions.

**Social media memorial post.** A short tribute posted on the deceased's own Facebook or Instagram page, or shared by family members. Typically 100 to 300 words with one or more photographs. Tone is personal and conversational rather than formal. The template's family and life highlights sections provide the source material.

**Memorial website.** A dedicated page on platforms like Forever Missed, GoneButNotForgotten, or a funeral home site. The full template content is appropriate, with additional photos, audio, or video.

## Step-by-step: using the template

**Step 1 — Gather the facts before writing.** Collect the exact dates (birth certificate if available, death certificate for the death date), full name including any name changes, and family names with correct spellings. Confirm the service details with the funeral home. Errors in an obituary — wrong dates, misspelled family names — are painful and, once published, permanent.

**Step 2 — Write the opening sentence.** The convention is: "[Full name], aged [age], of [place], died on [date]." Or: "[Full name], [brief identifier — 'a primary school teacher', 'a retired RAF officer', 'a beloved husband and father'], died peacefully at [location] on [date]." The identifier in the second version does a great deal of work — it orients the reader immediately.

**Step 3 — Write the family section.** Use the template fields. Name the people. Do not reduce them to numbers ("she is survived by two children") unless space is extremely tight — names make the obituary human.

**Step 4 — Write the life narrative.** This is the section where most families struggle. Start with the facts and add one specific memory or detail per paragraph. If you are stuck, ask other family members: "What is one specific thing you will always remember about them?" The answers are usually the material for this section.

**Step 5 — Add service details and donation information.** Confirm these with the funeral home. Double-check spelling of the service venue and the charity name. A donation link that is wrong is a donation that never arrives.

<aside class="tip">
One thing I have noticed across many obituaries I have helped families draft: the most useful thing to do before writing is to sit with a family member and ask them to tell you one specific story about the deceased. Not a general description — a specific story, with a specific day, specific words, specific details. Those stories are almost always the heart of the best obituaries. The template gives you the structure; the stories give you the substance. Often the family has ten of them and just needs to be asked.
</aside>

## Common mistakes

**Mistake 1: Writing in generalities.** "She was a wonderful mother and a beloved friend" could describe millions of people. "She drove to school every morning to make sure her grandchildren had a hot breakfast before class" describes one person. Every paragraph in the life narrative should contain at least one specific detail that is uniquely true of this individual.

**Mistake 2: Incorrect family listing.** Getting a family member's name wrong, omitting someone who should be listed, or failing to note a predeceased member — these cause lasting upset. Read the family section back to more than one family member before publication. Names and relationships need to be verified, not guessed.

**Mistake 3: Including address details.** Do not include the family home address in a publicly published obituary. Obituary announcements are a known target for opportunistic burglars who know a property will be unoccupied during a funeral. "Of Dorchester" as a general location is appropriate; the street address is not.

**Mistake 4: Rushing the writing.** The practical deadline pressure of a newspaper submission deadline can push families to produce an obituary that they are not satisfied with. If possible, write a draft, share it with two or three family members, and revise. The five minutes of revision time is always worth it.

**Mistake 5: Omitting the service location detail.** Listing the date and time but not the full location of the service means some people will not be able to attend. Include the full name, street, and town of the venue.

## Worked example

Margaret Ellen Harrington, born 12 September 1938, of Dorchester, Dorset, died peacefully at home on 14 April 2026, aged 87.

Margaret trained as a teacher at Salisbury College of Education and spent thirty-four years teaching primary school children at St Mary's Church of England Primary School in Dorchester, retiring as deputy headteacher in 2001. Former pupils still write to the school to describe her patience, her unfailingly tidy handwriting, and her particular gift for helping children who found reading difficult. She was a founding member of the Dorchester Reading Charity, which she chaired for twelve years.

She was a devoted member of All Saints Church, Dorchester, and sang in the choir for over forty years. Her garden, which she tended with enthusiasm until last autumn, was a source of considerable pride and regular open-garden visits for the local horticultural society.

Margaret is survived by her husband of sixty-one years, David John Harrington; by her children Thomas David (b. 1962), of Exeter, and Claire Margaret (b. 1965), of Salisbury; and by seven grandchildren. She was predeceased by her parents, Harold and Edith Ferris.

A funeral service will be held at All Saints Church, Dorchester, on Friday 2 May 2026 at 2:00 pm, conducted by the Reverend Sarah Lowes. The service is open to all who knew Margaret. A reception will follow at the Church Hall.

The family requests that donations in Margaret's memory be made to Marie Curie, whose hospice nurses provided such compassionate care in her final weeks. Donations may be made at mariecurie.org.uk.

The obituary was reviewed by three family members before submission, and corrected twice — once to get the retirement year right (2001, not 2003) and once to verify the spelling of one grandchild's name. Both corrections were easy to make before publication and would have been painful after.
