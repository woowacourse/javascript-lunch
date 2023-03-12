import Modal from "../Modal";

const addBackdrop = (modal: Modal) => {
  const backdrop = document.createElement("div");
  backdrop.setAttribute("class", "modal-backdrop");
  modal.element.appendChild(backdrop);
};

export default addBackdrop;
