type Props = {
  modalClass: string;
  modalContainerClass?: string;
  child?: HTMLElement;
  children?: HTMLElement[];
};

const ModalComponent = ({ modalClass, modalContainerClass, child, children }: Props) => {
  const modalDiv = document.createElement('div');
  modalDiv.classList.add(modalClass);

  const modalBackdropDiv = document.createElement('div');
  modalBackdropDiv.classList.add('modal-backdrop');

  const modalContainerDiv = document.createElement('div');
  modalContainerDiv.classList.add('modal-container');

  if (modalContainerClass) {
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

  return {
    create
  };
};

export default ModalComponent;
