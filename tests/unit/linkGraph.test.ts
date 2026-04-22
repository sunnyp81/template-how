import { describe, it, expect } from 'vitest';
import { validateLinkGraph, type Page } from '../../src/lib/linkGraph';

describe('validateLinkGraph', () => {
  it('accepts a graph where every page has at least 3 incoming links', () => {
    const pages: Page[] = [
      { url: '/', outbound: ['/a/', '/b/', '/c/', '/d/'] },
      { url: '/a/', outbound: ['/', '/b/', '/c/', '/d/'] },
      { url: '/b/', outbound: ['/', '/a/', '/c/', '/d/'] },
      { url: '/c/', outbound: ['/', '/a/', '/b/', '/d/'] },
      { url: '/d/', outbound: ['/', '/a/', '/b/', '/c/'] }
    ];
    const result = validateLinkGraph(pages, { minIncoming: 3 });
    expect(result.orphans).toEqual([]);
    expect(result.underLinked).toEqual([]);
  });

  it('reports pages with zero incoming links as orphans', () => {
    const pages: Page[] = [
      { url: '/', outbound: ['/a/'] },
      { url: '/a/', outbound: ['/'] },
      { url: '/isolated/', outbound: [] }
    ];
    const result = validateLinkGraph(pages, { minIncoming: 3 });
    expect(result.orphans).toContain('/isolated/');
  });

  it('reports pages with 1-2 incoming links as under-linked', () => {
    const pages: Page[] = [
      { url: '/', outbound: ['/a/', '/b/'] },
      { url: '/a/', outbound: ['/b/'] },
      { url: '/b/', outbound: ['/a/'] }
    ];
    const result = validateLinkGraph(pages, { minIncoming: 3 });
    expect(result.underLinked.map((u) => u.url)).toContain('/a/');
    expect(result.underLinked.map((u) => u.url)).toContain('/b/');
  });

  it('ignores external links', () => {
    const pages: Page[] = [
      { url: '/', outbound: ['https://example.com/', '/a/', '/b/', '/c/'] },
      { url: '/a/', outbound: ['/', '/b/', '/c/', '/d/'] },
      { url: '/b/', outbound: ['/', '/a/', '/c/', '/d/'] },
      { url: '/c/', outbound: ['/', '/a/', '/b/', '/d/'] },
      { url: '/d/', outbound: ['/', '/a/', '/b/', '/c/'] }
    ];
    const result = validateLinkGraph(pages, { minIncoming: 3 });
    expect(result.orphans).toEqual([]);
  });

  it('normalises trailing slashes when counting incoming links', () => {
    const pages: Page[] = [
      { url: '/a/', outbound: ['/b', '/b/', '/b/?utm=x'] },
      { url: '/b/', outbound: ['/a/', '/a/', '/a/'] }
    ];
    const result = validateLinkGraph(pages, { minIncoming: 3 });
    // /b/ should have 3 incoming counted from /a/'s three variants
    expect(result.orphans).toEqual([]);
    expect(result.underLinked.map((u) => u.url)).not.toContain('/b/');
  });
});
