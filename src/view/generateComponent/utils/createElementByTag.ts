const createElementByTag = ({
  tag,
  classes = [],
  contents = "",
}: {
  tag: string;
  classes?: string[];
  contents?: string;
}) => {
  const element = document.createElement(tag);
  element.classList.add(...classes);
  element.textContent = contents;
  return element;
};

export default createElementByTag;
