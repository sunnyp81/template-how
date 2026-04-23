---
node: business-templates
title: 'Profit and Loss Statement Template — Free (UK + US)'
h1: 'Profit and Loss Statement Template'
definitionalLede: 'A profit and loss statement template is a structured financial document that records a business''s revenue, costs, and net profit or loss over a defined period.'
primaryKeyword: 'profit and loss statement template'
searchVolume: 11000
difficulty: 10
renderer: invoice
related:
  - invoice-google-docs
  - balance-sheet
  - meeting-minutes
  - executive-summary
  - letterhead
  - one-pager
crossCluster:
  - bill-of-sale
  - to-do-list
audience: [us, uk]
wordCountFloor: 1800
sources:
  - title: 'IRS Publication 334 — Tax Guide for Small Business'
    url: 'https://www.irs.gov/publications/p334'
    accessed: '2026-04-23'
  - title: 'HMRC Self Assessment SA103S Short Notes'
    url: 'https://www.gov.uk/government/publications/self-assessment-self-employment-short-sa103s'
    accessed: '2026-04-23'
  - title: 'US Small Business Administration — Financial Statements'
    url: 'https://www.sba.gov/business-guide/manage-your-business/manage-your-finances'
    accessed: '2026-04-23'
updated: '2026-04-23'
howTo:
  name: 'How to fill out a profit and loss statement template'
  steps:
    - name: 'Set the reporting period and currency'
      text: 'At the top of the statement, record the business name, the period it covers (e.g. "Quarter 1: January–March 2026"), and the currency. If you operate across currencies, pick one reporting currency and note the exchange rate used.'
    - name: 'Enter all revenue line items'
      text: 'List each distinct revenue source on a separate line — do not lump everything into one figure. For a product business, split by product category. For a service business, split by client type or service line. Total revenue is the sum of all lines.'
    - name: 'Calculate cost of goods sold (COGS)'
      text: 'COGS includes only direct costs tied to producing the revenue: raw materials, packaging, direct labour (wages for people who make or deliver the product). Do not include rent or marketing here — those are operating expenses. Gross profit = Total Revenue minus COGS.'
    - name: 'List all operating expenses'
      text: 'Enter every overhead cost: rent, utilities, wages (for staff not in COGS), insurance, marketing, professional fees, depreciation. Total these. Operating profit = Gross Profit minus Operating Expenses.'
    - name: 'Account for other income and expenses'
      text: 'Below the operating line, add any other income (interest received, asset sales) and other expenses (interest paid, one-off costs). Net profit before tax = Operating Profit plus Other Income minus Other Expenses. Then deduct your tax estimate to arrive at net profit after tax.'
