export default class Component {
  #props;
  #element;
  #state;

  constructor(props) {
    this.#props = props;
    this.#state = {};
  }

  render() {
    if (!this.#element) this.#element = document.createElement('div');

    this.#element.innerHTML = this.template();
    this.onRender();

    return this.#element;
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
