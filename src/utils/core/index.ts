import { debounce } from '../common/debounce';

interface Event {
  $parent: string;
  $target: string;
  event: keyof HTMLElementEventMap;
  callback: (this: Element, e: HTMLElementEventMap[Event['event']]) => void;
}
interface Options<T = unknown> {
  currentEventKey: number;
  currentStateKey: number;
  states: T[];
  events: Event[];
  root: null | HTMLElement;
  rootComponent: null | (() => string);
}

type Dispatch<T> = (value: T) => void;
type UnPack<T> = T extends (infer U)[] ? U : T;

function Core() {
  const options: Options<UnPack<Parameters<typeof useState>>> = {
    currentEventKey: 0,
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
    options.currentEventKey = 0;
  });

  const $ = (t: string) => document.querySelector(t);
  const $$ = (selector: string, target: ParentNode | null = document) =>
    target ? target.querySelectorAll(selector) : target;

  function useEvents($parent: string) {
    function addEvent(
      event: Event['event'],
      $target: Event['$target'],
      callback: Event['callback']
    ) {
      const { currentEventKey: key, events } = options;

      if (events.length === key) {
        events.push({ event, $target, $parent, callback });
        options.currentEventKey += 1;
      }
    }

    return [addEvent];
  }

  function render(rootComponent: Options['rootComponent'], root: Options['root']) {
    options.root = root;
    options.rootComponent = rootComponent;
    _render();
  }

  function _addEvent() {
    options.events.forEach(({ $parent, $target, event, callback }) => {
      const children = $$($target, $($parent));
      const isTarget = (target: EventTarget | null) => {
        if (target instanceof Element && children) {
          return [...children].includes(target) || target.closest($target);
        }

        return false;
      };

      $($parent)?.addEventListener(event, (e) => {
        const parent = $($parent);
        if (isTarget(e.target) && parent) callback.call(parent, e);
      });
    });
  }

  return { useState, useEvents, render };
}

export const { useState, useEvents, render } = Core();
