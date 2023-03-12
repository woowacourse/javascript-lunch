import Modal from "../Modal";

const addBackdrop = (element: HTMLElement) => {
  const backdrop = document.createElement("div");
  backdrop.setAttribute("class", "modal-backdrop");
  element.appendChild(backdrop);
};

export default addBackdrop;
