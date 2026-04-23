---
node: legal-document-templates
title: 'Bill of Sale Template (US + UK) — Free PDF & DOCX'
h1: 'Bill of Sale Template'
definitionalLede: 'A bill of sale is a legal document that records the transfer of ownership of personal property from a seller to a buyer.'
primaryKeyword: 'bill of sale template'
searchVolume: 40000
difficulty: 7
renderer: legal-document
related:
  - letter-of-recommendation
  - resignation-letter
  - nda
  - lease-agreement
  - last-will
crossCluster:
  - obituary
  - profit-and-loss-statement
audience: [us, uk]
wordCountFloor: 1800
sources:
  - title: 'CA Commercial Code § 2401'
    url: 'https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=COM&sectionNum=2401'
    accessed: '2026-04-23'
  - title: 'Sale of Goods Act 1979'
    url: 'https://www.legislation.gov.uk/ukpga/1979/54'
    accessed: '2026-04-23'
  - title: 'Florida Statutes § 319.22'
    url: 'http://www.leg.state.fl.us/statutes/index.cfm?App_mode=Display_Statute&URL=0300-0399/0319/Sections/0319.22.html'
    accessed: '2026-04-23'
updated: '2026-04-23'
howTo:
  name: 'How to fill out a bill of sale'
  steps:
    - name: 'Identify the parties'
      text: 'Write the full legal names and addresses of both the seller and the buyer.'
    - name: 'Describe the item'
      text: 'For a vehicle, include VIN, year, make, model, and odometer reading. For other property, describe it precisely enough that no other identical item could be substituted.'
    - name: 'State the price and payment method'
      text: 'Record the agreed price in the buyer''s currency and how it was paid (cash, bank transfer, cashier''s cheque).'
    - name: 'Sign and date'
      text: 'Both parties sign and date. In Florida and a handful of other US states, two witnesses or a notary are required for vehicle sales — see the jurisdiction table below.'
faq:
  - q: 'Do I need a notary for a bill of sale?'
    a: 'It depends on your state. Florida requires both witnesses and notarisation for vehicle sales. Most other US states do not. The UK does not require notarisation.'
  - q: 'Is a handwritten bill of sale legally valid?'
    a: 'Yes, in every US state and the UK. The form is what matters — it must include the parties, the item, the price, the date, and signatures.'
  - q: 'What is the difference between a bill of sale and a title transfer?'
    a: 'The bill of sale records the transaction. The title transfer (in the US, the DMV-administered change of ownership) is the legal recording with the state. Both are usually needed for vehicles.'
  - q: 'Do I need a bill of sale to sell a car privately?'
    a: 'In the US, most states require one for vehicle sales. In the UK, the V5C/2 new keeper supplement serves the same role.'
  - q: 'What if the buyer refuses to sign?'
    a: 'Then the sale is incomplete — never hand over the item or the keys without both signatures.'
  - q: 'Can a bill of sale be cancelled after both parties sign?'
    a: 'Only by mutual agreement. Once signed, it is a binding contract for the transfer of ownership.'
  - q: 'Do I keep the original or a copy?'
    a: 'Both parties should keep a signed original. Photographs or scans are not legally interchangeable with a wet-ink original in some jurisdictions.'
  - q: 'Is sales tax owed on a private bill of sale?'
    a: 'In most US states, the buyer pays sales/use tax at registration based on the price stated. The UK does not levy VAT on most private sales between individuals.'
