export default class Component {
  $target: HTMLElement;

  constructor(target: HTMLElement) {
    this.$target = target;

    return this;
  }

  render(): this {
    this.$target.innerHTML = this.template();

    return this;
  }

  hide(): this {
    this.$target.innerHTML = '';

    return this;
  }

  setEvent(): this {
    return this;
  }

  template() {
    return '';
  }
}
