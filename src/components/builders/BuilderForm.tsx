import type { BuilderSchema, BuilderField } from '@/lib/builder/schema';
import type { BuilderState } from '@/lib/builder/state';
import { evaluate } from '@/lib/builder/expression';
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
}

const visible = (f: BuilderField, state: BuilderState): boolean =>
  !f.showIf || evaluate(f.showIf, state);

const renderField = (f: BuilderField, state: BuilderState, onChange: Props['onChange']) => {
  const value = state[f.id];
  const common = { id: f.id, label: f.label, required: f.required, help: f.help };
  switch (f.type) {
    case 'text': return <TextField {...common} value={String(value ?? '')} onChange={(v) => onChange(f.id, v)} />;
    case 'textarea': return <TextareaField {...common} value={String(value ?? '')} onChange={(v) => onChange(f.id, v)} />;
    case 'select': return <SelectField {...common} options={f.options} value={String(value ?? '')} onChange={(v) => onChange(f.id, v)} />;
    case 'currency': return <CurrencyField {...common} currency={f.currency} value={String(value ?? '')} onChange={(v) => onChange(f.id, v)} />;
    case 'date': return <DateField {...common} value={String(value ?? '')} onChange={(v) => onChange(f.id, v)} />;
    case 'checkbox': return <CheckboxField {...common} value={Boolean(value)} onChange={(v) => onChange(f.id, v)} />;
    case 'number': return <TextField {...common} value={String(value ?? '')} onChange={(v) => onChange(f.id, v)} />;
  }
};

export const BuilderForm = ({ schema, state, onChange }: Props) => (
  <form className="b-form" onSubmit={(e) => e.preventDefault()}>
    {schema.sections.map((section) => (
      <fieldset key={section.id} className="b-section">
        <legend className="b-legend">{section.heading}</legend>
        {section.fields.filter((f) => visible(f, state)).map((f) => (
          <div key={f.id}>{renderField(f, state, onChange)}</div>
        ))}
      </fieldset>
    ))}
  </form>
);
