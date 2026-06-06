import { useId, useState } from 'react';
import type { BuilderSchema } from '@/lib/builder/schema';
import { useBuilderState } from '@/lib/builder/state';
import { buildDocumentTree } from '@/lib/builder/render';
import { BuilderForm } from './BuilderForm';
import { BuilderPreview } from './BuilderPreview';
import { BuilderExports } from './BuilderExports';

interface Props {
  schema: BuilderSchema;
  filenameStem?: string;
}

type View = 'edit' | 'preview';

export const TemplateBuilder = ({ schema, filenameStem }: Props) => {
  const { state, set } = useBuilderState(schema.slug);
  const tree = buildDocumentTree(schema, state);
  const [view, setView] = useState<View>('edit');
  const groupName = useId();

  // Both panes stay mounted (state + live region survive switching); on mobile
  // CSS hides the inactive pane via [data-view]. The toggle is a native radio
  // group — keyboard-operable and state-announced with zero custom ARIA.
  return (
    <div
      className="b-shell"
      data-view={view}
      role="region"
      aria-label={`${schema.title} builder`}
    >
      <div className="b-toggle" role="radiogroup" aria-label="Builder view">
        <label className="b-toggle-btn" data-active={view === 'edit'}>
          <input
            type="radio"
            name={groupName}
            className="b-toggle-input"
            checked={view === 'edit'}
            onChange={() => setView('edit')}
          />
          <span>Edit</span>
        </label>
        <label className="b-toggle-btn" data-active={view === 'preview'}>
          <input
            type="radio"
            name={groupName}
            className="b-toggle-input"
            checked={view === 'preview'}
            onChange={() => setView('preview')}
          />
          <span>Preview</span>
        </label>
      </div>

      <div
        className="b-pane b-pane-form"
        aria-hidden={view === 'preview' ? true : undefined}
      >
        <BuilderForm schema={schema} state={state} onChange={set} />
      </div>
      <div
        className="b-pane b-pane-preview"
        aria-hidden={view === 'edit' ? true : undefined}
      >
        <BuilderPreview tree={tree} />
      </div>

      <BuilderExports tree={tree} filenameStem={filenameStem ?? schema.slug} />
    </div>
  );
};
