import BaseComponent from "./BaseComponent";

export default abstract class EventComponent extends BaseComponent {
  connectedCallback() {
    this.render();
  }

  protected render() {
    super.render();
    this.setEvent();
  }

  protected abstract setEvent(): void;
}
