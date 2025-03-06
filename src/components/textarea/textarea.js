export default function createTextAreaBox({
  id,
  labelText,
  required = false,
  textCaption = "",
  cols = 30,
  rows = 5,
}) {
  const textAreaBox = createElement("div", {
    className: ["form-item", `${required && "form-item--required"}`],
  });
  const textAreaLabel = createElement("label", {
    htmlFor: "description",
    className: "text-caption",
    textContent: labelText,
  });
  const textArea = createElement("textarea", {
    name: id,
    id,
    cols,
    rows,
  });

  const fragment = createElementsFragment([textAreaLabel, textArea]);

  if (textCaption) {
    const textCaptionEl = createElement("span", {
      className: ["help-text", "text-caption"],
      textContent: textCaption,
    });

    fragment.appendChild(textCaptionEl);
  }

  textAreaBox.appendChild(fragment);
  return textAreaBox;
}
