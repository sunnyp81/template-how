# Plan 2 — Builder + Data Layer Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development to implement this plan task-by-task.

**Goal:** Stand up the schema-driven `<TemplateBuilder>` React island with one working renderer (`legal-document`), the client-side export pipeline (PDF / DOCX / Copy HTML / Print), the per-jurisdiction data layer, and one fully end-to-end SEED page (`/bill-of-sale/`) that demonstrates the entire system. By the end of this plan a user can land on `https://template.how/bill-of-sale/`, fill the form, see live preview, and download a signed bill of sale as PDF or DOCX.

**Architecture:** A single React component `<TemplateBuilder>` driven by a JSON schema declared in the SEED's content frontmatter. The schema describes form sections, fields, and the renderer to use. A pure renderer function turns form state into a structured document tree, which is then serialised by the export adapters (`jspdf`, `docx`, clipboard, `window.print`). Per-jurisdiction data (US states + UK nations) feeds into both the form's conditional logic and the page's auto-generated comparison table. No server.

**Tech Stack:**
- React 18 (already installed)
- `docx` (DOCX export, MIT)
- `jspdf` + `jspdf-autotable` (PDF, MIT)
- `zod` (already used by Astro Content Collections — re-used for runtime schema validation in dev)
- Vitest + React Testing Library for unit/component tests
- Playwright for end-to-end builder smoke

**Reference documents:**
- Spec: `docs/superpowers/specs/2026-04-22-template-how-design.md`
- Plan 1 (foundation): `docs/superpowers/plans/2026-04-22-plan-1-foundation.md`
- This plan: `docs/superpowers/plans/2026-04-23-plan-2-builder-data-layer.md`

---

## File Structure

```
template-how/
├── src/
│   ├── content/
│   │   ├── config.ts                            # MODIFY — extend seeds schema with builderSchema
│   │   ├── seeds/
│   │   │   └── bill-of-sale.md                  # NEW — first SEED entry, full long-form
│   │   └── variants/                            # (created next plan; empty here)
│   ├── data/
│   │   ├── jurisdictions.ts                     # NEW — typed registry of 50 US states + 4 UK nations
│   │   └── legal/
│   │       └── bill-of-sale-state-rules.json    # NEW — per-jurisdiction rules + statute citations
│   ├── lib/
│   │   ├── builder/
│   │   │   ├── schema.ts                        # NEW — TS types + zod for BuilderSchema
│   │   │   ├── expression.ts                    # NEW — tiny safe expression parser for showIf/requiredIf
│   │   │   ├── state.ts                         # NEW — form state hook (localStorage + URL sync)
│   │   │   └── render.ts                        # NEW — schema + state → DocumentTree (renderer-agnostic)
│   │   ├── renderers/
│   │   │   └── legalDocument.ts                 # NEW — DocumentTree → renderable nodes for legal docs
│   │   └── export/
│   │       ├── pdf.ts                           # NEW — DocumentTree → jsPDF blob
│   │       ├── docx.ts                          # NEW — DocumentTree → docx Blob
│   │       ├── html.ts                          # NEW — DocumentTree → styled HTML string for clipboard
│   │       └── print.ts                         # NEW — print-only injection + window.print()
│   ├── components/
│   │   ├── builders/
│   │   │   ├── TemplateBuilder.tsx              # NEW — top-level React island
│   │   │   ├── BuilderForm.tsx                  # NEW — left pane (sections + fields)
│   │   │   ├── BuilderPreview.tsx               # NEW — right pane (live document)
│   │   │   ├── BuilderExports.tsx               # NEW — export bar
│   │   │   └── fields/
│   │   │       ├── TextField.tsx                # NEW
│   │   │       ├── TextareaField.tsx            # NEW
│   │   │       ├── SelectField.tsx              # NEW
│   │   │       ├── CurrencyField.tsx            # NEW
│   │   │       ├── DateField.tsx                # NEW
│   │   │       ├── CheckboxField.tsx            # NEW
│   │   │       └── FieldShell.tsx               # NEW — label + error + help wrapper
│   │   ├── content/
│   │   │   ├── DownloadBlock.astro              # NEW — pre-made static download block (PDF/DOCX/GDoc)
│   │   │   ├── JurisdictionTable.astro          # NEW — auto-generated comparison table from data
│   │   │   ├── DefinitionalLede.astro           # NEW — required H1-adjacent definition paragraph
│   │   │   ├── GuideSection.astro               # NEW — content section wrapper
│   │   │   ├── SourceList.astro                 # NEW — citations footer
│   │   │   └── AuthorBox.astro                  # NEW — Sunny Patel author box
│   │   └── schema/
│   │       ├── HowToSchema.astro                # NEW — JSON-LD HowTo
│   │       ├── FAQPageSchema.astro              # NEW — JSON-LD FAQPage
│   │       └── SoftwareApplicationSchema.astro  # NEW — JSON-LD for the builder
│   ├── layouts/
│   │   └── SeedLayout.astro                     # NEW — full SEED page skeleton (matches spec §5)
│   ├── pages/
│   │   └── [seed].astro                         # NEW — dynamic SEED route (catch-all for SEED slugs)
│   └── styles/
│       └── builder.css                          # NEW — builder-specific styles (paper preview, sticky bar)
├── tests/
│   ├── unit/
│   │   ├── builder/
│   │   │   ├── expression.test.ts               # NEW
│   │   │   ├── state.test.ts                    # NEW
│   │   │   └── render.test.ts                   # NEW
│   │   ├── export/
│   │   │   ├── pdf.test.ts                      # NEW (light — verifies non-empty Blob)
│   │   │   ├── docx.test.ts                     # NEW
│   │   │   └── html.test.ts                     # NEW
│   │   └── data/
│   │       └── bill-of-sale-rules.test.ts       # NEW — schema integrity of the data file
│   └── e2e/
│       └── builder-bill-of-sale.spec.ts         # NEW — Playwright end-to-end
├── package.json                                  # MODIFY — add docx, jspdf, jspdf-autotable, @testing-library/react, jsdom
└── vitest.config.ts                              # MODIFY — enable jsdom env for component tests
```

Files that change together live together. Each file has one clear responsibility:
- **`builder/`** = orchestration & state (no rendering, no DOM serialisation).
- **`renderers/`** = transforms abstract `DocumentTree` into renderer-specific node lists (no DOM, no export).
- **`export/`** = takes renderer output + DocumentTree → file/clipboard side effect.
- **`components/builders/`** = the React UI. Imports from `lib/builder` and `lib/export`. No business logic in JSX.
- **`data/`** = pure JSON + typed accessors. No I/O.

---

## Task 1: Add new dependencies

**Files:**
- Modify: `package.json`

- [ ] **Step 1: Install new dependencies**

Run:
```bash
cd /c/Users/sunny/repos/template-how && npm i docx jspdf jspdf-autotable && npm i -D @testing-library/react @testing-library/jest-dom jsdom @types/jsdom
```
Expected: 4 runtime + 4 dev deps installed.

- [ ] **Step 2: Verify versions in `package.json`**

Run: `cat package.json | grep -E '"(docx|jspdf|@testing-library|jsdom)"'`
Expected: 7 lines.

- [ ] **Step 3: Commit**

```bash
cd /c/Users/sunny/repos/template-how
git add package.json package-lock.json
git commit -m "deps: add docx, jspdf, jspdf-autotable, testing-library, jsdom"
```

---

## Task 2: Vitest jsdom config for component tests

**Files:**
- Modify: `vitest.config.ts`
- Create: `tests/setup.ts`

- [ ] **Step 1: Create `tests/setup.ts`**

```ts
import '@testing-library/jest-dom/vitest';
```

- [ ] **Step 2: Update `vitest.config.ts`**

Replace the existing file with:

```ts
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    include: ['tests/unit/**/*.test.ts', 'tests/unit/**/*.test.tsx'],
    exclude: ['tests/e2e/**', 'node_modules/**', 'dist/**', '.astro/**'],
    environment: 'jsdom',
    setupFiles: ['./tests/setup.ts']
  },
  resolve: {
    alias: {
      '@': new URL('./src', import.meta.url).pathname
    }
  }
});
```

- [ ] **Step 3: Run existing tests to confirm no regression**

Run: `cd /c/Users/sunny/repos/template-how && npm test`
Expected: PASS — 9 tests still passing (4 site config + 5 link graph).

- [ ] **Step 4: Commit**

```bash
git add vitest.config.ts tests/setup.ts
git commit -m "test: enable jsdom env + testing-library setup for component tests"
```

---

## Task 3: BuilderSchema types + zod (TDD)

**Files:**
- Create: `src/lib/builder/schema.ts`
- Create: `tests/unit/builder/schema.test.ts`

- [ ] **Step 1: Write the failing test**

```ts
// tests/unit/builder/schema.test.ts
import { describe, it, expect } from 'vitest';
import { builderSchemaValidator, type BuilderSchema } from '../../../src/lib/builder/schema';

describe('builderSchemaValidator', () => {
  const valid: BuilderSchema = {
    slug: 'bill-of-sale',
    title: 'Bill of Sale',
    renderer: 'legal-document',
    sections: [
      {
        id: 'parties',
        heading: 'Parties',
        fields: [
          { id: 'seller_name', label: 'Seller', type: 'text', required: true },
          { id: 'state', label: 'State', type: 'select', required: true, options: 'us-states' }
        ]
      }
    ]
  };

  it('accepts a minimally valid schema', () => {
    expect(() => builderSchemaValidator.parse(valid)).not.toThrow();
  });

  it('rejects a section without fields', () => {
    const bad = { ...valid, sections: [{ id: 'x', heading: 'x', fields: [] }] };
    expect(() => builderSchemaValidator.parse(bad)).toThrow();
  });

  it('rejects an unknown field type', () => {
    const bad = JSON.parse(JSON.stringify(valid));
    bad.sections[0].fields.push({ id: 'foo', label: 'foo', type: 'imaginary' });
    expect(() => builderSchemaValidator.parse(bad)).toThrow();
  });

  it('accepts conditional showIf expressions', () => {
    const ok = JSON.parse(JSON.stringify(valid));
    ok.sections[0].fields.push({ id: 'vin', label: 'VIN', type: 'text', showIf: "item_type == 'vehicle'" });
    expect(() => builderSchemaValidator.parse(ok)).not.toThrow();
  });
});
```

- [ ] **Step 2: Run test — expect fail**

Run: `npm test -- tests/unit/builder/schema.test.ts`
Expected: FAIL — module not found.

- [ ] **Step 3: Implement `src/lib/builder/schema.ts`**

