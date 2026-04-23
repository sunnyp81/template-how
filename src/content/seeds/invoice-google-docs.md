---
node: business-templates
title: 'Invoice Template Google Docs — Free VAT & Non-VAT'
h1: 'Invoice Template for Google Docs'
definitionalLede: 'A business invoice is a formal demand for payment issued by a supplier to a client, recording what was supplied, at what price, and when payment is due — with UK VAT and US sales-tax fields built in.'
primaryKeyword: 'invoice template google docs'
searchVolume: 7800
difficulty: 5
renderer: invoice
related:
  - profit-and-loss-statement
  - meeting-minutes
  - letterhead
  - balance-sheet
  - one-pager
  - eviction-notice
crossCluster:
  - bill-of-sale
audience: [us, uk]
wordCountFloor: 1800
sources:
  - title: 'HMRC Notice 700/12 — VAT Invoices and VAT Accounts'
    url: 'https://www.gov.uk/guidance/vat-invoices-what-they-must-show'
    accessed: '2026-04-23'
  - title: 'IRS Publication 334 — Tax Guide for Small Business'
    url: 'https://www.irs.gov/publications/p334'
    accessed: '2026-04-23'
updated: '2026-04-23'
howTo:
  name: 'How to create an invoice in Google Docs'
  steps:
    - name: 'Set up your business details'
      text: 'Add your business name, address, email, and phone. If you are VAT-registered in the UK, include your VAT registration number — it is legally required on every VAT invoice. For a US business, include your EIN or, for sole proprietors, the relevant state business registration number if required.'
    - name: 'Fill in the client details'
      text: 'Include the client''s full business name and billing address. For UK B2B invoices to VAT-registered clients, include their VAT number if you have it — it simplifies their VAT reclaim.'
    - name: 'Assign an invoice number and date'
      text: 'Invoice numbers must be unique and sequential. Use a consistent format from the start: 2026-001, 2026-002. Set the invoice date (the tax point for VAT purposes) and the due date based on your agreed payment terms.'
    - name: 'Add line items'
      text: 'List each product or service on a separate line with description, quantity, unit price, and line total. For VAT invoices, indicate the VAT rate for each line. If you have items at different VAT rates on the same invoice, list the VAT subtotal for each rate separately.'
    - name: 'Calculate and add totals'
      text: 'Subtotal (pre-tax), then VAT amount (UK) or applicable sales tax (US), then grand total. For UK invoices: also include a separate line showing the total VAT amount. State your payment terms and bank details clearly below the total.'
faq:
  - q: 'Do I have to issue a VAT invoice if I am VAT-registered?'
    a: 'Yes. Under UK law, a VAT-registered business must issue a VAT invoice to another VAT-registered business within 30 days of the supply. For B2C sales to non-registered customers, a simplified invoice can be issued for supplies under £250. Failure to issue a compliant VAT invoice is a HMRC offence and prevents the recipient from reclaiming the VAT.'
  - q: 'What must a UK VAT invoice include by law?'
    a: 'Under HMRC Notice 700/12: your business name and address, your VAT registration number, a unique sequential invoice number, the invoice date and tax point date (if different), the customer''s name and address, a description of the goods or services, the quantity and unit price, the VAT rate for each item, the net amount per item, the total net amount, the total VAT amount, and the gross total.'
  - q: 'What are standard payment terms?'
    a: 'Net 30 (payment due 30 days from invoice date) is the most common in the UK and US for B2B services. Net 14 is common for smaller or shorter-term engagements. Net 7 or "due on receipt" is sometimes used by sole traders. State your terms explicitly on every invoice — without stated terms, the Late Payment of Commercial Debts (Interest) Act 1998 in the UK imposes a 30-day default, but the interest clock does not start until you have notified the debtor in writing.'
  - q: 'Can I use Google Docs for a professional invoice?'
    a: 'Yes, with a well-structured template. The limitation of Google Docs (versus dedicated invoicing software) is that it does not automate invoice numbering, store client records, or chase late payments. For a business issuing fewer than five to ten invoices per month, Google Docs is perfectly adequate. Above that volume, dedicated software (FreeAgent, Xero, QuickBooks, Wave) saves significant administrative time.'
  - q: 'How should I handle VAT on invoices with different tax rates?'
    a: 'List each line item with its applicable VAT rate. At the bottom, show a breakdown of the VAT due at each rate. For example: Net £400 at 20% VAT = £80 VAT; Net £100 at 0% VAT = £0 VAT. Total VAT due: £80. Grand total: £580. This is the HMRC-compliant format for mixed-rate invoices.'
  - q: 'What about US sales tax on invoices?'
    a: 'US sales tax rules are complex and state-specific. Unlike UK VAT (a single national rate with standard/reduced/zero categories), US sales tax varies by state, county, and municipality. Whether tax applies depends on your "nexus" (physical or economic presence) in the buyer''s state. Service businesses are often exempt from sales tax in many states, but software-as-a-service and some professional services are taxable in others. If you are unsure, consult a US CPA or use tax automation software (TaxJar, Avalara).'
  - q: 'Should invoices be sent as PDF or shared as a Google Doc?'
    a: 'PDF. Export the Google Doc as PDF before sending. This prevents the client from editing the invoice (intentionally or accidentally), ensures the formatting looks identical regardless of the recipient''s software, and creates an immutable record of what you issued. File → Download → PDF Document.'
  - q: 'What do I do if a client does not pay by the due date?'
    a: 'In the UK, the Late Payment of Commercial Debts (Interest) Act 1998 entitles you to charge statutory interest at 8% above the Bank of England base rate from the day after the due date, plus a flat-rate compensation charge (£40 for debts under £1,000). Send a payment reminder at one day past due, a formal notice at seven days past due, and a letter before action at 30 days past due before considering small claims court. In the US, the equivalent route is small claims court, with thresholds varying by state.'
