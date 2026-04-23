import { describe, it, expect } from 'vitest';
import { evaluate } from '../../../src/lib/builder/expression';

const state = { item_type: 'vehicle', price: 5000, has_vin: true, notes: '' };

describe('evaluate', () => {
  it('returns true for a truthy id check', () => {
    expect(evaluate('has_vin', state)).toBe(true);
  });
  it('returns false for an empty-string id check', () => {
    expect(evaluate('notes', state)).toBe(false);
  });
  it('handles string equality', () => {
    expect(evaluate("item_type == 'vehicle'", state)).toBe(true);
    expect(evaluate("item_type == 'boat'", state)).toBe(false);
  });
  it('handles string inequality', () => {
    expect(evaluate("item_type != 'boat'", state)).toBe(true);
  });
  it('handles number equality', () => {
    expect(evaluate('price == 5000', state)).toBe(true);
  });
  it('joins with && (logical AND)', () => {
    expect(evaluate("item_type == 'vehicle' && price == 5000", state)).toBe(true);
    expect(evaluate("item_type == 'vehicle' && price == 1", state)).toBe(false);
  });
  it('throws on unsafe input', () => {
    expect(() => evaluate('alert(1)', state)).toThrow();
  });
  it('returns false for unknown id', () => {
    expect(evaluate('missing_id', state)).toBe(false);
  });
});