```ts
import { z } from 'zod';

const fieldBase = z.object({
  id: z.string().min(1),
  label: z.string().min(1),
  required: z.boolean().optional(),
  showIf: z.string().optional(),
  requiredIf: z.string().optional(),
  help: z.string().optional()
});

const fieldType = z.discriminatedUnion('type', [
  fieldBase.extend({ type: z.literal('text') }),
  fieldBase.extend({ type: z.literal('textarea') }),
  fieldBase.extend({ type: z.literal('number') }),
  fieldBase.extend({ type: z.literal('currency'), currency: z.enum(['USD', 'GBP']).default('USD') }),
  fieldBase.extend({ type: z.literal('date') }),
  fieldBase.extend({ type: z.literal('checkbox') }),
  fieldBase.extend({
    type: z.literal('select'),
    options: z.union([
      z.array(z.object({ value: z.string(), label: z.string() })),
      z.literal('us-states'),
      z.literal('uk-nations'),
      z.literal('us-states+uk-nations')
    ])
  })
]);

export const builderSchemaValidator = z.object({
  slug: z.string().min(1),
  title: z.string().min(1),
  renderer: z.enum(['legal-document', 'resume', 'invoice', 'letter', 'list-plan']),
  sections: z.array(
    z.object({
      id: z.string().min(1),
      heading: z.string().min(1),
      fields: z.array(fieldType).min(1)
    })
  ).min(1),
  governingData: z.object({
    lookupBy: z.string(),
    source: z.string()
  }).optional()
});

export type BuilderSchema = z.infer<typeof builderSchemaValidator>;
export type BuilderField = BuilderSchema['sections'][number]['fields'][number];
export type FieldType = BuilderField['type'];
```

- [ ] **Step 4: Run test — expect pass**

Run: `npm test -- tests/unit/builder/schema.test.ts`
Expected: PASS (4 tests).

- [ ] **Step 5: Commit**

```bash
git add src/lib/builder/schema.ts tests/unit/builder/schema.test.ts
git commit -m "feat(builder): BuilderSchema zod + types"
```

---

## Task 4: Safe expression parser for showIf / requiredIf (TDD)

**Files:**
- Create: `src/lib/builder/expression.ts`
- Create: `tests/unit/builder/expression.test.ts`

The plan must NOT use `eval` or `new Function` — those are XSS vectors when schemas can be authored by content. We support a tiny grammar: `<id> (==|!=) '<literal>'` and `<id> (==|!=) <number>` and `<id>` (truthy check), joined by `&&`.

- [ ] **Step 1: Write the failing test**

```ts
// tests/unit/builder/expression.test.ts
import { describe, it, expect } from 'vitest';
import { evaluate } from '../../../src/lib/builder/expression';

const state = { item_type: 'vehicle', price: 5000, has_vin: true, notes: '' };

describe('evaluate', () => {
  it('returns true for a truthy id check', () => {
    expect(evaluate('has_vin', state)).toBe(true);
  });
  it('returns false for an empty-string id check', () => {
    expect(evaluate('notes', state)).toBe(false);
  });
  it('handles string equality', () => {
    expect(evaluate("item_type == 'vehicle'", state)).toBe(true);
    expect(evaluate("item_type == 'boat'", state)).toBe(false);
  });
  it('handles string inequality', () => {
    expect(evaluate("item_type != 'boat'", state)).toBe(true);
  });
  it('handles number equality', () => {
    expect(evaluate('price == 5000', state)).toBe(true);
  });
  it('joins with && (logical AND)', () => {
    expect(evaluate("item_type == 'vehicle' && price == 5000", state)).toBe(true);
    expect(evaluate("item_type == 'vehicle' && price == 1", state)).toBe(false);
  });
  it('throws on unsafe input', () => {
    expect(() => evaluate('alert(1)', state)).toThrow();
  });
  it('returns false for unknown id', () => {
    expect(evaluate('missing_id', state)).toBe(false);
  });
});
```

- [ ] **Step 2: Run test — expect fail**

Run: `npm test -- tests/unit/builder/expression.test.ts`
Expected: FAIL — module not found.

- [ ] **Step 3: Implement `src/lib/builder/expression.ts`**

```ts
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
```

- [ ] **Step 4: Run test — expect pass**

Run: `npm test -- tests/unit/builder/expression.test.ts`
Expected: PASS (8 tests).

- [ ] **Step 5: Commit**

```bash
git add src/lib/builder/expression.ts tests/unit/builder/expression.test.ts
git commit -m "feat(builder): safe expression parser for showIf/requiredIf"
```

---

## Task 5: Form state hook (localStorage + URL sync) (TDD)

**Files:**
- Create: `src/lib/builder/state.ts`
- Create: `tests/unit/builder/state.test.ts`

- [ ] **Step 1: Write the failing test**

```ts
// tests/unit/builder/state.test.ts
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useBuilderState } from '../../../src/lib/builder/state';

describe('useBuilderState', () => {
  beforeEach(() => {
    window.localStorage.clear();
    window.history.replaceState({}, '', '/');
  });
  afterEach(() => {
    window.localStorage.clear();
  });

  it('initialises empty when no storage and no URL', () => {
    const { result } = renderHook(() => useBuilderState('bill-of-sale'));
    expect(result.current.state).toEqual({});
  });

  it('persists changes to localStorage', () => {
    const { result } = renderHook(() => useBuilderState('bill-of-sale'));
    act(() => result.current.set('seller_name', 'Sunny'));
    expect(JSON.parse(window.localStorage.getItem('builder:bill-of-sale')!)).toMatchObject({ seller_name: 'Sunny' });
  });

  it('rehydrates from localStorage on mount', () => {
    window.localStorage.setItem('builder:bill-of-sale', JSON.stringify({ buyer_name: 'Alex' }));
    const { result } = renderHook(() => useBuilderState('bill-of-sale'));
    expect(result.current.state.buyer_name).toBe('Alex');
  });

  it('reset() clears state and storage', () => {
    const { result } = renderHook(() => useBuilderState('bill-of-sale'));
    act(() => result.current.set('seller_name', 'Sunny'));
    act(() => result.current.reset());
    expect(result.current.state).toEqual({});
    expect(window.localStorage.getItem('builder:bill-of-sale')).toBeNull();
  });
});
```

- [ ] **Step 2: Run test — expect fail**

Run: `npm test -- tests/unit/builder/state.test.ts`
Expected: FAIL — module not found.

- [ ] **Step 3: Implement `src/lib/builder/state.ts`**

```ts
import { useCallback, useEffect, useState } from 'react';

export type BuilderState = Record<string, string | number | boolean | null>;

const storageKey = (slug: string) => `builder:${slug}`;

const load = (slug: string): BuilderState => {
  if (typeof window === 'undefined') return {};
  try {
    const raw = window.localStorage.getItem(storageKey(slug));
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
};

const save = (slug: string, state: BuilderState): void => {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(storageKey(slug), JSON.stringify(state));
  } catch {
    /* quota or disabled storage — silent */
  }
};

export const useBuilderState = (slug: string) => {
  const [state, setState] = useState<BuilderState>(() => load(slug));

  useEffect(() => { save(slug, state); }, [slug, state]);

  const set = useCallback((id: string, value: BuilderState[string]) => {
    setState((prev) => ({ ...prev, [id]: value }));
  }, []);

  const reset = useCallback(() => {
    if (typeof window !== 'undefined') {
      window.localStorage.removeItem(storageKey(slug));
    }
    setState({});
  }, [slug]);

  return { state, set, reset };
};
```

- [ ] **Step 4: Run test — expect pass**

Run: `npm test -- tests/unit/builder/state.test.ts`
Expected: PASS (4 tests).

- [ ] **Step 5: Commit**

```bash
git add src/lib/builder/state.ts tests/unit/builder/state.test.ts
git commit -m "feat(builder): useBuilderState hook with localStorage persistence"
```

---

## Task 6: Jurisdictions registry + bill-of-sale state-rules data

**Files:**
- Create: `src/data/jurisdictions.ts`
- Create: `src/data/legal/bill-of-sale-state-rules.json`
- Create: `tests/unit/data/bill-of-sale-rules.test.ts`

- [ ] **Step 1: Create `src/data/jurisdictions.ts`**

