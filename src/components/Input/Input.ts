import { label } from "../../constants/optionValue.js";

interface InputProps {
  id: string;
  required: string;
  type: string;
}

const Input = ({ id, required, type }: InputProps) => {
  return `
  <div id="name" class="form-item ${required ? "form-item--required" : ""}">
      <label for="${id} text-caption">${label[id]}</label>
      <input type="${type}" name="${id}" ${required}>
    </div>`;
};
export default Input;