faq:
  - q: 'Is a profit and loss statement the same as an income statement?'
    a: 'Yes. They are the same document under two different names. "Income statement" is the preferred term in US corporate accounting (GAAP); "profit and loss statement" or "P&L" is more common in UK and small business usage. Both show revenue, costs, and net profit for a period.'
  - q: 'What is the difference between single-step and multi-step format?'
    a: 'A single-step P&L subtracts all costs from all revenues in one calculation: net profit = total revenues minus total expenses. A multi-step P&L calculates gross profit first (revenue minus COGS), then operating profit (gross profit minus operating expenses), then net profit (after other income/expenses and tax). Multi-step is more useful for management decisions because it shows where in the business profit is being made or lost.'
  - q: 'What is the difference between accrual and cash basis accounting?'
    a: 'Accrual basis records income when it is earned and expenses when they are incurred, regardless of when money changes hands. Cash basis records only when money actually moves. A freelancer who invoices in December but gets paid in January shows that income in December on accrual, January on cash. UK businesses registered for VAT must use accrual basis for VAT; most small UK businesses use cash basis for income tax. US sole proprietors can elect cash basis on Schedule C.'
  - q: 'How does a UK P&L map to the SA103 self-assessment form?'
    a: 'HMRC SA103S (short) requires: turnover, allowable expenses (with sub-categories for cost of goods, wages, rent, repairs, travel, advertising, finance charges, legal/professional fees, accountancy, other), and net profit. The SA103F (full version) requires more granular breakdowns. A well-structured P&L template aligned to these categories makes SA103 completion significantly faster at year-end.'
  - q: 'How does a US P&L map to Schedule C?'
    a: 'IRS Schedule C categories include: advertising, car and truck expenses, commissions and fees, contract labour, depreciation, insurance, interest, legal and professional services, office expenses, rent, repairs and maintenance, supplies, taxes and licences, travel and meals, utilities, wages. A P&L template that mirrors these categories means you are doing the Schedule C categorisation in real time rather than at tax season.'
  - q: 'Should I include depreciation in a small business P&L?'
    a: 'Yes, if you own assets (vehicles, equipment, property) that lose value over time. Depreciation is a non-cash expense: it reduces your profit figure without being a cash outflow. In the UK, HMRC uses "capital allowances" rather than accounting depreciation for tax purposes, but both should appear in a complete P&L.'
  - q: 'How often should I produce a P&L?'
    a: 'At minimum, annually for tax purposes. Monthly is best practice for any business with variable costs or revenue, because trends are visible monthly before they become problems annually. From April 2026, HMRC MTD for Income Tax requires quarterly digital submissions for many UK sole traders with income above £50,000 — a quarterly P&L structure is the practical foundation for those submissions.'
  - q: 'What is gross profit margin and why does it matter?'
    a: 'Gross profit margin = (gross profit / revenue) × 100. It shows how much of each pound or dollar of revenue survives after direct costs. A 73% gross margin (like Kent & Vine Coffee in the example below) is healthy for a food and beverage business. If your gross margin falls quarter-on-quarter, either your prices are too low, your direct costs are rising, or both. The P&L template calculates this automatically.'
  - q: 'Can a business show a profit on the P&L but still run out of cash?'
    a: 'Yes — this is one of the most common causes of small business insolvency. Profit is an accounting concept; cash flow is a physical reality. A profitable business with slow-paying clients can run out of cash while waiting for invoices to be paid. The P&L shows profitability; you also need a cash flow statement to manage solvency. Both are in this template cluster.'
  - q: 'Is a P&L the same as a balance sheet?'
    a: 'No. A P&L covers a period (e.g., Q1 2026) and shows income and expenses over that time. A balance sheet is a snapshot at a point in time (e.g., 31 March 2026) showing what the business owns (assets) and owes (liabilities). The P&L''s net profit figure flows into the equity section of the balance sheet at year-end, but they are separate documents answering different questions.'
builderSchema:
  slug: profit-and-loss-statement
  title: 'Profit & Loss Statement'
  renderer: invoice
  sections:
    - id: business_info
      heading: 'Business Information'
      fields:
        - { id: business_name, label: 'Business name', type: text, required: true }
        - { id: period, label: 'Reporting period (e.g. Q1 Jan–Mar 2026)', type: text, required: true }
        - { id: currency, label: 'Currency', type: select, required: true, options: [{ value: GBP, label: 'GBP (£)' }, { value: USD, label: 'USD ($)' }, { value: EUR, label: 'EUR (€)' }] }
    - id: revenue
      heading: 'Revenue'
      fields:
        - { id: revenue_line_1_desc, label: 'Revenue source 1 — description', type: text, required: true }
        - { id: revenue_line_1_amount, label: 'Revenue source 1 — amount', type: currency, required: true }
        - { id: revenue_line_2_desc, label: 'Revenue source 2 — description', type: text, required: false }
        - { id: revenue_line_2_amount, label: 'Revenue source 2 — amount', type: currency, required: false }
        - { id: revenue_line_3_desc, label: 'Revenue source 3 — description', type: text, required: false }
        - { id: revenue_line_3_amount, label: 'Revenue source 3 — amount', type: currency, required: false }
    - id: cogs
      heading: 'Cost of Goods Sold (COGS)'
      fields:
        - { id: cogs_line_1_desc, label: 'Direct cost 1 — description', type: text, required: false }
        - { id: cogs_line_1_amount, label: 'Direct cost 1 — amount', type: currency, required: false }
        - { id: cogs_line_2_desc, label: 'Direct cost 2 — description', type: text, required: false }
        - { id: cogs_line_2_amount, label: 'Direct cost 2 — amount', type: currency, required: false }
    - id: operating_expenses
      heading: 'Operating Expenses'
      fields:
        - { id: opex_rent, label: 'Rent / premises', type: currency, required: false }
        - { id: opex_wages, label: 'Wages and salaries', type: currency, required: false }
        - { id: opex_utilities, label: 'Utilities', type: currency, required: false }
        - { id: opex_marketing, label: 'Marketing and advertising', type: currency, required: false }
        - { id: opex_legal, label: 'Legal and professional fees', type: currency, required: false }
        - { id: opex_other_desc, label: 'Other expenses — description', type: text, required: false }
        - { id: opex_other_amount, label: 'Other expenses — amount', type: currency, required: false }
    - id: other
      heading: 'Other Income / Expenses'
      fields:
        - { id: other_income_desc, label: 'Other income — description (e.g. interest received)', type: text, required: false }
        - { id: other_income_amount, label: 'Other income — amount', type: currency, required: false }
        - { id: other_expense_desc, label: 'Other expense — description (e.g. bank loan interest)', type: text, required: false }
        - { id: other_expense_amount, label: 'Other expense — amount', type: currency, required: false }
