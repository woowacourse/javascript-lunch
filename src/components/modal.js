const createModal = () => {
  const modal = document.createElement("div");
  const modalBackdrop = document.createElement("div");
  const modalContainer = document.createElement("div");

  modal.classList.add("modal");
  modalBackdrop.classList.add("modal-backdrop");
  modalContainer.classList.add("modal-container");

  modal.appendChild(modalBackdrop);
  modal.appendChild(modalContainer);

  return modal;
};

export default createModal;
