---
node: design-templates
title: 'Twitch Banner Size — Exact 2026 Dimensions (Banner, Offline, Panels)'
h1: 'Twitch Banner Size'
definitionalLede: 'The Twitch profile banner is 1200 × 480 pixels (a 5:2 ratio), the offline / video-player banner is 1920 × 1080 pixels (16:9), and info panels are a maximum of 320 pixels wide — three separate images, each with its own dimensions, that together make up a Twitch channel page.'
primaryKeyword: 'twitch banner size'
searchVolume: 9000
difficulty: 8
renderer: static-only
related:
  - youtube-banner-size
  - discord-bio
  - capcut
  - storyboard
  - email-signature
crossCluster:
  - to-do-list
  - daily-planner
audience: [us, uk]
wordCountFloor: 1800
sources:
  - title: 'Twitch Help — Channel Page Setup'
    url: 'https://help.twitch.tv/s/article/channel-page-setup'
    accessed: '2026-06-06'
  - title: 'StreamScheme — Twitch Image Sizes (2026)'
    url: 'https://www.streamscheme.com/twitch-image-sizes/'
    accessed: '2026-06-06'
  - title: 'Snappa — The Perfect Twitch Banner Size'
    url: 'https://snappa.com/blog/twitch-banner-size/'
    accessed: '2026-06-06'
updated: '2026-06-06'
howTo:
  name: 'How to size and upload a Twitch banner'
  steps:
    - name: 'Create the profile banner at 1200 × 480 px'
      text: 'Set up your canvas at exactly 1200 pixels wide by 480 pixels high (a 5:2 aspect ratio) at 72 DPI in RGB colour. This is the image that sits behind your profile picture at the top of your channel page. Save it as PNG (sharpest for text and logos) or JPEG, and keep the file under 10 MB. The minimum accepted width is 900 px, so never go below that.'
    - name: 'Keep key content inside the centre safe zone'
      text: 'Twitch scales and crops the banner based on each viewer''s browser width and device, so the left and right edges are unreliable. Centre your logo, channel name, and handles within the middle ~900 px (roughly the central 75%). Treat the outer edges as bleed that may be cut off on mobile or narrow windows.'
    - name: 'Make the offline / video-player banner at 1920 × 1080 px'
      text: 'This is a separate 1920 × 1080 pixel image (16:9) shown in the player area when you are not live. It is the single most-overlooked asset on Twitch. Add your schedule, social links, and a "currently offline" message — it is a billboard that works 24/7 while you are away from stream.'
    - name: 'Build info panels at 320 px wide'
      text: 'Panels sit below your stream and are a maximum of 320 pixels wide (height is flexible; 100–160 px tall is typical). Each panel image must be under 1 MB. Use them for "About", "Schedule", "Donate", "Gear", and social links. Keep widths identical across all panels so the column lines up cleanly.'
    - name: 'Upload from Channel Settings and check on mobile'
      text: 'Go to your profile icon → Settings → Profile for the banner, and Creator Dashboard → Settings → Channel for the offline banner and panels. After uploading, open your channel on a phone and on a desktop browser resized narrow — confirm nothing important is cropped at either extreme.'
