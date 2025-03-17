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
  addChild(ComponentClass, props = {}) {
    const component = new ComponentClass();
    component.setProps(props);
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
