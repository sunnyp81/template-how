import { FieldShell, describedBy } from './FieldShell';

interface Props {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  currency?: 'USD' | 'GBP';
  required?: boolean;
  help?: string;
  error?: string;
}

const symbol = (c?: string) => (c === 'GBP' ? '£' : '$');

export const CurrencyField = ({ id, label, value, onChange, currency, required, help, error }: Props) => (
  <FieldShell id={id} label={label} required={required} help={help} error={error}>
    <div className="b-currency" data-invalid={error ? 'true' : undefined}>
      <span className="b-currency-sym" aria-hidden="true">{symbol(currency)}</span>
      <input
        id={id}
        type="number"
        inputMode="decimal"
        step="0.01"
        min="0"
        className="b-input b-currency-input"
        value={value}
        required={required}
        aria-required={required || undefined}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy(id, help, error)}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  </FieldShell>
);
