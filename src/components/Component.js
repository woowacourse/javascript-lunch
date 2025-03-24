class Component {
  $target;
  state;

  constructor($target, props) {
    this.$target = $target;
    this.props = props;
    this.state = this.initState();
    this.render();
  }
  initState() {}
  template() {
    return "";
  }

  render() {
    this.$target.innerHTML = this.template();
    this.setEvent();
  }

  setEvent() {}

  setState(newState) {
    this.state = { ...this.state, ...newState };
    this.render();
  }
}

export default Component;
