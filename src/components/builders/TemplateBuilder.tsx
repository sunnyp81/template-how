import { useEffect, useId, useState } from 'react';
import type { BuilderSchema } from '@/lib/builder/schema';
import { useBuilderState } from '@/lib/builder/state';
import { buildDocumentTree } from '@/lib/builder/render';
import { useBuilderProgress } from './useBuilderProgress';
import { BuilderForm } from './BuilderForm';
import { BuilderPreview } from './BuilderPreview';
import { BuilderExports } from './BuilderExports';

interface Props {
  schema: BuilderSchema;
  filenameStem?: string;
}

type View = 'edit' | 'preview';

export const TemplateBuilder = ({ schema, filenameStem }: Props) => {
  const { state, set, reset } = useBuilderState(schema.slug);
  const tree = buildDocumentTree(schema, state);
  const progress = useBuilderProgress(schema, state);
  const [view, setView] = useState<View>('edit');
  const [showErrors, setShowErrors] = useState(false);
  // Flips true only after client-side mount, so the shell carries a precise
  // "the island is interactive" signal (the form's onChange handlers are now
  // attached). Used by e2e tests to wait out client:visible hydration instead
  // of racing it; harmless/no-op for real users.
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => setHydrated(true), []);
  const groupName = useId();
  const progressId = useId();

  const onReset = () => {
    if (typeof window !== 'undefined') {
      const ok = window.confirm('Clear all fields and start over? This cannot be undone.');
      if (!ok) return;
    }
    reset();
    setShowErrors(false);
  };

  // Both panes stay mounted (state + live region survive switching); on mobile
  // CSS hides the inactive pane via [data-view]. The toggle is a native radio
  // group — keyboard-operable and state-announced with zero custom ARIA.
  return (
    <div
      className="b-shell"
      data-view={view}
      data-hydrated={hydrated || undefined}
      role="region"
      aria-label={`${schema.title} builder`}
    >
      <header className="b-head">
        <div className="b-head-row">
          <div className="b-head-titles">
            <p className="b-eyebrow">Fill-in builder</p>
            <h2 className="b-title">{schema.title}</h2>
          </div>
          <button
            type="button"
            className="b-reset"
            onClick={onReset}
            disabled={Object.keys(state).length === 0}
          >
            <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true" className="b-reset-icon">
              <path
                fill="currentColor"
                d="M8 2.5a5.5 5.5 0 104.9 3 .9.9 0 10-1.6.8A3.7 3.7 0 118 4.3V6l3-2.7L8 0v2.5z"
              />
            </svg>
            Start over
          </button>
        </div>

        <div className="b-progress" aria-hidden="true">
          <div className="b-progress-track">
            <div
              className="b-progress-fill"
              data-complete={progress.complete || undefined}
              style={{ width: `${progress.percent}%` }}
            />
          </div>
        </div>
        <p id={progressId} className="b-progress-label" role="status">
          {progress.requiredTotal === 0
            ? 'No required fields — fill in what you need.'
            : progress.complete
              ? `All set — ${progress.requiredTotal} required field${progress.requiredTotal === 1 ? '' : 's'} complete.`
              : `${progress.requiredFilled} of ${progress.requiredTotal} required fields complete.`}
        </p>
      </header>

      <div className="b-toggle" role="radiogroup" aria-label="Builder view">
        <label className="b-toggle-btn" data-active={view === 'edit'}>
          <input
            type="radio"
            name={groupName}
            className="b-toggle-input"
            checked={view === 'edit'}
            onChange={() => setView('edit')}
          />
          <span className="b-toggle-text">Edit</span>
        </label>
        <label className="b-toggle-btn" data-active={view === 'preview'}>
          <input
            type="radio"
            name={groupName}
            className="b-toggle-input"
            checked={view === 'preview'}
            onChange={() => setView('preview')}
          />
          <span className="b-toggle-text">Preview</span>
        </label>
      </div>

      {/* Do NOT set aria-hidden by view state: on desktop (≥960px) both panes are
          visually shown (CSS overrides the mobile display:none), so an aria-hidden
          tied to `view` would hide visible content from assistive tech (WCAG 4.1.2).
          On mobile the inactive pane is display:none, which already removes it from
          the accessibility tree — no aria-hidden needed. */}
      <div className="b-pane b-pane-form">
        <BuilderForm
          schema={schema}
          state={state}
          onChange={set}
          progress={progress}
          showErrors={showErrors}
        />
      </div>
      <div className="b-pane b-pane-preview">
        <BuilderPreview tree={tree} complete={progress.complete} />
      </div>

      <BuilderExports
        tree={tree}
        filenameStem={filenameStem ?? schema.slug}
        complete={progress.complete}
        missingRequired={progress.requiredTotal - progress.requiredFilled}
        onValidate={() => setShowErrors(true)}
        onJumpToEdit={() => setView('edit')}
      />
    </div>
  );
};