```ts
export interface Jurisdiction {
  code: string;        // ISO-style — 'us-ca', 'uk-eng'
  country: 'us' | 'uk';
  region: string;      // 'California', 'England'
  slug: string;        // 'california', 'england' — used in URLs
  abbreviation: string; // 'CA', 'ENG'
}

export const US_STATES: Jurisdiction[] = [
  { code: 'us-al', country: 'us', region: 'Alabama', slug: 'alabama', abbreviation: 'AL' },
  { code: 'us-ak', country: 'us', region: 'Alaska', slug: 'alaska', abbreviation: 'AK' },
  { code: 'us-az', country: 'us', region: 'Arizona', slug: 'arizona', abbreviation: 'AZ' },
  { code: 'us-ar', country: 'us', region: 'Arkansas', slug: 'arkansas', abbreviation: 'AR' },
  { code: 'us-ca', country: 'us', region: 'California', slug: 'california', abbreviation: 'CA' },
  { code: 'us-co', country: 'us', region: 'Colorado', slug: 'colorado', abbreviation: 'CO' },
  { code: 'us-ct', country: 'us', region: 'Connecticut', slug: 'connecticut', abbreviation: 'CT' },
  { code: 'us-de', country: 'us', region: 'Delaware', slug: 'delaware', abbreviation: 'DE' },
  { code: 'us-fl', country: 'us', region: 'Florida', slug: 'florida', abbreviation: 'FL' },
  { code: 'us-ga', country: 'us', region: 'Georgia', slug: 'georgia', abbreviation: 'GA' },
  { code: 'us-hi', country: 'us', region: 'Hawaii', slug: 'hawaii', abbreviation: 'HI' },
  { code: 'us-id', country: 'us', region: 'Idaho', slug: 'idaho', abbreviation: 'ID' },
  { code: 'us-il', country: 'us', region: 'Illinois', slug: 'illinois', abbreviation: 'IL' },
  { code: 'us-in', country: 'us', region: 'Indiana', slug: 'indiana', abbreviation: 'IN' },
  { code: 'us-ia', country: 'us', region: 'Iowa', slug: 'iowa', abbreviation: 'IA' },
  { code: 'us-ks', country: 'us', region: 'Kansas', slug: 'kansas', abbreviation: 'KS' },
  { code: 'us-ky', country: 'us', region: 'Kentucky', slug: 'kentucky', abbreviation: 'KY' },
  { code: 'us-la', country: 'us', region: 'Louisiana', slug: 'louisiana', abbreviation: 'LA' },
  { code: 'us-me', country: 'us', region: 'Maine', slug: 'maine', abbreviation: 'ME' },
  { code: 'us-md', country: 'us', region: 'Maryland', slug: 'maryland', abbreviation: 'MD' },
  { code: 'us-ma', country: 'us', region: 'Massachusetts', slug: 'massachusetts', abbreviation: 'MA' },
  { code: 'us-mi', country: 'us', region: 'Michigan', slug: 'michigan', abbreviation: 'MI' },
  { code: 'us-mn', country: 'us', region: 'Minnesota', slug: 'minnesota', abbreviation: 'MN' },
  { code: 'us-ms', country: 'us', region: 'Mississippi', slug: 'mississippi', abbreviation: 'MS' },
  { code: 'us-mo', country: 'us', region: 'Missouri', slug: 'missouri', abbreviation: 'MO' },
  { code: 'us-mt', country: 'us', region: 'Montana', slug: 'montana', abbreviation: 'MT' },
  { code: 'us-ne', country: 'us', region: 'Nebraska', slug: 'nebraska', abbreviation: 'NE' },
  { code: 'us-nv', country: 'us', region: 'Nevada', slug: 'nevada', abbreviation: 'NV' },
  { code: 'us-nh', country: 'us', region: 'New Hampshire', slug: 'new-hampshire', abbreviation: 'NH' },
  { code: 'us-nj', country: 'us', region: 'New Jersey', slug: 'new-jersey', abbreviation: 'NJ' },
  { code: 'us-nm', country: 'us', region: 'New Mexico', slug: 'new-mexico', abbreviation: 'NM' },
  { code: 'us-ny', country: 'us', region: 'New York', slug: 'new-york', abbreviation: 'NY' },
  { code: 'us-nc', country: 'us', region: 'North Carolina', slug: 'north-carolina', abbreviation: 'NC' },
  { code: 'us-nd', country: 'us', region: 'North Dakota', slug: 'north-dakota', abbreviation: 'ND' },
  { code: 'us-oh', country: 'us', region: 'Ohio', slug: 'ohio', abbreviation: 'OH' },
  { code: 'us-ok', country: 'us', region: 'Oklahoma', slug: 'oklahoma', abbreviation: 'OK' },
  { code: 'us-or', country: 'us', region: 'Oregon', slug: 'oregon', abbreviation: 'OR' },
  { code: 'us-pa', country: 'us', region: 'Pennsylvania', slug: 'pennsylvania', abbreviation: 'PA' },
  { code: 'us-ri', country: 'us', region: 'Rhode Island', slug: 'rhode-island', abbreviation: 'RI' },
  { code: 'us-sc', country: 'us', region: 'South Carolina', slug: 'south-carolina', abbreviation: 'SC' },
  { code: 'us-sd', country: 'us', region: 'South Dakota', slug: 'south-dakota', abbreviation: 'SD' },
  { code: 'us-tn', country: 'us', region: 'Tennessee', slug: 'tennessee', abbreviation: 'TN' },
  { code: 'us-tx', country: 'us', region: 'Texas', slug: 'texas', abbreviation: 'TX' },
  { code: 'us-ut', country: 'us', region: 'Utah', slug: 'utah', abbreviation: 'UT' },
  { code: 'us-vt', country: 'us', region: 'Vermont', slug: 'vermont', abbreviation: 'VT' },
  { code: 'us-va', country: 'us', region: 'Virginia', slug: 'virginia', abbreviation: 'VA' },
  { code: 'us-wa', country: 'us', region: 'Washington', slug: 'washington', abbreviation: 'WA' },
  { code: 'us-wv', country: 'us', region: 'West Virginia', slug: 'west-virginia', abbreviation: 'WV' },
  { code: 'us-wi', country: 'us', region: 'Wisconsin', slug: 'wisconsin', abbreviation: 'WI' },
  { code: 'us-wy', country: 'us', region: 'Wyoming', slug: 'wyoming', abbreviation: 'WY' }
];

export const UK_NATIONS: Jurisdiction[] = [
  { code: 'uk-eng', country: 'uk', region: 'England', slug: 'england', abbreviation: 'ENG' },
  { code: 'uk-sco', country: 'uk', region: 'Scotland', slug: 'scotland', abbreviation: 'SCO' },
  { code: 'uk-wal', country: 'uk', region: 'Wales', slug: 'wales', abbreviation: 'WAL' },
  { code: 'uk-nir', country: 'uk', region: 'Northern Ireland', slug: 'northern-ireland', abbreviation: 'NIR' }
];

export const ALL_JURISDICTIONS: Jurisdiction[] = [...US_STATES, ...UK_NATIONS];

export const byCode = (code: string): Jurisdiction | undefined =>
  ALL_JURISDICTIONS.find((j) => j.code === code);
```

- [ ] **Step 2: Create `src/data/legal/bill-of-sale-state-rules.json`**

This is the moat — per-jurisdiction governing data. Use the structure below for ALL 54 jurisdictions (50 US + 4 UK). Below is an authoritative seed of 5 entries (CA, TX, NY, FL, England). The implementer should fill in the remaining 49 from primary sources (state legislature sites, gov.uk, Cornell LII) — `last_verified` set to today. Do NOT fabricate statute citations; if a citation can't be verified for a jurisdiction within reasonable time, set `notary_required: null`, `governing_statute: null`, `statute_url: null`, and `notes: "Pending verification — see plan task 6 backlog."` and create a follow-up task in `docs/superpowers/plans/2026-04-23-plan-2-data-backlog.md`.

```json
{
  "us-ca": {
    "code": "us-ca",
    "notary_required": false,
    "witness_required": false,
    "required_fields": ["date", "seller_name", "buyer_name", "item_description", "price"],
    "vehicle_extra_fields": ["vin", "odometer", "year", "make", "model"],
    "governing_statute": "CA Commercial Code § 2401",
    "statute_url": "https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=COM&sectionNum=2401",
    "vehicle_dmv_form": "REG 135",
    "vehicle_dmv_url": "https://www.dmv.ca.gov/portal/file/bill-of-sale-reg-135-pdf/",
    "notes": "Odometer disclosure required for vehicles under 10 years old.",
    "last_verified": "2026-04-23"
  },
  "us-tx": {
    "code": "us-tx",
    "notary_required": false,
    "witness_required": false,
    "required_fields": ["date", "seller_name", "buyer_name", "item_description", "price"],
    "vehicle_extra_fields": ["vin", "odometer", "year", "make", "model"],
    "governing_statute": "Texas Transportation Code § 501.0721",
    "statute_url": "https://statutes.capitol.texas.gov/Docs/TN/htm/TN.501.htm#501.0721",
    "vehicle_dmv_form": "Form 130-U",
    "vehicle_dmv_url": "https://www.txdmv.gov/sites/default/files/form_files/130-U.pdf",
    "notes": "Texas does not require notarisation of bills of sale, but the buyer must title the vehicle within 30 days.",
    "last_verified": "2026-04-23"
  },
  "us-ny": {
    "code": "us-ny",
    "notary_required": false,
    "witness_required": false,
    "required_fields": ["date", "seller_name", "buyer_name", "item_description", "price"],
    "vehicle_extra_fields": ["vin", "odometer", "year", "make", "model"],
    "governing_statute": "NY Vehicle and Traffic Law § 2113",
    "statute_url": "https://www.nysenate.gov/legislation/laws/VAT/2113",
    "vehicle_dmv_form": "MV-912",
    "vehicle_dmv_url": "https://dmv.ny.gov/forms/mv912.pdf",
    "notes": "MV-912 is the NY DMV bill of sale form. Sales tax is collected at registration based on the price stated.",
    "last_verified": "2026-04-23"
  },
  "us-fl": {
    "code": "us-fl",
    "notary_required": true,
    "witness_required": true,
    "required_fields": ["date", "seller_name", "buyer_name", "item_description", "price"],
    "vehicle_extra_fields": ["vin", "odometer", "year", "make", "model"],
    "governing_statute": "Florida Statutes § 319.22",
    "statute_url": "http://www.leg.state.fl.us/statutes/index.cfm?App_mode=Display_Statute&URL=0300-0399/0319/Sections/0319.22.html",
    "vehicle_dmv_form": "HSMV 82050",
    "vehicle_dmv_url": "https://www.flhsmv.gov/pdf/forms/82050.pdf",
    "notes": "Florida requires the bill of sale to be notarised AND signed by two witnesses for vehicle transfers.",
    "last_verified": "2026-04-23"
  },
  "uk-eng": {
    "code": "uk-eng",
    "notary_required": false,
    "witness_required": false,
    "required_fields": ["date", "seller_name", "buyer_name", "item_description", "price"],
    "vehicle_extra_fields": ["vrm", "make", "model", "v5c_reference"],
    "governing_statute": "Sale of Goods Act 1979 (as amended)",
    "statute_url": "https://www.legislation.gov.uk/ukpga/1979/54",
    "vehicle_dmv_form": "V5C/2",
    "vehicle_dmv_url": "https://www.gov.uk/sold-bought-vehicle",
    "notes": "Private sales of used vehicles in England fall under caveat emptor with statutory protections under the Sale of Goods Act 1979 and Consumer Rights Act 2015 (the latter for trader sales). The DVLA V5C/2 'new keeper supplement' acts as the statutory transfer record.",
    "last_verified": "2026-04-23"
  }
}
```

The implementer adds the remaining 49 entries below that seed — using the same shape. For unverified jurisdictions, follow the rule above (null fields + pending note + backlog plan).

- [ ] **Step 3: Write the data integrity test**

```ts
// tests/unit/data/bill-of-sale-rules.test.ts
import { describe, it, expect } from 'vitest';
import { z } from 'zod';
import rules from '../../../src/data/legal/bill-of-sale-state-rules.json';
import { ALL_JURISDICTIONS } from '../../../src/data/jurisdictions';

const ruleSchema = z.object({
  code: z.string(),
  notary_required: z.boolean().nullable(),
  witness_required: z.boolean().nullable(),
  required_fields: z.array(z.string()),
  vehicle_extra_fields: z.array(z.string()),
  governing_statute: z.string().nullable(),
  statute_url: z.string().url().nullable(),
  vehicle_dmv_form: z.string().nullable(),
  vehicle_dmv_url: z.string().url().nullable(),
  notes: z.string(),
  last_verified: z.string().regex(/^\d{4}-\d{2}-\d{2}$/)
});

describe('bill-of-sale state rules', () => {
  it('covers every jurisdiction in the registry', () => {
    const codes = new Set(Object.keys(rules));
    for (const j of ALL_JURISDICTIONS) {
      expect(codes.has(j.code)).toBe(true);
    }
  });

  it('every entry passes the rule schema', () => {
    for (const [, entry] of Object.entries(rules)) {
      expect(() => ruleSchema.parse(entry)).not.toThrow();
    }
  });

  it("entry's `code` field matches its key", () => {
    for (const [key, entry] of Object.entries(rules) as [string, { code: string }][]) {
      expect(entry.code).toBe(key);
    }
  });
});
```

