import { createElement } from "../../../utils/createElement";
import { modalClose } from "./handleCloseModal";
import ModalContent from "./modalContent";

const Modal = () => {
  const backDrop = createElement(/*html*/ `
    <div class="modal-backdrop"></div>
  `);

  backDrop.addEventListener("click", modalClose);

  return backDrop;
};

export default Modal;