builderSchema:
  slug: bill-of-sale
  title: 'Bill of Sale'
  renderer: legal-document
  sections:
    - id: parties
      heading: 'Parties'
      fields:
        - { id: date, label: 'Date of sale', type: date, required: true }
        - { id: seller_name, label: 'Seller full name', type: text, required: true }
        - { id: seller_address, label: 'Seller address', type: textarea, required: true }
        - { id: buyer_name, label: 'Buyer full name', type: text, required: true }
        - { id: buyer_address, label: 'Buyer address', type: textarea, required: true }
        - { id: jurisdiction, label: 'Jurisdiction', type: select, required: true, options: 'us-states+uk-nations' }
    - id: item
      heading: 'Item'
      fields:
        - id: item_type
          label: 'Item type'
          type: select
          required: true
          options:
            - { value: vehicle, label: 'Vehicle' }
            - { value: boat, label: 'Boat' }
            - { value: firearm, label: 'Firearm' }
            - { value: other, label: 'Other personal property' }
        - { id: item_description, label: 'Description', type: textarea, required: true }
        - { id: vin, label: 'VIN (Vehicle Identification Number)', type: text, showIf: "item_type == 'vehicle'" }
        - { id: odometer, label: 'Odometer reading (miles)', type: number, showIf: "item_type == 'vehicle'" }
        - { id: year, label: 'Year', type: number, showIf: "item_type == 'vehicle'" }
        - { id: make, label: 'Make', type: text, showIf: "item_type == 'vehicle'" }
        - { id: model, label: 'Model', type: text, showIf: "item_type == 'vehicle'" }
    - id: price
      heading: 'Price & payment'
      fields:
        - { id: price, label: 'Agreed price', type: currency, required: true, currency: USD }
        - id: payment_method
          label: 'Payment method'
          type: select
          required: true
          options:
            - { value: cash, label: 'Cash' }
            - { value: bank_transfer, label: 'Bank transfer' }
            - { value: cashiers_check, label: "Cashier's check" }
            - { value: other, label: 'Other (describe in notes)' }
        - { id: as_is, label: 'Sold "as-is" with no warranties', type: checkbox }
        - { id: notes, label: 'Notes (optional)', type: textarea }
---

## What a bill of sale actually is

At its core, a bill of sale is a receipt with teeth. It proves that ownership of something — a car, a boat, a firearm, a piece of machinery, a horse — passed from one person to another on a specific date, for a specific price. That sounds simple, but the practical implications are significant.

Without one, disputes get ugly fast. Imagine you sell your 2016 Honda Civic to a stranger you met on Facebook Marketplace. Six weeks later, they get a parking ticket on the car they haven't registered yet, and the fine comes to you because you're still the last name on the state's records. Or they claim the engine had a fault you never disclosed. A bill of sale does not prevent every dispute, but it creates a dated, signed record of what was agreed — which resolves most of them.

The document sits one level below a formal contract but above a verbal agreement. It is not a substitute for a title transfer with the DMV (or the DVLA in the UK), but it runs alongside it as a private record between the two parties.

## When you need one

**Vehicle sales.** This is the most common use. If you are selling a car, truck, motorbike, or RV privately — meaning not through a dealership — a bill of sale should be the first thing you prepare, not the last. Some states make it mandatory (Louisiana, Maryland, Montana, Nebraska, New Hampshire, New Mexico, West Virginia, Wyoming, and others require one to complete a title transfer). Every other state benefits from it even if it is not technically required.

**Boats and watercraft.** The United States Coast Guard recommends a bill of sale for any documented vessel. Several states require one to register a used boat.

**Firearms.** A private firearm sale is legal under federal law without a background check in most states, but a signed bill of sale with serial number is your paper trail. It demonstrates the transfer was made on a specific date, which matters if the firearm is ever linked to a crime committed after you sold it.

**High-value personal property.** Art, jewellery, antiques, farm equipment, livestock — anything where the value is significant enough that you would care about proving the transfer. The bill of sale is also useful for insurance purposes: if the buyer later claims ownership back, or the seller later claims the item was stolen, the document is evidence.

**UK private sales.** In the UK, a bill of sale is not a creature of statute in the same way it is in some US states. For vehicles, the V5C logbook and its detachable V5C/2 "new keeper" supplement handle the DVLA notification side. But a private bill of sale still makes sense as a record of what condition the car was sold in, the price, and the "as sold" declaration. The Sale of Goods Act 1979 still applies — if you describe the item inaccurately, you can be held liable.

## What it must include

A bill of sale that leaves out key details is worse than useless — it creates a false sense of security. These are the non-negotiable fields:

