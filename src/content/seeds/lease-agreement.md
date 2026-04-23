---
node: legal-document-templates
title: 'Simple Lease Agreement Template — Free (UK + US)'
h1: 'Simple Lease Agreement Template'
definitionalLede: 'A lease agreement is a legally binding contract between a landlord and tenant that sets out the terms under which a property is rented, including rent, deposit, duration, and the obligations of both parties.'
primaryKeyword: 'simple lease agreement template'
searchVolume: 3800
difficulty: 17
renderer: legal-document
related:
  - bill-of-sale
  - letter-of-recommendation
  - doctors-note
  - nda
  - eviction-notice
  - last-will
crossCluster:
  - profit-and-loss-statement
audience: [us, uk]
wordCountFloor: 1800
sources:
  - title: 'UK Housing Act 1988 — legislation.gov.uk'
    url: 'https://www.legislation.gov.uk/ukpga/1988/50'
    accessed: '2026-04-23'
  - title: 'US Uniform Residential Landlord and Tenant Act (URLTA) — Cornell LII'
    url: 'https://www.law.cornell.edu/uniform/vol7.html#rela'
    accessed: '2026-04-23'
updated: '2026-04-23'
howTo:
  name: 'How to complete a lease agreement'
  steps:
    - name: 'Identify both parties and the property'
      text: 'Write the landlord''s full legal name and address, the tenant''s full legal name, and the full address of the property being let. If there is a letting agent acting on the landlord''s behalf, include their details as well.'
    - name: 'Set the term and rent'
      text: 'Specify whether the tenancy is fixed-term (e.g. 12 months) or periodic (e.g. month-to-month). State the rent amount, frequency (monthly or weekly), the due date (e.g. 1st of each month), and the payment method. In the UK, include the currency explicitly.'
    - name: 'Record the deposit details'
      text: 'State the deposit amount. In the UK, the landlord must place it in a government-approved tenancy deposit scheme (TDS, MyDeposits, or DPS) within 30 days of receipt and provide the tenant with prescribed information. In the US, rules vary by state — some cap the deposit at one or two months'' rent.'
    - name: 'Document obligations and house rules'
      text: 'Specify who pays utilities, council tax (UK), and other outgoings. Include house rules on pets, smoking, alterations, and subletting. Set out maintenance responsibilities — landlords are typically responsible for structure and appliances; tenants for interior cleanliness and minor maintenance.'
    - name: 'Confirm notice periods and sign'
      text: 'State the notice period required to end the tenancy. Both parties sign and date. In the UK, both parties should receive a copy of the signed agreement plus the government''s How to Rent guide.'
faq:
  - q: 'What is the difference between an Assured Shorthold Tenancy and an Assured Tenancy in the UK?'
    a: 'An Assured Shorthold Tenancy (AST) is the standard residential tenancy in England and Wales since 1997. It gives the landlord the right to recover possession after the fixed term ends (with a Section 21 notice) or during the tenancy for specific grounds (Section 8). An Assured Tenancy offers the tenant stronger security of tenure — the landlord can only evict on specific grounds and cannot use a no-fault Section 21. Most private residential lets are ASTs.'
  - q: 'What is Section 21 and is it being abolished?'
    a: 'Section 21 of the Housing Act 1988 allows a landlord to serve a no-fault eviction notice after the fixed term ends, requiring a minimum of two months'' notice. The Renters'' Rights Bill, progressing through Parliament in 2025–26, proposes to abolish Section 21 in England. Until that Bill receives Royal Assent and comes into force, Section 21 remains valid. Scotland abolished equivalent no-fault evictions in 2017 under the Private Housing (Tenancies) (Scotland) Act 2016.'
  - q: 'What are the UK deposit protection rules?'
    a: 'Landlords in England and Wales must protect a tenancy deposit in a government-authorised scheme within 30 days of receiving it and provide the tenant with prescribed information about the scheme. Failure to do so prevents the landlord from serving a valid Section 21 notice and exposes them to a fine of 1–3 times the deposit amount. The three approved schemes are TDS (Tenancy Deposit Scheme), MyDeposits, and the Deposit Protection Service (DPS).'
  - q: 'How do US deposit rules differ?'
    a: 'In the US, deposit rules are set by state law. Most states cap deposits at one to two months'' rent. Landlords must typically return the deposit (minus legitimate deductions) within 14 to 30 days of the tenancy ending, accompanied by an itemised statement of deductions. Failure to comply can result in the landlord owing the tenant double or triple the deposit amount as a penalty.'
  - q: 'What is a break clause?'
    a: 'A break clause allows one or both parties to end the tenancy before the fixed term expires, provided the required notice period is given. For example, a 12-month AST with a 6-month break clause allows either party to end the agreement after 6 months by giving 2 months'' written notice. The break clause must be drafted carefully — a poorly worded one may be unenforceable.'
  - q: 'What is the difference between joint and several liability?'
    a: 'In a joint tenancy with joint and several liability, each tenant is individually liable for the whole rent, not just their share. If one tenant stops paying, the landlord can pursue any or all of the other tenants for the full amount. This is standard in shared house lettings and significantly reduces the landlord''s risk. Make sure all tenants understand the implication before signing.'
  - q: 'Do UK landlords need to conduct right-to-rent checks?'
    a: 'Yes. Under the Immigration Act 2014, landlords in England are legally required to check that prospective tenants have the right to rent in the UK before granting a tenancy. This involves verifying original identity documents (e.g. passport, biometric residence permit) and keeping copies. Failure to comply can result in a civil penalty or criminal prosecution. The scheme does not apply in Scotland, Wales, or Northern Ireland.'
  - q: 'How does a landlord increase rent during a tenancy?'
    a: 'In England and Wales, a landlord can use a Section 13 notice (under the Housing Act 1988) to propose a rent increase for a periodic tenancy, giving at least one month''s notice for weekly or monthly tenancies. The tenant can challenge a proposed increase at the First-tier Tribunal (Property Chamber). A rent increase during a fixed-term tenancy requires the tenant''s agreement unless there is a specific rent review clause in the agreement.'
  - q: 'Is a verbal lease agreement legally binding?'
    a: 'In the UK, a verbal tenancy agreement is legally binding and can create an AST. However, without a written agreement, disputes about the terms become very difficult to resolve. UK landlords are legally required to provide a written statement of terms for tenancies of three years or less, and in practice a written agreement is essential for deposit protection and Section 21 notices to be valid.'
  - q: 'What is the difference between a commercial and a residential lease?'
    a: 'Commercial leases are governed by the Landlord and Tenant Act 1954 in the UK (or equivalent state law in the US) and have none of the consumer protections in residential tenancy law. They are typically negotiated document-by-document rather than using standard templates, and involve different notice procedures, break options, and rent review mechanisms. This template is for residential use only.'
