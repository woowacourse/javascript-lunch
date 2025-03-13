import BackDrop from "./Backdrop";
import ModalContent from "./ModalContent";

const Modal = (handleCloseModal, ...content) => {
  const backDrop = BackDrop(handleCloseModal);
  backDrop.appendChild(ModalContent(content, ["register-modal"]));

  return backDrop;
};
export default Modal;
