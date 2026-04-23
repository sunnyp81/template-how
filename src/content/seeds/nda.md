---
node: legal-document-templates
title: 'NDA Template — Free Non-Disclosure Agreement (US + UK)'
h1: 'NDA Template'
definitionalLede: 'An NDA (non-disclosure agreement) is a legally binding contract that prevents one or both parties from disclosing confidential information shared during a business, employment, or commercial relationship.'
primaryKeyword: 'nda template'
searchVolume: 4800
difficulty: 9
renderer: legal-document
related:
  - bill-of-sale
  - letter-of-recommendation
  - doctors-note
  - lease-agreement
  - last-will
  - eviction-notice
crossCluster:
  - harvard-resume
audience: [us, uk]
wordCountFloor: 1800
sources:
  - title: 'UK Government — Non-Disclosure Agreements Guidance'
    url: 'https://www.gov.uk/government/publications/non-disclosure-agreements/non-disclosure-agreements'
    accessed: '2026-04-23'
  - title: 'US Defend Trade Secrets Act 2016 — Cornell LII'
    url: 'https://www.law.cornell.edu/uscode/text/18/1836'
    accessed: '2026-04-23'
updated: '2026-04-23'
howTo:
  name: 'How to fill out an NDA'
  steps:
    - name: 'Identify the parties'
      text: 'Write the full legal names and addresses of the disclosing party (the one sharing information) and the receiving party (the one agreeing to keep it confidential). If either party is a company, use the registered company name and address.'
    - name: 'Define the confidential information'
      text: 'Describe in specific terms what information is covered. "All business information" is dangerously vague and may be unenforceable. Be precise: source code, financial projections, client lists, technical specifications, formulas — whatever the actual subject matter is.'
    - name: 'Set the term and purpose'
      text: 'State how long the confidentiality obligation lasts (typically 2–5 years for tech; perpetual for trade secrets) and the specific purpose for which the information is being disclosed. An NDA for a 6-week software audit is different from one for M&A due diligence.'
    - name: 'List the permitted uses and exceptions'
      text: 'Specify what the receiving party may do with the information and carve out the standard exceptions: information already public, information lawfully received from a third party, information independently developed, and disclosure required by court order or law.'
    - name: 'Confirm jurisdiction and sign'
      text: 'Choose the governing law (English law, New York law, California law, etc.). Both parties sign and date. The UK does not require notarisation; some US states may require it for certain commercial NDAs, though it is rare in practice.'
faq:
  - q: 'What is the difference between a mutual and a unilateral NDA?'
    a: 'A unilateral NDA protects one party''s information — the disclosing party shares, the receiving party is bound. A mutual NDA binds both parties to keep each other''s information confidential. Use mutual when both sides are sharing sensitive information, such as in a partnership or joint venture discussion.'
  - q: 'How long should an NDA term be?'
    a: 'Two to five years is the norm for technology and general commercial NDAs. For genuine trade secrets — formulas, long-term strategic plans, manufacturing processes — the obligation is often stated as perpetual, because the information does not stop being sensitive after five years. UK courts have upheld perpetual obligations where the information genuinely qualifies as a trade secret.'
  - q: 'Can an NDA prevent whistleblowing?'
    a: 'No. In the UK, the Public Interest Disclosure Act 1998 (PIDA) protects workers who make protected disclosures regardless of any confidentiality agreement. In the US, the Defend Trade Secrets Act 2016 includes a whistleblower immunity provision: employees cannot be held liable under an NDA for disclosing trade secrets to government authorities or attorneys when reporting suspected legal violations. Any NDA clause that attempts to override these protections is void.'
  - q: 'Are NDAs enforceable in employment?'
    a: 'Yes, within limits. Employers can use NDAs to protect legitimate business interests such as trade secrets, client lists, and proprietary processes. They cannot use NDAs to prevent employees from discussing their own terms and conditions with colleagues (a protected right under UK employment law), nor to cover up unlawful conduct. The obligation must be proportionate to the interest being protected.'
  - q: 'What are the US state law limits on NDAs in harassment and discrimination cases?'
    a: 'Several US states have enacted post-#MeToo legislation restricting NDAs that silence victims of sexual harassment and discrimination. California''s STAND Act prohibits provisions in settlement agreements that prevent disclosure of facts relating to sexual harassment, assault, or discrimination claims. New York''s GIVE Act (formerly GLAD Act) bans NDAs that prevent disclosure of any harassment, discrimination, or retaliation. Similar laws exist in Illinois, Washington, and other states. Federal NDAs cannot override these.'
  - q: 'What is a choice of law clause and why does it matter?'
    a: 'A choice of law clause specifies which jurisdiction''s courts and laws govern the contract. It matters because confidentiality law differs between states and countries. English law has a well-developed confidentiality regime and is commonly chosen for international agreements. New York and Delaware are popular US choices for commercial contracts because of their mature, predictable case law.'
  - q: 'What happens if the NDA is breached?'
    a: 'The disclosing party can apply for an injunction to stop further disclosure, claim damages for loss caused by the breach, and — for trade secrets — seek account of profits in some jurisdictions. In the US, the Defend Trade Secrets Act allows for exemplary damages (up to twice actual damages) and attorney''s fees for wilful misappropriation. Criminal penalties apply in cases of deliberate trade secret theft.'
  - q: 'What is a garden leave clause and how does it interact with an NDA?'
    a: 'Garden leave keeps an employee on the payroll but out of active work during their notice period, usually to prevent them taking client relationships or inside knowledge immediately to a competitor. It sits alongside an NDA but serves a different purpose: the NDA restricts what they can say; garden leave restricts what they can do during the notice period. The two are often used together, particularly for senior roles.'
  - q: 'Does an NDA need to be witnessed or notarised?'
    a: 'In the UK, an NDA executed as a simple contract (rather than a deed) does not need witnesses, though having witnesses adds evidentiary value. If executed as a deed (which changes enforceability timing), two witnesses are required. In the US, most commercial NDAs do not require notarisation, though some states require it for specific contracts above a certain value. Check your state''s requirements if in doubt.'
  - q: 'Can I use a template NDA or do I need a solicitor?'
    a: 'For low-stakes, short-term commercial relationships — a freelancer reviewing a product brief, a contractor doing a site visit — a well-drafted template is proportionate. For M&A negotiations, joint ventures, or employment agreements involving genuinely valuable IP, have a solicitor review the final document. The cost of a legal review is negligible against the cost of an unenforceable NDA when it actually matters.'
