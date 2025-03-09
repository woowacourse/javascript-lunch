export default class Component<State = Record<string, any>, Props = Record<string, any>> {
  #isRendered = false;
  #state = {} as State;

  #props: Props;
  #element: HTMLElement = document.createElement('div');

  constructor(props: Props) {
    this.#props = props;
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
