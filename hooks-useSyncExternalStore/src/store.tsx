import { useSyncExternalStore } from 'react';

export type Store = {
  count1: number;
  count2: number;
};

export default function createStore<Shape>(initialState: Shape) {
  let currentState = initialState;
  const listeners = new Set<(state: Shape) => void>();

  const subscribe = (listener: (state: Shape) => void) => {
    listeners.add(listener);
    return () => listeners.delete(listener);
  };
  const setState = (newState: Shape) => {
    currentState = newState;
    listeners.forEach((listener) => listener(currentState));
  };

  return {
    getState: () => currentState,
    setState,
    subscribe,
  };
}

export const store = createStore({ count1: 0, count2: 0 });
export type ValuesStore = ReturnType<typeof store.getState>;

export const useStore = (selector: (state: ValuesStore) => number) =>
  useSyncExternalStore(store.subscribe, () => selector(store.getState()));
