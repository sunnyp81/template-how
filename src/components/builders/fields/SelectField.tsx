import { FieldShell, describedBy } from './FieldShell';
import { US_STATES, UK_NATIONS } from '@/data/jurisdictions';

interface Option { value: string; label: string; }
type OptionsSource = Option[] | 'us-states' | 'uk-nations' | 'us-states+uk-nations';

interface Props {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: OptionsSource;
  required?: boolean;
  help?: string;
  error?: string;
}

const resolve = (src: OptionsSource): Option[] => {
  if (Array.isArray(src)) return src;
  if (src === 'us-states') return US_STATES.map((s) => ({ value: s.code, label: s.region }));
  if (src === 'uk-nations') return UK_NATIONS.map((n) => ({ value: n.code, label: n.region }));
  return [
    ...US_STATES.map((s) => ({ value: s.code, label: `${s.region}, US` })),
    ...UK_NATIONS.map((n) => ({ value: n.code, label: `${n.region}, UK` }))
  ];
};

export const SelectField = ({ id, label, value, onChange, options, required, help, error }: Props) => {
  const opts = resolve(options);
  return (
    <FieldShell id={id} label={label} required={required} help={help} error={error}>
      <div className="b-select-wrap">
        <select
          id={id}
          className="b-input b-select"
          value={value}
          required={required}
          aria-required={required || undefined}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy(id, help, error)}
          onChange={(e) => onChange(e.target.value)}
        >
          <option value="" disabled={required}>Select…</option>
          {opts.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
        </select>
        <svg className="b-select-caret" viewBox="0 0 12 8" aria-hidden="true" width="12" height="8">
          <path fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" d="M1 1.5 6 6.5 11 1.5" />
        </svg>
      </div>
    </FieldShell>
  );
};
