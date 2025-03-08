import BackDrop from "./backdrop";
import ModalContent from "./modalContent";

const Modal = ({ handleClose, headerComponent, bodyComponent }) => {
  const backDrop = BackDrop(handleClose);
  backDrop.appendChild(ModalContent([headerComponent, bodyComponent]));

  return backDrop;
};
export default Modal;
