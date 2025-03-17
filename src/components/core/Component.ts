import type { HTMLType, StrictObject } from 'src/lib/types';
import { html } from '../../lib/utils.ts';

export default abstract class Component<
  Props extends StrictObject | null = {},
  State extends StrictObject | null = {},
> {
  state = {} as State;

  #props: Props;
  #element: HTMLElement | null = null;

  constructor(props?: Props) {
    this.#props = (props ?? {}) as Props;
    this.setup();

    this.render();
    this.addEventListener();
  }

  setup() {}

  render() {
    const element = document.createElement('div');
    element.innerHTML = this.template();

    const elementFirstChild = element.firstElementChild as HTMLElement;

    if (!this.#element) this.#element = elementFirstChild;
    else this.#element.innerHTML = elementFirstChild.innerHTML;

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
    return html`<div></div>`;
  }

  addEventListener() {}

  onRender() {}

  get element() {
    return this.#element!;
  }

  get props() {
    return this.#props;
  }
}
