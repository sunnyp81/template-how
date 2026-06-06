import { useState } from 'react';
import type { DocumentTree } from '@/lib/builder/render';
import { documentToHtml } from '@/lib/export/html';
import { printDocument } from '@/lib/export/print';

interface Props {
  tree: DocumentTree;
  filenameStem: string;
}

const downloadBlob = (blob: Blob, filename: string) => {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
};

type Busy = null | 'pdf' | 'docx';

export const BuilderExports = ({ tree, filenameStem }: Props) => {
  const [busy, setBusy] = useState<Busy>(null);

  // jspdf + docx are heavy and most users never export — pull them in via
  // dynamic import() on click so they stay out of the island's hydration chunk.
  const onPdf = async () => {
    if (busy) return;
    setBusy('pdf');
    try {
      const { documentToPdfBlob } = await import('@/lib/export/pdf');
      downloadBlob(await documentToPdfBlob(tree), `${filenameStem}.pdf`);
    } finally {
      setBusy(null);
    }
  };

  const onDocx = async () => {
    if (busy) return;
    setBusy('docx');
    try {
      const { documentToDocxBlob } = await import('@/lib/export/docx');
      downloadBlob(await documentToDocxBlob(tree), `${filenameStem}.docx`);
    } finally {
      setBusy(null);
    }
  };

  const onCopy = async () => navigator.clipboard.writeText(documentToHtml(tree));
  const onPrint = () => printDocument(tree);

  return (
    <div className="b-exports">
      <button
        type="button"
        onClick={onPdf}
        className="b-btn b-btn-primary"
        disabled={busy !== null}
        aria-busy={busy === 'pdf'}
      >
        {busy === 'pdf' ? 'Preparing…' : 'Download PDF'}
      </button>
      <button
        type="button"
        onClick={onDocx}
        className="b-btn"
        disabled={busy !== null}
        aria-busy={busy === 'docx'}
      >
        {busy === 'docx' ? 'Preparing…' : 'Download DOCX'}
      </button>
      <button type="button" onClick={onCopy} className="b-btn">Copy as HTML</button>
      <button type="button" onClick={onPrint} className="b-btn">Print</button>
    </div>
  );
};
