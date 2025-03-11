import createElement from "../../../utils/createElement/createElement";

const Title = (text, tagName, ...className) => {
  return createElement({
    tagName,
    classNames: [...className],
    text: text,
  });
};

export default Title;
