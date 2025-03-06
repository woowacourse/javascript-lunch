class Component {
  #element;
  state;

  constructor(props, parent) {
    this.props = props;
    this.parent = parent;
    this.state = {};

    this.setup();
    this.render();
    this.onRender();
  }

  setup() {}

  render() {
    if (!this.#element) this.#element = document.createElement("div");

    this.#element.innerHTML = this.template();
  }

  setState(nextState) {
    this.state = nextState;

    this.render();
  }

  template() {
    return ``;
  }

  onRender() {}

  get element() {
    return this.#element;
  }
}

export default Component;
