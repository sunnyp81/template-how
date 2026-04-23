import { documentToHtml } from './html';
import type { DocumentTree } from '../builder/render';

export const printDocument = (tree: DocumentTree): void => {
  const win = window.open('', '_blank', 'noopener,width=820,height=1000');
  if (!win) return;
  win.document.write(`<!doctype html><html><head><title>${tree.title}</title></head><body>${documentToHtml(tree)}<script>window.onload=()=>{window.print();window.close();}</script></body></html>`);
  win.document.close();
};
