# Search Console verification — template.how

## Google Search Console

1. Go to https://search.google.com/search-console
2. Click **Add property** → enter `template.how` (use **Domain property**, not URL prefix — covers http/https and all subdomains)
3. Choose **DNS verification**. GSC shows you a TXT record like `google-site-verification=xxxxxxxx`
4. In Cloudflare DNS for `template.how`: add the TXT record verbatim (Name: `@`, Type: `TXT`, Content: the value GSC gives you). Wait ~1 minute, then click **Verify** in GSC.
5. After verification, submit the sitemap: `https://template.how/sitemap-index.xml`

**To add in the second account** (`gsc-2012infinite`): repeat step 2-5 while logged into 2012.infinite@gmail.com. You only need one DNS TXT record per account, so add a second TXT record for the second verification token.

## Bing Webmaster Tools

1. Go to https://www.bing.com/webmasters/home
2. Click **Add a site** → enter `https://template.how/`
3. Recommended verification method: **XML file**
   - Bing gives you a file like `BingSiteAuth.xml` with a verification code inside
   - Save that file to `public/BingSiteAuth.xml` in this repo, commit + push to GitHub, and CF Pages redeploys it automatically
   - Then click **Verify** in Bing Webmaster
4. Once verified, submit sitemap: `https://template.how/sitemap-index.xml`
5. (Optional) Register IndexNow key in Bing Webmaster:
   - In Bing Webmaster → **IndexNow** section → paste key: `213653cd3ddb06b15bf4e47b11e2bc3a`
   - Key file is already live at `https://template.how/213653cd3ddb06b15bf4e47b11e2bc3a.txt`

## After verification

Run `npm run indexnow` from this repo root to push all built URLs to IndexNow (Bing + Yandex). Returns HTTP 200 if accepted.

```bash
npm run build   # ensure dist/ is fresh
npm run indexnow
```

GSC will start crawling within 1–2 days; submitted sitemaps appear in the **Sitemaps** panel within a few hours.

## IndexNow key reference

| Item | Value |
|------|-------|
| Key | `213653cd3ddb06b15bf4e47b11e2bc3a` |
| Key file URL | `https://template.how/213653cd3ddb06b15bf4e47b11e2bc3a.txt` |
| Sitemap | `https://template.how/sitemap-index.xml` |
