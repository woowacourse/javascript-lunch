export default class Component {
  $target;

  constructor($target) {
    this.$target = $target;

    this.render();
  }

  addEvent(eventType, callback) {
    this.$target.addEventListener(eventType, callback);

    return this;
  }

  template() {
    return '';
  }

  render() {
    this.template() && (this.$target.innerHTML = this.template());
  }
}
