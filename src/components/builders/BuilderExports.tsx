import type { DocumentTree } from '@/lib/builder/render';
import { documentToPdfBlob } from '@/lib/export/pdf';
import { documentToDocxBlob } from '@/lib/export/docx';
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

export const BuilderExports = ({ tree, filenameStem }: Props) => {
  const onPdf = async () => downloadBlob(await documentToPdfBlob(tree), `${filenameStem}.pdf`);
  const onDocx = async () => downloadBlob(await documentToDocxBlob(tree), `${filenameStem}.docx`);
  const onCopy = async () => navigator.clipboard.writeText(documentToHtml(tree));
  const onPrint = () => printDocument(tree);

  return (
    <div className="b-exports">
      <button type="button" onClick={onPdf} className="b-btn b-btn-primary">Download PDF</button>
      <button type="button" onClick={onDocx} className="b-btn">Download DOCX</button>
      <button type="button" onClick={onCopy} className="b-btn">Copy as HTML</button>
      <button type="button" onClick={onPrint} className="b-btn">Print</button>
    </div>
  );
};