1. **Full legal names** of both parties. Not nicknames. Not "Tom from work." The name that appears on their ID.
2. **Addresses** of both parties at the time of the transaction.
3. **Date of sale.** This fixes the exact moment ownership transferred. If the item causes damage the next day, the date matters.
4. **Description of the item.** For a vehicle: year, make, model, VIN, and odometer reading. For other property: enough detail that no similar item could be substituted — serial number, colour, condition, notable marks.
5. **Purchase price.** The exact figure, in the correct currency, not rounded or estimated. If the sale includes a trade-in, state both the trade-in value and the cash component separately.
6. **Payment method.** Cash, bank transfer, cashier's cheque — note which was used and, for a bank transfer, the reference number if you have it.
7. **As-is clause** (optional but strongly recommended). This is the phrase "sold as-is, with no warranties expressed or implied." Without it, a buyer in some jurisdictions may have an implied warranty claim if the item fails shortly after purchase.
8. **Signatures of both parties.** The buyer's signature is often overlooked — people assume only the seller needs to sign. Both signatures are needed for the document to be binding.

Some states have their own official forms. California has REG 135 for vehicle sales. You can use a generic bill of sale in California for most purposes, but for the DMV portion of a vehicle transfer, REG 135 is the form they want.

## Variants you will encounter

**Absolute bill of sale.** The standard type: full transfer of ownership, no conditions, sale is final. This is what most people need.

**Conditional bill of sale.** Ownership transfers only when a condition is met — usually full payment. Common in hire-purchase agreements and instalment sales. The document must specify the condition precisely, or it is unenforceable.

**As-is bill of sale.** Not a separate document type, but a standard bill of sale with an explicit as-is clause. Every vehicle sold privately should include this unless you are offering a written warranty.

**Vehicle-specific bill of sale.** Includes VIN, odometer, lien release section, and sometimes a title inspection checkbox. If your state's DMV publishes an official form, use it — but a well-drafted generic form with the same fields works in most non-mandatory states.

**Firearm bill of sale.** Includes make, model, calibre, and serial number. Some states (California, for example) require a background check even for private transfers, so a bill of sale alone does not satisfy state law there.

## Step-by-step: filling it out correctly

**Step 1 — Identify the parties.** Start with the date at the top, then both parties' full legal names and current home addresses. If one party is a business, include the legal entity name and registered address.

**Step 2 — Describe the item precisely.** For a vehicle, the VIN is the most important field. It is a 17-character identifier unique to that specific car. Write it exactly as it appears on the dashboard or door frame — not from memory, not from an old insurance document. Mistyping a VIN is one of the most common errors on private vehicle bills of sale, and it can complicate a title transfer significantly.

**Step 3 — State the price and payment method.** Write the full agreed price. If you agreed £5,000 but the actual transfer was £4,800 plus a push bike worth £200, document both. Understating the price to reduce the buyer's tax liability is fraud. In most US states, the buyer pays use tax or sales tax based on the declared price at DMV registration — if the price looks unrealistically low, the state may assess tax on the vehicle's fair market value anyway.

**Step 4 — Include the as-is clause.** If you are not offering a warranty, say so explicitly. The exact wording matters less than the fact that it is present and unambiguous.

**Step 5 — Sign and date, in person if possible.** Both parties should sign in the presence of each other. Do not sign a blank form and let the other party fill in the details later — that is an invitation to fraud.

**Step 6 — Make copies.** Both parties should leave with a signed original, not a photocopy. Print two copies, have both parties sign both copies, and each party takes one. If the transaction is significant (£10,000 or more), consider having the signatures witnessed by a third party, even in states where witnesses are not legally required.

<aside class="tip">
**Expert tip:** If you are selling a vehicle privately and the buyer is paying by bank transfer, do not hand over the keys until the funds have actually cleared in your account — not just when the buyer shows you a screenshot of the transfer. Bank transfers can be recalled. Cashier's cheques are the next safest option for large sums, but even those can occasionally be fraudulent. Cash is the only genuinely instant confirmation. Whatever method you use, note the cleared payment date on the bill of sale in addition to the sale date.
</aside>

## Common mistakes (and the one that will cost you)

**Mistake 1: Vague item description.** "Used car" is not a description. If the VIN is missing or wrong, the document has limited value for title transfer purposes.

**Mistake 2: Only the seller signs.** The buyer's signature confirms they accepted the terms. Without it, the seller has a document; the buyer is unbound.

