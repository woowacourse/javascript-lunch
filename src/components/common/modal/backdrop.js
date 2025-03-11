import createElement from "../../../utils/createElement/createElement";

const BackDrop = (handleCloseModal) => {
  return createElement({
    tagName: "div",
    classNames: ["modal-backdrop"],
    events: {
      click: handleCloseModal,
    },
  });
};

export default BackDrop;
