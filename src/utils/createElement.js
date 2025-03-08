function createElement({ tag, className, textContent, attributes = {} }) {
  const element = document.createElement(tag);

  if (className) element.className = className;
  if (textContent) element.textContent = textContent;

  Object.entries(attributes).forEach(([key, value]) => {
    element[key] = value;
  });

  return element;
}

export default createElement;
