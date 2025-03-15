import { MESSAGES } from "../constants/messages";

interface ICustomInput {
  label: string;
  name: string;
  id: string;
  type: string;
  required?: boolean;
}

export default function CustomInput({
  label,
  name,
  id,
  type = "text",
  required = false,
}: ICustomInput): string {
  return `
      <div class="form-item ${required && "form-item--required"}">
        <label for="${id}" class="text-caption">${label}</label>
        <input maxlength="${
          MESSAGES.MAXIMUM_INPUT_LENGTH
        }" type="${type}" name="${name}" id="${id}" ${required && "required"} />
      </div>
    `;
}
