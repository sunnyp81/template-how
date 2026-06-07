import type { BuilderSchema, BuilderField } from '@/lib/builder/schema';
import type { BuilderState } from '@/lib/builder/state';
import { evaluate } from '@/lib/builder/expression';
import { isRequiredNow, isFilled, type BuilderProgress } from './useBuilderProgress';
import { TextField } from './fields/TextField';
import { TextareaField } from './fields/TextareaField';
import { SelectField } from './fields/SelectField';
import { CurrencyField } from './fields/CurrencyField';
import { DateField } from './fields/DateField';
import { CheckboxField } from './fields/CheckboxField';

interface Props {
  schema: BuilderSchema;
  state: BuilderState;
  onChange: (id: string, value: BuilderState[string]) => void;
  progress: BuilderProgress;
  showErrors: boolean;
}

const visible = (f: BuilderField, state: BuilderState): boolean =>
  !f.showIf || evaluate(f.showIf, state);

const renderField = (
  f: BuilderField,
  state: BuilderState,
  onChange: Props['onChange'],
  error: string | undefined
) => {
  const value = state[f.id];
  const required = isRequiredNow(f, state);
  const common = { id: f.id, label: f.label, required, help: f.help, error };
  switch (f.type) {
    case 'text': return <TextField {...common} value={String(value ?? '')} onChange={(v) => onChange(f.id, v)} />;
    case 'textarea': return <TextareaField {...common} value={String(value ?? '')} onChange={(v) => onChange(f.id, v)} />;
    case 'select': return <SelectField {...common} options={f.options} value={String(value ?? '')} onChange={(v) => onChange(f.id, v)} />;
    case 'currency': return <CurrencyField {...common} currency={f.currency} value={String(value ?? '')} onChange={(v) => onChange(f.id, v)} />;
    case 'date': return <DateField {...common} value={String(value ?? '')} onChange={(v) => onChange(f.id, v)} />;
    case 'checkbox': return <CheckboxField id={f.id} label={f.label} help={f.help} value={Boolean(value)} onChange={(v) => onChange(f.id, v)} />;
    case 'number': return <TextField {...common} type="number" inputMode="numeric" autoComplete="off" value={String(value ?? '')} onChange={(v) => onChange(f.id, v)} />;
  }
};

export const BuilderForm = ({ schema, state, onChange, progress, showErrors }: Props) => (
  <form className="b-form" onSubmit={(e) => e.preventDefault()} noValidate>
    {schema.sections.map((section, i) => {
      const sp = progress.sections.find((s) => s.id === section.id);
      const fields = section.fields.filter((f) => visible(f, state));
      return (
        <fieldset key={section.id} className="b-section" data-complete={sp?.complete || undefined}>
          <legend className="b-legend">
            <span className="b-legend-num" aria-hidden="true">
              {sp?.complete ? (
                <svg viewBox="0 0 16 16" width="13" height="13">
                  <path fill="currentColor" d="M6.2 11.3 2.9 8l1.1-1.1 2.2 2.2 5-5L12.3 5z" />
                </svg>
              ) : (
                i + 1
              )}
            </span>
            <span className="b-legend-text">{section.heading}</span>
            {sp?.hasRequired ? (
              <span className="b-legend-count" data-complete={sp.complete || undefined}>
                {sp.complete ? 'Done' : `${sp.filled}/${sp.required}`}
              </span>
            ) : null}
          </legend>
          <div className="b-section-fields">
            {fields.map((f) => {
              const required = isRequiredNow(f, state);
              const error = showErrors && required && !isFilled(f, state) ? 'This field is required.' : undefined;
              return (
                <div key={f.id} className="b-field-wrap">
                  {renderField(f, state, onChange, error)}
                </div>
              );
            })}
          </div>
        </fieldset>
      );
    })}
  </form>
);
