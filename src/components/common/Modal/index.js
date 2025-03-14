import BackDrop from "./Backdrop";
import ModalContent from "./ModalContent";

const Modal = ({ handleCloseModal, id, classNames, contents = [] }) => {
  const backDrop = BackDrop(handleCloseModal, id);
  backDrop.appendChild(ModalContent(contents, classNames));

  return backDrop;
};
export default Modal;
