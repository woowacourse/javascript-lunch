export default function createDropdownBox({
  labelText,
  id,
  dropdownList,
  required,
}) {
  const dropdownBox = createElement("div", {
    className: ["form-item", `${required && "form-item--required"}`],
  });

  dropdownBox.innerHTML = `
    <label for="${id} text-caption">${labelText}</label>
    <select name="${id}" id="${id}" ${required && "required"}>
      <option value="">선택해 주세요</option>
      ${dropdownList.map(
        ({ value, text }) => `<option value="${value}">${text}</option>`
      )}
    </select>
  `;

  return dropdownBox;
}
