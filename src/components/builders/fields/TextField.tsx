import type { HTMLInputTypeAttribute, InputHTMLAttributes } from 'react';
import { FieldShell } from './FieldShell';

type InputMode = InputHTMLAttributes<unknown>['inputMode'];

interface Props {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  required?: boolean;
  help?: string;
  /** Override the inferred input type (e.g. 'number' for quantity fields). */
  type?: HTMLInputTypeAttribute;
  inputMode?: InputMode;
  autoComplete?: string;
}

interface FieldHints {
  type: HTMLInputTypeAttribute;
  inputMode?: InputMode;
  autoComplete?: string;
}

/**
 * Infer the right mobile keyboard + autofill hints from a field id/label so
 * phone users get the correct keyboard and browser autofill. Falls back to a
 * plain text field. Explicit props always win over inference.
 */
const inferHints = (id: string, label: string): FieldHints => {
  const k = `${id} ${label}`.toLowerCase();
  if (/\bemail\b|e-mail/.test(k)) return { type: 'email', inputMode: 'email', autoComplete: 'email' };
  if (/\bphone\b|telephone|\btel\b|mobile|cell/.test(k)) return { type: 'tel', inputMode: 'tel', autoComplete: 'tel' };
  if (/\bzip\b|postal|postcode/.test(k)) return { type: 'text', inputMode: 'numeric', autoComplete: 'postal-code' };
  if (/street|address(?!.*email)/.test(k)) return { type: 'text', autoComplete: 'street-address' };
  if (/\bcity\b|town/.test(k)) return { type: 'text', autoComplete: 'address-level2' };
  if (/full ?name|\bname\b/.test(k)) return { type: 'text', autoComplete: 'name' };
  return { type: 'text' };
};

export const TextField = ({ id, label, value, onChange, required, help, type, inputMode, autoComplete }: Props) => {
  const hints = inferHints(id, label);
  return (
    <FieldShell id={id} label={label} required={required} help={help}>
      <input
        id={id}
        type={type ?? hints.type}
        inputMode={inputMode ?? hints.inputMode}
        autoComplete={autoComplete ?? hints.autoComplete}
        className="b-input"
        value={value}
        required={required}
        onChange={(e) => onChange(e.target.value)}
      />
    </FieldShell>
  );
};
