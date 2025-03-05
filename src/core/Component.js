class Component {
  constructor(props) {
    this.props = props;

    this.render();
  }

  render() {
    const element = document.createElement("div");
    element.innerHTML = this.template();
    return element;
  }

  template() {}
}
export default Component;
