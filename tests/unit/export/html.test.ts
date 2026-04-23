import { describe, it, expect } from 'vitest';
import { documentToHtml } from '../../../src/lib/export/html';
import type { DocumentTree } from '../../../src/lib/builder/render';

const tree: DocumentTree = {
  title: 'Bill of Sale',
  sections: [
    { heading: 'Parties', fields: [{ id: 'seller', label: 'Seller', value: 'Sunny' }] }
  ]
};

describe('documentToHtml', () => {
  it('emits a self-contained HTML string with the title and field values', () => {
    const html = documentToHtml(tree);
    expect(html).toContain('<h1>Bill of Sale</h1>');
    expect(html).toContain('<h2>Parties</h2>');
    expect(html).toContain('Sunny');
  });
  it('escapes HTML in field values', () => {
    const evil: DocumentTree = { title: 't', sections: [{ heading: 'h', fields: [{ id: 'x', label: 'x', value: '<script>alert(1)</script>' }] }] };
    expect(documentToHtml(evil)).not.toContain('<script>alert');
    expect(documentToHtml(evil)).toContain('&lt;script&gt;');
  });
});
