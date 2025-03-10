class Component {
  $target;
  state;

  constructor($target, props) {
    this.$target = $target;
    this.props = props;
    this.setup();
    this.render();
  }
  setup() {}
  template() {
    return "";
  }

  render() {
    this.$target.innerHTML = this.template();
    this.setEvent();
  }

  setEvent() {}
}

export default Component;
