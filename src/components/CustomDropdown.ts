interface ICustomDropdown {
  label: string;
  name: string;
  id: string;
  options: Array<{ value: string | number; text: string }>;
  required?: boolean;
}

export default function CustomDropdown({
  label,
  name,
  id,
  options,
  required,
}: ICustomDropdown) {
  return `
    <div class="form-item ${required && "form-item--required"}">
      <label for="${id}" class="text-caption">${label}</label>
      <select name="${name}" id="${id}" ${required && "required"}>
        <option value="">선택해 주세요</option>
        ${options
          .map(
            (option) =>
              `<option value="${option.value}">${option.text}</option>`
          )
          .join("")}
      </select>
    </div>
  `;
}
