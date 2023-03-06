interface InitParams<Props, State> {
  $parent: DocumentFragment | HTMLElement;
  tagName: string;
  props: Props;
  initialState: State;
}

class Component<Props extends Object, State extends Object> {
  $wrapper: HTMLElement;
  props: Props;
  state: State;

  constructor({ $parent, props, tagName, initialState }: InitParams<Props, State>) {
    this.$wrapper = document.createElement(tagName);
    this.props = props;
    this.state = initialState;
    this.render();
    $parent.append(this.$wrapper);
  }

  $(selectors: string) {
    return this.$wrapper.querySelector(selectors);
  }

  setState(newState: State) {
    if (JSON.stringify(this.state) === JSON.stringify(newState)) return;
    this.state = newState;
    this.render();
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