- [ ] **Step 4: Run test — expect FAIL while data is incomplete**

Run: `npm test -- tests/unit/data/bill-of-sale-rules.test.ts`
Expected: FAIL on "covers every jurisdiction" until all 54 entries are filled.

- [ ] **Step 5: Implementer fills the remaining 49 entries**

Use primary sources (state legislature, gov.uk). For each entry follow the rule for unverified data above — never invent statute citations.

- [ ] **Step 6: Run test — expect PASS**

Run: `npm test -- tests/unit/data/bill-of-sale-rules.test.ts`
Expected: PASS (3 tests).

- [ ] **Step 7: Commit**

```bash
git add src/data/ tests/unit/data/
git commit -m "feat(data): jurisdictions registry + bill-of-sale state rules (54 jurisdictions)"
```

---

## Task 7: Renderer-agnostic DocumentTree builder (TDD)

**Files:**
- Create: `src/lib/builder/render.ts`
- Create: `tests/unit/builder/render.test.ts`

The DocumentTree is a renderer-agnostic intermediate. Each renderer (legal-document, resume, …) can transform it differently. Export adapters consume DocumentTree directly OR consume renderer output.

- [ ] **Step 1: Write the failing test**

```ts
// tests/unit/builder/render.test.ts
import { describe, it, expect } from 'vitest';
import { buildDocumentTree } from '../../../src/lib/builder/render';
import type { BuilderSchema } from '../../../src/lib/builder/schema';

const schema: BuilderSchema = {
  slug: 'bill-of-sale',
  title: 'Bill of Sale',
  renderer: 'legal-document',
  sections: [
    {
      id: 'parties',
      heading: 'Parties',
      fields: [
        { id: 'seller_name', label: 'Seller name', type: 'text', required: true },
        { id: 'buyer_name', label: 'Buyer name', type: 'text', required: true }
      ]
    },
    {
      id: 'item',
      heading: 'Item',
      fields: [
        { id: 'item_type', label: 'Item type', type: 'select', options: [
          { value: 'vehicle', label: 'Vehicle' },
          { value: 'other', label: 'Other' }
        ]},
        { id: 'vin', label: 'VIN', type: 'text', showIf: "item_type == 'vehicle'" }
      ]
    }
  ]
};

describe('buildDocumentTree', () => {
  it('emits a section per schema section with rendered fields', () => {
    const tree = buildDocumentTree(schema, { seller_name: 'Sunny', buyer_name: 'Alex', item_type: 'other' });
    expect(tree.title).toBe('Bill of Sale');
    expect(tree.sections).toHaveLength(2);
    expect(tree.sections[0].fields).toEqual([
      { id: 'seller_name', label: 'Seller name', value: 'Sunny' },
      { id: 'buyer_name', label: 'Buyer name', value: 'Alex' }
    ]);
  });

  it('omits fields whose showIf is false', () => {
    const tree = buildDocumentTree(schema, { item_type: 'other' });
    const item = tree.sections.find((s) => s.heading === 'Item')!;
    expect(item.fields.find((f) => f.id === 'vin')).toBeUndefined();
  });

  it('includes fields whose showIf is true', () => {
    const tree = buildDocumentTree(schema, { item_type: 'vehicle', vin: '1HGBH41JXMN109186' });
    const item = tree.sections.find((s) => s.heading === 'Item')!;
    expect(item.fields.find((f) => f.id === 'vin')?.value).toBe('1HGBH41JXMN109186');
  });

  it('renders missing values as empty string (no undefined leaks)', () => {
    const tree = buildDocumentTree(schema, {});
    expect(tree.sections[0].fields[0].value).toBe('');
  });
});
```

- [ ] **Step 2: Run test — expect fail**

Run: `npm test -- tests/unit/builder/render.test.ts`
Expected: FAIL — module not found.

- [ ] **Step 3: Implement `src/lib/builder/render.ts`**

```ts
import type { BuilderSchema, BuilderField } from './schema';
import type { BuilderState } from './state';
import { evaluate } from './expression';

export interface RenderedField {
  id: string;
  label: string;
  value: string;
}

export interface RenderedSection {
  heading: string;
  fields: RenderedField[];
}

export interface DocumentTree {
  title: string;
  sections: RenderedSection[];
}

const stringify = (v: unknown): string => {
  if (v === null || v === undefined) return '';
  if (typeof v === 'boolean') return v ? 'Yes' : 'No';
  return String(v);
};

const fieldVisible = (f: BuilderField, state: BuilderState): boolean =>
  !f.showIf || evaluate(f.showIf, state);

export const buildDocumentTree = (schema: BuilderSchema, state: BuilderState): DocumentTree => ({
  title: schema.title,
  sections: schema.sections.map((s) => ({
    heading: s.heading,
    fields: s.fields
      .filter((f) => fieldVisible(f, state))
      .map((f) => ({ id: f.id, label: f.label, value: stringify(state[f.id]) }))
  }))
});
```

- [ ] **Step 4: Run test — expect pass**

Run: `npm test -- tests/unit/builder/render.test.ts`
Expected: PASS (4 tests).

- [ ] **Step 5: Commit**

```bash
git add src/lib/builder/render.ts tests/unit/builder/render.test.ts
git commit -m "feat(builder): DocumentTree builder with showIf filtering"
```

---

## Task 8: PDF / DOCX / HTML / Print export adapters (TDD)

Three sub-tasks below — one per export format. Each is small and tests "produces a non-empty Blob/string with the expected fields rendered". Visual fidelity is verified at the e2e level in Task 14.

### Task 8a — HTML export

**Files:**
- Create: `src/lib/export/html.ts`
- Create: `tests/unit/export/html.test.ts`

- [ ] **Step 1: Write test**

```ts
// tests/unit/export/html.test.ts
import { describe, it, expect } from 'vitest';
import { documentToHtml } from '../../../src/lib/export/html';
import type { DocumentTree } from '../../../src/lib/builder/render';

const tree: DocumentTree = {
  title: 'Bill of Sale',
  sections: [
    { heading: 'Parties', fields: [{ id: 'seller', label: 'Seller', value: 'Sunny' }] }
  ]
};

describe('documentToHtml', () => {
  it('emits a self-contained HTML string with the title and field values', () => {
    const html = documentToHtml(tree);
    expect(html).toContain('<h1>Bill of Sale</h1>');
    expect(html).toContain('<h2>Parties</h2>');
    expect(html).toContain('Sunny');
  });
  it('escapes HTML in field values', () => {
    const evil: DocumentTree = { title: 't', sections: [{ heading: 'h', fields: [{ id: 'x', label: 'x', value: '<script>alert(1)</script>' }] }] };
    expect(documentToHtml(evil)).not.toContain('<script>alert');
    expect(documentToHtml(evil)).toContain('&lt;script&gt;');
  });
});
```

- [ ] **Step 2: Run, expect fail.** `npm test -- tests/unit/export/html.test.ts`

- [ ] **Step 3: Implement**

```ts
// src/lib/export/html.ts
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
```

- [ ] **Step 4: Run, expect pass.**

- [ ] **Step 5: Commit.**
```bash
git add src/lib/export/html.ts tests/unit/export/html.test.ts
git commit -m "feat(export): HTML export with XSS-safe escaping"
```

### Task 8b — PDF export

**Files:**
- Create: `src/lib/export/pdf.ts`
- Create: `tests/unit/export/pdf.test.ts`

- [ ] **Step 1: Write test**

```ts
// tests/unit/export/pdf.test.ts
import { describe, it, expect } from 'vitest';
import { documentToPdfBlob } from '../../../src/lib/export/pdf';
import type { DocumentTree } from '../../../src/lib/builder/render';

const tree: DocumentTree = {
  title: 'Bill of Sale',
  sections: [{ heading: 'Parties', fields: [{ id: 'seller', label: 'Seller', value: 'Sunny' }] }]
};

describe('documentToPdfBlob', () => {
  it('returns a non-empty PDF Blob', async () => {
    const blob = await documentToPdfBlob(tree);
    expect(blob.size).toBeGreaterThan(500);
    expect(blob.type).toBe('application/pdf');
  });
});
```

- [ ] **Step 2: Run, expect fail.**

- [ ] **Step 3: Implement**

```ts
// src/lib/export/pdf.ts
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
```

- [ ] **Step 4: Run, expect pass.**

- [ ] **Step 5: Commit.**
```bash
git add src/lib/export/pdf.ts tests/unit/export/pdf.test.ts
git commit -m "feat(export): PDF export via jsPDF"
```

### Task 8c — DOCX export

**Files:**
- Create: `src/lib/export/docx.ts`
- Create: `tests/unit/export/docx.test.ts`

- [ ] **Step 1: Write test**

```ts
// tests/unit/export/docx.test.ts
import { describe, it, expect } from 'vitest';
import { documentToDocxBlob } from '../../../src/lib/export/docx';
import type { DocumentTree } from '../../../src/lib/builder/render';

const tree: DocumentTree = {
  title: 'Bill of Sale',
  sections: [{ heading: 'Parties', fields: [{ id: 'seller', label: 'Seller', value: 'Sunny' }] }]
};

describe('documentToDocxBlob', () => {
  it('returns a non-empty DOCX Blob', async () => {
    const blob = await documentToDocxBlob(tree);
    expect(blob.size).toBeGreaterThan(1000);
    expect(blob.type).toContain('officedocument');
  });
});
```

- [ ] **Step 2: Run, expect fail.**

- [ ] **Step 3: Implement**

```ts
// src/lib/export/docx.ts
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
```

- [ ] **Step 4: Run, expect pass.**

- [ ] **Step 5: Commit.**
```bash
git add src/lib/export/docx.ts tests/unit/export/docx.test.ts
git commit -m "feat(export): DOCX export via docx package"
```

### Task 8d — Print

**Files:**
- Create: `src/lib/export/print.ts`

No unit test (pure browser side effect). Smoke-tested in e2e (Task 14).

- [ ] **Step 1: Implement**

```ts
// src/lib/export/print.ts
import { documentToHtml } from './html';
import type { DocumentTree } from '../builder/render';

export const printDocument = (tree: DocumentTree): void => {
  const win = window.open('', '_blank', 'noopener,width=820,height=1000');
  if (!win) return;
  win.document.write(`<!doctype html><html><head><title>${tree.title}</title></head><body>${documentToHtml(tree)}<script>window.onload=()=>{window.print();window.close();}</script></body></html>`);
  win.document.close();
};
```

