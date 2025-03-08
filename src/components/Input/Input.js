import { label } from "../../constants/optionValue.js";

const Input = ({ id, required, type }) => {
  console.log({ id, required, type });
  return `
  <div id="name" class="form-item ${required ? "form-item--required" : ""}">
      <label for="${id} text-caption">${label[id]}</label>
      <input type="${type}" name="${id}" ${required}>
    </div>`;
};
export default Input;
