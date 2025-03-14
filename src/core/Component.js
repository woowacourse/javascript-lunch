class Component {
  #element;
  #state;
  #props;

  constructor(props, parent) {
    this.#props = props;
    this.parent = parent;
    this.#state = {};

    this.setup();
    this.render();
  }

  setup() {}

  render() {
    if (!this.#element) this.#element = document.createElement("div");

    this.#element.innerHTML = this.template();
    this.onRender();
  }

  setState(nextState) {
    this.#state = nextState;

    this.render();
  }

  template() {
    return ``;
  }

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

export default Component;
