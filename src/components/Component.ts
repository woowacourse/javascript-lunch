interface InitParams {
  $parent: DocumentFragment | HTMLElement;
  tagName: string;
  className: string;
}

class Component {
  $wrapper: HTMLElement;

  constructor({ $parent, tagName, className }: InitParams) {
    this.$wrapper = document.createElement(tagName);
    this.$wrapper.className = className;
    $parent.append(this.$wrapper);
  }

  $(selectors: string) {
    return this.$wrapper.querySelector(selectors);
  }

  render() {
    this.$wrapper.innerHTML = this.drawInnerHTML();
    this.addEvent();
    this.appendChild();
  }

  drawInnerHTML(): string {
    return '';
  }

  addEvent() {}

  appendChild() {}
}

export default Component;
