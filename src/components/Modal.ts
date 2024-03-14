const textElement = document.createElement("p");
textElement.textContent = "모달입니다";

export const createModal = () => {
  const modal = document.createElement("div");

  const modalBackdrop = document.createElement("div");
  const modalContainer = document.createElement("div");

  modal.classList.add("modal", "modal--open");
  modalBackdrop.classList.add("modal-backdrop");
  modalContainer.classList.add("modal-container");

  modalContainer.appendChild(textElement);

  modal.appendChild(modalBackdrop);
  modal.appendChild(modalContainer);

  return modal;
};
