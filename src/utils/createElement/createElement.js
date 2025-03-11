import setAttributes from "./set/setAttributes";
import setClasses from "./set/setClasses";
import setEvents from "./set/setEvents";
import setText from "./set/setText";

const createElement = ({
  tagName,
  classNames = [],
  text = "",
  attributes = {},
  events = {},
}) => {
  const element = document.createElement(tagName);

  setClasses(element, classNames);
  setText(element, text);
  setAttributes(element, attributes);
  setEvents(element, events);

  return element;
};

export default createElement;
