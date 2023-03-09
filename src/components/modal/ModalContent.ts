import "./ModalContent.style.css";
import ModalRoot from "./ModalRoot";

type CloseModal = () => void;

class ModalContent extends HTMLElement {
  closeModal: CloseModal | undefined;

  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
    this.setAttribute("class", "modal-container");
  }

  render() {}

  bindEvent() {}

  setClassName() {
    this.setAttribute("class", "modal-container");
  }

  setCloseModal(closeModal: CloseModal) {
    this.closeModal = closeModal;
  }
}

export default ModalContent;
