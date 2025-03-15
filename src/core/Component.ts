import type { HTMLType } from 'src/lib/types';
import { html } from '../lib/utils.ts';

export default abstract class Component<State = Record<string, any>, Props = Record<string, any>> {
  state = {} as State;

  #props: Props | null;
  #element: HTMLElement = document.createElement('div');

  constructor(props?: Props) {
    this.#props = props ?? null;
    this.setup();

    this.render();
    this.attachEventListener();
  }

  setup() {}

  render() {
    this.#element.innerHTML = this.template();
    this.onRender();

    return this.#element;
  }

  setState(nextState: Partial<State>) {
    this.state = { ...this.state, ...nextState };
    this.render();
  }

  appendChild(element: HTMLElement, selector?: string) {
    if (selector) this.element.querySelector(selector)?.appendChild(element);
    else this.element.appendChild(element);
  }

  template(): HTMLType {
    return html``;
  }

  attachEventListener() {}

  onRender() {}

  get element() {
    return this.#element;
  }

  get props() {
    return this.#props;
  }
}
