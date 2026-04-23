import { useCallback, useEffect, useRef, useState } from 'react';

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
  const skipSaveRef = useRef(false);

  useEffect(() => {
    if (skipSaveRef.current) {
      skipSaveRef.current = false;
      return;
    }
    save(slug, state);
  }, [slug, state]);

  const set = useCallback((id: string, value: BuilderState[string]) => {
    setState((prev) => ({ ...prev, [id]: value }));
  }, []);

  const reset = useCallback(() => {
    if (typeof window !== 'undefined') {
      window.localStorage.removeItem(storageKey(slug));
    }
    skipSaveRef.current = true;
    setState({});
  }, [slug]);

  return { state, set, reset };
};
