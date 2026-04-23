import { FieldShell } from './FieldShell';
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

export const SelectField = ({ id, label, value, onChange, options, required, help }: Props) => {
  const opts = resolve(options);
  return (
    <FieldShell id={id} label={label} required={required} help={help}>
      <select
        id={id}
        className="b-input b-select"
        value={value}
        required={required}
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="" disabled={required}>Select…</option>
        {opts.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
      </select>
    </FieldShell>
  );
};
