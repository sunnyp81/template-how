#!/usr/bin/env tsx
import { readdirSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';

const HOST = 'template.how';
const KEY = '213653cd3ddb06b15bf4e47b11e2bc3a';
const KEY_LOCATION = `https://${HOST}/${KEY}.txt`;
const DIST = join(process.cwd(), 'dist');

const walk = (dir: string, acc: string[] = []): string[] => {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    const st = statSync(full);
    if (st.isDirectory()) walk(full, acc);
    else if (entry === 'index.html') acc.push(full);
  }
  return acc;
};

const htmlToUrl = (file: string): string => {
  const rel = relative(DIST, file).replace(/\\/g, '/');
  const dir = rel.replace(/index\.html$/, '');
  return `https://${HOST}/${dir}`;
};

const urls = walk(DIST).map(htmlToUrl);
console.log(`[indexnow] pushing ${urls.length} URLs to IndexNow…`);

const body = { host: HOST, key: KEY, keyLocation: KEY_LOCATION, urlList: urls };

(async () => {
  const res = await fetch('https://api.indexnow.org/indexnow', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  });
  console.log(`[indexnow] HTTP ${res.status} ${res.statusText}`);
  if (res.status >= 400) {
    const text = await res.text();
    console.error(text);
    process.exit(1);
  }
})();
