#!/usr/bin/env tsx
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';
import { validateLinkGraph, type Page } from '../src/lib/linkGraph';

const DIST = join(process.cwd(), 'dist');
const MIN_INCOMING = 3;

if (process.env.SKIP_LINK_GRAPH === '1') {
  console.warn('[link-graph] SKIP_LINK_GRAPH=1 — bypassing (foundation-only mode).');
  process.exit(0);
}

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
  return `/${dir}`.replace(/\/$/, '/') || '/';
};

const extractLinks = (html: string): string[] => {
  const out: string[] = [];
  const re = /href\s*=\s*"([^"]+)"/gi;
  let m;
  while ((m = re.exec(html))) out.push(m[1]);
  return out;
};

const files = walk(DIST);
const pages: Page[] = files.map((f) => ({
  url: htmlToUrl(f),
  outbound: extractLinks(readFileSync(f, 'utf8'))
}));

const result = validateLinkGraph(pages, { minIncoming: MIN_INCOMING });

if (result.orphans.length || result.underLinked.length) {
  if (result.orphans.length) {
    console.error(`\n[link-graph] Orphans (0 incoming):`);
    for (const u of result.orphans) console.error(`  ${u}`);
  }
  if (result.underLinked.length) {
    console.error(`\n[link-graph] Under-linked (<${MIN_INCOMING} incoming):`);
    for (const u of result.underLinked) console.error(`  ${u.url} (${u.incoming})`);
  }
  console.error(`\n[link-graph] FAIL — ${result.orphans.length} orphan(s), ${result.underLinked.length} under-linked.\n`);
  process.exit(1);
}
console.log(`[link-graph] OK — ${pages.length} pages, all have ≥${MIN_INCOMING} incoming links.`);
