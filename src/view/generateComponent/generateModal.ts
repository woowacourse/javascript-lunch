import createElementByTag from "../utils/createElementByTag";

const generateModal = (contents: HTMLElement[]) => {
  const modalDiv = createElementByTag({
    tag: "div",
    classes: ["modal"],
  });
  const backDrop = createElementByTag({
    tag: "div",
    classes: ["modal-backdrop"],
  });
  const container = createElementByTag({
    tag: "div",
    classes: ["modal-container"],
  });

  container.append(...contents);
  modalDiv.append(backDrop, container);

  backDrop.addEventListener("click", () => {
    modalDiv.classList.remove("modal--open");
  });

  return modalDiv;
};

export default generateModal;
