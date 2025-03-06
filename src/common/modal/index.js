import BackDrop from "./backdrop";
import ModalContent from "./modalContent";

const Modal = (...content) => {
  const backDrop = BackDrop();
  backDrop.classList.add("open");
  backDrop.appendChild(ModalContent(content));

  return backDrop;
};
export default Modal;
