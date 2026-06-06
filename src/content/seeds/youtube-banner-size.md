---
node: design-templates
title: 'YouTube Banner Size — 2560 × 1440 & the 1546 × 423 Safe Area (2026)'
h1: 'YouTube Banner Size'
definitionalLede: 'A YouTube channel banner should be uploaded at 2560 × 1440 pixels (16:9), but all important text and logos must sit inside the central 1546 × 423-pixel safe area — the only region guaranteed to display on every device, from phones to TVs.'
primaryKeyword: 'youtube banner size'
searchVolume: 14000
difficulty: 10
related:
  - twitch-banner-size
  - discord-bio
  - capcut
  - storyboard
  - email-signature
crossCluster:
  - to-do-list
  - daily-planner
audience: [us, uk]
wordCountFloor: 1800
renderer: static-only
sources:
  - title: 'YouTube Help — Channel banner & profile picture tips'
    url: 'https://support.google.com/youtube/answer/12950272'
    accessed: '2026-06-06'
  - title: 'YouTube Help — Manage your channel branding'
    url: 'https://support.google.com/youtube/answer/10456525'
    accessed: '2026-06-06'
  - title: 'Snappa — The Ideal YouTube Banner Size'
    url: 'https://snappa.com/blog/youtube-channel-art-size/'
    accessed: '2026-06-06'
updated: '2026-06-06'
howTo:
  name: 'How to size and upload a YouTube banner'
  steps:
    - name: 'Set the canvas to 2560 × 1440 px'
      text: 'Create your canvas at exactly 2560 pixels wide by 1440 pixels high (16:9 aspect ratio) at 72 DPI in RGB. This is YouTube''s recommended upload size and covers the largest display — a TV — so it scales down cleanly to every smaller device. The minimum YouTube will accept is 2048 × 1152, but uploading at the full 2560 × 1440 keeps the banner sharp on 4K screens.'
    - name: 'Mark the 1546 × 423 safe area in the centre'
      text: 'Draw a guide box 1546 pixels wide by 423 pixels high, centred on the 2560 × 1440 canvas. It begins roughly 507 px from the left and 509 px from the top. This central rectangle is the only part of your banner guaranteed to show on every device, including phones. Everything outside it may be cropped depending on the viewer''s screen.'
    - name: 'Put all text and logos inside the safe area'
      text: 'Your channel name, logo, tagline, upload schedule, and social handles must all fit within the 1546 × 423 safe box. Treat the surrounding area as decorative background — colour, texture, photography — that can be cropped without losing any information. This is the rule that separates banners that work on mobile from ones that look broken.'
    - name: 'Export as PNG or JPEG under 6 MB'
      text: 'Save as PNG (sharpest for text and logos) or JPEG. YouTube accepts JPG, GIF, BMP, or PNG, and the file must be 6 MB or smaller. PNG is the better choice when your banner contains lettering, because JPEG compression softens edges. Keep the colour mode RGB.'
    - name: 'Upload via YouTube Studio and preview on all devices'
      text: 'Go to YouTube Studio → Customisation → Branding → Banner image → Upload. YouTube shows a live preview with device frames for TV, desktop, and mobile. Adjust the crop so your safe-area content is centred in all three previews before saving. Then view your channel on an actual phone to confirm.'
