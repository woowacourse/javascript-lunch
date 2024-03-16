type Props = {
  modalClass: string;
  modalContainerClass?: string;
  children: HTMLElement[];
};

const ModalComponent = ({ modalClass, modalContainerClass, children }: Props) => {
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

  children.forEach((element) => modalContainerDiv.appendChild(element));

  const create = () => modalDiv;

  return {
    create
  };
};

export default ModalComponent;
