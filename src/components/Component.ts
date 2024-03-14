class Component extends HTMLElement {
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

  reRender(): void {}

  setEvent(): void {}

  removeEvent(): void {}

  makeCustomEvent(name: string): void {
    this.dispatchEvent(new CustomEvent(name, { bubbles: true }));
  }

  template(): string {
    return ``;
  }
}

export default Component;
