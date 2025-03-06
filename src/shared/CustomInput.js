export default function CustomInput({
  label,
  name,
  id,
  type = "text",
  required = false,
}) {
  return `
      <div class="form-item ${required ? "form-item--required" : ""}">
        <label for="${id}" class="text-caption">${label}</label>
        <input maxlength="2048" type="${type}" name="${name}" id="${id}" ${
          required ? "required" : ""
        } />
      </div>
    `;
}