faq:
  - q: 'What is the exact Twitch profile banner size?'
    a: 'The Twitch profile banner is 1200 × 480 pixels, which is a 5:2 aspect ratio. This is the image that appears as a strip behind your profile picture at the top of your channel page. The minimum accepted width is 900 pixels, and the file must be JPEG, PNG, or GIF under 10 MB. Upload at the full 1200 × 480 (or larger at the same ratio) for the sharpest result on high-resolution displays.'
  - q: 'What size is the Twitch offline banner (video player banner)?'
    a: 'The offline banner — also called the video-player banner — is 1920 × 1080 pixels, a 16:9 aspect ratio, the same shape as a video frame. It fills the player area when your channel is offline. This is a different image from the profile banner; do not reuse the 1200 × 480 profile banner here, because it will not fill the 16:9 player and will appear pillarboxed or stretched.'
  - q: 'How wide are Twitch panels?'
    a: 'Twitch info panels are a maximum of 320 pixels wide. Height is flexible, but 100 to 160 pixels tall is the common range. Each panel image must be under 1 MB. Panels appear below your stream on desktop and in the "About" tab on mobile. Keep every panel the same width so the column aligns neatly.'
  - q: 'Is there a safe zone for the Twitch banner?'
    a: 'Twitch does not publish a fixed pixel safe zone the way YouTube does, because the banner scales with the viewer''s browser width and crops differently across devices. The practical rule is to keep all important content — logo, name, handles — within the central ~900 px (about the middle 75%) of the 1200 px width, and to treat the outer edges as expendable bleed. Twitch''s own guidance recommends concentrating graphics toward the centre.'
  - q: 'What file format should a Twitch banner be?'
    a: 'PNG, JPEG, or GIF are all accepted. PNG is the best choice for banners containing text, logos, or sharp graphics because it is lossless and keeps edges crisp. JPEG is acceptable for photographic banners and produces smaller files. The profile and offline banners can be up to 10 MB; panels must be under 1 MB each. Animated GIF panels are allowed but should be used sparingly for performance.'
  - q: 'Why does my Twitch banner look blurry or cut off?'
    a: 'Three common causes: (1) you uploaded below the recommended size, so Twitch upscaled it — always upload at full 1200 × 480 or larger; (2) you placed text near the edges, which gets cropped on mobile and narrow browser windows — move it to the centre; (3) you uploaded a JPEG with heavy compression — re-export as PNG. Twitch also scales images shorter or taller than 480 px to 480 px high, which can distort the wrong aspect ratio.'
  - q: 'What is the difference between the Twitch banner and the offline banner?'
    a: 'The profile banner (1200 × 480) is the decorative strip at the top of your channel page, visible whether you are live or offline. The offline banner (1920 × 1080) replaces the video player only when you are not streaming. They serve different jobs: the profile banner is branding; the offline banner is a working billboard that should tell visitors when you stream next and where else to find you. Both are required to set up a polished channel.'
  - q: 'What size should my Twitch profile picture be?'
    a: 'The recommended Twitch profile picture (avatar) is 256 × 256 pixels, a 1:1 square, but uploading at 800 × 800 keeps it sharp wherever Twitch displays it larger. Accepted formats are JPEG, PNG, and GIF, and the file must be under 10 MB. The avatar is displayed as a circle in most contexts, so keep the subject centred and avoid important detail in the corners.'
  - q: 'Can I animate my Twitch banner?'
    a: 'The profile banner and offline banner are static images — animated GIFs are not the intended format for them and will only show the first frame in most placements. Panels do support animated GIFs under the 1 MB limit. If you want motion behind your stream, that is handled by an animated scene or overlay inside your broadcasting software (OBS, Streamlabs), not by the banner upload.'
  - q: 'Do Twitch banner dimensions change over time?'
    a: 'They have been stable for several years: 1200 × 480 profile banner, 1920 × 1080 offline banner, 320 px-wide panels. Platforms do occasionally adjust their layout, so before a major rebrand it is worth confirming against Twitch''s own Channel Page Setup help article, which is the authoritative source. The specs on this page were verified against Twitch help documentation in June 2026.'
  - q: 'What should I put on my Twitch offline banner?'
    a: 'The offline banner is prime real estate that most streamers waste. Include: your stream schedule (which days and times you go live, with a timezone), your other social handles (YouTube, TikTok, Discord, X), a short "currently offline — back [day]" message, and your branding. Visitors who arrive while you are offline see this image full-size in the player; it is your best chance to convert a one-time visitor into a follower.'
  - q: 'Can I export a Twitch banner from this site''s builder?'
    a: 'Not yet as a finished PNG. The current builder on template.how exports PDF, DOCX, and print — it does not yet render a pixel-exact PNG canvas at 1200 × 480. For now, use the exact dimensions and safe-zone guidance on this page to set up your canvas in Canva, Photoshop, GIMP, Photopea, or Figma, and export the PNG from there. PNG/canvas export is a known gap we are working on; the value of this page is the correct, current numbers.'
  - q: 'Should I use the same banner across Twitch, YouTube, and other platforms?'
    a: 'You can reuse the visual style — colours, logo, typography — for brand consistency, but the dimensions are different and you must re-export at each platform''s size. Twitch is 1200 × 480 (banner) and 1920 × 1080 (offline); [YouTube channel art](/youtube-banner-size/) is 2560 × 1440 with a 1546 × 423 safe area. A single 2560 × 1440 file does not fit the Twitch banner. Build a master design and crop or re-frame it per platform rather than uploading one file everywhere.'
