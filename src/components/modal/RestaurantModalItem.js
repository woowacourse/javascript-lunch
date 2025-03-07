import createElement from "../../util/createElement";

function createHelpText(helpText) {
  const $span = createElement({
    tag: "span",
    classNames: ["help-text", "text-caption"],
  });
  $span.textContent = helpText;
  return $span;
}

export default function RestaurantModalItem({
  isRequired,
  name,
  text,
  renderChild,
  helpText,
}) {
  const $div = createElement({
    tag: "div",
    classNames: ["form-item", `${isRequired && "form-item--required"}`],
  });

  const $label = createElement({
    tag: "label",
    for: `${name} text-caption`,
  });
  $label.textContent = text;

  $div.appendChild($label);
  $div.appendChild(renderChild());

  if (helpText) {
    const $helpText = createHelpText(helpText);
    $div.appendChild($helpText);
  }

  return $div;
}
