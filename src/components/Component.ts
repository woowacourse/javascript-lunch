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

  setEvent(): void {}

  removeEvent(): void {}

  makeCustomEvent(name: string): void {
    this.dispatchEvent(new CustomEvent(name, { bubbles: true }));
  }

  template(): string {
    return ``;
  }

  $(selector: string) {
    const element = this.querySelector(selector);

    if (!element) {
      throw new Error('[ERROR]');
    }

    return element;
  }

  $$(selector: string) {
    const element = this.querySelectorAll(selector);

    if (!element) {
      throw new Error('[ERROR]');
    }

    return element;
  }

  $setAttribute(selector: string, key: string, value: string) {
    const element = document.querySelector(selector);

    if (!element) {
      throw new Error('[ERROR]');
    }

    return element.setAttribute(key, value);
  }

  $addEvent(selector: string, type: string, listener: EventListenerOrEventListenerObject) {
    const element = document.querySelector(selector);

    if (!element) {
      throw new Error('[ERROR]');
    }

    return element.addEventListener(type, listener);
  }

  $removeEvent(selector: string, type: string, listener: EventListenerOrEventListenerObject) {
    const element = document.querySelector(selector);

    if (!element) {
      throw new Error('[ERROR]');
    }

    return element.removeEventListener(type, listener);
  }
}

export default Component;