builderSchema:
  slug: lease-agreement
  title: 'Residential Lease Agreement'
  renderer: legal-document
  sections:
    - id: parties
      heading: 'Parties'
      fields:
        - { id: landlord_name, label: 'Landlord full name / company', type: text, required: true }
        - { id: landlord_address, label: 'Landlord address', type: textarea, required: true }
        - { id: tenant_name, label: 'Tenant full name(s)', type: text, required: true }
        - { id: property_address, label: 'Property address', type: textarea, required: true }
        - { id: property_description, label: 'Property description (e.g. 1-bed flat, second floor)', type: textarea, required: false }
    - id: term
      heading: 'Tenancy term'
      fields:
        - { id: start_date, label: 'Tenancy start date', type: date, required: true }
        - { id: end_date, label: 'Fixed-term end date (leave blank for periodic)', type: date, required: false }
        - id: tenancy_type
          label: 'Tenancy type'
          type: select
          required: true
          options:
            - { value: fixed, label: 'Fixed term' }
            - { value: periodic, label: 'Periodic (rolling)' }
    - id: rent
      heading: 'Rent'
      fields:
        - { id: rent_amount, label: 'Monthly rent', type: currency, required: true, currency: GBP }
        - id: rent_frequency
          label: 'Rent frequency'
          type: select
          required: true
          options:
            - { value: monthly, label: 'Monthly' }
            - { value: weekly, label: 'Weekly' }
        - { id: rent_due_day, label: 'Rent due date (e.g. 1st of each month)', type: text, required: true }
        - id: payment_method
          label: 'Payment method'
          type: select
          required: true
          options:
            - { value: bank_transfer, label: 'Bank transfer' }
            - { value: standing_order, label: 'Standing order' }
            - { value: cheque, label: 'Cheque' }
    - id: deposit
      heading: 'Deposit'
      fields:
        - { id: deposit_amount, label: 'Deposit amount', type: currency, required: true, currency: GBP }
        - id: deposit_scheme
          label: 'Deposit protection scheme (UK)'
          type: select
          required: false
          options:
            - { value: tds, label: 'TDS (Tenancy Deposit Scheme)' }
            - { value: mydeposits, label: 'MyDeposits' }
            - { value: dps, label: 'DPS (Deposit Protection Service)' }
            - { value: us_state, label: 'US state-specific (see local rules)' }
    - id: outgoings
      heading: 'Utilities and outgoings'
      fields:
        - { id: utilities_tenant, label: 'Utilities paid by tenant (list)', type: textarea, required: false }
        - { id: utilities_landlord, label: 'Utilities paid by landlord (list)', type: textarea, required: false }
        - { id: council_tax, label: 'Council tax paid by', type: text, required: false }
    - id: rules
      heading: 'House rules'
      fields:
        - { id: pets, label: 'Pets permitted?', type: checkbox }
        - { id: smoking, label: 'Smoking permitted?', type: checkbox }
        - { id: subletting, label: 'Subletting permitted?', type: checkbox }
        - { id: alterations, label: 'Alterations permitted (with landlord consent)?', type: checkbox }
        - { id: additional_rules, label: 'Additional house rules', type: textarea, required: false }
    - id: notices
      heading: 'Notice periods'
      fields:
        - { id: notice_period, label: 'Notice period to end tenancy', type: text, required: true }
        - id: jurisdiction
          label: 'Jurisdiction'
          type: select
          required: true
          options: 'us-states+uk-nations'
    - id: signatures
      heading: 'Signatures'
      fields:
        - { id: landlord_sig, label: 'Landlord signature name', type: text, required: true }
        - { id: tenant_sig, label: 'Tenant signature name', type: text, required: true }
        - { id: sign_date, label: 'Date signed', type: date, required: true }
