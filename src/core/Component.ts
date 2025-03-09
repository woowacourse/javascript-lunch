export default class Component<T = Record<string, any>> {
  #isRendered = false;
  #state = {} as T;

  #props: Record<string, any>;
  #element: HTMLElement = document.createElement('div');

  constructor(props?: Record<string, any>) {
    this.#props = props ?? {};
  }

  render() {
    if (!this.#element) this.#element = document.createElement('div');

    this.#element.innerHTML = this.template();
    this.onRender();

    if (!this.#isRendered) {
      this.componentDidMount();
      this.#isRendered = true;
    }

    return this.#element;
  }

  setState(nextState: Record<string, any>) {
    this.#state = { ...this.#state, ...nextState };
    this.render();
  }

  template() {
    return ``;
  }

  componentDidMount() {}

  onRender() {}

  get element() {
    return this.#element;
  }

  get props() {
    return this.#props;
  }

  get state() {
    return this.#state;
  }
}