builderSchema:
  slug: nda
  title: 'Non-Disclosure Agreement (NDA)'
  renderer: legal-document
  sections:
    - id: parties
      heading: 'Parties'
      fields:
        - { id: disclosing_name, label: 'Disclosing party full name / company', type: text, required: true }
        - { id: disclosing_address, label: 'Disclosing party address', type: textarea, required: true }
        - { id: receiving_name, label: 'Receiving party full name / company', type: text, required: true }
        - { id: receiving_address, label: 'Receiving party address', type: textarea, required: true }
    - id: terms
      heading: 'Agreement terms'
      fields:
        - { id: effective_date, label: 'Effective date', type: date, required: true }
        - { id: term_years, label: 'Confidentiality term (years)', type: number, required: true }
        - { id: purpose, label: 'Purpose — what is being shared and why', type: textarea, required: true }
    - id: scope
      heading: 'Scope of confidentiality'
      fields:
        - { id: confidential_info, label: 'Definition of confidential information', type: textarea, required: true }
        - { id: exceptions, label: 'Exceptions (already public, lawful third party, court order)', type: textarea, required: false }
        - { id: permitted_uses, label: 'Permitted uses', type: textarea, required: false }
    - id: obligations
      heading: 'Obligations'
      fields:
        - { id: return_clause, label: 'Return or destruction of information on request', type: checkbox }
        - id: nda_type
          label: 'NDA type'
          type: select
          required: true
          options:
            - { value: mutual, label: 'Mutual (both parties bound)' }
            - { value: unilateral, label: 'Unilateral (receiving party only bound)' }
        - id: jurisdiction
          label: 'Governing law / jurisdiction'
          type: select
          required: true
          options: 'us-states+uk-nations'
    - id: signatures
      heading: 'Signatures'
      fields:
        - { id: disclosing_sig, label: 'Disclosing party signature name', type: text, required: true }
        - { id: receiving_sig, label: 'Receiving party signature name', type: text, required: true }
        - { id: sign_date, label: 'Date signed', type: date, required: true }
---

## What an NDA actually is

A non-disclosure agreement is a contract with one purpose: keeping information shared in confidence, confidential. It does not protect the underlying idea — patents and design rights do that — it protects the information itself from being passed to people who should not have it.

Most business relationships involve information you would not want your competitors, your clients' competitors, or the general public to have. Software architecture. Client lists. Pricing strategies. Product launch plans. Pre-publication research. Personal medical history shared with a specialist. An NDA creates a legal obligation on the receiving party to treat that information as confidential for a defined period, and gives the disclosing party a cause of action if it is not.

