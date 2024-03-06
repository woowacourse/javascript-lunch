export default abstract class BaseComponent extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  protected render() {
    this.insertAdjacentHTML("afterbegin", this.getTemplate());
  }

  protected abstract getTemplate(): string;
}