---

## What the "Twitch banner size" actually refers to

When people search for "Twitch banner size", they are usually conflating three completely different images that all live on a Twitch channel page. Getting the right number depends entirely on which one you mean:

1. **The profile banner** — the horizontal strip behind your profile picture at the top of your channel. **1200 × 480 pixels, 5:2 aspect ratio.**
2. **The offline banner** (also called the *video-player banner*) — the image that fills the video player when you are not currently live. **1920 × 1080 pixels, 16:9 aspect ratio.**
3. **Info panels** — the stacked image blocks below your stream used for "About", "Schedule", "Donate", and social links. **Maximum 320 pixels wide**, flexible height, under 1 MB each.

These are not interchangeable. The single most common mistake is uploading the 1200 × 480 profile banner into the offline-banner slot, where it does not fill the 16:9 player and ends up pillarboxed or stretched. This page gives you the exact, current dimensions for all three, verified against Twitch's own Channel Page Setup help documentation in June 2026, plus the safe-zone and file-format rules that determine whether your channel looks professional or amateur.

## The profile banner: 1200 × 480

The profile banner is the decorative strip at the very top of your channel page. It is visible whether you are live or offline, so it is the closest thing your channel has to a letterhead.

**Exact spec:**
- **Dimensions:** 1200 × 480 pixels (5:2 aspect ratio)
- **Minimum width:** 900 pixels — never go below this
- **File formats:** JPEG, PNG, or GIF
- **Maximum file size:** 10 MB
- **Colour mode:** RGB, 72 DPI (it is a screen image, not print)

Twitch scales your banner based on the width of each viewer's browser window. Images shorter or taller than 480 px get scaled to 480 px high, and the banner stretches horizontally when a browser is wider than the image. That scaling behaviour is exactly why you should upload at full 1200 × 480 (or larger at the same 5:2 ratio) and never below 900 px wide — anything smaller gets upscaled and looks soft.

**The safe-zone reality.** Twitch does not publish a fixed pixel safe zone, because the crop changes with browser width and device. The working rule, recommended by Twitch's own guidance and every reputable size guide, is to **keep logos, channel name, and handles within the central ~900 px** of the 1200 px width — roughly the middle 75% — and treat the outer edges as bleed that may be cropped on mobile or in narrow windows. Decorative texture can run to the edges; words and logos cannot.

## The offline banner: 1920 × 1080

This is the asset most streamers neglect, and it is the highest-leverage one. When your channel is offline, the video player does not go blank — it shows your offline banner. Anyone who finds your channel while you are away sees this image full-size, right where the stream would be.

**Exact spec:**
- **Dimensions:** 1920 × 1080 pixels (16:9 aspect ratio — the same shape as a video frame)
- **File formats:** JPEG, PNG, or GIF
- **Maximum file size:** 10 MB

Because it occupies the player, the 16:9 ratio is non-negotiable. A 1200 × 480 profile banner dropped here will not fill the frame. Design the offline banner as a working billboard, not just decoration:

- **Your schedule** — which days and times you stream, with a timezone (this is the single most valuable thing to include).
- **Your other socials** — YouTube, TikTok, [Discord](/discord-bio/), X handles, so a visitor can follow you somewhere even when you are not live.
- **A short status line** — "Currently offline — back Thursday 7pm GMT".
- **Branding** — logo, colours, the same visual identity as your profile banner.

