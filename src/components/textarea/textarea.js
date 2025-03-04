export default function createTextAreaBox({
  id,
  labelText,
  required,
  textCaption = "",
  cols = 30,
  rows = 5,
}) {
  const textAreaBox = createElement("div", {
    className: ["form-item", `${required && "form-item--required"}`],
  });

  textAreaBox.innerHTML = `
    <label for="description text-caption">${labelText}</label>
    <textarea
      name="${id}"
      id="${id}"
      cols="${cols}"
      rows="${rows}"></textarea>
      ${
        textCaption &&
        `<span class="help-text text-caption">${textCaption}</span>`
      }
  `;

  return textAreaBox;
}
