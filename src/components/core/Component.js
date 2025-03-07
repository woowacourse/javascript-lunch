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

  render() {
    this.$target.insertAdjacentHTML("afterbegin", this.template());
  }

  initialRender() {
    this.render();
    this.componentDidMount();
  }

  componentDidMount() {}
  componentDidUpdate() {}

  setState(newState) {
    this.state = { ...this.state, ...newState };

    this.componentDidUpdate();
  }

  template() {
    return "";
  }
}

export default Component;
