import { label } from "../../constants/optionValue.js";

const Dropdown = ({ id, required, optionValue }) => {
  return `
  <div id="${id}" class="form-item ${required ? "form-item--required" : ""}">
    <label for="${id} text-caption">${label[id]}</label>
    <select name="${id}" class="option" ${required}}>
      <option value="">선택해 주세요</option>
      ${Object.entries(optionValue)
        .map(([key, value]) => `<option value="${key}">${value}</option>`)
        .join("")}    
    </select>
  </div>
  `;
};
export default Dropdown;
