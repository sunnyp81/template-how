export interface Page {
  url: string;
  outbound: string[];
}

export interface ValidationOptions {
  minIncoming: number;
}

export interface ValidationResult {
  orphans: string[];
  underLinked: Array<{ url: string; incoming: number }>;
}

const normalise = (raw: string): string | null => {
  if (!raw) return null;
  if (/^https?:\/\//i.test(raw)) return null;
  if (raw.startsWith('#') || raw.startsWith('mailto:') || raw.startsWith('tel:')) return null;
  const withoutQuery = raw.split('?')[0].split('#')[0];
  if (withoutQuery === '' || withoutQuery === '/') return '/';
  const trimmed = withoutQuery.endsWith('/') ? withoutQuery : `${withoutQuery}/`;
  return trimmed.startsWith('/') ? trimmed : `/${trimmed}`;
};

export const validateLinkGraph = (
  pages: Page[],
  opts: ValidationOptions
): ValidationResult => {
  const knownUrls = new Set(pages.map((p) => normalise(p.url)).filter(Boolean) as string[]);
  const incoming = new Map<string, number>();
  knownUrls.forEach((u) => incoming.set(u, 0));

  for (const page of pages) {
    const from = normalise(page.url);
    if (!from) continue;
    for (const raw of page.outbound) {
      const to = normalise(raw);
      if (!to) continue;
      if (!knownUrls.has(to)) continue;
      if (to === from) continue;
      incoming.set(to, (incoming.get(to) ?? 0) + 1);
    }
  }

  const orphans: string[] = [];
  const underLinked: Array<{ url: string; incoming: number }> = [];
  for (const [url, count] of incoming) {
    if (url === '/') continue;
    if (count === 0) orphans.push(url);
    else if (count < opts.minIncoming) underLinked.push({ url, incoming: count });
  }
  return { orphans, underLinked };
};
