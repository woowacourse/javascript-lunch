import BaseComponent from "./BaseComponent";

export default abstract class EventComponent extends BaseComponent {
  connectedCallback() {
    this.render();
  }

  protected disconnectedCallback() {
    this.removeEvent();
  }

  protected render() {
    super.render();
    this.setEvent();
  }

  protected abstract setEvent(): void;

  protected abstract removeEvent(): void;
}
