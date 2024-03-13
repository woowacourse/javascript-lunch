class BaseComponent extends HTMLElement {
  connectedCallback() {
    try {
      this.render();
      this.setEvent();
    } catch (err) {
      console.error(err);
    }
  }
  render() {}
  setEvent() {}
}

export default BaseComponent;
