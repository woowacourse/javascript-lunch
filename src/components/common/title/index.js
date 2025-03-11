import createElement from "../../../utils/createElement/createElement";

const Title = (text, tagName, ...className) => {
  return createElement({
    tagName,
    classNames: [...className],
    textContent: text,
  });
};

export default Title;
