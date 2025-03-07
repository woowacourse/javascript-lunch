function createInput(fieldName) {
  const input = `<div class="form-item ${fieldName.required}">
    <label for="${fieldName.name} text-caption">${fieldName.label}</label>
    <input type="${fieldName.type}" name="${fieldName.name}" id="${fieldName.name}">
    <span class="help-text text-caption">${fieldName.helpText}</span>
  </div>`;

  return input;
}

export default createInput;
