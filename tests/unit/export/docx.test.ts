import { describe, it, expect } from 'vitest';
import { documentToDocxBlob } from '../../../src/lib/export/docx';
import type { DocumentTree } from '../../../src/lib/builder/render';

const tree: DocumentTree = {
  title: 'Bill of Sale',
  sections: [{ heading: 'Parties', fields: [{ id: 'seller', label: 'Seller', value: 'Sunny' }] }]
};

describe('documentToDocxBlob', () => {
  it('returns a non-empty DOCX Blob', async () => {
    const blob = await documentToDocxBlob(tree);
    expect(blob.size).toBeGreaterThan(1000);
    expect(blob.type).toContain('officedocument');
  });
});
