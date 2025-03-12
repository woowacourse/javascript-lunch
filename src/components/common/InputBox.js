export function InputBox({
  id,
  name,
  label,
  required,
  placeHolder,
  maxLength,
  type,
  helpCaption,
}) {
  function template() {
    return `
      <div class="form-item ${required ? "form-item--required" : ""}">
          <label for="${name} text-caption">${label}</label>
          <input type="${type}" name="${name}" id="${id}"  ${required ? "required" : ""} maxlength= "${maxLength}" placeholder= "${placeHolder}">
          ${(helpCaption && `<span class="help-text text-caption">${helpCaption}</span>`) || ""}
    </div>
    `;
  }

  return template();
}
