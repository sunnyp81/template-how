import { describe, it, expect } from 'vitest';
import { site, author, NODE_SLUGS } from '../../src/lib/site';

describe('site config', () => {
  it('uses the canonical production URL', () => {
    expect(site.url).toBe('https://template.how');
  });
  it('exposes the full brand name', () => {
    expect(site.name).toBe('Template.how');
  });
  it('has exactly eight NODE slugs', () => {
    expect(NODE_SLUGS).toHaveLength(8);
  });
  it('lists the author with required sameAs links', () => {
    expect(author.name).toBe('Sunny Patel');
    expect(author.sameAs).toContain('https://www.linkedin.com/in/sunnypatel1994/');
  });
});
