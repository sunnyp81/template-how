import type { DocumentTree } from '../builder/render';

const escape = (s: string): string =>
  s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]!));

export const documentToHtml = (tree: DocumentTree): string => {
  const sections = tree.sections.map((s) => {
    const rows = s.fields.map((f) =>
      `    <p><strong>${escape(f.label)}:</strong> ${escape(f.value)}</p>`
    ).join('\n');
    return `  <section>\n    <h2>${escape(s.heading)}</h2>\n${rows}\n  </section>`;
  }).join('\n');
  return `<article style="font-family:Georgia,serif;max-width:780px;margin:auto;padding:48px;line-height:1.6;color:#0F1B3D;">\n  <h1>${escape(tree.title)}</h1>\n${sections}\n</article>`;
};
