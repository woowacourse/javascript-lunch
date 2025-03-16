import BackDrop from "./Backdrop";
import ModalContent from "./ModalContent";

const Modal = ({ handleClickBackDrop, id, classNames, contents = [] }) => {
  const backDrop = BackDrop(handleClickBackDrop, id);
  backDrop.appendChild(ModalContent(contents, classNames));

  return backDrop;
};
export default Modal;
