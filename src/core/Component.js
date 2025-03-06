class Component {
  #element;

  constructor(props) {
    this.props = props;

    this.render();
    this.onRender();
  }

  render() {
    this.#element = document.createElement("div");
    this.#element.innerHTML = this.template();

    return this.#element;
  }

  template() {}

  onRender() {}

  get element() {
    return this.#element;
  }
}
export default Component;
