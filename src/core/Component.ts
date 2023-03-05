export default class Component {
  $target;

  constructor(target: Element) {
    this.$target = target;
  
    return this;
  }

  render() {
    this.$target.innerHTML = this.template();
    
    return this;
  }

  hide() {
    this.$target.innerHTML = '';

    return this;
  }

  setEvent() {}

  template(): string {
    return '';
  }
}
