import createElement from "../../../utils/createElement/createElement";

const ModalContent = (contents, classNames = []) =>
  createElement({
    tagName: "div",
    classNames: ["modal-container", ...classNames],
    events: {
      click: (e) => e.stopPropagation(),
    },
    children: [...contents],
  });

export default ModalContent;
