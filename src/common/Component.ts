export default class Component {
  $target;
  state: any;
  props;
  constructor($target: Element | null, props?: any) {
    this.$target = $target;
    this.props = props;
    this.setup();
    this.initialize();
  }

  initialize() {
    if (!this.$target) return;
    this.$target.innerHTML = this.render();
    this.componentDidMount();
  }

  setup() {}

  render() {
    return ``;
  }
  componentDidMount() {}

  setState(newState: unknown) {
    this.state = newState;
    this.initialize();
  }
}
