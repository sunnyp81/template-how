---
node: design-templates
title: 'Email Signature Template — Professional HTML (Copy & Paste)'
h1: 'Email Signature Template'
definitionalLede: 'An email signature is the standardised block at the foot of an email — name, job title, company, and contact details — that brands every message and saves you retyping your details; the professional versions are HTML so they render with logos, links, and layout across Gmail, Outlook, and Apple Mail.'
primaryKeyword: 'email signature template'
searchVolume: 8300
difficulty: 17
renderer: static-only
related:
  - discord-bio
  - twitch-banner-size
  - youtube-banner-size
  - storyboard
  - one-pager
crossCluster:
  - cover-letter-google-docs
  - meeting-agenda
audience: [us, uk]
wordCountFloor: 1800
sources:
  - title: 'Google — Create a Gmail signature'
    url: 'https://support.google.com/mail/answer/8395'
    accessed: '2026-06-06'
  - title: 'Microsoft — Create and add a signature to messages (Outlook)'
    url: 'https://support.microsoft.com/en-us/office/create-and-add-an-email-signature-in-outlook-5ce8d70e-9367-49cb-9aee-fbb981ef5d95'
    accessed: '2026-06-06'
updated: '2026-06-06'
howTo:
  name: 'How to create and install an email signature'
  steps:
    - name: 'Decide what to include'
      text: 'A professional signature needs your full name, job title, company name, and one or two reliable contact methods (phone and/or website). Optional additions: a logo, a single social link, pronouns, and a legal or confidentiality line if your organisation requires one. Resist adding everything — four to six lines is the sweet spot.'
    - name: 'Choose a layout'
      text: 'The two reliable layouts are stacked (everything in a single left-aligned column) and side-by-side (a logo or photo on the left, text on the right, built with an HTML table). Stacked is bulletproof across every client. Side-by-side looks more designed but must be built with a table, not CSS flexbox, because many email clients strip modern CSS.'
    - name: 'Build it as simple HTML with inline styles'
      text: 'Email clients are not web browsers — they strip <style> blocks, ignore external CSS, and break flex/grid layouts. Build the signature with a basic HTML table and inline styles (style="..." on each element). Use web-safe fonts (Arial, Helvetica, Georgia), hex colours, and absolute URLs for any image so the logo loads for recipients.'
    - name: 'Paste it into your email client'
      text: 'In Gmail: Settings (gear) → See all settings → General → Signature → Create new, then paste. In Outlook: File → Options → Mail → Signatures (desktop) or Settings → Mail → Compose and reply (web). Paste the rendered signature, not the raw code — copy the live preview so the client captures the formatting and links.'
    - name: 'Send a test to yourself and check on mobile'
      text: 'Email the signature to yourself and open it on desktop Gmail/Outlook and on a phone. Confirm the logo loads, the links work, the layout does not collapse, and it reads cleanly in both light and dark mode. Dark mode is the most common place signatures break — a black logo on a transparent background vanishes on a dark background.'
