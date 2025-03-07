class Component {
  $target;
  props;
  state = {};

  constructor($target, props) {
    this.$target = $target;
    this.props = props;

    this.setup();
    this.initialRender();
  }

  setup() {}
  initialRender() {
    this.$target.insertAdjacentHTML("afterbegin", this.template());
    this.componentDidMount();
  }

  componentDidMount() {}
  componentDidUpdate() {}
  componentWillUnmount() {}

  setState(newState) {
    this.state = { ...this.state, ...newState };

    this.componentDidUpdate();
  }

  template() {
    return "";
  }

  destroy() {
    this.componentWillUnmount();
    this.$target.replaceChildren();
  }
}

export default Component;
