import type { ReactNode } from 'react';

interface Props {
  id: string;
  label: string;
  required?: boolean;
  help?: string;
  children: ReactNode;
}

export const FieldShell = ({ id, label, required, help, children }: Props) => (
  <div className="b-field">
    <label htmlFor={id} className="b-label">
      {label}{required ? <span aria-hidden="true" className="b-req">*</span> : null}
    </label>
    {children}
    {help ? <p className="b-help">{help}</p> : null}
  </div>
);
