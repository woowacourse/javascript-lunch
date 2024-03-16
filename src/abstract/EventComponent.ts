import BaseComponent from "./BaseComponent";

export default abstract class EventComponent extends BaseComponent {
  connectedCallback() {
    this.render();
    this.setEvent();
  }

  protected abstract setEvent(): void;

  protected dispatchCustomEvent(
    eventName: string,
    detail: Record<string, unknown>
  ) {
    this.dispatchEvent(new CustomEvent(eventName, { detail, bubbles: true }));
  }
}
