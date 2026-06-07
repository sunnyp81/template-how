import { FieldShell, describedBy } from './FieldShell';

interface Props {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  required?: boolean;
  help?: string;
  error?: string;
}

export const DateField = ({ id, label, value, onChange, required, help, error }: Props) => (
  <FieldShell id={id} label={label} required={required} help={help} error={error}>
    <input
      id={id}
      type="date"
      className="b-input b-date"
      value={value}
      required={required}
      aria-required={required || undefined}
      aria-invalid={error ? true : undefined}
      aria-describedby={describedBy(id, help, error)}
      onChange={(e) => onChange(e.target.value)}
    />
  </FieldShell>
);
