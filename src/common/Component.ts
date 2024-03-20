export default class Component<T extends HTMLElement, K> {
  $target;
  state: any;
  props;
  constructor($target: T, props?: K) {
    this.$target = $target;
    this.props = props;
    this.setup();
    this.initialize();
  }

  initialize() {
    if (!this.$target) return;
    this.$target.innerHTML = this.render();
    this.setEvents();
  }

  componentDidUpdate() {
    if (!this.$target) return;
    this.$target.innerHTML = this.render();
    this.setEvents();
  }

  setup() {}

  render() {
    return ``;
  }
  setEvents() {}

  setState(newState: unknown) {
    this.state = newState;
    this.componentDidUpdate();
  }
}