builderSchema:
  slug: invoice-google-docs
  title: 'Invoice'
  renderer: invoice
  sections:
    - id: business
      heading: 'Your business details'
      fields:
        - { id: business_name, label: 'Business name', type: text, required: true }
        - { id: business_address, label: 'Business address', type: textarea, required: true }
        - { id: business_email, label: 'Business email', type: text, required: true }
        - { id: business_phone, label: 'Business phone', type: text, required: false }
        - { id: vat_number, label: 'VAT registration number (UK, if registered)', type: text, required: false }
        - { id: logo_url, label: 'Logo URL (optional)', type: text, required: false }
    - id: client
      heading: 'Client details'
      fields:
        - { id: client_name, label: 'Client business name', type: text, required: true }
        - { id: client_address, label: 'Client billing address', type: textarea, required: true }
        - { id: client_vat, label: 'Client VAT number (if known)', type: text, required: false }
    - id: meta
      heading: 'Invoice details'
      fields:
        - { id: invoice_number, label: 'Invoice number', type: text, required: true }
        - { id: invoice_date, label: 'Invoice date', type: date, required: true }
        - { id: due_date, label: 'Payment due date', type: date, required: true }
        - id: payment_terms
          label: 'Payment terms'
          type: select
          required: true
          options:
            - { value: net7, label: 'Net 7' }
            - { value: net14, label: 'Net 14' }
            - { value: net30, label: 'Net 30' }
            - { value: due_on_receipt, label: 'Due on receipt' }
            - { value: custom, label: 'Custom' }
    - id: lines
      heading: 'Line items'
      fields:
        - { id: description, label: 'Description', type: textarea, required: true }
        - { id: quantity, label: 'Quantity', type: number, required: true }
        - { id: unit_price, label: 'Unit price', type: currency, required: true }
        - { id: vat_rate, label: 'VAT / Tax rate (%)', type: number, required: false }
    - id: totals
      heading: 'Totals'
      fields:
        - { id: subtotal, label: 'Subtotal (pre-tax)', type: currency, required: true }
        - { id: tax_amount, label: 'VAT / Tax amount', type: currency, required: false }
        - { id: grand_total, label: 'Grand total', type: currency, required: true }
    - id: payment
      heading: 'Payment details'
      fields:
        - { id: bank_name, label: 'Bank name', type: text, required: false }
        - { id: sort_code_or_aba, label: 'Sort code (UK) / ABA routing (US)', type: text, required: false }
        - { id: account_number, label: 'Account number', type: text, required: false }
        - { id: iban, label: 'IBAN (UK/international)', type: text, required: false }
        - { id: notes, label: 'Additional notes', type: textarea, required: false }
---

## What makes an invoice a legal document