faq:
  - q: 'What should a professional email signature include?'
    a: 'The essentials are your full name, job title, company name, and one or two contact methods (phone and/or website). Common optional additions: a company logo, a single social or booking link, pronouns, and a legal/confidentiality disclaimer if your organisation requires one. The guiding principle is restraint — four to six lines that a recipient can scan in a second. A signature crammed with every social network, a quote, and three phone numbers reads as clutter and buries the details that matter.'
  - q: 'Why does my email signature need to be HTML?'
    a: 'A plain-text signature can only contain text — no logo, no clickable styled links, no layout, no brand colour. An HTML signature renders with a logo, formatted text, coloured links, and a real layout, which is what makes it look professional and on-brand. That is why signature generators output HTML: the deliverable is markup, not a document. Plain text is perfectly acceptable for internal or minimalist use, but the branded signatures people search for are HTML.'
  - q: 'Why does my email signature break in Outlook?'
    a: 'Desktop Outlook (on Windows) renders email using Microsoft Word''s rendering engine, not a web browser, so it ignores a lot of modern CSS — flexbox, grid, background images, and margins behave unpredictably. The fix is to build signatures the "old" way: HTML tables for layout, inline styles on every element, web-safe fonts, and explicit pixel widths. A signature built with tables and inline styles renders consistently in Outlook, Gmail, and Apple Mail; one built with modern CSS will look broken in Outlook.'
  - q: 'How do I add a logo to my email signature?'
    a: 'Host the logo image at a public, permanent URL (your website, a CDN, or your company''s asset host) and reference it with an absolute URL in an <img> tag: <img src="https://example.com/logo.png" width="120" alt="Company">. Do not embed the image as a base64 data URI — many clients, especially Outlook, block or strip those. Always set an explicit width and an alt text. Keep the logo small (around 100–150 px wide) so it loads fast and does not dominate the signature.'
  - q: 'How do I add my email signature in Gmail?'
    a: 'Open Gmail, click the gear icon → See all settings → General tab → scroll to Signature → click Create new, give it a name, and paste your signature into the box. Gmail''s signature editor accepts pasted formatting, so copy the rendered signature (the live preview), not the raw HTML code. Set it as the default for new emails and replies in the dropdowns below, then click Save Changes at the bottom of the page.'
  - q: 'How do I add a signature in Outlook?'
    a: 'In new Outlook and Outlook on the web: Settings → Mail → Compose and reply → create your signature and assign it to new messages and replies. In classic desktop Outlook: File → Options → Mail → Signatures → New, paste the signature, and choose it as the default. Paste the rendered signature rather than raw code. Because desktop Outlook uses the Word rendering engine, test the result before relying on it.'
  - q: 'Should I use an image of the whole signature?'
    a: 'No. A signature built as a single flat image (a screenshot) seems like a shortcut, but it is a mistake: the links are not clickable, the text is not selectable or searchable, it fails accessibility (screen readers cannot read it), it often gets flagged by spam filters, and it breaks if the image fails to load. Build the signature as HTML with a small logo image and real text. Only the logo should be an image; the contact details should be live text.'
  - q: 'Do email signatures affect deliverability or spam scores?'
    a: 'They can, slightly. Heavy signatures — large images, lots of links, image-only content, or tracking pixels — raise spam-filter suspicion, especially on first contact with a new recipient. Keep images light, limit the number of links, and avoid an all-image signature. A clean HTML signature with a small logo and two or three links has negligible deliverability impact. The bigger risk is an image-only signature, which spam filters treat as a red flag.'
  - q: 'What size should a signature logo or banner be?'
    a: 'Keep the logo around 100–150 pixels wide; a profile photo around 80–100 px square. If you add a promotional banner, keep it under about 600 px wide so it does not force horizontal scrolling on mobile, and under roughly 50 KB so it loads fast. Always set explicit width (and height) attributes on images so the layout does not jump while loading, and supply alt text for when images are blocked.'
  - q: 'How do I make my signature work in dark mode?'
    a: 'Dark mode is where most signatures break. A black logo on a transparent background disappears on a dark background. Solutions: use a logo with a small light outline or a version that works on both backgrounds, avoid pure-black or pure-white text (use dark grey like #333333 which adapts better), and test in both modes. Some clients invert colours in dark mode unpredictably, so a logo on a subtle coloured panel is safer than one relying on a transparent edge.'
  - q: 'Should I include a confidentiality disclaimer?'
    a: 'Only if your organisation requires it. In the UK and US, the legal weight of email confidentiality disclaimers is widely considered weak — a unilateral notice in a footer does not automatically bind a recipient. Many companies still mandate them for compliance or policy reasons (especially in law, finance, and healthcare). If yours does, keep it short and in small grey text below the contact details so it does not dominate the signature. If it does not, a long disclaimer just adds clutter.'
  - q: 'Can I export an email signature from this site''s builder?'
    a: 'Not in the right format yet. The template.how builder currently exports PDF and DOCX — but an email signature needs to be HTML you paste into Gmail or Outlook, and PDF/DOCX cannot do that. An HTML/clipboard "copy" output is the correct deliverable and is a known gap on our roadmap. For now, this page provides copy-paste signature blocks (both plain text and HTML) and exact install steps for each client; copy the block, edit your details, and paste it into your email settings.'
  - q: 'How many social links should I include?'
    a: 'One or two at most, and only the ones that matter professionally. A row of six social icons dilutes the signature and adds load time and spam risk. For most people, LinkedIn is the single most relevant professional link; add one more (a portfolio, a booking link, or the company site) only if it genuinely serves the recipient. The strongest signatures link to one thing the recipient might actually click, not to every account you own.'
