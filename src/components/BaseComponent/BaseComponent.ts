abstract class BaseComponent extends HTMLElement {
  protected connectedCallback() {
    this.render();
    this.setEvent();
  }

  protected disconnectedCallback() {
    this.removeEvent();
  }

  protected render() {}

  protected abstract setEvent(): void;

  protected removeEvent() {}

  public getTemplate() {
    return "";
  }

  protected emit<T>(eventType: string, detail: T) {
    const customEvent = new CustomEvent(eventType, {
      bubbles: true,
      detail,
    });

    this.dispatchEvent(customEvent);
  }

  protected on({ target, eventName, eventHandler }: any) {
    target.addEventListener(eventName, eventHandler);
  }

  protected off({ target, eventName, eventHandler }: any) {
    target.removeEventListener(eventName, eventHandler);
  }
}

export default BaseComponent;
