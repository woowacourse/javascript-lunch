export default class Component {
  $target: HTMLElement;
  #display: string;

  constructor(target: HTMLElement) {
    this.$target = target;
    this.#display = this.$target.style.display;

    return this;
  }

  render(detail?: any): this {
    this.$target.innerHTML = this.template();

    return this;
  }

  hide(toggle: boolean = true): this {
    this.$target.style.display = toggle ? 'none' : this.#display;

    return this;
  }

  setEvent(): this {
    return this;
  }

  template(detail?: any) {
    return '';
  }
}