An invoice is more than a payment request. In the UK, a VAT invoice is a statutory document. Issuing an incorrect or incomplete VAT invoice is an offence under the Value Added Tax Act 1994. The recipient cannot reclaim VAT they have been charged unless they hold a valid VAT invoice showing the correct information. This is why invoice format matters: it is not a design preference, it is a compliance requirement.

Even for non-VAT-registered businesses, a well-structured invoice creates a paper trail that protects both parties. For the supplier, it is the primary evidence of the debt if payment is disputed. For the client, it is the record of what they agreed to pay and when. A badly structured invoice — missing a due date, missing an invoice number, missing a description — is harder to chase, harder to dispute, and harder to reconcile in year-end accounts.

Google Docs works perfectly well as the tool for producing professional invoices, provided the template is set up correctly from the start. The limitations (no auto-numbering, no automated reminders, no payment tracking) only become significant above a certain volume. For a freelancer, sole trader, or small business issuing up to ten or fifteen invoices per month, a well-structured Google Docs template is cost-effective and produces a professional output.

## UK VAT requirements: the mandatory fields

HMRC is specific. A valid VAT invoice issued by a UK VAT-registered supplier must contain all of the following:

1. **Your business name and address** — the registered business name, not a trading name unless that is how you are registered.
2. **Your VAT registration number** — a nine-digit number in the format GB 123 456 789.
3. **A unique sequential invoice number** — must not duplicate any previous invoice in your series. If you use a prefix (INV-001), use it consistently.
4. **The invoice date** — this is also the tax point unless you specify a different tax point date.
5. **The supply date (tax point)** — if different from the invoice date. Relevant when the service was delivered in a different VAT period from the invoice.
6. **The customer's name and address** — for a UK B2B customer, include their VAT number if they have provided it.
7. **A description of the goods or services** — must be sufficient for the client to identify what they received.
8. **The quantity and unit price** — for services, the unit is typically "day" or "hour" or "project."
9. **The VAT rate applied** — standard rate (20%), reduced rate (5%), or zero rate (0%). If exempt, state the exemption.
10. **The net amount** (excluding VAT) per line.
11. **The total net amount** (all lines combined, before VAT).
12. **The total VAT amount** — the actual sterling amount of VAT charged.
13. **The gross total** (net + VAT).

