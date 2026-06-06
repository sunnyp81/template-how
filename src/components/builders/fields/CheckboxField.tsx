interface Props {
  id: string;
  label: string;
  value: boolean;
  onChange: (v: boolean) => void;
  required?: boolean;
  help?: string;
}

// Inline control-before-label row so it reads naturally and the entire 44px-tall
// row is the tap target (not the cramped block layout of FieldShell).
export const CheckboxField = ({ id, label, value, onChange, help }: Props) => (
  <div className="b-field">
    <label htmlFor={id} className="b-checkbox-row">
      <input
        id={id}
        type="checkbox"
        className="b-checkbox"
        checked={value}
        onChange={(e) => onChange(e.target.checked)}
      />
      <span className="b-checkbox-label">{label}</span>
    </label>
    {help ? <p className="b-help">{help}</p> : null}
  </div>
);
