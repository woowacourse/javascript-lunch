import BackDrop from "./Backdrop";
import ModalContent from "./ModalContent";

const Modal = ({ handleCloseModal, id, contents }) => {
  const backDrop = BackDrop(handleCloseModal, id);
  backDrop.appendChild(ModalContent(contents, ["register-modal"]));

  return backDrop;
};
export default Modal;