The document is called different things in different contexts. Non-disclosure agreement (NDA), confidentiality agreement (CA), and proprietary information agreement (PIA) are all variations of the same instrument. In the UK, they are most commonly called confidentiality agreements in employment contexts and NDAs in commercial ones. For practical purposes they are interchangeable.

## When to use one

**Before sharing sensitive business information.** If you are meeting a potential business partner, investor, or acquirer and plan to share financials, customer data, or product IP, an NDA should be signed before the meeting starts — not after. Once information is out, it cannot be recalled.

**In freelance and contractor engagements.** A developer contracted to audit your firmware, a consultant reviewing your sales pipeline, a designer who will see your unreleased brand guidelines — all should sign an NDA before they see the relevant material.

**In employment.** Most employment contracts include a confidentiality clause. A standalone NDA may be needed for senior hires with access to particularly sensitive information, or when a contractor is brought in on a short-term basis without a full employment contract.

**In disputes and settlements.** An NDA is often part of a settlement agreement, covering the terms of the settlement itself. Be aware of the jurisdictional limits here: you cannot use an NDA to suppress disclosure of unlawful conduct or to silence a whistleblower.

**In licensing discussions.** Before sharing proprietary technology, software, or processes with a potential licensee, get the NDA signed. This is standard practice in technology M&A and licensing negotiations.

## What it must include

Strip an NDA to its essentials and you have five components:

1. **Parties.** Full legal names and addresses of both the disclosing party and the receiving party. If either is a company, use the registered entity name.
2. **Definition of confidential information.** The more specific, the more enforceable. A clause covering "all information shared" is easier to challenge than one specifying "source code, firmware specifications, client revenue data, and roadmap documents marked CONFIDENTIAL."
3. **Exceptions.** Standard carve-outs are: information already in the public domain; information the receiving party can prove they already knew; information received from a third party without breach of any obligation; information independently developed; and disclosure required by law or court order. These are not weaknesses in the NDA — they are essential to making the rest of it stand up.
4. **Term.** How long does the obligation last? State it explicitly. Two to five years for most commercial agreements; perpetual for genuine trade secrets.
5. **Governing law and jurisdiction.** Which courts will hear disputes and which law applies. Do not leave this blank.

## Variants

**Mutual NDA.** Both parties are simultaneously a disclosing party and a receiving party, and the confidentiality obligations run in both directions. Use when both sides are sharing sensitive information.

**Unilateral NDA.** One party shares (the disclosing party); the other is bound (the receiving party). Common in contractor and investor relationships where only one side has sensitive information to protect.

**Employment NDA.** Often integrated into the employment contract rather than standing alone. Covers trade secrets, client lists, and business information for the duration of employment and usually for a period after.

**Settlement NDA.** Part of a dispute resolution agreement. Covers the terms and facts of the settlement. Limitations apply in both UK and US law — particularly for sexual harassment and discrimination cases.

## Step-by-step: completing the template

**Step 1 — Parties.** Enter the full legal names and current addresses of both parties. If a company, the registered office address. Do not use trading names only.

**Step 2 — Purpose.** Write a specific description of the purpose of disclosure. "For the purposes of evaluating a potential acquisition of Aurora Robotics Ltd" is better than "for business purposes." Specificity limits the scope of what is covered and prevents the agreement being read as covering every conversation you have ever had.

**Step 3 — Define the confidential information.** Be detailed. List the categories of information: technical documentation, financial data, personnel records, client data, whatever is actually at stake. You can also define it functionally: "all information marked CONFIDENTIAL, and all information that a reasonable person would understand to be confidential given the context."

**Step 4 — Exceptions.** Include the standard four exceptions. Courts expect to see them; their absence can make the whole agreement look less like a serious commercial document.

**Step 5 — Term.** Set the duration. If the information is a genuine trade secret, state "in perpetuity." If it is time-sensitive commercial information, 2–3 years is typical.

**Step 6 — Jurisdiction.** Choose a governing law. English law is a common choice for UK and international agreements. Avoid choosing a jurisdiction where neither party is based without good reason — a US court will look sceptically at an English law clause in a purely domestic California dispute.

**Step 7 — Signatures.** Both parties sign and date. The agreement is formed on the date the last party signs.

<aside class="tip">
**Expert tip:** If you are in the UK and want the NDA executed as a deed rather than a simple contract, it must be signed in the presence of a witness, and the witness must sign alongside each party. Executing as a deed extends the limitation period for breach of contract claims from six years to twelve (under the Limitation Act 1980). For a short-term contractor agreement, a simple contract is fine. For an NDA covering a long-running licensing arrangement or significant IP, deed execution is worth the small additional formality.
</aside>

