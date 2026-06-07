import { useEffect, useRef, useState } from 'react';
import type { DocumentTree } from '@/lib/builder/render';
import { documentToHtml } from '@/lib/export/html';
import { printDocument } from '@/lib/export/print';

interface Props {
  tree: DocumentTree;
  filenameStem: string;
  complete?: boolean;
  missingRequired?: number;
  /** Reveal inline validation errors in the form. */
  onValidate?: () => void;
  /** Switch the mobile view back to the Edit pane. */
  onJumpToEdit?: () => void;
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
type Done = null | 'pdf' | 'docx' | 'copy';

export const BuilderExports = ({
  tree,
  filenameStem,
  complete = true,
  missingRequired = 0,
  onValidate,
  onJumpToEdit
}: Props) => {
  const [busy, setBusy] = useState<Busy>(null);
  const [done, setDone] = useState<Done>(null);
  const doneTimer = useRef<number | null>(null);

  useEffect(() => () => {
    if (doneTimer.current) window.clearTimeout(doneTimer.current);
  }, []);

  const flashDone = (kind: Exclude<Done, null>) => {
    setDone(kind);
    if (doneTimer.current) window.clearTimeout(doneTimer.current);
    doneTimer.current = window.setTimeout(() => setDone(null), 2200);
  };

  // jspdf + docx are heavy and most users never export — pull them in via
  // dynamic import() on click so they stay out of the island's hydration chunk.
  const onPdf = async () => {
    if (busy) return;
    setBusy('pdf');
    try {
      const { documentToPdfBlob } = await import('@/lib/export/pdf');
      downloadBlob(await documentToPdfBlob(tree), `${filenameStem}.pdf`);
      flashDone('pdf');
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
      flashDone('docx');
    } finally {
      setBusy(null);
    }
  };

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(documentToHtml(tree));
      flashDone('copy');
    } catch {
      /* clipboard blocked — no-op */
    }
  };
  const onPrint = () => printDocument(tree);

  const showNudge = !complete && missingRequired > 0;

  return (
    <div className="b-exports-wrap no-print">
      {showNudge ? (
        <p className="b-exports-note" role="note">
          <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true" className="b-exports-note-icon">
            <path
              fill="currentColor"
              d="M8 1a7 7 0 100 14A7 7 0 008 1zm0 3.2a.9.9 0 01.9.9v3.6a.9.9 0 01-1.8 0V5.1a.9.9 0 01.9-.9zm0 7.9a1 1 0 110-2 1 1 0 010 2z"
            />
          </svg>
          <span>
            {missingRequired} required field{missingRequired === 1 ? '' : 's'} still empty.{' '}
            <button
              type="button"
              className="b-exports-note-link"
              onClick={() => {
                onValidate?.();
                onJumpToEdit?.();
              }}
            >
              Show me
            </button>
            {' '}— you can still export anyway.
          </span>
        </p>
      ) : null}

      <div className="b-exports" role="group" aria-label="Export this document">
        <button
          type="button"
          onClick={onPdf}
          className="b-btn b-btn-primary"
          disabled={busy !== null}
          aria-busy={busy === 'pdf'}
        >
          <span className="b-btn-icon" aria-hidden="true">
            {busy === 'pdf' ? (
              <span className="b-spinner" />
            ) : done === 'pdf' ? (
              <CheckIcon />
            ) : (
              <DownloadIcon />
            )}
          </span>
          {busy === 'pdf' ? 'Preparing…' : done === 'pdf' ? 'Downloaded' : 'Download PDF'}
        </button>
        <button
          type="button"
          onClick={onDocx}
          className="b-btn"
          disabled={busy !== null}
          aria-busy={busy === 'docx'}
        >
          <span className="b-btn-icon" aria-hidden="true">
            {busy === 'docx' ? <span className="b-spinner" /> : done === 'docx' ? <CheckIcon /> : <DownloadIcon />}
          </span>
          {busy === 'docx' ? 'Preparing…' : done === 'docx' ? 'Downloaded' : 'DOCX'}
        </button>
        <button type="button" onClick={onCopy} className="b-btn" disabled={busy !== null}>
          <span className="b-btn-icon" aria-hidden="true">{done === 'copy' ? <CheckIcon /> : <CopyIcon />}</span>
          {done === 'copy' ? 'Copied' : 'Copy'}
        </button>
        <button type="button" onClick={onPrint} className="b-btn" disabled={busy !== null}>
          <span className="b-btn-icon" aria-hidden="true"><PrintIcon /></span>
          Print
        </button>
      </div>

      {/* Off-screen status for assistive tech when an export finishes. */}
      <p className="sr-only" role="status">
        {done === 'pdf'
          ? 'PDF downloaded.'
          : done === 'docx'
            ? 'DOCX downloaded.'
            : done === 'copy'
              ? 'Document copied to clipboard.'
              : ''}
      </p>
    </div>
  );
};

const DownloadIcon = () => (
  <svg viewBox="0 0 16 16" width="15" height="15" aria-hidden="true">
    <path fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M8 1.5v8.5M4.5 7 8 10.5 11.5 7M2.5 13.5h11" />
  </svg>
);
const CheckIcon = () => (
  <svg viewBox="0 0 16 16" width="15" height="15" aria-hidden="true">
    <path fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" d="M3 8.5 6.5 12 13 4.5" />
  </svg>
);
const CopyIcon = () => (
  <svg viewBox="0 0 16 16" width="15" height="15" aria-hidden="true">
    <path fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" d="M5.5 5.5V3.2A1.2 1.2 0 0 1 6.7 2h6.1A1.2 1.2 0 0 1 14 3.2v6.1a1.2 1.2 0 0 1-1.2 1.2h-2.3" />
    <rect x="2" y="5.5" width="8.5" height="8.5" rx="1.2" fill="none" stroke="currentColor" strokeWidth="1.4" />
  </svg>
);
const PrintIcon = () => (
  <svg viewBox="0 0 16 16" width="15" height="15" aria-hidden="true">
    <path fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" d="M4 6V2h8v4M4 12H2.8A1.3 1.3 0 0 1 1.5 10.7V7.3A1.3 1.3 0 0 1 2.8 6h10.4a1.3 1.3 0 0 1 1.3 1.3v3.4A1.3 1.3 0 0 1 13.2 12H12" />
    <rect x="4" y="10" width="8" height="4" rx="0.6" fill="none" stroke="currentColor" strokeWidth="1.4" />
  </svg>
);
