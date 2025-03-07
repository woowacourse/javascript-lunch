export function createModal({ element }) {
  const modal = document.createElement("div");
  const modalBackDrop = document.createElement("div");
  const modalContainer = document.createElement("div");

  modalBackDrop.classList.add("modal-backdrop");
  modalContainer.classList.add("modal-container");
  modalContainer.append(element);

  modal.classList.add("modal");
  modal.classList.add("modal--open");
  modal.append(modalBackDrop);
  modal.append(modalContainer);

  return modal;
}
