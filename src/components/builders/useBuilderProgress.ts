import { useMemo } from 'react';
import type { BuilderSchema, BuilderField } from '@/lib/builder/schema';
import type { BuilderState } from '@/lib/builder/state';
import { evaluate } from '@/lib/builder/expression';

/** A field is on-screen only when its showIf gate passes (or is absent). */
const isVisible = (f: BuilderField, state: BuilderState): boolean =>
  !f.showIf || evaluate(f.showIf, state);

/** Whether a field is required right now (static `required` or a passing `requiredIf`). */
export const isRequiredNow = (f: BuilderField, state: BuilderState): boolean => {
  if (f.requiredIf) return evaluate(f.requiredIf, state);
  return Boolean(f.required);
};

/** True when the user has supplied a usable value for the field. */
export const isFilled = (f: BuilderField, state: BuilderState): boolean => {
  const v = state[f.id];
  if (f.type === 'checkbox') return v === true; // an unchecked optional box is "answered" as a value, but for progress we count a true tick
  if (v === null || v === undefined) return false;
  return String(v).trim().length > 0;
};

export interface SectionProgress {
  id: string;
  heading: string;
  /** Required visible fields in this section. */
  required: number;
  /** Required visible fields that are filled. */
  filled: number;
  /** All required visible fields satisfied. */
  complete: boolean;
  /** Section has at least one required field. */
  hasRequired: boolean;
}

export interface BuilderProgress {
  sections: SectionProgress[];
  requiredTotal: number;
  requiredFilled: number;
  /** 0–100 share of required fields completed (100 when nothing is required). */
  percent: number;
  complete: boolean;
}

/**
 * Derive completion progress across the form, honouring `showIf` visibility and
 * `requiredIf`/`required` so the indicators reflect what's actually being asked
 * for in the current state. Pure + memoised — recomputes only when state changes.
 */
export const useBuilderProgress = (schema: BuilderSchema, state: BuilderState): BuilderProgress =>
  useMemo(() => {
    let requiredTotal = 0;
    let requiredFilled = 0;

    const sections = schema.sections.map((section) => {
      const visibleFields = section.fields.filter((f) => isVisible(f, state));
      const requiredFields = visibleFields.filter((f) => isRequiredNow(f, state));
      const filled = requiredFields.filter((f) => isFilled(f, state)).length;
      requiredTotal += requiredFields.length;
      requiredFilled += filled;
      return {
        id: section.id,
        heading: section.heading,
        required: requiredFields.length,
        filled,
        complete: requiredFields.length > 0 && filled === requiredFields.length,
        hasRequired: requiredFields.length > 0
      } satisfies SectionProgress;
    });

    const percent = requiredTotal === 0 ? 100 : Math.round((requiredFilled / requiredTotal) * 100);
    return {
      sections,
      requiredTotal,
      requiredFilled,
      percent,
      complete: requiredFilled === requiredTotal
    };
  }, [schema, state]);
