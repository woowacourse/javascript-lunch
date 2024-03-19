class Component extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback(): void {
    if (this.isConnected) {
      this.render();
      this.setEvent();
    }
  }

  disconnectedCallback(): void {
    this.removeEvent();
  }

  render(): void {
    this.innerHTML = this.template();
  }

  setEvent(): void {}

  removeEvent(): void {}

  makeCustomEvent(name: string, detail?: IRestaurant): boolean {
    return this.dispatchEvent(new CustomEvent(name, { bubbles: true, detail: detail }));
  }

  template(): string {
    return ``;
  }
}

export default Component;
