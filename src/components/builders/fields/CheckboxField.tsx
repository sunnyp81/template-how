import { FieldShell } from './FieldShell';

interface Props {
  id: string;
  label: string;
  value: boolean;
  onChange: (v: boolean) => void;
  required?: boolean;
  help?: string;
}

export const CheckboxField = ({ id, label, value, onChange, help }: Props) => (
  <FieldShell id={id} label={label} help={help}>
    <input
      id={id}
      type="checkbox"
      className="b-checkbox"
      checked={value}
      onChange={(e) => onChange(e.target.checked)}
    />
  </FieldShell>
);
