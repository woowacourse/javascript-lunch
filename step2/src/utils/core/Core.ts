import { UnPack } from '../../types/common';
import { debounce } from '../@common/debounce';

export interface Dispatch<T> {
  (value: T): void;
}

interface Options<T = unknown> {
  currentStateKey: number;
  renderCount: number;
  states: T[];
  root: null | Element;
  rootComponent: null | (() => string);
}

function Core() {
  const options: Options<UnPack<Parameters<typeof useState>>> = {
    currentStateKey: 0,
    renderCount: 0,
    states: [],
    root: null,
    rootComponent: null,
  };

  function useState<S = undefined>(initialState?: S): [S, Dispatch<S>];
  function useState<S>(initialState?: S): [unknown, Dispatch<S>] {
    const { currentStateKey: key, states } = options;
    if (states.length === key) states.push(initialState);

    const state = states[key];

    const setState = (newState: S) => {
      if (newState === state) return;

      states[key] = newState;
      _render();
    };
    options.currentStateKey += 1;

    return [state, setState];
  }

  const _render = debounce(() => {
    const { root, rootComponent } = options;
    if (!root || !rootComponent) return;
    root.innerHTML = rootComponent();
    options.currentStateKey = 0;
    options.renderCount += 1;
  });

  function render(
    rootComponent: Options['rootComponent'],
    root: Options['root']
  ) {
    options.root = root;
    options.rootComponent = rootComponent;
    _render();
  }

  return { useState, render };
}

export const { useState, render } = Core();
