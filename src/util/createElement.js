export default function createElement({ tag, className }) {
  const $element = document.createElement(tag);
  $element.classList.add(className);
  return $element;
}
