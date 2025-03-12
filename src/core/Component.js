export default class Component {
  props;
  state;
  children;

  constructor(props) {
    this.props = props;
    this.children = [];
    this.setDefaultProps();
    this.initState();
    this.setEvent();
  }

  initState() {
    this.state = {};
  }

  addChild(Component, ...args) {
    const component = new Component(...args);
    this.children.push(component);
    return component;
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

  render(props, targetElement = "#app") {
    if (props) this.setProps(props);
    const container = document.querySelector(targetElement);
    container.innerHTML = this.template(this.props);
    return container;
  }
}
