import { Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType } from 'docx';
import type { DocumentTree } from '../builder/render';

export const documentToDocxBlob = async (tree: DocumentTree): Promise<Blob> => {
  const children: Paragraph[] = [
    new Paragraph({
      heading: HeadingLevel.TITLE,
      alignment: AlignmentType.CENTER,
      children: [new TextRun({ text: tree.title, bold: true })]
    })
  ];

  for (const s of tree.sections) {
    children.push(new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun({ text: s.heading, bold: true })] }));
    for (const f of s.fields) {
      children.push(new Paragraph({
        children: [
          new TextRun({ text: `${f.label}: `, bold: true }),
          new TextRun({ text: f.value })
        ]
      }));
    }
  }

  const doc = new Document({ sections: [{ children }] });
  const blob = await Packer.toBlob(doc);
  return blob;
};
