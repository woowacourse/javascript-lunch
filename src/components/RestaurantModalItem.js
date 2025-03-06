import createElement from "../util/createElement";

export default function RestaurantModalItem({
  isRequired,
  name,
  text,
  element,
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
  $div.appendChild(element());

  return $div;
}