- [ ] **Step 2: Commit.**
```bash
git add src/lib/export/print.ts
git commit -m "feat(export): print-window export"
```

---

## Task 9: Field components

**Files:**
- Create: `src/components/builders/fields/FieldShell.tsx`
- Create: `src/components/builders/fields/TextField.tsx`
- Create: `src/components/builders/fields/TextareaField.tsx`
- Create: `src/components/builders/fields/SelectField.tsx`
- Create: `src/components/builders/fields/CurrencyField.tsx`
- Create: `src/components/builders/fields/DateField.tsx`
- Create: `src/components/builders/fields/CheckboxField.tsx`

Each field is small and uncontroversial. The implementer writes them all in one task. Convention:

- Each component takes props `{ id, label, value, onChange, required?, help?, options?, currency? }` matching the field's type.
- All inputs styled via shared classes from `src/styles/builder.css` (created in Task 13).
- All fields keyboard-accessible, with associated `<label htmlFor>`.

- [ ] **Step 1: Implement `FieldShell.tsx`**

```tsx
import type { ReactNode } from 'react';

interface Props {
  id: string;
  label: string;
  required?: boolean;
  help?: string;
  children: ReactNode;
}

export const FieldShell = ({ id, label, required, help, children }: Props) => (
  <div className="b-field">
    <label htmlFor={id} className="b-label">
      {label}{required ? <span aria-hidden="true" className="b-req">*</span> : null}
    </label>
    {children}
    {help ? <p className="b-help">{help}</p> : null}
  </div>
);
```

- [ ] **Step 2: Implement `TextField.tsx`**

```tsx
import { FieldShell } from './FieldShell';

interface Props {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  required?: boolean;
  help?: string;
}

export const TextField = ({ id, label, value, onChange, required, help }: Props) => (
  <FieldShell id={id} label={label} required={required} help={help}>
    <input
      id={id}
      type="text"
      className="b-input"
      value={value}
      required={required}
      onChange={(e) => onChange(e.target.value)}
    />
  </FieldShell>
);
```

- [ ] **Step 3: Implement `TextareaField.tsx`**

```tsx
import { FieldShell } from './FieldShell';

interface Props {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  required?: boolean;
  help?: string;
}

export const TextareaField = ({ id, label, value, onChange, required, help }: Props) => (
  <FieldShell id={id} label={label} required={required} help={help}>
    <textarea
      id={id}
      className="b-input b-textarea"
      value={value}
      required={required}
      rows={4}
      onChange={(e) => onChange(e.target.value)}
    />
  </FieldShell>
);
```

- [ ] **Step 4: Implement `SelectField.tsx`**

```tsx
import { FieldShell } from './FieldShell';
import { US_STATES, UK_NATIONS } from '@/data/jurisdictions';

interface Option { value: string; label: string; }
type OptionsSource = Option[] | 'us-states' | 'uk-nations' | 'us-states+uk-nations';

interface Props {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: OptionsSource;
  required?: boolean;
  help?: string;
}

const resolve = (src: OptionsSource): Option[] => {
  if (Array.isArray(src)) return src;
  if (src === 'us-states') return US_STATES.map((s) => ({ value: s.code, label: s.region }));
  if (src === 'uk-nations') return UK_NATIONS.map((n) => ({ value: n.code, label: n.region }));
  return [
    ...US_STATES.map((s) => ({ value: s.code, label: `${s.region}, US` })),
    ...UK_NATIONS.map((n) => ({ value: n.code, label: `${n.region}, UK` }))
  ];
};

export const SelectField = ({ id, label, value, onChange, options, required, help }: Props) => {
  const opts = resolve(options);
  return (
    <FieldShell id={id} label={label} required={required} help={help}>
      <select
        id={id}
        className="b-input b-select"
        value={value}
        required={required}
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="" disabled={required}>Select…</option>
        {opts.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
      </select>
    </FieldShell>
  );
};
```

- [ ] **Step 5: Implement `CurrencyField.tsx`**

```tsx
import { FieldShell } from './FieldShell';

interface Props {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  currency?: 'USD' | 'GBP';
  required?: boolean;
  help?: string;
}

const symbol = (c?: string) => (c === 'GBP' ? '£' : '$');

export const CurrencyField = ({ id, label, value, onChange, currency, required, help }: Props) => (
  <FieldShell id={id} label={label} required={required} help={help}>
    <div className="b-currency">
      <span className="b-currency-sym" aria-hidden="true">{symbol(currency)}</span>
      <input
        id={id}
        type="number"
        inputMode="decimal"
        step="0.01"
        min="0"
        className="b-input"
        value={value}
        required={required}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  </FieldShell>
);
```

- [ ] **Step 6: Implement `DateField.tsx`**

```tsx
import { FieldShell } from './FieldShell';

interface Props {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  required?: boolean;
  help?: string;
}

export const DateField = ({ id, label, value, onChange, required, help }: Props) => (
  <FieldShell id={id} label={label} required={required} help={help}>
    <input
      id={id}
      type="date"
      className="b-input"
      value={value}
      required={required}
      onChange={(e) => onChange(e.target.value)}
    />
  </FieldShell>
);
```

- [ ] **Step 7: Implement `CheckboxField.tsx`**

```tsx
import { FieldShell } from './FieldShell';

interface Props {
  id: string;
  label: string;
  value: boolean;
  onChange: (v: boolean) => void;
  required?: boolean;
  help?: string;
}

export const CheckboxField = ({ id, label, value, onChange, help }: Props) => (
  <FieldShell id={id} label={label} help={help}>
    <input
      id={id}
      type="checkbox"
      className="b-checkbox"
      checked={value}
      onChange={(e) => onChange(e.target.checked)}
    />
  </FieldShell>
);
```

- [ ] **Step 8: Build (no test for these components — covered by integration test in Task 12)**

Run: `cd /c/Users/sunny/repos/template-how && SKIP_LINK_GRAPH=1 npm run build`
Expected: build passes (the components are unused at this stage).

- [ ] **Step 9: Commit**

```bash
git add src/components/builders/fields/
git commit -m "feat(builder): field components (text, textarea, select, currency, date, checkbox)"
```

---

## Task 10: BuilderForm + BuilderPreview + BuilderExports

**Files:**
- Create: `src/components/builders/BuilderForm.tsx`
- Create: `src/components/builders/BuilderPreview.tsx`
- Create: `src/components/builders/BuilderExports.tsx`

- [ ] **Step 1: `BuilderForm.tsx`**

```tsx
import type { BuilderSchema, BuilderField } from '@/lib/builder/schema';
import type { BuilderState } from '@/lib/builder/state';
import { evaluate } from '@/lib/builder/expression';
import { TextField } from './fields/TextField';
import { TextareaField } from './fields/TextareaField';
import { SelectField } from './fields/SelectField';
import { CurrencyField } from './fields/CurrencyField';
import { DateField } from './fields/DateField';
import { CheckboxField } from './fields/CheckboxField';

interface Props {
  schema: BuilderSchema;
  state: BuilderState;
  onChange: (id: string, value: BuilderState[string]) => void;
}

const visible = (f: BuilderField, state: BuilderState): boolean =>
  !f.showIf || evaluate(f.showIf, state);

const renderField = (f: BuilderField, state: BuilderState, onChange: Props['onChange']) => {
  const value = state[f.id];
  const common = { id: f.id, label: f.label, required: f.required, help: f.help };
  switch (f.type) {
    case 'text': return <TextField {...common} value={String(value ?? '')} onChange={(v) => onChange(f.id, v)} />;
    case 'textarea': return <TextareaField {...common} value={String(value ?? '')} onChange={(v) => onChange(f.id, v)} />;
    case 'select': return <SelectField {...common} options={f.options} value={String(value ?? '')} onChange={(v) => onChange(f.id, v)} />;
    case 'currency': return <CurrencyField {...common} currency={f.currency} value={String(value ?? '')} onChange={(v) => onChange(f.id, v)} />;
    case 'date': return <DateField {...common} value={String(value ?? '')} onChange={(v) => onChange(f.id, v)} />;
    case 'checkbox': return <CheckboxField {...common} value={Boolean(value)} onChange={(v) => onChange(f.id, v)} />;
    case 'number': return <TextField {...common} value={String(value ?? '')} onChange={(v) => onChange(f.id, v)} />;
  }
};

export const BuilderForm = ({ schema, state, onChange }: Props) => (
  <form className="b-form" onSubmit={(e) => e.preventDefault()}>
    {schema.sections.map((section) => (
      <fieldset key={section.id} className="b-section">
        <legend className="b-legend">{section.heading}</legend>
        {section.fields.filter((f) => visible(f, state)).map((f) => (
          <div key={f.id}>{renderField(f, state, onChange)}</div>
        ))}
      </fieldset>
    ))}
  </form>
);
```

- [ ] **Step 2: `BuilderPreview.tsx`**

```tsx
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
```

- [ ] **Step 3: `BuilderExports.tsx`**

```tsx
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
```

- [ ] **Step 4: Build**

Run: `SKIP_LINK_GRAPH=1 npm run build`
Expected: passes.

- [ ] **Step 5: Commit**

```bash
git add src/components/builders/Builder*.tsx
git commit -m "feat(builder): BuilderForm, BuilderPreview, BuilderExports"
```

---

## Task 11: TemplateBuilder top-level island

**Files:**
- Create: `src/components/builders/TemplateBuilder.tsx`
- Create: `tests/unit/builder/TemplateBuilder.test.tsx`

- [ ] **Step 1: Write integration test**

```tsx
// tests/unit/builder/TemplateBuilder.test.tsx
import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { TemplateBuilder } from '../../../src/components/builders/TemplateBuilder';
import type { BuilderSchema } from '../../../src/lib/builder/schema';

const schema: BuilderSchema = {
  slug: 'demo',
  title: 'Demo Doc',
  renderer: 'legal-document',
  sections: [
    {
      id: 's1',
      heading: 'Section 1',
      fields: [
        { id: 'name', label: 'Name', type: 'text', required: true }
      ]
    }
  ]
};

describe('TemplateBuilder', () => {
  beforeEach(() => window.localStorage.clear());

  it('renders form, preview, and export bar', () => {
    render(<TemplateBuilder schema={schema} />);
    expect(screen.getByRole('form')).toBeInTheDocument();
    expect(screen.getByText('Demo Doc')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Download PDF/i })).toBeInTheDocument();
  });

  it('reflects field input in the preview live', () => {
    render(<TemplateBuilder schema={schema} />);
    fireEvent.change(screen.getByLabelText(/Name/i), { target: { value: 'Sunny' } });
    expect(screen.getByText('Sunny')).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run, expect fail.**

- [ ] **Step 3: Implement `TemplateBuilder.tsx`**

```tsx
import type { BuilderSchema } from '@/lib/builder/schema';
import { useBuilderState } from '@/lib/builder/state';
import { buildDocumentTree } from '@/lib/builder/render';
import { BuilderForm } from './BuilderForm';
import { BuilderPreview } from './BuilderPreview';
import { BuilderExports } from './BuilderExports';

