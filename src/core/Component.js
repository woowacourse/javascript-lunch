export default class Component {
  props;
  state;

  constructor(props) {
    this.props = props;
    this.initState();
    this.setEvent();
    this.setDefaultProps();
  }

  initState() {
    this.state = {};
  }

  template() {
    return "";
  }

  setEvent() {}

  setDefaultProps() {
    this.props = {};
  }

  setProps(newProps) {
    this.props = {
      ...this.props,
      ...newProps,
    };
  }

  setState(newState) {
    this.state = {
      ...this.state,
      ...newState,
    };
    this.render();
  }

  render(props) {
    if (props) this.setProps(props);
    const container = document.querySelector("#app");
    container.innerHTML = this.template(this.props);
    return container;
  }
}
