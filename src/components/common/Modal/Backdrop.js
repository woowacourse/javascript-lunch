import createElement from "../../../utils/createElement/createElement";

const BackDrop = (handleClickBackDrop, id) =>
  createElement({
    tagName: "div",
    classNames: ["modal-backdrop"],
    attributes: {
      id,
    },
    events: {
      click: handleClickBackDrop,
    },
  });

export default BackDrop;
