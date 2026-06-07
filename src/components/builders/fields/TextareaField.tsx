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

export const TextareaField = ({ id, label, value, onChange, required, help, error }: Props) => (
  <FieldShell id={id} label={label} required={required} help={help} error={error}>
    <textarea
      id={id}
      className="b-input b-textarea"
      value={value}
      required={required}
      rows={4}
      aria-required={required || undefined}
      aria-invalid={error ? true : undefined}
      aria-describedby={describedBy(id, help, error)}
      onChange={(e) => onChange(e.target.value)}
    />
  </FieldShell>
);
