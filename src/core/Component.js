class Component {
  #element;
  #state;
  #props;
  #tagName;
  #className;

  constructor(props, parent, tagName = 'div', className = '') {
    this.#props = props;
    this.parent = parent;
    this.#state = {};
    this.#tagName = tagName;
    this.#className = className;

    this.setup();
    this.render();
  }

  setup() {}

  render() {
    if (!this.#element) this.#element = document.createElement(this.#tagName);
    if (this.#className) this.#element.classList.add(this.#className);

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
