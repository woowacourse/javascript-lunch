class ModalContent extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
    this.setAttribute("class", "modal-container");
  }

  render() {}

  bindEvent(closeModal: () => void) {}

  setClassName() {
    this.setAttribute("class", "modal-container");
  }
}

export default ModalContent;
