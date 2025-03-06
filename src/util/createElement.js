export default function createElement({ tag, classNames = [], ...attributes }) {
  const $element = document.createElement(tag);

  classNames.forEach((className) => $element.classList.add(className));

  Object.entries(attributes).forEach(([key, value]) => {
    $element.setAttribute(key, value);
  });

  return $element;
}
