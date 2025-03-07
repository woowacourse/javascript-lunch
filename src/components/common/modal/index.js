import BackDrop from "./backdrop";
import ModalContent from "./modalContent";

const Modal = (handleCloseModal, ...content) => {
  const backDrop = BackDrop(handleCloseModal);
  backDrop.appendChild(ModalContent(content));

  return backDrop;
};
export default Modal;
