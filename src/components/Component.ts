class Component extends HTMLElement {
  connectedCallback(): void {
    if (this.isConnected) {
      this.render();
    }
  }

  disconnectedCallback(): void {
    this.removeEvent();
  }

  render(): void {
    this.innerHTML = this.template();
    this.setEvent();
  }

  setEvent(): void {}

  removeEvent(): void {}

  makeEvent(name: string): void {
    this.dispatchEvent(new Event(name, { bubbles: true }));
  }

  makeCustomEvent(name: string): void {
    this.dispatchEvent(new CustomEvent(name, { bubbles: true }));
  }

  template(): string {
    return ``;
  }
}

export default Component;