## Common mistakes

**Overly broad definitions.** "All information shared between the parties" covers conversations about the weather. Courts read vague definitions against the party seeking to enforce them. Be specific.

**No exceptions clause.** An NDA without standard exceptions looks aggressive and will be harder to enforce if challenged. The other party's solicitor will ask for them to be added — save yourself the back and forth.

**Wrong NDA type.** Sending a unilateral NDA where both parties are sharing sensitive information will immediately signal you have not thought carefully about the agreement. It also leaves your counterparty's information unprotected, which they will notice.

**Perpetual term on routine information.** A 25-year NDA on a press release embargo looks absurd and may be unenforceable as disproportionate. Match the term to the nature of the information.

**Forgetting the return-of-information clause.** Without it, the receiving party has no obligation to return or destroy your documents at the end of the engagement. Include it.

**Using an NDA to suppress unlawful conduct.** This is not just unenforceable — it may be a criminal offence. In the UK, using an NDA to prevent a worker from reporting a crime or cooperating with law enforcement can constitute a criminal attempt to pervert the course of justice. In the US, NDAs that attempt to prevent whistleblower disclosures to regulatory bodies are void under federal law.

## Worked example

Aurora Robotics Ltd, a Bristol-based hardware company, is preparing to launch a new range of autonomous inspection drones. Before they can use Marcus Bell — an independent embedded engineer based in Birmingham — to audit the firmware for security vulnerabilities, they need an NDA in place.

The agreement is drafted as a mutual NDA (Marcus may share his own methodology and previous work product in order to demonstrate his suitability). The key terms:

- **Disclosing party (primary):** Aurora Robotics Ltd, registered office Unit 4 Temple Meads Business Park, Bristol BS1 6PL
- **Receiving party (primary):** Marcus Bell, 17 Broad Street, Birmingham B1 2HF
- **Effective date:** 1 May 2026
- **Purpose:** To enable Marcus Bell to conduct a 6-week firmware security audit of Aurora Robotics' pre-launch drone control software
- **Confidential information:** Aurora Robotics' source code, firmware binaries, hardware schematics, roadmap documents, and client information. Marcus Bell's audit methodologies, tooling, and prior engagement reports.
- **Term:** 3 years from the effective date, except that any genuine trade secret information is protected in perpetuity
- **Exceptions:** Standard four-part exception clause
- **Return clause:** Both parties to return or certify destruction of confidential materials within 14 days of a written request, or on completion of the engagement
- **Governing law:** English law, jurisdiction of the courts of England and Wales

Both parties sign on 28 April 2026. The NDA is executed as a simple contract (no witnesses required). Aurora sends a countersigned copy to Marcus by email the same day and retains the original in their contract management system.

The audit proceeds. Marcus identifies three medium-severity vulnerabilities. His report — which Aurora marks CONFIDENTIAL immediately on receipt — is covered by the NDA. Marcus is free to say he worked with Aurora on a firmware project; he is not free to describe the vulnerabilities he found.

Twelve months after the engagement ends, Aurora sends Marcus a written request to destroy or return all materials. Marcus certifies destruction by email. The NDA obligation continues for a further two years.

## UK vs US landscape

In the UK, confidentiality law has both contractual and equitable foundations. Even without an NDA, English courts will protect genuinely confidential information under the equitable duty of confidence — but an NDA is cleaner, more specific, and much easier to enforce. The Trade Secrets (Enforcement, etc.) Regulations 2018, which implement the EU Trade Secrets Directive into UK law, provide a statutory framework for trade secret protection that supplements the contractual NDA.

In the US, trade secret protection is governed at federal level by the Defend Trade Secrets Act 2016 and at state level by versions of the Uniform Trade Secrets Act (adopted in 48 states). The DTSA creates a federal civil cause of action for trade secret misappropriation, meaning you can sue in federal court. The whistleblower immunity in the DTSA is mandatory — any NDA must include a notice of this immunity, and failure to do so loses you access to exemplary damages and attorney fees in a subsequent misappropriation case.

The US state-law landscape on NDAs in employment has shifted significantly since 2017. California, New York, Illinois, Washington, and others have passed laws limiting or prohibiting NDAs that cover sexual harassment and discrimination claims. If you are drafting employment NDAs for a multi-state US business, get jurisdiction-specific legal advice.
