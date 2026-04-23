import { describe, it, expect } from 'vitest';
import { builderSchemaValidator, type BuilderSchema } from '../../../src/lib/builder/schema';

describe('builderSchemaValidator', () => {
  const valid: BuilderSchema = {
    slug: 'bill-of-sale',
    title: 'Bill of Sale',
    renderer: 'legal-document',
    sections: [
      {
        id: 'parties',
        heading: 'Parties',
        fields: [
          { id: 'seller_name', label: 'Seller', type: 'text', required: true },
          { id: 'state', label: 'State', type: 'select', required: true, options: 'us-states' }
        ]
      }
    ]
  };

  it('accepts a minimally valid schema', () => {
    expect(() => builderSchemaValidator.parse(valid)).not.toThrow();
  });

  it('rejects a section without fields', () => {
    const bad = { ...valid, sections: [{ id: 'x', heading: 'x', fields: [] }] };
    expect(() => builderSchemaValidator.parse(bad)).toThrow();
  });

  it('rejects an unknown field type', () => {
    const bad = JSON.parse(JSON.stringify(valid));
    bad.sections[0].fields.push({ id: 'foo', label: 'foo', type: 'imaginary' });
    expect(() => builderSchemaValidator.parse(bad)).toThrow();
  });

  it('accepts conditional showIf expressions', () => {
    const ok = JSON.parse(JSON.stringify(valid));
    ok.sections[0].fields.push({ id: 'vin', label: 'VIN', type: 'text', showIf: "item_type == 'vehicle'" });
    expect(() => builderSchemaValidator.parse(ok)).not.toThrow();
  });
});
