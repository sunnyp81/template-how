type Value = string | number | boolean | null | undefined;
type State = Record<string, Value>;

const ID = /^[a-zA-Z_][a-zA-Z0-9_]*$/;
const COMPARISON = /^([a-zA-Z_][a-zA-Z0-9_]*)\s*(==|!=)\s*('[^']*'|-?\d+(?:\.\d+)?)$/;

const parseLiteral = (raw: string): Value => {
  if (raw.startsWith("'") && raw.endsWith("'")) return raw.slice(1, -1);
  const n = Number(raw);
  if (Number.isFinite(n)) return n;
  throw new Error(`unsupported literal: ${raw}`);
};

const evalAtom = (atom: string, state: State): boolean => {
  const trimmed = atom.trim();
  if (ID.test(trimmed)) {
    return Boolean(state[trimmed]);
  }
  const m = trimmed.match(COMPARISON);
  if (!m) throw new Error(`unsafe or unsupported expression atom: ${atom}`);
  const [, id, op, literal] = m;
  const left = state[id];
  const right = parseLiteral(literal);
  if (op === '==') return left === right;
  return left !== right;
};

export const evaluate = (expr: string, state: State): boolean => {
  if (!expr || !expr.trim()) return true;
  const atoms = expr.split('&&').map((a) => a.trim());
  return atoms.every((a) => evalAtom(a, state));
};
