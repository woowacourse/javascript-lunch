import BackDrop from "./backdrop";
import ModalContent from "./modalContent";

const Modal = ({ id, handleClose, headerComponent, bodyComponent }) => {
  const backDrop = BackDrop(id, handleClose);
  backDrop.appendChild(ModalContent([headerComponent, bodyComponent]));

  return backDrop;
};
export default Modal;