A simplified invoice (no need for the customer's details or a line-by-line breakdown) is permitted for supplies under £250 to non-VAT-registered customers.

## Setting up the Google Docs template correctly

The common failures in DIY invoices are structural. A template that looks professional but lacks the mandatory fields creates compliance problems at the worst moment — usually when you are chasing a late payment and the client's accountant tells them the invoice is not a valid VAT invoice.

**Fonts and formatting.** Use a clean, professional font. Calibri, Arial, or Georgia in 10–12pt. Your business name should be the most prominent element on the page. The invoice number and due date should be immediately visible — do not bury them.

**Invoice number format.** Decide on a format before you issue your first invoice and stick to it. YYYY-NNN (e.g., 2026-001) is the clearest format: the year prefix makes it easy to find invoices from a specific year. Some businesses use INV-001. What matters is consistency and uniqueness. Never reuse an invoice number even if the previous invoice was cancelled — instead, issue a credit note.

**Payment terms.** State them clearly on every invoice. "Payment due within 30 days of invoice date" is sufficient. If you want to add late-payment interest language, the standard UK wording is: "Statutory interest at 8% above the Bank of England base rate will be charged on invoices not paid within [X] days, under the Late Payment of Commercial Debts (Interest) Act 1998."

**Bank details.** Include your sort code and account number (UK) or routing and account number (US) directly on the invoice. Do not make clients email you to ask how to pay — every friction point delays payment.

## When to invoice

**On completion.** For project work, invoice when the deliverable is complete or when the milestone is hit. Do not wait for a "good moment" — delay benefits no one except the client's cash flow.

**At the start of the month (retainers).** For ongoing retainers, invoice on the 1st of each month or the last working day of the previous month. This creates a predictable cycle for both parties.

**On delivery for goods.** The tax point for goods is typically the earlier of: the date of delivery, or the date payment was received. For services, the tax point is the date the service was completed, or the invoice date, whichever is earlier (unless a contract specifies otherwise).

**Advance payments.** If you take deposits or upfront payments, issue an invoice for the deposit when it is received, then a final invoice for the balance. A deposit without an invoice is difficult to account for.

## Variants

**Standard invoice.** The full invoice described above, with all UK VAT fields or US equivalent.

**Pro-forma invoice.** A preliminary invoice issued before goods are dispatched or a service is started, often used to request advance payment. It looks like an invoice but is labelled "Pro-forma" and does not create a VAT liability or form part of your accounting records. Once payment is received and the supply is made, issue the proper VAT invoice.

**Credit note.** Used to reverse or reduce a previously issued invoice. Numbered in a separate series (CN-001, CN-002). Required if you issue an incorrect invoice or need to reduce the amount owed. Do not re-issue the original invoice with a lower amount — issue a credit note for the difference.

**Recurring invoice.** For retainer clients, a recurring invoice template in Google Docs (duplicate the file each month, update the date and invoice number) is a workable system. Dedicated invoicing software handles this more reliably at scale.

## Step-by-step: filling out the template

**Step 1 — Complete your business section.** Business name, address, email, phone, VAT number (if applicable). If you have a logo, insert it at the top right.

**Step 2 — Add the client details.** Business name, billing address, their VAT number if you have it.

**Step 3 — Set the invoice number and dates.** Use the next number in your sequence. Invoice date = today's date. Due date = today's date + your payment terms (30 days = 30 calendar days from invoice date).

**Step 4 — Add line items.** One row per product or service. Description must be specific enough for both parties (and HMRC, if audited) to understand what was supplied. Include quantity and unit price for each line.

**Step 5 — Calculate totals.** Subtotal = sum of all line items before tax. VAT = subtotal × VAT rate (typically 20% standard rate). Grand total = subtotal + VAT.

**Step 6 — Add payment details.** Sort code and account number (UK) or routing and account number (US). IBAN if you accept international transfers.

**Step 7 — Export as PDF.** File → Download → PDF Document. Send via email; keep the Google Doc (or PDF) in your records.

<aside class="tip">
**Expert tip:** The single most effective change to late-payment rates is to include a specific due date — not just payment terms. "Net 30" requires the client to calculate the date. "Payment due by 22 May 2026" requires nothing. Research consistently shows that invoices with explicit due dates are paid faster than those with only payment-terms descriptions. It is a five-second change per invoice that has a measurable effect on cash flow over time. Add the due date prominently, near the grand total, not buried in small print.
</aside>

## Common mistakes

**Mistake 1: Missing or incorrect VAT number.** If you are VAT-registered and omit your VAT number, the invoice is not a valid VAT invoice. Your client cannot reclaim the VAT they paid, which will cause friction and delay.

**Mistake 2: Duplicate invoice numbers.** Issuing two invoices with the same number creates an irreconcilable accounting error. Keep a running log if you are not using software. The moment you discover a duplicate, issue a credit note for one and reissue with a new number.

**Mistake 3: Vague descriptions.** "Services rendered" or "consulting" is not a description. "SEO strategy and technical audit for SunsetShoes.co.uk, March 2026" is a description. HMRC expects descriptions that identify the supply; so does your client's accounts payable team.

**Mistake 4: Sending a Google Docs link rather than a PDF.** This exposes the live document to accidental editing, creates version confusion, and looks less professional than a fixed PDF.

**Mistake 5: Not keeping copies.** HMRC requires VAT records to be kept for six years. Income records for self-assessment must be kept for five years after the 31 January deadline for the relevant tax year. A filed PDF on Google Drive with a consistent naming convention (2026-001_Client_Amount.pdf) is an adequate record.

## Worked example

Kent & Vine Coffee Ltd provides event catering services. On 1 May 2026, they invoice Tall Pines Catering for a corporate event on 25 April.

The invoice (2026-014) lists three line items: 80 cappuccinos at £3.20 each (£256.00), 40 pastries at £2.50 each (£100.00), and 4 hours of barista hire at £45 per hour (£180.00). Subtotal: £536.00. VAT at 20%: £107.20. Grand total: £643.20.

The invoice includes Kent & Vine's VAT registration number (GB 312 457 890), their sort code and account number, and payment terms of "Net 14 — payment due by 15 May 2026."

Tall Pines' accounts team receives the invoice, reclaims the £107.20 VAT on their next VAT return, and pays the net amount of £536.00 (they handle VAT themselves). Payment arrives 10 days later.

This is a straightforward, compliant VAT invoice. Every HMRC mandatory field is present. The due date is explicit. The description identifies the supply precisely enough to cross-reference with the event booking.
