interface Props {
  elementType: string;
  id?: string;
  classList?: string[];
  attribute?: object;
  content?: string;
}

function customCreateElement({ elementType, id, classList, attribute, content }: Props) {
  const element = document.createElement(elementType);

  if (id) element.id = id;
  if (classList) element.classList.add(...classList);
  if (attribute) {
    Object.entries(attribute).forEach(([key, value]) => {
      element.setAttribute(key, value);
    });
  }
  if (content) element.innerHTML = content;

  return element;
}

export default customCreateElement;
