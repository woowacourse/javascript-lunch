interface Props {
  child: HTMLElement;
}

export const createModal = ({ child }: Props) => {
  const modal = document.createElement("div");

  const modalBackdrop = document.createElement("div");
  const modalContainer = document.createElement("div");

  modal.classList.add("modal", "modal--open");
  modalBackdrop.classList.add("modal-backdrop");
  modalContainer.classList.add("modal-container");

  modalContainer.appendChild(child);
  modal.appendChild(modalBackdrop);
  modal.appendChild(modalContainer);

  modalBackdrop.addEventListener("click", () =>
    modal.classList.toggle("modal--open")
  );

  return modal;
};