faq:
  - q: 'What is the correct YouTube banner size?'
    a: 'Upload your YouTube banner at 2560 × 1440 pixels, a 16:9 aspect ratio. This is YouTube''s recommended size and it covers the largest display — TV — so it scales down cleanly to desktop, tablet, and mobile. The absolute minimum YouTube accepts is 2048 × 1152 pixels, but the full 2560 × 1440 keeps the banner crisp on high-resolution and 4K screens.'
  - q: 'What is the YouTube banner safe area?'
    a: 'The safe area is 1546 × 423 pixels in the exact centre of the 2560 × 1440 canvas. It is the only region of the banner guaranteed to be visible on every device, including mobile phones. All your important content — channel name, logo, tagline, schedule, social links — must sit inside this box. The area outside it gets cropped to different degrees depending on whether the viewer is on a phone, a desktop, or a TV.'
  - q: 'Why does YouTube show different amounts of my banner on different devices?'
    a: 'YouTube serves one banner image but crops it to fit each device''s screen shape. On mobile, only the central 1546 × 423 safe area shows. On desktop, a wider strip of roughly 2560 × 423 is visible. On a TV, the full 2560 × 1440 image displays. This is why anything important must live in the central safe area — it is the lowest common denominator that every viewer sees regardless of device.'
  - q: 'What is the maximum file size for a YouTube banner?'
    a: 'A YouTube banner must be 6 MB or smaller. Accepted file formats are JPG, GIF, BMP, and PNG. For banners containing text and logos, PNG is the best choice because it keeps edges sharp; JPEG produces smaller files and is fine for photographic banners. If your PNG exceeds 6 MB, reduce the canvas to exactly 2560 × 1440 (people sometimes export at 2× by accident) or switch to JPEG.'
  - q: 'What is the minimum YouTube banner size?'
    a: 'The minimum dimension YouTube accepts for upload is 2048 × 1152 pixels (16:9). At that minimum, the safe area for text and logos shrinks to 1235 × 338 pixels. However, uploading at the minimum risks a soft banner on large screens, so the recommended size is 2560 × 1440 with its 1546 × 423 safe area. Always design to the recommended size and let YouTube scale down.'
  - q: 'Can I use a different image on each device?'
    a: 'No. YouTube uses a single banner image and crops it per device. You cannot upload a separate mobile version. This is precisely why the safe-area discipline matters: because the one image has to work on a phone (showing only 1546 × 423) and a TV (showing the full 2560 × 1440) simultaneously, your essential content goes in the centre and your decorative content fills the edges.'
  - q: 'What should I put on my YouTube banner?'
    a: 'Inside the 1546 × 423 safe area, include: your channel name or logo, a short tagline describing what the channel is about, your upload schedule (e.g. "New videos every Tuesday"), and optionally your social handles. Keep it uncluttered — the safe area is not large, and a banner crammed with text reads as noise. Many of the strongest channel banners contain just a logo, a five-word tagline, and an upload cadence.'
  - q: 'How is a YouTube banner different from a thumbnail?'
    a: 'A banner (also called channel art) is the wide header image across the top of your channel page — 2560 × 1440. A thumbnail is the clickable preview image for an individual video — 1280 × 720 (16:9), under 2 MB. They are completely separate assets with different sizes and jobs: the banner brands your whole channel; each thumbnail sells one specific video. Do not confuse the two when designing.'
  - q: 'Why does my YouTube banner look blurry?'
    a: 'Usually because it was uploaded below 2560 × 1440 and YouTube upscaled it, or because it was saved as a heavily compressed JPEG. Always design at the full 2560 × 1440 and export as PNG for text-heavy banners. A second cause is uploading a banner built at a non-16:9 ratio, which YouTube then crops and rescales, softening the result. Match the 16:9 ratio exactly.'
  - q: 'Do YouTube banner dimensions change?'
    a: 'The 2560 × 1440 upload size and 1546 × 423 safe area have been stable for years and are documented in YouTube''s official "Channel banner & profile picture tips" help article, which is the authoritative source. Platforms occasionally adjust layouts, so before a rebrand it is worth confirming against that help page. The specs here were verified against YouTube Help in June 2026.'
  - q: 'What size is the YouTube profile picture?'
    a: 'The YouTube profile picture (channel icon) is recommended at 800 × 800 pixels and displays as a 98 × 98 circle in most placements. Accepted formats are JPG, GIF, BMP, or PNG (animated GIFs are not supported), under 4 MB. Because it shows as a circle, keep the subject centred and avoid important detail in the corners. It is a separate asset from the banner.'
  - q: 'Can I export a YouTube banner from this site''s builder?'
    a: 'Not as a finished PNG yet. The template.how builder currently exports PDF, DOCX, and print — it does not render a pixel-exact 2560 × 1440 PNG canvas with safe-area guides. PNG/canvas export is a known gap we are working on. For now, use the exact dimensions and the 1546 × 423 safe-area position on this page to set up a canvas in Canva, Photopea, Figma, GIMP, or Photoshop, and export the PNG there. The hard part — the correct, current numbers — is what this page provides.'
  - q: 'Should I reuse my YouTube banner on other platforms?'
    a: 'Reuse the visual style for brand consistency, but re-export at each platform''s dimensions. A 2560 × 1440 YouTube banner does not fit a Twitch profile banner (1200 × 480) or an Instagram header. Build a master design and crop or re-frame it per platform rather than uploading the same file everywhere — the aspect ratios and safe areas differ, and a mismatched upload looks unprofessional.'
---

## What "YouTube banner size" means

The YouTube banner — officially "channel art" or the "banner image" — is the wide header across the top of your channel page. The reason it confuses people is that YouTube serves **one image to every device but crops it differently** on each. A banner that looks perfect on your desktop can have its channel name sliced off on a phone, or its logo hidden behind a TV's overscan.

The whole problem reduces to two numbers, both verified against YouTube's official help documentation in June 2026:

- **Upload size: 2560 × 1440 pixels** (16:9). This covers the largest display, a TV, and scales down cleanly.
- **Safe area: 1546 × 423 pixels**, centred. This is the only region guaranteed to show on **every** device, including mobile.

