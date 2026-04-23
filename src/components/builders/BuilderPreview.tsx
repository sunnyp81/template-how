import type { DocumentTree } from '@/lib/builder/render';

interface Props { tree: DocumentTree; }

export const BuilderPreview = ({ tree }: Props) => (
  <div className="b-preview" aria-live="polite">
    <article className="b-doc">
      <h1 className="b-doc-title">{tree.title}</h1>
      {tree.sections.map((s) => (
        <section key={s.heading} className="b-doc-section">
          <h2 className="b-doc-h2">{s.heading}</h2>
          {s.fields.map((f) => (
            <p key={f.id} className="b-doc-row">
              <strong>{f.label}:</strong> {f.value || <span className="b-doc-empty">—</span>}
            </p>
          ))}
        </section>
      ))}
    </article>
  </div>
);
