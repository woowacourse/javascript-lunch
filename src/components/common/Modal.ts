type Props = {
  modalClass: string;
  modalContainerClass?: string;
  child?: HTMLElement;
  children?: HTMLElement[];
};

const Modal = ({ modalClass, modalContainerClass, child, children }: Props) => {
  const modalDiv = document.createElement('div');
  modalDiv.classList.add(modalClass);

  const modalBackdropDiv = document.createElement('div');
  modalBackdropDiv.classList.add('modal-backdrop');

  const modalContainerDiv = document.createElement('div');
  modalContainerDiv.classList.add('modal-container');

  if (typeof modalContainerClass === 'string') {
    modalContainerDiv.classList.add(modalContainerClass);
  }

  modalDiv.appendChild(modalBackdropDiv);
  modalDiv.appendChild(modalContainerDiv);

  if (children) {
    children.forEach((element) => modalContainerDiv.appendChild(element));
  }

  if (child) {
    modalContainerDiv.appendChild(child);
  }

  const create = () => modalDiv;

  const closeModal = () => {
    modalDiv.classList.remove('modal--open');
  };

  modalBackdropDiv.addEventListener('click', closeModal);

  return {
    create
  };
};

export default Modal;
