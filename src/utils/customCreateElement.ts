interface Props {
  elementType: string;
  id?: string;
  classList?: string[];
  attribute?: object;
  text?: string;
}

function customCreateElement({ elementType, id, classList, attribute, text }: Props) {
  const element = document.createElement(elementType);

  if (id) element.id = id;
  if (classList) element.classList.add(...classList);
  if (attribute) {
    Object.entries(attribute).forEach(([key, value]) => {
      element.setAttribute(key, value);
    });
  }
  if (text) element.innerText = text;

  return element;
}

export default customCreateElement;
