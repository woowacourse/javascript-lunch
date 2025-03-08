export default function createElement({
  tag,
  classNames = [],
  textContent,
  onClick,
  ...attributes
}) {
  const $element = document.createElement(tag);

  classNames.forEach((className) => $element.classList.add(className));

  if (textContent) {
    $element.textContent = textContent;
  }

  if (onClick && typeof onClick === "function") {
    $element.onclick = onClick;
  }

  Object.entries(attributes).forEach(([key, value]) => {
    if (key === "required") {
      $element.required = Boolean(value);
    } else {
      $element.setAttribute(key, value);
    }
  });

  return $element;
}