---

## What an email signature is, and why HTML

An email signature is the standard block at the foot of your emails — name, title, company, contact details — that appends automatically so you never retype it and every message carries consistent branding. The version people search for is the **professional HTML signature**: not just lines of text, but a small layout with a logo, formatted name, coloured links, and a tidy structure that renders across Gmail, Outlook, and Apple Mail.

The reason this is an HTML problem rather than a document problem is the whole point of the page. A signature's deliverable is **markup you paste into your email client**, not a file you download. That is why dedicated signature generators output HTML code blocks. This page gives you ready-to-edit signature templates — in both plain text and HTML — plus the rules that decide whether your signature looks crisp or collapses in Outlook, and the exact install steps for each client.

## What to include (and what to leave out)

The hardest part of a good signature is restraint. The essentials:

- **Full name**
- **Job title**
- **Company name**
- **One or two contact methods** — phone and/or website

Optional, in rough order of usefulness:

- **A small logo** (around 100–150 px wide)
- **One professional link** — usually LinkedIn, a portfolio, or a booking page
- **Pronouns**
- **A short legal/confidentiality line** — only if your organisation mandates one

Four to six lines is the target. A recipient should absorb your signature in about a second. The common failure is the maximalist signature — every social network, a motivational quote, three phone numbers, a large banner — which buries the details that matter and looks unprofessional. Every element you add competes with the ones that count.

## Why signatures break: the email-client reality

Email clients are not web browsers, and this is the source of nearly every signature problem.

- **Desktop Outlook (Windows)** renders email with Microsoft Word's engine. It ignores flexbox, grid, background images, and many margins.
- **Gmail** strips `<style>` blocks and external stylesheets, keeping only inline styles.
- **Apple Mail** is more forgiving but still inconsistent on advanced CSS.
- **Dark mode** (across all of them) can invert or recolour your signature unpredictably.

The consequences dictate how you build:

- **Use HTML tables for layout, not CSS flexbox/grid.** Tables are the only layout method that survives every client.
- **Put styles inline** (`style="..."` on each element), never in a `<style>` block.
- **Use web-safe fonts** — Arial, Helvetica, Georgia, Times — because custom fonts will not load.
- **Reference images with absolute URLs** hosted publicly; never base64 data URIs (Outlook strips them).
- **Set explicit pixel widths** on images and table cells.

Build to the lowest common denominator and your signature renders the same everywhere. Build to modern web standards and it breaks in Outlook for a large share of your recipients.

## Copy-paste templates

### Plain-text signature (works everywhere, minimalist)

```
Jordan Ellis
Marketing Manager, Brightwave Ltd
+44 20 7946 0958 | brightwave.example.com
```

Plain text is perfectly professional for internal mail or a minimalist style. No logo, no layout — just clean, reliable text.

### Stacked HTML signature (most reliable layout)

```html
<table cellpadding="0" cellspacing="0" style="font-family:Arial,Helvetica,sans-serif;font-size:13px;color:#333333;line-height:1.5;">
  <tr>
    <td>
      <strong style="font-size:15px;color:#1a1a1a;">Jordan Ellis</strong><br>
      <span style="color:#555555;">Marketing Manager &middot; Brightwave Ltd</span><br>
      <a href="tel:+442079460958" style="color:#333333;text-decoration:none;">+44 20 7946 0958</a> &nbsp;|&nbsp;
      <a href="https://brightwave.example.com" style="color:#0b66c2;text-decoration:none;">brightwave.example.com</a><br>
      <a href="https://www.linkedin.com/in/jordanellis" style="color:#0b66c2;text-decoration:none;">LinkedIn</a>
    </td>
  </tr>
</table>
```

