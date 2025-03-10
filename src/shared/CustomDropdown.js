export default function CustomDropdown({
  label,
  name,
  id,
  options,
  required,
  defaultOptionText = "선택해 주세요",
  selectFirst = false, // 첫 번째 옵션을 자동 선택하는 플래그
}) {
  return `
    <div class="form-item ${required ? "form-item--required" : ""}">
      <label for="${id}" class="text-caption">${label}</label>
      <select name="${name}" id="${id}" ${required ? "required" : ""}>
        ${!selectFirst ? `<option value="">${defaultOptionText}</option>` : ""}
        ${options
          .map(
            (option, index) =>
              `<option value="${option.value}" ${selectFirst && index === 0 ? "selected" : ""}>${option.text}</option>`,
          )
          .join("")}
      </select>
    </div>
  `;
}