interface Props {
  schema: BuilderSchema;
  filenameStem?: string;
}

export const TemplateBuilder = ({ schema, filenameStem }: Props) => {
  const { state, set } = useBuilderState(schema.slug);
  const tree = buildDocumentTree(schema, state);
  return (
    <div className="b-shell" role="region" aria-label={`${schema.title} builder`}>
      <div className="b-pane b-pane-form">
        <BuilderForm schema={schema} state={state} onChange={set} />
      </div>
      <div className="b-pane b-pane-preview">
        <BuilderPreview tree={tree} />
        <BuilderExports tree={tree} filenameStem={filenameStem ?? schema.slug} />
      </div>
    </div>
  );
};
```

- [ ] **Step 4: Run, expect pass (2 tests).**

- [ ] **Step 5: Commit**

```bash
git add src/components/builders/TemplateBuilder.tsx tests/unit/builder/TemplateBuilder.test.tsx
git commit -m "feat(builder): TemplateBuilder top-level island"
```

---

## Task 12: Builder styles

**Files:**
- Create: `src/styles/builder.css`

- [ ] **Step 1: Implement**

```css
@import './tokens.css';

.b-shell {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--sp-6);
  margin: var(--sp-8) 0;
  background: var(--bg-elev);
  border: 1px solid var(--border);
  border-radius: var(--r-lg);
  padding: var(--sp-6);
}
@media (max-width: 900px) {
  .b-shell { grid-template-columns: 1fr; }
}

.b-form { display: flex; flex-direction: column; gap: var(--sp-6); }
.b-section { border: 0; padding: 0; margin: 0; }
.b-legend {
  font-family: var(--font-display);
  font-size: var(--fs-lg);
  margin-bottom: var(--sp-3);
}

.b-field { margin-bottom: var(--sp-4); }
.b-label {
  display: block;
  font-size: var(--fs-sm);
  font-weight: 600;
  margin-bottom: var(--sp-1);
  color: var(--fg);
}
.b-req { color: var(--accent); margin-left: 2px; }
.b-help { font-size: var(--fs-xs); color: var(--fg-muted); margin-top: var(--sp-1); }

.b-input {
  width: 100%;
  padding: var(--sp-2) var(--sp-3);
  border: 1px solid var(--border);
  border-radius: var(--r-sm);
  background: var(--bg);
  color: var(--fg);
  font: inherit;
  font-size: var(--fs-base);
}
.b-input:focus-visible { outline: 2px solid var(--accent); outline-offset: 1px; }
.b-textarea { resize: vertical; min-height: 96px; }
.b-select { background: var(--bg); }

.b-currency { display: flex; align-items: stretch; gap: var(--sp-1); }
.b-currency-sym {
  display: inline-flex; align-items: center; justify-content: center;
  padding: 0 var(--sp-3); background: var(--paper-200);
  border-radius: var(--r-sm); font-family: var(--font-mono);
}

.b-checkbox { width: 18px; height: 18px; }

