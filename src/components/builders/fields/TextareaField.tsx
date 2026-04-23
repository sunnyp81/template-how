import { FieldShell } from './FieldShell';

interface Props {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  required?: boolean;
  help?: string;
}

export const TextareaField = ({ id, label, value, onChange, required, help }: Props) => (
  <FieldShell id={id} label={label} required={required} help={help}>
    <textarea
      id={id}
      className="b-input b-textarea"
      value={value}
      required={required}
      rows={4}
      onChange={(e) => onChange(e.target.value)}
    />
  </FieldShell>
);
