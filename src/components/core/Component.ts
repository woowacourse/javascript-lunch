class Component extends HTMLElement {
  connectedCallback(): void {
    if (this.isConnected) {
      this.render();
    }
  }

  render(): void {
    this.innerHTML = this.template();
    this.setEvent();
  }

  setEvent(): void {}

  makeCustomEvent(name: string): void {
    this.dispatchEvent(new CustomEvent(name, { bubbles: true }));
  }

  template(): string {
    return '';
  }
}

export default Component;
