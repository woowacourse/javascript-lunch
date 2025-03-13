import createElement from "../../../utils/createElement/createElement";
import setAttributes from "../../../utils/createElement/set/setAttributes";

const TabItem = ({ text, selected, classNames, events }) => {
  return createElement({
    tagName: "div",
    text,
    classNames: [...classNames, selected ? "tab--selected" : ""],
    events,
  });
};

export default TabItem;