Master those two numbers and the position of the safe box, and you will never have a banner crop badly again.

## The upload size: 2560 × 1440

Always build and upload at **2560 × 1440 pixels**, a 16:9 aspect ratio, in RGB at 72 DPI.

- **Recommended upload:** 2560 × 1440 px
- **Minimum accepted:** 2048 × 1152 px (do not design to this — it goes soft on large screens)
- **File formats:** JPG, GIF, BMP, or PNG
- **Maximum file size:** 6 MB

Why the full 2560 × 1440? Because YouTube displays the banner at full resolution on TVs, and any smaller upload gets upscaled and looks blurry on big screens. Designing larger than the display and letting the platform scale down is always sharper than designing small and letting it scale up. If your exported PNG creeps over the 6 MB limit, check you have not accidentally exported at 2× (5120 × 2880) and switch to JPEG for photographic banners.

## The safe area: 1546 × 423, centred

This is the rule that matters more than any other. YouTube crops the single banner image to fit each device:

| Device | Visible region (approx.) |
|---|---|
| Mobile | central **1546 × 423** px |
| Tablet | ~1855 × 423 px |
| Desktop | ~2560 × 423 px strip |
| TV | full **2560 × 1440** px |

The intersection — the part **every** device shows — is the central **1546 × 423 pixels**. On the 2560 × 1440 canvas, this box begins roughly **507 px from the left** and **509 px from the top**.

**Everything that carries information goes inside that box:** channel name, logo, tagline, upload schedule, social handles. Everything outside it is decorative background — colour, gradient, texture, or photography that can be cropped on smaller screens without losing meaning. A mobile viewer (the majority of YouTube traffic) sees only the safe area; if your channel name sits at the edge, that viewer never sees it.

At the 2048 × 1152 minimum, the safe area shrinks to **1235 × 338 px** — another reason to design at the recommended 2560 × 1440 and give yourself the larger 1546 × 423 working space.

## What to put in the banner

The safe area is not large — 1546 × 423 is a wide, short letterbox — so restraint wins. The strongest channel banners contain only:

- **Channel name or logo** — the primary identity element.
- **A short tagline** — five to eight words describing what the channel is about ("Weekly woodworking for beginners").
- **Upload schedule** — "New videos every Tuesday", which sets a viewer expectation and is proven to help retention.
- **Optional: social handles** — only if they fit without clutter.

Resist filling the safe area with text. A banner crammed edge to edge reads as visual noise and undercuts the professionalism it is meant to convey. White space inside the safe area is a feature, not wasted room.

## Related assets: profile picture and thumbnails

Two adjacent sizes people ask about in the same context:

- **Profile picture (channel icon):** recommended **800 × 800 px**, displayed as a 98 × 98 circle, under 4 MB, JPG/PNG/BMP/GIF (no animation). Centre the subject because it is masked to a circle.
- **Video thumbnail:** **1280 × 720 px** (16:9), under 2 MB. This is a per-video asset, completely separate from the banner — do not confuse them. The banner brands the channel; the thumbnail sells one video.

A full channel kit is therefore a 2560 × 1440 banner, an 800 × 800 icon, and a thumbnail style applied at 1280 × 720 per video, all sharing a colour palette and typeface.

<aside class="tip">
**Expert tip:** Before you design anything, paste a known YouTube safe-area template into your canvas — a 2560 × 1440 file with the 1546 × 423 box already marked at 507 px / 509 px offsets — and lock it as a guide layer. Canva, Figma, and Photopea all have these templates built in or available free. Designing against a visible safe-area guide eliminates the single most common YouTube banner failure: a beautiful desktop banner whose channel name vanishes on mobile. Spend the thirty seconds to place the guide first; it saves the re-export every time.
</aside>

## Common mistakes

**Mistake 1: Putting the channel name outside the safe area.** It looks fine on your desktop and disappears on every phone. Keep all text and logos inside the central 1546 × 423 box.

**Mistake 2: Designing at the minimum size.** 2048 × 1152 is the floor, not the target. It upscales and softens on TVs. Design at 2560 × 1440.

**Mistake 3: Wrong aspect ratio.** A banner that is not 16:9 gets cropped and rescaled by YouTube, distorting it. Match 2560 × 1440 (or any exact 16:9) precisely.

**Mistake 4: Over-compressed JPEG on text.** Lettering goes fuzzy under heavy JPEG compression. Use PNG for text-heavy banners.

**Mistake 5: Overcrowding the safe area.** Too much text in a small space reads as noise. Logo, tagline, schedule — stop there.

