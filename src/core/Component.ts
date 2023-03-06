export default class Component {
  $target: HTMLElement | Element;

  constructor(target: HTMLElement | Element) {
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

  template(): string {
    return '';
  }
}
