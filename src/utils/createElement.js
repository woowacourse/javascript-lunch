const createElement = ({
  tag,
  name = "",
  id = "",
  htmlFor = "",
  classList = [],
}) => {
  const element = document.createElement(tag);
  if (name !== "") element.setAttribute("name", name);
  if (id !== "") element.setAttribute("id", id);
  if (htmlFor !== "") element.setAttribute("for", htmlFor);
  if (classList.length !== 0) element.classList.add(...classList);

  return element;
};

export default createElement;
