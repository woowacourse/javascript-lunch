import createElement from "../../../utils/createElement/createElement";

const ModalContent = (contents) =>
  createElement({
    tagName: "div",
    classNames: ["modal-container"],
    events: {
      click: (e) => e.stopPropagation(),
    },
    children: [...contents],
  });

export default ModalContent;
