import Modal from "../Modal";

const addContainer = (element: HTMLElement) => {
  const container = document.createElement("div");
  container.setAttribute("class", "modal-container");
  element.appendChild(container);
};

export default addContainer;