### Side-by-side HTML signature (logo left, details right)

```html
<table cellpadding="0" cellspacing="0" style="font-family:Arial,Helvetica,sans-serif;font-size:13px;color:#333333;">
  <tr>
    <td style="padding-right:14px;border-right:2px solid #0b66c2;">
      <img src="https://brightwave.example.com/logo.png" width="110" alt="Brightwave">
    </td>
    <td style="padding-left:14px;line-height:1.5;">
      <strong style="font-size:15px;color:#1a1a1a;">Jordan Ellis</strong><br>
      <span style="color:#555555;">Marketing Manager, Brightwave Ltd</span><br>
      <a href="tel:+442079460958" style="color:#333333;text-decoration:none;">+44 20 7946 0958</a><br>
      <a href="https://brightwave.example.com" style="color:#0b66c2;text-decoration:none;">brightwave.example.com</a>
    </td>
  </tr>
</table>
```

To use the HTML blocks: paste the code into a simple HTML file, open it in a browser, copy the *rendered* signature (not the code), and paste that into your email client's signature editor. Or paste the rendered version directly if your generator/editor accepts HTML.

## Installing in Gmail, Outlook, and Apple Mail

**Gmail:** Gear icon → See all settings → General → Signature → Create new → paste the rendered signature → set defaults for new mail and replies → Save Changes.

**Outlook (web / new Outlook):** Settings → Mail → Compose and reply → create signature → assign to new messages and replies.

**Outlook (classic desktop):** File → Options → Mail → Signatures → New → paste → set as default. Test first, because Word-engine rendering can alter the layout.

**Apple Mail:** Mail → Settings → Signatures → add a signature. Apple Mail can be fussy about pasted HTML; building/testing in the web clients first is wise.

In every case, paste the **rendered** signature so the client captures formatting and links, then send a test to yourself.

