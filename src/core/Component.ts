export default class Component {
  $target;
  props;
  state: any;

  constructor($target: Element, props: object) {
    this.$target = $target;
    this.props = props;
    this.state;
    this.setup();
    this.render();
    this.setEvent();
  }

  setup() {}

  mounted() {}

  template() {
    return "";
  }

  render() {
    this.$target.innerHTML = this.template();
    this.mounted();
  }

  setEvent() {}

  setState(newState: Object) {
    this.state = { ...this.state, ...newState };
    this.render();
  }

  addEvent(eventType: string, selector: string, callback: any) {
    this.$target.addEventListener(eventType, (event: Event) => {
      const target = event.target as HTMLSelectElement;
      if (!target.closest(selector)) return false;
      callback(event);
    });
  }
}
