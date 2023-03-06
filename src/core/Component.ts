export default class Component {
  $target: HTMLElement | Element;

  constructor(target: HTMLElement | Element) {
    this.$target = target;

    return this;
  }

  render() {
    this.$target.innerHTML = this.template();

    return this;
  }

  hide() {
    this.$target.innerHTML = '';

    return this;
  }

  setEvent() {}

  template(): string {
    return '';
  }
}
