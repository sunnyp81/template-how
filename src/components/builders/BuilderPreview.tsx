import type { DocumentTree } from '@/lib/builder/render';

interface Props {
  tree: DocumentTree;
  complete?: boolean;
}

const hasAnyValue = (tree: DocumentTree): boolean =>
  tree.sections.some((s) => s.fields.some((f) => f.value.trim().length > 0));

export const BuilderPreview = ({ tree, complete }: Props) => {
  const started = hasAnyValue(tree);
  return (
    <div className="b-preview">
      <div className="b-preview-bar" aria-hidden="true">
        <span className="b-preview-dot" />
        <span className="b-preview-dot" />
        <span className="b-preview-dot" />
        <span className="b-preview-bar-label">Live preview</span>
        {complete ? <span className="b-preview-ready">Ready to export</span> : null}
      </div>
      <div className="b-preview-sheet">
        <article className="b-doc" aria-label={`${tree.title} preview`}>
          {/* Visual document mockup: render the title as a styled paragraph, not a
              page <h1>. The page already owns its single <h1>; a second one here
              would break the document outline / one-H1-per-page rule. */}
          <p className="b-doc-title" aria-hidden="true">{tree.title}</p>
          {!started ? (
            <p className="b-doc-hint">
              Your document updates here as you fill in the form. Start typing on the Edit tab to
              see it take shape.
            </p>
          ) : null}
          {tree.sections.map((s) => (
            <section key={s.heading} className="b-doc-section">
              <h2 className="b-doc-h2">{s.heading}</h2>
              {s.fields.map((f) => (
                <p key={f.id} className="b-doc-row">
                  <strong className="b-doc-label">{f.label}:</strong>{' '}
                  {f.value ? (
                    <span className="b-doc-value">{f.value}</span>
                  ) : (
                    <span className="b-doc-empty" aria-label="not yet filled in">
                      ____________
                    </span>
                  )}
                </p>
              ))}
            </section>
          ))}
        </article>
      </div>
    </div>
  );
};
