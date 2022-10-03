import { useEffect, useState, Dispatch, SetStateAction } from 'react';

export type Store = {
  count1: number;
  count2: number;
};

type Listener = Dispatch<SetStateAction<Store>>;

export const createStore = (initialState: Store) => {
  // Store state
  let currentState = initialState;
  // create a list of listeners
  const listeners = new Set<Listener>();

  return {
    getState: () => currentState,
    setState: (newState: Store) => {
      // TODO: check if newState is different from currentState
      currentState = newState;
      // notify all listeners
      listeners.forEach((listener) => listener(currentState));
    },
    subscribe: (listener: Listener): (() => void) => {
      // Add listener to listeners
      listeners.add(listener);
      // return unsubscribe to allow immediate removal of listener
      return () => listeners.delete(listener);
    },
    unsubscribe: () => listeners.clear(),
  };
};

export const store = createStore({ count1: 0, count2: 0 });

// INNEFICIENT STORE
export const useInneficientStore = () => {
  const [state, setState] = useState(store.getState());

  // we do a subscribe and get ALL of the state
  // and then we are setting the state to that new object
  // and that is forcing a re-render.
  useEffect(() => store.subscribe(setState), []);
  // we want to be more surgical about this, and not trigger a re-render
  // on every subscription, so we want to use a selector.
  return state;
};

// EFFICIENT STORE
export const useEfficientStore = (
  selector = (state: Store) => state.count1 | state.count2
) => {
  const [state, setState] = useState(selector(store.getState()));

  // we do a subscribe and get ALL of the state
  // and then we are setting the state to that new object
  // and that is forcing a re-render.
  useEffect(
    () => store.subscribe((state) => setState(selector(state as Store))),
    []
  );
  // we want to be more surgical about this, and not trigger a re-render
  // on every subscription, so we want to use a selector.
  return state;
};