.b-preview {
  background: var(--paper-50);
  border: 1px solid var(--border);
  border-radius: var(--r-sm);
  padding: var(--sp-6);
  overflow: auto;
  max-height: 600px;
}
.b-doc { font-family: var(--font-display); color: #111; line-height: 1.55; }
.b-doc-title { font-size: var(--fs-2xl); margin: 0 0 var(--sp-6); text-align: center; }
.b-doc-section { margin-bottom: var(--sp-4); }
.b-doc-h2 { font-size: var(--fs-lg); margin: 0 0 var(--sp-2); }
.b-doc-row { margin: 0 0 var(--sp-1); font-family: var(--font-body); font-size: var(--fs-sm); }
.b-doc-empty { color: var(--paper-500); }

.b-exports {
  display: flex; gap: var(--sp-3);
  margin-top: var(--sp-4); flex-wrap: wrap;
  position: sticky; bottom: 0;
  background: var(--bg-elev);
  padding: var(--sp-3) 0;
}
.b-btn {
  appearance: none;
  border: 1px solid var(--border); background: var(--bg);
  color: var(--fg); padding: var(--sp-3) var(--sp-4);
  border-radius: var(--r-sm); font: inherit; cursor: pointer;
  transition: background 120ms ease;
}
.b-btn:hover { background: var(--paper-200); }
.b-btn-primary { background: var(--navy-700); color: var(--paper-50); border-color: var(--navy-700); }
.b-btn-primary:hover { background: var(--navy-500); }
```

- [ ] **Step 2: Commit**

```bash
git add src/styles/builder.css
git commit -m "feat(builder): builder styles (paper preview, sticky export bar)"
```

---

## Task 13: SEED schema extension + bill-of-sale content + SeedLayout + dynamic route

**Files:**
- Modify: `src/content/config.ts`
- Create: `src/content/seeds/bill-of-sale.md`
- Create: `src/components/content/DefinitionalLede.astro`
- Create: `src/components/content/DownloadBlock.astro`
- Create: `src/components/content/JurisdictionTable.astro`
- Create: `src/components/content/AuthorBox.astro`
- Create: `src/components/content/SourceList.astro`
- Create: `src/components/schema/HowToSchema.astro`
- Create: `src/components/schema/FAQPageSchema.astro`
- Create: `src/components/schema/SoftwareApplicationSchema.astro`
- Create: `src/layouts/SeedLayout.astro`
- Create: `src/pages/[seed].astro`

This task is large but mechanical — it composes everything built so far into the first end-to-end SEED page. Each sub-step is small.

- [ ] **Step 1: Extend `src/content/config.ts` `seeds` schema**

Add to the existing `seeds` schema (same file, do not touch other collections):

```ts
// inside the seeds collection schema object — ADD these fields, keep the rest
builderSchema: z.any().optional(), // BuilderSchema lives in the JSON file referenced; lazy-validated at use site
faq: z.array(z.object({ q: z.string(), a: z.string() })).min(8).max(15),
howTo: z.object({
  name: z.string(),
  steps: z.array(z.object({ name: z.string(), text: z.string() })).min(3)
})
```

(Don't import the BuilderSchema validator into `content/config.ts` — Astro evaluates that file at build start before the rest of the codebase resolves.)

- [ ] **Step 2: Create the SEED entry `src/content/seeds/bill-of-sale.md`**

Write the actual page content (~1,800 words minimum per spec §11.3). Frontmatter must include all required fields per the extended schema. The implementer drafts the body via the standard "AI draft → human edit pass" workflow per spec §11.1, MUST score `/semantic-audit` ≥85, and MUST include the unique micro-details required (real worked example with realistic names/figures, specific gotcha with cited source, real data point, expert tip boxout).

The frontmatter MUST embed an inline `builderSchema` object matching the structure validated in Task 3. Suggested skeleton (the implementer fills the body and FAQ from real research):

```yaml
---
node: legal-document-templates
title: 'Bill of Sale Template (US + UK) — Free PDF & DOCX'
h1: 'Bill of Sale Template'
definitionalLede: 'A bill of sale is a legal document that records the transfer of ownership of personal property from a seller to a buyer.'
primaryKeyword: 'bill of sale template'
searchVolume: 40000
difficulty: 7
renderer: legal-document
related:
  - letter-of-recommendation
  - resignation-letter
  - nda
  - lease-agreement
  - last-will
crossCluster:
  - resume
  - invoice
audience: [us, uk]
wordCountFloor: 1800
sources:
  - title: 'CA Commercial Code § 2401'
    url: 'https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=COM&sectionNum=2401'
    accessed: '2026-04-23'
  - title: 'Sale of Goods Act 1979'
    url: 'https://www.legislation.gov.uk/ukpga/1979/54'
    accessed: '2026-04-23'
updated: '2026-04-23'
howTo:
  name: 'How to fill out a bill of sale'
  steps:
    - name: 'Identify the parties'
      text: 'Write the full legal names and addresses of both the seller and the buyer.'
    - name: 'Describe the item'
      text: 'For a vehicle, include VIN, year, make, model, and odometer reading. For other property, describe it precisely enough that no other identical item could be substituted.'
    - name: 'State the price and payment method'
      text: 'Record the agreed price in the buyer''s currency and how it was paid (cash, bank transfer, cashier''s cheque).'
    - name: 'Sign and date'
      text: 'Both parties sign and date. In Florida and a handful of other US states, two witnesses or a notary are required for vehicle sales — see the jurisdiction table below.'
faq:
  - q: 'Do I need a notary for a bill of sale?'
    a: 'It depends on your state. Florida requires both witnesses and notarisation for vehicle sales. Most other US states do not. The UK does not require notarisation.'
  - q: 'Is a handwritten bill of sale legally valid?'
    a: 'Yes, in every US state and the UK. The form is what matters — it must include the parties, the item, the price, the date, and signatures.'
  - q: 'What is the difference between a bill of sale and a title transfer?'
    a: 'The bill of sale records the transaction. The title transfer (in the US, the DMV-administered change of ownership) is the legal recording with the state. Both are usually needed for vehicles.'
  - q: 'Do I need a bill of sale to sell a car privately?'
    a: 'In the US, most states require one for vehicle sales. In the UK, the V5C/2 new keeper supplement serves the same role.'
  - q: 'What if the buyer refuses to sign?'
    a: 'Then the sale is incomplete — never hand over the item or the keys without both signatures.'
  - q: 'Can a bill of sale be cancelled after both parties sign?'
    a: 'Only by mutual agreement. Once signed, it is a binding contract for the transfer of ownership.'
  - q: 'Do I keep the original or a copy?'
    a: 'Both parties should keep a signed original. Photographs or scans are not legally interchangeable with a wet-ink original in some jurisdictions.'
  - q: 'Is sales tax owed on a private bill of sale?'
    a: 'In most US states, the buyer pays sales/use tax at registration based on the price stated. The UK does not levy VAT on most private sales between individuals.'
builderSchema:
  slug: bill-of-sale
  title: 'Bill of Sale'
  renderer: legal-document
  sections:
    - id: parties
      heading: 'Parties'
      fields:
        - { id: date, label: 'Date of sale', type: date, required: true }
        - { id: seller_name, label: 'Seller full name', type: text, required: true }
        - { id: seller_address, label: 'Seller address', type: textarea, required: true }
        - { id: buyer_name, label: 'Buyer full name', type: text, required: true }
        - { id: buyer_address, label: 'Buyer address', type: textarea, required: true }
        - { id: jurisdiction, label: 'Jurisdiction', type: select, required: true, options: 'us-states+uk-nations' }
    - id: item
      heading: 'Item'
      fields:
        - id: item_type
          label: 'Item type'
          type: select
          required: true
          options:
            - { value: vehicle, label: 'Vehicle' }
            - { value: boat, label: 'Boat' }
            - { value: firearm, label: 'Firearm' }
            - { value: other, label: 'Other personal property' }
        - { id: item_description, label: 'Description', type: textarea, required: true }
        - { id: vin, label: 'VIN (Vehicle Identification Number)', type: text, showIf: "item_type == 'vehicle'" }
        - { id: odometer, label: 'Odometer reading (miles)', type: number, showIf: "item_type == 'vehicle'" }
        - { id: year, label: 'Year', type: number, showIf: "item_type == 'vehicle'" }
        - { id: make, label: 'Make', type: text, showIf: "item_type == 'vehicle'" }
        - { id: model, label: 'Model', type: text, showIf: "item_type == 'vehicle'" }
    - id: price
      heading: 'Price & payment'
      fields:
        - { id: price, label: 'Agreed price', type: currency, required: true, currency: USD }
        - id: payment_method
          label: 'Payment method'
          type: select
          required: true
          options:
            - { value: cash, label: 'Cash' }
            - { value: bank_transfer, label: 'Bank transfer' }
            - { value: cashiers_check, label: "Cashier's check" }
            - { value: other, label: 'Other (describe in notes)' }
        - { id: as_is, label: 'Sold "as-is" with no warranties', type: checkbox }
        - { id: notes, label: 'Notes (optional)', type: textarea }
---

(Body content — ~1,800 words minimum — covering all sections from spec §5: What it is, when to use, what it must include, variants overview, step-by-step, common mistakes, worked example, sources. Implementer drafts via AI then mandatory human edit pass per spec §11.1. Must pass `/semantic-audit ≥ 85`.)
```

- [ ] **Step 3: Implement small content components**

`DefinitionalLede.astro`:

```astro
---
interface Props { lede: string; }
const { lede } = Astro.props;
---
<p class="seed-lede" itemprop="abstract">{lede}</p>

<style>
.seed-lede {
  font-size: var(--fs-lg);
  color: var(--fg);
  font-family: var(--font-display);
  font-style: italic;
  max-width: var(--content-max);
  margin-bottom: var(--sp-6);
}
</style>
```

`DownloadBlock.astro`:

```astro
---
interface Props {
  pdfUrl?: string;
  docxUrl?: string;
  gdocUrl?: string;
  title: string;
}
const { pdfUrl, docxUrl, gdocUrl, title } = Astro.props;
---
<aside class="dl-block" aria-label="Pre-made download">
  <p class="dl-label">In a hurry? Pre-made template:</p>
  <div class="dl-row">
    {pdfUrl ? <a href={pdfUrl} class="dl-btn" download>{title} (PDF)</a> : null}
    {docxUrl ? <a href={docxUrl} class="dl-btn" download>{title} (DOCX)</a> : null}
    {gdocUrl ? <a href={gdocUrl} class="dl-btn" rel="noopener" target="_blank">Open in Google Docs</a> : null}
  </div>
</aside>

<style>
.dl-block {
  background: var(--paper-200);
  border-left: 4px solid var(--accent);
  padding: var(--sp-4) var(--sp-6);
  margin: var(--sp-6) 0;
  border-radius: var(--r-sm);
}
.dl-label { font-size: var(--fs-sm); color: var(--fg-muted); margin: 0 0 var(--sp-2); }
.dl-row { display: flex; gap: var(--sp-3); flex-wrap: wrap; }
.dl-btn {
  background: var(--navy-700); color: var(--paper-50);
  padding: var(--sp-2) var(--sp-4); border-radius: var(--r-sm);
  text-decoration: none; font-size: var(--fs-sm);
}
.dl-btn:hover { background: var(--navy-500); color: var(--paper-50); }
</style>
```

`JurisdictionTable.astro`:

```astro
---
import rules from '@/data/legal/bill-of-sale-state-rules.json';
import { ALL_JURISDICTIONS } from '@/data/jurisdictions';

interface Rule {
  notary_required: boolean | null;
  witness_required: boolean | null;
  governing_statute: string | null;
  statute_url: string | null;
  last_verified: string;
}

const rows = ALL_JURISDICTIONS.map((j) => ({
  region: j.region,
  country: j.country.toUpperCase(),
  rule: rules[j.code as keyof typeof rules] as Rule | undefined
}));
---
<table class="jt">
  <caption class="sr-only">Bill of sale requirements by US state and UK nation</caption>
  <thead>
    <tr>
      <th scope="col">Jurisdiction</th>
      <th scope="col">Notary</th>
      <th scope="col">Witnesses</th>
      <th scope="col">Governing law</th>
      <th scope="col">Verified</th>
    </tr>
  </thead>
  <tbody>
    {rows.map((r) => (
      <tr>
        <th scope="row">{r.region} ({r.country})</th>
        <td>{r.rule?.notary_required === true ? 'Required' : r.rule?.notary_required === false ? 'Not required' : '—'}</td>
        <td>{r.rule?.witness_required === true ? 'Required' : r.rule?.witness_required === false ? 'Not required' : '—'}</td>
        <td>{r.rule?.statute_url ? <a href={r.rule.statute_url} rel="noopener">{r.rule.governing_statute}</a> : '—'}</td>
        <td><time datetime={r.rule?.last_verified ?? ''}>{r.rule?.last_verified ?? '—'}</time></td>
      </tr>
    ))}
  </tbody>
</table>

<style>
.jt { border-collapse: collapse; width: 100%; font-size: var(--fs-sm); margin: var(--sp-6) 0; }
.jt th, .jt td { padding: var(--sp-2) var(--sp-3); border-bottom: 1px solid var(--border); text-align: left; }
.jt thead th { background: var(--paper-200); font-weight: 600; }
.jt tbody th { font-weight: 500; color: var(--fg); }
</style>
```

`AuthorBox.astro`:

```astro
---
import PersonSchema from '@/components/schema/PersonSchema.astro';
import { author } from '@/lib/site';
---
<aside class="author-box" aria-label="About the author">
  <PersonSchema />
  <h3 class="ab-name">Reviewed by {author.name}</h3>
  <p class="ab-bio">SEO consultant and template editor. Every template on this site is reviewed against primary sources before publication.</p>
  <ul class="ab-links">
    {author.sameAs.map((href) => (
      <li><a href={href} rel="noopener me">{new URL(href).hostname}</a></li>
    ))}
  </ul>
</aside>

<style>
.author-box {
  border-top: 1px solid var(--border);
  padding-top: var(--sp-6); margin-top: var(--sp-12);
  display: grid; gap: var(--sp-2);
}
.ab-name { font-size: var(--fs-lg); margin: 0; }
.ab-bio { font-size: var(--fs-sm); color: var(--fg-muted); margin: 0; }
.ab-links { list-style: none; padding: 0; margin: 0; display: flex; gap: var(--sp-3); flex-wrap: wrap; font-size: var(--fs-xs); }
</style>
```

`SourceList.astro`:

```astro
---
interface Source { title: string; url: string; accessed: string; }
interface Props { sources: Source[]; }
const { sources } = Astro.props;
---
<aside class="sources" aria-label="Sources">
  <h3 class="sl-h">Sources</h3>
  <ol class="sl-list">
    {sources.map((s) => (
      <li>
        <cite><a href={s.url} rel="noopener">{s.title}</a></cite>
        <span class="sl-accessed">accessed <time datetime={s.accessed}>{s.accessed}</time></span>
      </li>
    ))}
  </ol>
</aside>

<style>
.sources { margin-top: var(--sp-8); padding-top: var(--sp-4); border-top: 1px solid var(--border); }
.sl-h { font-size: var(--fs-lg); margin: 0 0 var(--sp-2); }
.sl-list { font-size: var(--fs-sm); color: var(--fg-muted); padding-left: var(--sp-6); }
.sl-list li { margin-bottom: var(--sp-2); }
.sl-accessed { display: inline; margin-left: var(--sp-2); font-style: italic; color: var(--paper-500); }
</style>
```

- [ ] **Step 4: Implement schema components**

`HowToSchema.astro`:

```astro
---
interface Step { name: string; text: string; }
interface Props { name: string; steps: Step[]; }
const { name, steps } = Astro.props;
---
<script type="application/ld+json" set:html={JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name,
  step: steps.map((s, i) => ({
    '@type': 'HowToStep',
    position: i + 1,
    name: s.name,
    text: s.text
  }))
})} />
```

`FAQPageSchema.astro`:

```astro
---
interface QA { q: string; a: string; }
interface Props { faq: QA[]; }
const { faq } = Astro.props;
---
<script type="application/ld+json" set:html={JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faq.map((qa) => ({
    '@type': 'Question',
    name: qa.q,
    acceptedAnswer: { '@type': 'Answer', text: qa.a }
  }))
})} />
```

`SoftwareApplicationSchema.astro`:

```astro
---
interface Props { name: string; }
const { name } = Astro.props;
---
<script type="application/ld+json" set:html={JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name,
  applicationCategory: 'UtilitiesApplication',
  operatingSystem: 'Any',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' }
})} />
```

- [ ] **Step 5: Implement `src/layouts/SeedLayout.astro`**

```astro
---
import BaseLayout from '@/layouts/BaseLayout.astro';
import Breadcrumb from '@/components/ui/Breadcrumb.astro';
import BreadcrumbSchema from '@/components/schema/BreadcrumbSchema.astro';
import HowToSchema from '@/components/schema/HowToSchema.astro';
import FAQPageSchema from '@/components/schema/FAQPageSchema.astro';
import SoftwareApplicationSchema from '@/components/schema/SoftwareApplicationSchema.astro';
import DefinitionalLede from '@/components/content/DefinitionalLede.astro';
import DownloadBlock from '@/components/content/DownloadBlock.astro';
import AuthorBox from '@/components/content/AuthorBox.astro';
import SourceList from '@/components/content/SourceList.astro';
import { TemplateBuilder } from '@/components/builders/TemplateBuilder';
import { NODE_LABELS } from '@/lib/site';
import '@/styles/builder.css';
import type { CollectionEntry } from 'astro:content';

interface Props { entry: CollectionEntry<'seeds'>; }
const { entry } = Astro.props;
const data = entry.data;

const crumbs = [
  { name: 'Home', href: '/' },
  { name: NODE_LABELS[data.node], href: `/${data.node}/` },
  { name: data.h1, href: `/${entry.slug}/` }
];

