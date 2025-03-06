import { SELECT_CATEGORY } from "../../contants.js";

function SelectForm() {
  const selectElement = document.createElement("select");
  selectElement.id = "category";
  selectElement.name = "category";
  selectElement.required = true;

  selectElement.innerHTML = `
    <option value="">선택해 주세요</option>
    ${SELECT_CATEGORY.map((category) => `<option value=${category}>${category}</option>`).join("")}
    `;

  return selectElement;
}

export default SelectForm;
