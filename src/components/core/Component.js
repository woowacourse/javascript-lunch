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

  updateView() {
    this.$target.insertAdjacentHTML("afterbegin", this.template());
  }

  initialRender() {
    this.updateView();
    this.componentDidMount();
  }

  componentDidMount() {}
  componentDidUpdate() {}

  setState(newState) {
    this.state = { ...this.state, ...newState };
  }

  template() {
    return "";
  }
}

export default Component;