A visitor who arrives during your offline hours is a follower you can win or lose with this single image. Most channels waste it on a generic "offline" graphic; the ones that grow use it as a 24/7 advert.

## Info panels: 320 px wide

Panels are the image blocks stacked below your stream on desktop (and shown in the "About" tab on mobile). They are how you communicate everything that does not fit elsewhere.

**Exact spec:**
- **Maximum width:** 320 pixels
- **Height:** flexible — 100 to 160 px tall is typical
- **Maximum file size:** 1 MB per panel (note: stricter than the banners)
- **Format:** PNG recommended; animated GIF allowed

The key discipline is **consistent width**. Build every panel at the same width (320 px, or a consistent narrower width if you prefer) so the column lines up cleanly down the page. Mismatched panel widths are the most visible sign of a hastily built channel. Common panels: About / Bio, Schedule, Donations or Tips, Gear / Setup, Rules, and a row of social links. Each panel image can be paired with a clickable link in Twitch's panel editor, so the image is the visual button and the link is set separately.

## Profile picture and the rest of the channel kit

While not strictly a "banner", the profile picture (avatar) is the fourth image people ask about in the same breath:

- **Profile picture:** recommended 256 × 256 px (1:1), but upload at **800 × 800** to stay sharp wherever Twitch enlarges it. Displayed as a circle, so centre the subject. Under 10 MB, JPEG/PNG/GIF.

A complete "channel kit" therefore has four images at three different sizes: a 1200 × 480 profile banner, a 1920 × 1080 offline banner, one or more 320 px panels, and an 800 × 800 avatar. Build them as a set with a shared colour palette and logo so the channel reads as one brand.

<aside class="tip">
**Expert tip:** Design your profile banner and offline banner from a single master file. Create a 1920 × 1080 canvas, lay out your branding within a centred 1200 × 480 zone, and you can export two crops from one design — the full 1920 × 1080 as the offline banner, and the centred 1200 × 480 region as the profile banner. This guarantees the two images share an identity, halves your design time, and forces your key content into the centre safe zone automatically. Just remember the offline banner needs working information (schedule, socials) layered on top of the shared branding, because it is doing a job the profile banner is not.
</aside>

## Common mistakes

**Mistake 1: Using one image for both banners.** The profile banner (1200 × 480, 5:2) and the offline banner (1920 × 1080, 16:9) are different shapes. A single file cannot fill both correctly. Export two crops.

**Mistake 2: Putting text near the edges of the profile banner.** Because Twitch crops the banner differently across devices and browser widths, edge text gets cut off. Keep words and logos in the central ~900 px.

**Mistake 3: Uploading below the recommended size.** Anything under 1200 × 480 (and certainly under the 900 px minimum width) gets upscaled and looks blurry. Bigger-at-the-same-ratio is fine; smaller is not.

**Mistake 4: Mismatched panel widths.** Panels at varying widths break the clean column line. Standardise on one width — 320 px or a consistent narrower value — for every panel.

**Mistake 5: A blank or generic offline banner.** Leaving the default offline screen, or using a banner with no schedule and no socials, throws away the most valuable conversion surface on your channel.

**Mistake 6: Heavy JPEG compression on text.** Banners with logos and text should be PNG. Over-compressed JPEGs introduce visible artefacts around lettering that make a channel look cheap.

## A note on exporting from this site

The honest situation: the builder on template.how currently exports **PDF, DOCX, and print** — it does **not** yet render a pixel-exact PNG canvas at 1200 × 480 or 1920 × 1080. For an image asset like a Twitch banner, the deliverable you actually need is a PNG, and PNG/canvas export is a known gap we are working on.

What this page gives you instead is the thing that is genuinely hard to get right: the **exact, current dimensions, safe-zone rules, file limits, and design checklist**. Take those numbers into a design tool that exports PNG — Canva (which has Twitch-sized templates built in), Photopea (free, browser-based, Photoshop-like), GIMP, Figma, or Photoshop — set your canvas to the size above, and export. The pixel numbers are the hard part; the tooling is interchangeable.

