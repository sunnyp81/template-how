import { FieldShell } from './FieldShell';

interface Props {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  required?: boolean;
  help?: string;
}

export const DateField = ({ id, label, value, onChange, required, help }: Props) => (
  <FieldShell id={id} label={label} required={required} help={help}>
    <input
      id={id}
      type="date"
      className="b-input"
      value={value}
      required={required}
      onChange={(e) => onChange(e.target.value)}
    />
  </FieldShell>
);
