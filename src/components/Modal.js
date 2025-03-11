import { createForm } from "./Form.js";

const createModal = ({ title, onSubmit }) => {
  const modal = document.createElement("dialog");
  modal.classList.add("modal");
  modal.id = "add-restaurant-dialog";

  const modalContainer = document.createElement("div");
  modalContainer.classList.add("modal-container");

  const modalTitle = document.createElement("h2");
  modalTitle.classList.add("modal-title", "text-title");
  modalTitle.textContent = title;

  const form = createForm();

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    onSubmit(form, modal);
  });

  modalContainer.appendChild(modalTitle);
  modalContainer.appendChild(form);
  modal.appendChild(modalContainer);

  modal.addEventListener("click", (event) => {
    if (!event.target.closest(".modal-container")) {
      modal.close();
    }
  });

  const cancelButton = form.querySelector("#cancel-dialog-btn");

  cancelButton.addEventListener("click", () => {
    form.reset();
    modal.close();
  });

  return modal;
};

export { createModal };
