const createElementByTag = ({
  tag,
  classes = [],
  contents = "",
  attribute = {},
}: {
  tag: string;
  classes?: string[];
  contents?: string;
  attribute?: Record<string, string>;
}) => {
  const element = document.createElement(tag);
  element.classList.add(...classes);
  element.textContent = contents;

  Object.keys(attribute).forEach((attributeName) => {
    element.setAttribute(attributeName, attribute[attributeName]);
  });

  return element;
};

export default createElementByTag;
