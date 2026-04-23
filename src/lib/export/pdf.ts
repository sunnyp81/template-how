import { jsPDF } from 'jspdf';
import type { DocumentTree } from '../builder/render';

export const documentToPdfBlob = async (tree: DocumentTree): Promise<Blob> => {
  const doc = new jsPDF({ unit: 'pt', format: 'a4' });
  const margin = 56;
  const pageWidth = doc.internal.pageSize.getWidth();
  let y = margin;

  doc.setFont('times', 'bold');
  doc.setFontSize(20);
  doc.text(tree.title, margin, y);
  y += 32;

  for (const section of tree.sections) {
    if (y > 760) { doc.addPage(); y = margin; }
    doc.setFont('times', 'bold');
    doc.setFontSize(14);
    doc.text(section.heading, margin, y);
    y += 22;
    doc.setFont('times', 'normal');
    doc.setFontSize(11);
    for (const f of section.fields) {
      const line = `${f.label}: ${f.value}`;
      const wrapped = doc.splitTextToSize(line, pageWidth - margin * 2);
      doc.text(wrapped, margin, y);
      y += wrapped.length * 14 + 4;
      if (y > 780) { doc.addPage(); y = margin; }
    }
    y += 10;
  }
  return doc.output('blob');
};