<aside class="tip">
**Expert tip:** Test your signature in dark mode before you ever send it in anger — it is where the most embarrassing failures happen. The classic disaster is a black logo on a transparent PNG background: it looks perfect on your white-background desktop and becomes an invisible black-on-black smudge for every recipient using dark mode (now the majority on mobile). Two fixes that work: give your logo a thin light outline or a small solid background panel so it survives on any colour, and use dark grey (#333333) rather than pure black for text, because clients handle grey more gracefully when they recolour for dark mode. Email yourself the signature, switch your phone to dark mode, and check it actually survives.
</aside>

## Common mistakes

**Mistake 1: Building with modern CSS.** Flexbox, grid, and external stylesheets break in Outlook. Use tables and inline styles.

**Mistake 2: The all-image signature.** A screenshot of your signature has no clickable links, fails accessibility, triggers spam filters, and vanishes if the image is blocked. Only the logo is an image; everything else is live text.

**Mistake 3: A base64-embedded logo.** Outlook strips data URIs. Host the logo at a public URL and reference it absolutely.

**Mistake 4: Too much.** Six social icons, a quote, a banner, and three numbers bury what matters. Four to six lines, one or two links.

**Mistake 5: No dark-mode check.** Transparent black logos and pure-black text disappear on dark backgrounds. Test both modes.

**Mistake 6: A heavyweight confidentiality essay.** Long disclaimers add clutter for weak legal benefit. Include one only if mandated, and keep it small and grey.

## A note on exporting from this site

The honest position: an email signature must be **HTML you paste into Gmail or Outlook**, and the template.how builder currently exports **PDF and DOCX** — neither of which installs as a signature. The correct deliverable here is HTML with a copy-to-clipboard control, which is a known gap on our roadmap.

So this is a gallery page by design. Copy one of the blocks above — plain text for minimalism, stacked HTML for reliability, side-by-side HTML for a more designed look — edit your details, host your logo at a public URL if you use one, and paste it into your client following the install steps. Then send yourself a test on desktop and mobile, in both light and dark mode.

## Worked example

Amara Okafor is a freelance UX consultant who wants one signature that looks professional and works in both her Gmail and her client's Outlook threads.

She starts from the side-by-side HTML block. She hosts her logo at `amaraux.example.com/mark.png` at 110 px wide, and fills in her details: name, "UX Consultant", phone, website, and a single LinkedIn link — no other socials, because nothing else serves a client. She keeps text in `#333333` grey rather than black, anticipating dark mode.

She pastes the code into an HTML file, opens it in her browser, and copies the rendered result into Gmail's signature editor. She emails it to herself and opens it in: desktop Gmail (perfect), the Outlook web app her client uses (the table layout holds, logo loads), and her phone in dark mode — where she notices her logo's transparent edge looks slightly hard, so she swaps in a version with a thin off-white outline.

Final signature: four lines plus a small logo, one link, renders identically across all three clients in both colour modes. She sets it as the default for new mail and replies. Total time: about thirty minutes, most of it testing.

## Choosing a layout for your situation

The two reliable layouts — stacked and side-by-side — suit different needs, and there are a few variations worth knowing:

**Stacked (single column).** Everything in one left-aligned column: name, title, company, contacts, one link. It is bulletproof — there is no table layout to collapse, so it renders identically in every client including the most stubborn Outlook versions. Choose stacked when reliability matters more than visual flourish, or when you do not have a logo to place.

**Side-by-side (logo left, text right).** A small logo or photo on the left, separated by a thin vertical divider from the contact text on the right. It looks more designed and is the most common professional format. The catch is that it must be built with an HTML table, because the dividing line and the two-column arrangement need table cells to survive Outlook. Done correctly it is just as reliable as stacked; done with CSS flexbox it breaks.

**Minimal text-only.** No logo, no table — just two or three lines of styled text. Increasingly popular precisely because it sidesteps every rendering and image-blocking problem, loads instantly, and never breaks. For consultants, developers, and anyone whose brand is personal rather than corporate, a clean text signature can look more confident than a heavy graphic one.

**With a banner or call-to-action.** Some businesses add a promotional banner or a "Book a call" button below the signature. These work but carry the most risk: an oversized banner forces mobile scrolling, an image-heavy signature raises spam suspicion, and a button built with modern CSS may not render. If you use one, keep the banner under ~600 px wide and ~50 KB, and build any button as a styled table cell with an inline-styled link, not a CSS button.

## Maintaining signatures across a team

For an individual, a signature is set once and forgotten. For an organisation, signatures are a recurring headache: people format them inconsistently, paste in broken HTML, use outdated job titles, or omit the legally required company details. A few practices keep a team's signatures coherent:

**Provide a master template, not instructions.** Telling staff "use Arial, include your title" produces twenty different signatures. Giving them a ready-built HTML block with placeholders they swap their details into produces one consistent signature with twenty sets of details. The template should already contain the logo, the brand colours, and any mandatory legal line, so individuals only edit name, title, and contact.

**Centralise where you can.** Google Workspace and Microsoft 365 both support administrator-applied signatures that append a consistent block to every outgoing email organisation-wide, set centrally rather than by each user. For larger teams this eliminates the inconsistency problem entirely and guarantees compliance lines are present. It is more setup than a personal signature, but for any business above a handful of people it is worth it.

**Audit periodically.** Job titles change, phone numbers change, brand colours get refreshed, and signatures quietly fall out of date. A periodic check — does everyone's signature still reflect the current branding and their current role — keeps the team's outbound mail looking current rather than like a museum of past job titles.

## UK and US notes

Email signatures work the same way technically in the UK and US — the client behaviour, HTML rules, and install steps are identical. The differences are conventions: UK signatures more often include a company registration number and registered-office address (a legal requirement for UK limited companies on business correspondence, including email, under the Companies Act 2006), so UK business signatures legitimately carry an extra small-print line. US signatures rarely need that. Phone-number formatting differs (+44 with the international format for UK; (xxx) xxx-xxxx for US domestic), and spelling on a title or tagline should match your audience. If you correspond internationally, use the full international phone format so the number is dialable from either country.