**Mistake 6: Confusing the banner with a thumbnail.** They are different sizes (2560 × 1440 vs 1280 × 720) and different jobs. Build them separately.

## A note on exporting from this site

Honestly: the template.how builder currently exports **PDF, DOCX, and print** — it does **not** yet produce a pixel-exact 2560 × 1440 PNG with safe-area guides. For a YouTube banner the deliverable you need is a PNG, and PNG/canvas export is a known gap we are working on.

What this page delivers is the part that is actually hard to get right and easy to get wrong: the **exact upload size, the exact safe-area dimensions and position, the file limits, and the per-device crop behaviour**. Take those into any tool that exports PNG — Canva (has YouTube-sized templates with safe-area overlays), Photopea (free, browser-based), Figma, GIMP, or Photoshop — set the canvas to 2560 × 1440, drop in the 1546 × 423 guide, and export. The numbers are the value; the tool is your choice.

## Worked example

Tom Reyes runs a 12,000-subscriber channel on home-coffee brewing and wants a banner that does not break on phones. He works in Canva.

He selects Canva's "YouTube Channel Art" template, which opens a 2560 × 1440 canvas with the 1546 × 423 safe area already outlined. He fills the full canvas with a warm photographic background of coffee equipment — that imagery can safely run to the edges because it carries no information that must survive cropping.

Inside the safe-area box he places only three things: his logo (a stylised coffee dripper) at the left, the channel name "Slow Pour" centred, and the line "New brew guides every Tuesday" beneath it. Nothing else. He checks Canva's TV / desktop / mobile previews: on mobile, the name, logo, and schedule all hold; the background crops to a tighter coffee shot but loses no information.

He exports as PNG. The file comes out at 3.2 MB — comfortably under the 6 MB limit. He uploads via YouTube Studio → Customisation → Branding, nudges the crop so the safe content is centred in all three device previews, saves, then opens his channel on his phone to confirm. The name and schedule are perfectly visible. Total time: about twenty-five minutes.

## Designing the banner well, not just correctly

Getting the dimensions right is the floor, not the ceiling. A technically perfect 2560 × 1440 banner with the channel name jammed into the safe area in a hard-to-read font still under-performs. A few design principles separate a banner that merely fits from one that works:

**Contrast over decoration.** The safe area must be legible at a glance, often on a small phone screen. Dark text on a light panel, or light text on a dark panel, with strong contrast, beats elegant low-contrast typography every time. If your background photography is busy, place your text on a solid or semi-transparent panel rather than directly on the image, where it competes with detail behind it.

**One typeface, two weights, maximum.** A banner with three fonts looks amateur. Pick one typeface, use a bold weight for the channel name and a regular weight for the tagline, and stop there. Consistency reads as professionalism.

**Echo your thumbnails.** The strongest channels use the same colours and typeface across their banner, profile picture, and video thumbnails, so a viewer's eye connects them instantly. The banner is the anchor of that visual system; design it first, then carry its palette into your thumbnail style.

**Mind the profile picture overlap.** On the channel page, your circular profile picture and channel name sit near or over part of the banner on some layouts. Avoid placing critical banner content where the avatar or channel title will overlap it — preview the live channel page after uploading to catch any collision.

## How the banner fits your wider channel branding

A YouTube banner does not exist in isolation. It is one element of a channel's visual identity that also includes the profile picture, the video thumbnails, the channel trailer, and increasingly the Shorts you publish. The banner's job in that system is to be the **first impression of the whole channel** — the wide header a new visitor sees the instant they land on your page, before they have watched anything.

That framing changes what you put in the safe area. A visitor arriving on your channel page is asking, often subconsciously, three questions: *What is this channel about? Should I subscribe? When will I get more?* A banner that answers all three — a clear identity, a one-line value proposition, and an upload schedule — does more conversion work than any amount of decoration. "Slow Pour — weekly coffee brew guides — new videos every Tuesday" answers all three in the safe area; a banner showing only a logo answers none of them.

This is also why the upload schedule is worth its space. Telling visitors when to expect new content sets an expectation that, when met, builds the return-viewing habit that the YouTube algorithm rewards. A banner is a small, permanent, free piece of channel real estate; using it to make a promise you keep is one of the cheapest growth levers available.

## UK and US notes

YouTube banner dimensions are identical worldwide — there is no UK/US difference in the 2560 × 1440 size or the 1546 × 423 safe area. The one locale-sensitive element is wording on the banner: if you publish an upload schedule and you have an international audience, name the day rather than a time ("New videos every Tuesday" travels better than "uploads at 6pm", which is ambiguous across timezones). Spelling conventions on a tagline ("colour" vs "color", "favourite" vs "favorite") should match your primary audience, but neither affects how the banner renders.
