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
