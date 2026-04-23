import type { BuilderSchema, BuilderField } from './schema';
import type { BuilderState } from './state';
import { evaluate } from './expression';

export interface RenderedField {
  id: string;
  label: string;
  value: string;
}

export interface RenderedSection {
  heading: string;
  fields: RenderedField[];
}

export interface DocumentTree {
  title: string;
  sections: RenderedSection[];
}

const stringify = (v: unknown): string => {
  if (v === null || v === undefined) return '';
  if (typeof v === 'boolean') return v ? 'Yes' : 'No';
  return String(v);
};

const fieldVisible = (f: BuilderField, state: BuilderState): boolean =>
  !f.showIf || evaluate(f.showIf, state);

export const buildDocumentTree = (schema: BuilderSchema, state: BuilderState): DocumentTree => ({
  title: schema.title,
  sections: schema.sections.map((s) => ({
    heading: s.heading,
    fields: s.fields
      .filter((f) => fieldVisible(f, state))
      .map((f) => ({ id: f.id, label: f.label, value: stringify(state[f.id]) }))
  }))
});