**Mistake 3: No date.** Undated documents are legally ambiguous. Courts have dismissed undated bills of sale.

**Mistake 4: Ignoring state notarisation requirements.** Florida is the state that catches people most often. Under Florida Statutes § 319.22, a vehicle title transfer requires the seller's signature to be notarised. If you sell a car in Florida without notarising the bill of sale, the buyer may not be able to register the vehicle — and coming back to fix the paperwork is, at best, inconvenient and, at worst, impossible if you have moved or lost contact.

**Mistake 5: Describing the item as better than it is.** Omitting known faults in a private sale is misrepresentation. The Sale of Goods Act 1979 and equivalent state consumer protection laws can hold a seller liable for deliberate concealment of material defects. The as-is clause helps, but it does not immunise you from fraud claims.

**Mistake 6 (UK-specific): Forgetting the V5C/2.** In the UK, filling out the bill of sale and handing it to the buyer does not notify the DVLA. The seller must also complete the V5C/2 section of the logbook and post it to DVLA, and notify DVLA online or by post that the vehicle has changed hands. The bill of sale is the private record between you; the V5C/2 is the official notification. You need both.

## Worked example

Jordan Reed is selling a 2016 Honda Civic to Marcus Bell on 15 April 2026 in Tampa, Florida. The agreed price is $8,500, paid in cash.

The bill of sale Jordan fills out reads:

> **Date:** April 15, 2026  
> **Seller:** Jordan A. Reed, 4421 Hillsborough Ave, Tampa, FL 33614  
> **Buyer:** Marcus T. Bell, 1802 West Columbus Dr, Tampa, FL 33607  
> **Vehicle:** 2016 Honda Civic LX Sedan — VIN: 2HGFC2F53GH549832 — Odometer: 74,210 miles  
> **Price:** $8,500 — paid in cash  
> **Condition:** Sold as-is, with no warranties expressed or implied. Seller discloses that the rear bumper has a 4-inch scuff on the passenger side.  

Jordan and Marcus both sign. Because this is Florida, Jordan's signature is notarised by a notary at a nearby UPS Store (cost: $10). Marcus takes one original; Jordan keeps the other.

Jordan also signs the title over to Marcus on the back of the Florida certificate of title. Marcus has 30 days to bring both documents to the Florida DHSMV to complete the title transfer and pay the sales tax (6% of $8,500 = $510).

The whole process, from parking lot to completed paperwork, took 40 minutes. The notary stop adds 10 minutes but eliminates any risk of the DHSMV rejecting the title transfer on a technicality.

Note what Jordan included that most private sellers leave out: the specific defect disclosure. Florida has no state law requiring disclosure of cosmetic defects in a private vehicle sale, but Jordan included it anyway because it removes any basis for Marcus to later claim the scuff was hidden from him.

## The UK picture

The UK does not have a patchwork of state-specific notarisation rules to contend with, but it has its own wrinkles. Under the Sale of Goods Act 1979, a private seller who describes goods inaccurately can be liable for misrepresentation even without a written bill of sale. The bill of sale works in your favour here: it fixes the description at the point of sale and provides the "as sold" baseline.

For UK vehicle sales specifically, HMRC is not involved in private transactions between individuals (no VAT on most private sales), but the buyer should be aware that Vehicle Excise Duty (road tax) does not transfer with the car — it ends the moment the seller notifies DVLA of the sale. The buyer needs to tax the vehicle before driving it away.

One detail the UK government website does not always emphasise: the buyer should also run a free HPI check (or paid-for report from a service like Cazana or the AA) before the sale completes, to confirm there is no outstanding finance on the vehicle. A bill of sale does not transfer clear title if the seller still owes money to a finance company — the finance company's interest follows the asset.

## How long to keep it

The general rule in the US is seven years for most financial documents, which aligns with the IRS audit window. For vehicle bills of sale specifically, keep it until the title transfer is confirmed and then for at least two additional years. The UK follows a similar informal standard — six years is the Limitation Act 1980 window for most contract claims.

Store the original somewhere it will not get lost: a home filing system, a locked drawer, or a digital scan stored alongside your other vehicle documents. If you ever need it, you will need it urgently — not in two weeks after a thorough search.
