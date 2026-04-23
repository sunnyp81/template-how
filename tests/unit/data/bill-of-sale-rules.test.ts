// tests/unit/data/bill-of-sale-rules.test.ts
import { describe, it, expect } from 'vitest';
import { z } from 'zod';
import rules from '../../../src/data/legal/bill-of-sale-state-rules.json';
import { ALL_JURISDICTIONS } from '../../../src/data/jurisdictions';

const ruleSchema = z.object({
  code: z.string(),
  notary_required: z.boolean().nullable(),
  witness_required: z.boolean().nullable(),
  required_fields: z.array(z.string()),
  vehicle_extra_fields: z.array(z.string()),
  governing_statute: z.string().nullable(),
  statute_url: z.string().url().nullable(),
  vehicle_dmv_form: z.string().nullable(),
  vehicle_dmv_url: z.string().url().nullable(),
  notes: z.string(),
  last_verified: z.string().regex(/^\d{4}-\d{2}-\d{2}$/)
});

describe('bill-of-sale state rules', () => {
  it('covers every jurisdiction in the registry', () => {
    const codes = new Set(Object.keys(rules));
    for (const j of ALL_JURISDICTIONS) {
      expect(codes.has(j.code)).toBe(true);
    }
  });

  it('every entry passes the rule schema', () => {
    for (const [, entry] of Object.entries(rules)) {
      expect(() => ruleSchema.parse(entry)).not.toThrow();
    }
  });

  it("entry's `code` field matches its key", () => {
    for (const [key, entry] of Object.entries(rules) as [string, { code: string }][]) {
      expect(entry.code).toBe(key);
    }
  });
});
