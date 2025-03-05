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

  inputBox.innerHTML = `
    <label for="${id}" text-caption>${labelText}</label>
    <input type="${type}" name="${id}" id="${id}" ${required && "required"} />
    ${
      textCaption &&
      `<span class="help-text text-caption">${textCaption}</span>`
    }
  `;

  return inputBox;
}
