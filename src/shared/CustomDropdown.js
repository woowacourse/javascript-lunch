
export default function CustomDropdown(props) {
  const {
    label,
    name,
    id,
    options,
    required = false,
    selectFirst = false,
    type = "form", // 기본값은 form으로 설정 (모달용)
  } = props;

  if (type === "filter") {
    const optionsHTML = options
      .map((option) => {
        return `<option value="${option.value}">${option.text}</option>`;
      })
      .join("");

    return `
      <div class="dropdown-container">
        ${label ? `<label for="${id}" class="dropdown-label">${label}</label>` : ""}
        <select 
          name="${name}" 
          id="${id}" 
          ${required ? "required" : ""}
        >
          ${optionsHTML}
        </select>
      </div>
    `;
  }

  const optionsHTML = options
    .map((option) => {
      return `<option value="${option.value}">${option.text}</option>`;
    })
    .join("");

  return `
      <div class="form-item ${required ? "form-item--required" : ""}">
        <label for="${id}" class="text-caption">${label}</label>
        <select 
          name="${name}" 
          id="${id}" 
          ${required ? "required" : ""}
        >
          ${!selectFirst ? '<option value="">선택해 주세요</option>' : ""}
          ${optionsHTML}
        </select>
      </div>
    `;

}