---

## What a lease agreement is

A lease agreement is the legal foundation of a tenancy. It records what has been agreed between a landlord and tenant before the keys are handed over: the rent, the deposit, who is responsible for what, and how the tenancy can be ended. Without one, both parties rely on verbal understandings — which are legally binding in the UK but nearly impossible to prove when something goes wrong.

For a landlord, the written agreement is the mechanism through which they can enforce the deposit protection obligation, issue a valid Section 21 notice, and demonstrate that specific house rules were agreed upfront. For a tenant, it is the document that sets out their rights and protects them from arbitrary rent increases or unlawful eviction.

The terminology differs between countries. In England and Wales, most residential private lets are Assured Shorthold Tenancies (ASTs) governed by the Housing Act 1988. In Scotland, most are Private Residential Tenancies (PRTs) governed by the Private Housing (Tenancies) (Scotland) Act 2016. In the US, residential leases are governed by state law — the Uniform Residential Landlord and Tenant Act (URLTA) has been adopted in whole or part by around 24 states, but the rest have their own regimes.

## When to use one

Any time a property is let in exchange for rent, a written lease agreement should be in place before the tenancy begins. This applies to:

- Long-term private residential lets (the most common use case)
- Short-term holiday lets, though different rules apply in the UK (a licence rather than an AST for lets under 90 days)
- Lodger arrangements, where a licensee shares accommodation with the landlord
- HMO (house in multiple occupation) lets, which have additional licensing requirements

The template here is for standard private residential lets. HMOs, commercial properties, and social housing have their own frameworks.

## What it must include

**Parties and property.** Full legal names and addresses of landlord and all tenants, plus the full property address. If there is a guarantor, their details belong in the agreement or a separate deed of guarantee.

**Term.** Fixed-term (e.g. 12 months from 1 July 2025 to 30 June 2026) or periodic (monthly rolling). The term determines which notice mechanism applies at the end.

**Rent.** Amount, frequency, due date, and payment method. Include the currency — this matters in international landlord situations.

**Deposit.** Amount and protection scheme details. In the UK, landlords are legally required to protect the deposit in an approved scheme within 30 days.

