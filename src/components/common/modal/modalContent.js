import createElement from "../../../utils/createElement/createElement";

const ModalContent = (contents) => {
  const modalContent = createElement({
    tagName: "div",
    classNames: ["modal-container"],
    events: {
      click: (e) => e.stopPropagation(),
    },
  });

  contents.forEach((content) => {
    modalContent.appendChild(content);
  });

  return modalContent;
};
export default ModalContent;
