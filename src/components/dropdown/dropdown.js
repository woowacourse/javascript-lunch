export default function createDropdownBox({
  labelText,
  dropdownList,
  required,
}) {
  const dropdownBox = createElement("div", {
    className: ["form-item", `${required && "form-item--required"}`],
  });

  dropdownBox.innerHTML = `
    <label for="category text-caption">${labelText}</label>
    <select name="category" id="category" ${required && "required"}>
      <option value="">선택해 주세요</option>
      ${dropdownList.map(
        ({ value, text }) => `<option value="${value}">${text}</option>`
      )}
    </select>
  `;

  return dropdownBox;
}
