function Modal(innerComponents) {
  const modalElement = document.createElement("div");
  const modalBackdropElement = document.createElement("div");
  const modalContainerElement = document.createElement("div");

  modalElement.classList.add("modal");
  modalBackdropElement.classList.add("modal-backdrop");
  modalContainerElement.classList.add("modal-container");

  innerComponents.forEach((component) => {
    modalContainerElement.appendChild(component);
  });
  modalElement.appendChild(modalBackdropElement);
  modalElement.appendChild(modalContainerElement);

  return modalElement;
}

export default Modal;
