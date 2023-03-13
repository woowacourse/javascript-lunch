import addBackdrop from "./addBackdrop";
import addContainer from "./addContainer";

const createModal = (id: string): HTMLElement => {
  const element = document.createElement("div");
  element.setAttribute("class", "modal");
  if (id) element.setAttribute("id", id);

  addBackdrop(element);
  addContainer(element);

  return element;
};

export default createModal;
