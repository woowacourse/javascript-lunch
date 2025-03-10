export default abstract class Component<State = Record<string, any>, Props = Record<string, any>> {
  #isRendered = false;
  state = {} as State;

  #props: Props | null;
  #element: HTMLElement = document.createElement('div');

  constructor(props?: Props) {
    this.#props = props ?? null;
  }

  render() {
    this.#element.innerHTML = this.template();
    this.onRender();

    if (!this.#isRendered) {
      this.componentDidMount();
      this.#isRendered = true;
    }

    return this.#element;
  }

  setState(nextState: Partial<State>) {
    this.state = { ...this.state, ...nextState };
    this.render();
  }

  abstract template(): string;

  componentDidMount() {}

  onRender() {}

  appendChild(element: HTMLElement, selector?: string) {
    if (selector) this.element.querySelector(selector)?.appendChild(element);
    else this.element.appendChild(element);
  }

  get element() {
    return this.#element;
  }

  get props() {
    return this.#props;
  }
}
