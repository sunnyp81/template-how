import type { ReactNode } from 'react';

interface Props {
  id: string;
  label: string;
  required?: boolean;
  help?: string;
  /** Validation message to surface (empty required field, etc.). */
  error?: string;
  children: ReactNode;
}

/**
 * Field wrapper: associates the label, help text and any error message with the
 * control via `id`-derived ids so `aria-describedby` (wired in each field) keeps
 * the relationship explicit for assistive tech. Required vs optional is stated
 * in words, not colour alone.
 */
export const FieldShell = ({ id, label, required, help, error, children }: Props) => (
  <div className="b-field" data-invalid={error ? 'true' : undefined}>
    <label htmlFor={id} className="b-label">
      <span className="b-label-text">{label}</span>
      {required ? (
        <span className="b-req">
          <span aria-hidden="true">*</span>
          <span className="sr-only"> (required)</span>
        </span>
      ) : (
        <span className="b-optional">Optional</span>
      )}
    </label>
    {children}
    {help ? <p id={`${id}-help`} className="b-help">{help}</p> : null}
    {error ? (
      <p id={`${id}-error`} className="b-error" role="alert">
        <svg className="b-error-icon" viewBox="0 0 16 16" aria-hidden="true" width="14" height="14">
          <path
            fill="currentColor"
            d="M8 1a7 7 0 100 14A7 7 0 008 1zm0 3.2a.9.9 0 01.9.9v3.6a.9.9 0 01-1.8 0V5.1a.9.9 0 01.9-.9zm0 7.9a1 1 0 110-2 1 1 0 010 2z"
          />
        </svg>
        {error}
      </p>
    ) : null}
  </div>
);

/** Compute the aria-describedby value from which sub-parts are present. */
export const describedBy = (id: string, help?: string, error?: string): string | undefined => {
  const ids = [help ? `${id}-help` : null, error ? `${id}-error` : null].filter(Boolean);
  return ids.length ? ids.join(' ') : undefined;
};
