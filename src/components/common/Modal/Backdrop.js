import createElement from "../../../utils/createElement/createElement";

const BackDrop = (handleCloseModal, id) =>
  createElement({
    tagName: "div",
    classNames: ["modal-backdrop"],
    attributes: {
      id,
    },
    events: {
      click: handleCloseModal,
    },
  });

export default BackDrop;
