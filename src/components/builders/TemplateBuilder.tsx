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

export const TemplateBuilder = ({ schema, filenameStem }: Props) => {
  const { state, set } = useBuilderState(schema.slug);
  const tree = buildDocumentTree(schema, state);
  return (
    <div className="b-shell" role="region" aria-label={`${schema.title} builder`}>
      <div className="b-pane b-pane-form">
        <BuilderForm schema={schema} state={state} onChange={set} />
      </div>
      <div className="b-pane b-pane-preview">
        <BuilderPreview tree={tree} />
        <BuilderExports tree={tree} filenameStem={filenameStem ?? schema.slug} />
      </div>
    </div>
  );
};
