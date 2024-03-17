export default class BaseComponent extends HTMLElement {
  connectedCallback() {
    this.render();
    this.setEvent();
  }

  disconnectedCallback() {}

  render() {}

  setEvent() {}

  // - 커스텀 이벤트 정의
  emitEvent(event, data) {
    this.dispatchEvent(
      new CustomEvent(event, {
        bubbles: true,
        detail: data,
      })
    );
  }
}
