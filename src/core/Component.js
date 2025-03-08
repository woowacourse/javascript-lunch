export default class Component {
  #isRendered;

  #props;
  #element;
  #state;

  constructor(props) {
    this.#isRendered = false;

    this.#props = props;
    this.#state = {};
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

  setState(nextState, shouldRender = true) {
    this.#state = { ...this.#state, ...nextState };
    if (shouldRender) this.render();
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
