import createElement from "../../../utils/createElement/createElement";

const TabItem = ({ text, selected, classNames, events }) => {
  return createElement({
    tagName: "div",
    text,
    classNames: [...classNames, selected ? "tab--selected" : ""],
    events,
  });
};

export default TabItem;
