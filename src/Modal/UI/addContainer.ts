import Modal from "../Modal";

const addContainer = (modal: Modal) => {
  const container = document.createElement("div");
  container.setAttribute("class", "modal-container");
  modal.element.appendChild(container);
};

export default addContainer;
