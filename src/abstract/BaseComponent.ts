export default abstract class BaseComponent extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  protected render() {
    this.innerHTML = this.getTemplate();
  }

  protected abstract getTemplate(): string;
}
