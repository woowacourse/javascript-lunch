class Component {
  $target;
  state;

  constructor($target) {
    this.$target = $target;
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

  setState(newState) {
    this.state = { ...this.setState, ...newState };
    this.render();
  }
}

export default Component;