---

## What a profit and loss statement is

A profit and loss statement — also called a P&L, an income statement, or a statement of profit and loss — is the financial document that tells you whether your business is making or losing money over a defined period. It answers one question: does revenue exceed costs, and by how much?

The document has three structural layers. Revenue at the top: everything the business earned. Costs in the middle: what it spent to earn that revenue and to keep the lights on. Profit or loss at the bottom: the difference between the two. A positive bottom line is profit; a negative bottom line is a loss; and the distance between the two tells you whether the business is sustainable.

The P&L is distinct from two other financial statements that small business owners frequently confuse with it. A balance sheet is a snapshot of assets and liabilities at a point in time — it tells you what you own and owe. A cash flow statement tracks the movement of actual cash — it tells you whether you have the money to pay your bills this month. The P&L is about performance over time: did the business generate more value than it consumed during this quarter, this year?

Why does this matter practically? Because the P&L is the document your accountant uses to complete your tax return, the document your bank manager wants to see before approving a loan, and the document you use to work out whether your pricing is viable. A business owner who cannot read their own P&L is flying without instruments. The template here is designed to make the structure legible whether you are familiar with accounting terminology or not.

## When to use this template

**Monthly management accounting.** The primary use case for any active business. A monthly P&L shows trends that an annual P&L hides: a revenue dip in March, a cost spike in February, a margin improvement in Q4. Monthly P&Ls also give you data that is still actionable — annual P&Ls often confirm problems that are too late to fix.

**UK self-assessment (SA103).** HMRC's self-employment pages on the tax return ask for revenue and expense categories that map directly to a well-structured P&L. If your P&L is built using SA103-aligned categories from the start, completing the tax return is a matter of transferring figures rather than categorising expenses in a panic in January. From April 2026, HMRC Making Tax Digital for Income Tax requires quarterly digital submissions for sole traders with income above £50,000 — a quarterly P&L is the base document for those submissions.

**US Schedule C filing.** The Schedule C (Profit or Loss from Business, Sole Proprietorship) on the US federal tax return uses specific expense categories. IRS Publication 334 defines these: advertising, car and truck expenses, commissions, contract labour, depreciation, insurance, interest, legal and professional fees, office expenses, rent, repairs, supplies, taxes, travel and meals, utilities, wages. A P&L aligned to these categories eliminates the reclassification step at tax time.

**Loan or investment applications.** Any lender or investor will ask for historical P&Ls (typically two to three years) and projected P&Ls (typically one to three years forward). The template's structure meets standard small business financial reporting expectations. A sole trader applying for a business bank account with Starling or Monzo Business, or a Ltd company applying for an HSBC business overdraft, will be asked for P&L statements.

**Pricing and margin analysis.** A P&L that separates gross profit (revenue minus direct costs) from operating profit (gross profit minus overheads) tells you your gross margin — the percentage of each unit of revenue that survives after direct production costs. If your gross margin is shrinking quarter-on-quarter, your pricing, your supplier costs, or both need attention.

