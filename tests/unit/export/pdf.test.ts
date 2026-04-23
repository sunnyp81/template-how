import { describe, it, expect } from 'vitest';
import { documentToPdfBlob } from '../../../src/lib/export/pdf';
import type { DocumentTree } from '../../../src/lib/builder/render';

const tree: DocumentTree = {
  title: 'Bill of Sale',
  sections: [{ heading: 'Parties', fields: [{ id: 'seller', label: 'Seller', value: 'Sunny' }] }]
};

describe('documentToPdfBlob', () => {
  it('returns a non-empty PDF Blob', async () => {
    const blob = await documentToPdfBlob(tree);
    expect(blob.size).toBeGreaterThan(500);
    expect(blob.type).toBe('application/pdf');
  });
});