**Obligations.** Who pays utilities, council tax (UK), buildings insurance (landlord), contents insurance (tenant's own responsibility). Maintenance obligations: structure and appliances are the landlord's responsibility in the UK under the Landlord and Tenant Act 1985; interior cleanliness and minor maintenance are the tenant's.

**House rules.** Pets, smoking, subletting, alterations — state these explicitly. Ambiguity here is the source of most deposit disputes.

**Notice periods.** How either party ends the tenancy and with how much notice.

**Governing law and jurisdiction.**

## Variants

**Assured Shorthold Tenancy (UK).** The default for private residential lets in England and Wales since 28 February 1997. Landlord can recover possession on a no-fault basis after the fixed term using Section 21 (while it remains law), or during the tenancy on specific grounds under Section 8.

**Private Residential Tenancy (Scotland).** No fixed term — all PRTs are open-ended. Landlords can only recover possession on specified grounds under the 2016 Act; no equivalent of Section 21 exists in Scotland.

**Fixed-term lease (US).** Runs for a defined period. The tenant has the right to stay for the full term; the landlord cannot raise rent or terminate without cause. At the end of the term, it may convert to a month-to-month tenancy.

**Month-to-month tenancy (US).** No fixed end date. Either party can typically terminate with 30 days' written notice (or more, depending on state law). More flexible for both parties but offers less security for the tenant.

## Step-by-step: completing the template

**Step 1 — Parties.** Full names matter. If the landlord is a company, the company name (as registered) is the landlord. If there are two tenants, both names go in — and both should sign.

**Step 2 — Term.** Pick fixed-term or periodic. For most private residential lets, 12 months fixed-term is the default. Note: in Scotland, you cannot create a fixed-term PRT — the tenancy is open-ended by law.

**Step 3 — Rent.** State the monthly rent, due date, and payment method. Also state what happens if rent is late — most agreements include a clause that interest accrues on rent more than 14 days overdue at a stated rate.

**Step 4 — Deposit.** State the amount. In the UK, the deposit is capped at 5 weeks' rent (for annual rent under £50,000) under the Tenant Fees Act 2019. Note which scheme will be used and the 30-day protection obligation.

**Step 5 — Outgoings and rules.** Be explicit rather than relying on defaults. If the tenant pays all utilities except buildings insurance, list each one.

**Step 6 — Jurisdiction.** UK landlords should note whether the property is in England, Wales, Scotland, or Northern Ireland — different law applies in each.

**Step 7 — Sign.** Both parties sign and date. Both retain a copy. UK landlords must also give the tenant the government's How to Rent guide at the start of the tenancy — failure to do so prevents a Section 21 notice from being valid.

<aside class="tip">
**Expert tip:** In England and Wales, a landlord cannot serve a valid Section 21 notice unless they have: (1) protected the deposit and provided prescribed information; (2) provided the tenant with a current Energy Performance Certificate; (3) provided a current Gas Safety Certificate; (4) given the tenant the How to Rent guide. Miss any one of these and the Section 21 is void. Keep copies of everything you hand to the tenant, with a date — a WhatsApp message is fine as a record.
</aside>

## Common mistakes

**Not listing all tenants.** If a joint tenant is not named in the agreement, their obligations are unclear. Name everyone who will be living in the property as a tenant.

**Vague house rules.** "No pets" is clear. "Pets by agreement" is a dispute waiting to happen. If you allow pets, specify what type and how many. If you mean no pets, say no pets.

**Forgetting the deposit scheme deadline.** UK landlords have 30 days from receipt of the deposit to protect it and provide prescribed information. Landlords who miss this window cannot serve a Section 21 notice — even if they protect the deposit late. The 30-day clock runs from receipt, not from when the tenancy starts.

**No check-in inventory.** The lease agreement is not a substitute for a check-in inventory. The inventory (a schedule of condition signed by both parties at the start of the tenancy) is what gives the landlord grounds to make deposit deductions at the end. Without it, any deductions are likely to be disputed successfully.

**Treating the template as jurisdiction-neutral.** Tenancy law in Scotland and Northern Ireland differs meaningfully from England and Wales. If the property is in Scotland, use a PRT-specific template rather than an AST one.

## Worked example

Helen Ward is letting her 1-bedroom flat at 14 Park Crescent, Reading RG1 2AB, to David Greenway for 12 months from 1 July 2026.

The key terms in their lease agreement:

- **Tenancy type:** Assured Shorthold Tenancy, fixed term 1 July 2026 to 30 June 2027
- **Rent:** £1,250 per month, due 1st of each month, by standing order to Helen's Barclays account
- **Deposit:** £1,250 (equivalent to 4 weeks' rent, within the Tenant Fees Act 2019 cap). Protected with TDS within 30 days of receipt
- **Utilities:** David pays electricity, gas, water, broadband, and council tax. Helen pays buildings insurance.
- **House rules:** No pets (including temporary pets). No smoking inside the property. No subletting. Minor redecoration permitted with Helen's prior written consent.
- **Notice:** During the fixed term, Section 8 grounds apply. After 30 June 2027 (periodic phase), Helen may serve a Section 21 notice with 2 months' written notice; David may end the tenancy with 1 month's written notice.

Both parties sign on 20 June 2026. Helen provides David with a copy of the signed agreement, the TDS prescribed information, the current EPC (band C), the Gas Safety Certificate (dated 15 April 2026), and the How to Rent guide (August 2025 edition). She keeps copies of everything with a dated covering email to David.

If Section 21 is abolished before the periodic phase begins, Helen would need to rely on Schedule 2 of the Housing Act 1988 for possession, or the grounds set out in the Renters' Rights Bill once passed.

## UK vs US at a glance

The UK's Housing Act 1988 creates a relatively uniform framework in England and Wales — most landlords are using ASTs whether they know it or not. The main risks are procedural (deposit protection, prescribed documents) rather than contractual.

In the US, there is no equivalent uniformity. A landlord letting in California, Texas, and New York is dealing with three substantially different legal regimes. California requires extensive disclosure obligations, limits rent increases under state rent control, and has a complex eviction process. Texas is more landlord-friendly by comparison. New York has some of the strongest tenant protections in the US under the Housing Stability and Tenant Protection Act 2019. Always check your state's specific landlord-tenant act before relying on any generic template.