## What it must include

A P&L template that omits structural elements produces misleading figures. These are the required components:

**Business name and reporting period.** The P&L must be clearly dated. "January–March 2026" not just "Q1". The currency must be stated. For businesses that operate in multiple currencies, the reporting currency and the conversion rates used must be documented.

**Revenue section.** Broken down by source, not lumped into a single figure. A coffee shop selling drinks, food, and retail products should show all three as separate lines. Why? Because each has a different cost structure and margin, and a blended total hides which product lines are profitable and which are not.

**Cost of goods sold (COGS).** Direct costs only — costs that exist because you made a sale. For a product business, this is materials and direct manufacturing labour. For a service business, it may be zero (a pure service business with no direct costs) or it may include contractors, materials, and delivery costs. The distinction between COGS and operating expenses is the foundation of the gross profit calculation. Getting it wrong gives you a meaningless gross margin.

**Gross profit.** Revenue minus COGS. This is the first key performance metric in the P&L. Gross margin percentage = (gross profit / revenue) × 100. A business with a 20% gross margin needs to run very lean overheads to be viable; a business with a 70% gross margin has more room for overhead costs.

**Operating expenses.** All overhead costs: rent, utilities, salaries (not COGS workers), insurance, marketing, software subscriptions, professional fees, depreciation. These should be broken down with enough granularity to be useful — "expenses £50,000" tells you nothing.

**Operating profit.** Gross profit minus operating expenses. Also called EBIT (Earnings Before Interest and Tax) in corporate accounting contexts.

**Other income and expenses.** Interest received, interest paid, one-off asset sales or write-offs, foreign exchange gains or losses. These sit below the operating profit line because they are not part of the trading operations.

**Net profit before and after tax.** The pre-tax figure, then the estimated tax liability, then the final after-tax net profit. For small businesses, the after-tax figure is what you actually earned and can reinvest or draw.

## Variants you will encounter

**Single-step P&L.** All revenues in one block, all expenses in one block, net profit at the bottom. Simple, fast, but limited — does not show gross profit or operating profit, which are the figures most useful for business decisions. Suitable for very simple businesses with one product type and minimal cost variety.

**Multi-step P&L.** The standard format for this template. Shows gross profit, then operating profit, then net profit in separate calculations. The structure reveals where in the business value is being created or destroyed.

**Contribution margin P&L.** Used in management accounting, particularly for product businesses with multiple lines. Separates variable costs (which rise with output) from fixed costs (which stay constant). Shows the contribution margin per product line — how much each product contributes to covering overheads. Useful for pricing decisions and product mix analysis.

**Projected / pro forma P&L.** A forward-looking P&L based on assumptions — used for business plans, loan applications, and internal planning. The structure is identical; the figures are estimates rather than actuals.

## Step-by-step: completing the template

**Step 1 — Set the period and currency.** This sounds trivial but errors here invalidate everything else. Write the exact start and end dates, not just "Q1". State the currency — GBP, USD, EUR. If you receive income in multiple currencies, convert everything to the reporting currency at a stated exchange rate.

**Step 2 — Enter revenue by source.** List every distinct revenue stream on its own line. Do not estimate — use your actual invoices, till receipts, or bank statements. If you have a subscription product, note the number of subscribers and the per-subscriber revenue as a sense check.

**Step 3 — Calculate COGS carefully.** The most common mistake is including overhead costs in COGS. Ask: "Would this cost exist if I made zero sales this month?" If yes, it might be a fixed overhead rather than a direct cost. Rent is a fixed overhead — it exists whether you sell one item or a thousand. Raw materials are COGS — they scale with production.

**Step 4 — Enter operating expenses.** Be thorough. Software subscriptions (Xero, QuickBooks, Notion, Canva Pro) are real costs. Your accountant's annual fee should be spread monthly if material. Depreciation on assets you own — vehicles, equipment — should appear here even though it is a non-cash cost.

**Step 5 — Complete the other income/expense section.** Bank interest received on a business current account. Interest paid on a business loan. Any one-off income (selling a piece of equipment). Round everything to the nearest pound or dollar.