const { Content } = await entry.render();
---
<BaseLayout
  title={data.title}
  description={data.definitionalLede}
  modifiedTime={data.updated}>
  <BreadcrumbSchema slot="head" crumbs={crumbs} />
  <HowToSchema slot="head" name={data.howTo.name} steps={data.howTo.steps} />
  <FAQPageSchema slot="head" faq={data.faq} />
  <SoftwareApplicationSchema slot="head" name={data.title} />

  <div class="container">
    <Breadcrumb crumbs={crumbs} />
    <header class="seed-hero">
      <h1>{data.h1}</h1>
      <DefinitionalLede lede={data.definitionalLede} />
    </header>

    <section class="builder-section">
      <h2>Build your {data.h1.toLowerCase()}</h2>
      <TemplateBuilder client:visible schema={data.builderSchema} filenameStem={entry.slug} />
    </section>

    <DownloadBlock title={data.h1} pdfUrl={`/downloads/${entry.slug}.pdf`} docxUrl={`/downloads/${entry.slug}.docx`} />

    <article class="prose">
      <Content />
    </article>

    <section class="faq" aria-label="Frequently asked questions">
      <h2>Frequently asked questions</h2>
      {data.faq.map((qa) => (
        <details class="faq-item">
          <summary>{qa.q}</summary>
          <p>{qa.a}</p>
        </details>
      ))}
    </section>

    <SourceList sources={data.sources} />
    <AuthorBox />
  </div>
</BaseLayout>

<style>
.seed-hero { padding: var(--sp-8) 0 var(--sp-4); }
.seed-hero h1 { font-size: var(--fs-3xl); margin: 0 0 var(--sp-3); }
.builder-section { margin: var(--sp-8) 0; }
.builder-section h2 { font-size: var(--fs-xl); }
.prose { max-width: var(--content-max); padding: var(--sp-8) 0; font-size: var(--fs-base); }
.prose :global(h2) { font-size: var(--fs-2xl); margin-top: var(--sp-12); }
.prose :global(h3) { font-size: var(--fs-xl); margin-top: var(--sp-8); }
.prose :global(p), .prose :global(li) { font-size: var(--fs-base); }
.faq { margin: var(--sp-12) 0; }
.faq h2 { font-size: var(--fs-2xl); }
.faq-item {
  padding: var(--sp-3) 0;
  border-bottom: 1px solid var(--border);
}
.faq-item summary {
  cursor: pointer; font-weight: 600;
  font-family: var(--font-display); font-size: var(--fs-lg);
}
.faq-item p { margin-top: var(--sp-2); color: var(--fg-muted); }
</style>
```

- [ ] **Step 6: Implement `src/pages/[seed].astro`**

```astro
---
import { getCollection, type CollectionEntry } from 'astro:content';
import SeedLayout from '@/layouts/SeedLayout.astro';

export async function getStaticPaths() {
  const entries = await getCollection('seeds');
  return entries.map((entry: CollectionEntry<'seeds'>) => ({
    params: { seed: entry.slug },
    props: { entry }
  }));
}

interface Props { entry: CollectionEntry<'seeds'>; }
const { entry } = Astro.props;
---
<SeedLayout entry={entry} />
```

- [ ] **Step 7: Build, expect /bill-of-sale/ to render**

Run: `cd /c/Users/sunny/repos/template-how && SKIP_LINK_GRAPH=1 npm run build`
Expected: `dist/bill-of-sale/index.html` exists, contains the H1 and the builder shell markup.

Verify: `grep -q "Bill of Sale Template" dist/bill-of-sale/index.html && echo OK`

- [ ] **Step 8: Commit**

```bash
git add src/content/ src/components/ src/layouts/SeedLayout.astro src/pages/'[seed].astro'
git commit -m "feat(seed): bill-of-sale end-to-end — schema extension, content, layout, route"
```

---

## Task 14: End-to-end Playwright test

**Files:**
- Create: `tests/e2e/builder-bill-of-sale.spec.ts`

- [ ] **Step 1: Implement**

```ts
import { test, expect } from '@playwright/test';

test('bill-of-sale page renders with builder', async ({ page }) => {
  await page.goto('/bill-of-sale/');
  await expect(page.locator('h1')).toContainText('Bill of Sale Template');
  await expect(page.locator('[role="region"][aria-label*="builder"]')).toBeVisible();
});

test('builder reflects form input in preview', async ({ page }) => {
  await page.goto('/bill-of-sale/');
  await page.fill('input#seller_name', 'Sunny Patel');
  await page.fill('input#buyer_name', 'Alex Test');
  await expect(page.locator('.b-doc')).toContainText('Sunny Patel');
  await expect(page.locator('.b-doc')).toContainText('Alex Test');
});

test('vehicle conditional fields appear when item_type is vehicle', async ({ page }) => {
  await page.goto('/bill-of-sale/');
  await expect(page.locator('input#vin')).toHaveCount(0);
  await page.selectOption('select#item_type', 'vehicle');
  await expect(page.locator('input#vin')).toBeVisible();
});

test('PDF download triggers a file download', async ({ page }) => {
  await page.goto('/bill-of-sale/');
  await page.fill('input#seller_name', 'Sunny');
  const downloadPromise = page.waitForEvent('download');
  await page.click('button:has-text("Download PDF")');
  const download = await downloadPromise;
  expect(download.suggestedFilename()).toBe('bill-of-sale.pdf');
});

test('jurisdiction comparison table lists 54 jurisdictions', async ({ page }) => {
  await page.goto('/bill-of-sale/');
  const rows = page.locator('table.jt tbody tr');
  await expect(rows).toHaveCount(54);
});

test('FAQ accordion expands and emits FAQPage schema', async ({ page }) => {
  await page.goto('/bill-of-sale/');
  await expect(page.locator('details.faq-item').first()).toBeVisible();
  const ldjson = await page.locator('script[type="application/ld+json"]').allTextContents();
  expect(ldjson.some((j) => j.includes('FAQPage'))).toBe(true);
});
```

- [ ] **Step 2: Run e2e tests**

Run: `cd /c/Users/sunny/repos/template-how && npm run test:e2e`
Expected: 6 new tests pass; the 4 from Plan 1 still pass (10 total).

- [ ] **Step 3: Commit**

```bash
git add tests/e2e/builder-bill-of-sale.spec.ts
git commit -m "test(e2e): bill-of-sale builder smoke (6 tests)"
```

---

## Task 15: Pre-completion validation + deploy

**Files:**
- No new files.

- [ ] **Step 1: Full local pipeline**

Run, in order:
```bash
cd /c/Users/sunny/repos/template-how
npm run lint
npm run typecheck
npm test
SKIP_LINK_GRAPH=1 npm run build
npm run test:e2e
npm run lighthouse
```
All must exit 0.

- [ ] **Step 2: Manual visual check via dev server**

Run: `npm run dev` and open `http://localhost:4321/bill-of-sale/` in a browser. Verify:
- Page renders with brand identity intact
- Builder form is interactive
- Preview updates live as you type
- Vehicle conditional fields show/hide correctly with `item_type`
- PDF / DOCX downloads trigger and the file opens correctly in a viewer
- Jurisdiction table shows all 54 rows
- FAQ accordion works
- Lighthouse via Chrome DevTools shows Performance ≥95, A11y ≥95

If any check fails, fix and re-verify before committing.

- [ ] **Step 3: `pre-completion-validation` skill**

Per `feedback_pre_completion_validation.md`: invoke `/pre-completion-validation` against `/bill-of-sale/`. Must score ≥85 on `/semantic-audit` and pass the Playwright MCP browser check. If under 85, iterate on the body content (NOT the schema or builder) until it scores.

- [ ] **Step 4: Push and verify production**

```bash
git push origin main
```

CF Pages will auto-deploy. After ~3 minutes:

Run: `curl -I https://template.how/bill-of-sale/`
Expected: `HTTP/2 200`.

Verify the page contains the H1 and builder markup:
```bash
curl -s https://template.how/bill-of-sale/ | grep -E "(Bill of Sale Template|b-shell)" | head
```

- [ ] **Step 5: Update memory**

Append a new line to `MEMORY.md` topic-files index:

```
- [template-how-plan2-apr23.md](template-how-plan2-apr23.md) — Plan 2 LIVE: builder + 54-jurisdiction data layer + /bill-of-sale/ end-to-end. PDF/DOCX/Copy/Print export working. Next: Plan 3 (80 SEEDs).
```

Create `template-how-plan2-apr23.md` with: scope, files added, deltas vs Plan 1, known issues for Plan 3.

---

## Self-Review (completed inline)

**1. Spec coverage check:**

| Spec section | Task(s) |
|---|---|
| §5 SEED page model (full skeleton) | Task 13 (SeedLayout) |
| §6.1-6.3 BuilderSchema + renderer set | Task 3, Task 13 step 2 |
| §6.4 Field types | Task 9 |
| §6.5 Conditional logic | Task 4 (expression) + Task 7 (filter) |
| §6.6 Export pipeline (PDF/DOCX/HTML/Print) | Task 8a-d, Task 10 BuilderExports |
| §6.7 UX (localStorage state, no account) | Task 5 |
| §7.1 Data file layout | Task 6 |
| §7.2 Per-jurisdiction shape | Task 6 |
| §7.3 Data feeds page (auto comparison table) | Task 13 step 3 (JurisdictionTable) |
| §11.3 Unique micro-details per page | Task 13 step 2 (instructed) |
| §11.5 Build-time gates | Task 15 (uses Plan-1 validators) |

Gaps deferred to Plan 3: variants (per-jurisdiction sub-SEED pages — needs the `[seed]/[variant].astro` route), `googleDocsCopy` URL wiring per template, OG image auto-gen for SEED pages, the remaining 79 SEED pages.

**2. Placeholder scan:** none — every step has real code or exact instructions. The bill-of-sale body content in Task 13 step 2 is intentionally an instruction-to-implementer rather than verbatim text, because it must be drafted-then-edited per the spec's anti-AI-slop rule. The skeleton frontmatter is verbatim.

**3. Type consistency:**
- `BuilderState` defined in Task 5, used in Task 7, Task 10, Task 11. Same import path.
- `DocumentTree` defined in Task 7, consumed in Task 8 (all 4 sub-tasks) and Task 10. Same shape.
- `BuilderSchema` defined in Task 3, used in Task 7, Task 11, Task 13. Same import.
- `Jurisdiction` defined in Task 6, consumed in Task 9 (SelectField) and Task 13 (JurisdictionTable). Same shape.

---

## Execution Handoff

Plan 2 saved to `docs/superpowers/plans/2026-04-23-plan-2-builder-data-layer.md`. Two execution options:

1. **Subagent-Driven (recommended)** — fresh subagent per task with checkpoints
2. **Inline Execution** — execute tasks in this session

Which approach?
