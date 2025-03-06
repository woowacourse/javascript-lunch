export default function createInputBox({
  labelText,
  type,
  id,
  required = false,
  textCaption = "",
}) {
  const inputBox = createElement("div", {
    className: ["form-item", `${required && "form-item--required"}`],
  });
  const inputLabel = createElement("label", {
    htmlFor: id,
    className: "text-caption",
    textContent: labelText,
  });
  const input = createElement("input", {
    type,
    name: id,
    id,
    required,
  });

  const fragment = createElementsFragment([inputLabel, input]);

  if (textCaption) {
    const textCaptionEl = createElement("span", {
      className: ["help-text", "text-caption"],
      textContent: textCaption,
    });

    fragment.appendChild(textCaptionEl);
  }

  inputBox.appendChild(fragment);
  return inputBox;
}
