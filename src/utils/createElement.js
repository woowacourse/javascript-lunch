const createElement = ({
  tag,
  type = "",
  name = "",
  id = "",
  htmlFor = "",
  classList = [],
  textContent = "",
}) => {
  const element = document.createElement(tag);
  if (type !== "") element.setAttribute("type", type);
  if (name !== "") element.setAttribute("name", name);
  if (id !== "") element.setAttribute("id", id);
  if (htmlFor !== "") element.setAttribute("for", htmlFor);
  if (classList.length !== 0) element.classList.add(...classList);
  if (textContent !== "") element.textContent = textContent;

  return element;
};

export default createElement;
