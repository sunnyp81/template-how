import { describe, it, expect } from 'vitest';
import { buildDocumentTree } from '../../../src/lib/builder/render';
import type { BuilderSchema } from '../../../src/lib/builder/schema';

const schema: BuilderSchema = {
  slug: 'bill-of-sale',
  title: 'Bill of Sale',
  renderer: 'legal-document',
  sections: [
    {
      id: 'parties',
      heading: 'Parties',
      fields: [
        { id: 'seller_name', label: 'Seller name', type: 'text', required: true },
        { id: 'buyer_name', label: 'Buyer name', type: 'text', required: true }
      ]
    },
    {
      id: 'item',
      heading: 'Item',
      fields: [
        { id: 'item_type', label: 'Item type', type: 'select', options: [
          { value: 'vehicle', label: 'Vehicle' },
          { value: 'other', label: 'Other' }
        ]},
        { id: 'vin', label: 'VIN', type: 'text', showIf: "item_type == 'vehicle'" }
      ]
    }
  ]
};

describe('buildDocumentTree', () => {
  it('emits a section per schema section with rendered fields', () => {
    const tree = buildDocumentTree(schema, { seller_name: 'Sunny', buyer_name: 'Alex', item_type: 'other' });
    expect(tree.title).toBe('Bill of Sale');
    expect(tree.sections).toHaveLength(2);
    expect(tree.sections[0].fields).toEqual([
      { id: 'seller_name', label: 'Seller name', value: 'Sunny' },
      { id: 'buyer_name', label: 'Buyer name', value: 'Alex' }
    ]);
  });

  it('omits fields whose showIf is false', () => {
    const tree = buildDocumentTree(schema, { item_type: 'other' });
    const item = tree.sections.find((s) => s.heading === 'Item')!;
    expect(item.fields.find((f) => f.id === 'vin')).toBeUndefined();
  });

  it('includes fields whose showIf is true', () => {
    const tree = buildDocumentTree(schema, { item_type: 'vehicle', vin: '1HGBH41JXMN109186' });
    const item = tree.sections.find((s) => s.heading === 'Item')!;
    expect(item.fields.find((f) => f.id === 'vin')?.value).toBe('1HGBH41JXMN109186');
  });

  it('renders missing values as empty string (no undefined leaks)', () => {
    const tree = buildDocumentTree(schema, {});
    expect(tree.sections[0].fields[0].value).toBe('');
  });
});
