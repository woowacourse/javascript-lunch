import "./ModalContent.style.css";
import ModalRoot from "./ModalRoot";

type CloseModal = () => void;

class ModalContent extends HTMLElement {
  closeModal: CloseModal | undefined;

  constructor() {
    super();
  }

  connectedCallback() {
    this.setAttribute("class", "modal-container");
    this.render();
  }

  render() {}

  bindEvent() {}

  setCloseModal(closeModal: CloseModal) {
    this.closeModal = closeModal;
  }
}

export default ModalContent;
