export function TextareaBox({
  id,
  name,
  label,
  required,
  cols,
  rows,
  helpCaption,
}) {
  function template() {
    return `
        <div class="form-item ${required ? "form-item--required" : ""}">
          <label for="${name} text-caption">${label}</label>
          <textarea name="${name}" id="${id}"  ${required ? "required" : ""} cols="${cols}" rows= "${rows}"></textarea>
          ${(helpCaption && `<span class="help-text text-caption">${helpCaption}</span>`) || ""}
        </div>
    `;
  }

  return template();
}