<aside class="tip">
The most valuable thing a P&L can do is not tell you whether you made a profit — you probably know that already. It is to tell you where the profit was made, and whether the margin is moving in the right direction. I always look at three figures in any P&L I review: gross margin percentage, operating cost as a percentage of revenue, and the trend in both over the last three or four periods. A business where gross margin is improving quarter-on-quarter while operating costs as a percentage of revenue are falling is in good shape. A business where gross margin is stable but operating costs are rising is heading for a problem. The template is designed to make these ratios visible immediately — not buried in the raw numbers.
</aside>

## Common mistakes

**Mistake 1: Mixing COGS and operating expenses.** Putting wages in COGS when those wages are admin or management rather than production. Putting marketing in COGS. These errors inflate COGS, deflate gross margin, and make the business look less efficient than it is. If in doubt, ask: does this cost directly produce the revenue, or does it support the business generally?

**Mistake 2: Using a P&L instead of a cash flow statement to manage solvency.** A profitable P&L does not mean you have cash available. If you are a services business that invoices on 60-day terms, your P&L may show substantial profits while your bank account is empty. Monitor cash flow separately. The P&L and the cash flow statement answer different questions and need to be read together.

**Mistake 3: Not separating revenue by source.** A blended revenue figure hides which product lines or services are contributing most to gross profit. If one product line has a 30% margin and another has an 80% margin, knowing the split changes your business decisions. Lump them together and you are averaging away the information you need.

**Mistake 4: Ignoring depreciation.** A sole trader who bought a £12,000 van two years ago and writes off the full cost in year one has a misleading P&L in years two and three — the van is still producing revenue but showing zero cost. Straight-line depreciation (cost divided by useful life in years) gives a more accurate picture. HMRC allows capital allowances as the tax-treatment equivalent, but a management P&L should show depreciation on its own terms.

**Mistake 5: Not reviewing the P&L against the previous period.** A P&L in isolation tells you what happened. A P&L compared to the last quarter tells you which direction you are travelling. Build the comparison into your template — a simple "vs. prior period" column reveals trends that a single period conceals.

## Worked example

Kent & Vine Coffee Ltd, a single-site coffee shop in Tunbridge Wells, Q1 2026 (January–March).

Revenue: espresso drinks and hot beverages £28,000; pastries and food £14,200; retail coffee beans and merchandise £6,000. Total revenue: £48,200.

Cost of goods sold: coffee beans and milk £7,400; pastry and food ingredients £5,400. Total COGS: £12,800.

Gross profit: £35,400. Gross margin: 73.4%.

Operating expenses: rent £9,000; wages (barista and floor staff, not in COGS) £14,500; utilities (gas, electricity, water) £1,600; marketing (Instagram ads, local press) £2,000; accountancy and professional fees £750; card processing fees £650; sundries £600. Total operating expenses: £29,100.

Wait — the original summary figures said £27,100 in operating expenses. Reviewing line by line, card processing fees (£650) and sundries (£600) were originally omitted. The corrected total is £29,100.

Operating profit: £35,400 minus £29,100 = £6,300.

Other expenses: bank loan interest £450. Net profit before tax: £5,850. Corporation tax estimate at 19% small companies rate: £1,112. Net profit after tax: £4,738.

The owner, reading this P&L for the first time compared to Q4 2025, notes that wages have risen by 8% (minimum wage increase from April 2026) but gross margin has held because bean costs were locked in by a forward purchase agreement with a supplier. Operating profit is down £1,200 from Q4 2025 — the wage increase is the cause, and the owner now has the data to decide whether to adjust pricing or reduce hours.

## UK vs. US practical differences

The conceptual structure of a P&L is the same in both markets. The practical differences are in how the figures connect to tax filings. In the UK, a sole trader's P&L feeds directly into SA103 on the self-assessment return; a Ltd company's P&L feeds into the corporation tax computation (CT600) filed with HMRC. In the US, a sole proprietorship's P&L feeds into Schedule C on the federal return; a corporation files Form 1120, and an S-corp files Form 1120-S. The template is structured to work with both, with the SA103 and Schedule C category mappings documented in the instructions.
