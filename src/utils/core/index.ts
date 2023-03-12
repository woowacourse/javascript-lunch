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
interface Options<T = unknown> {
  currentStateKey: number;
  states: T[];
  events: Event[];
  root: null | Element;
  rootComponent: null | (() => string);
}

type Dispatch<T> = (value: T) => void;

function Core() {
  const options: Options<UnPack<Parameters<typeof useState>>> = {
    currentStateKey: 0,
    states: [],
    events: [],
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

  return { useState, useEvents, render };
}

export const { useState, useEvents, render } = Core();
