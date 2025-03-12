import setAttributes from "./set/setAttributes";
import setChildren from "./set/setChildren";
import setClasses from "./set/setClasses";
import setEvents from "./set/setEvents";
import setText from "./set/setText";

const createElement = ({
  tagName,
  classNames = [],
  text = "",
  attributes = {},
  events = {},
  children = [],
}) => {
  const element = document.createElement(tagName);

  setClasses(element, classNames);
  setText(element, text);
  setAttributes(element, attributes);
  setEvents(element, events);
  setChildren(element, children);

  return element;
};

export default createElement;
