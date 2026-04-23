import { FieldShell } from './FieldShell';

interface Props {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  currency?: 'USD' | 'GBP';
  required?: boolean;
  help?: string;
}

const symbol = (c?: string) => (c === 'GBP' ? '£' : '$');

export const CurrencyField = ({ id, label, value, onChange, currency, required, help }: Props) => (
  <FieldShell id={id} label={label} required={required} help={help}>
    <div className="b-currency">
      <span className="b-currency-sym" aria-hidden="true">{symbol(currency)}</span>
      <input
        id={id}
        type="number"
        inputMode="decimal"
        step="0.01"
        min="0"
        className="b-input"
        value={value}
        required={required}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  </FieldShell>
);
