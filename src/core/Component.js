class Component {
  #element;
  state;

  constructor(props) {
    this.props = props;
    this.state = {};

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