## Worked example

Priya Nair is launching a variety-gaming Twitch channel and wants a coherent channel kit before her first stream. She works in Photopea (free) and builds from a single master.

She starts a 1920 × 1080 canvas. She lays her logo and channel name "PriyaPlays" inside a centred 1200 × 480 guide box, with a soft purple gradient background filling the full frame. From this one file she exports two PNGs: the full 1920 × 1080 frame becomes her **offline banner**, and the centred 1200 × 480 crop becomes her **profile banner**. Because everything important sat inside the central box, nothing critical is at risk of being cropped on mobile.

For the offline banner specifically, she adds a second layer on top of the shared branding: "Live: Tue / Thu / Sat — 7pm GMT", plus a row of social handles (YouTube, Discord, TikTok). That information does not appear on the profile banner — it is unique to the working billboard.

She then builds three panels at 320 px wide and ~120 px tall — "About", "Schedule", "Socials" — each under 1 MB, all the same width so the column aligns. Finally she exports an 800 × 800 avatar of her logo mark.

She uploads the profile banner under Settings → Profile, the offline banner and panels under Creator Dashboard → Channel, and the avatar under Settings → Profile. She opens the channel on her phone and on a narrow desktop window: the centred content holds at both extremes. Total time, about an hour, for a channel that reads as a finished brand from the first visit.

## The full Twitch channel kit at a glance

It helps to see all the channel image sizes together, because "Twitch banner size" is really shorthand for a small set of assets that work as a system:

| Asset | Dimensions | Ratio | Notes |
|---|---|---|---|
| Profile banner | 1200 × 480 | 5:2 | Min width 900 px; under 10 MB |
| Offline / video-player banner | 1920 × 1080 | 16:9 | Fills player when offline; under 10 MB |
| Info panels | 320 px wide (flexible height) | — | Under 1 MB each; keep widths consistent |
| Profile picture | 256 × 256 (upload 800 × 800) | 1:1 | Shown as a circle; under 10 MB |

Designing these as a coordinated set — one palette, one logo, one typeface — is what makes a channel read as a finished brand the moment a visitor arrives. A mismatched kit (a polished banner but a default avatar, or panels in three different styles) undercuts the impression faster than any single weak asset.

## Beyond the banner: overlays and alerts

A frequent point of confusion is the line between **uploaded channel images** (covered on this page) and **stream graphics** that live in your broadcasting software. They are different systems with different homes:

- **Channel images** — the profile banner, offline banner, panels, and avatar — are uploaded to Twitch through Settings and the Creator Dashboard. They are static images at the fixed sizes above, and they appear on your channel page.
- **Stream overlays, alerts, and scenes** — the webcam frame, the "just followed" pop-ups, the starting-soon screen, the animated borders — are configured inside OBS, Streamlabs, or similar, composited onto your stream at 1920 × 1080 (the standard stream canvas). These are not uploaded to Twitch as images; they are part of your live video output.

So if you want motion behind your stream or animated follower alerts, that is an overlay/alert task in your broadcasting software, not a banner upload. The banner is your channel page's branding; the overlay is your live broadcast's branding. New streamers often try to "animate the banner" — the right move is to build a static banner here and handle motion in the overlay layer of OBS. Keeping the two straight saves a lot of wasted effort uploading files to the wrong place.

## UK and US notes

Twitch dimensions are global — there is no regional difference in banner sizes. The only locale-sensitive detail is on your offline banner: when you publish a stream schedule, **always include a timezone** (GMT/BST for UK streamers, ET/PT for US streamers, or use UTC offsets). A schedule that says "7pm" with no timezone is useless to an international audience, and Twitch audiences are global by default. If you stream to both UK and US viewers, listing the time in two zones — "7pm GMT / 2pm ET" — removes the ambiguity.
