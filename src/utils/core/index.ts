import { debounce } from '../common/debounce';
import { $, isTarget } from '../../utils/common/domHelper';
import { UnPack } from '../../types/common';

export interface EventCallback {
  (e: HTMLElementEventMap[keyof HTMLElementEventMap]): void;
}
export interface Event {
  parentSelector: string;
  targetSelector: string;
  event: keyof HTMLElementEventMap;
  callback: EventCallback;
}

export interface Effect {
  callback(): unknown;
  deps: unknown[];
}

interface Options<T = unknown> {
  currentStateKey: number;
  currentEffectsKey: number;
  states: T[];
  events: Event[];
  effects: Effect[];
  root: null | Element;
  rootComponent: null | (() => string);
}

interface Dispatch<T> {
  (value: T): void;
}

function Core() {
  const options: Options<UnPack<Parameters<typeof useState>>> = {
    currentStateKey: 0,
    currentEffectsKey: 0,
    states: [],
    events: [],
    effects: [],
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

  const useEffect = (callback: Effect['callback'], deps: Effect['deps']) => {
    const { currentEffectsKey: key, effects } = options;
    if (effects.length === key) {
      effects.push({ deps, callback });
      callback();
    }

    if (JSON.stringify(effects[key].deps) !== JSON.stringify(deps)) {
      callback();
      effects[key] = { deps, callback };
    }

    options.currentEffectsKey += 1;
  };

  const _render = debounce(() => {
    const { root, rootComponent } = options;
    if (!root || !rootComponent) return;
    root.innerHTML = rootComponent();
    options.currentStateKey = 0;
    options.currentEffectsKey = 0;

    _addEvent();

    options.events = [];
  });

  function render(rootComponent: Options['rootComponent'], root: Options['root']) {
    options.root = root;
    options.rootComponent = rootComponent;
    _render();
  }

  function useEvents(parentSelector: string) {
    function addEvent(
      event: Event['event'],
      targetSelector: Event['targetSelector'],
      callback: Event['callback']
    ) {
      const { events } = options;

      events.push({ event, targetSelector, parentSelector, callback });
    }

    return [addEvent];
  }

  function _addEvent() {
    options.events.forEach(({ parentSelector, targetSelector, event, callback }) => {
      $(parentSelector)?.addEventListener(event, (e) => {
        const $parent = $(parentSelector);

        if (isTarget(e.target, { targetSelector, parentSelector }) && $parent) callback(e);
      });
    });
  }

  return { useState, useEvents, useEffect, render };
}

export const { useState, useEvents, useEffect, render } = Core();
